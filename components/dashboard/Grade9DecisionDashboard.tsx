import React, { useState, useMemo } from 'react';
import { QuizHistoryEntry, CategoryKey } from '../../types';
import { CAREER_FAMILIES } from '../../data/careerFamilies';
import { THPT_SUBJECTS } from '../../data/subjects';
import { generateCareerHypotheses } from '../../data/engines/careerHypothesisEngine';
import { generateSubjectPlan } from '../../data/engines/subjectPlannerEngine';
import { assessDoorClosingRisk, calculateOptionalityScore } from '../../data/engines/doorClosingRiskEngine';
import { generateRoadmap } from '../../data/engines/roadmapEngine';
import { GRADE_PHASES, Grade } from '../../data/types/student';
import { StudentScoreProfile } from '../../data/types/admissions';
import AdmissionsExplorer from './AdmissionsExplorer';
import ExamStrategyView from './ExamStrategyView';
import ScenarioSimulatorView from './ScenarioSimulatorView';
import CulturalArchetypeView from './CulturalArchetypeView';

interface Grade9DecisionDashboardProps {
  history: QuizHistoryEntry[];
  onGoHome: () => void;
  onSelectQuiz?: (quizId: string) => void;
}

export const Grade9DecisionDashboard: React.FC<Grade9DecisionDashboardProps> = ({
  history,
  onGoHome,
  onSelectQuiz
}) => {
  const [selectedGrade, setSelectedGrade] = useState<Grade>(9);
  const [activeTab, setActiveTab] = useState<
    'hypotheses' | 'planner' | 'door_closing' | 'universities' | 'exam_strategy' | 'scenarios' | 'archetypes' | 'roadmap'
  >('hypotheses');
  
  // Find latest Holland result or provide an interactive baseline
  const hollandEntry = history.find(h => h.quizId === 'holland');
  const [customRiasec, setCustomRiasec] = useState<Record<CategoryKey, number>>(() => {
    if (hollandEntry && hollandEntry.results) {
      return hollandEntry.results as Record<CategoryKey, number>;
    }
    // Baseline default
    return {
      [CategoryKey.R]: 15,
      [CategoryKey.I]: 22,
      [CategoryKey.A]: 18,
      [CategoryKey.S]: 14,
      [CategoryKey.E]: 12,
      [CategoryKey.C]: 10
    };
  });

  // Score Profile for admissions
  const [scoreProfile] = useState<StudentScoreProfile>({
    thptScores: {
      toan: 8.5,
      ly: 8.0,
      hoa: 7.5,
      van: 7.5,
      anh: 8.0,
      sinh: 7.0
    },
    tsaScore: 72,
    hsaScore: 98,
    dgnlHcmScore: 820,
    satScore: 1350,
    ieltsScore: 6.5,
    gpa10: 8.4,
    gpa11: 8.6,
    gpa12: 8.8
  });

  // Calculate Career Hypotheses
  const hypotheses = useMemo(() => {
    return generateCareerHypotheses({
      studentId: 'current-student',
      riasecScores: customRiasec
    });
  }, [customRiasec]);

  const targetFamilyIds = useMemo(() => hypotheses.map(h => h.careerFamilyId), [hypotheses]);
  const targetFamilies = useMemo(() => {
    return CAREER_FAMILIES.filter(f => targetFamilyIds.includes(f.id));
  }, [targetFamilyIds]);

  // Subject Planner
  const subjectRecommendations = useMemo(() => {
    return generateSubjectPlan(targetFamilyIds, CAREER_FAMILIES);
  }, [targetFamilyIds]);

  // Door Closing & Optionality Simulator
  const [droppedSubjectId, setDroppedSubjectId] = useState<string>('ly');
  const [chosenSubjectIds, setChosenSubjectIds] = useState<string[]>(['toan', 'van', 'anh', 'ly', 'tin']);

  const doorClosingRisk = useMemo(() => {
    return assessDoorClosingRisk(droppedSubjectId, targetFamilyIds, CAREER_FAMILIES, THPT_SUBJECTS);
  }, [droppedSubjectId, targetFamilyIds]);

  const optionalityScore = useMemo(() => {
    return calculateOptionalityScore(chosenSubjectIds, CAREER_FAMILIES, THPT_SUBJECTS);
  }, [chosenSubjectIds]);

  // Roadmap
  const roadmap = useMemo(() => {
    return generateRoadmap(selectedGrade, targetFamilies);
  }, [selectedGrade, targetFamilies]);

  const phaseMeta = GRADE_PHASES[selectedGrade];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-slow-fade pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sage-50 via-cream-100 to-sage-100 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-700 p-8 rounded-[32px] border border-sage-200/60 dark:border-slate-700 shadow-soft">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage-500/10 text-sage-700 dark:text-sage-300 rounded-full text-xs font-semibold mb-3">
              <span>🧭 Hệ thống Hỗ trợ Quyết định Tuyển sinh & Nghề nghiệp</span>
              <span className="text-sage-400">•</span>
              <span>Lớp {selectedGrade} ({phaseMeta.label})</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 dark:text-slate-100">
              Bản đồ Định hướng Tương lai
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300 font-light text-lg">
              Câu hỏi cốt lõi giai đoạn này: <strong className="font-semibold text-sage-600 dark:text-sage-400">"{phaseMeta.question}"</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[9, 10, 11, 12].map(g => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g as Grade)}
                className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all ${
                  selectedGrade === g
                    ? 'bg-sage-600 text-white shadow-md'
                    : 'bg-white/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white'
                }`}
              >
                Lớp {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('hypotheses')}
          className={`pb-4 px-4 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'hypotheses'
              ? 'border-sage-600 text-sage-600 dark:text-sage-400 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }`}
        >
          1. Giả thuyết nghề nghiệp ({hypotheses.length})
        </button>
        <button
          onClick={() => setActiveTab('planner')}
          className={`pb-4 px-4 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'planner'
              ? 'border-sage-600 text-sage-600 dark:text-sage-400 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }`}
        >
          2. Lựa chọn môn THPT
        </button>
        <button
          onClick={() => setActiveTab('door_closing')}
          className={`pb-4 px-4 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'door_closing'
              ? 'border-sage-600 text-sage-600 dark:text-sage-400 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }`}
        >
          3. Đóng/Mở cơ hội
        </button>
        <button
          onClick={() => setActiveTab('universities')}
          className={`pb-4 px-4 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'universities'
              ? 'border-sage-600 text-sage-600 dark:text-sage-400 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }`}
        >
          🎓 4. Khám phá Tuyển sinh
        </button>
        <button
          onClick={() => setActiveTab('exam_strategy')}
          className={`pb-4 px-4 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'exam_strategy'
              ? 'border-sage-600 text-sage-600 dark:text-sage-400 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }`}
        >
          🎯 5. Chiến lược Thi (ROI)
        </button>
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`pb-4 px-4 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'scenarios'
              ? 'border-sage-600 text-sage-600 dark:text-sage-400 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }`}
        >
          ⚡ 6. Mô phỏng Điểm
        </button>
        <button
          onClick={() => setActiveTab('archetypes')}
          className={`pb-4 px-4 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'archetypes'
              ? 'border-amber-600 text-amber-600 dark:text-amber-400 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }`}
        >
          🏛️ 7. Khí chất & Bản sắc
        </button>
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`pb-4 px-4 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'roadmap'
              ? 'border-sage-600 text-sage-600 dark:text-sage-400 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }`}
        >
          8. Roadmap
        </button>
      </div>

      {/* Tab 1: Career Hypotheses */}
      {activeTab === 'hypotheses' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Các vùng nghề đáng khám phá
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Được tổng hợp từ trắc nghiệm sở thích (Holland RIASEC). Đây là các <em>giả thuyết</em> cần bạn kiểm chứng qua trải nghiệm thực tế, không phải kết luận duy nhất.
              </p>
            </div>
            {onSelectQuiz && (
              <button
                onClick={() => onSelectQuiz('holland')}
                className="px-4 py-2 bg-sage-50 text-sage-700 hover:bg-sage-100 dark:bg-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl shrink-0"
              >
                Làm lại trắc nghiệm RIASEC
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hypotheses.map((hyp, index) => {
              const family = CAREER_FAMILIES.find(f => f.id === hyp.careerFamilyId);
              if (!family) return null;

              return (
                <div key={hyp.id} className="glass-card p-6 rounded-3xl flex flex-col justify-between space-y-4 hover:shadow-lg transition-shadow">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">{family.icon}</span>
                      <span className="px-2.5 py-1 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 text-xs font-medium rounded-full">
                        Giả thuyết #{index + 1}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">{family.name}</h4>
                    <p className="text-xs text-slate-400 mb-2">{family.nameEn}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-4">{family.description}</p>
                    
                    <div className="space-y-3 text-xs border-t border-slate-100 dark:border-slate-700 pt-3">
                      <div>
                        <strong className="text-slate-700 dark:text-slate-200">Môn then chốt:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {family.keySubjects.map(s => (
                            <span key={s} className="px-2 py-0.5 bg-sage-100 text-sage-800 dark:bg-slate-700 dark:text-slate-300 rounded-md">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <strong className="text-slate-700 dark:text-slate-200">Bằng chứng hỗ trợ:</strong>
                        <p className="text-slate-500 dark:text-slate-400 mt-0.5">{hyp.supportingEvidence[0]}</p>
                      </div>

                      {hyp.missingEvidence.length > 0 && (
                        <div>
                          <strong className="text-amber-600 dark:text-amber-400">Dữ liệu còn thiếu:</strong>
                          <p className="text-slate-500 dark:text-slate-400 mt-0.5">{hyp.missingEvidence[0]}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700 text-xs">
                    <span className="text-sage-600 dark:text-sage-400 font-semibold block mb-1">Thử nghiệm đề xuất:</span>
                    <p className="text-slate-600 dark:text-slate-300 italic">{hyp.nextExperiment}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Subject Planner */}
      {activeTab === 'planner' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Gợi ý chọn môn THPT lớp 10
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Phân loại mức độ quan trọng của các môn học nhằm phục vụ tốt nhất cho các vùng nghề bạn đang quan tâm ({targetFamilies.map(f => f.name).join(', ')}).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjectRecommendations.map(rec => {
              const badgeColors = {
                required: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-300',
                strongly_recommended: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-300',
                useful: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-300',
                low_relevance: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 border-slate-200'
              };

              return (
                <div key={rec.subjectId} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-800 dark:text-slate-100">{rec.subjectName}</h4>
                      <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${badgeColors[rec.importance]}`}>
                        {rec.importanceLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{rec.reason}</p>
                    {rec.supportingCareerFamilies.length > 0 && (
                      <p className="text-xs text-sage-600 dark:text-sage-400">
                        Cần cho: {rec.supportingCareerFamilies.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Door Closing Simulator */}
      {activeTab === 'door_closing' && (
        <div className="space-y-8">
          {/* Optionality Meter */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-soft">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
              Chỉ số Giữ mở Cơ hội (Future Optionality)
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Đánh giá xem tổ hợp môn bạn đang chọn có mở đủ nhiều con đường tương lai hay không.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <div className="w-32 h-32 rounded-full border-8 border-sage-500 flex flex-col items-center justify-center shrink-0">
                <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">{optionalityScore.score}%</span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Độ mở</span>
              </div>
              <div className="space-y-2">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  optionalityScore.level === 'high' ? 'bg-emerald-100 text-emerald-800' :
                  optionalityScore.level === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  Mức độ: {optionalityScore.level === 'high' ? 'Rất tốt' : optionalityScore.level === 'medium' ? 'Trung bình' : 'Thu hẹp'}
                </span>
                <p className="text-slate-700 dark:text-slate-200 text-sm">{optionalityScore.summary}</p>
                <p className="text-xs text-slate-500">
                  Còn tiếp cận được: <strong>{optionalityScore.accessibleFamilies.length} / {CAREER_FAMILIES.length}</strong> nhóm ngành.
                </p>
              </div>
            </div>

            {/* Subject Checkboxes */}
            <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
              <label className="text-xs font-bold uppercase text-slate-400 block mb-3">Tổ hợp môn đang cân nhắc:</label>
              <div className="flex flex-wrap gap-2">
                {THPT_SUBJECTS.map(s => {
                  const isChecked = chosenSubjectIds.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        if (isChecked) {
                          setChosenSubjectIds(chosenSubjectIds.filter(id => id !== s.id));
                        } else {
                          setChosenSubjectIds([...chosenSubjectIds, s.id]);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors border ${
                        isChecked
                          ? 'bg-sage-600 text-white border-sage-600'
                          : 'bg-slate-50 text-slate-600 dark:bg-slate-700 dark:text-slate-300 border-slate-200'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}{s.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Door Closing Risk Warning */}
          <div className="bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-amber-900/50 p-6 rounded-3xl">
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200 mb-2">
              Mô phỏng rủi ro khi BỎ MỘT MÔN HỌC (Door Closing Risk)
            </h3>
            <p className="text-sm text-amber-800 dark:text-amber-300 mb-4">
              Hệ thống cảnh báo bạn sẽ đóng những cánh cửa nào nếu quyết định không học môn này.
            </p>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Nếu bạn bỏ môn:</span>
              <select
                value={droppedSubjectId}
                onChange={e => setDroppedSubjectId(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 text-sm font-semibold text-slate-800 dark:text-slate-100"
              >
                {THPT_SUBJECTS.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-amber-200/60 mb-4">
              <strong className="text-sm text-slate-800 dark:text-slate-100 block mb-1">Kết quả phân tích:</strong>
              <p className="text-sm text-slate-600 dark:text-slate-300">{doorClosingRisk.summary}</p>
            </div>

            <div className="space-y-2">
              {doorClosingRisk.risks.map((r, i) => (
                <div key={i} className="flex items-start justify-between p-3 rounded-xl bg-white dark:bg-slate-700/60 text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{r.careerFamilyName}</span>
                  <span className={`px-2 py-0.5 rounded-md font-bold uppercase text-[10px] ${
                    r.riskLevel === 'high' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {r.riskLevel === 'high' ? 'Mất cơ hội cao' : 'Khó khăn'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Universities Explorer */}
      {activeTab === 'universities' && (
        <AdmissionsExplorer
          targetFamilyIds={targetFamilyIds}
          scoreProfile={scoreProfile}
        />
      )}

      {/* Tab 5: Exam Strategy */}
      {activeTab === 'exam_strategy' && (
        <ExamStrategyView
          targetFamilyIds={targetFamilyIds}
          scoreProfile={scoreProfile}
        />
      )}

      {/* Tab 6: Scenario Simulator */}
      {activeTab === 'scenarios' && (
        <ScenarioSimulatorView
          targetFamilyIds={targetFamilyIds}
          scoreProfile={scoreProfile}
        />
      )}

      {/* Tab 7: Eastern Archetypes & Temperament */}
      {activeTab === 'archetypes' && (
        <CulturalArchetypeView
          riasecScores={customRiasec}
        />
      )}

      {/* Tab 8: Roadmap */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Kế hoạch hành động theo từng mốc thời gian
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Các bước cụ thể cần làm trong 30 ngày, 90 ngày và học kỳ này để xác thực giả thuyết nghề nghiệp.
            </p>
          </div>

          <div className="space-y-4">
            {roadmap.actions.map(action => {
              const timeLabels = {
                '30_days': 'Trong 30 ngày tới',
                '90_days': 'Trong 90 ngày tới',
                'semester': 'Trong học kỳ này'
              };

              return (
                <div key={action.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-slate-800 dark:text-slate-100">{action.title}</h4>
                      <span className="text-xs px-2.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full font-medium">
                        {timeLabels[action.timeframe]}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 font-light">{action.description}</p>
                    {action.relatedCareerFamily && (
                      <span className="inline-block text-xs text-sage-600 dark:text-sage-400 font-medium mt-1">
                        Liên quan đến: {action.relatedCareerFamily}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="text-center pt-4">
        <button
          onClick={onGoHome}
          className="px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 text-sm font-medium transition-colors"
        >
          ← Quay về trang chính
        </button>
      </div>
    </div>
  );
};

export default Grade9DecisionDashboard;
