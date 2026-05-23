import React from 'react';

const SkillProgress = ({ skill, level, color = 'cyan' }) => {
  const colors = {
    cyan: 'from-cyan-500 to-blue-500',
    purple: 'from-purple-500 to-pink-500',
    green: 'from-green-500 to-emerald-500',
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold text-gray-300">{skill}</span>
        <span className="text-sm text-cyan-400">{level}%</span>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${colors[color]} transition-all duration-1000`}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
};

export default SkillProgress;
