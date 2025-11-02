import { create } from "zustand";
import { handleError } from "../utils/handleError";

export type User = {
  id: string;
  email: string;
  name?: string;
  token?: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  restore: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  restore: () => {
    try {
      const raw = localStorage.getItem("auth_user");
      const user = raw ? (JSON.parse(raw) as User) : null;
      if (user?.token) localStorage.setItem("auth_token", JSON.stringify(user.token));
      set({ user });
    } catch {}
  },
  login: async (email, password) => {
    set({ loading: true });
    try {
      void password;
      // Dummy auth flow
      await new Promise((r) => setTimeout(r, 600));
      const fake: User = { id: crypto.randomUUID(), email, name: email.split("@")[0], token: "dummy-token" };
      localStorage.setItem("auth_user", JSON.stringify(fake));
      localStorage.setItem("auth_token", JSON.stringify(fake.token));
      set({ user: fake });
    } catch (e) {
      handleError(e, "Failed to login");
    } finally {
      set({ loading: false });
    }
  },
  register: async (email, password) => {
    set({ loading: true });
    try {
      void password;
      await new Promise((r) => setTimeout(r, 800));
      const fake: User = { id: crypto.randomUUID(), email, name: email.split("@")[0], token: "dummy-token" };
      localStorage.setItem("auth_user", JSON.stringify(fake));
      localStorage.setItem("auth_token", JSON.stringify(fake.token));
      set({ user: fake });
    } catch (e) {
      handleError(e, "Failed to register");
    } finally {
      set({ loading: false });
    }
  },
  logout: () => {
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token");
    set({ user: null });
  },
}));
