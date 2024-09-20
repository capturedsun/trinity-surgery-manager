"use client"

import React, { createContext, useContext } from 'react';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import { getQueryClient } from '@/app/utils/query-client';
import { checkSessionController } from '@/src/interface-adapters/controllers/auth/check-session.controller';
import { User } from '@/src/entities/models/user';

interface AppDataContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const AppDataContext = createContext<AppDataContextType | null>(null);

const AppDataFetcher = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, error } = useQuery<{ user: User }>({
    queryKey: ['user'],
    queryFn: checkSessionController,
  });

  return (
    <AppDataContext.Provider value={{ user: data?.user || null, isLoading, error: error ? error.message : null }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const AppDataProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppDataFetcher>
        {children}
      </AppDataFetcher>
    </QueryClientProvider>
  );
};

export const useAppDataContext = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppDataContext must be used within an AppDataProvider');
  }
  return context;
};