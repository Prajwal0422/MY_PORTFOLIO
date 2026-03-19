import { useEffect, useRef } from 'react';
import { X, Github, ExternalLink } from 'lucide-react';
import gsap from 'gsap';

const ProjectStoryMode = ({ project, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (project) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Cinematic entrance animation
      const tl = gsap.timeline();
      tl.fromTo(modalRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
      .fromTo(contentRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo('.story-title', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 
        '-=0.3'
      )
      .fromTo('.story-tech', 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'back.out(1.7)' },
        '-=0.2'
      )
      .fromTo('.story-content', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );

      // ESC key handler
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      document.addEventListener('keydown', handleEsc);

      return () => {
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleEsc);
      };
    }
  }, [project]);

  const handleClose = () => {
    // Smooth exit animation
    const tl = gsap.timeline({
      onComplete: onClose
    });
    
    tl.to(contentRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    })
    .to(modalRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    }, '-=0.1');
  };

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      handleClose();
    }
  };

  if (!project) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-lg p-4"
      onClick={handleBackdropClick}
      data-testid="project-story-mode"
      style={{ cursor: 'default' }}
    >
      <div
        ref={contentRef}
        className="modal-content relative max-w-4xl w-full max-h-[90vh] overflow-y-auto glass rounded-3xl p-8"
        style={{
          background: 'rgba(0, 20, 40, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="modal-close absolute top-6 right-6 p-2 hover:bg-cyan-900/50 rounded-full transition-all hover:rotate-90 group"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" />
        </button>

        {/* Title */}
        <h1 className="story-title text-4xl md:text-5xl font-heading font-bold mb-6 glow-blue">
          {project.name}
        </h1>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-3 mb-8">
          {project.language && (
            <span className="story-tech px-4 py-2 bg-cyan-900/30 rounded-full text-cyan-400 border border-cyan-500/30">
              {project.language}
            </span>
          )}
          {project.topics?.slice(0, 5).map((topic) => (
            <span
              key={topic}
              className="story-tech px-4 py-2 bg-cyan-900/30 rounded-full text-cyan-400 border border-cyan-500/30"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Problem → Solution → Result */}
        <div className="story-content space-y-8">
          <div>
            <h3 className="text-2xl font-heading font-bold mb-3 text-cyan-400">📋 Overview</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              {project.description || 'An innovative project showcasing technical excellence.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xl font-semibold mb-2 text-cyan-400">⭐ Stars</h4>
              <p className="text-3xl font-bold">{project.stargazers_count}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2 text-cyan-400">🔀 Forks</h4>
              <p className="text-3xl font-bold">{project.forks_count}</p>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-2 text-cyan-400">📅 Last Updated</h4>
            <p className="text-lg">{new Date(project.updated_at).toLocaleDateString('en-US', { 
              year: 'numeric', month: 'long', day: 'numeric' 
            })}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-full font-semibold transition-all shadow-lg hover:shadow-cyan-500/50"
            >
              <Github className="w-5 h-5" />
              View Repository
            </a>
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 glass hover:bg-cyan-900/30 rounded-full font-semibold transition-all"
              >
                <ExternalLink className="w-5 h-5" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStoryMode;
