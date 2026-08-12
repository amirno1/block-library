export interface HeroProps {
  variant?: 'centered' | 'split';
  eyebrow?: string;
  heading: string;
  subheading?: string;
  imageSrc?: string;
  imageAlt?: string;
  ctaText?: string;
  ctaHref?: string;
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
}: HeroProps) {
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
      {variant === 'split' && imageSrc && (
        <div className="bl-hero-media">
          <img src={imageSrc} alt={imageAlt || ''} />
        </div>
      )}
    </section>
  );
}
