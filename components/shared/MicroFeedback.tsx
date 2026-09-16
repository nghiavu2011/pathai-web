import React, { useState } from 'react';
import { TelemetryService, MicroFeedbackEntry } from '../../services/telemetryService';

interface MicroFeedbackProps {
  context: 'quiz_result' | 'decision_dashboard' | 'general';
  title?: string;
}

export const MicroFeedback: React.FC<MicroFeedbackProps> = ({
  context,
  title = 'Bản báo cáo này có giúp bạn định hướng rõ ràng hơn không?'
}) => {
  const [submittedRating, setSubmittedRating] = useState<MicroFeedbackEntry['rating'] | null>(null);
  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [isFinalSubmitted, setIsFinalSubmitted] = useState(false);

  const handleSelectRating = (rating: MicroFeedbackEntry['rating']) => {
    setSubmittedRating(rating);
    TelemetryService.saveMicroFeedback({
      context,
      rating
    });
    setShowCommentBox(true);
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (submittedRating) {
      TelemetryService.saveMicroFeedback({
        context,
        rating: submittedRating,
        comment: comment.trim() || undefined
      });
    }
    setIsFinalSubmitted(true);
  };

  if (isFinalSubmitted) {
    return (
      <div className="bg-sage-50/80 dark:bg-slate-800/80 border border-sage-200 dark:border-slate-700 p-5 rounded-2xl text-center max-w-lg mx-auto my-8 animate-fade-in shadow-sm">
        <span className="text-2xl block mb-1">💚</span>
        <h4 className="text-sm font-bold text-sage-800 dark:text-sage-200">
          Cảm ơn đóng góp của bạn!
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Ý kiến của bạn là động lực to lớn giúp PathAI ngày càng hoàn thiện hơn để đồng hành cùng học sinh Việt Nam.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/80 p-5 md:p-6 rounded-3xl max-w-xl mx-auto my-8 shadow-card text-center animate-fade-in font-sans">
      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">
        {title}
      </h4>

      {!showCommentBox ? (
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={() => handleSelectRating('very_helpful')}
            className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 rounded-2xl text-xs font-semibold transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5"
          >
            <span>😍</span> Rất hữu ích
          </button>
          <button
            onClick={() => handleSelectRating('somewhat_helpful')}
            className="px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300 border border-teal-200 dark:border-teal-800/40 rounded-2xl text-xs font-semibold transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5"
          >
            <span>👍</span> Khá tốt
          </button>
          <button
            onClick={() => handleSelectRating('needs_work')}
            className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40 rounded-2xl text-xs font-semibold transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5"
          >
            <span>🤔</span> Cần cải thiện
          </button>
        </div>
      ) : (
        <form onSubmit={handleSendComment} className="space-y-3 mt-2 animate-fade-in text-left">
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Bạn có muốn nhắn gửi điều gì để đội ngũ phát triển cải thiện thêm không? (tùy chọn)
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ví dụ: Cần thêm ví dụ thực tế về nghề Thiết kế đồ họa..."
            rows={2}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-sage-500"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsFinalSubmitted(true)}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              Bỏ qua
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-sage-600 hover:bg-sage-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Gửi góp ý
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MicroFeedback;
