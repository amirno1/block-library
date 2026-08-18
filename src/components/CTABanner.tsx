export interface CTABannerProps {
  variant?: 'centered' | 'split' | 'image';
  heading: string;
  description?: string;
  ctaText: string;
  ctaHref: string;
  /** variant="image" only — full-bleed image panel next to the text panel. */
  imageSrc?: string;
  imageAlt?: string;
}

export default function CTABanner({
  variant = 'split',
  heading,
  description,
  ctaText,
  ctaHref,
  imageSrc,
  imageAlt,
}: CTABannerProps) {
  if (variant === 'image') {
    return (
      <div className="bl-cta bl-cta--image">
        {/* bl-reveal on each side independently — not on the outer wrapper
            — so the image and the text panel animate as two separate
            pieces instead of one rigid block moving together. */}
        {imageSrc && (
          <div className="bl-cta-image bl-reveal">
            <img src={imageSrc} alt={imageAlt || ''} loading="lazy" decoding="async" />
          </div>
        )}
        <div className="bl-cta-image-panel bl-reveal">
          <h2 className="bl-cta-heading">{heading}</h2>
          {description && <p className="bl-cta-description">{description}</p>}
          <a className="bl-cta-button" href={ctaHref}>
            {ctaText}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`bl-cta bl-cta--${variant}`}>
      <div className="bl-cta-text">
        <h2 className="bl-cta-heading">{heading}</h2>
        {description && <p className="bl-cta-description">{description}</p>}
      </div>
      <a className="bl-cta-button" href={ctaHref}>
        {ctaText}
      </a>
    </div>
  );
}
