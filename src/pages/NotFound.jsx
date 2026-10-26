import React from 'react';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="page-state not-found">
      <span className="eyebrow">404 — LOST IN THE MULTIVERSE</span>

      <h1>This page took a wrong turn.</h1>

      <p>The title you're looking for isn't here.</p>

      <Link className="button button-red" to="/">
        Return home
      </Link>
    </div>
  );
}