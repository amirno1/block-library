import type { CSSProperties } from 'react';
import { RichBody, type BodyCopy } from './richText';

export interface ContactInfoProps {
  eyebrow?: string;
  heading?: string;
  /** Plain string — separate paragraphs with a blank line — or rendered rich text. */
  description?: BodyCopy;
  address?: string;
  phone?: string;
  email?: string;
  /** Per-instance overrides for any text size in this component — e.g. `{ '--bl-contact-heading-size': '3rem' }`. Shares its tokens with ContactMap since it's the same markup, just without the map — see ContactMap.css. */
  style?: CSSProperties;
}

/**
 * Just the text/details side of what ContactMap renders — no map. Use this
 * (paired with a separately-placed MapEmbed, or none at all) when a client
 * wants a different arrangement than ContactMap's fixed info-beside-map
 * layout, e.g. info+form side by side with the map full-width below, or no
 * map at all.
 */
export default function ContactInfo({ eyebrow, heading, description, address, phone, email, style }: ContactInfoProps) {
  return (
    <div className="bl-contact-info" style={style}>
      {eyebrow && <span className="bl-contact-eyebrow">{eyebrow}</span>}
      {heading && <h2 className="bl-contact-heading">{heading}</h2>}
      <RichBody body={description} paragraphClassName="bl-contact-description" richClassName="bl-contact-richtext" />
      <dl className="bl-contact-details">
        {address && (
          <div>
            <dt>Adres</dt>
            <dd>{address}</dd>
          </div>
        )}
        {phone && (
          <div>
            <dt>Telefoon</dt>
            <dd>
              <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
            </dd>
          </div>
        )}
        {email && (
          <div>
            <dt>E-mail</dt>
            <dd>
              <a href={`mailto:${email}`}>{email}</a>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
