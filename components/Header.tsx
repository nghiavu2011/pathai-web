
import React from 'react';
import { Step, UserData } from '../types';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  currentStep: number;
  steps: Step[];
  theme: string;
  toggleTheme: () => void;
  showProgress: boolean;
  onGoHome: () => void;
  userData: UserData | null;
  onViewHistory: () => void;
  onViewGoals: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentStep, steps, theme, toggleTheme, showProgress, onGoHome, userData, onViewHistory, onViewGoals, onLogout }) => {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4 md:px-0">
      <div className="container mx-auto max-w-6xl">
        <div className="glass-card bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-full px-6 py-3 flex items-center justify-between border border-white/40 dark:border-slate-700/50 shadow-soft transition-all duration-500">
          <button 
            onClick={onGoHome} 
            className="flex items-center space-x-3 group transition-transform active:scale-95"
            aria-label="Quay về trang chủ"
          >
             <div className="w-10 h-10 bg-sage-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-sage-200 group-hover:rotate-12 transition-transform duration-500">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
             </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 hidden sm:block">
              PathAI
            </h1>
          </button>

          <div className="flex items-center space-x-2">
             {!showProgress && (
              <div className="flex bg-slate-100/50 dark:bg-slate-900/40 p-1 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                <button 
                  onClick={onViewGoals}
                  className="p-2.5 rounded-full text-slate-500 hover:bg-white hover:text-sage-500 dark:text-slate-400 dark:hover:bg-slate-800 transition-all"
                  title="Kế hoạch của tôi"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </button>
                <button 
                  onClick={onViewHistory}
                  className="p-2.5 rounded-full text-slate-500 hover:bg-white hover:text-sage-500 dark:text-slate-400 dark:hover:bg-slate-800 transition-all"
                  title="Lịch sử chiêm nghiệm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            )}
            
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>
            
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            
            {userData && (
              <div className="flex items-center ml-2 space-x-2">
                  <div className="hidden md:block text-right">
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{userData.fullName}</p>
                  </div>
                  {userData.avatarUrl ? (
                      <img src={userData.avatarUrl} alt="User" className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-600" />
                  ) : (
                      <div className="w-8 h-8 rounded-full bg-sage-100 text-sage-600 flex items-center justify-center font-bold text-xs">
                          {userData.fullName.charAt(0)}
                      </div>
                  )}
                  <button 
                    onClick={onLogout} 
                    className="p-2 rounded-full text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 transition-colors"
                    title="Đăng xuất"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
              </div>
            )}
          </div>
        </div>

        {showProgress && (
          <div className="mt-4 px-6 animate-slow-fade">
             <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-[10px] font-bold text-sage-600 dark:text-sage-400 uppercase tracking-[0.2em]">
                    Chặng {currentStep + 1} • {steps[currentStep]?.title}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                    {Math.round(((currentStep + 1) / steps.length) * 100)}% hoàn thành
                </span>
            </div>
            <div className="h-1 bg-white/30 dark:bg-slate-800/30 rounded-full overflow-hidden backdrop-blur-md">
                <div 
                    className="h-full bg-sage-500 transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min(100, ((currentStep + 1) / steps.length) * 100)}%` }}
                ></div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
