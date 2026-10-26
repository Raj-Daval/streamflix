import { createSlice } from '@reduxjs/toolkit';
import { genres, movieCatalog } from '../../data/movies';

const byPopularity = (a, b) => b.popularity - a.popularity;
const initialState = {
  catalog: movieCatalog,
  genres,
  home: {
    trending: [...movieCatalog].sort(byPopularity).slice(0, 10),
    popular: [...movieCatalog].sort(byPopularity).slice(2, 13),
    nowPlaying: movieCatalog.filter((movie) => ['2023', '2024'].includes(movie.release_date.slice(0, 4))),
    topRated: [...movieCatalog].sort((a, b) => b.vote_average - a.vote_average).slice(0, 10),
    upcoming: [...movieCatalog].filter((movie) => movie.release_date >= '2024-01-01').sort((a, b) => b.release_date.localeCompare(a.release_date)),
  },
  searchQuery: '',
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    clearSearch(state) {
      state.searchQuery = '';
    },
  },
});

export const { setSearchQuery, clearSearch } = moviesSlice.actions;
export default moviesSlice.reducer;
