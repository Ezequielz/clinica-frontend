import { create } from 'zustand';

interface State {
    isSideMenuOpen: boolean;
    modal: boolean;
    // Methods
    openSideMenu: () => void;
    closeSideMenu: () => void;

    openModal: () => void;
    closeModal: () => void;
}

export const useUIStore = create<State>()((set) => ({
    isSideMenuOpen: false,
    modal: false,
    // Methods
    openSideMenu: () => set({ isSideMenuOpen: true }),
    closeSideMenu: () => set({ isSideMenuOpen: false }),

    openModal: () => set({ modal: true }),
    closeModal: () => set({ modal: false }),
}));