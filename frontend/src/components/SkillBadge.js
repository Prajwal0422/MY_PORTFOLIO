import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const SkillBadge = ({ skill, index }) => {
  const badgeRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      badgeRef.current,
      { 
        opacity: 0, 
        scale: 0,
        rotate: -180,
      },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'back.out(1.7)',
      }
    );
  }, [index]);

  const handleMouseEnter = () => {
    gsap.to(badgeRef.current, {
      scale: 1.1,
      rotate: 5,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(badgeRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={badgeRef}
      className="inline-block px-4 py-2 rounded-full cursor-pointer"
      style={{
        background: 'rgba(0, 212, 255, 0.1)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
        boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="text-cyan-400 font-semibold text-sm">{skill}</span>
    </div>
  );
};

export default SkillBadge;
