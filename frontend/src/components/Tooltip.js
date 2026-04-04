import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const Tooltip = ({ 
  children, 
  content, 
  position = 'top',
  delay = 200 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      gsap.fromTo(
        tooltipRef.current,
        { opacity: 0, scale: 0.9, y: position === 'top' ? 10 : -10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.2,
          ease: 'power2.out',
        }
      );
    }
  }, [isVisible, position]);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 px-3 py-2 text-sm text-white rounded-lg whitespace-nowrap pointer-events-none ${positionClasses[position]}`}
          style={{
            background: 'rgba(0, 20, 40, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          }}
        >
          {content}
          
          {/* Arrow */}
          <div
            className={`absolute w-2 h-2 rotate-45 ${
              position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' :
              position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' :
              position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' :
              'left-[-4px] top-1/2 -translate-y-1/2'
            }`}
            style={{
              background: 'rgba(0, 20, 40, 0.95)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
