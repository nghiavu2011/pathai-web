
import React, { useState, useEffect } from 'react';

const FloatingShare: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const handleShare = async () => {
        const shareData = {
            title: 'PathAI - Hành trình Thấu hiểu Bản thân',
            text: 'Tôi vừa khám phá bản thân qua PathAI. Một công cụ rất tuyệt vời để thấu hiểu chính mình và định hướng sự nghiệp.',
            url: window.location.origin,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.origin);
            alert('Đã sao chép liên kết vào bộ nhớ tạm!');
        }
    };

    return (
        <div className={`fixed bottom-8 right-8 z-[60] transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50'}`}>
            <button
                onClick={handleShare}
                className="group p-4 bg-white dark:bg-slate-800 text-sage-600 dark:text-sage-300 rounded-full shadow-2xl border border-sage-100 dark:border-slate-700 hover:bg-sage-600 hover:text-white dark:hover:bg-sage-500 transition-all active:scale-95"
                title="Chia sẻ PathAI"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>

                {/* Tooltip */}
                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Chia sẻ trang web
                </span>
            </button>
        </div>
    );
};

export default FloatingShare;
