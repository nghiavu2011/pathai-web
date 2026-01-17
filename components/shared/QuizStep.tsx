
import React from 'react';
import { Answers, Question } from '../../types';
import RatingScale from './RatingScale';

interface Category {
  title: string;
  // FIX: Made subtitle optional to accommodate different quiz data structures.
  subtitle?: string;
  questions: Question[];
}

interface QuizStepProps {
  category: Category;
  answers: Answers;
  onAnswerChange: (questionId: string, value: number) => void;
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
  allAnswered: boolean;
  ratingOptions: number[];
  ratingLabels: { start: string, end: string };
}

const QuizStep: React.FC<QuizStepProps> = ({ 
  category, 
  answers, 
  onAnswerChange, 
  onNext, 
  onBack, 
  isLastStep, 
  allAnswered,
  ratingOptions,
  ratingLabels
}) => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-slate-100">{category.title}</h2>
        {/* FIX: Conditionally render the subtitle as it's optional now. */}
        {category.subtitle && <p className="mt-2 text-neutral-500 dark:text-slate-400">{category.subtitle}</p>}
      </div>
      
      <div className="space-y-6">
        {category.questions.map((question, index) => (
          <div 
            key={question.id} 
            className="p-6 rounded-xl bg-white dark:bg-slate-800/60 shadow-md border border-slate-200 dark:border-slate-700/80 animate-card-fade-in-up" 
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <p className="font-semibold text-lg text-neutral-900 dark:text-slate-100 mb-5 text-left">
              <span className="text-primary-blue font-bold mr-2">{index + 1}.</span>{question.text}
            </p>
            <RatingScale
              options={ratingOptions}
              startLabel={ratingLabels.start}
              endLabel={ratingLabels.end}
              selectedValue={answers[question.id]}
              onChange={(value) => onAnswerChange(question.id, value)}
            />
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-between items-center">
        <button
          onClick={onBack}
          className="bg-white dark:bg-slate-700 text-primary-blue dark:text-slate-200 font-semibold py-2 px-5 rounded-xl border-2 border-primary-blue hover:bg-secondary-blue dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue/50"
        >
          Trở lại
        </button>
        <button
          onClick={onNext}
          disabled={!allAnswered}
          className={`font-semibold text-white py-2 px-5 rounded-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-4 ${
            allAnswered
              ? 'bg-primary-blue hover:bg-[#0042D9] focus:ring-blue-300 dark:focus:ring-blue-800'
              : 'bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
          }`}
        >
          {isLastStep ? 'Hoàn thành & Xem kết quả' : 'Tiếp tục'}
        </button>
      </div>
      {!allAnswered && <p className="text-center mt-4 text-sm text-red-500 dark:text-red-400">Vui lòng trả lời tất cả các câu hỏi để tiếp tục.</p>}
    </div>
  );
};

export default QuizStep;
