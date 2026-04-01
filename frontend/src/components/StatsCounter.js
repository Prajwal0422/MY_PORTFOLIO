import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StatsCounter = ({ stats }) => {
  const containerRef = useRef(null);
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const counters = stats.map((stat, index) => ({ value: 0 }));

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 70%',
      onEnter: () => {
        stats.forEach((stat, index) => {
          gsap.to(counters[index], {
            value: stat.value,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function() {
              setCounts(prev => {
                const newCounts = [...prev];
                newCounts[index] = Math.floor(counters[index].value);
                return newCounts;
              });
            },
          });
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [stats]);

  return (
    <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative p-6 rounded-2xl text-center group"
          style={{
            background: 'rgba(0, 20, 40, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
          }}
        >
          {/* Hover glow */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.2) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />

          <div className="relative z-10">
            <div className="text-4xl font-bold text-cyan-400 mb-2">
              {counts[index]}{stat.suffix || ''}
            </div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCounter;
