import React, { useEffect, useRef } from 'react';

// Act 1 cinematic cursor — three quiet states:
//   default     → a small luminous point
//   interactive → small ring + dot over links/buttons
//   shield      → subtle targeting/crosshair over the Act 1 shield
// Movement is rAF-driven and GPU-only (translate3d) — no layout reads.
const RING_SIZE = 36;
const DOT_SIZE = 6;
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, .magnetic';
const SHIELD_SELECTOR = '[data-testid="shield-element"]';

const CustomCursor = () => {
  const cursorRef = useRef(null); // ring wrapper — positioned each frame
  const ringRef = useRef(null); // ring visual — scale/rotate
  const ticksRef = useRef(null); // crosshair ticks (shield mode only)
  const cursorDotRef = useRef(null); // luminous dot — positioned each frame

  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const modeRef = useRef('default');
  const lastModeRef = useRef('default');
  const scaleRef = useRef(0.6);
  const dotScaleRef = useRef(1);
  const rippleRef = useRef(1);
  const rotationRef = useRef(0);

  useEffect(() => {
    const wrapper = cursorRef.current;
    const ring = ringRef.current;
    const ticks = ticksRef.current;
    const dot = cursorDotRef.current;
    if (!wrapper || !ring || !ticks || !dot) return;

    // Under reduced motion the cursor still works, but it tracks instantly
    // with no lag trail, rotation or press pulse.
    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const onMouseOver = (e) => {
      const target = e.target;
      let next = 'default';
      if (target && typeof target.closest === 'function') {
        if (target.closest(SHIELD_SELECTOR)) {
          next = 'shield';
        } else if (target.closest(INTERACTIVE_SELECTOR)) {
          next = 'interactive';
        }
      }
      modeRef.current = next;
    };

    // Tiny elastic pulse on press — decays inside the rAF loop
    const onMouseDown = () => {
      if (!reduced) rippleRef.current = 1.4;
    };

    // Only touch styles that actually change per mode (cheap properties),
    // and only when the mode flips — never every frame.
    const applyMode = (mode) => {
      if (mode === 'shield') {
        ring.style.borderColor = 'rgba(140, 220, 255, 0.95)';
        ring.style.boxShadow = '0 0 22px rgba(0, 212, 255, 0.7)';
        ticks.style.opacity = '1';
        dot.style.background = '#ffffff';
        dot.style.boxShadow = '0 0 14px rgba(180, 240, 255, 1)';
      } else if (mode === 'interactive') {
        ring.style.borderColor = 'var(--color-electric-blue)';
        ring.style.boxShadow = '0 0 16px rgba(0, 212, 255, 0.6)';
        ticks.style.opacity = '0';
        dot.style.background = 'var(--color-cyan-glow)';
        dot.style.boxShadow = '0 0 10px rgba(0, 255, 255, 1)';
      } else {
        ring.style.borderColor = 'rgba(0, 212, 255, 0.5)';
        ring.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.35)';
        ticks.style.opacity = '0';
        dot.style.background = 'var(--color-cyan-glow)';
        dot.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.9)';
      }
    };

    let rafId;
    const animate = () => {
      // Dot tracks the pointer instantly
      const dotScale = modeRef.current === 'shield' ? 1.5 : 1;
      dotScaleRef.current = reduced
        ? dotScale
        : dotScaleRef.current + (dotScale - dotScaleRef.current) * 0.2;
      dot.style.transform = `translate3d(${mousePos.current.x - DOT_SIZE / 2}px, ${
        mousePos.current.y - DOT_SIZE / 2
      }px, 0) scale(${dotScaleRef.current})`;

      // Ring trails with a soft lag — GPU transform only (instant if reduced)
      const lag = reduced ? 1 : 0.18;
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * lag;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * lag;
      wrapper.style.transform = `translate3d(${cursorPos.current.x - RING_SIZE / 2}px, ${
        cursorPos.current.y - RING_SIZE / 2
      }px, 0)`;

      const mode = modeRef.current;
      if (mode !== lastModeRef.current) {
        applyMode(mode);
        lastModeRef.current = mode;
      }

      // Ring hides away in default state; grows over interactives;
      // expands and slowly rotates into a targeting reticle over the shield.
      const targetScale = mode === 'shield' ? 1.3 : mode === 'interactive' ? 1 : 0;
      scaleRef.current = reduced
        ? targetScale
        : scaleRef.current + (targetScale - scaleRef.current) * 0.2;
      rippleRef.current += (1 - rippleRef.current) * 0.12;
      ring.style.opacity = scaleRef.current < 0.05 ? '0' : '1';

      if (mode === 'shield' && !reduced) {
        rotationRef.current = (rotationRef.current + 0.35) % 360;
      }
      ring.style.transform = `rotate(${rotationRef.current}deg) scale(${
        scaleRef.current * rippleRef.current
      })`;

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mousedown', onMouseDown, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mousedown', onMouseDown);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Ring wrapper — positioned via translate3d, never via layout */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform"
        style={{ transform: 'translate3d(-200px, -200px, 0)' }}
      >
        <div
          ref={ringRef}
          className="flex items-center justify-center"
          style={{
            width: RING_SIZE,
            height: RING_SIZE,
            borderRadius: '9999px',
            border: '1.5px solid rgba(0, 212, 255, 0.5)',
            boxShadow: '0 0 10px rgba(0, 212, 255, 0.35)',
            opacity: 0,
            transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
          }}
        >
          {/* Crosshair ticks — visible only over the shield */}
          <div
            ref={ticksRef}
            className="absolute pointer-events-none"
            style={{ inset: -8, opacity: 0, transition: 'opacity 0.25s ease' }}
          >
            {[
              { top: 0, left: '50%', transform: 'translateX(-50%)' },
              { bottom: 0, left: '50%', transform: 'translateX(-50%)' },
              { left: 0, top: '50%', transform: 'translateY(-50%)' },
              { right: 0, top: '50%', transform: 'translateY(-50%)' },
            ].map((pos, i) => (
              <span
                key={i}
                className="absolute bg-cyan-200"
                style={{
                  width: i < 2 ? 1.5 : 7,
                  height: i < 2 ? 7 : 1.5,
                  boxShadow: '0 0 6px rgba(140, 220, 255, 0.9)',
                  ...pos,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Luminous center dot — always present */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[10001] will-change-transform rounded-full"
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          background: 'var(--color-cyan-glow)',
          boxShadow: '0 0 10px rgba(0, 255, 255, 0.9)',
          transform: 'translate3d(-200px, -200px, 0)',
        }}
      />
    </>
  );
};

export default CustomCursor;
