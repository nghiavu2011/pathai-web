import React, { useState, useEffect } from 'react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const accountNumber = "66295869466";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md mx-auto relative transform transition-transform duration-300 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Ủng hộ dự án</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
              aria-label="Đóng"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Nếu bạn thấy ứng dụng này hữu ích, hãy ủng hộ dự án để duy trì và phát triển thêm nhiều tính năng mới. Xin chân thành cảm ơn!
          </p>

          <div className="bg-slate-100 dark:bg-slate-900/50 rounded-lg p-5 space-y-4 text-left border border-slate-200 dark:border-slate-700">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ngân hàng</p>
              <p className="text-base font-bold text-slate-700 dark:text-slate-200">NGAN HANG STANDARD CHARTERED - CHI NHANH LE DAI HANH</p>
            </div>
             <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Chủ tài khoản</p>
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100">VU TRONG NGHIA</p>
            </div>
            <div>
               <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Số tài khoản</p>
               <div className="flex items-center justify-between mt-1">
                 <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-wider font-mono">{accountNumber}</p>
                 <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-sm font-semibold py-2 px-3 rounded-md bg-white dark:bg-slate-600 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>{copied ? 'Đã sao chép!' : 'Sao chép'}</span>
                 </button>
               </div>
            </div>
          </div>

          <div className="mt-8 text-right">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-slate-600 hover:bg-slate-700 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:focus:ring-offset-slate-800 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;