'use client';

import { useEffect, useRef, useState } from 'react';

export interface CarouselSlide {
  /** Quote text — used by the "quotes" variant. */
  text?: string;
  /** Who said it — used by the "quotes" variant. */
  attribution?: string;
  /** Image URL — used by the "images" variant. */
  imageSrc?: string;
  imageAlt?: string;
  /** Optional caption shown under the image — "images" variant only. */
  caption?: string;
}

export interface CarouselProps {
  variant?: 'quotes' | 'images';
  slides: CarouselSlide[];
  /** Milliseconds between auto-advance. Set to 0 to disable. */
  autoAdvanceMs?: number;
}

export default function Carousel({ variant = 'quotes', slides, autoAdvanceMs = 6000 }: CarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!autoAdvanceMs || paused || count <= 1) return undefined;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, autoAdvanceMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoAdvanceMs, paused, count]);

  if (count === 0) return null;

  const go = (index: number) => setActive((index + count) % count);

  return (
    <div
      className={`bl-carousel bl-carousel--${variant}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="bl-carousel-viewport" aria-live="polite">
        {slides.map((slide, i) => (
          <div key={i} className={`bl-carousel-slide${i === active ? ' is-active' : ''}`} aria-hidden={i !== active}>
            {variant === 'quotes' ? (
              <>
                <p className="bl-carousel-quote-mark" aria-hidden="true">
                  &ldquo;
                </p>
                <p className="bl-carousel-quote-text">{slide.text}</p>
                {slide.attribution && <p className="bl-carousel-quote-author">— {slide.attribution}</p>}
              </>
            ) : (
              <figure className="bl-carousel-figure">
                <img src={slide.imageSrc} alt={slide.imageAlt || ''} loading="lazy" decoding="async" />
                {slide.caption && <figcaption>{slide.caption}</figcaption>}
              </figure>
            )}
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button type="button" className="bl-carousel-arrow bl-carousel-arrow--prev" onClick={() => go(active - 1)} aria-label="Previous slide">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button type="button" className="bl-carousel-arrow bl-carousel-arrow--next" onClick={() => go(active + 1)} aria-label="Next slide">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
          <div className="bl-carousel-dots" role="tablist" aria-label="Choose slide">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                className={`bl-carousel-dot${i === active ? ' is-active' : ''}`}
                aria-selected={i === active}
                aria-label={`Slide ${i + 1}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
