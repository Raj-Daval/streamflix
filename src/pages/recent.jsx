import React from 'react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearRecent,
  removeRecent,
} from '../features/recent/recentSlice';
import { posterUrl } from '../services/tmdbApi';
// import './Recent.css';

export default function Recent() {
  const dispatch = useDispatch();

  const recentMovies = useSelector((state) => state.recent);

  return (
    <main className="watch-page">
      <Link to="/" className="back-button">
        ← Back to Browse
      </Link>

      <section className="watch-content">
        <h1>Recently Watched</h1>

        {recentMovies.length === 0 ? (
          <p>No recently watched movies yet.</p>
        ) : (
          <>
            <button
              className="button button-muted"
              onClick={() => dispatch(clearRecent())}
            >
              Clear History
            </button>

            <div className="recent-movies">
              {recentMovies.map((movie) => (
                <div className="recent-movie" key={movie.id}>
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      src={posterUrl(movie.poster_path)}
                      alt={`${movie.title} poster`}
                    />
                  </Link>

                  <div className="recent-movie-info">
                    <h2>{movie.title}</h2>

                    <p>{movie.overview}</p>

                    <Link
                      to={`/movie/${movie.id}`}
                      className="button button-light"
                    >
                      View Details
                    </Link>

                    <button
                      className="button button-muted"
                      onClick={() => dispatch(removeRecent(movie.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}