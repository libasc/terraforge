'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface LightboxImage {
  url: string;
  title?: string;
  category?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const current = images[index];
  const total = images.length;

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
      aria-modal="true"
      role="dialog"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 lg:px-10 py-5 border-b border-white/10 flex-shrink-0">
        <div>
          {current.category && (
            <p className="text-[10px] tracking-[0.2em] uppercase text-tf-stone mb-0.5">{current.category}</p>
          )}
          {current.title && (
            <p className="text-white font-display text-xl font-500 tracking-wide">{current.title}</p>
          )}
        </div>
        <div className="flex items-center gap-6">
          <span className="text-tf-stone text-sm font-mono">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Image area */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden p-4 lg:p-10">
        <img
          key={index}
          src={current.url}
          alt={current.title ?? 'Gallery image'}
          className="max-w-full max-h-full object-contain animate-fade-in"
          style={{ maxHeight: 'calc(100vh - 140px)' }}
        />

        {/* Prev button */}
        {total > 1 && (
          <button
            onClick={onPrev}
            aria-label="Previous image"
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        )}

        {/* Next button */}
        {total > 1 && (
          <button
            onClick={onNext}
            aria-label="Next image"
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      {total > 1 && (
        <div className="flex-shrink-0 flex items-center gap-2 px-6 lg:px-10 py-4 border-t border-white/10 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => {
                if (i < index) onPrev();
                else if (i > index) onNext();
              }}
              className={`flex-shrink-0 w-14 h-10 overflow-hidden transition-opacity duration-200 ${
                i === index ? 'opacity-100 ring-1 ring-tf-bronze' : 'opacity-40 hover:opacity-70'
              }`}
            >
              <img src={img.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}
