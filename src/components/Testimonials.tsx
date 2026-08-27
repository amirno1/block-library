'use client';

import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TestimonialDeck from './TestimonialDeck';

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
}

export interface TestimonialsProps {
  eyebrow?: string;
  heading?: string;
  items: Testimonial[];
  /** 'grid' (default) — every review as its own card, side by side. 'carousel'
   * — one at a time, auto-advancing in a loop, paired with an image panel. */
  variant?: 'grid' | 'carousel';
  /** carousel variant only. Nothing is pinned/held in place — the section
   * scrolls past normally, same as any other. What scrolls is the image's
   * own crop: as the section transits the viewport, object-position pans
   * from panFrom to panTo, so a portrait image reveals its top, then
   * middle, then bottom as you scroll past, rather than showing one fixed
   * crop the whole time. */
  imageSrc?: string;
  imageAlt?: string;
  /** carousel variant only — which side the image sits on. @default 'left' */
  imagePosition?: 'left' | 'right';
  /** carousel variant only — ms between auto-advance, passed straight
   * through to the testimonial deck. @default 5500 */
  autoAdvanceMs?: number;
  /** carousel + image only — object-position when the section is about to
   * enter the viewport. @default '50% 0%' (top of the image) */
  panFrom?: string;
  /** carousel + image only — object-position by the time the section has
   * fully scrolled past. @default '50% 100%' (bottom of the image) */
  panTo?: string;
  /** carousel + image only — scale reached by the time the section has
   * scrolled past, layered on top of the pan. @default 1.15 */
  zoomTo?: number;
  /** Per-instance overrides for any text size in this component — e.g. `{ '--bl-testimonials-heading-size': '3rem' }`. See Testimonials.css for the full list of --bl-testimonials-*-size variables. Falls back to the shared --fs-* scale when unset. */
  style?: CSSProperties;
}

const QuoteIcon = () => (
  <svg viewBox="0 0 32 24" fill="none" aria-hidden="true">
    <path
      d="M9.5 0C4.5 3 0 8.5 0 14.5 0 19.7 3.6 24 8.7 24c4 0 7-3 7-6.8 0-3.4-2.4-5.9-5.6-5.9-.6 0-1.2.1-1.7.3C9 8.3 11.7 4.3 15.6 1.9L9.5 0Zm17 0c-5 3-9.5 8.5-9.5 14.5 0 5.2 3.6 9.5 8.7 9.5 4 0 7-3 7-6.8 0-3.4-2.4-5.9-5.6-5.9-.6 0-1.2.1-1.7.3C26 8.3 28.7 4.3 32.6 1.9L26.5 0Z"
      fill="currentColor"
    />
  </svg>
);

export default function Testimonials({
  eyebrow,
  heading,
  items,
  variant = 'grid',
  imageSrc,
  imageAlt,
  imagePosition = 'left',
  autoAdvanceMs,
  panFrom = '50% 0%',
  panTo = '50% 100%',
  zoomTo = 1.15,
  style,
}: TestimonialsProps) {
  // Server render and first client render both produce the same plain
  // crop (deterministic, no hydration mismatch) — also the literal
  // required prefers-reduced-motion state, so one static image state
  // covers both; the scroll-driven pan is layered on afterward.
  const [enhanced, setEnhanced] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    Promise.resolve().then(() => {
      if (!cancelled) setEnhanced(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const hasImagePan = variant === 'carousel' && Boolean(imageSrc) && enhanced;

  useLayoutEffect(() => {
    if (!hasImagePan || !sectionRef.current || !imgRef.current) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(imgRef.current, { scale: 1, objectPosition: panFrom });
      gsap.to(imgRef.current, {
        scale: zoomTo,
        objectPosition: panTo,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          // Not pinned — this just tracks the section's own natural
          // transit through the viewport, start to finish, same as any
          // ordinary scroll-linked reveal elsewhere on the site.
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.3,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [hasImagePan, panFrom, panTo, zoomTo]);

  if (variant === 'carousel') {
    return (
      <section
        ref={sectionRef}
        className={`bl-testimonials bl-testimonials--carousel bl-testimonials--image-${imagePosition}${imageSrc ? '' : ' bl-testimonials--no-image'}`}
        style={style}
      >
        {imageSrc && (
          <div className="bl-testimonials-media">
            <img ref={imgRef} src={imageSrc} alt={imageAlt || ''} loading="lazy" decoding="async" />
          </div>
        )}
        <div className="bl-testimonials-carousel-panel">
          {(eyebrow || heading) && (
            <div className="bl-testimonials-head bl-testimonials-head--carousel">
              {eyebrow && <span className="bl-testimonials-eyebrow">{eyebrow}</span>}
              {heading && <h2 className="bl-testimonials-heading">{heading}</h2>}
            </div>
          )}
          <TestimonialDeck items={items} autoAdvanceMs={autoAdvanceMs} />
        </div>
      </section>
    );
  }

  return (
    <section className="bl-testimonials" style={style}>
      {(eyebrow || heading) && (
        <div className="bl-testimonials-head">
          {eyebrow && <span className="bl-testimonials-eyebrow">{eyebrow}</span>}
          {heading && <h2 className="bl-testimonials-heading">{heading}</h2>}
        </div>
      )}
      <div className="bl-testimonials-grid">
        {items.map((item, i) => (
          <figure className="bl-testimonials-card" key={i}>
            <div className="bl-testimonials-icon">
              <QuoteIcon />
            </div>
            <blockquote>{item.quote}</blockquote>
            <figcaption>
              <span className="bl-testimonials-name">{item.name}</span>
              {item.role && <span className="bl-testimonials-role">{item.role}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
