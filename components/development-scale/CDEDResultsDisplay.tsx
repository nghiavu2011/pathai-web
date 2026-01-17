
import React, { useMemo } from 'react';
import { CRSResults, Answers, UserData, CRSCategoryKey } from '../../types';
import { CRS_RESULT_DETAILS, CRS_CLASSIFICATION } from '../../constants/developmentScale';
import AnimatedBar from '../shared/AnimatedBar';
import BaseResultPage from '../shared/BaseResultPage';

interface CRSResultsDisplayProps {
  results: CRSResults;
  answers: Answers;
  onGoHome: () => void;
  onBackToHistory?: () => void;
  userData: UserData | null;
  quizId: string;
  quizTitle: string;
  onAddGoal: (goal: any) => void;
  theme: string;
}

const CRSResultsDisplay: React.FC<CRSResultsDisplayProps> = (props) => {
  const { results, userData } = props;

  const classification = useMemo(() => {
    return CRS_CLASSIFICATION.find(c => results.average >= c.range[0] && results.average <= c.range[1]);
  }, [results.average]);

  const sortedScores = useMemo(() => {
    return (Object.keys(results.scores) as CRSCategoryKey[])
        .map(key => ({ key, score: results.scores[key] }))
        .sort((a, b) => b.score - a.score);
  }, [results.scores]);
  
  const strongestArea = sortedScores[0];
  const weakestArea = sortedScores[sortedScores.length - 1];

  const resultsSummary = `Mức độ Sẵn sàng Nghề nghiệp tổng thể của bạn là **${results.average.toFixed(1)}/5.0**, ở mức **${classification?.level}**. Điều này cho thấy bạn **${classification?.description}**. Lĩnh vực bạn tự tin nhất hiện tại là **${CRS_RESULT_DETAILS[strongestArea.key].name}**.`;

  const systemInstruction = `Bạn là một chuyên gia phát triển sự nghiệp, am hiểu về các mô hình sẵn sàng nghề nghiệp (Career Readiness). Dựa trên kết quả đánh giá của người dùng, hãy phân tích điểm mạnh, điểm cần cải thiện và đưa ra những lời khuyên, kế hoạch hành động cụ thể để giúp họ chuẩn bị tốt hơn cho thị trường lao động. Kết quả của người dùng: ${JSON.stringify(results)}`;
  const initialMessage = `Chào ${userData?.fullName || 'bạn'}, mức độ sẵn sàng nghề nghiệp của bạn đang ở mức **${classification?.level}**. Đây là một bản đồ giá trị giúp bạn biết mình cần tập trung vào đâu. Bạn có muốn thảo luận về cách cải thiện các kỹ năng hoặc lập một kế hoạch phát triển cụ thể không?`;

  const newsQuery = `cách cải thiện kỹ năng ${CRS_RESULT_DETAILS[weakestArea.key].name} cho sinh viên và người mới đi làm`;

  return (
    <BaseResultPage
      {...props}
      title={props.quizTitle}
      analysisContent={resultsSummary}
      renderCharts={() => (
        <div className="space-y-4">
          {Object.entries(results.scores).map(([key, score]) => (
            <AnimatedBar key={key} label={CRS_RESULT_DETAILS[key as CRSCategoryKey].name} score={score} maxScore={25} />
          ))}
        </div>
      )}
      systemInstruction={systemInstruction}
      initialMessage={initialMessage}
      newsQuery={newsQuery}
      newsTitle={`Cải thiện ${CRS_RESULT_DETAILS[weakestArea.key].name}`}
      chatbotPrompts={[`Làm sao để cải thiện kỹ năng ${CRS_RESULT_DETAILS[sortedScores[sortedScores.length - 1].key].name}?`, `Điểm mạnh của tôi là gì?`, `Tôi cần chuẩn bị gì thêm?`]}
    />
  );
};

export default CRSResultsDisplay;
