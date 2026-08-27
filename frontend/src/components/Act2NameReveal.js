import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Act2NameReveal = ({ onComplete, isMobile }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const completedRef = useRef(false);

  // Safe, idempotent transition to Act 3 — used by the video end,
  // the skip button, and any playback failure fallback.
  const finishAct = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (videoRef.current) {
      videoRef.current.pause();
    }
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      onComplete: onComplete,
    });
  };

  useEffect(() => {
    // Fade in container
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );

    // Play video
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log('Video play prevented:', err));
      
      // When video ends, transition to Act 3
      videoRef.current.onended = () => {
        // Stop video
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        finishAct();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="act-container relative w-full h-screen overflow-hidden bg-black"
      data-testid="act2-name-reveal-container"
    >
      {/* Fullscreen Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        onError={finishAct}
        data-testid="act2-video"
      >
        <source src="/assets/act2-video.mp4" type="video/mp4" onError={finishAct} />
      </video>

      {/* Skip button — lets users proceed without watching the video */}
      <button
        onClick={finishAct}
        aria-label="Skip introduction video"
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

      {/* Logo */}
      <div className="absolute top-6 left-6 z-30" data-testid="logo-act2">
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="w-12 h-12 md:w-16 md:h-16 object-contain"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.6))',
          }}
        />
      </div>
    </div>
  );
};

export default Act2NameReveal;
