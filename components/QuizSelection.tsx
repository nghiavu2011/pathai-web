import React from 'react';
import { AVAILABLE_QUIZZES } from '../constants';
import QuizCardIcon from './QuizCardIcon';

interface QuizSelectionProps {
  onSelectQuiz: (id: string) => void;
  onOpenInfo: (id: string) => void;
  categoryFilter?: string[];
}

const QuizSelection: React.FC<QuizSelectionProps> = ({ onSelectQuiz, onOpenInfo, categoryFilter }) => {
  const filteredQuizzes = categoryFilter 
    ? AVAILABLE_QUIZZES.filter(q => categoryFilter.includes(q.id))
    : AVAILABLE_QUIZZES;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredQuizzes.map((quiz, index) => {
        const isAvailable = quiz.isAvailable !== false;
        return (
          <div 
            key={quiz.id} 
            className={`group relative bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-xl transition-all duration-500 ease-out animate-slide-up overflow-hidden flex flex-col items-start h-full ${!isAvailable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-1'}`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => isAvailable && onSelectQuiz(quiz.id)}
          >
            {/* Top Section: Icon & Info Button */}
            <div className="w-full flex justify-between items-start mb-6 z-10">
              <div className="w-16 h-16 bg-sage-50 dark:bg-slate-700/50 rounded-2xl flex items-center justify-center text-sage-600 dark:text-sage-400 group-hover:bg-sage-100 dark:group-hover:bg-slate-700 transition-colors duration-500 shadow-inner-soft">
                 <div className="transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <QuizCardIcon quizId={quiz.id} />
                 </div>
              </div>
              
              {isAvailable && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenInfo(quiz.id);
                  }}
                  className="p-2 text-slate-300 hover:text-sage-600 dark:text-slate-600 dark:hover:text-sage-400 transition-colors rounded-full hover:bg-sage-50 dark:hover:bg-slate-800"
                  aria-label="Thông tin chi tiết"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Title Section - Always Visible */}
            <h3 className="font-display font-bold text-2xl text-slate-800 dark:text-slate-100 leading-tight mb-2 group-hover:text-sage-700 dark:group-hover:text-sage-400 transition-colors z-10">
                {quiz.title}
            </h3>

            {/* Description & Action - Hidden by default, Slide down on hover */}
            <div className="relative w-full z-10">
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                    <div className="overflow-hidden">
                        <div className="pt-4 pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light mb-6">
                                {quiz.description}
                            </p>
                            <button
                                disabled={!isAvailable}
                                className={`w-full py-3 px-6 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                                    isAvailable 
                                    ? 'bg-sage-50 text-sage-700 hover:bg-sage-600 hover:text-white dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-sage-600'
                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                }`}
                            >
                                {isAvailable ? 'Chiêm nghiệm ngay' : 'Sắp ra mắt'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Background Element */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-sage-50 to-transparent dark:from-slate-700/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizSelection;