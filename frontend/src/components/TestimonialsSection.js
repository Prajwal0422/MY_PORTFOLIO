import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const sectionRef = useRef(null);

  const testimonials = [
    {
      name: "Tech Lead",
      role: "Senior Engineer",
      company: "Tech Company",
      text: "Exceptional AI engineer with deep understanding of machine learning and NLP. Delivers high-quality solutions consistently.",
      avatar: "TL"
    },
    {
      name: "Project Manager",
      role: "Product Manager",
      company: "Startup Inc",
      text: "Great team player with excellent problem-solving skills. Always brings innovative ideas to the table.",
      avatar: "PM"
    },
    {
      name: "Mentor",
      role: "AI Researcher",
      company: "Research Lab",
      text: "Shows remarkable dedication to learning and applying cutting-edge AI technologies. A promising talent in the field.",
      avatar: "MR"
    },
  ];

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll('.testimonial-card');
    
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50, rotateX: -20 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
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

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative min-h-screen px-4 md:px-12 py-24"
      data-testid="testimonials-section"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Recommendations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card relative group"
              style={{
                perspective: '1000px',
              }}
            >
              <div
                className="glass rounded-3xl p-8 transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(0, 20, 40, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Quote icon */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                  style={{
                    background: 'rgba(0, 212, 255, 0.2)',
                    border: '1px solid rgba(0, 212, 255, 0.4)',
                  }}
                >
                  <Quote className="w-6 h-6 text-cyan-400" />
                </div>

                {/* Testimonial text */}
                <p className="text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Author info */}
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-cyan-400"
                    style={{
                      background: 'rgba(0, 212, 255, 0.2)',
                      border: '2px solid rgba(0, 212, 255, 0.4)',
                    }}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                    <div className="text-xs text-cyan-400">{testimonial.company}</div>
                  </div>
                </div>

                {/* Hover glow */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
