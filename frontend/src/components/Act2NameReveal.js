import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { featuredProjects } from '@/data/portfolioData';

// Abstract visual motifs — stylized line art, never fake screenshots.
const Motif = ({ type }) => {
  const stroke = 'rgba(150, 200, 250, 0.85)';
  const dim = 'rgba(110, 150, 200, 0.45)';
  switch (type) {
    case 'pulse': // healthcare AI — ECG trace
      return (
        <svg viewBox="0 0 120 40" className="w-28 h-10">
          <polyline points="0,20 30,20 38,20 44,6 52,34 60,12 66,20 120,20" fill="none" stroke={stroke} strokeWidth="1.6" />
        </svg>
      );
    case 'nodes': // clinical NLP — token graph
      return (
        <svg viewBox="0 0 120 40" className="w-28 h-10">
          <line x1="20" y1="20" x2="55" y2="8" stroke={dim} strokeWidth="1" />
          <line x1="20" y1="20" x2="55" y2="32" stroke={dim} strokeWidth="1" />
          <line x1="55" y1="8" x2="95" y2="20" stroke={dim} strokeWidth="1" />
          <line x1="55" y1="32" x2="95" y2="20" stroke={dim} strokeWidth="1" />
          {[[20, 20], [55, 8], [55, 32], [95, 20]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.5" fill="none" stroke={stroke} strokeWidth="1.4" />
          ))}
        </svg>
      );
    case 'scan': // medical imaging — scan grid
      return (
        <svg viewBox="0 0 120 40" className="w-28 h-10">
          {[10, 35, 60, 85, 110].map((x) => (
            <line key={x} x1={x} y1="4" x2={x} y2="36" stroke={dim} strokeWidth="0.8" />
          ))}
          {[8, 20, 32].map((y) => (
            <line key={y} x1="10" y1={y} x2="110" y2={y} stroke={dim} strokeWidth="0.8" />
          ))}
          <rect x="48" y="12" width="24" height="16" fill="none" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case 'chain': // blockchain — linked blocks
      return (
        <svg viewBox="0 0 120 40" className="w-28 h-10">
          {[8, 46, 84].map((x) => (
            <rect key={x} x={x} y="12" width="28" height="16" rx="2" fill="none" stroke={stroke} strokeWidth="1.4" />
          ))}
          <line x1="36" y1="20" x2="46" y2="20" stroke={dim} strokeWidth="1.4" />
          <line x1="74" y1="20" x2="84" y2="20" stroke={dim} strokeWidth="1.4" />
        </svg>
      );
    case 'chat': // law assistant — dialogue
      return (
        <svg viewBox="0 0 120 40" className="w-28 h-10">
          <rect x="12" y="6" width="52" height="12" rx="6" fill="none" stroke={stroke} strokeWidth="1.3" />
          <rect x="56" y="22" width="52" height="12" rx="6" fill="none" stroke={dim} strokeWidth="1.3" />
        </svg>
      );
    case 'trend': // prediction — regression line
      return (
        <svg viewBox="0 0 120 40" className="w-28 h-10">
          <line x1="10" y1="34" x2="110" y2="6" stroke={stroke} strokeWidth="1.4" />
          {[[20, 30], [35, 26], [50, 24], [65, 16], [80, 14], [95, 8]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.2" fill={dim} />
          ))}
        </svg>
      );
    default: // code & git — branch graph
      return (
        <svg viewBox="0 0 120 40" className="w-28 h-10">
          <line x1="20" y1="28" x2="100" y2="28" stroke={stroke} strokeWidth="1.4" />
          <path d="M 40 28 C 55 28 55 12 70 12 L 88 12" fill="none" stroke={dim} strokeWidth="1.4" />
          {[[20, 28], [60, 28], [100, 28], [70, 12], [88, 12]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="none" stroke={stroke} strokeWidth="1.3" />
          ))}
        </svg>
      );
  }
};

