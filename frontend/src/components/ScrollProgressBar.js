import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgressBar = () => {
  const progressRef = useRef(null);

  useEffect(() => {
    gsap.to(progressRef.current, {
      scaleX: 1,
      transformOrigin: 'left',
      ease: 'none',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-[100] pointer-events-none"
      style={{
        background: 'rgba(0, 0, 0, 0.3)',
      }}
    >
      <div
        ref={progressRef}
        className="h-full"
        style={{
          background: 'linear-gradient(90deg, rgba(0, 212, 255, 0.8) 0%, rgba(0, 150, 255, 1) 100%)',
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.6)',
          transform: 'scaleX(0)',
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;
