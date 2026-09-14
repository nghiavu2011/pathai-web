import React, { useMemo } from 'react';
import { StudentScoreProfile } from '../../data/types/admissions';
import { simulateScenarios } from '../../data/engines/scenarioSimulatorEngine';

interface ScenarioSimulatorViewProps {
  targetFamilyIds: string[];
  scoreProfile: StudentScoreProfile;
}

export const ScenarioSimulatorView: React.FC<ScenarioSimulatorViewProps> = ({
  targetFamilyIds,
  scoreProfile
}) => {
  const scenarios = useMemo(() => {
    return simulateScenarios(scoreProfile, targetFamilyIds);
  }, [scoreProfile, targetFamilyIds]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          Mô phỏng Kịch bản Điểm số ("Nếu thay đổi thì sao?")
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Khám phá giá trị biên của từng nỗ lực: Nếu bạn tăng thêm vài điểm TSA hoặc nâng band IELTS, bạn sẽ mở khóa được bao nhiêu cơ hội mới?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarios.map((sc, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-soft flex flex-col justify-between space-y-4">
            <div>
              <div className="inline-block px-3 py-1 bg-sage-50 text-sage-700 rounded-full text-xs font-bold mb-3">
                Kịch bản #{i + 1}
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2">
                {sc.parameterName}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {sc.marginalGainSummary}
              </p>

              <div className="space-y-2 text-xs border-t border-slate-100 dark:border-slate-700 pt-3">
                <div className="flex justify-between text-purple-700 dark:text-purple-300">
                  <span>Chuyển từ Dream ➔ Target:</span>
                  <strong>+{sc.dreamToTargetCount}</strong>
                </div>
                <div className="flex justify-between text-emerald-700 dark:text-emerald-300">
                  <span>Chuyển từ Target ➔ Safe:</span>
                  <strong>+{sc.targetToSafeCount}</strong>
                </div>
              </div>
            </div>

            {sc.newlyUnlockedPrograms.length > 0 && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 text-[11px] text-slate-500">
                <strong className="block text-slate-700 dark:text-slate-300 mb-1">Ví dụ cụ thể:</strong>
                <p className="italic">{sc.newlyUnlockedPrograms[0]}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScenarioSimulatorView;
