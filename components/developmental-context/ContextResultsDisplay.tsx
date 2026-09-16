
import React from 'react';
import { ContextResults, Answers, UserData, ContextCategoryKey } from '../../types';
import { CONTEXT_RESULT_DETAILS, ATTACHMENT_STYLES } from '../../constants/developmentalContext';
import AnimatedBar from '../shared/AnimatedBar';
import BaseResultPage from '../shared/BaseResultPage';

interface ContextResultsDisplayProps {
  results: ContextResults;
  answers: Answers;
  onGoHome: () => void;
  onBackToHistory?: () => void;
  userData: UserData | null;
  quizId: string;
  quizTitle: string;
  onAddGoal: (goal: any) => void;
  theme: string;
}

const ContextResultsDisplay: React.FC<ContextResultsDisplayProps> = (props) => {
  const { results, userData } = props;

  // Determine Attachment Style Description
  const attachmentStyleKey = results.attachmentStyle === 'Secure' ? 'SECURE' 
                           : results.attachmentStyle === 'Anxious' ? 'ANXIOUS' 
                           : 'AVOIDANT';
  
  const attachmentDetails = ATTACHMENT_STYLES[attachmentStyleKey];

  const resultsSummary = `Hồ sơ cho thấy bạn có xu hướng **${attachmentDetails.label}**. Điều này có nghĩa là: ${attachmentDetails.description}
  
  Ngoài ra, chỉ số **Tự chủ** đạt **${results.scores[ContextCategoryKey.AUT].toFixed(1)}/5.0**, và mức độ **Ổn định Môi trường** đạt **${results.scores[ContextCategoryKey.ENV].toFixed(1)}/5.0**.`;

  const systemInstruction = `Bạn là Trợ lý AI Tham vấn Học tập & Hướng nghiệp PathAI. Dựa trên Hồ sơ Khám phá Nền tảng Cá nhân (Developmental Context Profile) của học sinh, hãy phân tích mang tính khám phá về cách xu hướng gắn bó (${results.attachmentStyle}) và mức độ tự chủ ảnh hưởng đến môi trường học tập, làm việc nhóm hoặc cách đối mặt thử thách. Đưa ra gợi ý mang tính xây dựng, rèn luyện kỹ năng, phi phán xét và không ấn định tương lai. Kết quả: ${JSON.stringify(results)}`;
  
  const initialMessage = `Chào ${userData?.fullName || 'bạn'}, hồ sơ cho thấy bạn có xu hướng **${attachmentDetails.label}**. Hiểu được đặc điểm này sẽ giúp bạn chủ động chọn môi trường học tập và làm việc nhóm phù hợp để phát huy năng lực. Bạn có muốn cùng mình khám phá các cách rèn luyện kỹ năng giao tiếp và thích ứng trong môi trường mới không?`;

  const newsQuery = `đặc điểm và lời khuyên nghề nghiệp cho người có kiểu gắn bó ${results.attachmentStyle} (attachment style)`;

  return (
    <BaseResultPage
      {...props}
      title={props.quizTitle}
      analysisContent={
        <>
            <p className="mb-6">{resultsSummary.replace(/\*\*/g, '')}</p>
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-xl">
                <h4 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-2">Kiểu Gắn bó (Attachment Style)</h4>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{attachmentDetails.label.split('(')[0]}</p>
            </div>
        </>
      }
      renderCharts={() => (
        <div className="space-y-4">
          {Object.entries(results.scores).map(([key, score]) => (
             key !== ContextCategoryKey.ATT && // Skip Attachment here as it's highlighted above
             <AnimatedBar key={key} label={CONTEXT_RESULT_DETAILS[key as ContextCategoryKey].name} score={score} maxScore={5} />
          ))}
        </div>
      )}
      systemInstruction={systemInstruction}
      initialMessage={initialMessage}
      newsQuery={newsQuery}
      newsTitle={`Bài viết về kiểu gắn bó ${attachmentDetails.label}`}
      chatbotPrompts={[`Làm sao để cải thiện sự tự tin?`, `Người gắn bó ${results.attachmentStyle} nên chọn nghề gì?`, `Cách xây dựng mối quan hệ tốt hơn?`]}
    />
  );
};

export default ContextResultsDisplay;
