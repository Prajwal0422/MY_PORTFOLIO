import { useRef, useState } from 'react';

const EnhancedProjectCard = ({ project, onClick }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });

    // Parallax depth effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    cardRef.current.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(10px)
    `;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative glass rounded-2xl p-6 cursor-pointer transition-all duration-300"
      style={{
        background: 'rgba(0, 20, 40, 0.4)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 212, 255, 0.2)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic border glow following cursor */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 212, 255, 0.4), transparent)`,
            opacity: 0.6,
          }}
        />
      )}

      {/* Dynamic shadow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none -z-10"
        style={{
          background: 'rgba(0, 212, 255, 0.2)',
          filter: 'blur(20px)',
          transform: isHovered ? 'translateZ(-20px)' : 'translateZ(-10px)',
          opacity: isHovered ? 1 : 0.3,
          transition: 'all 0.3s',
        }}
      />

      <div className="relative z-10">
        <h3 className="text-xl font-heading font-bold text-cyan-400 mb-3">
          {project.name}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-3 mb-4">
          {project.description || 'No description available'}
        </p>
        <div className="flex items-center gap-2 text-xs flex-wrap">
          {project.language && (
            <span className="px-3 py-1 bg-cyan-900/30 rounded-full border border-cyan-500/30 text-cyan-300">
              {project.language}
            </span>
          )}
          <span className="flex items-center gap-1 text-gray-400">
            <span className="w-2 h-2 bg-yellow-400 rounded-full" />
            {project.stargazers_count}
          </span>
          <span className="flex items-center gap-1 text-gray-400">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878z"/>
            </svg>
            {project.forks_count}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProjectCard;
