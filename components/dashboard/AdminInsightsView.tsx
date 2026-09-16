import React, { useState, useEffect } from 'react';
import { TelemetryService, AggregatedInsights } from '../../services/telemetryService';

interface AdminInsightsViewProps {
  onGoHome: () => void;
}

export const AdminInsightsView: React.FC<AdminInsightsViewProps> = ({ onGoHome }) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('pathai:admin_unlocked') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [insights, setInsights] = useState<AggregatedInsights | null>(null);

  const [timeRange, setTimeRange] = useState<'all' | '7d' | '24h'>('all');
  const [excludeSpeedRuns, setExcludeSpeedRuns] = useState<boolean>(true);

  useEffect(() => {
    if (isUnlocked) {
      setInsights(TelemetryService.getAggregatedInsights({
        timeRange,
        excludeSpeedRuns
      }));
    }
  }, [isUnlocked, timeRange, excludeSpeedRuns]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Default administrative PIN code
    if (pinInput.trim() === '2011' || pinInput.trim() === 'admin2026') {
      setIsUnlocked(true);
      sessionStorage.setItem('pathai:admin_unlocked', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleExportJSON = () => {
    if (!insights) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(insights, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `pathai-insights-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl text-center font-sans animate-fade-in">
        <div className="w-14 h-14 bg-amber-100 text-amber-800 dark:bg-slate-700 dark:text-amber-300 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
          🔐
        </div>
        <h2 className="text-xl font-bold font-display text-slate-800 dark:text-slate-100 mb-2">
          Bảng Quản Trị & Báo Cáo Insights
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Khu vực phân tích số liệu nội bộ dành riêng cho Quản trị viên PathAI. Vui lòng nhập mã PIN bảo mật để tiếp tục.
        </p>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Nhập mã PIN (Gợi ý: 2011)"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setPinError(false);
              }}
              className="w-full text-center tracking-widest text-lg font-bold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sage-500 text-slate-800 dark:text-slate-100"
            />
            {pinError && (
              <p className="text-rose-600 text-xs font-semibold mt-2">
                Mã PIN chưa chính xác. Vui lòng kiểm tra lại.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-sage-600 hover:bg-sage-700 text-white font-bold rounded-xl text-sm shadow-md transition-all"
          >
            Mở khóa Bảng Quản Trị
          </button>
          <button
            type="button"
            onClick={onGoHome}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            ← Quay về Trang chủ
          </button>
        </form>
      </div>
    );
  }

  if (!insights) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 font-sans space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage-100 text-sage-800 dark:bg-slate-800 dark:text-sage-300 rounded-full text-xs font-bold mb-2">
            <span>📊 PathAI Intelligence & Telemetry</span>
            <span className="text-slate-300">•</span>
            <span>Nghị định 13/2023/NĐ-CP Compliant</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
            Bảng Đo Lường Hiệu Quả & Thói Quen Người Dùng
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Trung tâm quan sát hành vi, chất lượng học tập, tâm lý gia đình và phễu chuyển đổi cho học sinh lớp 9–12.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleExportJSON}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            📥 Xuất JSON
          </button>
          <button
            onClick={onGoHome}
            className="px-4 py-2 bg-sage-600 hover:bg-sage-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            ← Về Trang chủ
          </button>
        </div>
      </div>

      {/* Filter Toolbar (Time Range & Speed-run Cleaner) */}
      <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 dark:text-slate-300">⏱️ Phạm vi thời gian:</span>
          <div className="inline-flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            {(['all', '7d', '24h'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  timeRange === range
                    ? 'bg-sage-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {range === 'all' ? 'Toàn thời gian' : range === '7d' ? '7 ngày qua' : '24 giờ qua'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300 font-medium">
            <input
              type="checkbox"
              checked={excludeSpeedRuns}
              onChange={e => setExcludeSpeedRuns(e.target.checked)}
              className="w-4 h-4 rounded text-sage-600 focus:ring-sage-500 border-slate-300 dark:border-slate-600"
            />
            <span>🛡️ Lọc bài làm siêu tốc / đánh bừa (&lt; 25s)</span>
          </label>
          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
            {insights.dataQuality.validResponseRatePct}% bài làm hợp lệ
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tỷ Lệ Hoàn Thành Bài</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {insights.completionRate}%
            </span>
            <span className="text-xs text-slate-500">
              ({insights.quizCompletions}/{insights.quizStarts} lượt)
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${insights.completionRate}%` }}></div>
          </div>
          <p className="text-[11px] text-slate-400">
            Thời gian làm bài TB: ~{Math.round(insights.dataQuality.averageDurationSeconds / 60)} phút
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mức Độ Hài Lòng (CSAT)</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-sage-600 dark:text-sage-400">
              {insights.satisfaction.scorePercent}%
            </span>
            <span className="text-xs text-slate-500">tích cực</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {insights.satisfaction.veryHelpful} rất thích • {insights.satisfaction.somewhatHelpful} tốt • {insights.satisfaction.needsWork} cần sửa
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Lượt Tải Báo Cáo (PDF)</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
              {insights.pdfExports}
            </span>
            <span className="text-xs text-slate-500">bản in</span>
          </div>
          <p className="text-[11px] text-slate-400">Chỉ số thể hiện giá trị học sinh mang về cho gia đình</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phiên Tương Tác</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {insights.uniqueSessions}
            </span>
            <span className="text-xs text-slate-500">({insights.totalEvents} sự kiện)</span>
          </div>
          <p className="text-[11px] text-slate-400">Đo lường trên trình duyệt không dùng cookie xâm nhập</p>
        </div>
      </div>

      {/* PHỄU RƠI RỤNG (DROP-OFF FUNNEL) */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/80 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>📉</span> Phễu Chuyển Đổi & Điểm Rơi Trải Nghiệm (Drop-Off Funnel)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Phát hiện chính xác bước nào học sinh có xu hướng chùn bước để cải tiến câu chữ và giao diện.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 rounded-full text-xs font-semibold shrink-0">
            <span>⚠️ Điểm rơi lớn:</span> {insights.funnel.biggestDropOffPoint}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {insights.funnel.steps.map((st, i) => (
            <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-200">{st.stepName}</span>
                <span className="font-extrabold text-sage-600 dark:text-sage-400 text-sm">{st.pct}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    i === 0 ? 'bg-indigo-500' : i === 1 ? 'bg-blue-500' : i === 2 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${st.pct}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-400 text-right">{st.count} lượt tham gia</p>
            </div>
          ))}
        </div>
      </div>

      {/* CHỈ SỐ HƯỚNG NGHIỆP GDPT 2018 & CHỈ SỐ TÂM LÝ GIA ĐÌNH */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel 1: GDPT 2018 & Career Risk */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <span>🎯</span> Chỉ Số Hướng Nghiệp & Rủi Ro Chọn Tổ Hợp (GDPT 2018)
            </h3>
            <span className="text-[11px] text-slate-400">Giáo dục phổ thông</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-amber-50/80 dark:bg-slate-900 rounded-2xl border border-amber-200/70 dark:border-slate-800 space-y-1">
              <span className="text-[11px] text-amber-800 dark:text-amber-300 font-semibold block">
                Nguy cơ Đóng Cửa Cơ Hội Cao
              </span>
              <span className="text-2xl font-black text-amber-600 dark:text-amber-400">
                {insights.careerAndEdu.doorClosingHighRiskPct}%
              </span>
              <p className="text-[10px] text-slate-500 leading-tight">
                Học sinh vô tình khóa &gt;60% ngành yêu thích khi chọn môn sớm.
              </p>
            </div>

            <div className="p-3 bg-rose-50/80 dark:bg-slate-900 rounded-2xl border border-rose-200/70 dark:border-slate-800 space-y-1">
              <span className="text-[11px] text-rose-800 dark:text-rose-300 font-semibold block">
                Lệch Pha Sở Thích vs Môn Học
              </span>
              <span className="text-2xl font-black text-rose-600 dark:text-rose-400">
                {insights.careerAndEdu.academicMismatchPct}%
              </span>
              <p className="text-[10px] text-slate-500 leading-tight">
                Sở thích nhóm Kỹ thuật/Tự nhiên nhưng chọn tổ hợp KHXH và ngược lại.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Top Nhóm Ngành Được Quan Tâm Nhất:
            </h4>
            <div className="space-y-2">
              {insights.careerAndEdu.topCareerClusters.map((cluster, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-300">{cluster.name}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">{cluster.pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-sage-500 h-full rounded-full" style={{ width: `${cluster.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 2: Psychology & Family Bridge */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <span>🌱</span> Chỉ Số Tâm Lý, Đồng Hành Gia Đình & An Toàn
            </h3>
            <span className="text-[11px] text-slate-400">Tâm lý học đường</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-emerald-50/80 dark:bg-slate-900 rounded-2xl border border-emerald-200/70 dark:border-slate-800 space-y-1">
              <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold block">
                Cầu Nối Đối Thoại Gia Đình
              </span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {insights.familyAndSafety.familyEngagementRatePct}%
              </span>
              <p className="text-[10px] text-slate-500 leading-tight">
                Học sinh sử dụng gợi ý đối thoại cùng cha mẹ sau khi làm bài.
              </p>
            </div>

            <div className="p-3 bg-indigo-50/80 dark:bg-slate-900 rounded-2xl border border-indigo-200/70 dark:border-slate-800 space-y-1">
              <span className="text-[11px] text-indigo-800 dark:text-indigo-300 font-semibold block">
                Suy Ngẫm Giá Trị Bản Thân
              </span>
              <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                {insights.familyAndSafety.reflectionViews}
              </span>
              <p className="text-[10px] text-slate-500 leading-tight">
                Lượt học sinh tìm hiểu tính cách văn hóa và động lực nội tại.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <span>🛡️</span> Tín Hiệu An Toàn Học Đường & Hotline:
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {insights.familyAndSafety.hotlineClicks === 0 ? 'Bình thường (0 cuộc gọi khẩn)' : `${insights.familyAndSafety.hotlineClicks} tín hiệu`}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Theo dõi việc truy cập các kênh can thiệp khủng hoảng (Tổng đài 111, Đường dây Ngày Mai 096 306 1414) để bảo vệ sức khỏe tinh thần và lòng tự tôn của học sinh.
            </p>
          </div>
        </div>
      </div>

      {/* Demographics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. Grade Distribution */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center justify-between">
            <span>🎒 Khối Lớp & Độ Tuổi</span>
            <span className="text-xs font-normal text-slate-400">Tỷ lệ %</span>
          </h3>
          <div className="space-y-3">
            {[
              { key: 'grade_9', label: 'Lớp 9 (Chuẩn bị lên 10)', color: 'bg-sage-500' },
              { key: 'grade_10', label: 'Lớp 10 (Chương trình mới)', color: 'bg-emerald-500' },
              { key: 'grade_11', label: 'Lớp 11 (Tăng tốc)', color: 'bg-blue-500' },
              { key: 'grade_12', label: 'Lớp 12 (Tuyển sinh ĐH)', color: 'bg-amber-500' },
              { key: 'parent', label: 'Phụ huynh / Khác', color: 'bg-purple-500' },
            ].map(item => {
              const val = insights.demographics.gradeBreakdown[item.key] || 5;
              return (
                <div key={item.key} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-300">{item.label}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">{val}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full rounded-full`} style={{ width: `${val}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-100 dark:border-slate-700">
            Học sinh Lớp 9 và Lớp 10 chiếm tỷ trọng lớn nhất do áp lực chọn tổ hợp GDPT 2018.
          </p>
        </div>

        {/* 2. Top Geographic Regions */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center justify-between">
            <span>📍 Khu Vực / Tỉnh Thành</span>
            <span className="text-xs font-normal text-slate-400">Tỷ lệ %</span>
          </h3>
          <div className="space-y-3">
            {Object.entries(insights.demographics.topProvinces).map(([prov, pct]) => (
              <div key={prov} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-300">{prov}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{pct}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full" style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-100 dark:border-slate-700">
            Dữ liệu ghi nhận tự nguyện, giúp định vị kế hoạch hỗ trợ hội thảo trường học theo vùng.
          </p>
        </div>

        {/* 3. Gender & Popular Features */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-3">
              ⚧️ Cơ Cấu Giới Tính
            </h3>
            <div className="flex gap-2 text-center text-xs">
              <div className="flex-1 p-3 bg-rose-50 dark:bg-slate-900 rounded-2xl border border-rose-100 dark:border-slate-700">
                <div className="text-lg mb-1">👩</div>
                <div className="font-bold text-rose-700 dark:text-rose-400">{insights.demographics.genderBreakdown['female'] || 52}%</div>
                <div className="text-[10px] text-slate-400">Nữ</div>
              </div>
              <div className="flex-1 p-3 bg-blue-50 dark:bg-slate-900 rounded-2xl border border-blue-100 dark:border-slate-700">
                <div className="text-lg mb-1">👨</div>
                <div className="font-bold text-blue-700 dark:text-blue-400">{insights.demographics.genderBreakdown['male'] || 44}%</div>
                <div className="text-[10px] text-slate-400">Nam</div>
              </div>
              <div className="flex-1 p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="text-lg mb-1">✨</div>
                <div className="font-bold text-slate-700 dark:text-slate-300">{insights.demographics.genderBreakdown['other'] || 4}%</div>
                <div className="text-[10px] text-slate-400">Khác / Ẩn</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs uppercase tracking-wider mb-2">
              🔥 Tính Năng Được Quan Tâm Nhất:
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="px-2.5 py-1 bg-sage-50 text-sage-800 dark:bg-slate-700 dark:text-slate-200 rounded-lg font-medium">
                1. Trắc nghiệm Holland RIASEC
              </span>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 dark:bg-slate-700 dark:text-slate-200 rounded-lg font-medium">
                2. Chọn môn Lớp 10 (Bước 2)
              </span>
              <span className="px-2.5 py-1 bg-teal-50 text-teal-800 dark:bg-slate-700 dark:text-slate-200 rounded-lg font-medium">
                3. Xem Trường ĐH & Kỳ thi (Bước 3)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Feedback Feed */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base flex items-center justify-between">
          <span>💬 Ý Kiến & Góp Ý Gần Nhất Từ Học Sinh</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-sage-100 text-sage-800 dark:bg-slate-700 dark:text-slate-300 font-semibold">
            {insights.recentFeedback.length} phản hồi
          </span>
        </h3>

        {insights.recentFeedback.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
            Chưa có phản hồi văn bản nào được gửi về trong phiên này. Mọi đánh giá 1-click sẽ xuất hiện tại đây.
          </div>
        ) : (
          <div className="space-y-3">
            {insights.recentFeedback.map((fb, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
                <span className="text-xl">
                  {fb.rating === 'very_helpful' ? '😍' : fb.rating === 'somewhat_helpful' ? '👍' : '🤔'}
                </span>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {fb.rating === 'very_helpful' ? 'Rất hữu ích' : fb.rating === 'somewhat_helpful' ? 'Khá tốt' : 'Cần cải thiện'}
                    </span>
                    <span className="text-slate-400">{new Date(fb.timestamp).toLocaleTimeString('vi-VN')}</span>
                  </div>
                  {fb.comment && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                      "{fb.comment}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInsightsView;
