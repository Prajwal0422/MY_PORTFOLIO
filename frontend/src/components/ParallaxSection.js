import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxSection = ({ children, speed = 0.5, className = '' }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    gsap.to(section, {
      y: () => -window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [speed]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};

export default ParallaxSection;
