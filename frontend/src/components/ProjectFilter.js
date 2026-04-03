import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const ProjectFilter = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const indicatorRef = useRef(null);
  const buttonsRef = useRef([]);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'web', label: 'Web Dev' },
    { id: 'nlp', label: 'NLP' },
    { id: 'featured', label: 'Featured' },
  ];

  useEffect(() => {
    const activeButton = buttonsRef.current.find(
      btn => btn?.getAttribute('data-filter') === activeFilter
    );

    if (activeButton && indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        width: activeButton.offsetWidth,
        x: activeButton.offsetLeft,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [activeFilter]);

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    if (onFilterChange) {
      onFilterChange(filterId);
    }
  };

  return (
    <div className="relative mb-12">
      <div
        className="flex flex-wrap justify-center gap-3 relative"
        style={{
          background: 'rgba(0, 20, 40, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          borderRadius: '50px',
          padding: '8px',
        }}
      >
        {/* Active indicator */}
        <div
          ref={indicatorRef}
          className="absolute h-10 rounded-full transition-all"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.3) 0%, rgba(0, 150, 255, 0.3) 100%)',
            border: '1px solid rgba(0, 212, 255, 0.5)',
            top: '8px',
            left: '8px',
          }}
        />

        {filters.map((filter, index) => (
          <button
            key={filter.id}
            ref={el => (buttonsRef.current[index] = el)}
            data-filter={filter.id}
            onClick={() => handleFilterClick(filter.id)}
            className={`relative z-10 px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeFilter === filter.id ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-300'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectFilter;
