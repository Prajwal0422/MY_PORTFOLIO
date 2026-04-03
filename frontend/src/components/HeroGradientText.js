import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroGradientText = ({ children, className = '' }) => {
  const textRef = useRef(null);

  useEffect(() => {
    // Animate gradient position
    gsap.to(textRef.current, {
      backgroundPosition: '200% center',
      duration: 3,
      repeat: -1,
      ease: 'none',
    });

    // Entrance animation
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
      }
    );
  }, []);

  return (
    <h1
      ref={textRef}
      className={`font-heading font-black ${className}`}
      style={{
        background: 'linear-gradient(90deg, #00d4ff 0%, #0096ff 25%, #00d4ff 50%, #0096ff 75%, #00d4ff 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {children}
    </h1>
  );
};

export default HeroGradientText;
