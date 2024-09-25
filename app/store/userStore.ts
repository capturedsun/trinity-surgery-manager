import { User } from "@/src/entities/models/user";
import { create } from 'zustand';

interface UserStore {
  user: User | null;
  error: string | null;
  loading: boolean;
  setUser: (user: User) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  error: null,
  loading: true,
  setUser: (user: User) => set({ user, loading: false, error: null }),
  setError: (error: string) => set({ error, loading: false }),
  setLoading: (loading: boolean) => set({ loading }),
}));