'use client';

import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RichBody, type BodyCopy } from './richText';

export type ScrollVideoCTAPosition = 'left-center' | 'right-center' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-center';

export interface ScrollVideoCTABeat {
  text: string;
  /** Progress fraction (0-1) the beat starts, then finishes, fading in. */
  in: [number, number];
  /** Progress fraction it starts, then finishes, fading out. Omit to hold
   * visible from `in` onward — not usually wanted except on the last beat. */
  out?: [number, number];
  /** Where on the stage this beat sits. Pick whichever part of your footage
   * is visually quietest at that point in the timeline. @default 'bottom-center' */
  position?: ScrollVideoCTAPosition;
}

export interface ScrollVideoCTAProps {
  videoSrc: string;
  posterSrc: string;
  /** Text beats that fade in/out as the video scrubs through — tune the
   * `in`/`out` windows and `position` against your own footage; nothing
   * here assumes any particular video content. */
  beats: ScrollVideoCTABeat[];
  heading: string;
  /** Plain string — separate paragraphs with a blank line — or rendered rich text. */
  description?: BodyCopy;
  ctaText: string;
  ctaHref: string;
  /** Progress window the final heading/description/button fade in over, then hold. @default [0.82, 0.9] */
  ctaIn?: [number, number];
  /** @default 'right-center' */
  ctaPosition?: ScrollVideoCTAPosition;
  /** Height of the scrollable section, in vh — how far the visitor scrolls
   * while the video plays through. @default 450 */
  heightVh?: number;
  /** CSS object-position for the video/poster. @default '50% 50%' */
  objectPosition?: string;
  /** Overrides `objectPosition` under 720px, where object-fit:cover crops
   * much harder — keep whatever's important (a face, a focal point) in
   * frame on a narrow viewport. Defaults to `objectPosition`. */
  mobileObjectPosition?: string;
  /** GSAP ScrollTrigger scrub value — the one smoothing mechanism for both
   * the video seek and the text beats. @default 0.25 */
  scrub?: number;
  /** IntersectionObserver rootMargin controlling how far ahead of the
   * section the video starts loading. @default '1200px 0px' */
  rootMargin?: string;
  /** Source video's frame rate, used to size the seek epsilon (skip writes
   * smaller than one frame). @default 60 */
  frameRate?: number;
  ariaLabel?: string;
  /** Per-instance CSS variable overrides — e.g. `{ '--bl-scroll-video-cta-heading-size': '3rem' }`. See ScrollVideoCTA.css. */
  style?: CSSProperties;
}

function isDataSaverOn(): boolean {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  return Boolean(nav.connection?.saveData);
}

