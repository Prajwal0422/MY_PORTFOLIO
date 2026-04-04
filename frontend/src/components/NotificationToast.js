import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

const NotificationToast = ({ 
  type = 'info', 
  message, 
  onClose, 
  duration = 5000 
}) => {
  const toastRef = useRef(null);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertTriangle,
  };

  const colors = {
    success: { bg: 'rgba(0, 255, 100, 0.1)', border: 'rgba(0, 255, 100, 0.5)', text: '#00ff64' },
    error: { bg: 'rgba(255, 50, 50, 0.1)', border: 'rgba(255, 50, 50, 0.5)', text: '#ff3232' },
    info: { bg: 'rgba(0, 212, 255, 0.1)', border: 'rgba(0, 212, 255, 0.5)', text: '#00d4ff' },
    warning: { bg: 'rgba(255, 200, 0, 0.1)', border: 'rgba(255, 200, 0, 0.5)', text: '#ffc800' },
  };

  const Icon = icons[type];
  const color = colors[type];

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      toastRef.current,
      { x: 400, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }
    );

    // Auto close
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    gsap.to(toastRef.current, {
      x: 400,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        if (onClose) onClose();
      },
    });
  };

  return (
    <div
      ref={toastRef}
      className="fixed top-24 right-8 z-[200] max-w-md"
      style={{
        background: color.bg,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${color.border}`,
        borderRadius: '12px',
        padding: '16px',
        boxShadow: `0 10px 40px ${color.border}`,
      }}
    >
      <div className="flex items-start gap-3">
        <Icon className="w-6 h-6 flex-shrink-0" style={{ color: color.text }} />
        
        <div className="flex-1">
          <p className="text-white text-sm leading-relaxed">{message}</p>
        </div>

        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;
