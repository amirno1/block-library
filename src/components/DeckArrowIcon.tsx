// Shared chevron used by every deck-style carousel's prev/next buttons
// (TestimonialDeck.tsx, Carousel.tsx's 'deck' variant) — kept in one place
// so the two never drift into slightly different icons.
export function DeckArrowIcon({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={direction === 'prev' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
    </svg>
  );
}
