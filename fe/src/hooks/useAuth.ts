import { create } from "zustand";
import apiClient from "../agent";
import type { User } from "../types";

interface AuthState {
  isAuthed: boolean;
  loading: boolean;
  errored: boolean;

  user: User | null;

  setIsAuthed: () => void,
  login: (credentials: { username: string; password: string }) => Promise<void>;
  getMe: () => void;
  logout: () => Promise<void>;
  reset: () => void;
}

export const useAuth = create<AuthState>((set, get) => ({
  isAuthed: false,
  loading: false,
  errored: false,

  user: null,

  setIsAuthed: () => {
    const token = localStorage.getItem('authToken')
    set({ isAuthed: !!token })

    if (token) {
      const { getMe } = get()
      getMe()
    }

  },

  login: async (credentials) => {
    set({ loading: true, errored: false });

    try {
      const response = await apiClient.post("/auth/login", credentials);

      if (response.status === 200) {
        // You can also store token here if needed
        localStorage.setItem('authToken', 'authToken') // TODO
        set({ isAuthed: true, loading: false, errored: false });
      } else {
        set({ isAuthed: false, loading: false, errored: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      set({ isAuthed: false, loading: false, errored: true });
    }
  },

  getMe: async () => {
    set({ loading: true, errored: false });

    try {
      const response = await apiClient.get("/auth/me");

      if (response.status === 200) {
        set({ user: response.data });
      } else {
        set({ user: null });
      }
    } catch (error) {
      console.error("Login error:", error);
      set({ user: null });
    }
  },

  logout: async () => {
    set({ loading: true });

    try {
      await apiClient.post("/auth/logout");
      localStorage.removeItem('authToken')
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      set({ isAuthed: false, loading: false, errored: false });
    }
  },

  reset: () => set({ isAuthed: false, loading: false, errored: false }),
}));
