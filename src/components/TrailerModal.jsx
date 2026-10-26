import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function TrailerModal({ videoKey, title, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="trailer-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${title} trailer`}
      >
        <div className="modal-heading">
          <div>
            <span className="eyebrow">NOW PLAYING</span>
            <h2>{title} — Trailer</h2>
          </div>

          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close trailer"
          >
            <X />
          </button>
        </div>

        <div className="video-frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0`}
            title={`${title} official trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
}
