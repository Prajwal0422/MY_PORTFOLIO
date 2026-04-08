import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for Intersection Observer
 * @param {Object} options - Intersection Observer options
 * @returns {Array} [ref, isIntersecting]
 */
const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '0px',
      ...options,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [elementRef, isIntersecting];
};

export default useIntersectionObserver;
