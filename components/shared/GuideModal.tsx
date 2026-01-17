import React, { useEffect } from 'react';

interface GuideModalProps {
  onClose: () => void;
}

const GuideModal: React.FC<GuideModalProps> = ({ onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const steps = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "1. Khám phá bản thân",
      description: "Chọn một trong các bài trắc nghiệm khoa học (Holland, MI, Grit,...) để tìm hiểu sâu hơn về sở thích, trí thông minh, và các động lực nghề nghiệp của bạn."
    },
    {
      icon: (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "2. Nhận kết quả & Tư vấn AI",
      description: "Xem báo cáo chi tiết, trực quan ngay sau khi hoàn thành. Chuyên gia AI sẽ phân tích kết quả và đưa ra những lời khuyên được cá nhân hóa dành riêng cho bạn."
    },
    {
      icon: (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "3. Lập kế hoạch hành động",
      description: "Đừng chỉ dừng lại ở việc thấu hiểu. Sử dụng gợi ý từ AI hoặc tự tạo các mục tiêu cụ thể để biến kết quả thành một kế hoạch phát triển sự nghiệp rõ ràng."
    },
    {
      icon: (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "4. Lưu trữ & Quay lại",
      description: "Tất cả kết quả và kế hoạch của bạn đều được lưu lại. Truy cập mục \"Lịch sử\" và \"Kế hoạch\" bất cứ lúc nào để theo dõi và điều chỉnh hành trình của mình."
    }
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl mx-auto relative transform transition-transform duration-300 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Chào mừng đến với PathAI!</h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1">Hành trình sự nghiệp của bạn bắt đầu với 4 bước đơn giản.</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
              aria-label="Đóng"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex-shrink-0">{step.icon}</div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200">{step.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 transition-transform transform hover:scale-105"
            >
              Bắt đầu Khám phá
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideModal;