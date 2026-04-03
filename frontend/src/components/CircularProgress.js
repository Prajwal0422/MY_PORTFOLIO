import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CircularProgress = ({ percentage, label, size = 120, strokeWidth = 8 }) => {
  const circleRef = useRef(null);
  const textRef = useRef(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const circle = circleRef.current;
    const text = textRef.current;

    // Initial state
    gsap.set(circle, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
    });

    // Animate on scroll
    ScrollTrigger.create({
      trigger: circle,
      start: 'top 80%',
      onEnter: () => {
        // Animate circle
        gsap.to(circle, {
          strokeDashoffset: circumference - (percentage / 100) * circumference,
          duration: 1.5,
          ease: 'power2.out',
        });

        // Animate number
        gsap.to({ value: 0 }, {
          value: percentage,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: function() {
            text.textContent = Math.floor(this.targets()[0].value) + '%';
          },
        });
      },
    });
  }, [percentage, circumference]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#0096ff" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div ref={textRef} className="text-2xl font-bold text-cyan-400">
          0%
        </div>
        {label && (
          <div className="text-xs text-gray-400 mt-1">{label}</div>
        )}
      </div>
    </div>
  );
};

export default CircularProgress;
