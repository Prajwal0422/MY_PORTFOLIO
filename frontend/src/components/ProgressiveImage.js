import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const ProgressiveImage = ({ 
  src, 
  placeholder, 
  alt = '', 
  className = '',
  onLoad 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder || src);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      
      // Fade in animation
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 1.05 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
        }
      );
      
      if (onLoad) onLoad();
    };
  }, [src, onLoad]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-all ${
          !isLoaded ? 'blur-sm' : ''
        }`}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-cyan-400 border-t-transparent" />
        </div>
      )}
    </div>
  );
};

export default ProgressiveImage;
