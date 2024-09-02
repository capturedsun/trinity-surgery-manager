"use client";

import React, { createContext, ReactNode, useContext } from "react";
import { useQuery } from '@tanstack/react-query';
import { User } from "@/data/schema";

const UserContext = createContext<User | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: user, error, isLoading } = useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await fetch('/api/user', { method: 'GET' });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch user data");
      }
      return res.json();
    }
  });

  if (isLoading) return <div>Loading user...</div>;
  if (error) return <div>Error fetching user: {error.message}</div>;

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}