import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';
import watchlistReducer from '../features/watchlist/watchlistSlice';
import recentReducer from '../features/recent/recentSlice';
const WATCHLIST_STORAGE_KEY = 'streamflix-watchlist';
const RECENT_STORAGE_KEY = 'streamflix-recent';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    watchlist: watchlistReducer,
     recent: recentReducer,
  },
});

// Keep browser storage outside reducers so Redux reducers stay pure.
store.subscribe(() => {
  try {
    localStorage.setItem(
      WATCHLIST_STORAGE_KEY,
      JSON.stringify(store.getState().watchlist),
    );
    localStorage.setItem(
      RECENT_STORAGE_KEY,
      JSON.stringify(state.recent)
    );
  } catch {
    // The app still works for the current session if storage is unavailable.
  }
});
