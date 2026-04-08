import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import gsap from 'gsap';

const ShareButton = ({ title = 'Check out my portfolio!', url = window.location.href }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Try native share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        
        gsap.to('.share-icon', {
          scale: 1.2,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        });

        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
      style={{
        background: 'rgba(0, 212, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
      }}
      title="Share portfolio"
    >
      {copied ? (
        <>
          <Check className="share-icon w-4 h-4 text-green-400" />
          <span className="text-sm text-green-400">Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="share-icon w-4 h-4 text-cyan-400" />
          <span className="text-sm text-cyan-400">Share</span>
        </>
      )}
    </button>
  );
};

export default ShareButton;
