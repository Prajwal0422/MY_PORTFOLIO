import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = ({ 
  end, 
  duration = 2, 
  prefix = '', 
  suffix = '', 
  className = '' 
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    const counter = { value: 0 };

    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => {
        if (!hasAnimated.current) {
          hasAnimated.current = true;
          
          gsap.to(counter, {
            value: end,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
              setCount(Math.floor(counter.value));
            },
          });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [end, duration]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
