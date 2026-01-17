import React, { useState } from 'react';
import { UserData } from '../../types';
import Chatbot from './Chatbot';
import GoalSetting from '../goals/GoalSetting';
import UserProfileDisplay from './UserProfileDisplay';
import { usePdfGenerator } from '../../hooks/usePdfGenerator';
import LoadingSpinner from '../LoadingSpinner';
import ShareModal from './ShareModal';
import PdfFooter from './PdfFooter';
import NewsAndArticles from './NewsAndArticles';
import { renderMarkdown } from '../../utils/renderMarkdown';

interface BaseResultPageProps {
  title: string;
  quizId: string;
  results: any;
  userData: UserData | null;
  onGoHome: () => void;
  onBackToHistory?: () => void;
  onAddGoal: (goal: any) => void;
  theme: string;
  analysisContent: React.ReactNode;
  renderCharts: () => React.ReactNode;
  systemInstruction: string;
  initialMessage: string;
  newsQuery: string;
  newsTitle?: string;
  chatbotPrompts?: string[];
}

const BaseResultPage: React.FC<BaseResultPageProps> = ({
  title,
  quizId,
  results,
  userData,
  onGoHome,
  onBackToHistory,
  onAddGoal,
  theme,
  analysisContent,
  renderCharts,
  systemInstruction,
  initialMessage,
  newsQuery,
  newsTitle = "Tri thức dành riêng cho bạn",
  chatbotPrompts = []
}) => {
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const { contentRef, isGenerating, generatePdf, sharePdf } = usePdfGenerator(`${userData?.fullName || 'user'}-${quizId}`);
  const canSharePdf = typeof navigator.share === 'function';

  return (
    <>
      <div className="max-w-5xl mx-auto animate-slow-fade">
        <div 
          ref={contentRef} 
          className={`rounded-[40px] transition-all duration-700 ${
            !isGenerating 
              ? 'glass-card p-8 md:p-16 mb-12 shadow-2xl' 
              : 'bg-white p-20'
          }`}
        >
          {/* Header Section */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block px-4 py-1.5 bg-sage-50 text-sage-600 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
               Hành trình đã hoàn thành
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-800 mb-4 leading-tight text-balance">
              {title}
            </h1>
            <div className="flex items-center justify-center space-x-3 text-slate-400 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          <UserProfileDisplay userData={userData} />

          <div className="mt-16 space-y-12">
            <h3 className="text-3xl font-display font-bold text-slate-800 flex items-center gap-6">
              <span className="w-12 h-0.5 bg-sage-300"></span>
              Phân tích sâu từ PathAI
            </h3>
            
            {typeof analysisContent === 'string' ? (
               <div className="prose prose-slate max-w-none bg-sage-50/30 p-10 md:p-14 rounded-[32px] border border-sage-100/50 leading-relaxed text-slate-600 text-lg font-light">
                 {renderMarkdown(analysisContent)}
               </div>
            ) : (
               <div className="bg-sage-50/30 p-10 md:p-14 rounded-[32px] border border-sage-100/50">
                 {analysisContent}
               </div>
            )}

            <div className="py-12 border-y border-slate-100/50">
               <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-10 text-center">Bản đồ các chỉ số</h4>
               {renderCharts()}
            </div>
          </div>
          
          {isGenerating && <PdfFooter />}
        </div>
      </div>

      {!isGenerating && (
        <div className="max-w-5xl mx-auto pb-32">
          {/* Action Buttons */}
          <div className="flex justify-center flex-wrap items-center gap-6 mb-24">
              <button 
                onClick={onGoHome} 
                className="px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                Về Trang chủ
              </button>
              
              <button 
                onClick={() => setShareModalOpen(true)} 
                className="px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 transition-all border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-healing-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Lưu ảnh chia sẻ
              </button>
              
              <div className="flex shadow-2xl rounded-full overflow-hidden">
                <button
                    onClick={generatePdf}
                    className={`px-10 py-4 bg-sage-500 hover:bg-sage-600 text-white font-bold transition-all flex items-center gap-3 ${canSharePdf ? 'border-r border-sage-600' : ''}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Tải báo cáo PDF
                </button>
                {canSharePdf && (
                    <button onClick={sharePdf} className="px-6 py-4 bg-sage-500 hover:bg-sage-600 text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                    </button>
                )}
              </div>
          </div>

          <div className="space-y-24">
            <NewsAndArticles searchQuery={newsQuery} title={newsTitle} />
            <GoalSetting quizId={quizId} quizTitle={title} results={results} onAddGoal={onAddGoal} />
            <Chatbot systemInstruction={systemInstruction} initialMessage={initialMessage} suggestedPrompts={chatbotPrompts} />
          </div>
        </div>
      )}

      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setShareModalOpen(false)} 
        title={`Kết quả ${title}`} 
        contentRef={contentRef} 
      />
    </>
  );
};

export default BaseResultPage;