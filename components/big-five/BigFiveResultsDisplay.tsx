
import React, { useMemo } from 'react';
import { BigFiveResults, Answers, UserData, BigFiveCategoryKey } from '../../types';
import { BIG5_DETAILS } from '../../constants/bigFive';
import AnimatedBar from '../shared/AnimatedBar';
import BaseResultPage from '../shared/BaseResultPage';

interface BigFiveResultsDisplayProps {
  results: BigFiveResults;
  answers: Answers;
  onGoHome: () => void;
  onBackToHistory?: () => void;
  userData: UserData | null;
  quizId: string;
  quizTitle: string;
  onAddGoal: (goal: any) => void;
  theme: string;
}

const BigFiveResultsDisplay: React.FC<BigFiveResultsDisplayProps> = (props) => {
  const { results, userData } = props;

  const sortedResults = useMemo(() => {
    return (Object.keys(results) as BigFiveCategoryKey[])
      .map(key => ({ key, score: results[key] }))
      .sort((a, b) => b.score - a.score);
  }, [results]);

  const highestTrait = sortedResults[0];
  const lowestTrait = sortedResults[sortedResults.length - 1];

  const resultsSummary = `Kết quả cho thấy đặc điểm tính cách nổi bật nhất của bạn là **${BIG5_DETAILS[highestTrait.key].name}**. Điều này ảnh hưởng mạnh mẽ đến cách bạn làm việc và tương tác. Ngược lại, yếu tố **${BIG5_DETAILS[lowestTrait.key].name}** ít thể hiện hơn trong tính cách của bạn.`;

  const systemInstruction = `Bạn là một chuyên gia tâm lý học hành vi. Dựa trên kết quả Big Five (OCEAN) của người dùng, hãy phân tích ưu/nhược điểm của cấu trúc tính cách này trong bối cảnh công việc và cuộc sống. Đưa ra lời khuyên để phát huy điểm mạnh và hạn chế điểm yếu. Kết quả: ${JSON.stringify(results)}`;
  const initialMessage = `Chào ${userData?.fullName || 'bạn'}, hồ sơ Big Five của bạn rất thú vị với sự nổi trội của **${BIG5_DETAILS[highestTrait.key].name}**. Tính cách này là một tài sản lớn nếu bạn biết cách sử dụng đúng môi trường. Bạn có muốn tìm hiểu xem những người có tính cách giống bạn thường thành công ở lĩnh vực nào không?`;

  const newsQuery = `ưu điểm và nhược điểm của tính cách ${BIG5_DETAILS[highestTrait.key].name} trong công việc`;

  return (
    <BaseResultPage
      {...props}
      title={props.quizTitle}
      analysisContent={
        <>
            <p className="mb-6">{resultsSummary.replace(/\*\*/g, '')}</p>
            <div className="grid gap-4">
                {sortedResults.map(result => (
                     <div key={result.key} className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded border border-slate-200 dark:border-slate-700">
                        <h5 className="font-bold text-sm text-slate-700 dark:text-slate-300">{BIG5_DETAILS[result.key].name}</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{BIG5_DETAILS[result.key].desc}</p>
                     </div>
                ))}
            </div>
        </>
      }
      renderCharts={() => (
        <div className="space-y-4">
          {sortedResults.map(result => (
            <AnimatedBar key={result.key} label={BIG5_DETAILS[result.key].name} score={result.score} maxScore={25} />
          ))}
        </div>
      )}
      systemInstruction={systemInstruction}
      initialMessage={initialMessage}
      newsQuery={newsQuery}
      newsTitle="Kiến thức về Tính cách & Sự nghiệp"
      chatbotPrompts={[`Điểm mạnh của tính cách ${BIG5_DETAILS[highestTrait.key].name}?`, `Làm sao để cải thiện tính ${BIG5_DETAILS[lowestTrait.key].name}?`, `Phong cách lãnh đạo của tôi?`]}
    />
  );
};

export default BigFiveResultsDisplay;
