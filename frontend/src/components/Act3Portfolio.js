import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import { Github, Linkedin, Instagram, Mail, Download } from 'lucide-react';
import LiveTerminal from './LiveTerminal';
import PerformanceModeToggle from './PerformanceModeToggle';
import EnhancedProjectCard from './EnhancedProjectCard';
import SkillConstellation from './SkillConstellation';
import LightningEffect from './LightningEffect';
import ProjectStoryMode from './ProjectStoryMode';
import CinematicCursorComponent from './CinematicCursorComponent';
import { VideoOptimizer, debounce } from '../utils/performance';

gsap.registerPlugin(ScrollTrigger);

const Act3Portfolio = ({ isMobile }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mode, setMode] = useState('cinematic');
  const [lightningTrigger, setLightningTrigger] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const videoOptimizerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power2.inOut' }
    );

    fetchGitHubProjects();

    // Initialize video optimizer
    if (videoRef.current) {
      videoOptimizerRef.current = new VideoOptimizer(videoRef.current);
    }

    // Cinematic video zoom
    if (mode === 'cinematic' && videoRef.current) {
      gsap.to(videoRef.current, {
        scale: 1.1,
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      });
    }

    // Lightning scroll triggers
    if (mode === 'cinematic') {
      ScrollTrigger.create({
        trigger: '#projects',
        start: 'top center',
        onEnter: () => setLightningTrigger(prev => !prev),
      });

      ScrollTrigger.create({
        trigger: '#skills',
        start: 'top center',
        onEnter: () => setLightningTrigger(prev => !prev),
      });

      ScrollTrigger.create({
        trigger: '#contact',
        start: 'top center',
        onEnter: () => setLightningTrigger(prev => !prev),
      });
    }

    // Debounced resize handler
    const handleResize = debounce(() => {
      ScrollTrigger.refresh();
    }, 250);

    window.addEventListener('resize', handleResize);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', handleResize);
      
      if (videoOptimizerRef.current) {
        videoOptimizerRef.current.destroy();
      }
    };
  }, [mode]);

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
      {/* Cinematic Cursor */}
      {!isMobile && <CinematicCursorComponent />}
      
      {/* Lightning Effect */}
      {mode === 'cinematic' && <LightningEffect trigger={lightningTrigger} />}

      {/* Storm Background Video - Continuous Loop */}
      {mode === 'cinematic' ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover z-0"
          style={{ opacity: 0.3 }}
        >
          <source src="/assets/storm.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black z-0" />
      )}

      {/* Dark overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 z-0" />

      {/* Content wrapper */}
      <div className="relative z-10">
      
      {/* Performance Mode Toggle */}
      <PerformanceModeToggle onModeChange={setMode} />

      {/* Glassmorphism Navbar */}
      <nav 
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: 'rgba(0, 10, 20, 0.7)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 212, 255, 0.2)',
          transform: navbarVisible ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="w-10 h-10 md:w-12 md:h-12 object-contain cursor-pointer"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.6))',
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />

          {/* Nav Links */}
          <ul className="hidden md:flex items-center gap-8">
            {['Home', 'About', 'Projects', 'Skills', 'Certificates', 'Contact'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="relative text-sm text-gray-300 hover:text-cyan-400 transition-colors group"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center px-4 md:px-12 pt-20"
        data-testid="hero-section"
      >
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black leading-tight">
              <span className="block text-white">Artificial Intelligence &</span>
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Intelligent Systems
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-body">
              Engineering Intelligence. Creating Impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-full font-semibold transition-all shadow-lg hover:shadow-cyan-500/50 overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <button
                className="group relative px-8 py-4 glass hover:bg-cyan-900/30 rounded-full font-semibold transition-all border border-cyan-500/30 flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
          
          {/* Live Intelligence Terminal */}
          <div>
            <LiveTerminal />
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
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Projects
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-400 border-t-transparent" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <EnhancedProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
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
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Skills Constellation
          </h2>
          <div className="glass rounded-3xl p-12 min-h-[500px] flex items-center justify-center"
            style={{
              background: 'rgba(0, 20, 40, 0.4)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <SkillConstellation />
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
