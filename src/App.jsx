import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
// import { usePreferences } from './context/PreferencesContext';

export default function App() {
  // const { compact } = usePreferences();

  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-brand">STREAMFLIX</div>

        <p>Movie discovery, made for your next movie night.</p>

        <small>
          This is an independent portfolio project and is not affiliated with
          Netflix. Movie information is stored locally in this demo project.
        </small>

        <span>Built with React + Redux Toolkit</span>
      </footer>
    </div>
  );
}
