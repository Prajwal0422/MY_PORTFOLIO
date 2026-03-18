import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';
import LiveIntelligencePanel from './LiveIntelligencePanel';
import CommandPalette from './CommandPalette';
import ModeToggle from './ModeToggle';
import ProjectStoryMode from './ProjectStoryMode';

gsap.registerPlugin(ScrollTrigger);

const Act3Portfolio = ({ isMobile }) => {
  const containerRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [mode, setMode] = useState('cinematic');

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power2.inOut' }
    );

    fetchGitHubProjects();

    // Command palette shortcut
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchGitHubProjects = async () => {
    try {
      const response = await axios.get('https://api.github.com/users/Prajwal0422/repos', {
        params: { sort: 'updated', per_page: 12 },
      });
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching GitHub projects:', error);
      setLoading(false);
    }
  };

  const cinematicBg = mode === 'cinematic' 
    ? 'bg-gradient-to-b from-black via-gray-900 to-black'
    : 'bg-gradient-to-b from-gray-900 to-black';

  return (
    <div
      ref={containerRef}
      className={`act-container relative w-full min-h-screen`}
      data-testid="act3-portfolio-container"
    >
      {/* Storm Background Video - Continuous Loop */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.3 }}
      >
        <source src="/assets/storm.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 z-0" />

      {/* Content wrapper */}
      <div className="relative z-10">
      {/* Mode Toggle */}
      <ModeToggle mode={mode} onModeChange={setMode} />

      {/* Command Palette */}
      <CommandPalette 
        isOpen={showCommandPalette} 
        onClose={() => setShowCommandPalette(false)} 
      />

      {/* Logo */}
      <div className="fixed top-6 left-6 z-50">
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="w-12 h-12 md:w-16 md:h-16 object-contain cursor-pointer"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.6))',
            animation: mode === 'cinematic' ? 'shine 4s ease-in-out infinite' : 'none',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
      </div>

      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center px-4 md:px-12"
        data-testid="hero-section"
      >
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black glow-blue leading-tight">
              Artificial Intelligence &<br />Intelligent Systems
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-body">
              Engineering Intelligence. Creating Impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-full font-semibold transition-all shadow-lg hover:shadow-cyan-500/50"
              >
                View Projects
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 glass hover:bg-cyan-900/30 rounded-full font-semibold transition-all"
              >
                Contact Me
              </button>
            </div>
          </div>
          <div>
            <LiveIntelligencePanel />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className="relative min-h-screen flex items-center justify-center px-4 md:px-12 py-24"
        data-testid="about-section"
      >
        <div className="max-w-4xl glass rounded-3xl p-8 md:p-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 glow-blue">
            About Me
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed">
            <p>
              Passionate AI student exploring the frontiers of Artificial Intelligence and Intelligent Systems.
            </p>
            <p>
              Focused on building real-world solutions that leverage cutting-edge machine learning,
              neural networks, and data-driven technologies.
            </p>
            <p>
              Vision: To become a tech leader driving innovation at the intersection of AI and practical impact.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {['Python', 'Machine Learning', 'Data Science', 'AI Systems'].map((skill) => (
              <div key={skill} className="p-4 bg-cyan-900/20 rounded-xl text-center border border-cyan-500/30">
                <p className="font-semibold text-cyan-400">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className="relative min-h-screen px-4 md:px-12 py-24"
        data-testid="projects-section"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-16 text-center glow-blue">
            Projects
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-400 border-t-transparent" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="glass rounded-2xl p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30"
                  data-testid={`project-${project.name}`}
                >
                  <h3 className="text-xl font-heading font-bold text-cyan-400 mb-3">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-3 mb-4">
                    {project.description || 'No description available'}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    {project.language && (
                      <span className="px-2 py-1 bg-cyan-900/30 rounded-full border border-cyan-500/30">
                        {project.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                      {project.stargazers_count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Skills Constellation */}
      <section 
        id="skills" 
        className="relative min-h-screen px-4 md:px-12 py-24"
        data-testid="skills-section"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-16 text-center glow-blue">
            Skills Constellation
          </h2>
          <div className="glass rounded-3xl p-12 min-h-[500px] flex items-center justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {['Python', 'Machine Learning', 'Deep Learning', 'Data Analysis', 'Web Dev', 'AI Systems', 'APIs', 'Databases'].map((skill) => (
                <div
                  key={skill}
                  className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl hover:scale-110 transition-transform cursor-pointer"
                  style={{
                    boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)',
                  }}
                >
                  <span className="text-sm md:text-base font-semibold text-center">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Timeline */}
      <section 
        id="vision" 
        className="relative min-h-screen px-4 md:px-12 py-24"
        data-testid="vision-section"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-16 text-center glow-blue">
            Vision Timeline
          </h2>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-600 via-cyan-400 to-cyan-600" />
            <div className="space-y-16">
              {[
                { title: 'Past', subtitle: 'Student', desc: 'Built foundational knowledge in CS and AI', year: '2020-2023' },
                { title: 'Present', subtitle: 'AI Engineer', desc: 'Creating intelligent systems and solutions', year: '2024-2026' },
                { title: 'Future', subtitle: 'Tech Founder', desc: 'Leading innovation in AI-driven products', year: '2027+' },
              ].map((phase, index) => (
                <div key={index} className="relative flex items-center">
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-lg" style={{
                    boxShadow: '0 0 20px rgba(0, 212, 255, 0.8)',
                    transform: 'translate(-50%, 0)',
                  }} />
                  <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16 md:ml-auto'} md:w-1/2`}>
                    <div className="glass rounded-2xl p-6">
                      <div className="text-sm text-cyan-400 font-semibold mb-2">{phase.year}</div>
                      <h3 className="text-2xl font-heading font-bold mb-2">
                        {phase.title}: {phase.subtitle}
                      </h3>
                      <p className="text-gray-400">{phase.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section 
        id="certificates" 
        className="relative min-h-screen px-4 md:px-12 py-24"
        data-testid="certificates-section"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-16 text-center glow-blue">
            Certificates
          </h2>
          <div className="glass rounded-3xl p-12 text-center">
            <p className="text-xl text-gray-400 mb-4">Certificate gallery - Ready for upload</p>
            <p className="text-sm text-gray-500">Masonry layout prepared for your certificates</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section 
        id="contact" 
        className="relative min-h-screen px-4 md:px-12 py-24 flex items-center justify-center"
        data-testid="contact-section"
      >
        <div className="max-w-4xl w-full">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-16 text-center glow-blue">
            Let's Connect
          </h2>
          <div className="glass rounded-3xl p-12">
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { icon: Github, name: 'GitHub', url: 'https://github.com/Prajwal0422' },
                { icon: Linkedin, name: 'LinkedIn', url: '#' },
                { icon: Instagram, name: 'Instagram', url: '#' },
                { icon: Mail, name: 'Email', url: 'mailto:your-email@example.com' },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-gray-900/50 hover:bg-gray-900 transition-all hover:scale-110"
                >
                  <link.icon className="w-12 h-12 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-sm font-semibold">{link.name}</span>
                </a>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-gray-400">Open to opportunities and collaborations</p>
              <p className="text-sm text-gray-600 mt-4">Press <kbd className="px-2 py-1 bg-gray-800 rounded">Ctrl+K</kbd> for quick navigation</p>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Project Story Mode Modal */}
      <ProjectStoryMode 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      <style>{`
        @keyframes shine {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.6)); }
          50% { filter: drop-shadow(0 0 20px rgba(0, 255, 255, 1)); }
        }
      `}</style>
    </div>
  );
};

export default Act3Portfolio;
