'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useCardDeck } from './useCardDeck';
import { DeckArrowIcon } from './DeckArrowIcon';

export interface CarouselSlide {
  /** Quote text — used by the "quotes" variant. */
  text?: string;
  /** Who said it — used by the "quotes" variant. */
  attribution?: string;
  /** Image URL — used by the "images" and "deck" variants. */
  imageSrc?: string;
  imageAlt?: string;
  /** Optional caption shown under the image — "images"/"deck" variants only. */
  caption?: string;
}

export interface CarouselProps {
  /** 'deck' is "images", presented as an animated overlapping card stack
   * instead of a plain crossfade — see useCardDeck.ts / TestimonialDeck.css
   * for the shared mechanics behind it. */
  variant?: 'quotes' | 'images' | 'deck';
  slides: CarouselSlide[];
  /** Milliseconds between auto-advance. Set to 0 to disable (ignored by
   * the "deck" variant, which always respects prefers-reduced-motion and
   * viewport visibility instead — see useCardDeck.ts). */
  autoAdvanceMs?: number;
  /** Per-instance overrides for any text size in this component — e.g. `{ '--bl-carousel-quote-text-size': '2rem' }`. See Carousel.css for the full list of --bl-carousel-*-size variables. Falls back to the shared --fs-* scale when unset. */
  style?: CSSProperties;
}

export default function Carousel({ variant = 'quotes', slides, autoAdvanceMs = 6000, style }: CarouselProps) {
  if (variant === 'deck') {
    return <CarouselDeck slides={slides} autoAdvanceMs={autoAdvanceMs} style={style} />;
  }
  return <CarouselFade variant={variant} slides={slides} autoAdvanceMs={autoAdvanceMs} style={style} />;
}

// The original crossfade implementation — unchanged behavior for the
// "quotes" and "images" variants.
function CarouselFade({
  variant,
  slides,
  autoAdvanceMs,
  style,
}: {
  variant: 'quotes' | 'images';
  slides: CarouselSlide[];
  autoAdvanceMs: number;
  style?: CSSProperties;
}) {
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
      style={style}
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
            <DeckArrowIcon direction="prev" />
          </button>
          <button type="button" className="bl-carousel-arrow bl-carousel-arrow--next" onClick={() => go(active + 1)} aria-label="Next slide">
            <DeckArrowIcon direction="next" />
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

// "deck" variant — images presented as an animated overlapping card stack,
// sharing the exact same state machine and CSS as TestimonialDeck.tsx.
function CarouselDeck({ slides, autoAdvanceMs, style }: { slides: CarouselSlide[]; autoAdvanceMs: number; style?: CSSProperties }) {
  const count = slides.length;
  const { active, reducedMotion, rootRef, go, layerOf, rootProps, stageProps } = useCardDeck({ count, autoAdvanceMs });

  if (count === 0) return null;

  return (
    <div
      ref={rootRef}
      className={`bl-carousel bl-carousel--deck bl-deck-root${reducedMotion ? ' bl-deck-root--reduced-motion' : ''}`}
      style={style}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
      {...rootProps}
    >
      <div className="bl-deck-stage" {...stageProps}>
        {slides.map((slide, i) => {
          const layer = layerOf(i);
          const layerClass = layer === 0 ? 'front' : layer === 1 ? 'middle' : layer === 2 ? 'back' : 'hidden';
          const isFront = layer === 0;
          return (
            <figure
              key={i}
              className={`bl-deck-card bl-deck-card--image bl-deck-card--${layerClass}`}
              role="group"
              aria-roledescription="slide"
              aria-hidden={!isFront}
              aria-label={isFront ? `Slide ${active + 1} of ${count}` : undefined}
            >
              <img src={slide.imageSrc} alt={slide.imageAlt || ''} loading="lazy" decoding="async" />
              {slide.caption && <figcaption>{slide.caption}</figcaption>}
            </figure>
          );
        })}
      </div>

      {count > 1 && (
        <div className="bl-deck-nav">
          <button type="button" className="bl-deck-arrow bl-deck-arrow--prev" onClick={() => go(-1)} aria-label="Previous slide">
            <DeckArrowIcon direction="prev" />
          </button>
          <div className="bl-deck-progress" aria-hidden="true">
            {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </div>
          <button type="button" className="bl-deck-arrow bl-deck-arrow--next" onClick={() => go(1)} aria-label="Next slide">
            <DeckArrowIcon direction="next" />
          </button>
        </div>
      )}
    </div>
  );
}
