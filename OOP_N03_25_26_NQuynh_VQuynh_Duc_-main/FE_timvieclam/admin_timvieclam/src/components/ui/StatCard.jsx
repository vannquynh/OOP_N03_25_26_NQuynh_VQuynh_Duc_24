import { useState, useEffect } from 'react';

const StatCard = ({ title, value, icon, color, percentage, trend }) => {
  const [count, setCount] = useState(0);
  
  // Animation for counting up
  useEffect(() => {
    if (typeof value === 'number') {
      const animationDuration = 1000; // ms
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(animationDuration / frameDuration);
      const valueIncrement = value / totalFrames;
      
      let currentFrame = 0;
      
      const counter = setInterval(() => {
        currentFrame++;
        const newValue = Math.min(Math.round(currentFrame * valueIncrement), value);
        setCount(newValue);
        
        if (currentFrame === totalFrames) {
          clearInterval(counter);
        }
      }, frameDuration);
      
      return () => clearInterval(counter);
    } else {
      setCount(value);
    }
  }, [value]);
  
  const colorClasses = {
    blue: 'bg-primary-500 text-white',
    green: 'bg-success-500 text-white',
    orange: 'bg-warning-500 text-white',
    purple: 'bg-secondary-500 text-white',
  };
  
  const trendClasses = {
    up: 'text-success-500',
    down: 'text-error-500',
    neutral: 'text-gray-500',
  };
  
  const trendIcon = {
    up: '↑',
    down: '↓',
    neutral: '→',
  };
  
  return (
    <div className="card hover:shadow-lg p-6 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <div className={`p-3 rounded-full ${colorClasses[color] || colorClasses.blue}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-end space-x-1">
        <p className="text-2xl font-semibold">
          {typeof value === 'number' ? 
            new Intl.NumberFormat('en-US', { 
              style: value > 1000 ? 'currency' : 'decimal',
              currency: 'USD',
              maximumFractionDigits: 0,
            }).format(count) : 
            value
          }
        </p>
      </div>
      {percentage && (
        <div className="mt-2 flex items-center">
          <span className={`mr-1 ${trendClasses[trend]}`}>
            {trendIcon[trend]}
          </span>
          <span className={`text-sm ${trendClasses[trend]}`}>
            {percentage}%
          </span>
          <span className="text-sm text-gray-500 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;