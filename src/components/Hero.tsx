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
}: HeroProps) {
  if (variant === 'full') {
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
        </>
      );

    return (
      <section className="bl-hero bl-hero--full">
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
      </section>
    );
  }

  return (
    <section className={`bl-hero bl-hero--${variant}`}>
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
