// Performance optimization utilities

// Debounce function for resize events
export const debounce = (func, wait = 250) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll events
export const throttle = (func, limit = 100) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Lazy load observer
export const createLazyObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
      }
    });
  }, { ...defaultOptions, ...options });
};

// Video performance optimization
export class VideoOptimizer {
  constructor(videoElement) {
    this.video = videoElement;
    this.init();
  }

  init() {
    if (!this.video) return;

    // Pause video when tab is inactive
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.video.pause();
      } else {
        this.video.play().catch(() => {});
      }
    });

    // Reduce quality on mobile
    if (window.innerWidth < 768) {
      this.video.style.opacity = '0.2';
    }
  }

  destroy() {
    if (this.video) {
      this.video.pause();
    }
  }
}

// Add will-change optimization
export const optimizeElement = (element, properties = ['transform', 'opacity']) => {
  if (!element) return;
  
  element.style.willChange = properties.join(', ');
  
  // Remove will-change after animation completes
  setTimeout(() => {
    element.style.willChange = 'auto';
  }, 1000);
};

// Reduce motion for accessibility
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Development mode logging
export const devLog = (...args) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('[DEV]', ...args);
  }
};

// Performance monitoring
export class PerformanceMonitor {
  constructor() {
    this.marks = new Map();
  }

  start(label) {
    this.marks.set(label, performance.now());
    devLog(`⏱️ Started: ${label}`);
  }

  end(label) {
    const startTime = this.marks.get(label);
    if (startTime) {
      const duration = performance.now() - startTime;
      devLog(`✅ ${label}: ${duration.toFixed(2)}ms`);
      this.marks.delete(label);
      return duration;
    }
    return null;
  }
}

export default {
  debounce,
  throttle,
  createLazyObserver,
  VideoOptimizer,
  optimizeElement,
  prefersReducedMotion,
  devLog,
  PerformanceMonitor,
};
