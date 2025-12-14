import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
    isAuthenticated: boolean;
    isGatePassed: boolean;
    login: () => void;
    passGate: () => void;
    reset: () => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            isGatePassed: false,
            login: () => set({ isAuthenticated: true }),
            passGate: () => set({ isGatePassed: true }),
            reset: () => set({ isAuthenticated: false, isGatePassed: false }),
        }),
        {
            name: 'yrc-storage',
        }
    )
);
