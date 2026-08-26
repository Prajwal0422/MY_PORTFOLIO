import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink } from 'lucide-react';
import { certifications } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const CertificationsSection = () => {
  const sectionRef = useRef(null);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      const cards = section.querySelectorAll('.cert-card');
      
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.8, rotateY: 90 },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: section,
              start: 'top center',
            },
          }
        );
      }
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative min-h-screen px-4 md:px-12 py-24"
      data-testid="certificates-section"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Certifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="cert-card group cursor-pointer"
              onClick={() => setSelectedCert(cert)}
              style={{
                perspective: '1000px',
              }}
            >
              <div
                className="relative glass rounded-2xl p-6 transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(0, 20, 40, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Hover glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.2) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                />

                <div className="relative z-10">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={`${cert.title} certificate`}
                      className="w-full h-28 object-cover rounded-xl mb-4 border border-cyan-500/30"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      style={{
                        background: 'rgba(0, 212, 255, 0.2)',
                        border: '1px solid rgba(0, 212, 255, 0.4)',
                      }}
                    >
                      <Award className="w-6 h-6 text-cyan-400" />
                    </div>
                  )}

                  <h3 className="text-lg font-heading font-bold text-white mb-2 line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-cyan-400 mb-2">{cert.issuer}</p>
                  {cert.date && <p className="text-xs text-gray-500 mb-4">{cert.date}</p>}

                  {cert.description && (
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                      {cert.description}
                    </p>
                  )}

                  <div className="mt-4 flex items-center gap-2 text-cyan-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Details</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for certificate details */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="glass rounded-3xl p-8 max-w-2xl w-full"
            style={{
              background: 'rgba(0, 20, 40, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-3xl font-heading font-bold text-white mb-4">
              {selectedCert.title}
            </h3>
            <p className="text-xl text-cyan-400 mb-2">{selectedCert.issuer}</p>
            {selectedCert.date && <p className="text-gray-400 mb-6">{selectedCert.date}</p>}

            {selectedCert.image && (
              <img
                src={selectedCert.image}
                alt={`${selectedCert.title} certificate`}
                className="w-full rounded-2xl mb-6 border border-cyan-500/30"
              />
            )}

            {selectedCert.description && (
              <p className="text-gray-300 leading-relaxed mb-6">{selectedCert.description}</p>
            )}

            <div className="flex flex-wrap gap-4 mb-6">
              {selectedCert.verificationUrl && (
                <a
                  href={selectedCert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 transition-colors"
                >
                  <span>Verify Certificate</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            <button
              onClick={() => setSelectedCert(null)}
              className="px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificationsSection;
