import { useState } from 'react';
import { Sparkles, Briefcase } from 'lucide-react';

const ModeToggle = ({ mode, onModeChange }) => {
  return (
    <div
      className="fixed top-6 right-6 z-50 glass rounded-full p-1 flex items-center gap-2"
      data-testid="mode-toggle"
    >
      <button
        onClick={() => onModeChange('cinematic')}
        className={`p-3 rounded-full transition-all ${
          mode === 'cinematic'
            ? 'bg-cyan-500 text-white'
            : 'text-gray-400 hover:text-cyan-400'
        }`}
        title="Cinematic Mode"
      >
        <Sparkles className="w-5 h-5" />
      </button>
      <button
        onClick={() => onModeChange('professional')}
        className={`p-3 rounded-full transition-all ${
          mode === 'professional'
            ? 'bg-cyan-500 text-white'
            : 'text-gray-400 hover:text-cyan-400'
        }`}
        title="Professional Mode"
      >
        <Briefcase className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ModeToggle;
