import './CTABanner.css';

export interface CTABannerProps {
  variant?: 'centered' | 'split';
  heading: string;
  description?: string;
  ctaText: string;
  ctaHref: string;
}

export default function CTABanner({ variant = 'split', heading, description, ctaText, ctaHref }: CTABannerProps) {
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
