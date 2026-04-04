import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SkeletonLoader = ({ 
  variant = 'text', 
  width = '100%', 
  height = '20px',
  count = 1,
  className = '' 
}) => {
  const shimmerRef = useRef(null);

  useEffect(() => {
    if (shimmerRef.current) {
      gsap.to(shimmerRef.current, {
        x: '100%',
        duration: 1.5,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);

  const variants = {
    text: { borderRadius: '4px' },
    circle: { borderRadius: '50%', width: height },
    rect: { borderRadius: '8px' },
    card: { borderRadius: '16px', height: '200px' },
  };

  const style = {
    ...variants[variant],
    width,
    height,
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative overflow-hidden"
          style={{
            ...style,
            background: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          <div
            ref={index === 0 ? shimmerRef : null}
            className="absolute inset-0 -translate-x-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(0, 212, 255, 0.1) 50%, transparent 100%)',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
