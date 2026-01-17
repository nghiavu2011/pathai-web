import React, { useEffect } from 'react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
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
      className="fixed inset-0 bg-sage-900/40 backdrop-blur-sm z-[60] flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl mx-auto relative transform transition-transform duration-300 animate-scale-in flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-sage-100 dark:border-slate-700 bg-cream-50 dark:bg-slate-800/50 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
          <div>
             <h2 className="font-display text-2xl font-bold text-sage-800 dark:text-slate-100">
              Tuyên bố Miễn trừ Trách nhiệm
            </h2>
            <p className="text-xs text-sage-500 dark:text-slate-400 font-medium uppercase tracking-widest mt-1">
              Vui lòng đọc kỹ trước khi sử dụng
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-sage-400 hover:bg-sage-100 hover:text-sage-600 dark:hover:bg-slate-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Legal Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-6 text-justify">
          
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50 rounded-lg">
            <p className="font-bold text-amber-800 dark:text-amber-200 mb-1">Cảnh báo quan trọng:</p>
            <p>PathAI là công cụ hỗ trợ khám phá bản thân dựa trên Trí tuệ nhân tạo (AI) và các mô hình tâm lý học. Mọi kết quả chỉ mang tính chất tham khảo và không thay thế cho lời khuyên chuyên môn y tế, tâm lý hoặc pháp lý.</p>
          </div>

          <section>
            <h3 className="font-display font-bold text-lg text-sage-800 dark:text-slate-200 mb-2">1. Bản chất của Dịch vụ & Giới hạn Trách nhiệm</h3>
            <p>
              Ứng dụng này sử dụng các thuật toán máy tính và AI để phân tích dữ liệu đầu vào của người dùng dựa trên các khung lý thuyết (như Holland, Big Five, v.v.). Mặc dù chúng tôi nỗ lực đảm bảo độ chính xác cao nhất, nhưng <strong>PathAI và đội ngũ phát triển hoàn toàn không chịu trách nhiệm pháp lý</strong> đối với:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Bất kỳ quyết định nghề nghiệp, tài chính, hoặc đời sống cá nhân nào mà người dùng đưa ra dựa trên kết quả trắc nghiệm.</li>
                <li>Sự sai lệch giữa kết quả trắc nghiệm và thực tế tính cách hoặc năng lực của người dùng.</li>
                <li>Bất kỳ thiệt hại trực tiếp, gián tiếp hoặc hệ quả nào phát sinh từ việc sử dụng thông tin trên ứng dụng này.</li>
            </ul>
            <p className="mt-2 italic">Người dùng tự chịu trách nhiệm hoàn toàn cho các quyết định của mình.</p>
          </section>

          <section>
            <h3 className="font-display font-bold text-lg text-sage-800 dark:text-slate-200 mb-2">2. Sở hữu Trí tuệ & Cơ sở Học thuật</h3>
            <p>
              Các bài trắc nghiệm trên PathAI được xây dựng dựa trên các học thuyết tâm lý học công khai và đã được kiểm chứng (như RIASEC của John Holland, OCEAN của Costa & McCrae, v.v.). Chúng tôi không tuyên bố quyền sở hữu đối với các lý thuyết gốc này.
            </p>
            <p className="mt-2">
              Tuy nhiên, <strong>giao diện người dùng, mã nguồn, thuật toán xử lý, cách thức trình bày và các nội dung phái sinh (lời khuyên từ AI, kịch bản phân tích) là tài sản trí tuệ độc quyền của PathAI Studio</strong>. Nghiêm cấm mọi hành vi sao chép, trích xuất dữ liệu hoặc sử dụng cho mục đích thương mại mà không có sự đồng ý bằng văn bản.
            </p>
          </section>

          <section>
            <h3 className="font-display font-bold text-lg text-sage-800 dark:text-slate-200 mb-2">3. Tính chất của Tư vấn AI</h3>
            <p>
              Các lời khuyên được tạo ra bởi mô hình ngôn ngữ lớn (LLM). AI có thể mắc lỗi hoặc đưa ra thông tin không hoàn toàn chính xác trong một số ngữ cảnh cụ thể (hallucinations). Người dùng cần có tư duy phản biện và chắt lọc khi tiếp nhận thông tin.
            </p>
          </section>

          <section>
            <h3 className="font-display font-bold text-lg text-sage-800 dark:text-slate-200 mb-2">4. Cam kết Bảo mật (Sơ bộ)</h3>
            <p>
              Chúng tôi tôn trọng quyền riêng tư của bạn. Dữ liệu đầu vào chỉ được sử dụng để tạo kết quả trắc nghiệm trong phiên làm việc. Chúng tôi không bán dữ liệu danh tính của bạn cho bên thứ ba.
            </p>
          </section>

          <div className="pt-6 border-t border-sage-100 dark:border-slate-700 text-xs text-slate-400 text-center">
            Văn bản này có hiệu lực kể từ ngày bạn bắt đầu sử dụng dịch vụ. Đội ngũ PathAI bảo lưu quyền thay đổi nội dung mà không cần báo trước.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-cream-50 dark:bg-slate-800/50 border-t border-sage-100 dark:border-slate-700 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-sage-600 hover:bg-sage-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-sage-200/50"
          >
            Tôi đã hiểu & Đồng ý
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;