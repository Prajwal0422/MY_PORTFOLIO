import { useEffect } from 'react';
import { smoothScrollToElement } from '../utils/smoothScroll';

const ScrollToSection = () => {
  useEffect(() => {
    // Handle hash navigation on page load
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const elementId = hash.substring(1);
        smoothScrollToElement(elementId, 1.5);
      }, 500);
    }

    // Handle hash changes
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const elementId = hash.substring(1);
        smoothScrollToElement(elementId, 1);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return null;
};

export default ScrollToSection;