// Montage fragments — every fact sourced from portfolioData, never invented.
const flagship = featuredProjects[0];
const law = featuredProjects[1];
const prediction = featuredProjects[2];
const MONTAGE = [
  { label: 'HEALTHCARE AI', tech: [flagship.tech[0], flagship.tech[3]], motif: 'pulse' },
  { label: 'CLINICAL NLP', tech: ['ClinicalBERT', 'NLP'], motif: 'nodes' },
  { label: 'MEDICAL IMAGING', tech: [flagship.tech[1]], motif: 'scan' },
  { label: 'BLOCKCHAIN VERIFICATION', tech: [flagship.tech[2], 'MongoDB'], motif: 'chain' },
  { label: 'LAW ASSISTANT', tech: law.tech.slice(1), motif: 'chat' },
  { label: 'PREDICTION', tech: prediction.tech.slice(1, 4), motif: 'trend' },
  { label: 'CODE & GIT', tech: ['Python', 'Git', 'GitHub'], motif: 'git' },
];

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
  const termRef = useRef(null);
  const term1Ref = useRef(null);
  const term2Ref = useRef(null);
  const nodesRef = useRef(null);
  const fragmentRefs = useRef([]);

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
    const term = termRef.current;
    const term1 = term1Ref.current;
    const term2 = term2Ref.current;
    const nodes = nodesRef.current;
    const fragments = fragmentRefs.current;

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
      gsap.killTweensOf([container, flash, haze, glow, term, nodes, ...fragments]);
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

    // BEAT 2 — FIRST TECHNOLOGY SIGNAL (1.0–2.5s)
    // A quiet terminal trace and a small neural graph — present, then gone.
    tl.fromTo(
      term1,
      { autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' },
      { autoAlpha: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'power2.out' },
      1.0
    );
    tl.fromTo(
      term2,
      { autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' },
      { autoAlpha: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'power2.out' },
      1.5
    );
    tl.fromTo(
      nodes,
      { autoAlpha: 0, scale: 0.94 },
      { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
      1.3
    );
    tl.to(term, { autoAlpha: 0, duration: 0.4, ease: 'power1.in' }, 2.5);
    tl.to(nodes, { autoAlpha: 0, duration: 0.4, ease: 'power1.in' }, 2.5);

    // BEAT 3 — PROJECT MEMORY MONTAGE (2.6–5.8s)
    // Rapid, elegant fragments: blur-to-sharp in, soft collapse out.
    fragments.forEach((frag, i) => {
      if (!frag) return;
      const pos = 2.6 + i * 0.45;
      tl.fromTo(
        frag,
        { autoAlpha: 0, scale: 1.06, filter: 'blur(10px)' },
        { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.28, ease: 'power3.out' },
        pos
      );
      tl.to(
        frag,
        { autoAlpha: 0, scale: 0.98, duration: 0.18, ease: 'power1.in' },
        pos + 0.3
      );
    });

    // Interim handoff: hold the darkness briefly, then fade to Act 3.
    tl.to(container, { opacity: 0, duration: 1.0, ease: 'power2.inOut' }, 6.2);
    tl.call(finishNow, null, 7.3);

    // Hard safety net — the user must always reach Act 3
    fallbackRef.current = setTimeout(finishAct, 16000);

    return () => {
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
      tl.kill();
      gsap.killTweensOf([container, flash, haze, glow, term, nodes, ...fragments]);
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

      {/* BEAT 2 — first technology signal: a quiet terminal trace */}
      <div
        ref={termRef}
        className="absolute left-8 bottom-24 md:left-14 md:bottom-28 z-10 font-mono text-xs md:text-sm pointer-events-none"
        style={{ color: 'rgba(160, 205, 250, 0.75)', opacity: 0 }}
      >
        <div ref={term1Ref} style={{ opacity: 0, letterSpacing: '0.06em' }}>
          &gt; storm.signal --trace
        </div>
        <div ref={term2Ref} style={{ opacity: 0, letterSpacing: '0.06em' }}>
          &gt; identity: resolving…
        </div>
      </div>

      {/* BEAT 2 — small neural graph: present, then gone */}
      <div
        ref={nodesRef}
        className="absolute right-8 top-1/2 md:right-16 z-10 pointer-events-none"
        style={{ opacity: 0, transform: 'translateY(-50%)' }}
      >
        <svg viewBox="0 0 120 90" className="w-24 h-20 md:w-32 md:h-24">
          <line x1="16" y1="45" x2="60" y2="16" stroke="rgba(110, 150, 200, 0.4)" strokeWidth="1" />
          <line x1="16" y1="45" x2="60" y2="74" stroke="rgba(110, 150, 200, 0.4)" strokeWidth="1" />
          <line x1="60" y1="16" x2="104" y2="45" stroke="rgba(110, 150, 200, 0.4)" strokeWidth="1" />
          <line x1="60" y1="74" x2="104" y2="45" stroke="rgba(110, 150, 200, 0.4)" strokeWidth="1" />
          {[[16, 45], [60, 16], [60, 74], [104, 45]].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3.5"
              fill="none"
              stroke="rgba(150, 200, 250, 0.85)"
              strokeWidth="1.4"
            />
          ))}
        </svg>
      </div>

      {/* BEAT 3 — project memory montage: abstract fragments, real work */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        {MONTAGE.map((m, i) => (
          <div
            key={m.label}
            ref={(el) => (fragmentRefs.current[i] = el)}
            className="absolute flex flex-col items-center gap-3 will-change-transform"
            style={{ opacity: 0 }}
          >
            <Motif type={m.motif} />
            <div
              className="font-heading text-xs md:text-sm tracking-[0.3em]"
              style={{ color: 'rgba(210, 230, 250, 0.9)' }}
            >
              {m.label}
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {m.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] md:text-xs px-2 py-0.5 rounded-sm"
                  style={{
                    color: 'rgba(150, 200, 250, 0.8)',
                    border: '1px solid rgba(110, 150, 200, 0.3)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

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
