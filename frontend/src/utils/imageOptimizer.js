/**
 * Image optimization utilities
 */

export const getOptimizedImageUrl = (url, width, quality = 80) => {
  if (!url) return '';
  
  // For external images, return as-is
  if (url.startsWith('http')) return url;
  
  // For local images, add optimization params
  return `${url}?w=${width}&q=${quality}`;
};

export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const lazyLoadImage = (element, src) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        element.src = src;
        observer.unobserve(element);
      }
    });
  });
  
  observer.observe(element);
};
