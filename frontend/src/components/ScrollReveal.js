import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({ children, direction = 'up', delay = 0, className = '' }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    
    const animations = {
      up: { y: 100, opacity: 0 },
      down: { y: -100, opacity: 0 },
      left: { x: -100, opacity: 0 },
      right: { x: 100, opacity: 0 },
      fade: { opacity: 0 },
      scale: { scale: 0.8, opacity: 0 },
      rotate: { rotateY: 90, opacity: 0 },
    };

    gsap.fromTo(
      element,
      animations[direction],
      {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 0.8,
        delay: delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [direction, delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
