
import React from 'react';
import { Link, useParams } from 'react-router';
import { useSelector } from 'react-redux';
// import './WatchMovie.css';

export default function WatchMovie() {
  const { movieId } = useParams();

  const movie = useSelector((state) =>
    state.movies.catalog.find(
      (item) => String(item.id) === String(movieId)
    )
  );

  if (!movie) {
    return <h2>Movie not found</h2>;
  }

  const videoId = movie.movieUrl
    ? new URL(movie.movieUrl).searchParams.get('v')
    : null;

  return (
    <main className="watch-page">
      <Link to={`/movie/${movie.id}`} className="back-button">
        ← Back to Details
      </Link>

      <section className="watch-content">
        <h1>{movie.title}</h1>

        <div className="video-container">
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={movie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <p>Video unavailable</p>
          )}
        </div>

        <p className="watch-overview">{movie.overview}</p>
      </section>
    </main>
  );
}
