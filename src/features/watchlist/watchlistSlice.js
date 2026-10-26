import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'streamflix-watchlist';

function loadWatchlist() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    console.log(JSON.parse(saved))
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: loadWatchlist(),
  reducers: {
    toggleWatchlist(state, action) {
      const movie = action.payload;
      const index = state.findIndex((item) => item.id === movie.id);
      if (index >= 0) {
        state.splice(index, 1);
      } else {
        state.push(movie);
      }
    },
    removeFromWatchlist(state, action) {
      const index = state.findIndex((movie) => movie.id === action.payload);
      if (index >= 0) state.splice(index, 1);
    },
    clearWatchlist() {
      return [];
    },
  },
});

export const { toggleWatchlist, removeFromWatchlist, clearWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
