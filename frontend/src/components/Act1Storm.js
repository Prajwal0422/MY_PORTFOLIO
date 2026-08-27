import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Act1Storm = ({ onComplete, isMobile }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const stormMotionRef = useRef(null);
  const shieldOuterRef = useRef(null);
  const shieldRef = useRef(null);
  const shieldGlowRef = useRef(null);
  const introTextRef = useRef(null);
  const hintRef = useRef(null);
  const sweepRef = useRef(null);
  const boltGroupRef = useRef(null);
  const shockwaveRef = useRef(null);
  const energyRef = useRef(null);
  const flashRef = useRef(null);
  const afterglowRef = useRef(null);
  const glowRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  // Guard against re-entry once the activation sequence has begun
  const activatedRef = useRef(false);
  // Thunder is created lazily on the user gesture and never autoplays
  const thunderRef = useRef(null);
  // Hover only makes sense with a real pointer (never on touch devices)
  const hasFinePointer =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(pointer: fine)').matches;

  useEffect(() => {
    const video = videoRef.current;
    const stormMotion = stormMotionRef.current;
    const shieldOuter = shieldOuterRef.current;
    const shield = shieldRef.current;
    const shieldGlow = shieldGlowRef.current;
    const introText = introTextRef.current;
    const hint = hintRef.current;
    const sweep = sweepRef.current;
    const glow = glowRef.current;

    // Entrance: the storm settles in, then the shield emerges from it
    const tl = gsap.timeline();

    // 0.0s → the storm fades in from black
    tl.fromTo(
      video,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.inOut' }
    );

    // 0.4s → the shield begins emerging from the storm
    tl.set(shieldOuter, { opacity: 0, scale: 0.88, y: 28, filter: 'blur(10px)' }, 0.4);
    tl.to(
      shieldOuter,
      { opacity: 0.5, duration: 0.4, ease: 'power1.in' },
      0.4
    );

    // 0.8s → shield reaches ~50% opacity, keeps emerging
    tl.to(
      shieldOuter,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.7,
        ease: 'power2.out',
      },
      0.8
    );

    // 1.1s → the primary line fades upward after the shield begins appearing
    tl.fromTo(
      introText,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out' },
      1.1
    );

    // 1.9s → the instruction appears last, quiet and understated
    tl.fromTo(
      hint,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power1.inOut' },
      1.9
    );

    // Idle: heavy, slow breathing — tiny drift and rotation that never
    // line up, so the movement never feels robotic.
    gsap.to(shield, {
      y: -4,
      rotation: 0.3,
      duration: 7,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 2,
    });
    gsap.to(shield, {
      rotation: -0.2,
      duration: 11.3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 4.2,
    });

    // Subtle blue glow pulse, deliberately off-sync with the breathing
    gsap.fromTo(
      shieldGlow,
      { opacity: 0.45, scale: 0.98, xPercent: -50, yPercent: -50 },
      {
        opacity: 0.75,
        scale: 1.04,
        xPercent: -50,
        yPercent: -50,
        duration: 5.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2,
      }
    );

    // Almost imperceptible camera drift through the clouds
    gsap.fromTo(
      stormMotion,
      { scale: 1.04, xPercent: -0.6, yPercent: -0.4 },
      {
        scale: 1.09,
        xPercent: 0.6,
        yPercent: 0.4,
        duration: 40,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      }
    );

    // Soft breathing of the ambient light behind the shield
    gsap.fromTo(
      glow,
      { opacity: 0.35 },
      { opacity: 0.55, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true }
    );

    setIsReady(true);

    return () => {
      tl.kill();
      gsap.killTweensOf([
        video,
        stormMotion,
        shieldOuter,
        shield,
        shieldGlow,
        sweep,
        introText,
        hint,
        glow,
      ]);
      if (video) video.pause();
      if (thunderRef.current) {
        thunderRef.current.pause();
        thunderRef.current = null;
      }
    };
  }, []);

  // Thunder plays exactly at the visual impact. It is triggered from the
  // click gesture, capped at a sensible volume, and any playback failure
  // (blocked audio, missing file) is ignored silently — the visuals carry on.
  const playThunder = () => {
    try {
      if (!thunderRef.current) {
        thunderRef.current = new Audio('/assets/thunder.mp3');
        thunderRef.current.preload = 'auto';
      }
      const audio = thunderRef.current;
      audio.currentTime = 0;
      audio.volume = 0.65;
      const result = audio.play();
      if (result && typeof result.catch === 'function') {
        result.catch(() => {});
      }
    } catch {
      // Never let audio problems break the visual sequence
    }
  };

  const handleClick = () => {
    if (!isReady || activatedRef.current) return;
    activatedRef.current = true;

    // Activation: energy buildup → CRACK → controlled flash.
    // The cinematic transition is refined in later commits.
    const act = gsap.timeline();

    // The idle breathing stops the moment the shield is activated —
    // the impact physics owns the shield transform from here on.
    gsap.killTweensOf([shieldRef.current, shieldGlowRef.current]);

    // 0.0–0.35s — energy builds around the shield
    act.to(
      energyRef.current,
      { opacity: 0.85, scale: 1.05, xPercent: -50, yPercent: -50, duration: 0.35, ease: 'power2.in' },
      0
    );
    act.to(
      shieldGlowRef.current,
      { opacity: 1, duration: 0.3, ease: 'power2.in' },
      0
    );

    // 0.35s — IMPACT: localized electric burst + lightning branches
    playThunder();

    // Shield impact physics: massive compression, recoil, brief vibration
    act.to(shieldRef.current, { scale: 0.97, rotation: -1, duration: 0.08, ease: 'power3.in' }, 0.35);
    act.to(shieldRef.current, { scale: 1.015, rotation: 0.4, duration: 0.12, ease: 'power2.out' }, 0.43);
    act.to(shieldRef.current, { scale: 1, rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' }, 0.55);
    act.to(shieldRef.current, { x: 1.5, duration: 0.03, yoyo: true, repeat: 5, ease: 'none' }, 0.36);
    act.set(shieldRef.current, { x: 0 }, 0.58);

    // Circular shockwave radiating from the shield — expands fast, fades fast
    act.fromTo(
      shockwaveRef.current,
      { opacity: 0.85, scale: 0.35, xPercent: -50, yPercent: -50 },
      {
        opacity: 0,
        scale: 2.4,
        xPercent: -50,
        yPercent: -50,
        duration: 0.7,
        ease: 'power2.out',
      },
      0.36
    );

    // Short cinematic screen shake — low amplitude, fast decay, transforms only
    act.to(containerRef.current, { x: 5, y: 3, duration: 0.045, ease: 'none' }, 0.35);
    act.to(containerRef.current, { x: -4, y: -2, duration: 0.05, ease: 'none' }, 0.395);
    act.to(containerRef.current, { x: 3, y: 2, duration: 0.055, ease: 'none' }, 0.445);
    act.to(containerRef.current, { x: -2, y: -1, duration: 0.06, ease: 'none' }, 0.5);
    act.to(containerRef.current, { x: 1, y: 0.5, duration: 0.07, ease: 'none' }, 0.56);
    act.to(containerRef.current, { x: 0, y: 0, duration: 0.1, ease: 'power1.out' }, 0.63);

    act.fromTo(
      energyRef.current,
      { opacity: 0.85 },
      { opacity: 1, duration: 0.06, yoyo: true, repeat: 1, ease: 'none' },
      0.35
    );
    act.to(
      boltGroupRef.current,
      { opacity: 1, rotation: 0.6, xPercent: -50, yPercent: -50, duration: 0.05, ease: 'none' },
      0.35
    );
    act.to(boltGroupRef.current, { opacity: 0.25, duration: 0.05, ease: 'none' }, 0.43);
    act.to(boltGroupRef.current, { opacity: 0.85, duration: 0.04, ease: 'none' }, 0.5);
    act.to(boltGroupRef.current, { opacity: 0, duration: 0.2, ease: 'power1.out' }, 0.56);
    act.to(
      energyRef.current,
      { opacity: 0, scale: 1.3, duration: 0.5, ease: 'power2.out' },
      0.58
    );

    // Full-screen flash — short, bright, controlled (never a stuck white frame)
    act.fromTo(
      flashRef.current,
      { opacity: 0 },
      { opacity: 0.92, duration: 0.07, ease: 'power2.out' },
      0.36
    );
    act.to(flashRef.current, { opacity: 0.15, duration: 0.1, ease: 'power1.in' }, 0.45);
    act.to(flashRef.current, { opacity: 0, duration: 0.3, ease: 'power1.out' }, 0.62);

    // Afterglow lingers briefly as the storm recovers
    act.fromTo(
      afterglowRef.current,
      { opacity: 0 },
      { opacity: 0.22, duration: 0.12, ease: 'power1.out' },
      0.5
    );
    act.to(afterglowRef.current, { opacity: 0, duration: 0.8, ease: 'power1.inOut' }, 0.7);

    // Cinematic transition: light fills the screen, then the storm
    // disappears into darkness and Act 2 begins.
    act.to([introTextRef.current, hintRef.current], { opacity: 0, duration: 0.35, ease: 'power1.in' }, 0.85);
    act.to(
      flashRef.current,
      { opacity: 0.5, duration: 0.4, ease: 'power2.inOut', overwrite: 'auto' },
      0.9
    );
    act.to(containerRef.current, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, 1.15);
    act.add(() => onComplete(), 1.95);
  };

  // Procedural lightning branches radiating from the shield.
  // Deterministic per mount — no assets fabricated, no randomness at impact time.
  const getBranches = () => {
    const branches = [];
    const angles = [-72, -38, -10, 14, 42, 74];
    angles.forEach((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const dx = Math.sin(rad);
      const dy = -Math.cos(rad);
      const length = 150 + (i % 3) * 45;
      const points = [[0, 0]];
      let x = 0;
      let y = 0;
      const segments = 5;
      for (let s = 1; s <= segments; s++) {
        const t = (length / segments) * s;
        const jag = (s % 2 === 0 ? 1 : -1) * (7 + i * 2);
        x = dx * t + -dy * jag;
        y = dy * t + dx * jag;
        points.push([x, y]);
      }
      branches.push({
        d: points.map((p) => `${p[0]},${p[1]}`).join(' '),
        width: i % 2 === 0 ? 2.5 : 1.5,
      });
    });
    return branches;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Elegant hover: the shield leans in slightly, its glow lifts, and a
  // single light sweep crosses it. Heavy — nothing jumps.
  const handleMouseEnter = () => {
    if (!hasFinePointer || activatedRef.current) return;
    gsap.to(shieldRef.current, { scale: 1.025, duration: 0.7, ease: 'power2.out' });
    gsap.to(shieldGlowRef.current, { opacity: 0.9, duration: 0.6, ease: 'power1.out' });

    if (sweepRef.current) {
      gsap.killTweensOf(sweepRef.current);
      gsap.fromTo(
        sweepRef.current,
        { opacity: 0, xPercent: -130 },
        {
          opacity: 0.5,
          xPercent: 130,
          duration: 1.1,
          ease: 'power2.inOut',
          onComplete: () => gsap.set(sweepRef.current, { opacity: 0 }),
        }
      );
    }
  };

  const handleMouseLeave = () => {
    if (!hasFinePointer || activatedRef.current) return;
    gsap.to(shieldRef.current, { scale: 1, duration: 0.9, ease: 'power2.inOut' });
    gsap.to(shieldGlowRef.current, { opacity: 0.6, duration: 0.8, ease: 'power1.inOut' });
  };

  return (
    <div
      ref={containerRef}
      className="act-container relative w-full h-screen overflow-hidden"
      style={{ background: '#04060c' }}
      data-testid="act1-storm-container"
    >
      {/* Storm background — slow camera drift lives on the motion wrapper */}
      <div ref={stormMotionRef} className="absolute inset-0 will-change-transform">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          data-testid="storm-background-video"
        >
          <source src="/assets/storm.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Cinematic color grading — deep blacks, charcoal, dark blue */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,5,11,0.88) 0%, rgba(7,12,24,0.35) 42%, rgba(3,5,11,0.9) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(115deg, rgba(16,28,50,0.32) 0%, rgba(2,4,9,0.05) 50%, rgba(12,22,42,0.3) 100%)',
        }}
      />

      {/* Subtle radial focus around the shield */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 42% 38% at 50% 46%, rgba(70,120,180,0.22) 0%, rgba(70,120,180,0.06) 45%, transparent 70%)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 120% 100% at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full px-4">
        {/* Shield - PERFECTLY CENTERED */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Click the shield to continue"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute top-1/2 left-1/2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded-full"
          style={{ transform: 'translate(-50%, -50%)' }}
          data-testid="shield-element"
        >
          <div ref={shieldOuterRef} className="relative">
            {/* Soft glow that follows the shield silhouette */}
            <div
              ref={shieldGlowRef}
              className="absolute left-1/2 top-1/2 pointer-events-none"
              style={{
                width: '135%',
                height: '135%',
                background:
                  'radial-gradient(circle, rgba(72,140,210,0.5) 0%, rgba(56,110,175,0.18) 45%, transparent 72%)',
              }}
            />
            <img
              ref={shieldRef}
              src="/assets/shield.png"
              alt="Shield"
              className="relative w-full h-auto object-contain"
              style={{
                // Responsive tiers: mobile stays tappable, desktop stays cinematic
                width: isMobile ? 'min(65vw, 340px)' : 'clamp(220px, 28vw, 440px)',
                filter: 'drop-shadow(0 0 18px rgba(90, 150, 215, 0.35))',
              }}
            />
            {/* One-off light sweep, clipped to the shield bounds */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                ref={sweepRef}
                className="absolute top-0 bottom-0"
                style={{
                  width: '34%',
                  left: '33%',
                  opacity: 0,
                  background:
                    'linear-gradient(100deg, transparent 0%, rgba(210, 230, 250, 0.55) 50%, transparent 100%)',
                }}
              />
            </div>

            {/* Energy ring that charges up around the shield on activation */}
            <div
              ref={energyRef}
              className="absolute left-1/2 top-1/2 pointer-events-none"
              style={{
                width: '150%',
                height: '150%',
                opacity: 0,
                background:
                  'radial-gradient(circle, transparent 42%, rgba(150, 200, 255, 0.5) 55%, rgba(90, 150, 220, 0.18) 66%, transparent 78%)',
              }}
            />

            {/* Impact shockwave — a single expanding, fading ring */}
            <div
              ref={shockwaveRef}
              className="absolute left-1/2 top-1/2 pointer-events-none"
              style={{
                width: '130%',
                height: '130%',
                opacity: 0,
                borderRadius: '50%',
                border: '1.5px solid rgba(190, 220, 255, 0.85)',
                boxShadow: '0 0 24px rgba(150, 195, 245, 0.55), inset 0 0 18px rgba(150, 195, 245, 0.3)',
              }}
            />

            {/* Procedural lightning branches — electric blue-white only */}
            <svg
              ref={boltGroupRef}
              className="absolute left-1/2 top-1/2 pointer-events-none"
              width="400"
              height="400"
              viewBox="-200 -200 400 400"
              style={{ opacity: 0, overflow: 'visible' }}
              aria-hidden="true"
            >
              {getBranches().map((b, i) => (
                <polyline
                  key={i}
                  points={b.d}
                  fill="none"
                  stroke={i % 2 === 0 ? 'rgba(215, 235, 255, 0.95)' : 'rgba(150, 195, 245, 0.8)'}
                  strokeWidth={b.width}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Typography - Below shield */}
        <div
          ref={introTextRef}
          className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center space-y-6 max-w-4xl w-full px-4"
        >
          <h1
            className="intro-text text-3xl md:text-4xl lg:text-5xl font-heading tracking-widest"
            data-testid="intro-quote"
            style={{
              letterSpacing: '0.15em',
              color: '#f4f7fb',
              textShadow: '0 2px 24px rgba(6, 12, 24, 0.8)',
            }}
          >
            Before the storm... there is silence
          </h1>
          <p
            ref={hintRef}
            className="text-xs md:text-sm uppercase tracking-[0.35em] text-gray-400 font-body"
            data-testid="intro-hint"
          >
            Click the shield
          </p>
        </div>
      </div>

      {/* Lightning flash layer — short, bright, controlled */}
      <div
        ref={flashRef}
        className="fixed inset-0 z-30 pointer-events-none"
        style={{
          opacity: 0,
          background:
            'radial-gradient(circle at 50% 46%, rgba(235, 245, 255, 0.95) 0%, rgba(190, 220, 250, 0.75) 35%, rgba(120, 170, 230, 0.35) 60%, transparent 85%)',
        }}
      />

      {/* Afterglow layer — the storm recovering after the strike */}
      <div
        ref={afterglowRef}
        className="fixed inset-0 z-20 pointer-events-none"
        style={{
          opacity: 0,
          background:
            'radial-gradient(circle at 50% 46%, rgba(150, 195, 245, 0.5) 0%, rgba(90, 140, 200, 0.2) 45%, transparent 75%)',
        }}
      />

      {/* Logo */}
      <div className="absolute top-6 left-6 z-20" data-testid="logo-act1">
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="w-12 h-12 md:w-16 md:h-16 object-contain opacity-80"
        />
      </div>
    </div>
  );
};

export default Act1Storm;
