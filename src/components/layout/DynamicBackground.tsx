'use client';

import { useEffect, useState } from 'react';
import { getWeatherTheme } from '@/lib/formatters';

interface DynamicBackgroundProps {
  condition: string;
  isDay: boolean;
}

export default function DynamicBackground({ condition, isDay }: DynamicBackgroundProps) {
  const [theme, setTheme] = useState('gradient-sunny');

  useEffect(() => {
    setTheme(getWeatherTheme(condition, isDay));
  }, [condition, isDay]);

  // Rain particles
  const isRain = condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('drizzle');
  const isSnow = condition.toLowerCase().includes('snow');
  const isStorm = condition.toLowerCase().includes('thunder');

  return (
    <div className={`fixed inset-0 -z-10 transition-all duration-1000 ${theme}`}>
      {/* Rain effect */}
      {isRain && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="rain-drop absolute w-0.5 bg-white/20"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
                height: `${10 + Math.random() * 20}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Snow effect */}
      {isSnow && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/40 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Storm flash */}
      {isStorm && (
        <div className="absolute inset-0 bg-purple-900/10 animate-pulse pointer-events-none" />
      )}
    </div>
  );
}