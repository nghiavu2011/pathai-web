import React, { useState, useMemo } from 'react';
import { StudentScoreProfile, FitCategory, ProgramMatchResult } from '../../data/types/admissions';
import { matchUniversityPrograms } from '../../data/engines/universityMatchingEngine';
import { UNIVERSITIES, ADMISSION_PROGRAMS } from '../../data/admissionsData';

interface AdmissionsExplorerProps {
  targetFamilyIds: string[];
  scoreProfile: StudentScoreProfile;
}

export const AdmissionsExplorer: React.FC<AdmissionsExplorerProps> = ({
  targetFamilyIds,
  scoreProfile
}) => {
  const [selectedFitFilter, setSelectedFitFilter] = useState<FitCategory | 'all'>('all');

  const universityMatches = useMemo(() => {
    return matchUniversityPrograms(scoreProfile, targetFamilyIds, ADMISSION_PROGRAMS, UNIVERSITIES);
  }, [scoreProfile, targetFamilyIds]);

  const matchCounts = useMemo(() => ({
    dream: universityMatches.filter(m => m.fitCategory === 'dream').length,
    target: universityMatches.filter(m => m.fitCategory === 'target').length,
    safe: universityMatches.filter(m => m.fitCategory === 'safe').length,
    explore: universityMatches.filter(m => m.fitCategory === 'explore').length,
  }), [universityMatches]);

  const filteredMatches = useMemo(() => {
    if (selectedFitFilter === 'all') return universityMatches;
    return universityMatches.filter(m => m.fitCategory === selectedFitFilter);
  }, [universityMatches, selectedFitFilter]);

  return (
    <div className="space-y-6">
      {/* Portfolio Summary Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-soft">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Danh mục Tuyển sinh Khả dụng (Admission Portfolio)
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Được phân tích tự động dựa trên Điểm học tập dự kiến & Các nhóm ngành bạn hướng tới.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFitFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFitFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Tất cả ({universityMatches.length})
            </button>
            <button
              onClick={() => setSelectedFitFilter('safe')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFitFilter === 'safe' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700'
              }`}
            >
              An toàn ({matchCounts.safe})
            </button>
            <button
              onClick={() => setSelectedFitFilter('target')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFitFilter === 'target' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700'
              }`}
            >
              Mục tiêu ({matchCounts.target})
            </button>
            <button
              onClick={() => setSelectedFitFilter('dream')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFitFilter === 'dream' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700'
              }`}
            >
              Thử thách ({matchCounts.dream})
            </button>
          </div>
        </div>

        {/* Score Inputs Preview */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/60 text-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="font-bold text-slate-700 dark:text-slate-300">Hồ sơ điểm giả lập:</span>
            <span>Toán: <strong>{scoreProfile.thptScores['toan']}</strong></span>
            <span>Lý: <strong>{scoreProfile.thptScores['ly']}</strong></span>
            <span>Hóa: <strong>{scoreProfile.thptScores['hoa']}</strong></span>
            <span>Anh: <strong>{scoreProfile.thptScores['anh']}</strong></span>
            <span>TSA: <strong>{scoreProfile.tsaScore}đ</strong></span>
            <span>IELTS: <strong>{scoreProfile.ieltsScore}</strong></span>
          </div>
          <span className="text-sage-600 font-semibold italic">Mẹo: Vào tab "Mô phỏng Điểm" để thử thay đổi điểm số!</span>
        </div>
      </div>

      {/* Programs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMatches.map(m => {
          const badgeColors = {
            safe: 'bg-emerald-100 text-emerald-800 border-emerald-300',
            target: 'bg-blue-100 text-blue-800 border-blue-300',
            dream: 'bg-purple-100 text-purple-800 border-purple-300',
            explore: 'bg-slate-100 text-slate-700 border-slate-300'
          };

          return (
            <div key={m.program.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-xs font-bold text-sage-600 dark:text-sage-400 block mb-0.5">
                      {m.university.shortName} ({m.university.code})
                    </span>
                    <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                      {m.program.programName}
                    </h4>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase shrink-0 border ${badgeColors[m.fitCategory]}`}>
                    {m.fitCategoryLabel}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-3">{m.program.facultyName} • Học phí: ~{m.program.tuitionPerYearMillionVND} triệu/năm</p>

                <div className="space-y-2 text-xs bg-slate-50 dark:bg-slate-900/40 p-3.5 rounded-2xl">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phương thức tối ưu:</span>
                    <strong className="text-slate-700 dark:text-slate-200">{m.bestMethod.methodName} {m.bestMethod.combinationCode ? `(${m.bestMethod.combinationCode})` : ''}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Điểm chuẩn năm trước:</span>
                    <strong className="text-slate-700 dark:text-slate-200">{m.bestMethod.cutoffScoreLastYear} / {m.bestMethod.maxScale}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Chênh lệch dự kiến:</span>
                    <strong className={m.estimatedMargin >= 0 ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                      {m.estimatedMargin >= 0 ? `+${m.estimatedMargin}` : m.estimatedMargin} điểm
                    </strong>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  💡 {m.reasons[0]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdmissionsExplorer;
