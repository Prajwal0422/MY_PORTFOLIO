import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// ACT 2 — Cinematic Identity Reveal.
//
// Beat structure (beats 2–5 land in later commits):
//   1. After the storm    — Act 1's flash collapses into deeper darkness
//   2. First tech signal  — terminal / code fragments
//   3. Project memory     — abstract montage of real portfolio work
//   4. Identity reveal    — PRAJWAL Y JAIN + tagline
//   5. Handoff            — quiet fade into Act 3
//
// The sequence always completes through one guarded transition:
// timeline end, skip, or the hard fallback timer.
const Act2NameReveal = ({ onComplete, isMobile }) => {
  const containerRef = useRef(null);
  const flashRef = useRef(null);
  const hazeRef = useRef(null);
  const glowRef = useRef(null);

  const completedRef = useRef(false);
  const timelineRef = useRef(null);
  const fallbackRef = useRef(null);
  // Latest finishAct for the skip button without re-running the effect
  const finishActRef = useRef(() => {});
  // Keep the latest completion callback without re-running the effect
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  useEffect(() => {
    const container = containerRef.current;
    const flash = flashRef.current;
    const haze = hazeRef.current;
    const glow = glowRef.current;

    // Guarded, exactly-once handoff used by the timeline's final call
    const finishNow = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
      completeRef.current();
    };

    // Skip / fallback path: fade out whatever is on screen, then hand off
    const finishAct = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
      if (timelineRef.current) timelineRef.current.kill();
      gsap.killTweensOf([container, flash, haze, glow]);
      gsap.to(container, {
        opacity: 0,
        duration: 1.0,
        ease: 'power2.inOut',
        onComplete: completeRef.current,
      });
    };
    finishActRef.current = finishAct;

    const tl = gsap.timeline();
    timelineRef.current = tl;

    // BEAT 1 — AFTER THE STORM (0.0–1.0s)
    // Act 1's final flash becomes Act 2's first frame, then collapses
    // into a deeper layer of the same storm universe.
    tl.fromTo(
      container,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: 'power1.out' },
      0
    );
    tl.fromTo(
      flash,
      { opacity: 0.55 },
      { opacity: 0, duration: 1.0, ease: 'power2.out' },
      0
    );

    // Atmosphere: faint volumetric light breathing, haze drifting sideways
    tl.fromTo(
      glow,
      { opacity: 0.5 },
      { opacity: 1, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: 1 },
      0.4
    );
    tl.fromTo(
      haze,
      { xPercent: -1.5 },
      { xPercent: 1.5, duration: 9, ease: 'sine.inOut' },
      0
    );

    // (Beats 2–5 are appended by later commits.)

    // Interim handoff: hold the darkness briefly, then fade to Act 3.
    tl.to(container, { opacity: 0, duration: 1.0, ease: 'power2.inOut' }, 2.2);
    tl.call(finishNow, null, 3.3);

    // Hard safety net — the user must always reach Act 3
    fallbackRef.current = setTimeout(finishAct, 16000);

    return () => {
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
      tl.kill();
      gsap.killTweensOf([container, flash, haze, glow]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="act-container relative w-full h-screen overflow-hidden"
      style={{ background: '#04060c' }}
      data-testid="act2-name-reveal-container"
    >
      {/* Deep-layer storm background — same universe as Act 1, one step deeper */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, #0d1830 0%, #070d1c 48%, #04060c 100%)',
        }}
      />

      {/* Faint volumetric light behind the future title */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(120, 170, 225, 0.16) 0%, rgba(70, 110, 170, 0.07) 40%, transparent 70%)',
        }}
      />

      {/* Atmospheric haze — soft diagonal light bands */}
      <div
        ref={hazeRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          background:
            'linear-gradient(115deg, transparent 20%, rgba(90, 130, 190, 0.05) 45%, transparent 60%, rgba(90, 130, 190, 0.04) 80%, transparent)',
        }}
      />

      {/* Vignette to keep the frame cinematic */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.55) 100%)',
        }}
      />

      {/* Act 1 flash collapse — bright at mount, gone within a second */}
      <div
        ref={flashRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(235, 245, 255, 0.95) 0%, rgba(180, 210, 240, 0.8) 45%, rgba(120, 160, 210, 0.6) 100%)',
          opacity: 0,
        }}
      />

      {/* Skip control — refined in a later commit */}
      <button
        onClick={() => finishActRef.current()}
        aria-label="Skip introduction"
        data-testid="act2-skip-button"
        className="absolute bottom-6 right-6 z-30 px-5 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white transition-colors"
        style={{
          background: 'rgba(0, 10, 30, 0.6)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          cursor: 'pointer',
        }}
      >
        Skip
      </button>

      {/* PYJ logo — same position as Act 1 */}
      <div className="absolute top-6 left-6 z-30" data-testid="logo-act2">
        <img
          src="/assets/logo.png"
          alt="Logo"
          decoding="async"
          className="w-12 h-12 md:w-16 md:h-16 object-contain opacity-80"
          style={{ filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.35))' }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
    </div>
  );
};

export default Act2NameReveal;
