import React, { useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
// import { usePreferences } from '../context/PreferencesContext';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';

export default function Home() {
  const { home, genres } = useSelector((state) => state.movies);

  // const { compact, toggleDensity } = usePreferences();

  const featured = useMemo(
    () => home.trending[0] || home.popular[0],
    [home.trending, home.popular]
  );

  return (
    <div className="home-page">
      <HeroBanner movie={featured} />

      <div className="home-content">
        <div className="welcome-line">
          <div>
            <span className="eyebrow">YOUR FRONT-ROW SEAT</span>
            <h2>Explore the collection</h2>
          </div>
        </div>

        <MovieRow
          id="trending-row"
          title="Trending this week"
          movies={home.trending}
        />

        <MovieRow
          id="popular-row"
          title="Popular on StreamFlix"
          movies={home.popular}
        />

        <MovieRow
          id="now-playing-row"
          title="Fresh picks"
          movies={home.nowPlaying}
        />

        <MovieRow
          id="top-rated-row"
          title="Critically loved"
          movies={home.topRated}
        />

        <MovieRow
          id="upcoming-row"
          title="Coming soon"
          movies={home.upcoming}
        />

        {genres.map((genre) => {
          const movies = home.trending.filter((movie) =>
            movie.genreIds.includes(genre.id)
          );

          return (
            <MovieRow
              key={genre.id}
              id={`genre-${genre.id}`}
              title={genre.name}
              movies={movies}
            />
          );
        })}
      </div>
    </div>
  );
}

// <button className="density-toggle" onClick={toggleDensity}>
//   <SlidersHorizontal size={16} />
//   {compact ? 'Comfortable cards' : 'Compact cards'}
// </button>
