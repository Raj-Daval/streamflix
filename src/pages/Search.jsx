import React, { useMemo, useState } from 'react';
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import MovieCard from '../components/MovieCard';

export default function Search() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [sort, setSort] = useState('popular');

  const catalog = useSelector((state) => state.movies.catalog);
  const activeQuery = (params.get('q') || '').trim();

  const results = useMemo(() => {
    const normalized = activeQuery.toLowerCase();

    return catalog
      .filter(
        (movie) =>
          !normalized ||
          `${movie.title} ${movie.overview} ${movie.genres
            .map((genre) => genre.name)
            .join(' ')}`
            .toLowerCase()
            .includes(normalized)
      )
      .sort((a, b) =>
        sort === 'rating'
          ? b.vote_average - a.vote_average
          : sort === 'newest'
            ? b.release_date.localeCompare(a.release_date)
            : b.popularity - a.popularity
      );
  }, [catalog, activeQuery, sort]);

  const submit = (event) => {
    event.preventDefault();

    const cleaned = query.trim();
    setParams(cleaned ? { q: cleaned } : {});
  };

  return (
    <section className="browse-page">
      <div className="page-title-block">
        <span className="eyebrow">FIND YOUR NEXT FAVOURITE</span>
        <h1>Discover titles</h1>
        <p>
          Search the StreamFlix collection — powered by a local JavaScript
          array.
        </p>
      </div>

      <form className="large-search" onSubmit={submit}>
        <SearchIcon size={21} />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies or genres..."
          aria-label="Search movies"
        />

        <button
          type="button"
          className="clear-search"
          onClick={() => {
            setQuery('');
            setParams({});
          }}
          aria-label="Clear search"
        >
          <X size={18} />
        </button>

        <button className="button button-red" type="submit">
          Search
        </button>
      </form>

      {activeQuery && (
        <div className="results-toolbar">
          <div>
            <h2>Results for “{activeQuery}”</h2>
            <p>
              {results.length}{' '}
              {results.length === 1 ? 'title' : 'titles'} found
            </p>
          </div>

          <label className="sort-control">
            <SlidersHorizontal size={16} />
            <span>Sort</span>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="popular">Most popular</option>
              <option value="rating">Highest rated</option>
              <option value="newest">Newest</option>
            </select>
          </label>
        </div>
      )}

      {!activeQuery && (
        <div className="empty-search">
          <div className="empty-icon">
            <SearchIcon size={28} />
          </div>

          <h2>What are you in the mood for?</h2>
          <p>Search by movie title, story, or genre.</p>
        </div>
      )}

      {activeQuery &&
        (results.length ? (
          <div className="movie-grid">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty-search">
            <h2>No titles found</h2>
            <p>
              Try a different spelling or a genre such as action, drama, or
              animation.
            </p>
          </div>
        ))}
    </section>
  );
}
