import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BackgroundOrbs = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const orbs = containerRef.current.querySelectorAll('.orb');

    orbs.forEach((orb, index) => {
      gsap.to(orb, {
        x: `random(-100, 100)`,
        y: `random(-100, 100)`,
        duration: `random(8, 15)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.5,
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      <div
        className="orb absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="orb absolute top-3/4 right-1/4 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 150, 255, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="orb absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
};

export default BackgroundOrbs;
