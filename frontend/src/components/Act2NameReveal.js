import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { featuredProjects, personal } from '@/data/portfolioData';

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
// Beat structure:
//   1. After the storm    — Act 1's flash collapses into deeper darkness
//   2. First tech signal  — terminal / code fragments
//   3. Project memory     — abstract montage of real portfolio work
//   4. Identity reveal    — PRAJWAL Y JAIN + tagline
//   5. Handoff            — quiet fade into Act 3
//
// The sequence always completes through one guarded transition:
// timeline end, skip, or the hard fallback timer.
// Compose an ORIGINAL procedural score with WebAudio — no audio files,
// nothing copyrighted. Everything is wrapped defensively: if the context
// can't start (no user gesture, blocked autoplay), Act 2 plays silently.
// Act 1's shield click is the gesture that typically unlocks audio here.
const createAct2Score = () => {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;

  let ctx;
  try {
    ctx = new AudioCtx();
  } catch (e) {
    return null;
  }

  const master = ctx.createGain();
  master.gain.value = 0.16; // restrained — the visuals lead
  master.connect(ctx.destination);

  const nodes = [];
  const track = (node) => {
    nodes.push(node);
    return node;
  };

  const dispose = () => {
    try {
      nodes.forEach((n) => {
        try {
          n.stop();
        } catch (e) {
          /* already stopped */
        }
        try {
          n.disconnect();
        } catch (e) {
          /* already disconnected */
        }
      });
      master.disconnect();
      if (ctx.state !== 'closed') ctx.close();
    } catch (e) {
      /* best-effort teardown */
    }
  };

  // Skip path: dissolve the score quickly instead of cutting it off
  const fadeOut = () => {
    try {
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0, now + 0.6);
      setTimeout(dispose, 700);
    } catch (e) {
      /* best-effort fade */
    }
  };

  const start = () =>
    ctx.resume().then(() => {
      const t0 = ctx.currentTime + 0.05;

      // Ambience: two detuned low sines, very quiet
      [55, 82.5].forEach((freq, i) => {
        const osc = track(ctx.createOscillator());
        osc.type = 'sine';
        osc.frequency.value = freq;
        const g = track(ctx.createGain());
        g.gain.setValueAtTime(0, t0);
        g.gain.linearRampToValueAtTime(i === 0 ? 0.5 : 0.3, t0 + 1.6);
        osc.connect(g).connect(master);
        osc.start(t0);
        osc.stop(t0 + 11);
      });

      // Air: looped filtered noise, low-passed into near-silence
      const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const data = noiseBuf.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
      const noise = track(ctx.createBufferSource());
      noise.buffer = noiseBuf;
      noise.loop = true;
      const airFilter = track(ctx.createBiquadFilter());
      airFilter.type = 'lowpass';
      airFilter.frequency.value = 260;
      const airGain = track(ctx.createGain());
      airGain.gain.setValueAtTime(0, t0);
      airGain.gain.linearRampToValueAtTime(0.06, t0 + 2);
      noise.connect(airFilter).connect(airGain).connect(master);
      noise.start(t0);
      noise.stop(t0 + 11);

      // Tech signals: soft sine blips as the terminal lines appear
      [1.0, 1.5].forEach((when) => {
        const osc = track(ctx.createOscillator());
        osc.type = 'sine';
        osc.frequency.value = when < 1.2 ? 880 : 1174;
        const g = track(ctx.createGain());
        const t = t0 + when;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.07, t + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
        osc.connect(g).connect(master);
        osc.start(t);
        osc.stop(t + 0.4);
      });

      // Montage: a quiet tick for each fragment
      for (let i = 0; i < 7; i += 1) {
        const t = t0 + 2.4 + i * 0.4;
        const osc = track(ctx.createOscillator());
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520 + i * 70, t);
        osc.frequency.exponentialRampToValueAtTime(300 + i * 45, t + 0.09);
        const g = track(ctx.createGain());
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.05, t + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
        osc.connect(g).connect(master);
        osc.start(t);
        osc.stop(t + 0.15);
      }

      // Musical rise into the name reveal: band-passed noise sweep
      const rise = track(ctx.createBufferSource());
      rise.buffer = noiseBuf;
      rise.loop = true;
      const riseFilter = track(ctx.createBiquadFilter());
      riseFilter.type = 'bandpass';
      riseFilter.Q.value = 2.5;
      riseFilter.frequency.setValueAtTime(120, t0 + 5.2);
      riseFilter.frequency.exponentialRampToValueAtTime(1600, t0 + 6.7);
      const riseGain = track(ctx.createGain());
      riseGain.gain.setValueAtTime(0, t0 + 5.2);
      riseGain.gain.linearRampToValueAtTime(0.09, t0 + 6.7);
      riseGain.gain.linearRampToValueAtTime(0, t0 + 7.4);
      rise.connect(riseFilter).connect(riseGain).connect(master);
      rise.start(t0 + 5.2);
      rise.stop(t0 + 7.5);

      // Impact accent on name completion: sine drop + soft noise thump
      const drop = track(ctx.createOscillator());
      drop.type = 'sine';
      drop.frequency.setValueAtTime(150, t0 + 7.3);
      drop.frequency.exponentialRampToValueAtTime(48, t0 + 7.95);
      const dropGain = track(ctx.createGain());
      dropGain.gain.setValueAtTime(0, t0 + 7.3);
      dropGain.gain.linearRampToValueAtTime(0.3, t0 + 7.34);
      dropGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 8.2);
      drop.connect(dropGain).connect(master);
      drop.start(t0 + 7.3);
      drop.stop(t0 + 8.3);

      const thump = track(ctx.createBufferSource());
      thump.buffer = noiseBuf;
      const thumpFilter = track(ctx.createBiquadFilter());
      thumpFilter.type = 'lowpass';
      thumpFilter.frequency.value = 220;
      const thumpGain = track(ctx.createGain());
      thumpGain.gain.setValueAtTime(0, t0 + 7.3);
      thumpGain.gain.linearRampToValueAtTime(0.1, t0 + 7.33);
      thumpGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 7.8);
      thump.connect(thumpFilter).connect(thumpGain).connect(master);
      thump.start(t0 + 7.3);
      thump.stop(t0 + 7.9);

      // Handoff: everything dissolves softly toward Act 3
      master.gain.setValueAtTime(0.16, t0 + 8.4);
      master.gain.linearRampToValueAtTime(0, t0 + 10.6);
    });

  return { start, dispose, fadeOut };
};

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
  const montageRef = useRef(null);
  const nameRef = useRef(null);
  const letterRefs = useRef([]);
  const taglineRef = useRef(null);
  const sweepRef = useRef(null);
  const particleCanvasRef = useRef(null);

  const completedRef = useRef(false);
  const timelineRef = useRef(null);
  const fallbackRef = useRef(null);
  // Latest finishAct for the skip button without re-running the effect
  const finishActRef = useRef(() => {});
  // Keep the latest completion callback without re-running the effect
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  // Particles shift from ambient drift to converging on the name, then settle.
  const convergeRef = useRef(false);
  const settleRef = useRef(false);

  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const COUNT = coarse ? 30 : 60; // restrained — never thousands of nodes
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: h * 0.25 + Math.random() * h * 0.75,
      r: 0.6 + Math.random() * 1.3,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.1 - Math.random() * 0.25,
      a: 0.15 + Math.random() * 0.4,
    }));

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h * 0.46;
      for (const p of particles) {
        if (convergeRef.current && !settleRef.current) {
          // Drawn toward the name
          p.vx += (cx - p.x) * 0.0009;
          p.vy += (cy - p.y) * 0.0009;
          p.vx *= 0.985;
          p.vy *= 0.985;
        } else if (settleRef.current) {
          // Released into a slow, quiet drift
          p.vx *= 0.96;
          p.vy = p.vy * 0.96 + 0.02;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(170, 205, 250, ${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      particles.length = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const montage = montageRef.current;
    const name = nameRef.current;
    const letters = letterRefs.current.filter(Boolean);
    const tagline = taglineRef.current;
    const sweep = sweepRef.current;

    // Original score — continues from Act 1's user gesture when allowed,
    // and Act 2 still plays perfectly when audio stays blocked.
    let score = null;
    try {
      score = createAct2Score();
      if (score) score.start().catch(() => {});
    } catch (e) {
      score = null;
    }

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
      if (score) score.fadeOut();
      gsap.killTweensOf([container, flash, haze, glow, term, nodes, montage, ...fragments, name, tagline, sweep, ...letters]);
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

    // BEAT 3 — PROJECT MEMORY MONTAGE (2.4–5.1s)
    // Rapid, elegant fragments: masked wipes with blur-to-sharp focus,
    // alternating direction for rhythm, plus a slow camera drift for depth.
    tl.fromTo(
      montage,
      { scale: 1.035 },
      { scale: 1, duration: 3.2, ease: 'power2.out' },
      2.3
    );
    fragments.forEach((frag, i) => {
      if (!frag) return;
      const pos = 2.4 + i * 0.4;
      const leftToRight = i % 2 === 0;
      tl.fromTo(
        frag,
        {
          autoAlpha: 0,
          scale: leftToRight ? 1.05 : 1.09,
          xPercent: leftToRight ? -3 : 3,
          filter: 'blur(9px)',
          clipPath: leftToRight ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
        },
        {
          autoAlpha: 1,
          scale: 1,
          xPercent: 0,
          filter: 'blur(0px)',
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.3,
          ease: 'power3.out',
        },
        pos
      );
      tl.to(
        frag,
        {
          autoAlpha: 0,
          scale: 0.985,
          filter: 'blur(4px)',
          duration: 0.18,
          ease: 'power1.in',
        },
        pos + 0.3
      );
    });

    // BEAT 4 — IDENTITY REVEAL (5.4–8.4s)
    // The montage clears into quiet darkness, then the name emerges.
    // Particles stop drifting and are drawn toward the forming name.
    tl.call(() => {
      convergeRef.current = true;
    }, null, 5.2);
    letters.forEach((letter, i) => {
      if (!letter) return;
      tl.fromTo(
        letter,
        { autoAlpha: 0, letterSpacing: '0.55em', filter: 'blur(9px)', y: 8 },
        {
          autoAlpha: 1,
          letterSpacing: '0.22em',
          filter: 'blur(0px)',
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
        },
        5.4 + i * 0.05
      );
    });
    // One metallic light sweep across the finished name — subtle, once, done.
    tl.fromTo(
      sweep,
      { xPercent: -50, autoAlpha: 0 },
      { xPercent: 380, autoAlpha: 1, duration: 0.95, ease: 'power2.inOut' },
      6.6
    );
    tl.to(sweep, { autoAlpha: 0, duration: 0.15, ease: 'power1.out' }, 7.5);
    tl.call(() => {
      settleRef.current = true;
    }, null, 7.6);
    tl.fromTo(
      tagline,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      6.6
    );

    // Handoff: let the name breathe, then fade into Act 3.
    tl.to(container, { opacity: 0, duration: 1.0, ease: 'power2.inOut' }, 8.8);
    tl.call(finishNow, null, 9.9);

    // Hard safety net — the user must always reach Act 3
    fallbackRef.current = setTimeout(finishAct, 16000);

    return () => {
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
      tl.kill();
      gsap.killTweensOf([container, flash, haze, glow, term, nodes, montage, ...fragments, name, tagline, sweep, ...letters]);
      if (score) score.dispose();
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

      {/* Controlled particle field — canvas, never DOM nodes */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
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
      <div
        ref={montageRef}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
      >
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

      {/* BEAT 4 — identity reveal: the name is the main moment */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center px-6">
          <div className="relative overflow-hidden">
            <h1
              ref={nameRef}
              className="font-heading text-white text-center leading-tight select-none"
              style={{
                fontSize: 'clamp(2rem, 7vw, 5rem)',
                textShadow: '0 0 42px rgba(120, 180, 255, 0.25)',
              }}
            >
              {personal.displayName.split('').map((ch, i) => (
                <span
                  key={i}
                  ref={(el) => (letterRefs.current[i] = el)}
                  className="inline-block will-change-transform"
                  style={{ opacity: 0, whiteSpace: ch === ' ' ? 'pre' : undefined }}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              ))}
            </h1>
            {/* Metallic sweep — clipped to the title, plays exactly once */}
            <div
              ref={sweepRef}
              className="absolute top-0 bottom-0 pointer-events-none"
              style={{
                left: '-20%',
                width: '40%',
                background:
                  'linear-gradient(105deg, transparent 0%, rgba(220, 235, 255, 0.14) 42%, rgba(255, 255, 255, 0.35) 50%, rgba(220, 235, 255, 0.14) 58%, transparent 100%)',
                transform: 'skewX(-18deg)',
                opacity: 0,
              }}
            />
          </div>
          <p
            ref={taglineRef}
            className="font-body mt-5 text-center tracking-[0.35em] uppercase select-none"
            style={{
              opacity: 0,
              fontSize: 'clamp(0.6rem, 1.4vw, 0.8rem)',
              color: 'rgba(170, 205, 240, 0.75)',
            }}
          >
            Artificial Intelligence • Data • Intelligent Systems
          </p>
        </div>
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
