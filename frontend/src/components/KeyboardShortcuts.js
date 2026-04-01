import { useEffect, useState } from 'react';
import { X, Command } from 'lucide-react';
import gsap from 'gsap';

const KeyboardShortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { key: 'Ctrl+K', description: 'Open shortcuts menu' },
    { key: 'H', description: 'Go to Home' },
    { key: 'A', description: 'Go to About' },
    { key: 'P', description: 'Go to Projects' },
    { key: 'S', description: 'Go to Skills' },
    { key: 'C', description: 'Go to Contact' },
    { key: 'T', description: 'Scroll to Top' },
    { key: 'Esc', description: 'Close modal' },
  ];

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl+K to toggle shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        return;
      }

      // ESC to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        return;
      }

      // Navigation shortcuts (only when modal is closed)
      if (!isOpen && !e.ctrlKey && !e.metaKey) {
        const scrollToSection = (id) => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        };

        switch (e.key.toLowerCase()) {
          case 'h':
            scrollToSection('home');
            break;
          case 'a':
            scrollToSection('about');
            break;
          case 'p':
            scrollToSection('projects');
            break;
          case 's':
            scrollToSection('skills');
            break;
          case 'c':
            scrollToSection('contact');
            break;
          case 't':
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        '.shortcut-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out',
        }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="glass rounded-3xl p-8 max-w-2xl w-full"
        style={{
          background: 'rgba(0, 20, 40, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Command className="w-6 h-6 text-cyan-400" />
            <h3 className="text-2xl font-heading font-bold text-white">
              Keyboard Shortcuts
            </h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="shortcut-item flex items-center justify-between p-4 rounded-xl hover:bg-gray-800/50 transition-colors"
            >
              <span className="text-gray-300">{shortcut.description}</span>
              <kbd
                className="px-3 py-1 rounded-lg font-mono text-sm"
                style={{
                  background: 'rgba(0, 212, 255, 0.1)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  color: '#00d4ff',
                }}
              >
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Press <kbd className="px-2 py-1 bg-gray-800 rounded">Esc</kbd> to close
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcuts;
