// Application Constants

// GitHub Configuration
export const GITHUB_USERNAME = 'Prajwal0422';
export const GITHUB_API_BASE = 'https://api.github.com';

// Animation Durations (in seconds)
export const ANIMATION_DURATION = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 1.0,
  VERY_SLOW: 2.0,
};

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  XS: 0,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// Colors
export const COLORS = {
  PRIMARY: '#00d4ff',
  SECONDARY: '#0096ff',
  ACCENT: '#00ffff',
  SUCCESS: '#00ff64',
  ERROR: '#ff3232',
  WARNING: '#ffc800',
};

// Social Links
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/Prajwal0422',
  LINKEDIN: '#',
  TWITTER: '#',
  INSTAGRAM: '#',
  EMAIL: 'mailto:your-email@example.com',
};

// Performance Settings
export const PERFORMANCE = {
  DEBOUNCE_DELAY: 250,
  THROTTLE_DELAY: 100,
  LAZY_LOAD_THRESHOLD: 0.1,
  SCROLL_TRIGGER_START: 'top 80%',
};

// Feature Flags
export const FEATURES = {
  ENABLE_PRELOADER: true,
  ENABLE_CINEMATIC_MODE: true,
  ENABLE_ANIMATIONS: true,
  ENABLE_PARTICLES: true,
  ENABLE_LIGHTNING: true,
  ENABLE_CURSOR: true,
};

// API Endpoints
export const API_ENDPOINTS = {
  GITHUB_USER: (username) => `${GITHUB_API_BASE}/users/${username}`,
  GITHUB_REPOS: (username) => `${GITHUB_API_BASE}/users/${username}/repos`,
  GITHUB_EVENTS: (username) => `${GITHUB_API_BASE}/users/${username}/events/public`,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'portfolio_theme',
  PERFORMANCE_MODE: 'portfolio_performance_mode',
  VISITED: 'portfolio_visited',
};

// Section IDs
export const SECTIONS = {
  HOME: 'home',
  ABOUT: 'about',
  EDUCATION: 'education',
  PROJECTS: 'projects',
  SKILLS: 'skills',
  EXPERIENCE: 'experience',
  CERTIFICATES: 'certificates',
  CONTACT: 'contact',
};
