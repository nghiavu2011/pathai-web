
import React, { useMemo } from 'react';
import { Results as HollandResults, Answers, UserData, CategoryKey } from '../../types';
import { RESULT_DETAILS } from '../../constants';
import AnimatedBar from '../shared/AnimatedBar';
import BaseResultPage from '../shared/BaseResultPage';

interface HollandResultsDisplayProps {
  results: HollandResults;
  answers: Answers;
  onGoHome: () => void;
  onBackToHistory?: () => void;
  userData: UserData | null;
  quizId: string;
  quizTitle: string;
  onAddGoal: (goal: any) => void;
  theme: string;
}

const HollandResultsDisplay: React.FC<HollandResultsDisplayProps> = (props) => {
  const { results, userData } = props;

  const sortedResults = useMemo(() => {
    return Object.entries(results)
      .map(([key, score]) => ({ key: key as CategoryKey, score }))
      .sort((a, b) => Number(b.score) - Number(a.score));
  }, [results]);

  const topThree = sortedResults.slice(0, 3);
  const topThreeCodes = topThree.map(r => r.key).join('');
  const topThreeNames = topThree.map(r => RESULT_DETAILS[r.key].name).join(', ');
  
  // Texts
  const analysisContent = `Mật mã Holland của bạn là **${topThreeCodes}**, cho thấy bạn nổi bật ở các nhóm: **${topThreeNames}**. Điều này gợi ý rằng bạn có thể phù hợp với môi trường làm việc kết hợp giữa các yếu tố liên quan đến các nhóm này.`;
  const systemInstruction = `Bạn là một chuyên gia tư vấn hướng nghiệp Holland (RIASEC). Phân tích kết quả: ${JSON.stringify(results)}. Đưa ra lời khuyên nghề nghiệp cụ thể.`;
  const initialMessage = `Xin chào ${userData?.fullName || 'bạn'}, mật mã Holland của bạn là **${topThreeCodes}**. Bạn có muốn tôi phân tích sâu hơn về các nhóm tính cách này và gợi ý nghề nghiệp phù hợp không?`;
  const topThreeNamesForSearch = topThree.map(r => RESULT_DETAILS[r.key].name.split('(')[0].trim()).join(', ');
  const newsQuery = `xu hướng và lời khuyên nghề nghiệp cho các nhóm sở thích ${topThreeNamesForSearch}`;

  return (
    <BaseResultPage
      {...props}
      analysisContent={
        <>
          <div className="prose prose-slate dark:prose-invert max-w-none mb-6">
             <p>{analysisContent}</p>
          </div>
          
          {/* Detailed Cards */}
          <div className="grid grid-cols-1 gap-4 mt-6">
            {topThree.map(({ key }) => (
              <div key={key} className="p-5 bg-white dark:bg-slate-800 rounded-lg border-l-4 border-blue-500 shadow-sm">
                <h4 className="font-bold text-lg text-blue-600 dark:text-blue-400 flex items-center">
                  {RESULT_DETAILS[key].name}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">{RESULT_DETAILS[key].description}</p>
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gợi ý nghề nghiệp:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {RESULT_DETAILS[key].careers.map((c, idx) => (
                      <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      }
      renderCharts={() => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedResults.map(result => (
            <AnimatedBar key={result.key} label={RESULT_DETAILS[result.key].name} score={result.score} maxScore={25} />
          ))}
        </div>
      )}
      systemInstruction={systemInstruction}
      initialMessage={initialMessage}
      newsQuery={newsQuery}
      chatbotPrompts={[`${topThreeCodes} có ý nghĩa gì?`, `Nghề nào phù hợp với tôi?`, `Phát triển nhóm ${sortedResults[0].key} thế nào?`]}
    />
  );
};

export default HollandResultsDisplay;
