import { create } from 'zustand';

const useStore = create((set) => ({
    progress: 0,
    setProgress: (progress) => set(() => ({ progress })),
}));

export default useStore;