import create from 'zustand';

const useStore = create((set) => ({
    title: '',
    artist: '',
    album: '',
    year: '',
    songs: [],
    addSong: (song) => set((state) => ({ songs: [...state.songs, song] })),
}));

export default useStore;