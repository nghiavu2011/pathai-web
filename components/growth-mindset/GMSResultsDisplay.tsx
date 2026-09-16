
import React, { useMemo } from 'react';
import { GrowthMindsetResults, Answers, UserData, GrowthMindsetCategoryKey } from '../../types';
import { GMS_RESULT_DETAILS, GMS_CLASSIFICATION } from '../../constants/growthMindset';
import AnimatedBar from '../shared/AnimatedBar';
import BaseResultPage from '../shared/BaseResultPage';

interface GMSResultsDisplayProps {
  results: GrowthMindsetResults;
  answers: Answers;
  onGoHome: () => void;
  onBackToHistory?: () => void;
  userData: UserData | null;
  quizId: string;
  quizTitle: string;
  onAddGoal: (goal: any) => void;
  theme: string;
}

const GMSResultsDisplay: React.FC<GMSResultsDisplayProps> = (props) => {
  const { results, userData } = props;

  const classification = useMemo(() => {
    return GMS_CLASSIFICATION.find(c => results.growth_mindset >= c.range[0] && results.growth_mindset <= c.range[1]);
  }, [results.growth_mindset]);

  const resultsSummary = `Điểm Tư duy Phát triển tổng thể của bạn là **${results.growth_mindset.toFixed(1)}/5.0**, ở mức **${classification?.level}**. Điều này cho thấy bạn là người **${classification?.description}**. Tư duy này ảnh hưởng trực tiếp đến cách bạn đối mặt thử thách và học hỏi.`;

  const systemInstruction = `Bạn là Trợ lý AI Tham vấn Học tập & Hướng nghiệp PathAI, áp dụng khung Tư duy Phát triển (Growth Mindset - Carol Dweck). Dựa trên kết quả tự đánh giá của học sinh, hãy giải thích ý nghĩa mang tính rèn luyện, gợi ý các chiến lược cụ thể để hình thành thói quen kiên trì, đón nhận thử thách và cải thiện qua quá trình học tập. Tuyệt đối không phán xét hay gắn nhãn cố định. Kết quả của học sinh: ${JSON.stringify(results)}`;
  const initialMessage = `Chào ${userData?.fullName || 'bạn'}, kết quả cho thấy bạn đang thể hiện mức độ tư duy phát triển **${classification?.level}**. Tư duy là thứ hoàn toàn có thể rèn luyện và mở rộng theo thời gian. Bạn có muốn cùng mình khám phá một số phương pháp học tập và vượt qua rào cản thử thách không?`;

  const newsQuery = `lợi ích và cách áp dụng tư duy phát triển (growth mindset) tại nơi làm việc`;

  return (
    <BaseResultPage
      {...props}
      title={props.quizTitle}
      analysisContent={resultsSummary}
      renderCharts={() => (
        <div className="space-y-4">
          {Object.entries(results.scores).map(([key, score]) => (
            <AnimatedBar key={key} label={GMS_RESULT_DETAILS[key as GrowthMindsetCategoryKey].name} score={score} maxScore={25} />
          ))}
        </div>
      )}
      systemInstruction={systemInstruction}
      initialMessage={initialMessage}
      newsQuery={newsQuery}
      newsTitle="Bài viết về Tư duy Phát triển"
      chatbotPrompts={["Làm sao để rèn luyện tư duy phát triển?", "Tư duy này giúp gì cho sự nghiệp?", "Sách nào hay về chủ đề này?"]}
    />
  );
};

export default GMSResultsDisplay;
