import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Download, FileText, Sparkles } from 'lucide-react';

const ResumeDownload = () => {
  const buttonRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    // Floating animation
    gsap.to(buttonRef.current, {
      y: -10,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Glow pulse
    gsap.to(glowRef.current, {
      scale: 1.2,
      opacity: 0.6,
      duration: 1.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, []);

  const handleDownload = () => {
    // Trigger download animation
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // Add your resume PDF link here
        window.open('/resume.pdf', '_blank');
      }
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative">
        {/* Glow effect */}
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Button */}
        <button
          ref={buttonRef}
          onClick={handleDownload}
          className="relative group"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.9) 0%, rgba(0, 150, 255, 1) 100%)',
            padding: '16px 32px',
            borderRadius: '50px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 10px 40px rgba(0, 212, 255, 0.4)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1.05,
              boxShadow: '0 15px 50px rgba(0, 212, 255, 0.6)',
              duration: 0.3,
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              scale: 1,
              boxShadow: '0 10px 40px rgba(0, 212, 255, 0.4)',
              duration: 0.3,
            });
          }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <FileText className="w-6 h-6 text-white" />
              <Sparkles 
                className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 animate-pulse" 
              />
            </div>
            <span className="text-white font-bold text-lg">Download Resume</span>
            <Download className="w-5 h-5 text-white group-hover:animate-bounce" />
          </div>

          {/* Shimmer effect */}
          <div 
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
              animation: 'shimmer 3s infinite',
            }}
          />
        </button>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ResumeDownload;
