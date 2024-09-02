"use client";

import React, { createContext, ReactNode, useContext } from "react";
import { useQuery } from '@tanstack/react-query';
import { Organization } from "@/data/schema";

const OrganizationContext = createContext<Organization | undefined>(undefined);

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const { data: organization, error, isLoading } = useQuery<Organization, Error>({
    queryKey: ['organization'],
    queryFn: async () => {
      const res = await fetch('/api/organization', { method: 'GET' });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch organization");
      }
      return res.json();
    }
  });

  if (isLoading) return <div>Loading organization...</div>;
  if (error) return <div>Error fetching organization: {error.message}</div>;

  return (
    <OrganizationContext.Provider value={organization}>
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
}