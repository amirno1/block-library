export interface Partner {
  name: string;
  logoSrc?: string;
  logoAlt?: string;
  href?: string;
}

export interface PartnerGridProps {
  eyebrow?: string;
  heading?: string;
  body?: string;
  /** Which side the heading/body text sits on; logos fill the other side. */
  textPosition?: 'left' | 'right';
  partners: Partner[];
  /** Per-instance overrides for any text size in this component — e.g. `{ '--bl-partners-heading-size': '3rem' }`. See PartnerGrid.css for the full list of --bl-partners-*-size variables. Falls back to the shared --fs-* scale when unset. */
  style?: React.CSSProperties;
}

export default function PartnerGrid({ eyebrow, heading, body, textPosition = 'left', partners, style }: PartnerGridProps) {
  const paragraphs = body ? body.split('\n\n') : [];

  return (
    <section className={`bl-partners bl-partners--text-${textPosition}`} style={style}>
      <div className="bl-partners-text">
        {eyebrow && <span className="bl-partners-eyebrow">{eyebrow}</span>}
        {heading && <h2 className="bl-partners-heading">{heading}</h2>}
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="bl-partners-paragraph">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="bl-partners-grid">
        {partners.map((partner) => {
          const logo = partner.logoSrc && (
            <img src={partner.logoSrc} alt={partner.logoAlt || partner.name} loading="lazy" decoding="async" />
          );
          return (
            <div className="bl-partners-cell" key={partner.name}>
              {partner.href ? (
                <a href={partner.href} target="_blank" rel="noopener noreferrer" aria-label={partner.name}>
                  {logo}
                </a>
              ) : (
                logo
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
