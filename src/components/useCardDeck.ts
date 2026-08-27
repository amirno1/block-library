'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Shared state machine behind every "physical card deck" carousel in this
// library (see Deck-related classes in TestimonialDeck.css, reused by both
// TestimonialDeck.tsx and Carousel.tsx's 'deck' variant). Extracted here so
// the autoplay/pause/lock/reduced-motion rules stay in exactly one place —
// duplicating this per consumer would just mean any future timing fix only
// landing in whichever copy someone happened to touch.

// The first automatic transition waits longer than the steady-state
// interval — gives a visitor a moment to actually read the first card
// before anything moves. Fixed rather than a prop: a UX pacing decision
// for this deck pattern, not something each instance should need to tune.
const INITIAL_DELAY_MS = 1500;
// Mirrors the CSS transition-duration on .bl-deck-card — used to briefly
// lock out further navigation so a user mashing the arrow can't desync
// the stack mid-animation.
const TRANSITION_MS = 800;
const REDUCED_MOTION_TRANSITION_MS = 200;

export interface UseCardDeckOptions {
  count: number;
  /** Ms between auto-advances once the deck is running. */
  autoAdvanceMs: number;
}

export interface UseCardDeckResult {
  active: number;
  reducedMotion: boolean;
  rootRef: React.RefObject<HTMLDivElement | null>;
  go: (direction: 1 | -1) => void;
  /** The stack layer a given item index currently occupies: 0 = front,
   * 1 = middle, 2 = back, anything higher = deep in the stack (hidden). */
  layerOf: (index: number) => number;
  rootProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: (e: React.FocusEvent) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
  };
  stageProps: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
  };
}

export function useCardDeck({ count, autoAdvanceMs }: UseCardDeckOptions): UseCardDeckResult {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef(false);
  const hasStartedRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);

  const go = useCallback(
    (direction: 1 | -1) => {
      if (count <= 1 || lockRef.current) return;
      lockRef.current = true;
      hasStartedRef.current = true;
      setActive((i) => (i + direction + count) % count);
      window.setTimeout(
        () => {
          lockRef.current = false;
        },
        reducedMotion ? REDUCED_MOTION_TRANSITION_MS : TRANSITION_MS,
      );
    },
    [count, reducedMotion],
  );

  // prefers-reduced-motion, live (covers a user toggling it mid-session).
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Autoplay only runs while the deck is actually on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Autoplay pauses when the browser tab itself isn't visible.
  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const shouldRun = inView && !hovered && !focused && !tabHidden && !reducedMotion && count > 1;

  // Re-running this whenever `active` changes (autoplay tick or manual
  // nav) is what gives manual navigation its "reset the timer" behavior
  // for free — any change cancels the pending timeout via the cleanup
  // below and schedules a fresh one.
  useEffect(() => {
    if (!shouldRun) return undefined;
    const delay = hasStartedRef.current ? autoAdvanceMs : INITIAL_DELAY_MS;
    const id = window.setTimeout(() => {
      hasStartedRef.current = true;
      go(1);
    }, delay);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRun, autoAdvanceMs, active]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartXRef.current;
    touchStartXRef.current = null;
    if (startX == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? startX) - startX;
    const SWIPE_THRESHOLD = 40;
    if (dx > SWIPE_THRESHOLD) go(-1);
    else if (dx < -SWIPE_THRESHOLD) go(1);
  };

  // Only true focus-out (to something outside the deck) should lift the
  // pause — focus moving between the two arrows inside the deck must not
  // flicker autoplay back on in between.
  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setFocused(false);
    }
  };

  return {
    active,
    reducedMotion,
    rootRef,
    go,
    layerOf: (index: number) => (index - active + count) % count,
    rootProps: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus: () => setFocused(true),
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
    },
    stageProps: {
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
    },
  };
}
