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
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'guided' | 'advanced'>('guided');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<
    'hypotheses' | 'planner' | 'door_closing' | 'universities' | 'exam_strategy' | 'scenarios' | 'archetypes' | 'roadmap'
  >('hypotheses');
  
  // Find latest Holland result or check if empty
  const hollandEntry = history.find(h => h.quizId === 'holland');
  const hasActualHolland = Boolean(hollandEntry && hollandEntry.results);

  const customRiasec = useMemo<Record<CategoryKey, number> | null>(() => {
    if (hasActualHolland && hollandEntry?.results) {
      return hollandEntry.results as Record<CategoryKey, number>;
    }
    if (isDemoMode) {
      return {
        [CategoryKey.R]: 15,
        [CategoryKey.I]: 22,
        [CategoryKey.A]: 18,
        [CategoryKey.S]: 14,
        [CategoryKey.E]: 12,
        [CategoryKey.C]: 10
      };
    }
    return null;
  }, [hasActualHolland, hollandEntry, isDemoMode]);

  // Score Profile for admissions
  const scoreProfile = useMemo<StudentScoreProfile>(() => {
    if (isDemoMode) {
      return {
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
      };
    }
    return {
      thptScores: {},
      tsaScore: undefined,
      hsaScore: undefined,
      dgnlHcmScore: undefined,
      satScore: undefined,
      ieltsScore: undefined
    };
  }, [isDemoMode]);

  // Calculate Career Hypotheses
  const hypotheses = useMemo(() => {
    if (!customRiasec) return [];
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
    <div className="max-w-6xl mx-auto space-y-8 animate-slow-fade pb-16 font-sans">
      {/* Demo Mode Toggle Banner if in Demo */}
      {isDemoMode && (
        <div className="bg-amber-500/10 border-2 border-amber-500/60 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-amber-900 dark:text-amber-200 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <span><strong>CHẾ ĐỘ MINH HỌA (DEMO MODE):</strong> Đang sử dụng dữ liệu điểm số và trắc nghiệm mẫu để trình diễn toàn bộ tính năng. Dữ liệu này không lưu vào hồ sơ cá nhân của bạn.</span>
          </div>
          <button
            onClick={() => setIsDemoMode(false)}
            className="px-4 py-1.5 bg-amber-600 text-white rounded-xl text-xs font-bold shrink-0 hover:bg-amber-700 transition-colors"
          >
            Tắt Chế độ Demo
          </button>
        </div>
      )}

      {/* Top Banner with Mode Selector */}
      <div className="bg-gradient-to-r from-sage-50 via-cream-100 to-sage-100 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-700 p-6 md:p-8 rounded-[32px] border border-sage-200/60 dark:border-slate-700 shadow-soft">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage-500/10 text-sage-700 dark:text-sage-300 rounded-full text-xs font-semibold mb-3">
              <span>🧭 Bản đồ Định hướng Học tập & Nghề nghiệp</span>
              <span className="text-sage-400">•</span>
              <span>Lớp {selectedGrade} ({phaseMeta.label})</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-display font-bold text-slate-800 dark:text-slate-100">
              Bản đồ Định hướng Tương lai
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300 font-light text-base md:text-lg">
              Mục tiêu giai đoạn này: <strong className="font-semibold text-sage-600 dark:text-sage-400">"{phaseMeta.question}"</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* View Mode Switcher */}
            <div className="flex bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <button
                onClick={() => setViewMode('guided')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'guided'
                    ? 'bg-sage-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                <span>🐣</span> 4 Bước Từng Bước
              </button>
              <button
                onClick={() => setViewMode('advanced')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'advanced'
                    ? 'bg-sage-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                <span>🔬</span> Chi tiết (8 Tab)
              </button>
            </div>

            {/* Grade Selector */}
            <div className="flex items-center gap-1 bg-white/80 dark:bg-slate-900/60 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
              {[9, 10, 11, 12].map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGrade(g as Grade)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedGrade === g
                      ? 'bg-sage-500 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Lớp {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: GUIDED 4-STEP WIZARD (TEENAGER-FRIENDLY DISCOVERY FLOW)           */}
      {/* ========================================================================= */}
      {viewMode === 'guided' && (
        <div className="space-y-8 animate-fade-in">
          {/* Step Progress Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { num: 1, icon: '🌟', title: '1. Bạn hợp nghề nào?', desc: 'Khám phá sở thích & ngành' },
              { num: 2, icon: '📚', title: '2. Chọn môn Lớp 10', desc: '4 môn bắt buộc + Tự chọn' },
              { num: 3, icon: '🎓', title: '3. Xem trường Đại học', desc: 'Trường & Kỳ thi phù hợp' },
              { num: 4, icon: '🚀', title: '4. Việc làm ngay!', desc: 'Kế hoạch 3 việc tuần này' }
            ].map((step) => {
              const isActive = currentStep === step.num;
              const isPassed = currentStep > step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    isActive
                      ? 'bg-sage-500 text-white border-sage-600 shadow-md transform -translate-y-0.5'
                      : isPassed
                      ? 'bg-sage-50 dark:bg-slate-800 text-sage-800 dark:text-sage-300 border-sage-200 dark:border-slate-700'
                      : 'bg-white dark:bg-slate-800/60 text-slate-500 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">{step.icon}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : isPassed ? 'bg-sage-200 text-sage-800 dark:bg-slate-700' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                    }`}>
                      {isPassed ? '✓ Đã xem' : `Bước ${step.num}`}
                    </span>
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>
                      {step.title}
                    </h4>
                    <p className={`text-xs mt-0.5 ${isActive ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                      {step.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* STEP 1: CAREER EXPLORATION */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <span>🌟</span> Bước 1: Khám Phá Nhóm Ngành Bạn Có Thể Thích
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    Dựa trên sở thích tự nhiên của bạn, đây là 3 hướng đi thú vị nhất đáng để tìm hiểu và trải nghiệm.
                  </p>
                </div>
                {onSelectQuiz && (
                  <button
                    onClick={() => onSelectQuiz('holland')}
                    className="px-4 py-2 bg-sage-50 hover:bg-sage-100 text-sage-700 dark:bg-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl shrink-0 transition-colors"
                  >
                    Làm lại trắc nghiệm
                  </button>
                )}
              </div>

              {hypotheses.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl border border-dashed border-sage-300 dark:border-slate-700 text-center space-y-4 shadow-sm">
                  <span className="text-6xl animate-bounce">🧭</span>
                  <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    Bạn ơi! Bạn chưa làm trắc nghiệm Sở thích (RIASEC)
                  </h4>
                  <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                    Chỉ cần 10 phút trả lời các câu hỏi vui về thói quen và sở thích hằng ngày, hệ thống sẽ mở khóa ngay 3 nhóm nghề phù hợp nhất dành riêng cho bạn!
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    {onSelectQuiz && (
                      <button
                        onClick={() => onSelectQuiz('holland')}
                        className="px-6 py-3 bg-sage-600 hover:bg-sage-700 text-white rounded-full text-sm font-bold shadow-md transition-all transform hover:-translate-y-0.5"
                      >
                        Bắt đầu làm bài trắc nghiệm (10 phút) 🚀
                      </button>
                    )}
                    <button
                      onClick={() => setIsDemoMode(true)}
                      className="px-6 py-3 bg-amber-50 hover:bg-amber-100 text-amber-800 dark:bg-slate-700 dark:text-amber-300 rounded-full text-sm font-semibold border border-amber-200 transition-all"
                    >
                      ⚡ Xem thử dữ liệu mẫu ngay
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {hypotheses.map((hyp, index) => {
                    const family = CAREER_FAMILIES.find(f => f.id === hyp.careerFamilyId);
                    if (!family) return null;

                    return (
                      <div key={hyp.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-4xl">{family.icon}</span>
                            <span className="px-3 py-1 bg-sage-50 text-sage-700 dark:bg-slate-700 dark:text-sage-300 text-xs font-bold rounded-full">
                              Gợi ý #{index + 1}
                            </span>
                          </div>
                          <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">{family.name}</h4>
                          <p className="text-xs text-slate-400 mb-2">{family.nameEn}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{family.description}</p>
                          
                          <div className="space-y-3 text-xs border-t border-slate-100 dark:border-slate-700 pt-3">
                            <div>
                              <strong className="text-slate-700 dark:text-slate-200 block mb-1">Môn học nên học tốt:</strong>
                              <div className="flex flex-wrap gap-1">
                                {family.keySubjects.map(s => (
                                  <span key={s} className="px-2.5 py-1 bg-sage-100 text-sage-800 dark:bg-slate-700 dark:text-slate-300 rounded-lg font-medium">
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <strong className="text-slate-700 dark:text-slate-200 block mb-0.5">Vì sao hợp với bạn?</strong>
                              <p className="text-slate-500 dark:text-slate-400">{hyp.supportingEvidence[0]}</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 dark:border-slate-700 text-xs bg-sage-50/50 dark:bg-slate-900/40 p-3 rounded-2xl">
                          <span className="text-sage-700 dark:text-sage-300 font-bold block mb-1">💡 Việc bạn có thể thử ngay:</span>
                          <p className="text-slate-600 dark:text-slate-300 italic">{hyp.nextExperiment}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Bottom Step Forward Button */}
              <div className="p-6 bg-sage-50 dark:bg-slate-800/70 rounded-3xl border border-sage-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-sage-800 dark:text-sage-300">Đã chọn được ngành yêu thích?</span> Hãy xem lớp 10 nên đăng ký những môn học nào nhé!
                </div>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 bg-sage-600 hover:bg-sage-700 text-white font-bold rounded-full text-sm shadow-md transition-all flex items-center gap-2"
                >
                  Tiếp tục: Xem Lớp 10 nên chọn môn gì 👉
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SUBJECT PLANNER & OPTIONALITY */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                  <span>📚</span> Bước 2: Lớp 10 Nên Chọn Tổ Hợp Môn Gì?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Theo Chương trình Giáo dục Phổ thông 2018 (Thông tư 13/2022/TT-BGDĐT), bạn sẽ học 4 môn bắt buộc và chọn thêm 4 môn tự chọn.
                </p>
              </div>

              {/* Core Compulsory vs Electives */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 4 Compulsory Subjects */}
                <div className="p-6 bg-indigo-50/60 dark:bg-indigo-950/20 rounded-3xl border border-indigo-200 dark:border-indigo-900/40 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📌</span>
                    <h4 className="text-base font-bold text-indigo-900 dark:text-indigo-300">
                      4 Môn Bắt Buộc (Trường nào cũng học)
                    </h4>
                  </div>
                  <p className="text-xs text-indigo-800 dark:text-indigo-200 leading-relaxed">
                    Đây là 4 môn cốt lõi bắt buộc đối với tất cả học sinh THPT toàn quốc. Bạn không cần lo phải chọn các môn này:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {['Toán học', 'Ngữ văn', 'Tiếng Anh (Ngoại ngữ 1)', 'Lịch sử'].map((sub) => (
                      <div key={sub} className="p-3 bg-white dark:bg-slate-800 rounded-xl text-center text-xs font-bold text-slate-800 dark:text-slate-200 border border-indigo-100 dark:border-indigo-900 shadow-xs">
                        ✓ {sub}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Electives Suggested */}
                <div className="p-6 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-3xl border border-emerald-200 dark:border-emerald-900/40 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-300">
                      Môn Tự Chọn Nên Ưu Tiên (Cho bạn)
                    </h4>
                  </div>
                  <p className="text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed">
                    Dựa trên các ngành nghề bạn quan tâm ở Bước 1, đây là các môn tự chọn bạn nên đăng ký học ở lớp 10:
                  </p>
                  <div className="space-y-2">
                    {subjectRecommendations.filter(r => r.importance !== 'core_compulsory').slice(0, 3).map((rec) => (
                      <div key={rec.subjectId} className="p-3 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-between text-xs border border-emerald-100 dark:border-emerald-900">
                        <span className="font-bold text-slate-800 dark:text-slate-200">{rec.subjectName}</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 rounded-md font-semibold text-[10px]">
                          {rec.importanceLabel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Optionality Interactive Check */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-800 dark:text-slate-100">
                    🚪 Thử nghiệm: Kiểm tra mức độ mở rộng cơ hội nghề nghiệp
                  </h4>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-sage-100 text-sage-800 dark:bg-slate-700 dark:text-sage-300">
                    Độ mở: {optionalityScore.score}%
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Bấm chọn thử các môn bạn dự định học để xem tổ hợp này có giúp bạn tiếp cận được nhiều ngành nghề đại học sau này không:
                </p>
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
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                          isChecked
                            ? 'bg-sage-600 text-white border-sage-600 shadow-sm'
                            : 'bg-slate-50 text-slate-600 dark:bg-slate-700 dark:text-slate-300 border-slate-200'
                        }`}
                      >
                        {isChecked ? '✓ ' : '+ '}{s.name}
                      </button>
                    );
                  })}
                </div>
                <div className="p-3 bg-sage-50 dark:bg-slate-900/50 rounded-2xl text-xs text-slate-600 dark:text-slate-300">
                  💡 <strong>Đánh giá:</strong> {optionalityScore.summary} (Có thể tiếp cận <strong>{optionalityScore.accessibleFamilies.length}/{CAREER_FAMILIES.length}</strong> nhóm ngành).
                </div>
              </div>

              {/* Step Navigation Buttons */}
              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 text-xs font-bold transition-all"
                >
                  👈 Quay lại Bước 1
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-sage-600 hover:bg-sage-700 text-white font-bold rounded-full text-sm shadow-md transition-all flex items-center gap-2"
                >
                  Tiếp tục: Xem các trường Đại học & Ngành tương ứng 👉
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: UNIVERSITIES & ADMISSION PREVIEWS */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                  <span>🎓</span> Bước 3: Khám Phá Các Trường Đại Học & Kỳ Thi Tương Lai
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Đừng lo lắng về điểm số lúc này! Đây là danh sách tham khảo các trường đại học uy tín đào tạo nhóm ngành bạn thích và những kỳ thi bạn có thể tham gia ở lớp 12.
                </p>
              </div>

              {/* Admissions Explorer View Component */}
              <AdmissionsExplorer
                targetFamilyIds={targetFamilyIds}
                scoreProfile={scoreProfile}
              />

              {/* Step Navigation Buttons */}
              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 text-xs font-bold transition-all"
                >
                  👈 Quay lại Bước 2
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-3 bg-sage-600 hover:bg-sage-700 text-white font-bold rounded-full text-sm shadow-md transition-all flex items-center gap-2"
                >
                  Tiếp tục: Lập kế hoạch 3 việc làm ngay 👉
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ACTION PLAN & FAMILY CONVERSATION */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                  <span>🚀</span> Bước 4: Kế Hoạch 3 Việc Bạn Có Thể Làm Ngay Tuần Này
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Định hướng tương lai không phải là việc làm trong 1 ngày. Hãy bắt đầu bằng 3 bước nhỏ cực kỳ đơn giản:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center font-bold text-base">
                    1
                  </div>
                  <h4 className="font-bold text-base text-slate-800 dark:text-slate-100">
                    💬 Chia sẻ với Bố Mẹ
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Mở kết quả trắc nghiệm này cho bố mẹ cùng xem và nói: <em>"Con vừa tìm hiểu về 3 nhóm nghề này và thấy khá hứng thú, bố mẹ thấy thế nào ạ?"</em>.
                  </p>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-base">
                    2
                  </div>
                  <h4 className="font-bold text-base text-slate-800 dark:text-slate-100">
                    🔍 Xem 1 Video Thực Tế
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Lên YouTube gõ tìm kiếm: <em>"Một ngày làm việc của lập trình viên / kiến trúc sư / bác sĩ"</em> để xem công việc hằng ngày có thực sự giống như bạn tưởng tượng không.
                  </p>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base">
                    3
                  </div>
                  <h4 className="font-bold text-base text-slate-800 dark:text-slate-100">
                    📖 Tập trung Môn Then Chốt
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Giữ vững phong độ học tập ở các môn Toán, Ngoại ngữ và các môn tự chọn ưu tiên để luôn có nhiều cơ hội xét tuyển sau này.
                  </p>
                </div>
              </div>

              {/* Completion Celebration Card */}
              <div className="p-8 bg-gradient-to-r from-sage-500 to-sage-600 text-white rounded-3xl text-center space-y-4 shadow-lg">
                <span className="text-5xl">🎉</span>
                <h4 className="text-2xl font-bold font-display">
                  Chúc mừng bạn đã hoàn thành 4 Bước Khám Phá!
                </h4>
                <p className="text-sm text-white/90 max-w-xl mx-auto leading-relaxed">
                  Bạn đã có trong tay bức tranh toàn cảnh về sở thích cá nhân, cách chọn môn học lớp 10 và các trường đại học mục tiêu. Hãy luôn nhớ rằng tương lai là hành trình từng bước tích lũy và hoàn toàn có thể điều chỉnh bất cứ lúc nào!
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    onClick={onGoHome}
                    className="px-8 py-3 bg-white text-sage-800 hover:bg-cream-50 font-bold rounded-full text-sm shadow-md transition-all"
                  >
                    Về Trang Chủ PathAI
                  </button>
                  <button
                    onClick={() => setViewMode('advanced')}
                    className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-full text-sm border border-white/40 backdrop-blur-sm transition-all"
                  >
                    Xem Bảng Phân Tích Chi Tiết (Nâng cao) 🔬
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: ADVANCED 8-TAB DASHBOARD (FOR PARENTS, TEACHERS & DETAILED AUDIT)   */}
      {/* ========================================================================= */}
      {viewMode === 'advanced' && (
        <div className="space-y-8 animate-fade-in">
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
              1. Nhóm ngành tiềm năng ({hypotheses.length})
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
              🎯 5. Chiến lược Kỳ thi
            </button>
            <button
              onClick={() => setActiveTab('scenarios')}
              className={`pb-4 px-4 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'scenarios'
                  ? 'border-sage-600 text-sage-600 dark:text-sage-400 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              ⚡ 6. Thử nghiệm Điểm số
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
              8. Lộ trình hành động
            </button>
          </div>

          {/* Advanced Tab Content */}
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

              {hypotheses.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-4">
                  <span className="text-5xl">🧭</span>
                  <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    Chưa có dữ liệu trắc nghiệm Sở thích (RIASEC)
                  </h4>
                  <p className="text-sm text-slate-500 max-w-lg mx-auto">
                    Để hệ thống có căn cứ khoa học đề xuất 3–5 vùng nghề triển vọng và chiến lược chọn môn THPT phù hợp nhất, bạn cần thực hiện bài đánh giá Sở thích Holland.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    {onSelectQuiz && (
                      <button
                        onClick={() => onSelectQuiz('holland')}
                        className="px-6 py-3 bg-sage-600 hover:bg-sage-700 text-white rounded-2xl text-sm font-bold shadow-soft transition-all"
                      >
                        Làm trắc nghiệm RIASEC ngay (10 phút)
                      </button>
                    )}
                    <button
                      onClick={() => setIsDemoMode(true)}
                      className="px-6 py-3 bg-amber-50 hover:bg-amber-100 text-amber-800 dark:bg-slate-700 dark:text-amber-300 rounded-2xl text-sm font-semibold border border-amber-300 transition-all"
                    >
                      ⚡ Xem chế độ Demo Minh họa
                    </button>
                  </div>
                </div>
              ) : (
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
                              Gợi ý #{index + 1}
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
              )}
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
                  Phân loại mức độ quan trọng của các môn học theo Chương trình GDPT 2018 nhằm phục vụ tốt nhất cho các vùng nghề bạn đang quan tâm.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjectRecommendations.map(rec => {
                  const badgeColors: Record<string, string> = {
                    core_compulsory: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-300',
                    learning_priority_high: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-300',
                    learning_priority_medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-300',
                    learning_priority_low: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-300',
                    low_relevance: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 border-slate-200'
                  };

                  return (
                    <div key={rec.subjectId} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-slate-800 dark:text-slate-100">{rec.subjectName}</h4>
                          <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${badgeColors[rec.importance] || badgeColors.low_relevance}`}>
                            {rec.importanceLabel}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{rec.reason}</p>
                        {rec.supportingCareerFamilies.length > 0 && (
                          <p className="text-xs text-sage-600 dark:text-sage-400">
                            Hỗ trợ: {rec.supportingCareerFamilies.join(', ')}
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
