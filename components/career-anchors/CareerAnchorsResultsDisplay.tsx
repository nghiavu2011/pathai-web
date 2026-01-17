
import React, { useMemo } from 'react';
import { CareerAnchorResults, Answers, UserData, CareerAnchorKey } from '../../types';
import { CAREER_ANCHORS_DETAILS } from '../../constants/careerAnchors';
import AnimatedBar from '../shared/AnimatedBar';
import BaseResultPage from '../shared/BaseResultPage';

interface CareerAnchorsResultsDisplayProps {
  results: CareerAnchorResults;
  answers: Answers;
  onGoHome: () => void;
  onBackToHistory?: () => void;
  userData: UserData | null;
  quizId: string;
  quizTitle: string;
  onAddGoal: (goal: any) => void;
  theme: string;
}

const CareerAnchorsResultsDisplay: React.FC<CareerAnchorsResultsDisplayProps> = (props) => {
  const { results, userData } = props;

  const sortedResults = useMemo(() => {
    return (Object.keys(results) as CareerAnchorKey[])
      .map(key => ({ key, score: results[key] }))
      .sort((a, b) => b.score - a.score);
  }, [results]);

  const topThree = sortedResults.slice(0, 3);
  const topAnchorsString = topThree.map(r => `**${CAREER_ANCHORS_DETAILS[r.key].name}**`).join(', ');

  const resultsSummary = `Kết quả cho thấy 3 'mỏ neo' quan trọng nhất định hướng các quyết định sự nghiệp của bạn là: ${topAnchorsString}. Đây là những giá trị, động lực và nhu cầu cốt lõi mà bạn sẽ không muốn từ bỏ khi lựa chọn công việc.`;

  const systemInstruction = `Bạn là một chuyên gia tư vấn sự nghiệp, am hiểu sâu sắc về lý thuyết Mỏ neo Nghề nghiệp (Career Anchors) của Edgar Schein. Dựa trên kết quả của người dùng, hãy phân tích ý nghĩa của các 'mỏ neo' nổi bật, giải thích sự xung đột có thể có giữa chúng, và gợi ý các loại hình công việc hoặc môi trường phù hợp. Kết quả của người dùng: ${JSON.stringify(results)}`;
  const initialMessage = `Chào ${userData?.fullName || 'bạn'}, 'mỏ neo' sự nghiệp của bạn là ${topAnchorsString}. Chúng là la bàn nội tâm cho các quyết định của bạn. Bạn có muốn tìm hiểu sâu hơn về ý nghĩa của từng 'mỏ neo' hoặc khám phá xem chúng gợi ý điều gì về con đường sự nghiệp lý tưởng của bạn không?`;

  const topAnchorName = CAREER_ANCHORS_DETAILS[topThree[0].key].name;
  const newsQuery = `xu hướng công việc và môi trường làm việc phù hợp với người có mỏ neo nghề nghiệp là ${topAnchorName}`;

  return (
    <BaseResultPage
      {...props}
      title={props.quizTitle}
      analysisContent={
        <>
            <p className="mb-6">{resultsSummary.replace(/\*\*/g, '')}</p>
            <div className="grid gap-4">
              {topThree.map(({ key }) => (
                <div key={key} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-lg text-blue-600 dark:text-blue-400">{CAREER_ANCHORS_DETAILS[key].name}</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{CAREER_ANCHORS_DETAILS[key].description}</p>
                </div>
              ))}
            </div>
        </>
      }
      renderCharts={() => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedResults.map(result => (
            <AnimatedBar key={result.key} label={CAREER_ANCHORS_DETAILS[result.key].name} score={result.score} maxScore={25} />
          ))}
        </div>
      )}
      systemInstruction={systemInstruction}
      initialMessage={initialMessage}
      newsQuery={newsQuery}
      newsTitle={`Dành cho người có Mỏ neo ${topAnchorName}`}
      chatbotPrompts={[`Nghề nào phù hợp với mỏ neo ${CAREER_ANCHORS_DETAILS[topThree[0].key].name}?`, `Làm sao khi các mỏ neo mâu thuẫn?`, `Tôi nên tìm công ty như thế nào?`]}
    />
  );
};

export default CareerAnchorsResultsDisplay;
