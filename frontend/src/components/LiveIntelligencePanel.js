import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const LiveIntelligencePanel = () => {
  const [lines, setLines] = useState([]);
  const terminalRef = useRef(null);

  useEffect(() => {
    const terminalLines = [
      '> Initializing AI Profile...',
      '> Loading Prajwal Y Jain...',
      '> Domain: Artificial Intelligence',
      '> Focus: Intelligent Systems',
      '> Skills: ML / DL / Neural Networks',
      '> Status: Building the Future',
      '> Vision: Create Intelligent Products',
      '> System Ready.',
    ];

    let currentIndex = 0;
    const typeNextLine = () => {
      if (currentIndex < terminalLines.length) {
        setLines(prev => [...prev, terminalLines[currentIndex]]);
        currentIndex++;
        setTimeout(typeNextLine, 600);
      }
    };

    setTimeout(typeNextLine, 1000);
  }, []);

  return (
    <div
      ref={terminalRef}
      className="glass rounded-2xl p-6 font-mono text-sm max-w-md"
      data-testid="intelligence-panel"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-gray-400">AI_Terminal</span>
      </div>
      <div className="space-y-2">
        {lines.map((line, index) => (
          <div key={index} className="text-cyan-400 flex items-center gap-2">
            <span>{line}</span>
            {index === lines.length - 1 && (
              <span className="w-2 h-4 bg-cyan-400 animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveIntelligencePanel;
