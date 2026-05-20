import React from 'react';

const SkillCard = ({ name, level, icon }) => {
  return (
    <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700 hover:border-cyan-400/50 transition-all hover:scale-105">
      <div className="flex items-center gap-4">
        {icon && <span className="text-3xl">{icon}</span>}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000"
              style={{ width: `${level}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 mt-1">{level}%</span>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
