import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionDivider = ({ variant = 'line' }) => {
  const dividerRef = useRef(null);

  useEffect(() => {
    if (variant === 'line') {
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 80%',
          },
        }
      );
    } else if (variant === 'dots') {
      const dots = dividerRef.current.querySelectorAll('.dot');
      gsap.fromTo(
        dots,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, [variant]);

  if (variant === 'line') {
    return (
      <div className="relative w-full h-px my-24">
        <div
          ref={dividerRef}
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(0, 212, 255, 0.6) 50%, transparent 100%)',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
            transformOrigin: 'center',
          }}
        />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div ref={dividerRef} className="flex justify-center gap-4 my-24">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="dot w-2 h-2 rounded-full"
            style={{
              background: 'rgba(0, 212, 255, 0.8)',
              boxShadow: '0 0 10px rgba(0, 212, 255, 0.6)',
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'wave') {
    return (
      <div className="relative w-full h-24 my-24 overflow-hidden">
        <svg
          ref={dividerRef}
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 Q300,0 600,60 T1200,60"
            fill="none"
            stroke="rgba(0, 212, 255, 0.4)"
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  }

  return null;
};

export default SectionDivider;
