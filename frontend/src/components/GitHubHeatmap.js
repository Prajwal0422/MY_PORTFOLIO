import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const GitHubHeatmap = ({ username = 'Prajwal0422' }) => {
  const containerRef = useRef(null);
  const [contributions, setContributions] = useState([]);
  const [stats, setStats] = useState({ total: 0, streak: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const fetchGitHubData = async () => {
    try {
      // Fetch user events to calculate contributions
      const eventsResponse = await axios.get(
        `https://api.github.com/users/${username}/events/public`,
        { params: { per_page: 100 } }
      );

      // Fetch user repos for additional stats
      const reposResponse = await axios.get(
        `https://api.github.com/users/${username}/repos`,
        { params: { per_page: 100, sort: 'updated' } }
      );

      // Process contribution data
      const contributionMap = new Map();
      let totalContributions = 0;

      // Count commits from events
      eventsResponse.data.forEach(event => {
        if (event.type === 'PushEvent') {
          const date = new Date(event.created_at).toDateString();
          contributionMap.set(date, (contributionMap.get(date) || 0) + event.payload.commits.length);
          totalContributions += event.payload.commits.length;
        }
      });

      // Generate last 365 days of data
      const data = [];
      const today = new Date();
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toDateString();
        const count = contributionMap.get(dateStr) || 0;
        
        data.push({
          date: date,
          count: count,
          week: Math.floor(i / 7),
          day: date.getDay(),
        });
      }

      setContributions(data);
      setStats({
        total: totalContributions,
        streak: calculateStreak(data),
        repos: reposResponse.data.length,
      });
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
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      // Fallback to mock data
      generateMockData();
    }
  };

  const calculateStreak = (data) => {
    let currentStreak = 0;
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].count > 0) {
        currentStreak++;
      } else {
        break;
      }
    }
    return currentStreak;
  };

  const generateMockData = () => {
    const data = [];
    const today = new Date();
    let totalContributions = 0;

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const count = Math.floor(Math.random() * 10);
      totalContributions += count;
      
      data.push({
        date: date,
        count: count,
        week: Math.floor(i / 7),
        day: date.getDay(),
      });
    }

    setContributions(data);
    setStats({
      total: totalContributions,
      streak: Math.floor(Math.random() * 30),
      repos: 25,
    });
    setLoading(false);
  };

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
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-heading font-bold text-cyan-400">
          GitHub Activity
        </h3>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
        >
          @{username}
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 rounded-xl" style={{ background: 'rgba(0, 212, 255, 0.1)' }}>
          <div className="text-2xl font-bold text-cyan-400">{stats.total}</div>
          <div className="text-xs text-gray-400">Contributions</div>
        </div>
        <div className="text-center p-4 rounded-xl" style={{ background: 'rgba(0, 212, 255, 0.1)' }}>
          <div className="text-2xl font-bold text-cyan-400">{stats.streak}</div>
          <div className="text-xs text-gray-400">Day Streak</div>
        </div>
        <div className="text-center p-4 rounded-xl" style={{ background: 'rgba(0, 212, 255, 0.1)' }}>
          <div className="text-2xl font-bold text-cyan-400">{stats.repos}</div>
          <div className="text-xs text-gray-400">Repositories</div>
        </div>
      </div>

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
