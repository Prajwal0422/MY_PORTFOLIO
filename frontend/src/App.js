import { useState, useEffect } from 'react';
import '@/App.css';
import Act1Storm from '@/components/Act1Storm';
import Act2NameReveal from '@/components/Act2NameReveal';
import Act3Portfolio from '@/components/Act3Portfolio';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';

function App() {
  const [currentAct, setCurrentAct] = useState(0); // Start with 0 for preloader
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePreloaderComplete = () => {
    setCurrentAct(1);
  };

  const handleAct1Complete = () => {
    setCurrentAct(2);
  };

  const handleAct2Complete = () => {
    setCurrentAct(3);
  };

  return (
    <div className="App">
      {/* Custom cursor - only on desktop */}
      {!isMobile && <CustomCursor />}
      
      {/* Preloader */}
      {currentAct === 0 && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      
      {/* ACT 1: Storm Intro */}
      {currentAct === 1 && (
        <Act1Storm onComplete={handleAct1Complete} isMobile={isMobile} />
      )}
      
      {/* ACT 2: Name Reveal */}
      {currentAct === 2 && (
        <Act2NameReveal onComplete={handleAct2Complete} isMobile={isMobile} />
      )}
      
      {/* ACT 3: Portfolio */}
      {currentAct === 3 && (
        <Act3Portfolio isMobile={isMobile} />
      )}
    </div>
  );
}

export default App;