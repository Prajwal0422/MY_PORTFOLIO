import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = 'Search...', className = '' }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      gsap.to(containerRef.current, {
        scale: 1.02,
        boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)',
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(containerRef.current, {
        scale: 1,
        boxShadow: '0 0 0px rgba(0, 212, 255, 0)',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isFocused]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
    inputRef.current?.focus();
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center gap-3 px-4 py-3 rounded-full transition-all ${className}`}
      style={{
        background: 'rgba(0, 20, 40, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
      }}
    >
      <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />
      
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
      />

      {query && (
        <button
          onClick={handleClear}
          className="p-1 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
