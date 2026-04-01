import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StatsCounter from './StatsCounter';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const aboutText = "Passionate AI Engineer specializing in Natural Language Processing, Machine Learning, and Intelligent Systems. Focused on building innovative solutions that leverage cutting-edge AI technologies to solve real-world problems. Experienced in developing end-to-end ML pipelines, NLP applications, and deploying scalable AI systems.";

  useEffect(() => {
    // Scroll trigger for typing animation
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      onEnter: () => {
        if (!isTyping) {
          startTyping();
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const startTyping = () => {
    setIsTyping(true);
    let index = 0;
    
    const typeInterval = setInterval(() => {
      if (index < aboutText.length) {
        setDisplayedText(aboutText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 30);
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center justify-center px-4 md:px-12 py-24"
      data-testid="about-section"
    >
      <div 
        className="max-w-4xl w-full glass rounded-3xl p-8 md:p-12"
        style={{
          background: 'rgba(0, 20, 40, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          boxShadow: '0 0 40px rgba(0, 212, 255, 0.2)',
        }}
      >
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          About Me
        </h2>
        
        <div className="space-y-6">
          <div className="text-lg md:text-xl text-gray-300 leading-relaxed min-h-[200px]">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-0.5 h-6 bg-cyan-400 ml-1 animate-pulse"></span>
            )}
          </div>

          <div className="mt-8">
            <StatsCounter
              stats={[
                { value: 15, suffix: '+', label: 'Projects Completed' },
                { value: 8, suffix: '.5', label: 'CGPA' },
                { value: 5, suffix: '+', label: 'Certifications' },
                { value: 100, suffix: '%', label: 'Dedication' },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
