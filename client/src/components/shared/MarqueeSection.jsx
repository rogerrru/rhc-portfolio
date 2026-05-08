import React from 'react';

const MarqueeSection = ({ text, repeat = 2 }) => (
  <div className="overflow-hidden whitespace-nowrap py-4 relative">
    <div className="flex animate-marquee">
      {Array.from({ length: repeat }, (_, i) => (
        <span key={i} className="text-5xl md:text-7xl font-extrabold tracking-wide mx-4">
          {Array.from({ length: 6 }, (__, j) => `${text} `).join('')}
        </span>
      ))}
    </div>
  </div>
);

export default MarqueeSection;
