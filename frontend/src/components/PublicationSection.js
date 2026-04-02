import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, ExternalLink, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PublicationSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      '.publication-card',
      { opacity: 0, y: 100, rotateX: -30 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
        },
      }
    );
  }, []);

  const publication = {
    title: "Advanced Natural Language Processing Techniques for Sentiment Analysis",
    authors: ["Prajwal Y Jain", "Co-Author Name"],
    journal: "International Journal of AI Research",
    year: "2024",
    abstract: "This research explores novel approaches to sentiment analysis using transformer-based models and attention mechanisms, achieving state-of-the-art results on multiple benchmark datasets.",
    keywords: ["NLP", "Sentiment Analysis", "Transformers", "Deep Learning"],
    link: "#"
  };

  return (
    <section
      ref={sectionRef}
      id="publication"
      className="relative min-h-screen flex items-center justify-center px-4 md:px-12 py-24"
      data-testid="publication-section"
    >
      <div className="max-w-5xl w-full">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Research & Publications
        </h2>

        <div 
          className="publication-card relative glass rounded-3xl p-8 md:p-12 overflow-hidden"
          style={{
            background: 'rgba(0, 20, 40, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(0, 212, 255, 0.4)',
            boxShadow: '0 0 60px rgba(0, 212, 255, 0.3)',
            perspective: '1000px',
          }}
        >
          {/* Animated gradient background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.4) 0%, transparent 70%)',
              animation: 'pulse 3s ease-in-out infinite',
            }}
          />

          {/* Premium badge */}
          <div 
            className="absolute top-6 right-6 px-4 py-2 rounded-full text-xs font-bold"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.3) 0%, rgba(0, 150, 255, 0.3) 100%)',
              border: '1px solid rgba(0, 212, 255, 0.5)',
              color: '#00d4ff',
            }}
          >
            FEATURED
          </div>

          <div className="relative z-10">
            <div className="flex items-start gap-6 mb-6">
              <div 
                className="p-4 rounded-2xl"
                style={{
                  background: 'rgba(0, 212, 255, 0.2)',
                  border: '1px solid rgba(0, 212, 255, 0.4)',
                }}
              >
                <FileText className="w-10 h-10 text-cyan-400" />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4 leading-tight">
                  {publication.title}
                </h3>

                <div className="flex items-center gap-2 text-gray-400 mb-4">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{publication.authors.join(', ')}</span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                  <span className="text-cyan-400">{publication.journal}</span>
                  <span>•</span>
                  <span>{publication.year}</span>
                </div>

                <p className="text-gray-300 leading-relaxed mb-6">
                  {publication.abstract}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {publication.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        background: 'rgba(0, 212, 255, 0.1)',
                        border: '1px solid rgba(0, 212, 255, 0.3)',
                        color: '#00d4ff',
                      }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                <a
                  href={publication.link}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                  <span>Read Full Paper</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.3; }
        }
      `}</style>
    </section>
  );
};

export default PublicationSection;
