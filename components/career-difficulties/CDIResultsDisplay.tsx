
import React, { useMemo } from 'react';
import { CDBResults, Answers, UserData, CDBBarrierKey } from '../../types';
import { CDB_RESULT_DETAILS, CDB_CLASSIFICATION } from '../../constants/careerDifficulties';
import AnimatedBar from '../shared/AnimatedBar';
import BaseResultPage from '../shared/BaseResultPage';

interface CDIResultsDisplayProps {
  results: CDBResults;
  answers: Answers;
  onGoHome: () => void;
  onBackToHistory?: () => void;
  userData: UserData | null;
  quizId: string;
  quizTitle: string;
  onAddGoal: (goal: any) => void;
  theme: string;
}

const CDIResultsDisplay: React.FC<CDIResultsDisplayProps> = (props) => {
  const { results, userData } = props;

  const sortedResults = useMemo(() => {
    return Object.entries(results)
      .map(([key, score]) => ({ key: key as CDBBarrierKey, score }))
      .sort((a, b) => Number(b.score) - Number(a.score));
  }, [results]);

  const mainBarrier = sortedResults[0];
  const getClassification = (score: number) => {
    return CDB_CLASSIFICATION.find(c => score >= c.range[0] && score <= c.range[1])?.level || 'Không xác định';
  };

  const resultsSummary = `Rào cản lớn nhất bạn đang gặp phải thuộc nhóm **${CDB_RESULT_DETAILS[mainBarrier.key].name}** với mức độ **${getClassification(mainBarrier.score)}**. Điều này cho thấy bạn có thể cần tập trung vào việc ${mainBarrier.key === 'A' ? 'khám phá và hiểu rõ hơn về bản thân' : mainBarrier.key === 'B' ? 'tìm kiếm và xử lý thông tin nghề nghiệp' : mainBarrier.key === 'C' ? 'xây dựng sự tự tin và kỹ năng ra quyết định' : mainBarrier.key === 'D' ? 'nhận diện và quản lý các ảnh hưởng từ bên ngoài' : 'trang bị các kỹ năng cần thiết cho sự nghiệp'}.`;

  const systemInstruction = `Bạn là một chuyên gia tư vấn hướng nghiệp, chuyên sâu về việc tháo gỡ các rào cản nghề nghiệp. Dựa trên kết quả đánh giá các khó khăn của người dùng, hãy đưa ra những phân tích, lời khuyên thực tế và các bước hành động cụ thể. Kết quả của người dùng là: ${JSON.stringify(results)}`;
  const initialMessage = `Xin chào ${userData?.fullName || 'bạn'}, kết quả cho thấy rào cản lớn nhất của bạn là **${CDB_RESULT_DETAILS[mainBarrier.key].name}**. Đây là một bước nhận diện quan trọng. Bạn có muốn thảo luận sâu hơn về cách để vượt qua rào cản này không?`;

  const newsQuery = `cách vượt qua rào cản nghề nghiệp về ${CDB_RESULT_DETAILS[mainBarrier.key].name}`;

  return (
    <BaseResultPage
      {...props}
      title={props.quizTitle}
      analysisContent={resultsSummary}
      renderCharts={() => (
        <div className="space-y-4">
          {sortedResults.map(result => (
            <AnimatedBar key={result.key} label={CDB_RESULT_DETAILS[result.key].name} score={result.score} maxScore={25} />
          ))}
        </div>
      )}
      systemInstruction={systemInstruction}
      initialMessage={initialMessage}
      newsQuery={newsQuery}
      newsTitle={`Bài viết về ${CDB_RESULT_DETAILS[mainBarrier.key].name}`}
      chatbotPrompts={[`Làm sao để cải thiện ${CDB_RESULT_DETAILS[mainBarrier.key].name}?`, `Tôi nên bắt đầu từ đâu?`, `Có khóa học nào phù hợp không?`]}
    />
  );
};

export default CDIResultsDisplay;
