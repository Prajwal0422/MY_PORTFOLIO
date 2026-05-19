import React from 'react';

const FresherBadge = () => {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 backdrop-blur-sm">
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      <span className="text-sm font-medium text-green-300">Fresh Graduate - Open to Learn</span>
    </div>
  );
};

export default FresherBadge;
