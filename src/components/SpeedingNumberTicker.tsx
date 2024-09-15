import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface SpeedingNumberTickerProps {
  value: number;
  duration: number;
}

const SpeedingNumberTicker: React.FC<SpeedingNumberTickerProps> = ({ value, duration }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        const easedProgress = easeInOutCubic(progress);
        setCurrentValue(Math.floor(easedProgress * value));
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCurrentValue(value);
      }
    };

    controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: duration / 5, repeat: Infinity },
    });

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      controls.stop();
    };
  }, [value, duration, controls]);

  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  return (
    <motion.span animate={controls}>
      {currentValue.toLocaleString()}
    </motion.span>
  );
};

export default SpeedingNumberTicker;