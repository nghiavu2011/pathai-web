import React from 'react';

interface RatingScaleProps {
  options: number[];
  startLabel: string;
  endLabel: string;
  selectedValue?: number;
  onChange: (value: number) => void;
}

const RatingScale: React.FC<RatingScaleProps> = ({ options, startLabel, endLabel, selectedValue, onChange }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center space-x-2 sm:space-x-4">
        {options.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 transition-all duration-200 transform focus:outline-none focus:ring-4 focus:ring-opacity-50 ${selectedValue === value
                ? 'bg-primary-blue text-white border-primary-blue scale-125 shadow-xl ring-4 ring-blue-300 dark:ring-blue-700/50 z-10'
                : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-500 text-slate-600 dark:text-slate-300 hover:border-primary-blue hover:text-primary-blue dark:hover:border-primary-blue dark:hover:text-primary-blue hover:scale-110'
              }`}
            aria-pressed={selectedValue === value}
            aria-label={`Chọn mức độ ${value}`}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="flex justify-between w-full max-w-sm mt-3 px-1">
        <span className="text-xs text-neutral-500 dark:text-slate-400">{startLabel}</span>
        <span className="text-xs text-neutral-500 dark:text-slate-400">{endLabel}</span>
      </div>
    </div>
  );
};

export default RatingScale;