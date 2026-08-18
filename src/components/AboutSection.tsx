export interface AboutSectionProps {
  /** 'split' (default) — full-width, half image / half text. 'stacked' — image on top, text centered below. 'overlap' — text card overlaps the image's edge. */
  variant?: 'split' | 'stacked' | 'overlap';
  /** Which side the image sits on. Ignored by 'stacked'. */
  imagePosition?: 'left' | 'right';
  eyebrow?: string;
  heading: string;
  /** Separate paragraphs with a blank line. */
  body: string;
  credentials?: string[];
  imageSrc?: string;
  imageAlt?: string;
}

export default function AboutSection({
  variant = 'split',
  imagePosition = 'left',
  eyebrow,
  heading,
  body,
  credentials,
  imageSrc,
  imageAlt,
}: AboutSectionProps) {
  const paragraphs = body.split('\n\n');

  const copy = (
    <div className="bl-about-copy">
      {eyebrow && <span className="bl-about-eyebrow">{eyebrow}</span>}
      <h2 className="bl-about-heading">{heading}</h2>
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="bl-about-paragraph">
          {paragraph}
        </p>
      ))}
      {credentials && credentials.length > 0 && (
        <ul className="bl-about-credentials">
          {credentials.map((credential) => (
            <li key={credential}>{credential}</li>
          ))}
        </ul>
      )}
    </div>
  );

  const media = imageSrc && (
    <div className="bl-about-media">
      <img src={imageSrc} alt={imageAlt || ''} loading="lazy" decoding="async" />
    </div>
  );

  if (variant === 'stacked') {
    return (
      <section className="bl-about bl-about--stacked">
        {media}
        {copy}
      </section>
    );
  }

  if (variant === 'overlap') {
    return (
      <section className={`bl-about bl-about--overlap bl-about--image-${imagePosition}`}>
        {media}
        <div className="bl-about-overlap-card">{copy}</div>
      </section>
    );
  }

  return (
    <section className={`bl-about bl-about--split bl-about--image-${imagePosition}`}>
      {media}
      {copy}
    </section>
  );
}
