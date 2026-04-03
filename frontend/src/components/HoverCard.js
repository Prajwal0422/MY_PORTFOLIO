import { useRef } from 'react';
import gsap from 'gsap';

const HoverCard = ({ children, className = '', intensity = 15 }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });

    // Update glow position
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: x - rect.width / 2,
        y: y - rect.height / 2,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
          filter: 'blur(30px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {children}
    </div>
  );
};

export default HoverCard;
