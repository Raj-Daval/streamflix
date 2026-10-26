
import React, { useMemo, useState } from 'react';
import { Info, Play, Plus, Check } from 'lucide-react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWatchlist } from '../features/watchlist/watchlistSlice';
import { backdropUrl } from '../services/tmdbApi';

export default function HeroBanner({ movie }) {
  const [expanded, setExpanded] = useState(false);

  const dispatch = useDispatch();

  const saved = useSelector((state) =>
    movie &&
    state.watchlist.some((item) => item.id === movie.id)
  );

  const background = useMemo(
    () =>
      movie
        ? backdropUrl(movie.backdrop_path, 'original')
        : '',
    [movie]
  );

  if (!movie) {
    return (
      <div className="hero hero-empty">
        <div className="hero-content">
          <span className="eyebrow">YOUR NEXT OBSESSION</span>
          <h1>Stories worth staying in for.</h1>
          <p>Discover your next favourite movie.</p>
        </div>
      </div>
    );
  }

  const title = movie.title || movie.name;

  const description =
    movie.overview || 'Discover the story behind this title.';

  return (
    <section
      className="hero"
      style={
        background
          ? {
              backgroundImage: `linear-gradient(90deg, rgba(8,8,8,.98) 0%, rgba(8,8,8,.78) 38%, rgba(8,8,8,.16) 76%), linear-gradient(0deg, #090909 0%, transparent 38%), url("${background}")`,
            }
          : undefined
      }
    >
      <div className="hero-content">
        <span className="eyebrow">
          <span className="eyebrow-mark">S</span>
          STREAMFLIX ORIGINAL DISCOVERY
        </span>

        <h1>{title}</h1>

        <div className="hero-meta">
          <span className="match-score">
            {Math.round((movie.vote_average || 0) * 10)}% Match
          </span>

          <span>
            {(movie.release_date || '').slice(0, 4) || 'New'}
          </span>

          <span className="rating-chip">HD</span>
        </div>

        <p className={`hero-description${expanded ? ' expanded' : ''}`}>
          {description}
        </p>

        <div className="hero-actions">
          <Link
            className="button button-light"
            to={`/movie/${movie.id}`}
          >
            <Play size={19} fill="currentColor" />
            Explore title
          </Link>

          <button
            className="button button-muted"
            onClick={() => dispatch(toggleWatchlist(movie))}
          >
            {saved ? <Check size={19} /> : <Plus size={19} />}
            {saved ? 'In My List' : 'My List'}
          </button>

          <button
            className="button button-ghost hero-info-button"
            onClick={() => setExpanded((value) => !value)}
          >
            <Info size={19} />
            <span>{expanded ? 'Less info' : 'More info'}</span>
          </button>
        </div>
      </div>

      <div className="hero-bottom-label">
        <span className="live-dot" />
        CURATED FOR YOUR NEXT MOVIE NIGHT
      </div>
    </section>
  );
}
