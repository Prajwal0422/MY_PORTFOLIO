import { useEffect, useRef } from 'react';

const CinematicCursorComponent = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Hover handlers for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const interactiveSelector = 'a, button, [role="button"], .project-card, .skill-card, input, textarea';
      
      if (target.matches(interactiveSelector) || target.closest(interactiveSelector)) {
        if (outerRef.current) {
          outerRef.current.style.width = '60px';
          outerRef.current.style.height = '60px';
          outerRef.current.style.borderColor = 'rgba(0, 212, 255, 0.9)';
          outerRef.current.style.borderWidth = '3px';
        }
        if (innerRef.current) {
          innerRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      const interactiveSelector = 'a, button, [role="button"], .project-card, .skill-card, input, textarea';
      
      if (target.matches(interactiveSelector) || target.closest(interactiveSelector)) {
        if (outerRef.current) {
          outerRef.current.style.width = '40px';
          outerRef.current.style.height = '40px';
          outerRef.current.style.borderColor = 'rgba(0, 212, 255, 0.5)';
          outerRef.current.style.borderWidth = '2px';
        }
        if (innerRef.current) {
          innerRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        }
      }
    };

    // Click effect
    const handleMouseDown = () => {
      if (outerRef.current) {
        outerRef.current.style.width = '35px';
        outerRef.current.style.height = '35px';
      }
    };

    const handleMouseUp = () => {
      if (outerRef.current) {
        outerRef.current.style.width = '40px';
        outerRef.current.style.height = '40px';
      }
    };

    // Smooth lerp animation
    const lerp = (start, end, factor) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      // Smooth lag effect
      cursorPosRef.current.x = lerp(cursorPosRef.current.x, mouseRef.current.x, 0.15);
      cursorPosRef.current.y = lerp(cursorPosRef.current.y, mouseRef.current.y, 0.15);

      // Update outer ring (slower)
      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${cursorPosRef.current.x}px, ${cursorPosRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Update inner dot (faster)
      const innerX = lerp(cursorPosRef.current.x, mouseRef.current.x, 0.3);
      const innerY = lerp(cursorPosRef.current.y, mouseRef.current.y, 0.3);
      
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${innerX}px, ${innerY}px, 0) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Bind events
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Start animation
    animate();

    // Cleanup
    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={outerRef}
        className="cursor-outer"
        style={{
          position: 'fixed',
          width: '40px',
          height: '40px',
          border: '2px solid rgba(0, 212, 255, 0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, border-width 0.3s ease',
          willChange: 'transform',
          left: 0,
          top: 0,
        }}
      />
      <div
        ref={innerRef}
        className="cursor-inner"
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          background: 'rgba(0, 212, 255, 0.9)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10001,
          boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)',
          willChange: 'transform',
          transition: 'transform 0.2s ease',
          left: 0,
          top: 0,
        }}
      />
    </>
  );
};

export default CinematicCursorComponent;
