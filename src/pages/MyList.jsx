import React from 'react';
import { Bookmark, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import MovieCard from '../components/MovieCard';
import { removeFromWatchlist } from '../features/watchlist/watchlistSlice';

export default function MyList() {
  const movies = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();

  return (
    <section className="browse-page my-list-page">
      <div className="page-title-block">
        <span className="eyebrow">YOUR PERSONAL COLLECTION</span>
        <h1>
          My List <span className="count-pill">{movies.length}</span>
        </h1>
        <p>Keep your next movie night just a click away.</p>
      </div>

      {movies.length ? (
        <>
          <div className="list-toolbar">
            <span>
              {movies.length} saved {movies.length === 1 ? 'title' : 'titles'}
            </span>

            <button
              className="text-button"
              onClick={() =>
                movies.forEach((movie) =>
                  dispatch(removeFromWatchlist(movie.id))
                )
              }
            >
              <Trash2 size={15} /> Clear list
            </button>
          </div>

          <div className="movie-grid">
            {movies.map((movie) => (
              <div className="saved-movie" key={movie.id}>
                <MovieCard movie={movie} />

                <button
                  className="remove-saved"
                  onClick={() =>
                    dispatch(removeFromWatchlist(movie.id))
                  }
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="empty-search">
          <div className="empty-icon">
            <Bookmark size={28} />
          </div>
          <h2>Your list is waiting</h2>
          <p>Save movies you want to watch later.</p>
          <Link className="button button-red" to="/">
            Explore movies
          </Link>
        </div>
      )}
    </section>
  );
}