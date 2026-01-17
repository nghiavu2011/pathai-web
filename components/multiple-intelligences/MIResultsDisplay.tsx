
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
        // Pick up to 2 traits
        const selectedValues = highTags.slice(0, 2).join(", ");
        text += `\n- Với **${result.name.split('–')[0]}**: Một phần con người bạn bộc lộ rất tự nhiên qua việc ${selectedValues}.`;
      }
    });
    return text;
  }, [topThree, answers]);

  const profileSummary = useMemo(() => {
    if (!userData) return "";
    return `
Bối cảnh cá nhân:
- Gia đình: Là ${userData.birthOrder || 'con trong gia đình'}, tình trạng ${userData.maritalStatus || 'độc thân'}.
- Xu hướng & Bản dạng: ${userData.gender} (${userData.sexualOrientation || 'kín'}).
- Trạng thái: ${userData.status}, sống tại ${userData.location}.
- Câu chuyện bản thân: "${userData.bio || 'Chưa chia sẻ'}"
- Mong đợi: ${userData.expectations}
`.trim();
  }, [userData]);

  const analysisContent = `
Chào **${userData?.fullName || 'bạn'}**, 

Tôi đã lắng nghe tâm tư và quan sát những chỉ số của bạn. Với tư cách là một người đồng hành trong hành trình thấu hiểu, tôi nhận thấy ở bạn một nội lực rất đáng trân trọng.

Bạn sở hữu 3 loại hình trí thông minh nổi trội: ${topIntelligencesString}.

**Những "tín hiệu" từ nội tâm bạn:**
${evidenceText}

🚀 **Lời nhắn nhủ từ PathAI:**
Dựa trên bối cảnh ${userData?.status?.toLowerCase()} và những mong muốn về *"${userData?.expectations}"*, tôi tin rằng sự kết hợp giữa các thế mạnh này sẽ giúp bạn vượt qua những tự ti hay rào cản hiện tại. Đừng quên rằng mỗi chặng đường bạn đi đều tích lũy thêm những giá trị quý giá. Hãy vững tin, vì bạn có đủ nguồn lực để chạm đến phiên bản hoàn hảo nhất của chính mình!
`;

  const systemInstruction = `
Bạn là một Chuyên gia Tâm lý học cao cấp và người chữa lành (Healer), có khả năng thấu cảm sâu sắc.
Hãy phân tích kết quả Multiple Intelligences: ${JSON.stringify(results)}
Dựa trên hồ sơ người dùng: ${profileSummary}

Mục tiêu: Đưa ra lời khuyên chuyên nghiệp, chân thành, sát đáng. Tập trung vào việc chữa lành, hướng con người vươn lên, vượt qua các rào cản cá nhân và tự ti. Sử dụng ngôn từ tinh tế, nhân văn, mở ra "chân trời mới" dựa trên bối cảnh sống riêng biệt của họ (như thứ tự sinh, tình trạng hôn nhân, câu chuyện bản thân).
`;
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
