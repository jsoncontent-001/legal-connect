// src/contexts/ChatContext.jsx
import React, { createContext, useState, useCallback, useContext, useEffect, useRef } from "react";
import { chatService } from "../services/chatService";
import { LawyerContext } from "./LawyerContext";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { currentUser } = useContext(LawyerContext);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeLawyer, setActiveLawyer] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const channelRef = useRef(null);

  // Refresh unread count whenever user or chat changes
  useEffect(() => {
    if (!currentUser) { setUnreadCount(0); return; }
    const refresh = async () => {
      const count = await chatService.getUnreadCount(currentUser.id);
      setUnreadCount(count);
    };
    refresh();
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, [currentUser, chatOpen]);

  // Clean up realtime subscription on close
  useEffect(() => {
    if (!chatOpen && channelRef.current) {
      chatService.unsubscribe(channelRef.current);
      channelRef.current = null;
    }
  }, [chatOpen]);

  const openChat = useCallback(
    async (lawyer) => {
      if (!currentUser) return false;
      if (currentUser.id === lawyer.id) return false;

      setActiveLawyer(lawyer);
      setChatOpen(true);
      setMessages([]);

      // Determine customer/lawyer ids
      const customerId = currentUser.role === "customer" ? currentUser.id : lawyer.id;
      const lawyerId = currentUser.role === "lawyer" ? currentUser.id : lawyer.id;

      // Get or create the conversation
      const conv = await chatService.getOrCreateConversation(customerId, lawyerId);
      if (!conv) return false;

      setActiveConversation(conv);

      // Load existing messages
      const msgs = await chatService.getMessages(conv.id);
      setMessages(msgs);

      // Mark as read
      await chatService.markRead(conv.id, currentUser.id);

      // Subscribe to new real-time messages
      if (channelRef.current) chatService.unsubscribe(channelRef.current);
      channelRef.current = chatService.subscribeToMessages(conv.id, (newMsg) => {
        setMessages((prev) => {
          // Avoid duplicates
          if (prev.find((m) => m.id === newMsg.id)) return prev;
          return [...prev, newMsg];
        });
        // Mark new incoming messages as read immediately
        if (newMsg.sender_id !== currentUser.id) {
          chatService.markRead(conv.id, currentUser.id);
        }
      });

      return true;
    },
    [currentUser]
  );

  const closeChat = () => {
    setChatOpen(false);
    setActiveLawyer(null);
    setActiveConversation(null);
    setMessages([]);
  };

  const sendMessage = useCallback(
    async (text) => {
      if (!currentUser || !activeConversation || !text.trim() || sending) return;
      setSending(true);

      const msg = await chatService.sendMessage(
        activeConversation.id,
        currentUser.id,
        text.trim()
      );

      if (msg) {
        // Optimistically add own message (real-time subscription will also fire but we dedupe)
        setMessages((prev) => {
          if (prev.find((m) => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
      }

      setSending(false);
    },
    [currentUser, activeConversation, sending]
  );

  return (
    <ChatContext.Provider
      value={{
        chatOpen,
        activeLawyer,
        activeConversation,
        messages,
        sending,
        unreadCount,
        openChat,
        closeChat,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
