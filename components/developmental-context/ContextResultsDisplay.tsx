
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

  const systemInstruction = `Bạn là một chuyên gia tâm lý học phát triển và hướng nghiệp. Dựa trên Hồ sơ Nền tảng (Developmental Context Profile) của người dùng, hãy phân tích sâu về mối liên hệ giữa kiểu gắn bó (${results.attachmentStyle}) và cách họ làm việc, lãnh đạo hoặc đối mặt với rủi ro. Hãy đưa ra lời khuyên nhẹ nhàng, mang tính chữa lành và xây dựng. Kết quả: ${JSON.stringify(results)}`;
  
  const initialMessage = `Chào ${userData?.fullName || 'bạn'}, hồ sơ cho thấy bạn có xu hướng **${attachmentDetails.label}**. Hiểu được điều này là chìa khóa để chọn môi trường làm việc giúp bạn cảm thấy an toàn và phát huy hết tiềm năng. Bạn có muốn tìm hiểu xem kiểu gắn bó này ảnh hưởng thế nào đến cách bạn làm việc nhóm hoặc đối mặt với áp lực không?`;

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
