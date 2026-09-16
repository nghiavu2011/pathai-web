import React, { useMemo } from 'react';
import { MIResults, Answers, UserData, MICategoryKey } from '../../types';
import { MI_RESULT_DETAILS, MI_CAREER_SUGGESTIONS, MI_QUIZ_DATA } from '../../constants/multipleIntelligences';
import RadarChart from '../shared/RadarChart';
import BaseResultPage from '../shared/BaseResultPage';

interface MIResultsDisplayProps {
  results: MIResults;
  answers: Answers;
  onGoHome: () => void;
  onBackToHistory?: () => void;
  userData: UserData | null;
  quizId: string;
  quizTitle: string;
  onAddGoal: (goal: any) => void;
  theme: string;
}

const MIResultsDisplay: React.FC<MIResultsDisplayProps> = (props) => {
  const { results, userData, answers } = props;

  const sortedResults = useMemo(() => {
    return (Object.keys(results) as MICategoryKey[])
      .map(key => {
        const rawScore = results[key] || 0;
        // Raw score is sum of 5 items (5 to 25)
        const meanScore = Number((rawScore / 5).toFixed(1));
        const normalizedPercentage = Math.min(100, Math.max(0, Math.round((rawScore / 25) * 100)));
        return {
          key,
          name: MI_RESULT_DETAILS[key]?.name || key,
          description: MI_RESULT_DETAILS[key]?.description || '',
          score: normalizedPercentage, // 0 to 100 for Radar Chart
          meanScore, // 1.0 to 5.0
          originalScore: rawScore // 5 to 25
        };
      })
      .sort((a, b) => b.originalScore - a.originalScore);
  }, [results]);

  const radarChartData = sortedResults.map(r => ({
    axis: r.name.split('–')[0].trim(),
    value: r.score
  }));

  const topThree = sortedResults.slice(0, 3);
  const topIntelligencesString = topThree.map(r => `**${r.name}**`).join(', ');

  // Create Evidence Based Analysis
  const evidenceText = useMemo(() => {
    let text = "";
    topThree.forEach((result) => {
      const highTags: string[] = [];
      MI_QUIZ_DATA.forEach(cat => {
        cat.questions.forEach(q => {
          if (q.mi_code === result.key && answers && answers[q.id] >= 4) {
            const shortText = q.text.replace(/^(Tôi|Bạn)\s+/, '').toLowerCase();
            highTags.push(shortText);
          }
        });
      });

      if (highTags.length > 0) {
        const selectedValues = highTags.slice(0, 2).join(", ");
        text += `\n- Với **${result.name.split('–')[0]}**: Bạn bộc lộ sự tự tin qua việc ${selectedValues}.`;
      }
    });
    return text;
  }, [topThree, answers]);

  const studentSummary = useMemo(() => {
    if (!userData) return "";
    return `Học sinh: ${userData.fullName || 'Bạn'}, Khối lớp: ${userData.educationLevel || 'THPT'}, Khu vực: ${userData.location || 'Việt Nam'}, Mục tiêu: ${userData.expectations || 'Định hướng nghề nghiệp'}`;
  }, [userData]);

  const analysisContent = `
Chào **${userData?.fullName || 'bạn'}**, 

Dựa trên kết quả trắc nghiệm Trí thông minh Đa diện (Multiple Intelligences), bạn sở hữu 3 loại hình trí thông minh nổi trội: ${topIntelligencesString}.

**Những biểu hiện nổi bật của bạn:**
${evidenceText || 'Bạn thể hiện sự phân bổ năng lực cân bằng và linh hoạt giữa các nhóm trí thông minh.'}

🚀 **Lời khuyên từ PathAI:**
Mỗi loại hình trí thông minh là một công cụ giúp bạn tiếp thu kiến thức và giải quyết vấn đề. Hãy tận dụng tối đa 3 thế mạnh hàng đầu này trong việc lựa chọn khối thi, tổ hợp môn THPT và các dự án học tập thực tế!
`;

  const systemInstruction = `
Bạn là Trợ lý AI Tham vấn Học tập & Hướng nghiệp PathAI dành cho học sinh THPT.
Phân tích kết quả Trí thông minh Đa diện (Gardner MI): ${JSON.stringify(results)}.
Thông tin học sinh: ${studentSummary}.
Mục tiêu: Đưa ra lời khuyên học tập, chọn tổ hợp môn và định hướng nghề nghiệp dưới dạng gợi ý khám phá thực tế, tích cực, không phán quyết định mệnh.
`;

  const initialMessage = `Chào ${userData?.fullName || 'bạn'}, bạn sở hữu trí thông minh nổi bật về: ${topThree.map(r => r.name.split('–')[0]).join(', ')}. Bạn có muốn tìm hiểu các ngành học phát huy tốt nhất các thế mạnh này không?`;
  const topIntelligencesStringForSearch = topThree.map(r => r.name.split('–')[0].trim()).join(', ');
  const newsQuery = `cách phát triển và ứng dụng trí thông minh ${topIntelligencesStringForSearch} trong học tập và nghề nghiệp`;

  return (
    <BaseResultPage
      {...props}
      analysisContent={
        <>
          <p className="text-slate-700 dark:text-slate-300 mb-6">{analysisContent.replace(/\*\*/g, '')}</p>
          <div className="grid gap-4">
            {sortedResults.map(result => {
              const careerSuggestion = MI_CAREER_SUGGESTIONS.find(c => c.code === result.key);
              return (
                <div key={result.key} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-400 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-base text-teal-700 dark:text-teal-400">{result.name}</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{result.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-sm bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 px-2 py-1 rounded border border-teal-200 dark:border-teal-800 inline-block">
                        {result.meanScore} / 5.0
                      </span>
                      <span className="block text-xs text-slate-400 mt-0.5">({result.originalScore}/25)</span>
                    </div>
                  </div>
                  {careerSuggestion && (
                    <div className="mt-3 text-sm">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Gợi ý nhóm ngành: </span>
                      <span className="text-slate-600 dark:text-slate-400">{careerSuggestion.careers}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      }
      renderCharts={() => (
        <div className="flex justify-center py-4">
          <RadarChart data={radarChartData} color="teal" />
        </div>
      )}
      systemInstruction={systemInstruction}
      initialMessage={initialMessage}
      newsQuery={newsQuery}
      chatbotPrompts={[`Làm sao phát triển ${topThree[0].name.split('–')[0]}?`, `Cách học tập hiệu quả?`, `Ngành nghề phù hợp?`]}
    />
  );
};

export default MIResultsDisplay;
