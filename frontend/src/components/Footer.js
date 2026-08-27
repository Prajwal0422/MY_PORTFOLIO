import { Github, Linkedin, Mail } from 'lucide-react';
import { socialLinks, personal } from '../data/portfolioData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative mt-16 px-6 md:px-12 py-12"
      style={{
        borderTop: '1px solid rgba(0, 212, 255, 0.08)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="max-w-sm">
            <h3 className="text-sm font-heading font-semibold text-white tracking-widest mb-2">
              PRAJWAL Y JAIN
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Artificial Intelligence &bull; Data &bull; Intelligent Systems
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, url: socialLinks.github, label: 'GitHub' },
              { icon: Linkedin, url: socialLinks.linkedin, label: 'LinkedIn' },
              { icon: Mail, url: socialLinks.email, label: 'Email' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg transition-all hover:bg-white/5"
                style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                aria-label={link.label}
              >
                <link.icon className="w-4 h-4 text-gray-500 hover:text-cyan-400 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 flex items-center justify-between"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <p className="text-[11px] text-gray-600">
            &copy; {currentYear} {personal.name}. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[11px] text-gray-600 hover:text-cyan-400 transition-colors font-mono tracking-wider uppercase"
          >
            Back to Top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
