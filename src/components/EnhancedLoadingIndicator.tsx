import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface EnhancedLoadingIndicatorProps {
  value: number;
  duration: number;
}

const thinkingStates = [
  "Analyzing code...",
  "Processing syntax...",
  "Evaluating logic...",
  "Optimizing structure...",
  "Generating feedback..."
];

const EnhancedLoadingIndicator: React.FC<EnhancedLoadingIndicatorProps> = ({ value, duration }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [thinkingState, setThinkingState] = useState(thinkingStates[0]);
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
        setThinkingState(thinkingStates[Math.floor(easedProgress * (thinkingStates.length - 1))]);
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCurrentValue(value);
        setThinkingState(thinkingStates[thinkingStates.length - 1]);
      }
    };

    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.5, repeat: Infinity },
    });

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      controls.stop();
    };
  }, [value, duration, controls]);

  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={controls}
        className="text-4xl font-bold mb-2"
      >
        {currentValue.toLocaleString()} ms
      </motion.div>
      <div className="text-lg text-gray-600 dark:text-gray-400">
        {thinkingState}
      </div>
    </div>
  );
};

export default EnhancedLoadingIndicator;