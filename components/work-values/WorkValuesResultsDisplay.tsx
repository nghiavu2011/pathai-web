
import React, { useMemo } from 'react';
import { WorkValuesResults, Answers, UserData, WorkValueKey } from '../../types';
import { WORK_VALUES_RESULT_DETAILS } from '../../constants/workValues';
import AnimatedBar from '../shared/AnimatedBar';
import BaseResultPage from '../shared/BaseResultPage';

interface WorkValuesResultsDisplayProps {
  results: WorkValuesResults;
  answers: Answers;
  onGoHome: () => void;
  onBackToHistory?: () => void;
  userData: UserData | null;
  quizId: string;
  quizTitle: string;
  onAddGoal: (goal: any) => void;
  theme: string;
}

const WorkValuesResultsDisplay: React.FC<WorkValuesResultsDisplayProps> = (props) => {
  const { results, userData } = props;

  const sortedResults = useMemo(() => {
    return (Object.keys(results) as WorkValueKey[])
      .map(key => ({ key, score: results[key] }))
      .sort((a, b) => b.score - a.score);
  }, [results]);

  const topThree = sortedResults.slice(0, 3);
  const topValuesString = topThree.map(r => `**${WORK_VALUES_RESULT_DETAILS[r.key].name}**`).join(', ');

  const resultsSummary = `Ba giá trị nghề nghiệp quan trọng nhất đối với bạn là: ${topValuesString}. Khi công việc của bạn phù hợp với những giá trị này, bạn sẽ cảm thấy hài lòng, có động lực và ý nghĩa hơn.`;

  const systemInstruction = `Bạn là Trợ lý AI Tham vấn Học tập & Hướng nghiệp PathAI, hỗ trợ học sinh khám phá Giá trị Nghề nghiệp (Work Values). Dựa trên kết quả tự đánh giá của học sinh, hãy giúp học sinh làm rõ ý nghĩa của các giá trị bản thân ưu tiên, gợi ý cách tìm kiếm môi trường học tập, hoạt động ngoại khóa hoặc định hướng ngành nghề nuôi dưỡng các giá trị đó. Không phán xét hay ấn định tương lai. Kết quả: ${JSON.stringify(results)}`;
  const initialMessage = `Chào ${userData?.fullName || 'bạn'}, kết quả cho thấy bạn đang quan tâm nhiều đến các giá trị: ${topValuesString}. Đây là những kim chỉ nam quan trọng giúp bạn định hình môi trường làm việc mơ ước. Bạn có muốn cùng mình tìm hiểu các môi trường thực tế phù hợp với các giá trị này không?`;

  const topValueName = WORK_VALUES_RESULT_DETAILS[topThree[0].key].name;
  const newsQuery = `tìm kiếm công việc và văn hóa công ty phù hợp với giá trị nghề nghiệp ${topValueName}`;

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
                  <h4 className="font-bold text-lg text-blue-600 dark:text-blue-400">{WORK_VALUES_RESULT_DETAILS[key].name}</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{WORK_VALUES_RESULT_DETAILS[key].description}</p>
                </div>
              ))}
            </div>
        </>
      }
      renderCharts={() => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedResults.map(result => (
            <AnimatedBar key={result.key} label={WORK_VALUES_RESULT_DETAILS[result.key].name} score={result.score} maxScore={25} />
          ))}
        </div>
      )}
      systemInstruction={systemInstruction}
      initialMessage={initialMessage}
      newsQuery={newsQuery}
      newsTitle={`Tìm việc phù hợp với Giá trị ${topValueName}`}
      chatbotPrompts={[`Làm sao để tìm công việc có giá trị ${WORK_VALUES_RESULT_DETAILS[topThree[0].key].name}?`, `Tôi nên hỏi gì khi phỏng vấn?`, `Các giá trị này có thay đổi không?`]}
    />
  );
};

export default WorkValuesResultsDisplay;
