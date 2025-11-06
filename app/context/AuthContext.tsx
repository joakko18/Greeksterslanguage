'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCookie } from 'cookies-next'; 

// Define the shape of our context state
interface AuthContextType {
  isLoggedIn: boolean;
  setLoggedInState: (state: boolean) => void; 
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 🔑 Initial state is FALSE (hide the button by default)
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const setLoggedInState = (state: boolean) => {
    setIsLoggedIn(state);
  };

  // 1. Check Cookie on Mount
  useEffect(() => {
    const functionalToken = getCookie('supabase-temp-token');
    // 🔑 If the token exists, set state to true, otherwise it remains false (hidden)
    setIsLoggedIn(!!functionalToken);

    // Optional: Add a simple window storage listener for cross-tab sync 
    const handleStorageChange = () => {
      const token = getCookie('supabase-temp-token');
      setIsLoggedIn(!!token);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedInState }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};