import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const WaveAnimation = ({ className = '' }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const paths = svgRef.current.querySelectorAll('path');

    paths.forEach((path, index) => {
      gsap.to(path, {
        attr: {
          d: index === 0 
            ? 'M0,60 Q300,80 600,60 T1200,60'
            : 'M0,70 Q300,50 600,70 T1200,70'
        },
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.5,
      });
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`w-full ${className}`}
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,60 Q300,40 600,60 T1200,60"
        fill="none"
        stroke="rgba(0, 212, 255, 0.3)"
        strokeWidth="2"
      />
      <path
        d="M0,70 Q300,90 600,70 T1200,70"
        fill="none"
        stroke="rgba(0, 150, 255, 0.2)"
        strokeWidth="2"
      />
    </svg>
  );
};

export default WaveAnimation;
