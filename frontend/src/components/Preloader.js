import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const progressBarRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              if (onComplete) onComplete();
            },
          });
        }, 300);
      },
    });

    // Logo animation
    tl.fromTo(
      logoRef.current,
      { scale: 0, opacity: 0, rotateY: 180 },
      {
        scale: 1,
        opacity: 1,
        rotateY: 0,
        duration: 1,
        ease: 'back.out(1.7)',
      }
    );

    // Progress bar animation
    const duration = 2;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / (duration * 1000)) * 100, 100);
      setProgress(Math.floor(newProgress));

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();

    gsap.to(progressBarRef.current, {
      width: '100%',
      duration: duration,
      ease: 'power2.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0a1a 50%, #000000 100%)',
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div ref={logoRef} className="relative z-10 mb-12">
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%)',
            border: '2px solid rgba(0, 212, 255, 0.5)',
            boxShadow: '0 0 60px rgba(0, 212, 255, 0.4)',
          }}
        >
          <div className="text-5xl font-heading font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            PJ
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div className="relative z-10 mb-8">
        <h2 className="text-3xl font-heading font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          PRAJWAL Y JAIN
        </h2>
        <p className="text-gray-400 text-center text-sm">AI Engineer & Developer</p>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-64">
        <div
          className="h-1 bg-gray-800 rounded-full overflow-hidden mb-2"
          style={{
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            ref={progressBarRef}
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, rgba(0, 212, 255, 0.8) 0%, rgba(0, 150, 255, 1) 100%)',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.6)',
              width: '0%',
            }}
          />
        </div>
        <div className="text-center text-cyan-400 font-mono text-sm">
          {progress}%
        </div>
      </div>

      {/* Loading message */}
      <div className="relative z-10 mt-6 text-gray-500 text-sm animate-pulse">
        Loading Experience...
      </div>
    </div>
  );
};

export default Preloader;
