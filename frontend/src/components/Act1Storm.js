import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Act1Storm = ({ onComplete, isMobile }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const stormMotionRef = useRef(null);
  const shieldOuterRef = useRef(null);
  const introTextRef = useRef(null);
  const glowRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const stormMotion = stormMotionRef.current;
    const shieldOuter = shieldOuterRef.current;
    const introText = introTextRef.current;
    const glow = glowRef.current;

    // Entrance: the storm settles in, then the shield emerges from it
    const tl = gsap.timeline();

    tl.fromTo(
      video,
      { opacity: 0 },
      { opacity: 1, duration: 2.5, ease: 'power2.inOut' }
    );

    tl.fromTo(
      shieldOuter,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 2, ease: 'back.out(1.7)' },
      '-=1.5'
    );

    tl.fromTo(
      introText,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 2, ease: 'power2.out' },
      '-=1'
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
      gsap.killTweensOf([video, stormMotion, shieldOuter, introText, glow]);
      if (video) video.pause();
    };
  }, []);

  const handleClick = () => {
    if (!isReady) return;
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
          className="absolute top-1/2 left-1/2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded-full"
          style={{ transform: 'translate(-50%, -50%)' }}
          data-testid="shield-element"
        >
          <div ref={shieldOuterRef}>
            <img
              src="/assets/shield.png"
              alt="Shield"
              className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
            />
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
              color: '#fff',
              textShadow: '0 0 20px rgba(0, 212, 255, 0.6)',
            }}
          >
            Before the storm... there is silence
          </h1>
          <p
            className="text-sm md:text-base text-gray-400 font-body tracking-wide animate-pulse"
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
