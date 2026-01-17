
import React from 'react';
import { WheelResults, Answers, UserData, WheelCategoryKey } from '../../types';
import { WHEEL_LABELS } from '../../constants/wheelOfLife';
import RadarChart from '../shared/RadarChart';
import BaseResultPage from '../shared/BaseResultPage';

interface WheelOfLifeResultsDisplayProps {
  results: WheelResults;
  answers: Answers;
  onGoHome: () => void;
  onBackToHistory?: () => void;
  userData: UserData | null;
  quizId: string;
  quizTitle: string;
  onAddGoal: (goal: any) => void;
  theme: string;
}

const WheelOfLifeResultsDisplay: React.FC<WheelOfLifeResultsDisplayProps> = (props) => {
  const { results, userData } = props;

  const radarChartData = Object.keys(results).map((key) => ({
    axis: WHEEL_LABELS[key as WheelCategoryKey],
    value: (results[key as WheelCategoryKey] / 5) * 100, // Normalize to 100
  }));

  // Find lowest score
  const sortedScores = Object.entries(results).sort(([,a], [,b]) => Number(a) - Number(b));
  const lowestArea = sortedScores[0];
  const highestArea = sortedScores[sortedScores.length - 1];

  const resultsSummary = `Bức tranh toàn cảnh cho thấy bạn đang rất hài lòng với khía cạnh **${WHEEL_LABELS[highestArea[0] as WheelCategoryKey]}** (${Number(highestArea[1]).toFixed(1)}/5.0). Tuy nhiên, khía cạnh **${WHEEL_LABELS[lowestArea[0] as WheelCategoryKey]}** (${Number(lowestArea[1]).toFixed(1)}/5.0) đang cần được quan tâm hơn để giúp bánh xe cuộc đời của bạn lăn tròn và êm ái.`;

  const systemInstruction = `Bạn là một Life Coach chuyên nghiệp. Dựa trên kết quả Bánh xe Cuộc đời (Wheel of Life) của người dùng, hãy phân tích sự mất cân bằng, chỉ ra rủi ro nếu bỏ bê khía cạnh điểm thấp nhất (${WHEEL_LABELS[lowestArea[0] as WheelCategoryKey]}), và gợi ý hành động cụ thể để cải thiện. Kết quả: ${JSON.stringify(results)}`;
  const initialMessage = `Chào ${userData?.fullName || 'bạn'}, nhìn vào Bánh xe Cuộc đời của bạn, tôi thấy khía cạnh **${WHEEL_LABELS[lowestArea[0] as WheelCategoryKey]}** đang cần thêm sự chú ý. Cân bằng không có nghĩa là chia đều thời gian, mà là sự hài lòng trong từng khía cạnh. Bạn có muốn thảo luận về cách cải thiện mảng này mà không ảnh hưởng đến các mảng khác không?`;

  const newsQuery = `cách cân bằng cuộc sống và cải thiện khía cạnh ${WHEEL_LABELS[lowestArea[0] as WheelCategoryKey]}`;

  return (
    <BaseResultPage
      {...props}
      title={props.quizTitle}
      analysisContent={resultsSummary}
      renderCharts={() => (
        <>
            <div className="mb-6">
              <RadarChart data={radarChartData} color="rose" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(results).map(([key, score]) => (
                    <div key={key} className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded border border-slate-200 dark:border-slate-700 text-center">
                        <p className="text-xs font-semibold text-slate-50 dark:text-slate-400">{WHEEL_LABELS[key as WheelCategoryKey]}</p>
                        <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{Number(score).toFixed(1)}</p>
                    </div>
                ))}
            </div>
        </>
      )}
      systemInstruction={systemInstruction}
      initialMessage={initialMessage}
      newsQuery={newsQuery}
      newsTitle="Lời khuyên để Cân bằng cuộc sống"
      chatbotPrompts={[`Làm sao để cải thiện ${WHEEL_LABELS[lowestArea[0] as WheelCategoryKey]}?`, `Tôi muốn cân bằng công việc và cuộc sống?`, `Kỹ năng quản lý tài chính cá nhân?`]}
    />
  );
};

export default WheelOfLifeResultsDisplay;
