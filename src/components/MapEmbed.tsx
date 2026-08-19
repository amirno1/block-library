import type { CSSProperties } from 'react';

export interface MapEmbedProps {
  /** Address or place name to center the map on. */
  query: string;
  style?: CSSProperties;
}

/**
 * Just the map, full-width — no info/details. Reuses ContactMap's own
 * .bl-contact-map styling. Pairs with ContactInfo when a client wants the
 * map placed differently than ContactMap's fixed side-by-side layout (or
 * wants no map at all — just don't render this component).
 */
export default function MapEmbed({ query, style }: MapEmbedProps) {
  return (
    <div className="bl-contact-map" style={style}>
      <iframe
        title="Locatie op kaart"
        src={`https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
