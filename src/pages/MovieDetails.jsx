import React, { useCallback, useMemo, useState } from 'react';
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  Play,
  Plus,
  Star,
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWatchlist } from '../features/watchlist/watchlistSlice';
import { addRecent } from '../features/recent/recentSlice';
import { backdropUrl, posterUrl } from '../services/tmdbApi';
import { getRecommendations } from '../data/movies';
import MovieRow from '../components/MovieRow';
import TrailerModal from '../components/TrailerModal';

export default function MovieDetails() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const dispatch = useDispatch();

  const movie = useSelector((state) =>
    state.movies.catalog.find(
      (item) => String(item.id) === String(movieId)
    )
  );

  const saved = useSelector((state) =>
    state.watchlist.some(
      (item) => String(item.id) === String(movieId)
    )
  );

  const [trailerOpen, setTrailerOpen] = useState(false);

  const backdrop = useMemo(
    () => (movie ? backdropUrl(movie.backdrop_path) : ''),
    [movie]
  );

  const closeTrailer = useCallback(
    () => setTrailerOpen(false),
    []
  );

  // Save the movie to Recent and open the player.
  const handleWatchMovie = () => {
    dispatch(addRecent(movie));
    navigate(`/watch/${movie.id}`);
  };

  if (!movie) {
    return (
      <div className="page-state error-state">
        <h1>Movie not found</h1>
        <p>That title isn't in the local movie collection.</p>
        <Link className="button button-light" to="/">
          Back home
        </Link>
      </div>
    );
  }

  const recommendations = getRecommendations(movie);

  return (
    <div className="details-page">
      <section
        className="details-hero"
        style={
          backdrop
            ? {
                backgroundImage: `linear-gradient(90deg, #090909 0%, rgba(9,9,9,.86) 37%, rgba(9,9,9,.28) 100%), linear-gradient(0deg, #090909 0%, transparent 55%), url("${backdrop}")`,
              }
            : undefined
        }
      >
        <div className="details-content">
          <Link to="/" className="back-link">
            <ArrowLeft size={17} /> Back to browse
          </Link>

          {/* <span className="eyebrow">MOVIE SPOTLIGHT</span> */}

          <h1>{movie.title}</h1>

          <div className="details-meta">
            <span className="rating-score">
              <Star size={15} fill="currentColor" />
              {movie.vote_average.toFixed(1)}
              <small>/ 10</small>
            </span>

            <span>
              <CalendarDays size={15} />
              {movie.release_date}
            </span>

            {movie.runtime > 0 && (
              <span>
                <Clock3 size={15} />
                {Math.floor(movie.runtime / 60)}h{' '}
                {movie.runtime % 60}m
              </span>
            )}
          </div>

          <div className="genre-tags">
            {movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>

          <p className="details-overview">{movie.overview}</p>

          <div className="hero-actions">
            <button
              className="button button-light"
              onClick={() => setTrailerOpen(true)}
            >
              <Play size={18} fill="currentColor" />
              Watch trailer
            </button>

            <button
              className="button button-light"
              onClick={handleWatchMovie}
            >
              Watch Full Movie
            </button>

            <button
              className="button button-muted"
              onClick={() => dispatch(toggleWatchlist(movie))}
            >
              {saved ? <Check size={18} /> : <Plus size={18} />}
              {saved ? 'In My List' : 'Add to My List'}
            </button>
          </div>
        </div>

        <div className="details-poster-wrap">
          <img
            src={posterUrl(movie.poster_path)}
            alt={`${movie.title} poster`}
            className="details-poster"
          />
        </div>
      </section>

      <div className="details-extra">
        {movie.tagline && <blockquote>“{movie.tagline}”</blockquote>}

        <div className="detail-facts">
          <div>
            <span>STATUS</span>
            <strong>{movie.status}</strong>
          </div>
          <div>
            <span>LANGUAGE</span>
            <strong>{movie.original_language.toUpperCase()}</strong>
          </div>
          <div>
            <span>VOTE COUNT</span>
            <strong>{movie.vote_count.toLocaleString()}</strong>
          </div>
          <div>
            <span>POPULARITY</span>
            <strong>{Math.round(movie.popularity).toLocaleString()}</strong>
          </div>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="recommendations">
          <MovieRow
            title="You might also like"
            movies={recommendations}
          />
        </div>
      )}

      {trailerOpen && (
        <TrailerModal
          videoKey={movie.trailerKey}
          title={movie.title}
          onClose={closeTrailer}
        />
      )}
    </div>
  );
}