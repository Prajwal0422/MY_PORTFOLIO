import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TimelineItem = ({ title, subtitle, description, year, index, isLeft }) => {
  const itemRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      itemRef.current,
      { 
        opacity: 0, 
        x: isLeft ? -50 : 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 80%',
        },
      }
    );

    // Dot pulse animation
    gsap.to(dotRef.current, {
      scale: 1.3,
      opacity: 0.6,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, [index, isLeft]);

  return (
    <div ref={itemRef} className="relative flex items-center">
      {/* Timeline dot */}
      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2">
        <div
          ref={dotRef}
          className="w-4 h-4 rounded-full"
          style={{
            background: 'rgba(0, 212, 255, 1)',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.8)',
          }}
        />
      </div>

      {/* Content */}
      <div className={`ml-16 md:ml-0 ${isLeft ? 'md:pr-16' : 'md:pl-16 md:ml-auto'} md:w-1/2`}>
        <div
          className="glass rounded-2xl p-6 hover:scale-105 transition-transform"
          style={{
            background: 'rgba(0, 20, 40, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
          }}
        >
          <div className="text-sm text-cyan-400 font-semibold mb-2">{year}</div>
          <h3 className="text-2xl font-heading font-bold mb-2 text-white">
            {title}: {subtitle}
          </h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
