// src/contexts/LawyerContext.jsx
import React, { createContext, useState, useEffect, useCallback } from "react";
import { authService } from "../services/authService";
import { lawyerService } from "../services/lawyerService";

export const LawyerContext = createContext();

export const LawyerProvider = ({ children }) => {
  const [lawyers, setLawyers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [authModal, setAuthModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  // On mount: restore session + fetch lawyers
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      setLoading(true);
      const session = await authService.getCurrentSession();
      if (mounted) setCurrentUser(session);

      const data = await lawyerService.getAll();
      if (mounted) setLawyers(data);
      if (mounted) setLoading(false);
    };

    init();

    // Listen for auth changes (login/logout from any tab)
    const { data: { subscription } } = authService.onAuthChange((user) => {
      if (mounted) setCurrentUser(user);
    });

    // Real-time lawyer list updates
    const channel = lawyerService.subscribeToLawyers(async () => {
      const data = await lawyerService.getAll();
      if (mounted) setLawyers(data);
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
      if (channel) channel.unsubscribe();
    };
  }, []);

  const refreshLawyers = useCallback(async () => {
    const data = await lawyerService.getAll();
    setLawyers(data);
  }, []);

  const login = async (email, password) => {
    setAuthLoading(true);
    const result = await authService.login(email, password);
    if (result.success) {
      setCurrentUser(result.user);
      setAuthModal(null);
    }
    setAuthLoading(false);
    return result;
  };

  const register = async (userData) => {
    setAuthLoading(true);
    const result = await authService.register(userData);
    if (result.success) {
      setCurrentUser(result.user);
      setAuthModal(null);
      // Give Supabase a moment then refresh lawyers list
      setTimeout(refreshLawyers, 1500);
    }
    setAuthLoading(false);
    return result;
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
  };

  const filterLawyers = useCallback(async (filters) => {
    return await lawyerService.filter(filters);
  }, []);

  return (
    <LawyerContext.Provider
      value={{
        lawyers,
        currentUser,
        authModal,
        setAuthModal,
        login,
        register,
        logout,
        filterLawyers,
        refreshLawyers,
        loading,
        authLoading,
      }}
    >
      {children}
    </LawyerContext.Provider>
  );
};
