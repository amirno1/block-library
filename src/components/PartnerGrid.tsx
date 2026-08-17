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
}

export default function PartnerGrid({ eyebrow, heading, body, textPosition = 'left', partners }: PartnerGridProps) {
  const paragraphs = body ? body.split('\n\n') : [];

  return (
    <section className={`bl-partners bl-partners--text-${textPosition}`}>
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
          const logo = partner.logoSrc && <img src={partner.logoSrc} alt={partner.logoAlt || partner.name} />;
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
