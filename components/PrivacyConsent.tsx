import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storageService';

const CONSENT_KEY = 'pathai:v2:consent';
const CURRENT_CONSENT_VERSION = '2026-03-v2';

interface ConsentData {
  version: string;
  timestamp: number;
  accepted: boolean;
}

const PrivacyConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [wipeSuccess, setWipeSuccess] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        const data: ConsentData = JSON.parse(stored);
        if (data.version === CURRENT_CONSENT_VERSION && data.accepted) {
          setShowBanner(false);
          return;
        }
      }
    } catch {
      // ignore JSON parse error
    }
    setShowBanner(true);
  }, []);

  const handleAccept = () => {
    const data: ConsentData = {
      version: CURRENT_CONSENT_VERSION,
      timestamp: Date.now(),
      accepted: true,
    };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save consent:', e);
    }
    setShowBanner(false);
  };

  const handleWipeAllData = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa TOÀN BỘ dữ liệu học tập, hồ sơ và trắc nghiệm trên thiết bị này không? Hành động này không thể hoàn tác.')) {
      StorageService.clearAllData();
      setWipeSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    }
  };

  return (
    <>
      {/* Bottom Sticky Privacy Banner */}
      {showBanner && (
        <aside
          role="region"
          aria-label="Thông báo quyền riêng tư và lưu trữ dữ liệu"
          className="fixed bottom-0 left-0 right-0 bg-slate-900/95 text-slate-100 border-t border-slate-700/80 p-4 z-50 shadow-2xl backdrop-blur-md font-sans"
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 text-xs md:text-sm text-slate-300 leading-relaxed">
              <span className="font-bold text-white flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Bảo vệ Quyền Riêng tư & Dữ liệu Học sinh (Local-First)
              </span>
              PathAI lưu trữ toàn bộ dữ liệu kết quả trắc nghiệm và hồ sơ học tập trực tiếp trên trình duyệt của bạn (Local Storage).
              Chúng tôi cam kết không bán dữ liệu, không theo dõi quảng cáo, và tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowPolicyModal(true)}
                className="text-xs md:text-sm text-slate-400 hover:text-white underline underline-offset-4 py-2 px-1 transition-colors"
              >
                Chính sách bảo mật
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs md:text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md active:scale-95"
              >
                Đồng ý & Tiếp tục
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Privacy Policy & Data Management Modal */}
      {showPolicyModal && (
        <div 
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setShowPolicyModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-2xl font-bold p-1 rounded-full"
              aria-label="Đóng cửa sổ chính sách"
            >
              &times;
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                🛡️
              </div>
              <div>
                <h3 id="privacy-modal-title" className="text-xl font-bold text-slate-900 dark:text-white">
                  Chính sách Quyền riêng tư & Bảo vệ Dữ liệu
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Phiên bản: {CURRENT_CONSENT_VERSION} | Áp dụng cho học sinh THCS & THPT</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
                  <span>💾</span> Lưu trữ hoàn toàn tại máy người dùng (Local Storage)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tất cả kết quả trắc nghiệm RIASEC, điểm học tập THPT, kế hoạch mục tiêu và lịch sử được lưu trữ độc quyền trong bộ nhớ máy cục bộ của bạn.
                  Không có cơ sở dữ liệu bên thứ ba nào thu thập tên tuổi hay danh tính của bạn mà không có sự cho phép.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
                  <span>🤖</span> AI An Toàn & Bảo Mật Payload
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Khi bạn tương tác với Trợ lý AI Tham vấn (AI Counsel), chỉ nội dung câu hỏi và ngữ cảnh học tập cần thiết được gửi đến endpoint API máy chủ bảo mật.
                  Không lưu trữ lịch sử đàm thoại cho mục đích huấn luyện thương mại.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
                  <span>📊</span> Thống kê Ẩn danh Phục vụ Nghiên cứu & Hoàn thiện Trải nghiệm
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Nhằm tối ưu hóa trải nghiệm và nghiên cứu xu hướng hướng nghiệp theo từng vùng miền (tỉnh/thành, nhóm khối lớp), PathAI chỉ thu thập các chỉ số phân tích hoàn toàn ẩn danh (Zero PII: không lưu họ tên, email, số điện thoại hay vị trí GPS cá nhân). Quy trình này tuân thủ đầy đủ Nghị định 13/2023/NĐ-CP và Luật Trẻ em 2016.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
                  <span>🗑️</span> Quyền được lãng quên & Xóa dữ liệu (Right to Erasure)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  Bạn có toàn quyền xóa vĩnh viễn mọi dữ liệu cá nhân đã lưu trên trình duyệt của máy tính/thiết bị này chỉ với một thao tác bấm nút.
                </p>
                
                {wipeSuccess ? (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                    ✓ Đã xóa toàn bộ dữ liệu thành công. Trang web đang tải lại...
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleWipeAllData}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-semibold rounded-xl border border-rose-200 dark:border-rose-800 transition-colors"
                  >
                    <span>🗑️</span> Xóa toàn bộ dữ liệu trên thiết bị này
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPolicyModal(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => {
                  handleAccept();
                  setShowPolicyModal(false);
                }}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Xác nhận đồng ý
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrivacyConsent;
