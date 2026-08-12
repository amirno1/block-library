export interface HeroProps {
  variant?: 'centered' | 'split' | 'video';
  eyebrow?: string;
  heading: string;
  subheading?: string;
  imageSrc?: string;
  imageAlt?: string;
  ctaText?: string;
  ctaHref?: string;
  /** variant="video" only — background video, autoplay/loop/muted. */
  videoSrc?: string;
  /** variant="video" only — shown while the video loads and on browsers that block autoplay. */
  posterSrc?: string;
}

export default function Hero({
  variant = 'split',
  eyebrow,
  heading,
  subheading,
  imageSrc,
  imageAlt,
  ctaText,
  ctaHref,
  videoSrc,
  posterSrc,
}: HeroProps) {
  return (
    <section className={`bl-hero bl-hero--${variant}`}>
      {variant === 'video' && (
        <div className="bl-hero-video-bg">
          {videoSrc && (
            <video autoPlay loop muted playsInline poster={posterSrc}>
              <source src={videoSrc} />
            </video>
          )}
          {!videoSrc && posterSrc && <img src={posterSrc} alt="" />}
          <div className="bl-hero-video-scrim" />
        </div>
      )}
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
      {variant === 'split' && imageSrc && (
        <div className="bl-hero-media">
          <img src={imageSrc} alt={imageAlt || ''} />
        </div>
      )}
    </section>
  );
}
