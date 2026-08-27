import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Github, Linkedin, Mail } from 'lucide-react';
import { socialLinks } from '../data/portfolioData';

const SocialLinks = ({ variant = 'horizontal', className = '' }) => {
  const containerRef = useRef(null);

  const socialItems = [
    { icon: Github, url: socialLinks.github, label: 'GitHub', color: '#00d4ff' },
    { icon: Linkedin, url: socialLinks.linkedin, label: 'LinkedIn', color: '#0077b5' },
    { icon: Mail, url: socialLinks.email, label: 'Email', color: '#00d4ff' },
  ];

  useEffect(() => {
    const links = containerRef.current.querySelectorAll('.social-link');
    
    gsap.fromTo(
      links,
      { opacity: 0, scale: 0, rotate: -180 },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex ${variant === 'vertical' ? 'flex-col' : 'flex-row'} gap-4 ${className}`}
    >
      {socialItems.map((link) => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link group relative p-4 rounded-full transition-all hover:scale-110"
          style={{
            background: 'rgba(0, 212, 255, 0.1)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
          }}
          title={link.label}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              boxShadow: `0 0 30px ${link.color}`,
              borderColor: link.color,
              duration: 0.3,
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              boxShadow: '0 0 0px transparent',
              borderColor: 'rgba(0, 212, 255, 0.3)',
              duration: 0.3,
            });
          }}
        >
          <link.icon className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors" />
          
          {/* Tooltip */}
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-gray-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {link.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
