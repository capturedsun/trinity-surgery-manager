"use client";

import React, { useEffect, ReactNode } from "react";
import { User } from "@/src/entities/models/user";
import { useUserStore } from "@/src/store/userStore";

export const UserProvider: React.FC<{ children: ReactNode, user: User }> = ({ children, user }) => {
  const setUser = useUserStore((state: any) => state.setUser);
  const setLoading = useUserStore((state: any) => state.setLoading);

  useEffect(() => {
    setUser(user);
    setLoading(false);
  }, [user, setUser, setLoading]);

  return <>{children}</>;
};

export const useUser = () => {
  const user = useUserStore((state: any) => state.user);
  const error = useUserStore((state: any) => state.error);
  const loading = useUserStore((state: any) => state.loading);
  return { user, error, loading };
};