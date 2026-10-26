import React, { useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

export default function MovieRow({ title, movies = [], id }) {
  const rowRef = useRef(null);

  const scroll = useCallback((direction) => {
    if (!rowRef.current) return;

    rowRef.current.scrollBy({
      left: direction * rowRef.current.clientWidth * 0.82,
      behavior: 'smooth',
    });
  }, []);

  if (!movies.length) return null;

  return (
    <section className="movie-section" aria-labelledby={id}>
      <div className="section-heading">
        <h2 id={id}>{title}</h2>

        <div className="row-controls">
          <button
            onClick={() => scroll(-1)}
            className="row-arrow"
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => scroll(1)}
            className="row-arrow"
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="movie-row" ref={rowRef}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
