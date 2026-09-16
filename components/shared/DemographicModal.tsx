import React, { useState } from 'react';
import { AnonymousDemographics, TelemetryService } from '../../services/telemetryService';

interface DemographicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleted?: () => void;
}

const VIETNAM_PROVINCES = [
  'Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ',
  'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu',
  'Bắc Ninh', 'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước',
  'Bình Thuận', 'Cà Mau', 'Cao Bằng', 'Đắk Lắk', 'Đắk Nông',
  'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang',
  'Hà Nam', 'Hà Tĩnh', 'Hải Dương', 'Hậu Giang', 'Hòa Bình',
  'Hưng Yên', 'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu',
  'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định',
  'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên',
  'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị',
  'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên',
  'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang', 'Trà Vinh', 'Tuyên Quang',
  'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái', 'Khác'
];

export const DemographicModal: React.FC<DemographicModalProps> = ({ isOpen, onClose, onCompleted }) => {
  const [gradeGroup, setGradeGroup] = useState<AnonymousDemographics['gradeGroup']>('grade_9');
  const [province, setProvince] = useState<string>('Hà Nội');
  const [gender, setGender] = useState<AnonymousDemographics['gender']>('female');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    TelemetryService.saveDemographics({
      gradeGroup,
      province,
      gender
    });
    if (onCompleted) onCompleted();
    onClose();
  };

  const handleSkip = () => {
    TelemetryService.setPrompted();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-slate-100 dark:border-slate-700 relative animate-scale-in">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-700 dark:bg-slate-700 dark:text-sage-300 mx-auto flex items-center justify-center text-2xl mb-3 shadow-inner">
            🌱
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
            Cá nhân hóa trải nghiệm
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
            Dành 15 giây chọn thông tin để PathAI gợi ý tổ hợp môn và trường đại học sát với bạn nhất.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {/* Grade / Role */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-200 text-xs uppercase tracking-wider mb-2">
              1. Bạn hiện đang là:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'grade_9', label: 'Học sinh Lớp 9' },
                { key: 'grade_10', label: 'Học sinh Lớp 10' },
                { key: 'grade_11', label: 'Học sinh Lớp 11' },
                { key: 'grade_12', label: 'Học sinh Lớp 12' },
                { key: 'parent', label: 'Phụ huynh' },
                { key: 'other', label: 'Khác / Sinh viên' },
              ].map(item => (
                <button
                  type="button"
                  key={item.key}
                  onClick={() => setGradeGroup(item.key as any)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                    gradeGroup === item.key
                      ? 'bg-sage-600 text-white border-sage-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Province */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-200 text-xs uppercase tracking-wider mb-1.5">
              2. Khu vực sinh sống / học tập:
            </label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-sage-500"
            >
              {VIETNAM_PROVINCES.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Gender (Optional) */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-200 text-xs uppercase tracking-wider mb-1.5">
              3. Giới tính (tùy chọn):
            </label>
            <div className="flex gap-2">
              {[
                { key: 'female', label: 'Nữ' },
                { key: 'male', label: 'Nam' },
                { key: 'other', label: 'Khác' },
                { key: 'undisclosed', label: 'Bỏ qua' },
              ].map(g => (
                <button
                  type="button"
                  key={g.key}
                  onClick={() => setGender(g.key as any)}
                  className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                    gender === g.key
                      ? 'bg-sage-600 text-white border-sage-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3 bg-sage-50/60 dark:bg-slate-900/40 rounded-xl border border-sage-200/60 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
            <span className="text-sage-600 dark:text-sage-400 font-bold shrink-0">🛡️</span>
            <span>
              <strong>Ẩn danh 100%:</strong> Không yêu cầu tên thật, email hay số điện thoại. Dữ liệu phục vụ nghiên cứu giáo dục theo Nghị định 13/2023/NĐ-CP.
            </span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleSkip}
              className="px-4 py-2.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-semibold"
            >
              Bỏ qua bước này
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
            >
              Lưu & Bắt đầu Khám phá →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DemographicModal;
