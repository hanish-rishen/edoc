"use client";

import React, { useState, useEffect } from 'react';

const RouteLoader = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount + 1) % 101);
    }, 35); // Reduced from 50ms to 40ms for slightly faster updates

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <style jsx>{`
        .loader {
          display: inline-flex;
          border: 10px solid #000;
          border-radius: 5px;
        }
        .loader::before,
        .loader::after {
          content: "0 1 2 3 4 5 6 7 8 9 0";
          font-size: 30px;
          font-family: monospace;
          font-weight: bold;
          line-height: 1em;
          height: 1em;
          width: 1.2ch;
          text-align: center;
          outline: 1px solid #000;
          color: #0000;
          text-shadow: 0 0 0 #000;
          overflow: hidden; 
          animation: l4 1.8s infinite linear; // Reduced from 2s to 1.8s for slightly faster animation
        }
        .loader::before {
          animation-duration: 3.6s; // Reduced from 4s to 3.6s for slightly faster animation
        }
        @keyframes l4 {
          100% {text-shadow:0 var(--t,-10em) 0 #000}
        }
      `}</style>
      <div className="loader"></div>
      <div className="ml-4 text-2xl font-bold">{count}%</div>
    </div>
  );
};

export default RouteLoader;