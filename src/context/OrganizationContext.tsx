"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getOrganization } from "@/utils/supabase/organizationActions";
import { Organization } from "@/data/schema";

interface OrganizationContextType {
  organization: Organization | null;
  error: string | null;
  loading: boolean;
}

// Define the context with a default value
const OrganizationContext = createContext<any>(null);

export const OrganizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrganization = async (retries = 3) => {
      try {
        const fetchedOrganization = await getOrganization();
        setOrganization(fetchedOrganization?.organization);
        setError(null);
      } catch (error) {
        if (retries > 0) {
          setTimeout(() => fetchOrganization(retries - 1), 1000);
        } else {
          console.error("Error fetching organization:", error);
          setError("Failed to fetch organization");
          setOrganization(null);
        }
      } finally {
        setLoading(false);
      }
    };

    if (!organization) {
      fetchOrganization();
    } else {
      console.log("organization data already fetched")
      setLoading(false);
    }
    fetchOrganization();
  }, []);

  return (
    <OrganizationContext.Provider value={{ organization, error, loading }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => useContext(OrganizationContext);