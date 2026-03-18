import { useEffect, useState } from 'react';

const LiveTerminal = () => {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);

  const terminalLines = [
    { text: '> Booting Prajwal.ai', delay: 0 },
    { text: '> Loading Neural Modules...', delay: 800 },
    { text: '> Initializing AI Systems...', delay: 1600 },
    { text: '> Projects Synced ✔', delay: 2400 },
    { text: '> Intelligence Ready.', delay: 3200 },
    { text: '> System Status: ONLINE', delay: 4000 },
  ];

  useEffect(() => {
    terminalLines.forEach((line, index) => {
      setTimeout(() => {
        setLines(prev => [...prev, line.text]);
        setCurrentLine(index);
      }, line.delay);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div 
      className="glass rounded-2xl p-6 font-mono text-sm border border-cyan-500/30"
      style={{
        background: 'rgba(0, 20, 40, 0.6)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 0 30px rgba(0, 212, 255, 0.2)',
      }}
    >
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyan-500/30">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-cyan-400 text-xs">prajwal@ai-terminal</span>
      </div>
      
      <div className="space-y-2 min-h-[180px]">
        {lines.map((line, index) => (
          <div 
            key={index}
            className="text-cyan-300 animate-fadeIn"
            style={{
              animation: 'fadeIn 0.3s ease-in',
            }}
          >
            {line}
            {index === currentLine && (
              <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse"></span>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default LiveTerminal;
