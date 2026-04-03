import gsap from 'gsap';

// Reusable animation presets
export const fadeIn = (element, duration = 0.8, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration,
      delay,
      ease: 'power2.out',
    }
  );
};

export const slideUp = (element, duration = 0.8, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power2.out',
    }
  );
};

export const scaleIn = (element, duration = 0.8, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: 'back.out(1.7)',
    }
  );
};

export const rotateIn = (element, duration = 0.8, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, rotateY: 90 },
    {
      opacity: 1,
      rotateY: 0,
      duration,
      delay,
      ease: 'power2.out',
    }
  );
};

export const staggerFadeIn = (elements, staggerAmount = 0.1) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: staggerAmount,
      ease: 'power2.out',
    }
  );
};

export const pulseGlow = (element, color = 'rgba(0, 212, 255, 0.6)') => {
  return gsap.to(element, {
    boxShadow: `0 0 30px ${color}`,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

export const floatAnimation = (element, distance = 10, duration = 2) => {
  return gsap.to(element, {
    y: -distance,
    duration,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

export const shimmerEffect = (element, duration = 2) => {
  return gsap.to(element, {
    backgroundPosition: '200% center',
    duration,
    repeat: -1,
    ease: 'none',
  });
};

export const magneticEffect = (element, strength = 0.3) => {
  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};
