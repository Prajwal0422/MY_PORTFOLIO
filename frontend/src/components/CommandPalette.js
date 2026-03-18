import { useEffect, useState } from 'react';
import { Search, Github, Mail, FileText, Code } from 'lucide-react';
import gsap from 'gsap';

const CommandPalette = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');

  const commands = [
    { icon: Code, label: 'Go to Projects', action: () => scrollTo('projects') },
    { icon: Code, label: 'View Skills', action: () => scrollTo('skills') },
    { icon: Mail, label: 'Contact Me', action: () => scrollTo('contact') },
    { icon: FileText, label: 'Download Resume', action: () => alert('Resume download') },
    { icon: Github, label: 'View GitHub', action: () => window.open('https://github.com/Prajwal0422', '_blank') },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    onClose();
  };

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        '.command-palette',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.2, ease: 'back.out(1.7)' }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-32 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      data-testid="command-palette"
    >
      <div
        className="command-palette glass rounded-2xl p-4 w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-900/50 rounded-xl">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            placeholder="Type a command..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white"
            autoFocus
          />
        </div>

        <div className="space-y-2">
          {filteredCommands.map((cmd, index) => (
            <button
              key={index}
              onClick={cmd.action}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-cyan-900/30 transition-colors text-left"
            >
              <cmd.icon className="w-5 h-5 text-cyan-400" />
              <span className="text-white">{cmd.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
