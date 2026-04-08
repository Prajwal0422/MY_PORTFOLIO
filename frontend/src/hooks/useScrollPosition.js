import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll position
 * @returns {Object} { x, y, direction }
 */
const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
    direction: 'down',
  });

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      
      setScrollPosition({
        x: window.pageXOffset,
        y: currentScrollY,
        direction: currentScrollY > lastScrollY ? 'down' : 'up',
      });

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};

export default useScrollPosition;
