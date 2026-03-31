import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EducationSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll('.education-card');
    
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
        },
      }
    );
  }, []);

  const education = {
    degree: "Bachelor of Engineering in Computer Science",
    university: "Visvesvaraya Technological University",
    cgpa: "8.5",
    year: "2020 - 2024",
    location: "Karnataka, India"
  };

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative min-h-screen flex items-center justify-center px-4 md:px-12 py-24"
      data-testid="education-section"
    >
      <div className="max-w-5xl w-full">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Education
        </h2>

        <div 
          className="education-card glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
          style={{
            background: 'rgba(0, 20, 40, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            boxShadow: '0 0 40px rgba(0, 212, 255, 0.2)',
          }}
        >
          {/* Decorative gradient */}
          <div 
            className="absolute top-0 right-0 w-64 h-64 opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          <div className="relative z-10">
            <div className="flex items-start gap-6">
              <div 
                className="p-4 rounded-2xl"
                style={{
                  background: 'rgba(0, 212, 255, 0.1)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                }}
              >
                <GraduationCap className="w-12 h-12 text-cyan-400" />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                  {education.degree}
                </h3>
                <p className="text-xl text-cyan-400 mb-4">{education.university}</p>
                <p className="text-gray-400 mb-6">{education.location}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">CGPA</div>
                    <div className="text-3xl font-bold text-cyan-400">{education.cgpa}/10</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Duration</div>
                    <div className="text-xl font-semibold text-white">{education.year}</div>
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

export default EducationSection;
