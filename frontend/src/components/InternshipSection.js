import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const InternshipSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      '.internship-card',
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
        },
      }
    );
  }, []);

  const internship = {
    company: "CODSOFT",
    role: "AI/ML Intern",
    duration: "June 2023 - August 2023",
    location: "Remote",
    description: "Developed and deployed machine learning models for real-world applications. Worked on NLP projects including sentiment analysis and text classification systems.",
    achievements: [
      "Built end-to-end ML pipeline for sentiment analysis",
      "Implemented text classification models with 92% accuracy",
      "Deployed models using FastAPI and Docker",
      "Collaborated with cross-functional teams"
    ]
  };

  return (
    <section
      ref={sectionRef}
      id="internship"
      className="relative min-h-screen flex items-center justify-center px-4 md:px-12 py-24"
      data-testid="internship-section"
    >
      <div className="max-w-5xl w-full">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Experience
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div 
            className="absolute left-8 top-0 bottom-0 w-0.5"
            style={{
              background: 'linear-gradient(180deg, rgba(0, 212, 255, 0.8) 0%, rgba(0, 212, 255, 0.2) 100%)',
            }}
          />

          <div 
            className="internship-card glass rounded-3xl p-8 md:p-12 ml-16 relative"
            style={{
              background: 'rgba(0, 20, 40, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              boxShadow: '0 0 40px rgba(0, 212, 255, 0.2)',
            }}
          >
            {/* Timeline dot */}
            <div 
              className="absolute -left-[52px] top-12 w-6 h-6 rounded-full"
              style={{
                background: 'rgba(0, 212, 255, 1)',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.8)',
              }}
            />

            <div className="flex items-start gap-6 mb-6">
              <div 
                className="p-4 rounded-2xl"
                style={{
                  background: 'rgba(0, 212, 255, 0.1)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                }}
              >
                <Briefcase className="w-10 h-10 text-cyan-400" />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                  {internship.role}
                </h3>
                <p className="text-xl text-cyan-400 mb-4">{internship.company}</p>

                <div className="flex flex-wrap gap-4 text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{internship.location}</span>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {internship.description}
                </p>

                <div>
                  <h4 className="text-lg font-semibold text-cyan-400 mb-3">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {internship.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300">
                        <span className="text-cyan-400 mt-1">▹</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternshipSection;
