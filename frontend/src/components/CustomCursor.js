import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseEnter = (e) => {
      if (e.target.matches('a, button, [role="button"], .magnetic')) {
        setIsHovering(true);
      }
    };

    const onMouseLeave = (e) => {
      if (e.target.matches('a, button, [role="button"], .magnetic')) {
        setIsHovering(false);
      }
    };

    // Smooth cursor follow animation
    const animate = () => {
      // Dot follows immediately
      gsap.to(cursorDot, {
        x: mousePos.current.x,
        y: mousePos.current.y,
        duration: 0,
      });

      // Ring follows with delay
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.15;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.15;

      gsap.to(cursor, {
        x: cursorPos.current.x,
        y: cursorPos.current.y,
        duration: 0,
      });

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseEnter);
    document.addEventListener('mouseout', onMouseLeave);

    const animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseEnter);
      document.removeEventListener('mouseout', onMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const onClick = () => {
    // Ripple effect on click
    gsap.fromTo(
      cursorRef.current,
      { scale: 1 },
      {
        scale: 1.5,
        duration: 0.3,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
      }
    );
  };

  useEffect(() => {
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[10000] w-8 h-8 rounded-full border-2 transition-all duration-200"
        style={{
          borderColor: 'var(--color-electric-blue)',
          transform: 'translate(-50%, -50%)',
          boxShadow: isHovering
            ? '0 0 20px rgba(0, 212, 255, 0.8)'
            : '0 0 10px rgba(0, 212, 255, 0.5)',
          scale: isHovering ? 1.5 : 1,
        }}
      />
      
      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[10001] w-1.5 h-1.5 rounded-full"
        style={{
          background: 'var(--color-cyan-glow)',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(0, 255, 255, 1)',
        }}
      />
    </>
  );
};

export default CustomCursor;