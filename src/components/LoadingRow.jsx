import React from 'react';

export default function LoadingRow({ title = 'Loading titles' }) {
  return (
    <section className="movie-section">
      <div className="section-heading">
        <h2>{title}</h2>
      </div>

      <div className="movie-row">
        {Array.from({ length: 6 }, (_, index) => (
          <div className="skeleton-card" key={index}>
            <div className="skeleton-poster shimmer" />
            <div className="skeleton-line shimmer" />
            <div className="skeleton-line short shimmer" />
          </div>
        ))}
      </div>
    </section>
  );
}
