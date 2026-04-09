import React from 'react';
import ProfessionalBadge from './ProfessionalBadge';

const ProfessionalSectionHeader = ({ 
  badge, 
  title, 
  subtitle, 
  badgeColor = 'cyan',
  badgeIcon 
}) => {
  return (
    <div className="text-center mb-20">
      <div className="inline-block mb-4">
        <ProfessionalBadge text={badge} color={badgeColor} icon={badgeIcon} />
      </div>
      <h2 className="text-5xl md:text-6xl font-heading font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default ProfessionalSectionHeader;
