
import React, { useState, useRef } from 'react';
import { Goal } from '../../types';
import ShareModal from '../shared/ShareModal';

interface GoalsPageProps {
  goals: Goal[];
  onUpdateGoal: (goal: Goal) => void;
  onDeleteGoal: (id: string) => void;
  onGoHome: () => void;
}

const GoalsPage: React.FC<GoalsPageProps> = ({ goals, onUpdateGoal, onDeleteGoal, onGoHome }) => {
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const sortedGoals = [...goals].sort((a, b) => b.createdAt - a.createdAt);
  const todoGoals = sortedGoals.filter(g => g.status === 'todo');
  const completedGoals = sortedGoals.filter(g => g.status === 'completed');

  const handleStatusChange = (goal: Goal, isCompleted: boolean) => {
    onUpdateGoal({ ...goal, status: isCompleted ? 'completed' : 'todo' });
  };

  const GoalItem: React.FC<{ goal: Goal }> = ({ goal }) => (
    <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md">
      <input
        type="checkbox"
        checked={goal.status === 'completed'}
        onChange={(e) => handleStatusChange(goal, e.target.checked)}
        className="mt-1 h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
      />
      <div className="flex-1">
        <p className={`text-base ${goal.status === 'completed' ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200 font-medium'}`}>
          {goal.text}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-400"></span>
          Từ: {goal.quizTitle}
          <span className="mx-1">•</span>
          {new Date(goal.createdAt).toLocaleDateString('vi-VN')}
        </p>
      </div>
      <button
        onClick={() => onDeleteGoal(goal.id)}
        className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 rounded-full transition-colors"
        aria-label="Xóa mục tiêu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );

  return (
    <>
      <div ref={contentRef} className="animate-fade-in max-w-4xl mx-auto">
        <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">Kế hoạch Sự nghiệp</h2>
            <p className="text-slate-600 dark:text-slate-400">Biến những hiểu biết thành hành động cụ thể.</p>
        </div>
        
        {goals.length === 0 ? (
          <div className="text-center bg-slate-50 dark:bg-slate-800/50 p-12 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            </div>
            <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">Bạn chưa có mục tiêu nào</p>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">Hãy hoàn thành các bài trắc nghiệm và sử dụng tính năng "Thêm vào kế hoạch" để xây dựng lộ trình phát triển.</p>
            <button
              onClick={onGoHome}
              className="bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md"
            >
              Khám phá ngay
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-1">
            {/* Todo Section */}
            <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-700/50">
              <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Cần thực hiện ({todoGoals.length})
              </h3>
              {todoGoals.length > 0 ? (
                <div className="space-y-3">{todoGoals.map(goal => <GoalItem key={goal.id} goal={goal} />)}</div>
              ) : (
                <div className="text-center py-8 text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                    <p>Tuyệt vời! Bạn đã hoàn thành tất cả mục tiêu hiện tại.</p>
                </div>
              )}
            </div>
            
            {/* Completed Section */}
            {completedGoals.length > 0 && (
                <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-100 dark:border-green-900/30">
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Đã hoàn thành ({completedGoals.length})
                </h3>
                <div className="space-y-3">{completedGoals.map(goal => <GoalItem key={goal.id} goal={goal} />)}</div>
                </div>
            )}
          </div>
        )}
      </div>
      
      {goals.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShareModalOpen(true)}
            className="px-6 py-2.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-2 transition-all hover:bg-slate-100 dark:hover:bg-slate-600 mx-auto shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Chia sẻ Kế hoạch
          </button>
        </div>
      )}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title="Kế hoạch Sự nghiệp của tôi trên PathAI"
        contentRef={contentRef}
      />
    </>
  );
};

export default GoalsPage;
