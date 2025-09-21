"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserDetails {
  userId: string;
  firstName: string;
  lastName: string;
  dob?: string;
  tob?: string;
  placeOfBirth?: string;
}

interface UserContextType {
  user: UserDetails | null;
  setUser: (u: UserDetails) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserDetails | null>(null);

  const setUser = (u: UserDetails) => setUserState(u);
  const clearUser = () => setUserState(null);

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
}
