import React, { useState, useEffect } from 'react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    
    const subject = encodeURIComponent("Phản hồi về Ứng dụng PathAI");
    const body = encodeURIComponent(feedback);
    window.location.href = `mailto:nmaiart2011@gmail.com?subject=${subject}&body=${body}`;
    
    // Reset and close after a short delay to allow mail client to open
    setTimeout(() => {
        setFeedback('');
        onClose();
    }, 500);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
        window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg mx-auto relative transform transition-transform duration-300 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Gửi phản hồi</h2>
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
                Mọi góp ý của bạn đều vô cùng quý giá, giúp chúng tôi cải thiện PathAI ngày một tốt hơn. Xin chân thành cảm ơn!
            </p>

            <form onSubmit={handleSend}>
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Hãy chia sẻ suy nghĩ của bạn ở đây..."
                    rows={6}
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:border-blue-500 transition"
                    required
                    aria-label="Nội dung phản hồi"
                />
                <div className="mt-6 flex justify-end items-center gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:focus:ring-offset-slate-800 transition-colors"
                    >
                        Hủy
                    </button>
                     <button
                        type="submit"
                        className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 disabled:bg-slate-400 transition-colors"
                        disabled={!feedback.trim()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 2.5l7.997 3.384A1 1 0 0119 6.816v6.368a1 1 0 01-1.003.962l-7.997-3.383-7.997 3.383A1 1 0 011 13.184V6.816a1 1 0 011.003-.932zM10 4.636L3.003 7.511v5.176l7-2.95v-5.1z" />
                        </svg>
                        Gửi
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;