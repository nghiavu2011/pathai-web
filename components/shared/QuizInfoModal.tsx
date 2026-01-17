
import React, { useEffect } from 'react';
import { Introduction } from '../../types';

interface QuizInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  introduction: Introduction | null;
}

const QuizInfoModal: React.FC<QuizInfoModalProps> = ({ isOpen, onClose, introduction }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !introduction) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl mx-auto relative transform transition-transform duration-300 animate-scale-in flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start sticky top-0 bg-white dark:bg-slate-800 rounded-t-xl z-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 pr-4">
              {introduction.title}
            </h2>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mt-1 uppercase tracking-wide">
              Thông tin chi tiết
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors flex-shrink-0"
            aria-label="Đóng"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {/* Purpose */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mục đích
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {introduction.main_description}
            </p>
          </div>

          {/* Theory */}
          {introduction.theory_details && (
            <div className="mb-8 bg-slate-50 dark:bg-slate-700/30 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {introduction.theory_details.title}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                {introduction.theory_details.content}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 italic">
                Nguồn: {introduction.theory_details.source}
              </p>
            </div>
          )}

          {/* Guidance Summary */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Cách thực hiện
            </h3>
            <ul className="space-y-2">
              {introduction.guidance.during.map((item, index) => (
                <li key={index} className="flex items-start text-sm text-slate-600 dark:text-slate-300">
                  <span className="mr-2 text-blue-500">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-100 dark:border-amber-800/50 text-sm text-amber-800 dark:text-amber-200">
                <strong>Lưu ý:</strong> {introduction.guidance.note}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-b-xl flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-lg transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizInfoModal;
