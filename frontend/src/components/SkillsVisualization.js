import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SkillsVisualization = () => {
  const sectionRef = useRef(null);

  const skillsData = {
    "Programming": [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "Java", level: 75 },
      { name: "C++", level: 70 },
    ],
    "AI/ML": [
      { name: "Machine Learning", level: 88 },
      { name: "Deep Learning", level: 85 },
      { name: "Computer Vision", level: 80 },
      { name: "Neural Networks", level: 82 },
    ],
    "NLP": [
      { name: "Text Processing", level: 90 },
      { name: "Sentiment Analysis", level: 85 },
      { name: "Language Models", level: 83 },
      { name: "Named Entity Recognition", level: 80 },
    ],
    "Tools": [
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 82 },
      { name: "Scikit-learn", level: 88 },
      { name: "Git", level: 90 },
    ],
    "Web": [
      { name: "React", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "FastAPI", level: 83 },
      { name: "MongoDB", level: 78 },
    ],
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      const progressBars = section.querySelectorAll('.progress-bar');
      
      progressBars.forEach((bar) => {
        const targetWidth = bar.getAttribute('data-width');
        
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: targetWidth + '%',
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 80%',
            },
          }
        );
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen px-4 md:px-12 py-24"
      data-testid="skills-section"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Skills & Expertise
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div
              key={category}
              className="glass rounded-3xl p-8"
              style={{
                background: 'rgba(0, 20, 40, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
              }}
            >
              <h3 className="text-2xl font-heading font-bold mb-6 text-cyan-400">
                {category}
              </h3>

              <div className="space-y-6">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-cyan-400 font-semibold">{skill.level}%</span>
                    </div>
                    <div 
                      className="h-3 bg-gray-800 rounded-full overflow-hidden"
                      style={{
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      <div
                        className="progress-bar h-full rounded-full relative"
                        data-width={skill.level}
                        style={{
                          background: 'linear-gradient(90deg, rgba(0, 212, 255, 0.8) 0%, rgba(0, 150, 255, 1) 100%)',
                          boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
                        }}
                      >
                        <div 
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                            animation: 'shimmer 2s infinite',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default SkillsVisualization;
