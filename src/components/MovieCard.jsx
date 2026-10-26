import React, { useState } from 'react';
import { Check, Info, Plus, Star } from 'lucide-react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWatchlist } from '../features/watchlist/watchlistSlice';
import { posterUrl } from '../services/tmdbApi';

export default function MovieCard({ movie }) {
  const [imageFailed, setImageFailed] = useState(false);

  const dispatch = useDispatch();

  const saved = useSelector((state) =>
    state.watchlist.some((item) => item.id === movie.id)
  );

  const poster = !imageFailed && posterUrl(movie.poster_path, 'w342');

  return (
    <article className="movie-card">
      <Link
        to={`/movie/${movie.id}`}
        className="poster-link"
        aria-label={`View ${movie.title || movie.name || 'movie'} details`}
      >
        {poster ? (
          <img
            className="movie-poster"
            src={poster}
            alt={`${movie.title || movie.name} poster`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="poster-fallback">
            <span>{movie.title || movie.name || 'Movie'}</span>
            <small>STREAMFLIX</small>
          </div>
        )}

        <span className="poster-rating">
          <Star size={12} fill="currentColor" />
          {(movie.vote_average || 0).toFixed(1)}
        </span>
      </Link>

      <div className="movie-card-info">
        <div
          className="movie-card-title"
          title={movie.title || movie.name}
        >
          {movie.title || movie.name}
        </div>

        <div className="movie-card-meta">
          {(movie.release_date || movie.first_air_date || '').slice(0, 4) ||
            'Release TBA'}
          <span>•</span>
          Movie
        </div>

        <div className="movie-card-actions">
          <button
            className={`small-action${saved ? ' is-saved' : ''}`}
            onClick={() => dispatch(toggleWatchlist(movie))}
            aria-label={
              saved ? 'Remove from My List' : 'Add to My List'
            }
            title={saved ? 'Remove from My List' : 'Add to My List'}
          >
            {saved ? <Check size={16} /> : <Plus size={16} />}
          </button>

          <Link
            className="small-action"
            to={`/movie/${movie.id}`}
            aria-label="View details"
            title="View details"
          >
            <Info size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
