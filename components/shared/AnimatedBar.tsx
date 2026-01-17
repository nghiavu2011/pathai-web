import React, { useState, useEffect } from 'react';

interface AnimatedBarProps {
  label: string;
  score: number;
  maxScore: number;
}

const AnimatedBar: React.FC<AnimatedBarProps> = ({ label, score, maxScore }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWidth((score / maxScore) * 100);
    }, 300);

    return () => clearTimeout(timeout);
  }, [score, maxScore]);

  return (
    <div className="p-4 md:p-6 rounded-2xl bg-white/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-800">
        <div className="flex justify-between items-end mb-4">
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-base">{label}</h4>
            <div className="text-right">
                <span className="text-2xl font-bold text-sage-600 dark:text-sage-400">{score.toFixed(1)}</span>
                <span className="text-xs text-slate-400 ml-1 font-medium">/ {maxScore}</span>
            </div>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-1.5 overflow-hidden shadow-inner-soft">
            <div 
                className="bg-sage-500 h-full rounded-full transition-all duration-1500 ease-out shadow-sm" 
                style={{width: `${width}%`}}
            ></div>
        </div>
    </div>
  );
};

export default AnimatedBar;