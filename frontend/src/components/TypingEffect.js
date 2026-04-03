import { useState, useEffect, useRef } from 'react';

const TypingEffect = ({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = '',
  showCursor = true,
  onComplete 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const startTyping = setTimeout(() => {
      setIsTyping(true);
      
      const typeInterval = setInterval(() => {
        if (indexRef.current < text.length) {
          setDisplayedText(text.substring(0, indexRef.current + 1));
          indexRef.current++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          if (onComplete) onComplete();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startTyping);
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && isTyping && (
        <span className="inline-block w-0.5 h-5 bg-cyan-400 ml-1 animate-pulse" />
      )}
    </span>
  );
};

export default TypingEffect;
