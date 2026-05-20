import React from 'react';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

const QuickLinks = () => {
  const links = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/Prajwal0422', color: 'hover:text-gray-400' },
    { icon: Linkedin, label: 'LinkedIn', url: '#', color: 'hover:text-blue-400' },
    { icon: Mail, label: 'Email', url: 'mailto:prajwal@example.com', color: 'hover:text-cyan-400' },
    { icon: FileText, label: 'Resume', url: '#', color: 'hover:text-green-400' },
  ];

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-700 ${link.color} transition-all hover:scale-110`}
          title={link.label}
        >
          <link.icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
};

export default QuickLinks;
