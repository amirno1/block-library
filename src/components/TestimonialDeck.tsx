'use client';

import { useCardDeck } from './useCardDeck';
import { DeckArrowIcon } from './DeckArrowIcon';

export interface TestimonialDeckItem {
  quote: string;
  name: string;
  role?: string;
}

export interface TestimonialDeckProps {
  items: TestimonialDeckItem[];
  /** Ms between auto-advances once the deck is running. @default 5500 */
  autoAdvanceMs?: number;
}

export default function TestimonialDeck({ items, autoAdvanceMs = 5500 }: TestimonialDeckProps) {
  const count = items.length;
  const { active, reducedMotion, rootRef, go, layerOf, rootProps, stageProps } = useCardDeck({ count, autoAdvanceMs });

  if (count === 0) return null;

  return (
    <div
      ref={rootRef}
      className={`bl-deck-root${reducedMotion ? ' bl-deck-root--reduced-motion' : ''}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Ervaringen van cliënten"
      {...rootProps}
    >
      <div className="bl-deck-stage" {...stageProps}>
        {items.map((item, i) => {
          const layer = layerOf(i);
          const layerClass = layer === 0 ? 'front' : layer === 1 ? 'middle' : layer === 2 ? 'back' : 'hidden';
          const isFront = layer === 0;
          return (
            <article
              key={i}
              className={`bl-deck-card bl-deck-card--${layerClass}`}
              role="group"
              aria-roledescription="slide"
              aria-hidden={!isFront}
              aria-label={isFront ? `Ervaring ${active + 1} van ${count}` : undefined}
            >
              <p className="bl-deck-quote-mark" aria-hidden="true">
                &ldquo;
              </p>
              <p className="bl-deck-quote-text">{item.quote}</p>
              {(item.name || item.role) && (
                <p className="bl-deck-quote-author">— {item.role ? `${item.name}, ${item.role}` : item.name}</p>
              )}
            </article>
          );
        })}
      </div>

      {count > 1 && (
        <div className="bl-deck-nav">
          <button type="button" className="bl-deck-arrow bl-deck-arrow--prev" onClick={() => go(-1)} aria-label="Vorige ervaring">
            <DeckArrowIcon direction="prev" />
          </button>
          <div className="bl-deck-progress" aria-hidden="true">
            {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </div>
          <button type="button" className="bl-deck-arrow bl-deck-arrow--next" onClick={() => go(1)} aria-label="Volgende ervaring">
            <DeckArrowIcon direction="next" />
          </button>
        </div>
      )}
    </div>
  );
}
