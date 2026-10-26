import React, { useState } from 'react';
import { Clapperboard, Menu, Search, X } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const submitSearch = (event) => {
    event.preventDefault();

    const cleaned = query.trim();

    if (cleaned) {
      navigate(`/search?q=${encodeURIComponent(cleaned)}`);
      setSearchOpen(false);
      setMenuOpen(false);
    }
  };

  const navClass = ({ isActive }) =>
    `nav-link${isActive ? ' active' : ''}`;

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink
          to="/"
          className="brand"
          aria-label="StreamFlix home"
        >
          <Clapperboard size={25} strokeWidth={2.4} />

          <span>
            STREAM<span className="brand-light">FLIX</span>
          </span>
        </NavLink>

        <button
          className="icon-button mobile-menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={`nav-links${menuOpen ? ' nav-open' : ''}`}>
          <NavLink
            to="/"
            end
            className={navClass}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/search"
            className={navClass}
            onClick={() => setMenuOpen(false)}
          >
            Discover
          </NavLink>

          <NavLink
            to="/my-list"
            className={navClass}
            onClick={() => setMenuOpen(false)}
          >
            My List
          </NavLink>

          <NavLink
            to="/recent"
            className={navClass}
            onClick={() => setMenuOpen(false)}
          >
            Recent
          </NavLink>
        </nav>

        <div className="navbar-actions">
          {searchOpen && (
            <form
              className="nav-search"
              onSubmit={submitSearch}
            >
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search titles..."
                aria-label="Search movie titles"
              />

              <button
                className="icon-button"
                aria-label="Submit search"
              >
                <Search size={18} />
              </button>
            </form>
          )}

          <button
            className="icon-button search-toggle"
            onClick={() => setSearchOpen((open) => !open)}
            aria-label="Toggle search"
          >
            <Search />
          </button>

          <div className="avatar-chip" title="Demo profile">
            R
          </div>
        </div>
      </div>
    </header>
  );
}
