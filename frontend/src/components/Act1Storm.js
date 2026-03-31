import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Act1Storm = ({ onComplete, isMobile }) => {
  const containerRef = useRef(null);
  const shieldRef = useRef(null);
  const videoRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initial fade in animations
    const tl = gsap.timeline();

    tl.fromTo(
      videoRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 3, ease: 'power2.inOut' }
    );

    tl.fromTo(
      shieldRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 2, ease: 'back.out(1.7)' },
      '-=1.5'
    );

    // Glow pulse animation
    gsap.to(shieldRef.current, {
      filter: 'drop-shadow(0 0 40px rgba(0, 212, 255, 1)) drop-shadow(0 0 80px rgba(0, 212, 255, 0.5))',
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    tl.fromTo(
      '.intro-text',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 2, ease: 'power2.out' },
      '-=1'
    );

    // Slow background scale for atmosphere
    gsap.to(videoRef.current, {
      scale: 1.05,
      duration: 20,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    });

    setIsReady(true);
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

  return (
    <div
      ref={containerRef}
      className="act-container relative w-full h-screen overflow-hidden cursor-pointer"
      onClick={handleClick}
      data-testid="act1-storm-container"
    >
      {/* Storm Background */}
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

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 h-full px-4">
        {/* Shield - PERFECTLY CENTERED */}
        <div
          ref={shieldRef}
          className="absolute top-1/2 left-1/2 cursor-pointer"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(0, 212, 255, 0.8))',
            transform: 'translate(-50%, -50%)',
            animation: 'shieldFloat 5s ease-in-out infinite',
          }}
          data-testid="shield-element"
        >
          <img
            src="/assets/shield.png"
            alt="Shield"
            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
          />
        </div>

        {/* Typography - Below shield */}
        <div className="intro-text absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center space-y-6 max-w-4xl w-full px-4">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-heading tracking-widest"
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
            Click to continue
          </p>
        </div>
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-6 z-20" data-testid="logo-act1">
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="w-12 h-12 md:w-16 md:h-16 object-contain"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.6))',
            animation: 'shine 4s ease-in-out infinite',
          }}
        />
      </div>

      {/* Animations */}
      <style>{`
        @keyframes shieldFloat {
          0%, 100% { transform: translate(-50%, -50%) translateY(0) rotate(0deg); }
          50% { transform: translate(-50%, -50%) translateY(-20px) rotate(2deg); }
        }
        
        @keyframes shine {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.6)); }
          50% { filter: drop-shadow(0 0 20px rgba(0, 255, 255, 1)); }
        }
      `}</style>
    </div>
  );
};

export default Act1Storm;