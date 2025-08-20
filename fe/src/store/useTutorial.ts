import { create } from "zustand";
import apiClient from "../agent";

interface TutorialState {
    loading: boolean;
    loaded: boolean;
    errored: boolean;
    createTutorial: (videoId: string) => Promise<void>;
    reset: () => void;
}

export const useTutorialStore = create<TutorialState>((set) => ({
    loading: false,
    loaded: false,
    errored: false,

    createTutorial: async (videoId: string) => {
        set({ loading: true, loaded: false, errored: false });

        try {

            const response = await apiClient.post(`/tutorials`, {
                vid: videoId
            })

            if (response.status === 200) {
                set({ loading: false, loaded: true, errored: false });
            }


        } catch (error) {
            console.error('Create tutorial error:', error);
            set({ loading: false, loaded: false, errored: true });
        }
    },

    reset: () => set({ loading: false, loaded: false, errored: false }),
}));