
import React from 'react';
import { GritResults, Answers, UserData } from '../../types';
import { GRIT_CLASSIFICATION, GRIT_CAREER_SUGGESTIONS } from '../../constants/gritScale';
import BaseResultPage from '../shared/BaseResultPage';

interface GritResultsDisplayProps {
  results: GritResults;
  answers: Answers;
  onGoHome: () => void;
  onBackToHistory?: () => void;
  userData: UserData | null;
  quizId: string;
  quizTitle: string;
  onAddGoal: (goal: any) => void;
  theme: string;
}

const GritResultsDisplay: React.FC<GritResultsDisplayProps> = (props) => {
  const { results, userData } = props;

  const gritClassification = GRIT_CLASSIFICATION.find(c => results.grit >= c.range[0] && results.grit <= c.range[1]);
  const careerSuggestion = GRIT_CAREER_SUGGESTIONS.find(s => s.level.includes(gritClassification?.level || ''));
  
  const resultsSummary = `Điểm Bền chí (Grit) tổng thể của bạn là **${results.grit.toFixed(1)}/5.0**, ở mức **${gritClassification?.level}**. Điều này cho thấy bạn là người **${gritClassification?.description}**. Điểm số này được tổng hợp từ hai yếu tố: **Sự kiên trì nỗ lực (${results.effort.toFixed(1)})** và **Sự ổn định đam mê (${results.interest.toFixed(1)})**.`;

  const systemInstruction = `Bạn là một chuyên gia về tâm lý học thành công và phát triển cá nhân, am hiểu về Thang đo Bền chí (Grit Scale) của Angela Duckworth. Dựa trên kết quả của người dùng, hãy giải thích ý nghĩa, đưa ra các chiến lược cụ thể để cải thiện sự bền bỉ và đam mê, đồng thời gợi ý môi trường làm việc phù hợp. Kết quả của người dùng là: ${JSON.stringify(results)}`;
  const initialMessage = `Xin chào ${userData?.fullName || 'bạn'}, điểm Bền chí của bạn là **${results.grit.toFixed(1)}**, ở mức **${gritClassification?.level}**. Đây là một chỉ số quan trọng cho thành công dài hạn. Bạn có muốn tìm hiểu cách để rèn luyện sự bền bỉ hoặc khám phá môi trường nào sẽ giúp bạn phát huy tốt nhất phẩm chất này không?`;
  
  const newsQuery = "bài viết về cách rèn luyện sự bền bỉ và đam mê trong công việc và học tập";

  return (
    <BaseResultPage
      {...props}
      title={props.quizTitle}
      analysisContent={
        <>
            <p className="mb-6">{resultsSummary.replace(/\*\*/g, '')}</p>
            {careerSuggestion && (
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Môi trường phù hợp:</strong> {careerSuggestion.environment}.</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2"><strong>Hướng phát triển:</strong> {careerSuggestion.development}.</p>
                </div>
            )}
        </>
      }
      renderCharts={() => (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700/50">
                <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">Kiên trì Nỗ lực</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">{results.effort.toFixed(1)}<span className="text-lg">/5.0</span></p>
            </div>
            <div className="p-4 bg-teal-50 dark:bg-teal-900/30 rounded-lg border border-teal-200 dark:border-teal-700/50">
                <p className="text-sm font-semibold text-teal-800 dark:text-teal-300">Đam mê Ổn định</p>
                <p className="text-3xl font-bold text-teal-600 dark:text-teal-400 mt-1">{results.interest.toFixed(1)}<span className="text-lg">/5.0</span></p>
            </div>
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-200 dark:border-indigo-700/50">
                <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-300">Bền chí Tổng thể</p>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{results.grit.toFixed(1)}<span className="text-lg">/5.0</span></p>
            </div>
        </div>
      )}
      systemInstruction={systemInstruction}
      initialMessage={initialMessage}
      newsQuery={newsQuery}
      newsTitle="Bài viết về rèn luyện Bền chí"
      chatbotPrompts={["Làm sao để tăng điểm bền chí?", "Điểm đam mê của tôi có ý nghĩa gì?", "Nghề nào cần sự bền bỉ cao?"]}
    />
  );
};

export default GritResultsDisplay;
