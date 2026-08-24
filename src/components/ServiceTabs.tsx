'use client';

import { useEffect, useRef, useState } from 'react';
import { RichBody, type BodyCopy } from './richText';

export interface ServiceTabItem {
  title: string;
  /** Plain text only — this renders inside a <button>, which cannot legally
      contain block-level or interactive elements. */
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface ServiceTabsProps {
  eyebrow?: string;
  heading?: string;
  description?: BodyCopy;
  items: ServiceTabItem[];
  /** Per-instance overrides for any text size in this component — e.g. `{ '--bl-service-tabs-heading-size': '3rem' }`. See ServiceTabs.css for the full list of --bl-service-tabs-*-size variables. Falls back to the shared --fs-* scale when unset. */
  style?: React.CSSProperties;
}

/** Appends a changing query param so the browser treats it as a fresh
 * resource load — forces embedded SVG animations (CSS or SMIL) to restart,
 * since they replay whenever the image itself is freshly decoded. Doesn't
 * touch the DOM node's identity/key, so the opacity crossfade (driven by
 * a class toggle, unrelated to src) keeps transitioning normally. */
function withRestartToken(src: string, token: number): string {
  if (token === 0) return src;
  return `${src}${src.includes('?') ? '&' : '?'}_r=${token}`;
}

export default function ServiceTabs({ eyebrow, heading, description, items, style }: ServiceTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [restartToken, setRestartToken] = useState(0);
  // Real `src` isn't assigned to any image until this flips true — before
  // that, the default (first) item's animation would otherwise start
  // decoding/playing the moment it mounts, regardless of scroll position.
  // loading="lazy" alone isn't precise enough: its load-ahead margin can
  // fire well before the section is actually in view, so by the time a
  // visitor scrolls to it the animation's already partway through.
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);
  const hasImages = items.some((item) => item.imageSrc);

  const selectItem = (i: number) => {
    setActiveIndex(i);
    setRestartToken((t) => t + 1);
  };

  useEffect(() => {
    const node = mediaRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setHasEnteredViewport(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredViewport(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bl-service-tabs" style={style}>
      {(eyebrow || heading || description) && (
        <div className="bl-service-tabs-head">
          {eyebrow && <span className="bl-service-tabs-eyebrow">{eyebrow}</span>}
          {heading && <h2 className="bl-service-tabs-heading">{heading}</h2>}
          {description && (
            <RichBody
              body={description}
              paragraphClassName="bl-service-tabs-description"
              richClassName="bl-service-tabs-richtext"
            />
          )}
        </div>
      )}
      <div className="bl-service-tabs-grid">
        <div className="bl-service-tabs-list" role="tablist">
          {items.map((item, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`bl-service-tabs-item ${isActive ? 'is-active' : ''}`}
                onClick={() => selectItem(i)}
              >
                <span className="bl-service-tabs-item-title">{item.title}</span>
                {item.description && (
                  <span className="bl-service-tabs-item-collapse">
                    <span className="bl-service-tabs-item-collapse-inner">
                      <span className="bl-service-tabs-item-description">{item.description}</span>
                    </span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {hasImages && (
          <div className="bl-service-tabs-media" ref={mediaRef}>
            {hasEnteredViewport &&
              items.map((item, i) => {
                if (!item.imageSrc) return null;
                const isActive = i === activeIndex;
                return (
                  <img
                    key={item.title}
                    src={isActive ? withRestartToken(item.imageSrc, restartToken) : item.imageSrc}
                    alt={item.imageAlt || ''}
                    className={isActive ? 'is-active' : ''}
                    loading="lazy"
                    decoding="async"
                  />
                );
              })}
          </div>
        )}
      </div>
    </section>
  );
}
