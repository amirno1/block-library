import type { CSSProperties } from 'react';

export interface QuoteProps {
  quote: string;
  attribution?: string;
  /** Any CSS font-size value (e.g. "2.5rem", "3vw") — overrides the default heading size. */
  fontSize?: string;
  /** Any CSS font-family value — e.g. a serif display font for a distinct, editorial treatment. Falls back to --font-heading if unset. */
  fontFamily?: string;
}

export default function Quote({ quote, attribution, fontSize, fontFamily }: QuoteProps) {
  const style = {
    ...(fontSize ? { '--bl-quote-size': fontSize } : {}),
    ...(fontFamily ? { '--bl-quote-font': fontFamily } : {}),
  } as CSSProperties;

  return (
    <section className="bl-quote" style={Object.keys(style).length ? style : undefined}>
      <p className="bl-quote-text">{quote}</p>
      {attribution && <p className="bl-quote-attribution">{attribution}</p>}
    </section>
  );
}
