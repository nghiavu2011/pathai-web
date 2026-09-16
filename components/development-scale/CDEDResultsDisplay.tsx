
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

  const systemInstruction = `Bạn là Trợ lý AI Tham vấn Học tập & Hướng nghiệp PathAI, hỗ trợ học sinh khám phá mức độ sẵn sàng nghề nghiệp (Career Readiness). Dựa trên kết quả tự đánh giá, hãy giúp học sinh nhận diện các cơ hội phát triển kỹ năng thực tế, gợi ý các bước trải nghiệm học tập và rèn luyện phù hợp cho học sinh lớp 9-12. Không khẳng định ấn định tương lai. Kết quả: ${JSON.stringify(results)}`;
  const initialMessage = `Chào ${userData?.fullName || 'bạn'}, kết quả đánh giá mức độ sẵn sàng nghề nghiệp đang ở mức **${classification?.level}**. Đây là bản đồ gợi ý các nhóm kỹ năng bạn có thể tiếp tục trau dồi trong những năm học tới. Bạn có muốn cùng mình lên kế hoạch rèn luyện các kỹ năng thực tế không?`;

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
