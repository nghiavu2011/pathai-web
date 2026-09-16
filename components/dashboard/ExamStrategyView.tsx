import React, { useMemo } from 'react';
import { StudentScoreProfile } from '../../data/types/admissions';
import { evaluateExamStrategy } from '../../data/engines/examStrategyEngine';
import { ADMISSION_PROGRAMS } from '../../data/admissionsData';

interface ExamStrategyViewProps {
  targetFamilyIds: string[];
  scoreProfile: StudentScoreProfile;
}

export const ExamStrategyView: React.FC<ExamStrategyViewProps> = ({
  targetFamilyIds,
  scoreProfile
}) => {
  const examStrategies = useMemo(() => {
    return evaluateExamStrategy(scoreProfile, targetFamilyIds, ADMISSION_PROGRAMS);
  }, [scoreProfile, targetFamilyIds]);

  const priorityColors = {
    'Core': 'bg-emerald-100 text-emerald-800 border-emerald-300',
    'Primary': 'bg-blue-100 text-blue-800 border-blue-300',
    'Support': 'bg-purple-100 text-purple-800 border-purple-300',
    'Backup': 'bg-amber-100 text-amber-800 border-amber-300',
    'Low Priority': 'bg-slate-100 text-slate-600 border-slate-200'
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          Chiến lược Lựa chọn Kỳ thi & Đánh giá Hiệu quả (Exam ROI)
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          PathAI phân tích mức độ cần thiết của từng kỳ thi đối với hồ sơ và nhóm ngành mục tiêu của bạn. Tránh lãng phí thời gian và áp lực ôn thi không cần thiết.
        </p>
      </div>

      <div className="space-y-4">
        {examStrategies.map(strat => (
          <div key={strat.exam} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">{strat.examName}</h4>
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${priorityColors[strat.priority]}`}>
                  {strat.priorityLabel}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">{strat.recommendationReason}</p>
              {strat.unlockedProgramNames.length > 0 && (
                <p className="text-xs text-sage-600 dark:text-sage-400">
                  Chương trình hưởng lợi: {strat.unlockedProgramNames.slice(0, 3).join(', ')}...
                </p>
              )}
            </div>

            <div className="flex md:flex-col items-center justify-between shrink-0 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl w-full md:w-44 text-center">
              <span className="text-xs text-slate-400 font-medium">Đánh giá Hiệu quả (ROI)</span>
              <span className="text-sm font-extrabold text-sage-600 dark:text-sage-400 my-1">{strat.roiLevelLabel}</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Mức nỗ lực: {strat.effortCost}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamStrategyView;
