import React from 'react';
import { Introduction } from '../../types';

interface QuizIntroductionProps extends Introduction {
  onNext: () => void;
}

const QuizIntroduction: React.FC<QuizIntroductionProps> = ({ title, main_description, guidance, onNext, theory_details }) => {
  return (
    <div className="animate-slow-fade max-w-4xl mx-auto space-y-16 pb-20">
      <div className="text-center space-y-6">
        <div className="inline-block px-4 py-1.5 bg-sage-50 text-sage-600 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
            Hành trình thấu cảm
        </div>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-800 dark:text-slate-100 text-balance leading-tight">{title}</h2>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">{main_description}</p>
      </div>
      
      {theory_details && (
        <div className="p-10 md:p-16 glass-card rounded-[40px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sage-100/30 -mr-32 -mt-32 rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl font-bold text-sage-600 flex items-center">
                <div className="w-10 h-10 rounded-2xl bg-sage-50 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                {theory_details.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-light">{theory_details.content}</p>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 font-medium uppercase tracking-widest">
                Nguồn tham khảo • {theory_details.source}
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-10">
        <div className="p-10 rounded-[32px] bg-white/40 border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800">
          <h4 className="font-bold text-xl mb-6 text-slate-800 dark:text-slate-200">Trước khi bắt đầu</h4>
          <ul className="space-y-5">
            {guidance.before.map((item, index) => (
              <li key={index} className="flex items-start gap-4 text-slate-500 dark:text-slate-400">
                <div className="w-1.5 h-1.5 bg-sage-400 rounded-full mt-2.5 flex-shrink-0"></div>
                <span className="text-base font-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-10 rounded-[32px] bg-white/40 border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800">
          <h4 className="font-bold text-xl mb-6 text-slate-800 dark:text-slate-200">Trong không gian này</h4>
          <ul className="space-y-5">
            {guidance.during.map((item, index) => (
              <li key={index} className="flex items-start gap-4 text-slate-500 dark:text-slate-400">
                <div className="w-1.5 h-1.5 bg-healing-blue rounded-full mt-2.5 flex-shrink-0"></div>
                <span className="text-base font-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center pt-8 space-y-6">
        <button
          onClick={onNext}
          className="px-16 py-6 bg-sage-500 hover:bg-sage-600 text-white font-bold rounded-full shadow-2xl shadow-sage-200 transition-all transform hover:-translate-y-1 active:scale-95"
        >
          Bắt đầu tĩnh lặng & chiêm nghiệm
        </button>
        <p className="text-sm text-slate-400 max-w-lg mx-auto font-light leading-relaxed">{guidance.note}</p>
      </div>
    </div>
  );
};

export default QuizIntroduction;