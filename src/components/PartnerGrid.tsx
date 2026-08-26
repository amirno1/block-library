'use client';

// Logo cards render on a white background with object-fit: cover, no
// padding — the logo fills the card completely (see PartnerGrid.css).
// Matches a reference site using the same layout (grid on one side, text
// on the other): its cards have no CSS padding/margin either, image fills
// the box edge to edge. The whitespace visible around each of its logos
// lives inside the image file itself (most are pre-composited onto a white
// background before upload, at close to the box's own aspect ratio) —
// nothing to do with the card's own CSS. On this site, a raw client logo
// upload through Sanity won't have that same pre-composited whitespace, so
// how tightly it gets cropped depends on how close its own aspect ratio is
// to the card's 4:3 — worth knowing if a particular logo ends up cropped
// tighter than expected.
import { useState } from 'react';
import { RichBody, type BodyCopy } from './richText';

export interface Partner {
  name: string;
  logoSrc?: string;
  logoAlt?: string;
  /** Shown as a "visit website" link inside the detail panel — not a direct
   * link on the card itself; clicking a card always opens the panel rather
   * than navigating away. */
  href?: string;
  /** Shown in the detail panel when this partner's card is clicked. Plain
   * string — separate paragraphs with a blank line — or rendered rich text. */
  description?: BodyCopy;
}

export interface PartnerGridProps {
  eyebrow?: string;
  heading?: string;
  /** Plain string — separate paragraphs with a blank line — or rendered rich text. */
  body?: BodyCopy;
  /** Which side the heading/body text sits on; logos fill the other side. */
  textPosition?: 'left' | 'right';
  partners: Partner[];
  /** Label for the link inside the detail panel, when a partner has both a
   * `description` and an `href`. @default 'Visit website' */
  visitLabel?: string;
  /** Per-instance overrides for any text size in this component — e.g. `{ '--bl-partners-heading-size': '3rem' }`. See PartnerGrid.css for the full list of --bl-partners-*-size variables. Falls back to the shared --fs-* scale when unset. */
  style?: React.CSSProperties;
}

export default function PartnerGrid({ eyebrow, heading, body, textPosition = 'left', partners, visitLabel = 'Visit website', style }: PartnerGridProps) {
  // A card with either a description or an href opens the detail panel —
  // it never navigates away directly, regardless of which of the two it
  // has. Only a card with neither stays a plain, inert image.
  //
  // Starts on the first partner that actually has something to show,
  // rather than an empty panel, so there's real content visible before
  // anyone clicks anything.
  const [activeIndex, setActiveIndex] = useState<number | null>(() => {
    const i = partners.findIndex((partner) => partner.description || partner.href);
    return i >= 0 ? i : null;
  });
  const active = activeIndex !== null ? partners[activeIndex] : null;

  return (
    <section className={`bl-partners bl-partners--text-${textPosition}`} style={style}>
      <div className="bl-partners-text">
        {eyebrow && <span className="bl-partners-eyebrow">{eyebrow}</span>}
        {heading && <h2 className="bl-partners-heading">{heading}</h2>}
        <RichBody body={body} paragraphClassName="bl-partners-paragraph" richClassName="bl-partners-richtext" />

        <div className={`bl-partners-detail ${active ? 'is-open' : ''}`}>
          <div className="bl-partners-detail-inner">
            {active && (
              // Keyed on activeIndex so switching partners remounts this
              // (not just the very first open/close) — that's what makes
              // the fade-in below replay every time, not just once.
              <div key={activeIndex} className="bl-partners-detail-content">
                <h3 className="bl-partners-detail-name">{active.name}</h3>
                <RichBody body={active.description} paragraphClassName="bl-partners-detail-description" richClassName="bl-partners-detail-richtext" />
                {active.href && (
                  <a className="bl-partners-detail-link" href={active.href} target="_blank" rel="noopener noreferrer">
                    {visitLabel}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="bl-partners-grid"
        style={
          // Fewer than 3 partners: a fixed 3-column track would leave the
          // row visibly lopsided (1 logo alone on the left, or 2 with a
          // big gap). Cap the column count to the actual count instead,
          // and center the row, so 1 or 2 partners each get a bigger,
          // properly-centered cell rather than sharing space with empty
          // tracks. 3+ keeps the default from the stylesheet (a real
          // 3-per-row grid that wraps additional partners onto new rows).
          partners.length === 1
            ? { gridTemplateColumns: 'minmax(200px, 320px)', justifyContent: 'center' }
            : partners.length === 2
              ? { gridTemplateColumns: 'repeat(2, minmax(200px, 320px))', justifyContent: 'center' }
              : undefined
        }
      >
        {partners.map((partner, i) => {
          // A partner with no logo image shows its name as text instead —
          // still a normal grid cell, still clickable the same way.
          const logo = partner.logoSrc ? (
            <img src={partner.logoSrc} alt={partner.logoAlt || partner.name} loading="lazy" decoding="async" />
          ) : (
            <span className="bl-partners-cell-name">{partner.name}</span>
          );
          const isActive = i === activeIndex;
          return (
            <div className={`bl-partners-cell ${isActive ? 'is-active' : ''}`} key={partner.name}>
              {partner.description || partner.href ? (
                <button
                  type="button"
                  aria-pressed={isActive}
                  aria-label={partner.name}
                  // Always selects this partner — never toggles back to
                  // empty. Once something is showing, it should keep
                  // showing something; clicking the already-active card
                  // again is a no-op, not a way to clear the panel.
                  onClick={() => setActiveIndex(i)}
                >
                  {logo}
                </button>
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
