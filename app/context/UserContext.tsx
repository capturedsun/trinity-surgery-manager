"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/app/data/schema";

const UserContext = createContext<any>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async (retries = 3) => {
      try {
        const res = await fetch('/api/user', { method: 'GET' });
        const data = await res.json();
        console.log(data)
        setUserData(data?.user);
        setError(null);
      } catch (error) {
        if (retries > 0) {
          setTimeout(() => fetchUserData(retries - 1), 1000);
        } else {
          console.error("Error fetching user data:", error);
          setError("Failed to fetch user data");
          setUserData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, error, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);