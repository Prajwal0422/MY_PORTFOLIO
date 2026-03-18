import { useState } from 'react';
import { Zap, Briefcase } from 'lucide-react';

const PerformanceModeToggle = ({ onModeChange }) => {
  const [isCinematic, setIsCinematic] = useState(true);

  const toggleMode = () => {
    const newMode = !isCinematic;
    setIsCinematic(newMode);
    onModeChange(newMode ? 'cinematic' : 'professional');
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={toggleMode}
        className="glass rounded-full px-4 py-2 flex items-center gap-2 hover:bg-cyan-900/30 transition-all"
        style={{
          background: 'rgba(0, 20, 40, 0.6)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
        }}
      >
        {isCinematic ? (
          <>
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">Cinematic</span>
          </>
        ) : (
          <>
            <Briefcase className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">Professional</span>
          </>
        )}
      </button>
    </div>
  );
};

export default PerformanceModeToggle;
