
import React, { useMemo } from 'react';
import { EQResults, Answers, UserData, EQCategoryKey } from '../../types';
import { EQ_DETAILS } from '../../constants/eq';
import AnimatedBar from '../shared/AnimatedBar';
import BaseResultPage from '../shared/BaseResultPage';
import RadarChart from '../shared/RadarChart';

interface EQResultsDisplayProps {
  results: EQResults;
  answers: Answers;
  onGoHome: () => void;
  onBackToHistory?: () => void;
  userData: UserData | null;
  quizId: string;
  quizTitle: string;
  onAddGoal: (goal: any) => void;
  theme: string;
}

const EQResultsDisplay: React.FC<EQResultsDisplayProps> = (props) => {
  const { results, userData } = props;

  const sortedResults = useMemo(() => {
    return (Object.keys(results) as EQCategoryKey[])
      .map(key => ({ key, score: results[key] }))
      .sort((a, b) => b.score - a.score);
  }, [results]);

  const highestSkill = sortedResults[0];
  const lowestSkill = sortedResults[sortedResults.length - 1];
  
  const totalScore = (Object.values(results) as number[]).reduce((a, b) => a + b, 0);
  const maxTotalScore = 125; // 25 questions * 5 points
  const eqLevel = totalScore > 100 ? 'Rất cao' : totalScore > 85 ? 'Cao' : totalScore > 65 ? 'Trung bình' : 'Cần cải thiện';

  const radarChartData = Object.keys(results).map((key) => ({
    axis: EQ_DETAILS[key as EQCategoryKey],
    value: (results[key as EQCategoryKey] / 25) * 100,
  }));

  const resultsSummary = `Tổng điểm EQ của bạn là **${totalScore}/${maxTotalScore}** (Mức: **${eqLevel}**). Điểm mạnh nhất của bạn là **${EQ_DETAILS[highestSkill.key]}**, trong khi kỹ năng **${EQ_DETAILS[lowestSkill.key]}** có thể cần được rèn luyện thêm.`;

  const systemInstruction = `Bạn là một chuyên gia huấn luyện Trí tuệ Cảm xúc (EQ Coach). Dựa trên kết quả EQ của người dùng (theo mô hình Goleman), hãy phân tích tác động của điểm số này đến khả năng lãnh đạo, làm việc nhóm và hạnh phúc cá nhân. Đưa ra bài tập thực hành cụ thể để cải thiện kỹ năng yếu nhất (${EQ_DETAILS[lowestSkill.key]}). Kết quả: ${JSON.stringify(results)}`;
  const initialMessage = `Chào ${userData?.fullName || 'bạn'}, bạn có chỉ số EQ ở mức **${eqLevel}**. Khả năng **${EQ_DETAILS[highestSkill.key]}** của bạn rất ấn tượng! Tuy nhiên, để tiến xa hơn, việc cải thiện **${EQ_DETAILS[lowestSkill.key]}** sẽ mang lại lợi thế lớn. Bạn có muốn thử một vài bài tập nhỏ để rèn luyện kỹ năng này không?`;

  const newsQuery = `cách rèn luyện trí tuệ cảm xúc (EQ) và kỹ năng ${EQ_DETAILS[lowestSkill.key]}`;

  return (
    <BaseResultPage
      {...props}
      title={props.quizTitle}
      analysisContent={resultsSummary}
      renderCharts={() => (
        <>
            <div className="mb-8">
                <RadarChart data={radarChartData} color="violet" />
            </div>
            <div className="space-y-4">
              {sortedResults.map(result => (
                <AnimatedBar key={result.key} label={EQ_DETAILS[result.key]} score={result.score} maxScore={25} />
              ))}
            </div>
        </>
      )}
      systemInstruction={systemInstruction}
      initialMessage={initialMessage}
      newsQuery={newsQuery}
      newsTitle="Bài viết về phát triển EQ"
      chatbotPrompts={[`Làm sao để kiểm soát nóng giận?`, `Cách tăng sự đồng cảm?`, `EQ quan trọng thế nào trong lãnh đạo?`]}
    />
  );
};

export default EQResultsDisplay;
