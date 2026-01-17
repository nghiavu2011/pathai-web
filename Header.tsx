import React from 'react';
import { Step, UserData } from './types';
import ThemeToggle from './components/ThemeToggle';

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
    <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-20 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={onGoHome} 
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue dark:focus:ring-offset-slate-800 rounded-lg p-1 -ml-1 transition-transform transform hover:scale-105"
            aria-label="Quay về trang chủ"
          >
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M16.998 19.505C17 17.02 17.5 15.505 18.5 14.505C19.5 13.505 21 13.005 21 13.005" stroke="#0057FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.00195 4.5C7 6.985 6.5 8.5 5.5 9.5C4.5 10.5 3 11 3 11" stroke="#0057FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12.005C14.7614 12.005 17 9.76641 17 7.00498C17 4.24355 14.7614 2.00498 12 2.00498C9.23858 2.00498 7 4.24355 7 7.00498C7 9.76641 9.23858 12.005 12 12.005Z" stroke="#0057FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22.005C14.7614 22.005 17 19.7664 17 17.005C17 14.2436 14.7614 12.005 12 12.005C9.23858 12.005 7 14.2436 7 17.005C7 19.7664 9.23858 22.005 12 22.005Z" stroke="#0057FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-slate-100">
              PathAI
            </h1>
          </button>
          <div className="hidden lg:flex items-center space-x-2">
            <p className="text-sm text-neutral-500 dark:text-slate-400 font-medium mr-4">
              AI khai mở lối đi, bạn vững bước tương lai.
            </p>
             {!showProgress && (
              <>
                <button 
                  onClick={onViewGoals}
                  className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 transition-colors"
                  aria-label="Kế hoạch của tôi"
                  title="Kế hoạch của tôi"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </button>
                <button 
                  onClick={onViewHistory}
                  className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 transition-colors"
                  aria-label="Xem lịch sử"
                  title="Xem lịch sử"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </>
            )}
            <button onClick={onLogout} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 transition-colors" aria-label="Đăng xuất" title="Đăng xuất">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
           <div className="lg:hidden flex items-center space-x-1">
            {!showProgress && (
               <>
                <button 
                  onClick={onViewGoals}
                  className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 transition-colors"
                  aria-label="Kế hoạch của tôi"
                  title="Kế hoạch của tôi"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </button>
                <button 
                  onClick={onViewHistory}
                  className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 transition-colors"
                  aria-label="Xem lịch sử"
                  title="Xem lịch sử"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </>
            )}
            <button onClick={onLogout} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 transition-colors" aria-label="Đăng xuất" title="Đăng xuất">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
        {showProgress && (
          <div className="mt-4 overflow-x-auto pb-2">
            <div className="relative flex items-center min-w-max">
              {/* Background Line */}
              <div className="absolute top-1/2 -translate-y-1/2 h-1 w-full -mt-5 bg-slate-200 dark:bg-slate-700">
                 <div className="h-full bg-gradient-to-r from-[#0057FF] to-[#6C63FF] transition-all duration-500"
                   style={{ width: `${Math.min(100, (currentStep / (steps.length - 1)) * 100)}%` }}>
                </div>
              </div>

              {/* Steps */}
              {steps.map((step, index) => {
                const isResultStep = step.title === 'Kết quả';
                const userInitial = userData?.fullName ? userData.fullName.charAt(0).toUpperCase() : null;
                const isActive = currentStep === step.id;

                return (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center z-10">
                      <div
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-bold transition-all duration-300 ${
                          currentStep > step.id
                            ? 'bg-gradient-to-br from-[#0057FF] to-[#6C63FF] text-white'
                            : isActive
                            ? 'bg-primary-blue text-white ring-4 ring-blue-200 dark:ring-blue-500/50 scale-110'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {isResultStep && isActive && userInitial 
                          ? userInitial 
                          : currentStep > step.id 
                          ? '✓' 
                          : step.id + 1}
                      </div>
                      <p className={`mt-2 text-center text-xs md:text-sm whitespace-nowrap ${currentStep >= step.id ? 'font-semibold text-neutral-900 dark:text-slate-200' : 'text-neutral-500 dark:text-slate-400'}`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex-auto" />
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
