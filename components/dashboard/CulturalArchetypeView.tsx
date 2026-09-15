import React, { useState, useMemo } from 'react';
import { CategoryKey } from '../../types';
import { synthesizeEasternArchetype } from '../../data/engines/archetypeEngine';
import { EASTERN_ARCHETYPES, ELEMENT_TEMPERAMENTS } from '../../data/archetypesData';

interface CulturalArchetypeViewProps {
  riasecScores: Record<CategoryKey, number>;
}

export const CulturalArchetypeView: React.FC<CulturalArchetypeViewProps> = ({
  riasecScores
}) => {
  const [birthYear, setBirthYear] = useState<number>(2008);
  const [selectedStarId, setSelectedStarId] = useState<string | null>(null);

  const synthesis = useMemo(() => {
    return synthesizeEasternArchetype({
      riasecScores,
      birthYear
    });
  }, [riasecScores, birthYear]);

  const currentStar = useMemo(() => {
    if (selectedStarId) {
      return EASTERN_ARCHETYPES.find(s => s.id === selectedStarId) || synthesis.dominantStar;
    }
    return synthesis.dominantStar;
  }, [selectedStarId, synthesis.dominantStar]);

  return (
    <div className="space-y-8 animate-slow-fade">
      {/* Academic Header Banner */}
      <div className="bg-gradient-to-r from-amber-900/90 via-slate-800 to-sage-900 text-white p-8 rounded-[32px] border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-200 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>🏛️ Học thuyết Tâm lý Phân tích & Bản sắc Đông phương</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-amber-100">
            Khuôn Mẫu Khí Chất & Gương Soi Tâm Lý
          </h2>
          <p className="text-slate-300 text-sm font-light leading-relaxed">
            Sự giao thoa học thuật giữa <strong>Lý thuyết Nguyên mẫu của Carl Jung (Jungian Archetypes)</strong>, 
            trắc nghiệm sở thích RIASEC và <strong>14 Khuôn mẫu Khí chất Đông phương</strong>. 
            Giúp bạn thấu hiểu thiên bẩm, nhận diện điểm mù tâm lý để phát triển bản thân trọn vẹn.
          </p>
        </div>
      </div>

      {/* Main Persona Showcase Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Archetype Badge */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-soft text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-amber-200 flex items-center justify-center text-4xl shadow-lg shadow-amber-500/20">
            🌟
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block mb-1">
              Chính Tinh Đại Diện
            </span>
            <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-slate-100">
              {currentStar.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1">{currentStar.jungianArchetype}</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-900/50 border border-amber-200/50 text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-left">
            <p><strong>Nhóm khí chất:</strong> {currentStar.groupNameVi}</p>
            <p className="mt-1"><strong>Hành khí chất:</strong> {synthesis.dominantElement.nameVi}</p>
            <p className="mt-1"><strong>Mã RIASEC tương đồng:</strong> {currentStar.matchingRiasec.join(', ')}</p>
          </div>

          <div className="text-xs text-slate-500 border-t border-slate-100 dark:border-slate-700 pt-4">
            <label className="block font-semibold mb-2">Năm sinh đối chiếu (Can-Chi):</label>
            <select
              value={birthYear}
              onChange={e => setBirthYear(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-medium"
            >
              {[2006, 2007, 2008, 2009, 2010, 2011].map(y => (
                <option key={y} value={y}>Năm {y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column: Deep Psychological Narrative & Growth Pillars */}
        <div className="lg:col-span-2 space-y-6">
          {/* Narrative Card */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-soft space-y-4">
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span>🪞</span> Luận giải Tâm lý & Bản sắc Tự nhiên
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              {currentStar.coreDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
              <div className="space-y-2">
                <strong className="text-xs uppercase tracking-wider text-emerald-600 font-bold block">
                  ✨ Điểm Sáng Tự Nhiên (Core Strengths):
                </strong>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {currentStar.coreStrengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500">✓</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <strong className="text-xs uppercase tracking-wider text-amber-600 font-bold block">
                  🌱 Vùng Cần Nuôi Dưỡng (Growth Areas):
                </strong>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {currentStar.growthOpportunities.map((g, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500">→</span> {g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Growth Mindset & Shadow Work */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-700 space-y-4">
            <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span>🧭</span> Nhận diện Điểm mù & Chiến lược Tư duy Phát triển
            </h4>
            
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3.5 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/50">
                <strong className="text-slate-800 dark:text-slate-200 block mb-1">Môi trường làm việc lý tưởng:</strong>
                <p>{currentStar.idealWorkEnvironments.join(' • ')}</p>
              </div>

              <div className="p-3.5 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/50">
                <strong className="text-slate-800 dark:text-slate-200 block mb-1">Châm ngôn hành động:</strong>
                <p className="italic text-sage-700 dark:text-sage-300 font-medium">"{currentStar.motto}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Elements Workstyle Dynamics Grid */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-soft space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            5 Dạng Khí Chất Ngũ Hành Trong Công Việc (Workstyle Dynamics)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Mỗi cá nhân đều sở hữu sự pha trộn của các dòng năng lượng làm việc. Hãy khám phá phong cách chủ đạo của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.values(ELEMENT_TEMPERAMENTS).map(elem => {
            const isDominant = elem.element === synthesis.dominantElement.element;

            return (
              <div
                key={elem.element}
                className={`p-5 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                  isDominant
                    ? 'bg-amber-50/70 border-amber-400 dark:bg-slate-900 dark:border-amber-500/80 shadow-md ring-2 ring-amber-400/30'
                    : 'bg-slate-50 dark:bg-slate-700/40 border-slate-100 dark:border-slate-700 opacity-85'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{elem.symbol}</span>
                    {isDominant && (
                      <span className="px-2 py-0.5 bg-amber-500 text-white rounded-full text-[9px] font-extrabold uppercase">
                        Chủ đạo
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{elem.nameVi}</h4>
                  <p className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold mt-0.5">{elem.keyword}</p>
                </div>

                <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1.5 border-t border-slate-200/50 pt-2">
                  <p><strong>Phong cách:</strong> {elem.workStyle}</p>
                  <p><strong>Giao tiếp:</strong> {elem.communicationStyle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CulturalArchetypeView;
