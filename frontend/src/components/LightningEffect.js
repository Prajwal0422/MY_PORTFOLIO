import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LightningEffect = ({ trigger = false }) => {
  const flashRef = useRef(null);

  useEffect(() => {
    if (trigger && flashRef.current) {
      // Lightning flash
      gsap.to(flashRef.current, {
        opacity: 0.3,
        duration: 0.05,
        yoyo: true,
        repeat: 3,
        onComplete: () => {
          gsap.set(flashRef.current, { opacity: 0 });
        }
      });

      // Thunder sound (optional - can add audio)
      // const audio = new Audio('/assets/thunder.mp3');
      // audio.volume = 0.2;
      // audio.play().catch(() => {});
    }
  }, [trigger]);

  return (
    <div
      ref={flashRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{
        background: 'radial-gradient(circle at center, rgba(135, 206, 250, 0.4) 0%, transparent 70%)',
        opacity: 0,
      }}
    />
  );
};

export default LightningEffect;
