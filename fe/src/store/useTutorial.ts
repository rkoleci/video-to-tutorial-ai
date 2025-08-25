import { create } from "zustand";
import apiClient from "../agent";
import { StatusEnum, type Tutorial } from "../types";

interface TutorialState {
  loading: boolean;
  loaded: boolean;
  errored: boolean;

  loadingMyTutorials: boolean;
  myTutorials: Tutorial[];

  loadingTutorial: boolean;
  currentTutorial: Tutorial | null;

  pollingIntervalId: any;

  createTutorial: (videoId: string, redirect: (id: string) => void) => Promise<void>;
  getMyTutorials: () => Promise<void>;
  getTutorialById: (id: string) => Promise<void>;
  startPollingTutorial: (id: string, intervalMs?: number) => void;
  stopPollingTutorial: () => void;
  reset: () => void;
}

export const useTutorialStore = create<TutorialState>((set, get) => ({
  loading: false,
  loaded: false,
  errored: false,

  loadingMyTutorials: false,
  myTutorials: [],

  loadingTutorial: false,
  currentTutorial: null,

  pollingIntervalId: null,

  createTutorial: async (videoId: string, redirect: (id: string) => void) => {
    set({ loading: true, loaded: false, errored: false });
    try {
      const response = await apiClient.post(`/tutorials`, { vid: videoId });
      if (response.status === 201 && response.data.id) {
        set({ loading: false, loaded: true, errored: false });
        redirect(response.data.id)
      }
    } catch (error) {
      console.error("Create tutorial error:", error);
      set({ loading: false, loaded: false, errored: true });
    }
  },

  getMyTutorials: async () => {
    set({ loadingMyTutorials: true });
    try {
      const response = await apiClient.post(`/tutorials/user`);
      set({ myTutorials: response.data, loadingMyTutorials: false });
    } catch (error) {
      console.error("Get my tutorials error:", error);
      set({ myTutorials: null, loadingMyTutorials: false });
    }
  },

  getTutorialById: async (id: string) => {
    set({ loadingTutorial: true });
    try {
      const response = await apiClient.get(`/tutorials/${id}`);
      set({ currentTutorial: response.data, loadingTutorial: false });
    } catch (error) {
      console.error("Get tutorial by ID error:", error);
      set({ currentTutorial: null, loadingTutorial: false });
    }
  },

  startPollingTutorial: (id: string, intervalMs = 3000) => {
    const { pollingIntervalId, getTutorialById, stopPollingTutorial } = get();

    if (pollingIntervalId) stopPollingTutorial();

    const interval = setInterval(async () => {
      await getTutorialById(id);

      const { currentTutorial } = get();
      if (currentTutorial && currentTutorial.status === StatusEnum.COMPLETED) {
        console.log("Tutorial ready! stopping polling.");
        stopPollingTutorial();
      }
    }, intervalMs);

    set({ pollingIntervalId: interval });
  },

  stopPollingTutorial: () => {
    const { pollingIntervalId } = get();
    if (pollingIntervalId) {
      clearInterval(pollingIntervalId);
      set({ pollingIntervalId: null });
    }
  },

  reset: () =>
    set({
      loading: false,
      loaded: false,
      errored: false,
      loadingMyTutorials: false,
      myTutorials: null,
      loadingTutorial: false,
      currentTutorial: null,
      pollingIntervalId: null,
    }),
}));
