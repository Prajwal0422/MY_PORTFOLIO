import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const itemsRef = useRef([]);

  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Education', id: 'education' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Certificates', id: 'certificates' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Animate menu
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.4,
        ease: 'power2.out',
      });

      // Animate items
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.2,
          ease: 'power2.out',
        }
      );
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleItemClick = (id) => {
    setIsOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 right-4 z-50 p-3 rounded-full"
        style={{
          background: 'rgba(0, 212, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
        }}
      >
        <Menu className="w-6 h-6 text-cyan-400" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu panel */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 bottom-0 w-80 z-[101] transform translate-x-full"
        style={{
          background: 'rgba(0, 10, 20, 0.95)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(0, 212, 255, 0.3)',
        }}
      >
        <div className="p-6">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>

          {/* Menu title */}
          <h3 className="text-2xl font-heading font-bold text-cyan-400 mb-8 mt-4">
            Navigation
          </h3>

          {/* Menu items */}
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                ref={(el) => (itemsRef.current[index] = el)}
                onClick={() => handleItemClick(item.id)}
                className="w-full text-left px-6 py-4 rounded-xl text-lg text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-all"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
