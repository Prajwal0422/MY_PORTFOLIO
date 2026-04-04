import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronRight, Home } from 'lucide-react';

const BreadcrumbNav = ({ items = [] }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const breadcrumbs = containerRef.current.querySelectorAll('.breadcrumb-item');
    
    gsap.fromTo(
      breadcrumbs,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
      }
    );
  }, [items]);

  return (
    <nav
      ref={containerRef}
      className="flex items-center gap-2 text-sm"
      aria-label="Breadcrumb"
    >
      <a
        href="#home"
        className="breadcrumb-item flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </a>
      
      {items.map((item, index) => (
        <div key={index} className="breadcrumb-item flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-gray-600" />
          {item.href ? (
            <a
              href={item.href}
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-cyan-400">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default BreadcrumbNav;
