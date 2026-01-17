
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

  const systemInstruction = `Bạn là một chuyên gia về tâm lý học, am hiểu sâu sắc về lý thuyết Tư duy Phát triển (Growth Mindset) của Carol Dweck. Dựa trên kết quả đánh giá của người dùng, hãy giải thích họ đang nghiêng về tư duy nào, và cung cấp các bài tập, chiến lược cụ thể để rèn luyện tư duy phát triển. Kết quả của người dùng: ${JSON.stringify(results)}`;
  const initialMessage = `Chào ${userData?.fullName || 'bạn'}, kết quả cho thấy bạn có tư duy phát triển ở mức **${classification?.level}**. Đây là nền tảng rất quan trọng cho sự thành công. Bạn có muốn tìm hiểu cách áp dụng và rèn luyện tư duy này trong học tập và công việc không?`;

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
