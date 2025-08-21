// stores/useAuth.ts
import { create } from "zustand";
import apiClient from "../agent"; 

interface AuthState {
  isAuthed: boolean;
  loading: boolean;
  errored: boolean;

  setIsAuthed: () => void,
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  reset: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthed: false,
  loading: false,
  errored: false,

  setIsAuthed: () => {
    const token = localStorage.getItem('authToken')
    set({ isAuthed: !!token })
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
