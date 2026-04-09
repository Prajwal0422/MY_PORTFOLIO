import React from 'react';

const ProfessionalBadge = ({ text, icon, color = 'cyan' }) => {
  const colorClasses = {
    cyan: 'from-cyan-500/20 to-cyan-600/10 border-cyan-400/30 text-cyan-400',
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-400/30 text-blue-400',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-400/30 text-purple-400',
    green: 'from-green-500/20 to-green-600/10 border-green-400/30 text-green-400',
  };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${colorClasses[color]} border backdrop-blur-sm`}>
      {icon && <span className="text-lg">{icon}</span>}
      <span className="text-sm font-semibold">{text}</span>
    </div>
  );
};

export default ProfessionalBadge;
