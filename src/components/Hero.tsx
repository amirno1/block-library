'use client';

export interface HeroProps {
  variant?: 'split' | 'full';
  eyebrow?: string;
  heading: string;
  subheading?: string;
  ctaText?: string;
  ctaHref?: string;
  /** variant="split" only — static image next to the text. */
  imageSrc?: string;
  imageAlt?: string;
  /** variant="full" only — background video. Takes priority over posterSrc if both are set. */
  videoSrc?: string;
  /** variant="full" only — shown as a plain background image when there's no videoSrc, and as the video's poster frame while it loads. */
  posterSrc?: string;
  /** variant="full" only — where the copy sits over the background. Defaults to 'center'. */
  textPosition?: 'center' | 'left' | 'right' | 'split';
  /** variant="full" only — bouncing "scroll down" chevron pinned to the bottom, clicking scrolls one viewport height. */
  scrollHint?: boolean;
  /** aria-label for the scroll-hint button — default English, override for any other language. */
  scrollHintLabel?: string;
  /** variant="full" only — short motto/tagline rendered below the CTA, styled light to match the rest of the hero copy. */
  quote?: string;
  quoteAttribution?: string;
  /** Per-instance overrides for any text size in this component — e.g. `{ '--bl-hero-heading-size': '4rem' }`. See Hero.css for the full list of --bl-hero-*-size variables. Falls back to the shared --fs-* scale when unset. */
  style?: React.CSSProperties;
}

export default function Hero({
  variant = 'split',
  eyebrow,
  heading,
  subheading,
  ctaText,
  ctaHref,
  imageSrc,
  imageAlt,
  videoSrc,
  posterSrc,
  textPosition = 'center',
  scrollHint = false,
  scrollHintLabel = 'Scroll down',
  quote,
  quoteAttribution,
  style,
}: HeroProps) {
  if (variant === 'full') {
    const quoteBlock = quote && (
      <p className="bl-hero-quote">
        {quote}
        {quoteAttribution && <span className="bl-hero-quote-attribution">{quoteAttribution}</span>}
      </p>
    );

    const copy =
      textPosition === 'split' ? (
        <>
          <div className="bl-hero-full-primary">
            {eyebrow && <span className="bl-hero-eyebrow">{eyebrow}</span>}
            <h1 className="bl-hero-heading">{heading}</h1>
          </div>
          <div className="bl-hero-full-secondary">
            {subheading && <p className="bl-hero-subheading">{subheading}</p>}
            {ctaText && ctaHref && (
              <a className="bl-hero-cta" href={ctaHref}>
                {ctaText}
              </a>
            )}
            {quoteBlock}
          </div>
        </>
      ) : (
        <>
          {eyebrow && <span className="bl-hero-eyebrow">{eyebrow}</span>}
          <h1 className="bl-hero-heading">{heading}</h1>
          {subheading && <p className="bl-hero-subheading">{subheading}</p>}
          {ctaText && ctaHref && (
            <a className="bl-hero-cta" href={ctaHref}>
              {ctaText}
            </a>
          )}
          {quoteBlock}
        </>
      );

    return (
      <section className="bl-hero bl-hero--full" style={style}>
        <div className="bl-hero-full-bg">
          {videoSrc ? (
            <video autoPlay loop muted playsInline poster={posterSrc}>
              <source src={videoSrc} />
            </video>
          ) : (
            posterSrc && <img src={posterSrc} alt="" />
          )}
          <div className="bl-hero-full-scrim" />
        </div>
        <div className={`bl-hero-full-copy bl-hero-full-copy--${textPosition}`}>{copy}</div>
        {scrollHint && (
          <button
            type="button"
            className="bl-hero-scroll-hint"
            aria-label={scrollHintLabel}
            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        )}
      </section>
    );
  }

  return (
    <section className={`bl-hero bl-hero--${variant}`} style={style}>
      <div className="bl-hero-copy">
        {eyebrow && <span className="bl-hero-eyebrow">{eyebrow}</span>}
        <h1 className="bl-hero-heading">{heading}</h1>
        {subheading && <p className="bl-hero-subheading">{subheading}</p>}
        {ctaText && ctaHref && (
          <a className="bl-hero-cta" href={ctaHref}>
            {ctaText}
          </a>
        )}
      </div>
      {imageSrc && (
        <div className="bl-hero-media">
          <img src={imageSrc} alt={imageAlt || ''} />
        </div>
      )}
    </section>
  );
}
