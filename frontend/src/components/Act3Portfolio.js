import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  ExternalLink,
  Award,
  FileText,
  Briefcase,
  GraduationCap,
  Menu,
  X,
  Send,
  ChevronUp,
  Star,
  GitFork,
} from 'lucide-react';
import {
  featuredProjects,
  personal,
  navigation,
  socialLinks,
  skills,
  education,
  about,
  internship,
  publication,
  certifications,
} from '../data/portfolioData';
import ScrollProgressBar from './ScrollProgressBar';
import ProjectStoryMode from './ProjectStoryMode';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

/* ─── Section Number Map ─── */
const SECTION_NUMBERS = {
  home: '00',
  about: '01',
  education: '02',
  projects: '03',
  skills: '04',
  experience: '05',
  publication: '06',
  certifications: '07',
  contact: '08',
};

/* ─── useActiveSection Hook ─── */
function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0] || 'home');

  useEffect(() => {
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: '-40% 0px -40% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return active;
}

/* ─── Premium Navbar ─── */
const Navbar = ({ isMobile: _isMobile }) => {
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(
    navigation.map((n) => n.id)
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(4, 6, 12, 0.88)'
          : 'rgba(4, 6, 12, 0.45)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled
          ? '1px solid rgba(0, 212, 255, 0.15)'
          : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group"
        >
          <img
            src="/assets/logo.png"
            alt="Prajwal Y Jain logo"
            className="w-10 h-10 md:w-11 md:h-11 object-contain transition-transform group-hover:scale-110"
            style={{ filter: 'drop-shadow(0 0 8px rgba(0,212,255,0.35))' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            decoding="async"
          />
          <span className="hidden md:block text-sm font-heading font-semibold text-white tracking-wider">
            PRAJWAL
          </span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`relative px-3 py-2 text-xs font-medium tracking-wider uppercase transition-colors rounded-lg ${
                  activeSection === item.id
                    ? 'text-cyan-300'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-cyan-400" />
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

/* ─── Mobile Menu ─── */
const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(panelRef.current, { x: '100%' }, { x: '0%', duration: 0.35, ease: 'power2.out' });
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const closeAndScroll = (id) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 350);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-3 right-3 z-50 p-2.5 rounded-xl"
        style={{
          background: 'rgba(4, 6, 12, 0.8)',
          border: '1px solid rgba(0,212,255,0.25)',
          backdropFilter: 'blur(12px)',
        }}
        aria-label="Open navigation menu"
      >
        <Menu className="w-5 h-5 text-cyan-300" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        ref={panelRef}
        className="fixed top-0 right-0 bottom-0 w-72 z-[101] flex flex-col"
        style={{
          background: 'rgba(4, 6, 12, 0.96)',
          borderLeft: '1px solid rgba(0,212,255,0.2)',
          backdropFilter: 'blur(24px)',
          transform: 'translateX(100%)',
        }}
      >
        <div className="flex items-center justify-between p-5">
          <span className="text-sm font-heading font-semibold text-white tracking-wider">
            NAVIGATION
          </span>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {navigation.map((item, i) => (
            <button
              key={item.id}
              onClick={() => closeAndScroll(item.id)}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-cyan-300 hover:bg-white/5 transition-all flex items-center gap-3"
            >
              <span className="text-xs text-cyan-500 font-mono w-6">
                {SECTION_NUMBERS[item.id]}
              </span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-5 border-t border-white/5">
          <a
            href={personal.resumeUrl}
            download={personal.resumeFilename}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-cyan-300 hover:bg-cyan-500/10 transition-colors"
            style={{ border: '1px solid rgba(0,212,255,0.2)' }}
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </div>
      </div>
    </>
  );
};

/* ─── Section Label Component ─── */
const SectionLabel = ({ id, label }) => (
  <div className="flex items-center gap-3 mb-8">
    <span className="text-xs font-mono text-cyan-500 tracking-widest">
      {SECTION_NUMBERS[id] || '00'}
    </span>
    <div className="w-12 h-px bg-cyan-500/40" />
    <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">
      {label}
    </span>
  </div>
);

/* ─── Hero Section ─── */
const HeroSection = ({ isMobile }) => {
  const sectionRef = useRef(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll('[data-hero-reveal]');
    gsap.fromTo(
      els,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-20"
      data-testid="hero-section"
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(10, 25, 55, 0.6) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl w-full relative z-10">
        {/* Eyebrow */}
        <div data-hero-reveal style={{ opacity: 0 }} className="mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-widest text-cyan-400"
            style={{
              background: 'rgba(0, 212, 255, 0.06)',
              border: '1px solid rgba(0, 212, 255, 0.18)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI &bull; DATA &bull; INTELLIGENT SYSTEMS
          </span>
        </div>

        {/* Heading */}
        <h1
          data-hero-reveal
          style={{ opacity: 0 }}
          className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] mb-8"
        >
          <span className="block text-white">Building Intelligence.</span>
          <span
            className="block bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #00d4ff 0%, #3b82f6 50%, #8b5cf6 100%)',
            }}
          >
            Engineering Possibilities.
          </span>
        </h1>

        {/* Description */}
        <p
          data-hero-reveal
          style={{ opacity: 0 }}
          className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed mb-10 font-body"
        >
          Computer Science undergraduate focused on Applied AI &amp; Data Science —
          building AI-enabled software systems with Python, machine learning, and NLP.
        </p>

        {/* Stats */}
        <div
          data-hero-reveal
          style={{ opacity: 0 }}
          className="flex flex-wrap gap-8 md:gap-12 mb-12"
        >
          {[
            { value: '8.6 / 10', label: 'CGPA' },
            { value: '2026', label: 'Expected Graduation' },
            { value: '3', label: 'Featured Projects' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-heading font-bold text-white">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 mt-1 tracking-wide uppercase font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          data-hero-reveal
          style={{ opacity: 0 }}
          className="flex flex-wrap gap-4"
        >
          <button
            onClick={() =>
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="group px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 flex items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.9), rgba(59,130,246,0.9))',
              boxShadow: '0 8px 32px rgba(0,212,255,0.25)',
              color: '#fff',
            }}
          >
            Explore My Work
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <a
            href={personal.resumeUrl}
            download={personal.resumeFilename}
            className="group px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 flex items-center gap-2"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(0,212,255,0.25)',
              color: '#e2e8f0',
            }}
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 flex items-center gap-2"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#94a3b8',
            }}
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

/* ─── About Section ─── */
const AboutSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll('[data-reveal]');
    gsap.fromTo(
      els,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative px-6 md:px-12 py-24 md:py-32"
      data-testid="about-section"
    >
      <div className="max-w-6xl mx-auto">
        <SectionLabel id="about" label="About" />

        <div className="grid md:grid-cols-5 gap-12">
          {/* Left — About text */}
          <div className="md:col-span-3" data-reveal style={{ opacity: 0 }}>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              About Me
            </h2>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-6">
              {about.summary}
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl transition-all hover:bg-white/5"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                aria-label="GitHub profile"
              >
                <Github className="w-5 h-5 text-gray-400 hover:text-cyan-300 transition-colors" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl transition-all hover:bg-white/5"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-cyan-300 transition-colors" />
              </a>
              <a
                href={socialLinks.email}
                className="p-3 rounded-xl transition-all hover:bg-white/5"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                aria-label="Send email"
              >
                <Mail className="w-5 h-5 text-gray-400 hover:text-cyan-300 transition-colors" />
              </a>
            </div>
          </div>

          {/* Right — System Profile */}
          <div className="md:col-span-2" data-reveal style={{ opacity: 0 }}>
            <div
              className="rounded-2xl p-6 space-y-4"
              style={{
                background: 'rgba(0, 212, 255, 0.03)',
                border: '1px solid rgba(0, 212, 255, 0.12)',
              }}
            >
              <h3 className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4">
                System Profile
              </h3>
              {[
                { label: 'Focus', value: 'Artificial Intelligence' },
                { label: 'Domain', value: 'Data Science' },
                { label: 'Approach', value: 'Applied AI + Software Systems' },
                { label: 'Stage', value: 'Undergraduate' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                    {item.label}
                  </span>
                  <span className="text-sm text-gray-300">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Education Section ─── */
const EducationSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current.querySelector('[data-reveal]');
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative px-6 md:px-12 py-24 md:py-32"
      data-testid="education-section"
    >
      <div className="max-w-6xl mx-auto">
        <SectionLabel id="education" label="Education" />

        <div data-reveal style={{ opacity: 0 }}>
          <div
            className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
            style={{
              background: 'rgba(0, 212, 255, 0.03)',
              border: '1px solid rgba(0, 212, 255, 0.12)',
            }}
          >
            {/* Decorative glow */}
            <div
              className="absolute -top-20 -right-20 w-64 h-64 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
              <div
                className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(0, 212, 255, 0.08)',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                }}
              >
                <GraduationCap className="w-7 h-7 text-cyan-400" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-heading font-semibold text-white mb-2">
                  {education.degree}
                </h3>
                <p className="text-cyan-400 text-sm font-medium mb-1">
                  {education.university}
                </p>
                <p className="text-gray-500 text-sm">{education.location}</p>
              </div>

              <div className="flex gap-8 md:gap-12 shrink-0">
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-white">
                    {education.cgpa}
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mt-1">
                    CGPA / {education.cgpaScale}
                  </div>
                  <div className="text-[10px] text-gray-600 mt-0.5">
                    {education.cgpaPeriod}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-white">
                    {education.completion}
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mt-1">
                    Completion
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Project Card ─── */
const ProjectCard = ({ project, onClick }) => {
  const cardRef = useRef(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setHoverPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    cardRef.current.style.transform = `perspective(800px) rotateX(${(e.clientY - rect.top - cy) / 25}deg) rotateY(${(cx - (e.clientX - rect.left)) / 25}deg)`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
    }
  };

  const techTags = project.tech || project.topics || [];
  const isLive = typeof project.stargazers_count === 'number';

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`View details of ${project.name}`}
      onClick={() => onClick?.(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(project);
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl p-6 cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      style={{
        background: 'rgba(0, 212, 255, 0.03)',
        border: '1px solid rgba(0, 212, 255, 0.1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle 120px at ${hoverPos.x}px ${hoverPos.y}px, rgba(0,212,255,0.12), transparent)`,
          }}
        />
      )}

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base md:text-lg font-heading font-semibold text-white leading-tight">
            {project.name}
          </h3>
          {project.flagship && (
            <span className="shrink-0 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400"
              style={{ border: '1px solid rgba(0,212,255,0.2)' }}
            >
              FLAGSHIP
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
          {project.description || 'No description available'}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          {project.language && (
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono text-cyan-400"
              style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)' }}
            >
              {project.language}
            </span>
          )}
          {techTags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded text-[10px] font-mono text-gray-400"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {tag}
            </span>
          ))}
          {isLive && (
            <>
              {typeof project.stargazers_count === 'number' && (
                <span className="flex items-center gap-1 text-[10px] text-gray-500 ml-auto">
                  <Star className="w-3 h-3" />
                  {project.stargazers_count}
                </span>
              )}
              {typeof project.forks_count === 'number' && (
                <span className="flex items-center gap-1 text-[10px] text-gray-500">
                  <GitFork className="w-3 h-3" />
                  {project.forks_count}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Projects Section ─── */
const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const [ghProjects, setGhProjects] = useState([]);
  const [ghLoading, setGhLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll('[data-reveal]');
    gsap.fromTo(
      els,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  useEffect(() => {
    axios
      .get('https://api.github.com/users/Prajwal0422/repos', {
        params: { sort: 'updated', per_page: 12 },
      })
      .then((res) => {
        setGhProjects(res.data);
        setGhLoading(false);
      })
      .catch(() => setGhLoading(false));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative px-6 md:px-12 py-24 md:py-32"
      data-testid="projects-section"
    >
      <div className="max-w-6xl mx-auto">
        <SectionLabel id="projects" label="Selected Work" />

        {/* Featured projects heading */}
        <div data-reveal style={{ opacity: 0 }} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Selected Work
          </h2>
          <p className="text-gray-500 max-w-xl">
            Projects where AI meets real-world systems.
          </p>
        </div>

        {/* Featured Project Grid */}
        <div
          data-reveal
          style={{ opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20"
        >
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelected}
            />
          ))}
        </div>

        {/* More from GitHub */}
        <div data-reveal style={{ opacity: 0 }}>
          <h3 className="text-2xl font-heading font-semibold text-white mb-2">
            More from GitHub
          </h3>
          <p className="text-sm text-gray-500 mb-8">
            Latest repositories from{' '}
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
            >
              {personal.githubUsername}
            </a>
          </p>

          {ghLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : ghProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ghProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={setSelected}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-600 text-sm">
              Unable to load repositories. Check{' '}
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                GitHub
              </a>{' '}
                directly.
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectStoryMode
        project={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
};

/* ─── Skills Section ─── */
const SkillsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll('[data-reveal]');
    gsap.fromTo(
      els,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative px-6 md:px-12 py-24 md:py-32"
      data-testid="skills-section"
    >
      <div className="max-w-6xl mx-auto">
        <SectionLabel id="skills" label="Skills" />

        <div data-reveal style={{ opacity: 0 }} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Technology Map
          </h2>
          <p className="text-gray-500 max-w-xl">
            Technologies and tools I work with across AI, data, and software development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map(({ category, items }) => (
            <div
              key={category}
              data-reveal
              className="rounded-2xl p-6 transition-all duration-300"
              style={{
                opacity: 0,
                background: 'rgba(0, 212, 255, 0.03)',
                border: '1px solid rgba(0, 212, 255, 0.1)',
              }}
            >
              <h3 className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-5">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1.5 rounded-lg text-sm text-gray-300 transition-all duration-200 hover:text-cyan-300 cursor-default"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                    title={skill.level}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
              {/* Subtle level indicator */}
              <div className="mt-4 pt-3 border-t border-white/5">
                <span className="text-[10px] text-gray-600 font-mono">
                  {items.length} technologies
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Experience Section ─── */
const ExperienceSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current.querySelector('[data-reveal]');
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative px-6 md:px-12 py-24 md:py-32"
      data-testid="experience-section"
    >
      <div className="max-w-6xl mx-auto">
        <SectionLabel id="experience" label="Experience" />

        <div data-reveal style={{ opacity: 0 }}>
          <div className="relative flex gap-6 md:gap-8">
            {/* Timeline line */}
            <div className="shrink-0 w-px relative">
              <div className="absolute inset-0 w-px bg-gradient-to-b from-cyan-400/40 via-cyan-400/20 to-transparent" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400"
                style={{ boxShadow: '0 0 12px rgba(0,212,255,0.6)' }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(0, 212, 255, 0.08)',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                  }}
                >
                  <Briefcase className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-white">
                    {internship.role}
                  </h3>
                  <p className="text-sm text-cyan-400">
                    {internship.company} &middot; {internship.mode}
                  </p>
                </div>
              </div>

              <ul className="space-y-2.5 mt-6 ml-1">
                {internship.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed">
                    <span className="text-cyan-400 mt-1.5 shrink-0">▹</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Publication Section ─── */
const PublicationSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current.querySelector('[data-reveal]');
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="publication"
      className="relative px-6 md:px-12 py-24 md:py-32"
      data-testid="publication-section"
    >
      <div className="max-w-6xl mx-auto">
        <SectionLabel id="publication" label="Research" />

        <div data-reveal style={{ opacity: 0 }}>
          <div
            className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
            style={{
              background: 'rgba(0, 212, 255, 0.03)',
              border: '1px solid rgba(0, 212, 255, 0.12)',
            }}
          >
            <div className="flex items-start gap-5">
              <div
                className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(0, 212, 255, 0.08)',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                }}
              >
                <FileText className="w-6 h-6 text-cyan-400" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-heading font-semibold text-white mb-3 leading-tight">
                  {publication.title}
                </h3>
                <p className="text-sm text-cyan-400 mb-2">
                  {publication.journal}
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-4">
                  <span>Volume {publication.volume}, Issue {publication.issue}</span>
                  <span>&middot;</span>
                  <span>{publication.date}</span>
                  <span>&middot;</span>
                  <span>ISSN {publication.issn}</span>
                </div>
                {publication.link && (
                  <a
                    href={publication.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium text-cyan-300 transition-colors hover:bg-cyan-500/10"
                    style={{ border: '1px solid rgba(0,212,255,0.2)' }}
                  >
                    Read Full Paper
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Certifications Section ─── */
const CertificationsSection = () => {
  const sectionRef = useRef(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll('[data-reveal]');
    gsap.fromTo(
      els,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative px-6 md:px-12 py-24 md:py-32"
      data-testid="certifications-section"
    >
      <div className="max-w-6xl mx-auto">
        <SectionLabel id="certifications" label="Certifications" />

        <div data-reveal style={{ opacity: 0 }} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
            Certifications
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certifications.map((cert, i) => (
            <button
              key={i}
              data-reveal
              style={{ opacity: 0 }}
              onClick={() => setSelected(cert)}
              className="text-left rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 group"
              style={{
                background: 'rgba(0, 212, 255, 0.03)',
                border: '1px solid rgba(0, 212, 255, 0.1)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/10 transition-colors"
                style={{
                  background: 'rgba(0, 212, 255, 0.06)',
                  border: '1px solid rgba(0, 212, 255, 0.15)',
                }}
              >
                <Award className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-sm font-heading font-semibold text-white mb-1.5 leading-tight line-clamp-2">
                {cert.title}
              </h3>
              <p className="text-xs text-cyan-400 mb-1">{cert.issuer}</p>
              {cert.date && (
                <p className="text-[10px] text-gray-600">{cert.date}</p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
        >
          <div
            className="rounded-2xl p-8 max-w-lg w-full relative"
            style={{
              background: 'rgba(8, 12, 24, 0.95)',
              border: '1px solid rgba(0, 212, 255, 0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Close certificate details"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
            <h3
              id="cert-modal-title"
              className="text-xl font-heading font-semibold text-white mb-2 pr-8"
            >
              {selected.title}
            </h3>
            <p className="text-sm text-cyan-400 mb-2">{selected.issuer}</p>
            {selected.date && (
              <p className="text-xs text-gray-500 mb-4">{selected.date}</p>
            )}
            {selected.description && (
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                {selected.description}
              </p>
            )}
            {selected.image && (
              <img
                src={selected.image}
                alt={`${selected.title} certificate`}
                className="w-full rounded-xl mb-4"
                style={{ border: '1px solid rgba(0,212,255,0.15)' }}
              />
            )}
            {selected.verificationUrl && (
              <a
                href={selected.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                style={{ border: '1px solid rgba(0,212,255,0.2)' }}
              >
                Verify Certificate
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={() => setSelected(null)}
              className="mt-4 ml-3 px-5 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

/* ─── Resume CTA Section ─── */
const ResumeSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current.querySelector('[data-reveal]');
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-3xl mx-auto text-center" data-reveal style={{ opacity: 0 }}>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          Want the complete picture?
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Download my resume for a concise overview of my education, skills, projects, and experience.
        </p>
        <a
          href={personal.resumeUrl}
          download={personal.resumeFilename}
          className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 group"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.9), rgba(59,130,246,0.9))',
            boxShadow: '0 8px 32px rgba(0,212,255,0.25)',
            color: '#fff',
          }}
        >
          <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
          DOWNLOAD RESUME
        </a>
      </div>
    </section>
  );
};

/* ─── Contact Section ─── */
const ContactSection = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll('[data-reveal]');
    gsap.fromTo(
      els,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${formData.name}`);
    const body = encodeURIComponent(
      `${formData.message}\n\n— ${formData.name} (${formData.email})`
    );
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setOpened(true);
    setTimeout(() => setOpened(false), 8000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative px-6 md:px-12 py-24 md:py-32"
      data-testid="contact-section"
    >
      <div className="max-w-6xl mx-auto">
        <SectionLabel id="contact" label="Contact" />

        <div data-reveal style={{ opacity: 0 }} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Let's build something intelligent.
          </h2>
          <p className="text-gray-500 max-w-xl">
            Open to opportunities, collaborations, and conversations about AI and technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}            <form
            data-reveal
            style={{ opacity: 0, background: 'rgba(0, 212, 255, 0.03)', border: '1px solid rgba(0, 212, 255, 0.1)' }}
            onSubmit={handleSubmit}
            className="rounded-2xl p-8 space-y-5"
          >
            <div>
              <label className="block text-xs text-gray-500 mb-2 font-mono uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2 font-mono uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2 font-mono uppercase tracking-wider">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.9), rgba(59,130,246,0.9))',
                boxShadow: '0 6px 24px rgba(0,212,255,0.2)',
                color: '#fff',
              }}
            >
              {opened ? (
                <>
                  <Mail className="w-4 h-4" />
                  Opening your email app…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
            <p className="text-[11px] text-gray-600 text-center">
              Your email client will open to send this message directly to{' '}
              <span className="text-cyan-400">{personal.email}</span>.
            </p>
          </form>

          {/* Social Links */}
          <div data-reveal style={{ opacity: 0 }} className="space-y-5">
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(0, 212, 255, 0.03)',
                border: '1px solid rgba(0, 212, 255, 0.1)',
              }}
            >
              <h3 className="text-sm font-mono text-cyan-400 tracking-widest uppercase mb-6">
                Connect
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Github, name: 'GitHub', url: socialLinks.github },
                  { icon: Linkedin, name: 'LinkedIn', url: socialLinks.linkedin },
                  { icon: Mail, name: 'Email', url: socialLinks.email },
                  { icon: Phone, name: 'Phone', url: socialLinks.phone },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl text-sm text-gray-400 hover:text-cyan-300 transition-all hover:bg-white/3 group"
                    style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <link.icon className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl p-6 flex items-start gap-3"
              style={{
                background: 'rgba(0, 212, 255, 0.03)',
                border: '1px solid rgba(0, 212, 255, 0.1)',
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 shrink-0 animate-pulse" />
              <div>
                <p className="text-sm text-white font-medium">Available for Opportunities</p>
                <p className="text-xs text-gray-500 mt-0.5">Open to projects and positions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN ACT 3 COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const Act3Portfolio = ({ isMobile }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.inOut' }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Update document title when Act 3 mounts
  useEffect(() => {
    document.title = 'Prajwal Y Jain — AI & Intelligent Systems';
    return () => {
      document.title = 'Prajwal Y Jain — AI & Intelligent Systems';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen"
      style={{ background: '#04060c' }}
      data-testid="act3-portfolio-container"
    >
      {/* Subtle background gradient */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(10, 20, 45, 0.5) 0%, transparent 70%)',
        }}
      />

      {/* Fine technical grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Scroll Progress */}
      <ScrollProgressBar />

      {/* Navbar */}
      <Navbar isMobile={isMobile} />
      {isMobile && <MobileNav />}

      {/* Content */}
      <div className="relative z-10">
        <HeroSection isMobile={isMobile} />
        <AboutSection />
        <EducationSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <PublicationSection />
        <CertificationsSection />
        <ResumeSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Act3Portfolio;
