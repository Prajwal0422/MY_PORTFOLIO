/**
 * Professional Theme Configuration
 * Centralized theme settings for consistent professional design
 */

export const professionalColors = {
  primary: {
    cyan: '#00d4ff',
    blue: '#0066ff',
    purple: '#9933ff',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #00d4ff 0%, #0066ff 50%, #9933ff 100%)',
    card: 'linear-gradient(135deg, rgba(0, 20, 40, 0.8) 0%, rgba(0, 30, 60, 0.6) 100%)',
    text: 'linear-gradient(90deg, #00d4ff 0%, #0066ff 50%, #9933ff 100%)',
    button: 'linear-gradient(135deg, #00d4ff 0%, #0066ff 100%)',
  },
  glass: {
    light: 'rgba(0, 20, 40, 0.6)',
    medium: 'rgba(0, 20, 40, 0.8)',
    dark: 'rgba(0, 10, 20, 0.9)',
  },
};

export const professionalSpacing = {
  section: {
    mobile: '3rem 1rem',
    desktop: '5rem 3rem',
  },
  card: {
    padding: '2rem',
    gap: '1.5rem',
  },
};

export const professionalAnimations = {
  duration: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
  },
  easing: {
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

export const professionalShadows = {
  card: '0 8px 32px rgba(0, 0, 0, 0.3)',
  cardHover: '0 20px 60px rgba(0, 212, 255, 0.3)',
  glow: '0 0 20px rgba(0, 212, 255, 0.5)',
  glowStrong: '0 0 40px rgba(0, 212, 255, 0.8)',
};

export const professionalBorders = {
  light: '1px solid rgba(0, 212, 255, 0.2)',
  medium: '1px solid rgba(0, 212, 255, 0.3)',
  strong: '1px solid rgba(0, 212, 255, 0.5)',
};

export const professionalTypography = {
  heading: {
    fontFamily: 'var(--font-heading)',
    fontWeight: '900',
  },
  body: {
    fontFamily: 'var(--font-body)',
    fontWeight: '400',
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
};

export const getGlassStyle = (opacity = 'medium') => ({
  background: professionalColors.glass[opacity],
  backdropFilter: 'blur(20px)',
  border: professionalBorders.medium,
  boxShadow: professionalShadows.card,
});

export const getGradientText = () => ({
  background: professionalColors.gradients.text,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

export const getHoverEffect = () => ({
  transition: `all ${professionalAnimations.duration.normal} ${professionalAnimations.easing.smooth}`,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: professionalShadows.cardHover,
  },
});
