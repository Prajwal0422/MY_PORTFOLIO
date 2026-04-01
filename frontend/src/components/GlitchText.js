import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const GlitchText = ({ children, className = '' }) => {
  const textRef = useRef(null);
  const glitch1Ref = useRef(null);
  const glitch2Ref = useRef(null);

  useEffect(() => {
    const triggerGlitch = () => {
      const tl = gsap.timeline();

      tl.to([glitch1Ref.current, glitch2Ref.current], {
        opacity: 1,
        duration: 0.05,
      })
      .to(glitch1Ref.current, {
        x: -2,
        duration: 0.05,
      }, 0)
      .to(glitch2Ref.current, {
        x: 2,
        duration: 0.05,
      }, 0)
      .to([glitch1Ref.current, glitch2Ref.current], {
        opacity: 0,
        x: 0,
        duration: 0.05,
      });
    };

    // Random glitch effect
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        triggerGlitch();
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative inline-block ${className}`}>
      <span ref={textRef} className="relative z-10">
        {children}
      </span>
      <span
        ref={glitch1Ref}
        className="absolute top-0 left-0 opacity-0 pointer-events-none"
        style={{
          color: '#00d4ff',
          textShadow: '2px 0 #ff00de',
          clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
        }}
      >
        {children}
      </span>
      <span
        ref={glitch2Ref}
        className="absolute top-0 left-0 opacity-0 pointer-events-none"
        style={{
          color: '#ff00de',
          textShadow: '-2px 0 #00d4ff',
          clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
        }}
      >
        {children}
      </span>
    </div>
  );
};

export default GlitchText;
