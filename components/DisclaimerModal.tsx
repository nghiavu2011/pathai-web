import React, { useState, useEffect } from 'react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'terms' | 'methodology' | 'safety' | 'privacy' | 'sources';
}

type TabType = 'terms' | 'methodology' | 'safety' | 'privacy' | 'sources';

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose, defaultTab = 'terms' }) => {
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab, isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in font-sans"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="trust-modal-title"
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-4xl mx-auto relative transform transition-transform duration-300 animate-scale-in flex flex-col max-h-[90vh] border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex justify-between items-center">
          <div>
            <h2 id="trust-modal-title" className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              Trung Tâm Minh Bạch & An Toàn Học Đường
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wider mt-1">
              PathAI Student 9–12 | Chuẩn hóa theo CTGDPT 2018 & Nghị định 13/2023/NĐ-CP
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Đóng cửa sổ"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/40 px-6 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('terms')}
            className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === 'terms' ? 'border-accent text-accent-dark dark:text-accent-light' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
          >
            1. Điều khoản & Miễn trừ
          </button>
          <button
            onClick={() => setActiveTab('methodology')}
            className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === 'methodology' ? 'border-accent text-accent-dark dark:text-accent-light' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
          >
            2. Phương pháp khoa học
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === 'safety' ? 'border-accent text-accent-dark dark:text-accent-light' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
          >
            3. An toàn AI & Trẻ em
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === 'privacy' ? 'border-accent text-accent-dark dark:text-accent-light' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
          >
            4. Bảo mật dữ liệu
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === 'sources' ? 'border-accent text-accent-dark dark:text-accent-light' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
          >
            5. Nguồn dữ liệu 2026
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-8 overflow-y-auto text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-6">
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-2xl">
                <p className="font-bold text-amber-800 dark:text-amber-300 mb-1">Cảnh báo bản chất dịch vụ:</p>
                <p className="text-xs">PathAI là công cụ đồng hành hỗ trợ ra quyết định học tập và khám phá sở thích. Mọi kết quả mang tính chất tham khảo, khơi gợi hướng đi, không thay thế cho chẩn đoán y tế, tâm lý trị liệu hay tư vấn pháp lý.</p>
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Giới hạn trách nhiệm</h3>
              <p>Học sinh và phụ huynh là chủ thể ra quyết định cuối cùng. PathAI cung cấp thông tin đối chiếu, phân tích rủi ro đóng mở cơ hội, nhưng không chịu trách nhiệm đối với các quyết định tuyển sinh cá nhân.</p>
            </div>
          )}

          {activeTab === 'methodology' && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Nguyên tắc đánh giá & Không phán nghề</h3>
              <p>Hệ thống tích hợp 11 công cụ trắc nghiệm tâm lý học kinh điển (Holland RIASEC, Gardner MI, Big Five OCEAN, Schein Career Anchors, Duckworth Grit...).</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li><strong>Không dán nhãn định mệnh:</strong> Kết quả được thể hiện dưới dạng <em>Giả thuyết nghề nghiệp (Career Hypotheses)</em> để học sinh kiểm chứng qua môn học và dự án thực tế.</li>
                <li><strong>Không điểm giả định:</strong> Thiếu dữ liệu điểm học tập sẽ trả về trạng thái Khám phá (Explore) thay vì tự gán số điểm.</li>
                <li><strong>Tách bạch chiêm nghiệm văn hóa:</strong> 14 Chính tinh và Ngũ hành được xếp riêng ở mục Reflection, hoàn toàn không làm sai lệch điểm trắc nghiệm RIASEC.</li>
              </ul>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Chính sách An toàn AI & Phòng ngừa Khủng hoảng</h3>
              <p>Trợ lý AI của PathAI hoạt động với ranh giới an toàn nghiêm ngặt dành cho trẻ vị thành niên:</p>
              <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 rounded-2xl text-xs space-y-2 text-rose-900 dark:text-rose-200">
                <p className="font-bold">Kênh hỗ trợ khẩn cấp 24/7 khi gặp khủng hoảng tâm lý:</p>
                <p>📞 <strong>Tổng đài Quốc gia Bảo vệ Trẻ em:</strong> <strong>111</strong> (Miễn phí 24/7)</p>
                <p>💚 <strong>Đường dây nóng Hỗ trợ Tâm lý Ngày Mai:</strong> <strong>096 306 1414</strong></p>
                <p>🚑 <strong>Cấp cứu Y tế:</strong> <strong>115</strong></p>
              </div>
              <p className="text-xs">AI sẽ tự động ngắt chế độ đàm thoại hướng nghiệp và kích hoạt thông điệp an toàn khi phát hiện dấu hiệu căng thẳng tâm lý nghiêm trọng.</p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Bảo mật Local-First & Tuân thủ Nghị định 13/2023/NĐ-CP</h3>
              <p>Toàn bộ điểm trắc nghiệm, ghi chú mục tiêu và tổ hợp môn được lưu trữ trên bộ nhớ trình duyệt cục bộ (Local Storage) của bạn.</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li><strong>Không bán dữ liệu:</strong> Không cài đặt bất kỳ mã theo dõi quảng cáo bên thứ ba nào.</li>
                <li><strong>Cô lập phiên làm việc:</strong> Khóa lưu trữ namespaced theo UID giúp an toàn trên máy tính dùng chung tại trường học.</li>
                <li><strong>Quyền được xóa bỏ (Right to Erasure):</strong> Học sinh có thể bấm 1 nút để xóa vĩnh viễn toàn bộ dữ liệu khỏi thiết bị.</li>
              </ul>
            </div>
          )}

          {activeTab === 'sources' && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Cơ sở Dữ liệu Môn học & Tuyển sinh Đại học (Xác thực 2026)</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li><strong>Chương trình GDPT 2018:</strong> Áp dụng Thông tư 32/2018/TT-BGDĐT và Thông tư sửa đổi 13/2022/TT-BGDĐT (Toán, Văn, Anh, Sử là 4 môn bắt buộc toàn quốc; GDKT&PL, KHTN, Nghệ thuật là môn tự chọn).</li>
                <li><strong>Dữ liệu Tuyển sinh 2026:</strong> Điểm chuẩn tham chiếu và quy chế tuyển sinh từ ĐHBK Hà Nội (TSA), ĐHQG Hà Nội (HSA), ĐHQG-HCM, Ngoại thương, Kinh tế Quốc dân, Y Hà Nội... cập nhật ngày 01/03/2026.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-accent hover:bg-accent-dark text-white font-bold rounded-2xl transition-all shadow-lg shadow-accent/20 text-xs uppercase tracking-wider"
          >
            Tôi Đã Hiểu & Tiếp Tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;