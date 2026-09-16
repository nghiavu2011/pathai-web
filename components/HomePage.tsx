import React from 'react';
import QuizSelection from './QuizSelection';
import HeroSlider from './shared/HeroSlider';

import { UserData, QuizHistoryEntry } from '../types';

interface HomePageProps {
    onSelectQuiz: (id: string) => void;
    onOpenGuide: () => void;
    onOpenQuizInfo: (id: string) => void;
    onOpenDecisionDashboard?: () => void;
    history?: QuizHistoryEntry[];
    userData?: UserData | null;
}

const HomePage: React.FC<HomePageProps> = ({
    onSelectQuiz,
    onOpenGuide,
    onOpenQuizInfo,
    onOpenDecisionDashboard,
    history = [],
    userData = null
}) => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="flex flex-col w-full -mt-32 md:-mt-44">
            {/* --- HERO SECTION --- */}
            <section className="relative w-full min-h-[800px] md:min-h-[880px] flex items-center justify-center overflow-hidden pb-36">
                {/* Animated Hero Slider */}
                <HeroSlider
                    images={[
                        '/zen_nature_1_1768643740914.png',
                        '/zen_nature_2_1768643757325.png',
                        '/zen_nature_3_1768643771430.png',
                        '/zen_nature_4_1768643785458.png',
                        '/zen_nature_5_1768643802253.png'
                    ]}
                />

                {/* Hero Content */}
                <div className="relative z-10 container mx-auto px-6 md:px-12 pt-20 pb-16">
                    <div className="max-w-4xl mx-auto text-center animate-slow-fade">
                        <span className="inline-block py-1.5 px-4 border border-white/40 rounded-full text-white/90 text-xs font-bold tracking-[0.25em] uppercase mb-8 backdrop-blur-sm">
                            Hành trình khai phá tiềm năng
                        </span>

                        {/* Fixed Typography: Increased line-height and letter-spacing */}
                        <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.3] tracking-wide text-balance shadow-black/10 drop-shadow-sm">
                            Khi bạn chưa biết mình sẽ đi đâu,<br />
                            hãy bắt đầu bằng việc <span className="text-accent italic font-serif">hiểu chính mình</span>.
                        </h1>

                        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-12 font-light tracking-wide">
                            PathAI là không gian an toàn để bạn khám phá bản thân, lắng nghe nội tâm và từng bước xây dựng con đường sự nghiệp vững chắc.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                            {onOpenDecisionDashboard && (
                                <button
                                    onClick={onOpenDecisionDashboard}
                                    className="min-w-[220px] px-8 py-4 bg-accent hover:bg-accent-dark text-slate-900 font-bold rounded-full transition-all transform hover:-translate-y-1 shadow-lg shadow-black/20 text-sm tracking-widest uppercase flex items-center justify-center gap-2"
                                >
                                    <span>🧭</span> Bản đồ Định hướng
                                </button>
                            )}
                            <button
                                onClick={() => scrollToSection('journey-start')}
                                className="min-w-[180px] px-8 py-4 bg-white text-sage-900 rounded-full font-bold hover:bg-cream-50 transition-all transform hover:-translate-y-1 shadow-lg shadow-black/20 text-sm tracking-widest uppercase"
                            >
                                Trắc nghiệm
                            </button>
                            <button
                                onClick={onOpenGuide}
                                className="min-w-[160px] px-6 py-4 bg-transparent border border-white/50 text-white rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-sm text-sm tracking-widest uppercase"
                            >
                                Hướng dẫn
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ENTRY POINTS (Floating Cards) --- */}
            <section id="journey-start" className="relative z-20 -mt-20 md:-mt-24 px-4 pb-24">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <button
                            onClick={() => scrollToSection('journey-2')}
                            className="group h-full p-8 rounded-[2rem] bg-white dark:bg-slate-800 shadow-2xl shadow-sage-900/10 hover:-translate-y-2 transition-all duration-500 text-left border-t-4 border-rose-400 relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                    </svg>
                                </div>
                                <h3 className="font-display font-bold text-slate-800 dark:text-slate-100 text-2xl mb-3 group-hover:text-rose-600 transition-colors">Đang mất phương hướng?</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                                    Tìm lại điểm cân bằng, nhận diện rào cản và những mâu thuẫn nội tâm đang kìm hãm bạn.
                                </p>
                            </div>
                        </button>

                        {/* Card 2 (Highlighted) */}
                        <button
                            onClick={() => scrollToSection('journey-1')}
                            className="group h-full p-8 rounded-[2rem] bg-sage-700 text-white shadow-2xl shadow-sage-900/30 hover:-translate-y-2 transition-all duration-500 text-left border-t-4 border-accent relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 backdrop-blur-sm border border-white/10">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="font-display font-bold text-white text-2xl mb-3">Muốn hiểu rõ bản thân?</h3>
                                <p className="text-sage-100 text-base leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                                    Khám phá tính cách cốt lõi, sở thích tiềm ẩn và thế mạnh tự nhiên để chọn đúng nghề.
                                </p>
                            </div>
                        </button>

                        {/* Card 3 */}
                        <button
                            onClick={() => scrollToSection('journey-3')}
                            className="group h-full p-8 rounded-[2rem] bg-white dark:bg-slate-800 shadow-2xl shadow-sage-900/10 hover:-translate-y-2 transition-all duration-500 text-left border-t-4 border-amber-400"
                        >
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <h3 className="font-display font-bold text-slate-800 dark:text-slate-100 text-2xl mb-3 group-hover:text-amber-600 transition-colors">Cần lên kế hoạch?</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                                    Định hướng tương lai xa, xây dựng lộ trình hành động và chuẩn bị tâm thế vững vàng.
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {/* --- DECISION SYSTEM BANNER (GRADE 9-12) --- */}
            {onOpenDecisionDashboard && (
                <section className="px-4 pb-16">
                    <div className="container mx-auto max-w-6xl">
                        <div className="bg-gradient-to-r from-sage-800 via-sage-700 to-slate-800 text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
                            <div className="relative z-10 max-w-2xl space-y-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold text-amber-200 tracking-wide uppercase">
                                    <span>🧭 PathAI Decision System (Lớp 9–12)</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                                    Bản đồ Định hướng Tương lai & Chọn môn Lớp 10
                                </h2>
                                <p className="text-sage-100 text-base font-light leading-relaxed">
                                    Không dừng lại ở bài trắc nghiệm, PathAI hỗ trợ bạn xây dựng giả thuyết nghề nghiệp, lập kế hoạch chọn tổ hợp môn THPT và mô phỏng rủi ro đóng/mở cánh cửa tương lai.
                                </p>
                            </div>
                            <div className="relative z-10 shrink-0">
                                <button
                                    onClick={onOpenDecisionDashboard}
                                    className="px-8 py-4 bg-white text-sage-900 hover:bg-amber-50 font-bold rounded-full text-sm uppercase tracking-wider shadow-lg transform hover:-translate-y-1 transition-all"
                                >
                                    Mở Bản đồ Ngay →
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* --- SECTOR 1: SELF-UNDERSTANDING (White Background) --- */}
            <section id="journey-1" className="py-32 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <div className="lg:w-1/3 sticky top-32">
                            <div className="inline-flex items-center gap-2 mb-4">
                                <span className="w-8 h-[1px] bg-sage-500"></span>
                                <span className="text-sage-600 font-bold tracking-[0.2em] text-xs uppercase">Chặng 01</span>
                            </div>
                            <h2 className="font-display text-5xl lg:text-6xl font-bold text-sage-900 dark:text-slate-100 mb-8 leading-tight">
                                Hiểu tôi <br /> <span className="text-sage-500 italic">là ai</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-loose text-lg font-light mb-8">
                                Khám phá "mã gen" tâm lý của bạn. Đây là bước nền tảng quan trọng nhất để trả lời câu hỏi: Môi trường nào tôi sẽ thuộc về?
                            </p>
                        </div>
                        <div className="lg:w-2/3 w-full">
                            <QuizSelection
                                categoryFilter={['holland', 'mi', 'big-five', 'eq', 'context']}
                                onSelectQuiz={onSelectQuiz}
                                onOpenInfo={onOpenQuizInfo}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTOR 2: BALANCE & ISSUES (Cream Background) --- */}
            <section id="journey-2" className="py-32 bg-cream-50 dark:bg-slate-800/30 border-y border-sage-100 dark:border-slate-800">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row-reverse gap-16 items-start">
                        <div className="lg:w-1/3 sticky top-32">
                            <div className="inline-flex items-center gap-2 mb-4">
                                <span className="w-8 h-[1px] bg-rose-400"></span>
                                <span className="text-rose-500 font-bold tracking-[0.2em] text-xs uppercase">Chặng 02</span>
                            </div>
                            <h2 className="font-display text-5xl lg:text-6xl font-bold text-slate-800 dark:text-slate-100 mb-8 leading-tight">
                                Điểm <br /> <span className="text-rose-400 italic">cân bằng</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-loose text-lg font-light mb-8">
                                Cuộc sống không chỉ là công việc. Nhìn lại sự cân bằng, xác định các giá trị cốt lõi và nhận diện những rào cản vô hình đang kìm hãm bạn.
                            </p>
                        </div>
                        <div className="lg:w-2/3 w-full">
                            <QuizSelection
                                categoryFilter={['wheel', 'cdb', 'work-values', 'schein']}
                                onSelectQuiz={onSelectQuiz}
                                onOpenInfo={onOpenQuizInfo}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTOR 3: GROWTH & DIRECTION (White Background) --- */}
            <section id="journey-3" className="py-32 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <div className="lg:w-1/3 sticky top-32">
                            <div className="inline-flex items-center gap-2 mb-4">
                                <span className="w-8 h-[1px] bg-accent"></span>
                                <span className="text-accent font-bold tracking-[0.2em] text-xs uppercase">Chặng 03</span>
                            </div>
                            <h2 className="font-display text-5xl lg:text-6xl font-bold text-sage-900 dark:text-slate-100 mb-8 leading-tight">
                                Định hướng <br /> <span className="text-accent italic">& Phát triển</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-loose text-lg font-light mb-8">
                                Đánh giá nội lực (Grit), tư duy phát triển (Growth Mindset) và mức độ sẵn sàng để bứt phá cho hành trình mới.
                            </p>
                        </div>
                        <div className="lg:w-2/3 w-full">
                            <QuizSelection
                                categoryFilter={['grit', 'crs', 'gms']}
                                onSelectQuiz={onSelectQuiz}
                                onOpenInfo={onOpenQuizInfo}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PROFILE READINESS & DECISION HUB CTA --- */}
            <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-sage-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#899B8E_1px,transparent_1px)] [background-size:24px_24px]"></div>

                <div className="container mx-auto px-4 max-w-5xl relative z-10">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                    Hồ Sơ Hướng Nghiệp & Ra Quyết Định
                                </div>
                                <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
                                    Trung Tâm Ra Quyết Định Lớp 9–12
                                </h2>
                                <p className="text-slate-300 text-sm md:text-base mt-2 max-w-xl">
                                    Tổng hợp dữ liệu trắc nghiệm, phân tích rủi ro đóng cửa ngành, lập tổ hợp môn CTGDPT 2018 và đối chiếu phương thức xét tuyển ĐH.
                                </p>
                            </div>

                            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                                <div className="text-xs text-slate-400">Tiến độ dữ liệu hồ sơ:</div>
                                <div className="text-2xl font-black text-accent">
                                    {history.length} / 11 Bài trắc nghiệm
                                </div>
                            </div>
                        </div>

                        {/* Status Checkpoints */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className={`p-4 rounded-2xl border ${history.some(h => h.quizId === 'holland') ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300' : 'bg-white/5 border-white/5 text-slate-400'}`}>
                                <div className="text-xs font-semibold mb-1">1. Hướng nghiệp RIASEC</div>
                                <div className="text-sm font-bold">{history.some(h => h.quizId === 'holland') ? '✓ Đã hoàn thành' : '○ Chưa thực hiện'}</div>
                            </div>
                            <div className={`p-4 rounded-2xl border ${history.some(h => ['mi', 'big-five', 'eq'].includes(h.quizId)) ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300' : 'bg-white/5 border-white/5 text-slate-400'}`}>
                                <div className="text-xs font-semibold mb-1">2. Năng lực & Tính cách</div>
                                <div className="text-sm font-bold">{history.some(h => ['mi', 'big-five', 'eq'].includes(h.quizId)) ? '✓ Đã cập nhật' : '○ Chưa thực hiện'}</div>
                            </div>
                            <div className={`p-4 rounded-2xl border ${history.some(h => ['work-values', 'schein', 'wheel', 'cdb'].includes(h.quizId)) ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300' : 'bg-white/5 border-white/5 text-slate-400'}`}>
                                <div className="text-xs font-semibold mb-1">3. Giá trị nghề nghiệp</div>
                                <div className="text-sm font-bold">{history.some(h => ['work-values', 'schein', 'wheel', 'cdb'].includes(h.quizId)) ? '✓ Đã cập nhật' : '○ Chưa thực hiện'}</div>
                            </div>
                            <div className={`p-4 rounded-2xl border ${history.some(h => ['grit', 'crs', 'gms'].includes(h.quizId)) ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300' : 'bg-white/5 border-white/5 text-slate-400'}`}>
                                <div className="text-xs font-semibold mb-1">4. Ý chí & Động lực</div>
                                <div className="text-sm font-bold">{history.some(h => ['grit', 'crs', 'gms'].includes(h.quizId)) ? '✓ Đã cập nhật' : '○ Chưa thực hiện'}</div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                            <p className="text-xs text-slate-400">
                                Dữ liệu được tính toán thời gian thực theo cấu trúc điểm tuyển sinh và chương trình GDPT 2018 mới nhất.
                            </p>
                            {onOpenDecisionDashboard && (
                                <button
                                    onClick={onOpenDecisionDashboard}
                                    className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-2xl font-bold text-sm tracking-wider uppercase transition-all transform hover:scale-[1.02] shadow-xl shadow-accent/20 shrink-0"
                                >
                                    Mở Trung Tâm Ra Quyết Định →
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;