import React from 'react';

const ProfessionalCard = ({ 
  children, 
  className = '', 
  hover = true,
  gradient = true 
}) => {
  const baseStyles = `
    rounded-3xl p-8 backdrop-blur-20 border transition-all duration-300
    ${hover ? 'hover:scale-105 hover:shadow-2xl' : ''}
    ${className}
  `;

  const backgroundStyle = gradient
    ? {
        background: 'linear-gradient(135deg, rgba(0, 20, 40, 0.8) 0%, rgba(0, 30, 60, 0.6) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }
    : {
        background: 'rgba(0, 20, 40, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 212, 255, 0.2)',
      };

  return (
    <div className={baseStyles} style={backgroundStyle}>
      {children}
    </div>
  );
};

export default ProfessionalCard;
