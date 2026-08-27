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
  const glowRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  // Guard against re-entry once the activation sequence has begun
  const activatedRef = useRef(false);
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
    };
  }, []);

  const handleClick = () => {
    if (!isReady || activatedRef.current) return;
    activatedRef.current = true;
    // Lightning flash effect
    const flash = document.createElement('div');
    flash.style.cssText = `
      position: fixed;
      inset: 0;
      background: radial-gradient(circle, rgba(200, 230, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 40%, transparent 80%);
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(flash);

    gsap.to(flash, {
      opacity: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 3,
      onComplete: () => flash.remove(),
    });

    // Fade out and transition
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      delay: 0.5,
      onComplete: onComplete,
    });
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
