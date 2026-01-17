
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Goal } from '../../types';
import LoadingSpinner from '../LoadingSpinner';

interface GoalSettingProps {
  quizId: string;
  quizTitle: string;
  results: any;
  onAddGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'status'>) => void;
}

const GoalSetting: React.FC<GoalSettingProps> = ({ quizId, quizTitle, results, onAddGoal }) => {
  const [suggestedGoals, setSuggestedGoals] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customGoal, setCustomGoal] = useState('');
  const [addedGoals, setAddedGoals] = useState<string[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!results) return;
      setIsLoading(true);
      setError(null);

      try {
        if (!process.env.API_KEY) {
          throw new Error("API key not configured.");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Dựa trên kết quả trắc nghiệm "${quizTitle}" này: ${JSON.stringify(results, null, 2)}, hãy đề xuất 3 mục tiêu hành động cụ thể, ngắn gọn (mỗi mục tiêu dưới 150 ký tự) cho một người dùng để họ khám phá sự nghiệp. Trả về một mảng JSON các chuỗi. Ví dụ: ["Nghiên cứu 3 ngành học liên quan đến kết quả.", "Trò chuyện với 1 người đang làm trong lĩnh vực nổi bật.", "Tham gia một workshop online về kỹ năng X."]. Chỉ trả về mảng JSON.`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        
        const text = response.text.trim();
        const jsonString = text.startsWith('```json') ? text.substring(7, text.length - 3).trim() : text;
        const parsedGoals = JSON.parse(jsonString);
        if (Array.isArray(parsedGoals) && parsedGoals.every(g => typeof g === 'string')) {
          setSuggestedGoals(parsedGoals);
        } else {
          throw new Error("Invalid format received from AI.");
        }
      } catch (err) {
        console.error("Error fetching goal suggestions:", err);
        setError("Không thể tải gợi ý mục tiêu từ AI.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [quizId, quizTitle, results]);

  const handleAddSuggested = (goalText: string) => {
    onAddGoal({ quizId, quizTitle, text: goalText });
    setAddedGoals(prev => [...prev, goalText]);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoal.trim()) return;
    onAddGoal({ quizId, quizTitle, text: customGoal.trim() });
    setAddedGoals(prev => [...prev, customGoal.trim()]);
    setCustomGoal('');
  };

  return (
    <div className="mt-12">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl border border-emerald-100 dark:border-slate-700 shadow-sm">
        <h3 className="text-2xl font-bold mb-4 text-emerald-800 dark:text-emerald-400 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          Thiết lập Kế hoạch Hành động
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
          Đừng để kết quả chỉ nằm trên giấy! Hãy chọn các mục tiêu bên dưới để thêm vào <strong>Kế hoạch Sự nghiệp</strong> của bạn.
        </p>

        {isLoading && <div className="text-center py-4"><LoadingSpinner /></div>}
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        
        {!isLoading && suggestedGoals.length > 0 && (
          <div className="space-y-3 mb-6">
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider">Gợi ý từ AI:</h4>
            {suggestedGoals.map((goal, index) => {
              const isAdded = addedGoals.includes(goal);
              return (
                <div key={index} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-sm transition-shadow">
                  <p className="flex-1 text-sm text-slate-700 dark:text-slate-200">{goal}</p>
                  <button
                    onClick={() => handleAddSuggested(goal)}
                    disabled={isAdded}
                    className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-bold py-2 px-4 rounded-full transition-all ${
                        isAdded 
                        ? 'bg-slate-100 text-slate-500 cursor-default' 
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow hover:-translate-y-0.5'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        Đã thêm
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                        Thêm vào Kế hoạch
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <form onSubmit={handleAddCustom} className="mt-6 pt-6 border-t border-emerald-200 dark:border-slate-700">
          <label htmlFor="custom-goal" className="block font-semibold text-slate-700 dark:text-slate-300 mb-2 text-sm">Mục tiêu cá nhân khác:</label>
          <div className="flex items-center gap-2">
            <input
              id="custom-goal"
              type="text"
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              placeholder="Ví dụ: Đọc sách 'Tư duy Nhanh và Chậm'..."
              className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
            />
            <button
              type="submit"
              disabled={!customGoal.trim()}
              className="py-2.5 px-6 rounded-lg bg-slate-800 dark:bg-slate-600 text-white font-semibold hover:bg-slate-900 dark:hover:bg-slate-500 disabled:opacity-50 transition-colors"
            >
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalSetting;
