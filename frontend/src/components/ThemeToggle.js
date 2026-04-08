import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import gsap from 'gsap';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('light', savedTheme === 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');

    // Animate toggle
    gsap.to('.theme-icon', {
      rotate: 360,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-24 right-8 z-50 p-3 rounded-full transition-all hover:scale-110"
      style={{
        background: 'rgba(0, 212, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
      }}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="theme-icon w-5 h-5 text-cyan-400" />
      ) : (
        <Moon className="theme-icon w-5 h-5 text-cyan-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
