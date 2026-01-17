
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
      .map(key => ({
        key,
        name: MI_RESULT_DETAILS[key].name,
        description: MI_RESULT_DETAILS[key].description,
        score: results[key] / 5 * 100, // Normalize score to 100 for chart
        originalScore: results[key]
      }))
      .sort((a, b) => b.originalScore - a.originalScore);
  }, [results]);

  const radarChartData = sortedResults.map(r => ({
    axis: r.name.split('–')[0].trim(),
    value: r.score
  }));

  const topThree = sortedResults.slice(0, 3);
  const topIntelligencesString = topThree.map(r => `**${r.name}**`).join(', ');

  // Texts
  // Create Evidence Based Analysis
  const evidenceText = useMemo(() => {
    let text = "";
    topThree.forEach((result, index) => {

      // Actually structure is `questions` inside categories. `MI_QUIZ_DATA` is an array of categories.
      // We need to find the category that contains questions with `mi_code` matching result.key

      // Find high scoring questions (4 or 5) for this category
      // Since quiz structure might vary, let's filter all questions in MI_QUIZ_DATA flatly or by category if known
      let highTags: string[] = [];

      MI_QUIZ_DATA.forEach(cat => {
        cat.questions.forEach(q => {
          if (q.mi_code === result.key && answers[q.id] >= 4) {
            // Truncate long text for brevity e.g. "Tôi thích..." -> "thích..."
            const shortText = q.text.replace(/^(Tôi|Bạn)\s+/, '').toLowerCase();
            highTags.push(shortText);
          }
        })
      });

      if (highTags.length > 0) {
        // Pick up to 2 random traits to cite
        const selectedz = highTags.slice(0, 2).join(", ");
        text += `\n- Với **${result.name.split('–')[0]}**: Bạn thể hiện rõ qua việc ${selectedz}.`;
      }
    });
    return text;
  }, [topThree, answers]);

  const analysisContent = `
Chào **${userData?.fullName || 'bạn'}**,

Dựa trên những chia sẻ chân thành của bạn, PathAI nhận thấy bạn sở hữu một cấu trúc trí thông minh vô cùng thú vị.

Top 3 loại hình trí thông minh nổi bật nhất của bạn là: ${topIntelligencesString}.

**Chi tiết hơn về thế mạnh của bạn:**
${evidenceText}

💡 **Góc nhìn từ chuyên gia:**
Sự kết hợp này cho thấy bạn không chỉ có khả năng tư duy sâu sắc mà còn rất nhạy bén trong việc tương tác và cảm nhận. Đây là "bệ phóng" tuyệt vời cho những công việc đòi hỏi sự sáng tạo, thấu cảm và linh hoạt. Hãy tin tưởng vào bản thân, vì tiềm năng của bạn là rất lớn!
`;
  const systemInstruction = `Bạn là chuyên gia về Thuyết Trí thông minh Đa diện. Phân tích kết quả: ${JSON.stringify(results)}. Đưa ra lời khuyên học tập và nghề nghiệp.`;
  const initialMessage = `Chào ${userData?.fullName || 'bạn'}, bạn sở hữu trí thông minh nổi bật về: ${topThree.map(r => r.name.split('–')[0]).join(', ')}. Bạn có muốn biết cách áp dụng chúng vào công việc không?`;
  const topIntelligencesStringForSearch = topThree.map(r => r.name.split('–')[0].trim()).join(', ');
  const newsQuery = `cách phát triển và ứng dụng trí thông minh ${topIntelligencesStringForSearch} trong sự nghiệp`;

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
                    <span className="font-mono font-bold text-lg bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                      {result.originalScore}/5
                    </span>
                  </div>
                  {careerSuggestion && (
                    <div className="mt-3 text-sm">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Gợi ý nghề: </span>
                      <span className="text-slate-600 dark:text-slate-400">{careerSuggestion.careers}</span>
                    </div>
                  )}
                </div>
              )
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
