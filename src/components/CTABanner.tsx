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
        {imageSrc && (
          <div className="bl-cta-image">
            <img src={imageSrc} alt={imageAlt || ''} />
          </div>
        )}
        <div className="bl-cta-image-panel">
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
