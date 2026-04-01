import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedGridBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Grid properties
    const gridSize = 50;
    let offset = 0;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw vertical lines
      for (let x = -gridSize + (offset % gridSize); x < canvas.width; x += gridSize) {
        const gradient = ctx.createLinearGradient(x, 0, x, canvas.height);
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0)');
        gradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Draw horizontal lines
      for (let y = -gridSize + (offset % gridSize); y < canvas.height; y += gridSize) {
        const gradient = ctx.createLinearGradient(0, y, canvas.width, y);
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0)');
        gradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Animate grid movement
    gsap.to({ value: 0 }, {
      value: gridSize,
      duration: 3,
      repeat: -1,
      ease: 'none',
      onUpdate: function() {
        offset = this.targets()[0].value;
        drawGrid();
      }
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.3 }}
    />
  );
};

export default AnimatedGridBackground;
