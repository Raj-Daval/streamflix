import React from 'react';
import { createSlice } from '@reduxjs/toolkit';

const RECENT_STORAGE_KEY = 'streamflix-recent';

const loadRecent = () => {
  try {
    const saved = localStorage.getItem(RECENT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const recentSlice = createSlice({
  name: 'recent',
  initialState: loadRecent(),
  reducers: {
    addRecent: (state, action) => {
      const movie = action.payload;

      // Remove an older copy of this movie.
      const updated = state.filter(
        item => item.id !== movie.id
      );

      // Put the latest watched movie first.
      updated.unshift(movie);

      // Keep only the latest 20 movies.
      return updated.slice(0, 20);
    },

    removeRecent: (state, action) =>
      state.filter(movie => movie.id !== action.payload),

    clearRecent: () => [],
  },
});

export const {
  addRecent,
  removeRecent,
  clearRecent,
} = recentSlice.actions;

export default recentSlice.reducer;