export default function ScrollVideoCTA({
  videoSrc,
  posterSrc,
  beats,
  heading,
  description,
  ctaText,
  ctaHref,
  ctaIn = [0.82, 0.9],
  ctaPosition = 'right-center',
  heightVh = 450,
  objectPosition = '50% 50%',
  mobileObjectPosition,
  scrub = 0.25,
  rootMargin = '1200px 0px',
  frameRate = 60,
  ariaLabel,
  style,
}: ScrollVideoCTAProps) {
  // Server render and first client render both produce the static state —
  // the poster frame plus the fully visible, clickable CTA, no sticky
  // stage, no video element at all. Deterministic (no hydration mismatch)
  // and this is also the literal required prefers-reduced-motion *and*
  // data-saver state, so one static branch covers all three.
  const [enhanced, setEnhanced] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const beatElsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  // Plain refs, not state — the whole point of the rAF loop below is to
  // never trigger a React render while scrolling.
  const durationRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (isDataSaverOn()) return;
    let cancelled = false;
    Promise.resolve().then(() => {
      if (!cancelled) setEnhanced(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useLayoutEffect(() => {
    if (!enhanced || !sectionRef.current || !videoRef.current) return undefined;

    const section = sectionRef.current;
    const video = videoRef.current;
    const seekEpsilon = 1 / frameRate;

    // Declared out here, not inside gsap.context's callback below, because
    // gsap.context.revert() only cleans up GSAP-created objects — a
    // function returned from its callback is not a cleanup hook the way a
    // useEffect return is, so these need their own explicit teardown in
    // this effect's own return instead.
    let observer: IntersectionObserver | null = null;
    let onLoadedMetadata: (() => void) | null = null;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          // The one smoothing mechanism for the whole section — both the
          // video (read via tl.progress() in the rAF loop below) and the
          // text beats derive from this same eased playhead, rather than
          // layering a second, competing smoothing system on top of it.
          scrub,
        },
        defaults: { ease: 'none' },
      });

      gsap.set(beatElsRef.current, { autoAlpha: 0, y: 20 });
      gsap.set(panelRef.current, { autoAlpha: 0, y: 22 });

      beats.forEach((beat, i) => {
        const el = beatElsRef.current[i];
        if (!el) return;
        tl.to(el, { autoAlpha: 1, y: 0, duration: beat.in[1] - beat.in[0] }, beat.in[0]);
        if (beat.out) {
          tl.to(el, { autoAlpha: 0, y: -12, duration: beat.out[1] - beat.out[0] }, beat.out[0]);
        }
      });

      tl.to(panelRef.current, { autoAlpha: 1, y: 0, duration: ctaIn[1] - ctaIn[0], ease: 'power2.out' }, ctaIn[0]);

      // Metadata can only arrive once the real src has been assigned (see
      // the IntersectionObserver below) — by then the visitor may already
      // be partway through the section, so snap to the correct frame
      // immediately instead of waiting for the video to drift into sync
      // over however many rAF ticks that would otherwise take.
      onLoadedMetadata = () => {
        durationRef.current = video.duration || 0;
        const target = tl.progress() * durationRef.current;
        if (Number.isFinite(target)) video.currentTime = target;
      };
      video.addEventListener('loadedmetadata', onLoadedMetadata);

      // The video stays sourceless (poster only) until the visitor is
      // about to reach it, then loads exactly once — never torn down and
      // reassigned again if they scroll away and back.
      let hasStartedLoading = false;
      const startLoading = () => {
        if (hasStartedLoading) return;
        hasStartedLoading = true;
        video.preload = 'auto';
        video.src = videoSrc;
        video.load();
        observer?.disconnect();
      };
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) startLoading();
        },
        { rootMargin },
      );
      observer.observe(section);

      // The one persistent seek loop for the whole section's lifetime —
      // never recreated on a ScrollTrigger update, just reads whatever
      // tl.progress() currently is each frame. No-ops until metadata (and
      // therefore duration) is available.
      const tick = () => {
        const duration = durationRef.current;
        if (duration > 0 && video.readyState >= 1) {
          const target = tl.progress() * duration;
          if (Math.abs(video.currentTime - target) > seekEpsilon) {
            video.currentTime = target;
          }
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, sectionRef);

    return () => {
      observer?.disconnect();
      if (onLoadedMetadata) video.removeEventListener('loadedmetadata', onLoadedMetadata);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      ctx.revert();
    };
    // beats/videoSrc/etc. are expected to be stable for a given instance —
    // this mirrors every other scroll-driven block here, which builds its
    // timeline once per mount rather than reacting to prop changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enhanced]);

  const objectPositionStyle: CSSProperties = {
    ['--bl-scroll-video-cta-object-position' as string]: objectPosition,
    ['--bl-scroll-video-cta-object-position-mobile' as string]: mobileObjectPosition ?? objectPosition,
    ...style,
  };

  if (!enhanced) {
    return (
      <section className="bl-scroll-video-cta bl-scroll-video-cta--static" aria-label={ariaLabel || heading} style={objectPositionStyle}>
        <img className="bl-scroll-video-cta-poster" src={posterSrc} alt="" aria-hidden="true" loading="eager" decoding="async" />
        <div className="bl-scroll-video-cta-panel is-visible bl-scroll-video-cta-panel--static">
          <h2 className="bl-scroll-video-cta-heading">{heading}</h2>
          <RichBody body={description} paragraphClassName="bl-scroll-video-cta-description" richClassName="bl-scroll-video-cta-richtext" />
          <a className="bl-scroll-video-cta-button" href={ctaHref}>
            {ctaText}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="bl-scroll-video-cta" aria-label={ariaLabel || heading} style={{ height: `${heightVh}vh`, ...objectPositionStyle }}>
      <div className="bl-scroll-video-cta-stage">
        {/* No src yet — poster covers the stage until the IntersectionObserver
            above decides the visitor is close enough to warrant loading it. */}
        <video ref={videoRef} className="bl-scroll-video-cta-video" poster={posterSrc} muted playsInline preload="none" aria-hidden="true" />

        {beats.map((beat, i) => (
          <p
            key={i}
            ref={(el) => {
              beatElsRef.current[i] = el;
            }}
            className={`bl-scroll-video-cta-text bl-scroll-video-cta-pos-${beat.position || 'bottom-center'}`}
          >
            {beat.text}
          </p>
        ))}

        <div ref={panelRef} className={`bl-scroll-video-cta-panel bl-scroll-video-cta-pos-${ctaPosition}`}>
          <h2 className="bl-scroll-video-cta-heading">{heading}</h2>
          <RichBody body={description} paragraphClassName="bl-scroll-video-cta-description" richClassName="bl-scroll-video-cta-richtext" />
          <a className="bl-scroll-video-cta-button" href={ctaHref}>
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
