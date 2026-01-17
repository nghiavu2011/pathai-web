import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import LoadingSpinner from '../LoadingSpinner';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  contentRef: React.RefObject<HTMLElement>;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title, contentRef }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [shareError, setShareError] = useState('');
  const supportsWebShare = !!navigator.share;

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const captureAndProcessImage = async (action: 'share' | 'download') => {
    if (!contentRef.current || isProcessing) return;

    setIsProcessing(true);
    setShareError('');

    try {
      // Temporarily add a class to the body to signify capture state for styling
      document.body.classList.add('is-capturing');
      await new Promise(resolve => setTimeout(resolve, 50)); // allow styles to apply

      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
      });

      document.body.classList.remove('is-capturing');

      canvas.toBlob(async (blob) => {
        if (!blob) {
          throw new Error('Failed to create blob from canvas');
        }

        if (action === 'share') {
          const file = new File([blob], `${title.replace(/ /g, '_')}.png`, { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: title,
              text: `Check out my results from PathAI!`,
              files: [file],
            });
            onClose();
          } else {
            setShareError('Sharing is not supported on this browser. Try downloading the image.');
          }
        } else { // download
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `${title.replace(/ /g, '_')}.png`;
          link.click();
          URL.revokeObjectURL(link.href);
          onClose();
        }
      }, 'image/png');

    } catch (err) {
      document.body.classList.remove('is-capturing');
      setShareError('Could not process the image. Please try again.');
      console.error("Sharing error:", err);
    } finally {
      // Add a delay to allow share sheet to close before resetting state
      setTimeout(() => setIsProcessing(false), 1000);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in" onClick={onClose} aria-modal="true" role="dialog">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md mx-auto relative transform transition-transform duration-300 animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Chia sẻ</h2>
            <button onClick={onClose} className="p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400" aria-label="Đóng"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Chia sẻ một ảnh chụp kết quả của bạn với bạn bè và người thân!
          </p>

          <div className="space-y-4">
             {supportsWebShare && (
                <button
                    onClick={() => captureAndProcessImage('share')}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-400"
                >
                    {isProcessing ? <LoadingSpinner /> : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                    )}
                    <span>Chia sẻ ngay</span>
                </button>
             )}
             <button
                onClick={() => captureAndProcessImage('download')}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors disabled:bg-slate-400"
             >
                {isProcessing ? <LoadingSpinner /> : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                )}
                <span>Tải ảnh xuống</span>
             </button>
          </div>

          {shareError && <p className="text-red-500 text-sm text-center mt-4">{shareError}</p>}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
