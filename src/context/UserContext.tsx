"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getUserData } from "@/utils/supabase/userActions";

const UserContext = createContext<any>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedUserData = await getUserData();
        setUserData(fetchedUserData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);