import { RichBody, type BodyCopy } from './richText';

export interface ContactMapProps {
  eyebrow?: string;
  heading?: string;
  /** Plain string — separate paragraphs with a blank line — or rendered rich text. */
  description?: BodyCopy;
  address?: string;
  phone?: string;
  email?: string;
  /** Defaults to `address` — pass a more specific query if the map should center on something else. */
  mapQuery?: string;
  /** Labels for the three detail rows and the map iframe title — default Dutch, override for any other language this component is used in. */
  addressLabel?: string;
  phoneLabel?: string;
  emailLabel?: string;
  mapTitle?: string;
  /** Per-instance overrides for any text size in this component — e.g. `{ '--bl-contact-heading-size': '3rem' }`. See ContactMap.css for the full list of --bl-contact-*-size variables. Falls back to the shared --fs-* scale when unset. */
  style?: React.CSSProperties;
}

export default function ContactMap({
  eyebrow,
  heading,
  description,
  address,
  phone,
  email,
  mapQuery,
  addressLabel = 'Adres',
  phoneLabel = 'Telefoon',
  emailLabel = 'E-mail',
  mapTitle = 'Locatie op kaart',
  style,
}: ContactMapProps) {
  const query = mapQuery || address;

  return (
    <section className="bl-contact" style={style}>
      <div className="bl-contact-info">
        {eyebrow && <span className="bl-contact-eyebrow">{eyebrow}</span>}
        {heading && <h2 className="bl-contact-heading">{heading}</h2>}
        <RichBody body={description} paragraphClassName="bl-contact-description" richClassName="bl-contact-richtext" />
        <dl className="bl-contact-details">
          {address && (
            <div>
              <dt>{addressLabel}</dt>
              <dd>{address}</dd>
            </div>
          )}
          {phone && (
            <div>
              <dt>{phoneLabel}</dt>
              <dd>
                <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
              </dd>
            </div>
          )}
          {email && (
            <div>
              <dt>{emailLabel}</dt>
              <dd>
                <a href={`mailto:${email}`}>{email}</a>
              </dd>
            </div>
          )}
        </dl>
      </div>
      {query && (
        <div className="bl-contact-map">
          <iframe
            title={mapTitle}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </section>
  );
}
