import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Menu, X, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const FloatingActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const itemsRef = useRef([]);

  const menuItems = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/Prajwal0422' },
    { icon: Linkedin, label: 'LinkedIn', url: '#' },
    { icon: Mail, label: 'Email', url: 'mailto:your-email@example.com' },
    { icon: ArrowUp, label: 'Top', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
  ];

  useEffect(() => {
    if (isOpen) {
      gsap.to(itemsRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'back.out(1.7)',
      });
    } else {
      gsap.to(itemsRef.current, {
        scale: 0,
        opacity: 0,
        y: 20,
        duration: 0.2,
        stagger: 0.03,
      });
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <div className="relative">
        {/* Menu items */}
        <div className="absolute bottom-16 left-0 flex flex-col gap-3">
          {menuItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="opacity-0"
              style={{ transform: 'scale(0) translateY(20px)' }}
            >
              {item.action ? (
                <button
                  onClick={item.action}
                  className="group relative p-3 rounded-full transition-all hover:scale-110"
                  style={{
                    background: 'rgba(0, 212, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                  }}
                  title={item.label}
                >
                  <item.icon className="w-5 h-5 text-cyan-400" />
                  <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-gray-900 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.label}
                  </span>
                </button>
              ) : (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block p-3 rounded-full transition-all hover:scale-110"
                  style={{
                    background: 'rgba(0, 212, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                  }}
                  title={item.label}
                >
                  <item.icon className="w-5 h-5 text-cyan-400" />
                  <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-gray-900 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.label}
                  </span>
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Toggle button */}
        <button
          ref={menuRef}
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-4 rounded-full transition-all hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.9) 0%, rgba(0, 150, 255, 1) 100%)',
            boxShadow: '0 10px 40px rgba(0, 212, 255, 0.4)',
          }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default FloatingActionMenu;
