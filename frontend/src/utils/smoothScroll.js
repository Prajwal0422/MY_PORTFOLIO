import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export const smoothScrollTo = (target, duration = 1) => {
  gsap.to(window, {
    duration: duration,
    scrollTo: {
      y: target,
      autoKill: true,
    },
    ease: 'power2.inOut',
  });
};

export const smoothScrollToElement = (elementId, duration = 1, offset = 0) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const targetPosition = element.offsetTop + offset;
  smoothScrollTo(targetPosition, duration);
};

export const initSmoothScroll = () => {
  // Add smooth scroll behavior to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      smoothScrollToElement(targetId);
    });
  });
};

export const scrollToTop = (duration = 1) => {
  smoothScrollTo(0, duration);
};
