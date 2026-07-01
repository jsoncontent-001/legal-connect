// src/services/lawyerService.js
import { supabase } from "../lib/supabase";

export const lawyerService = {
  // Fetch all lawyers with their profiles joined
  getAll: async () => {
    const { data, error } = await supabase
      .from("lawyer_profiles")
      .select(`
        *,
        profiles (
          id, full_name, email, avatar_url, created_at
        )
      `)
      .eq("status", "approved")
      .order("rating", { ascending: false });

    if (error) { console.error("getAll lawyers:", error.message); return []; }
    return data.map(normalizeLawyer);
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from("lawyer_profiles")
      .select(`*, profiles(id, full_name, email, avatar_url)`)
      .eq("id", id)
      .single();

    if (error) return null;
    return normalizeLawyer(data);
  },

  filter: async ({ search, specialization, location, availability }) => {
    let query = supabase
      .from("lawyer_profiles")
      .select(`*, profiles(id, full_name, email, avatar_url)`)
      .eq("status", "approved")
      .order("rating", { ascending: false });

    if (specialization && specialization !== "all") {
      query = query.eq("specialization", specialization);
    }
    if (location && location !== "all") {
      query = query.eq("location", location);
    }
    if (availability === "available") {
      query = query.eq("available", true);
    } else if (availability === "busy") {
      query = query.eq("available", false);
    }

    const { data, error } = await query;
    if (error) { console.error("filter lawyers:", error.message); return []; }

    let results = data.map(normalizeLawyer);

    // Client-side text search (name / bio)
    if (search && search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (l) =>
          l.fullName.toLowerCase().includes(q) ||
          l.specialization.toLowerCase().includes(q) ||
          (l.bio || "").toLowerCase().includes(q)
      );
    }

    return results;
  },

  update: async (id, updates) => {
    const dbUpdates = {};
    if (updates.available !== undefined) dbUpdates.available = updates.available;
    if (updates.bio !== undefined) dbUpdates.bio = updates.bio;
    if (updates.hourlyRate !== undefined) dbUpdates.hourly_rate = Number(updates.hourlyRate);
    if (updates.experience !== undefined) dbUpdates.experience = Number(updates.experience);
    if (updates.specialization !== undefined) dbUpdates.specialization = updates.specialization;
    if (updates.location !== undefined) dbUpdates.location = updates.location;

    const { data, error } = await supabase
      .from("lawyer_profiles")
      .update(dbUpdates)
      .eq("id", id)
      .select(`*, profiles(id, full_name, email, avatar_url)`)
      .single();

    if (error) { console.error("update lawyer:", error.message); return null; }
    return normalizeLawyer(data);
  },

  // Subscribe to real-time lawyer availability changes
  subscribeToLawyers: (callback) => {
    return supabase
      .channel("lawyer_profiles_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "lawyer_profiles" },
        callback
      )
      .subscribe();
  },
};

// Normalize DB row → app shape
function normalizeLawyer(row) {
  return {
    id: row.id,
    fullName: row.profiles?.full_name || "Unknown",
    email: row.profiles?.email || "",
    avatarUrl: row.profiles?.avatar_url || null,
    specialization: row.specialization,
    experience: row.experience || 0,
    hourlyRate: row.hourly_rate || 0,
    location: row.location || "",
    barNumber: row.bar_number || "",
    bio: row.bio || "",
    available: row.available ?? true,
    rating: Number(row.rating) || 0,
    reviewCount: row.review_count || 0,
    status: row.status || "pending",
    verified: row.verified || false,
    role: "lawyer",
  };
}
