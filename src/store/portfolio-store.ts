// src/store/portfolio-store.ts
import { create } from 'zustand';

interface PortfolioState {
  currentSection: string;
  isLoading: boolean;
  soundEnabled: boolean;
  setCurrentSection: (section: string) => void;
  setLoading: (loading: boolean) => void;
  toggleSound: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  currentSection: 'hero',
  isLoading: true,
  soundEnabled: false,
  setCurrentSection: (section) => set({ currentSection: section }),
  setLoading: (loading) => set({ isLoading: loading }),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
}));