'use client';

import { useEffect, useState } from 'react';

const SolarSystem = () => {
  const [stars, setStars] = useState<Array<{ id: number; left: string; top: string; delay: string }>>([]);

  useEffect(() => {
    // Create stars
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="solar-system">
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay
          }}
        />
      ))}

      {/* Sun */}
      <div className="sun" />

      {/* Mercury */}
      <div className="orbit mercury-orbit">
        <div className="planet mercury" />
      </div>

      {/* Venus */}
      <div className="orbit venus-orbit">
        <div className="planet venus" />
      </div>

      {/* Earth */}
      <div className="orbit earth-orbit">
        <div className="planet earth" />
      </div>

      {/* Mars */}
      <div className="orbit mars-orbit">
        <div className="planet mars" />
      </div>
    </div>
  );
};

export default SolarSystem; 