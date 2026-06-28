// src/services/authService.js
import { supabase } from "../lib/supabase";

export const authService = {
  register: async (userData) => {
    const {
      fullName, email, password, role,
      specialization, experience, hourlyRate,
      location, barNumber, bio,
    } = userData;

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role },
      },
    });

    if (authError) return { success: false, error: authError.message };
    if (!authData.user) return { success: false, error: "Signup failed" };

    // Wait a moment for the trigger to create the profile
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (role === "lawyer") {
      const { error: lpError } = await supabase
        .from("lawyer_profiles")
        .insert({
          id: authData.user.id,
          specialization,
          experience: Number(experience) || 0,
          hourly_rate: Number(hourlyRate) || 0,
          location,
          bar_number: barNumber,
          bio,
          available: true,
          rating: 0,
          review_count: 0,
        });
      if (lpError) console.error("Lawyer profile error:", lpError.message);
    }

    return { success: true, user: { id: authData.user.id, fullName, email, role } };
  },

  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { success: false, error: error.message };

    // Retry profile fetch up to 3 times
    let profile = null;
    for (let i = 0; i < 3; i++) {
      const { data: p } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();
      if (p) { profile = p; break; }
      await new Promise((r) => setTimeout(r, 500));
    }

    const user = {
      id: data.user.id,
      fullName: profile?.full_name || data.user.user_metadata?.full_name || email,
      email: data.user.email,
      role: profile?.role || data.user.user_metadata?.role || "customer",
    };

    return { success: true, user };
  },

  logout: async () => {
    await supabase.auth.signOut();
  },

  onAuthChange: (callback) => {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        const user = {
          id: session.user.id,
          fullName: profile?.full_name || session.user.user_metadata?.full_name || session.user.email,
          email: session.user.email,
          role: profile?.role || session.user.user_metadata?.role || "customer",
        };
        callback(user);
      } else {
        callback(null);
      }
    });
  },

  getCurrentSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    return {
      id: session.user.id,
      fullName: profile?.full_name || session.user.user_metadata?.full_name,
      email: session.user.email,
      role: profile?.role || session.user.user_metadata?.role || "customer",
    };
  },
};
