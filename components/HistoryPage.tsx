import React from 'react';
import { QuizHistoryEntry } from '../types';
import QuizCardIcon from './QuizCardIcon';

interface HistoryPageProps {
  history: QuizHistoryEntry[];
  onViewResult: (entry: QuizHistoryEntry) => void;
  onDeleteResult: (id: string) => void;
  onGoHome: () => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ history, onViewResult, onDeleteResult, onGoHome }) => {
  const sortedHistory = [...history].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 text-center mb-4">Lịch sử làm bài</h2>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-10">Xem lại kết quả các bài trắc nghiệm bạn đã hoàn thành.</p>
      
      {sortedHistory.length === 0 ? (
        <div className="text-center bg-slate-50 dark:bg-slate-800/50 p-8 rounded-lg border border-slate-200 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400 mb-6">Bạn chưa có kết quả nào được lưu. Hãy bắt đầu khám phá ngay!</p>
          <button
            onClick={onGoHome}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Về trang chủ
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedHistory.map(entry => (
            <div 
              key={entry.id}
              className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between flex-wrap gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="hidden sm:block">
                  <QuizCardIcon quizId={entry.quizId} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{entry.quizTitle}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Ngày làm: {new Date(entry.timestamp).toLocaleString('vi-VN')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => onViewResult(entry)}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md text-sm"
                >
                  Xem lại kết quả
                </button>
                <button
                  onClick={() => onDeleteResult(entry.id)}
                  className="p-2 text-slate-500 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/50 dark:hover:text-red-400 rounded-full transition-colors"
                  aria-label="Xóa kết quả"
                  title="Xóa kết quả"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;