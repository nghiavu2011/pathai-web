import React, { useEffect } from 'react';

interface NotFoundViewProps {
  onGoHome: () => void;
}

const NotFoundView: React.FC<NotFoundViewProps> = ({ onGoHome }) => {
  useEffect(() => {
    document.title = '404 - Không tìm thấy trang | PathAI';
  }, []);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 font-sans text-center">
      <div className="max-w-md mx-auto py-12">
        <div className="w-20 h-20 bg-sage-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-sage-600 dark:text-sage-400 mx-auto mb-6 text-3xl font-bold shadow-soft">
          404
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Không tìm thấy trang yêu cầu
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed">
          Đường dẫn bạn vừa truy cập không tồn tại hoặc đã được thay đổi. Hãy quay lại trang chủ để tiếp tục hành trình hướng nghiệp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onGoHome}
            className="px-6 py-3 bg-sage-500 hover:bg-sage-600 text-white font-bold rounded-full transition-all shadow-md text-sm"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundView;
