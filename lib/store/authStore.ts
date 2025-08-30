import { User } from "@/types/user";
import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => {});
