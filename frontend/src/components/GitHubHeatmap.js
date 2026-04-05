import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const GitHubHeatmap = ({ username = 'Prajwal0422' }) => {
  const containerRef = useRef(null);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate mock contribution data (in production, fetch from GitHub API)
    const generateMockData = () => {
      const data = [];
      const weeks = 52;
      const daysPerWeek = 7;

      for (let week = 0; week < weeks; week++) {
        for (let day = 0; day < daysPerWeek; day++) {
          data.push({
            date: new Date(Date.now() - (weeks - week) * 7 * 24 * 60 * 60 * 1000 + day * 24 * 60 * 60 * 1000),
            count: Math.floor(Math.random() * 10),
          });
        }
      }
      return data;
    };

    setContributions(generateMockData());
    setLoading(false);

    // Animate cells on scroll
    const container = containerRef.current;
    if (container) {
      ScrollTrigger.create({
        trigger: container,
        start: 'top 70%',
        onEnter: () => {
          const cells = container.querySelectorAll('.heatmap-cell');
          if (cells.length > 0) {
            gsap.fromTo(
              cells,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                stagger: {
                  amount: 1,
                  from: 'start',
                },
                ease: 'back.out(1.7)',
              }
            );
          }
        },
      });
    }
  }, [username]);

  const getColor = (count) => {
    if (count === 0) return 'rgba(30, 30, 30, 0.5)';
    if (count <= 2) return 'rgba(0, 212, 255, 0.2)';
    if (count <= 5) return 'rgba(0, 212, 255, 0.5)';
    if (count <= 8) return 'rgba(0, 212, 255, 0.7)';
    return 'rgba(0, 212, 255, 1)';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="glass rounded-3xl p-8"
      style={{
        background: 'rgba(0, 20, 40, 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
      }}
    >
      <h3 className="text-2xl font-heading font-bold mb-6 text-cyan-400">
        GitHub Activity
      </h3>

      <div className="overflow-x-auto">
        <div className="inline-grid grid-flow-col gap-1" style={{ gridTemplateRows: 'repeat(7, 1fr)' }}>
          {contributions.map((day, index) => (
            <div
              key={index}
              className="heatmap-cell w-3 h-3 rounded-sm cursor-pointer transition-all hover:scale-125"
              style={{
                backgroundColor: getColor(day.count),
                boxShadow: day.count > 0 ? `0 0 10px ${getColor(day.count)}` : 'none',
              }}
              title={`${day.count} contributions on ${day.date.toLocaleDateString()}`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6 text-sm text-gray-400">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 2, 5, 8, 10].map((count, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: getColor(count) }}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default GitHubHeatmap;
