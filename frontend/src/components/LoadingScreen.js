import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2000;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(newProgress));

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Complete animation
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          delay: 0.3,
          onComplete: () => {
            if (onComplete) onComplete();
          },
        });
      }
    };

    updateProgress();

    // Animate progress bar
    gsap.to(progressRef.current, {
      width: '100%',
      duration: duration / 1000,
      ease: 'power2.inOut',
    });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0a1a 100%)',
      }}
    >
      <div className="text-center">
        {/* Logo or title */}
        <div className="mb-8">
          <h1 className="text-5xl font-heading font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            PRAJWAL Y JAIN
          </h1>
          <p className="text-gray-400 mt-2">AI Engineer & Developer</p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto mb-4">
          <div
            ref={progressRef}
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, rgba(0, 212, 255, 0.8) 0%, rgba(0, 150, 255, 1) 100%)',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.6)',
              width: '0%',
            }}
          />
        </div>

        {/* Progress percentage */}
        <div className="text-cyan-400 font-mono text-sm">
          {progress}%
        </div>

        {/* Loading text */}
        <div className="mt-6 text-gray-500 text-sm animate-pulse">
          Initializing Intelligence Systems...
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
