// src/services/chatService.js
import { supabase } from "../lib/supabase";

export const chatService = {
  // Get or create a conversation between a customer and lawyer
  getOrCreateConversation: async (customerId, lawyerId) => {
    // Try to find existing
    const { data: existing } = await supabase
      .from("conversations")
      .select("*")
      .eq("customer_id", customerId)
      .eq("lawyer_id", lawyerId)
      .single();

    if (existing) return existing;

    // Create new
    const { data: created, error } = await supabase
      .from("conversations")
      .insert({ customer_id: customerId, lawyer_id: lawyerId })
      .select()
      .single();

    if (error) { console.error("create conversation:", error.message); return null; }
    return created;
  },

  // Get all conversations for a user (as customer or lawyer)
  getConversations: async (userId, role) => {
    const field = role === "lawyer" ? "lawyer_id" : "customer_id";
    const otherField = role === "lawyer" ? "customer_id" : "lawyer_id";

    const { data, error } = await supabase
      .from("conversations")
      .select(`
        *,
        messages (
          id, content, sender_id, created_at, read
          order by created_at desc
          limit 1
        ),
        other_profile:profiles!conversations_${otherField}_fkey (
          id, full_name, avatar_url
        )
      `)
      .eq(field, userId)
      .order("updated_at", { ascending: false });

    if (error) {
      // Fallback simpler query
      const { data: simple } = await supabase
        .from("conversations")
        .select("*")
        .eq(field, userId)
        .order("updated_at", { ascending: false });
      return simple || [];
    }
    return data || [];
  },

  // Get all messages in a conversation
  getMessages: async (conversationId) => {
    const { data, error } = await supabase
      .from("messages")
      .select(`*, profiles(full_name, avatar_url)`)
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) { console.error("getMessages:", error.message); return []; }
    return data || [];
  },

  // Send a message
  sendMessage: async (conversationId, senderId, content) => {
    const { data, error } = await supabase
      .from("messages")
      .insert({ conversation_id: conversationId, sender_id: senderId, content })
      .select()
      .single();

    if (error) { console.error("sendMessage:", error.message); return null; }

    // Update conversation timestamp
    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", conversationId);

    return data;
  },

  // Mark all messages in a conversation as read (for this user)
  markRead: async (conversationId, userId) => {
    await supabase
      .from("messages")
      .update({ read: true })
      .eq("conversation_id", conversationId)
      .neq("sender_id", userId)
      .eq("read", false);
  },

  // Get unread message count for a user
  getUnreadCount: async (userId) => {
    // Get all conversations this user is part of
    const { data: convs } = await supabase
      .from("conversations")
      .select("id")
      .or(`customer_id.eq.${userId},lawyer_id.eq.${userId}`);

    if (!convs || convs.length === 0) return 0;

    const convIds = convs.map((c) => c.id);
    const { count } = await supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .in("conversation_id", convIds)
      .neq("sender_id", userId)
      .eq("read", false);

    return count || 0;
  },

  // Subscribe to new messages in a conversation (real-time)
  subscribeToMessages: (conversationId, callback) => {
    return supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => callback(payload.new)
      )
      .subscribe();
  },

  // Subscribe to conversation list updates (new convs, last message changes)
  subscribeToConversations: (userId, callback) => {
    return supabase
      .channel(`conversations:${userId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "conversations" },
        callback
      )
      .subscribe();
  },

  unsubscribe: (channel) => {
    if (channel) supabase.removeChannel(channel);
  },
};
