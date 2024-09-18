import { create } from 'zustand';
import { User } from "@/src/entities/models/user";

interface UserState {
  user: User | null;
  error: string | null;
  loading: boolean;
  setUser: (user: User) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  error: null,
  loading: true,
  setUser: (user: User) => set({ user, loading: false, error: null }),
  setError: (error: string) => set({ error, loading: false }),
  setLoading: (loading: boolean) => set({ loading }),
}));