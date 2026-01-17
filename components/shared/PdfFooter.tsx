import React from 'react';

const PdfFooter: React.FC = () => {
  return (
    <div className="mt-16 pt-8 border-t-2 border-slate-200 dark:border-slate-700 text-center">
      <h3 className="text-xl font-bold text-neutral-900 dark:text-slate-100">PathAI</h3>
      <p className="mt-2 mb-4 text-sm text-neutral-500 dark:text-slate-400">
        Đồng hành cùng bạn trên hành trình khám phá bản thân và nghề nghiệp.
      </p>
      <div className="flex justify-center items-center space-x-4 flex-wrap gap-y-2 text-sm text-neutral-500 dark:text-slate-400">
        <span>
          © 2025 PathAI by{' '}
          <a
            href="https://www.facebook.com/nghiainterior/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            NM_AI_ART
          </a>
        </span>
        <span>-</span>
        <a 
            href="https://www.facebook.com/nghiainterior/" // Using a placeholder link as the original is a modal trigger
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 font-semibold text-red-500 hover:underline"
        >
            <span role="img" aria-label="heart">❤️</span>
            <span>Ủng hộ dự án</span>
        </a>
      </div>
    </div>
  );
};

export default PdfFooter;
