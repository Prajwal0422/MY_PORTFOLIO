import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const SkillConstellation = () => {
  const canvasRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skills = [
    { name: 'Python', x: 150, y: 100, level: 'Working Knowledge', barWidth: 75 },
    { name: 'Machine Learning', x: 350, y: 80, level: 'Academic', barWidth: 60 },
    { name: 'NLP', x: 550, y: 120, level: 'Academic', barWidth: 60 },
    { name: 'Data Handling', x: 250, y: 250, level: 'Working Knowledge', barWidth: 70 },
    { name: 'ClinicalBERT', x: 450, y: 230, level: 'Academic', barWidth: 55 },
    { name: 'EfficientNet-B4', x: 150, y: 350, level: 'Academic', barWidth: 55 },
    { name: 'Pandas & NumPy', x: 350, y: 380, level: 'Working Knowledge', barWidth: 70 },
    { name: 'Git & GitHub', x: 550, y: 340, level: 'Working Knowledge', barWidth: 65 },
  ];

  const connections = [
    [0, 1], [1, 2], [0, 3], [1, 4], [2, 4],
    [3, 4], [3, 5], [4, 6], [4, 7], [5, 6], [6, 7]
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    let animationProgress = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      connections.forEach(([start, end]) => {
        const startSkill = skills[start];
        const endSkill = skills[end];

        ctx.beginPath();
        ctx.moveTo(startSkill.x, startSkill.y);
        ctx.lineTo(endSkill.x, endSkill.y);
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.3 * Math.min(animationProgress, 1)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw nodes
      skills.forEach((skill, index) => {
        const delay = index * 0.1;
        const nodeProgress = Math.max(0, Math.min(1, (animationProgress - delay) * 2));

        // Outer glow
        const gradient = ctx.createRadialGradient(skill.x, skill.y, 0, skill.x, skill.y, 20);
        gradient.addColorStop(0, `rgba(0, 212, 255, ${0.6 * nodeProgress})`);
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(skill.x, skill.y, 20, 0, Math.PI * 2);
        ctx.fill();

        // Node circle
        ctx.fillStyle = `rgba(0, 212, 255, ${nodeProgress})`;
        ctx.beginPath();
        ctx.arc(skill.x, skill.y, 8 * nodeProgress, 0, Math.PI * 2);
        ctx.fill();

        // Pulse effect
        const pulseSize = 8 + Math.sin(Date.now() / 1000 + index) * 2;
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.5 * nodeProgress})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(skill.x, skill.y, pulseSize, 0, Math.PI * 2);
        ctx.stroke();
      });

      if (animationProgress < 1.5) {
        animationProgress += 0.01;
        requestAnimationFrame(animate);
      } else {
        // Continue pulse animation
        requestAnimationFrame(animate);
      }
    };

    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-[500px]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {skills.map((skill, index) => (
        <div
          key={index}
          className="absolute cursor-pointer group"
          style={{
            left: skill.x - 40,
            top: skill.y - 40,
            width: 80,
            height: 80,
          }}
          onMouseEnter={() => setHoveredSkill(skill)}
          onMouseLeave={() => setHoveredSkill(null)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-center text-cyan-300 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              {skill.name}
            </span>
          </div>
          
          {hoveredSkill?.name === skill.name && (
            <div 
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 glass rounded-lg p-3 whitespace-nowrap z-50"
              style={{
                background: 'rgba(0, 20, 40, 0.95)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="text-cyan-400 text-sm font-semibold mb-1">{skill.name}</div>
              <div className="text-gray-300 text-xs mb-1">{skill.level}</div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    style={{ width: `${skill.barWidth}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SkillConstellation;
