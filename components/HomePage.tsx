import React from 'react';
import QuizSelection from './QuizSelection';
import HeroSlider from './shared/HeroSlider';

import { UserData, QuizHistoryEntry } from '../types';

interface HomePageProps {
    onSelectQuiz: (id: string) => void;
    onOpenGuide: () => void;
    onOpenQuizInfo: (id: string) => void;
    history?: QuizHistoryEntry[];
    canShowSynthesis?: boolean;
    userData?: UserData | null;
}

const HomePage: React.FC<HomePageProps> = ({
    onSelectQuiz,
    onOpenGuide,
    onOpenQuizInfo,
    history = [],
    canShowSynthesis = false,
    userData = null
}) => {
    const [isSynthesisOpen, setSynthesisOpen] = React.useState(false);
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
            <section className="relative w-full h-[90vh] min-h-[650px] flex items-center justify-center overflow-hidden">
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
                <div className="relative z-10 container mx-auto px-6 md:px-12 pt-20">
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

                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                            <button
                                onClick={() => scrollToSection('journey-start')}
                                className="min-w-[200px] px-8 py-4 bg-white text-sage-900 rounded-full font-bold hover:bg-cream-50 transition-all transform hover:-translate-y-1 shadow-lg shadow-black/20 text-sm tracking-widest uppercase"
                            >
                                Bắt đầu ngay
                            </button>
                            <button
                                onClick={onOpenGuide}
                                className="min-w-[200px] px-8 py-4 bg-transparent border border-white/50 text-white rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-sm text-sm tracking-widest uppercase"
                            >
                                Tìm hiểu thêm
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ENTRY POINTS (Floating Cards) --- */}
            <section id="journey-start" className="relative z-20 -mt-32 px-4 pb-24">
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

            {/* --- GRAND SYNTHESIS (Experimental/Unlocked) --- */}
            {canShowSynthesis && (
                <section className="py-32 bg-gradient-to-b from-slate-900 to-black text-white relative overflow-hidden">
                    {/* Zen Particles Background */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                    <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 animate-slow-fade">
                        <div className="inline-block px-4 py-1.5 rounded-full border border-accent/40 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
                            Hành trình đã trọn vẹn
                        </div>
                        <h2 className="font-display text-5xl md:text-7xl font-bold mb-10 leading-tight">
                            Mở ra <span className="text-accent italic">chân trời mới</span>
                        </h2>
                        <p className="text-slate-300 text-xl leading-relaxed font-light mb-16 max-w-2xl mx-auto">
                            Chúc mừng **{userData?.fullName}**! Bạn đã hoàn thành các chặng khám phá then chốt. PathAI đã đủ dữ liệu để phác họa một bức tranh tổng thể và đột phá về con người bạn.
                        </p>

                        <button
                            onClick={() => setSynthesisOpen(true)}
                            className="group relative px-12 py-6 bg-accent text-white rounded-full font-bold text-lg tracking-widest uppercase hover:bg-accent-dark transition-all transform hover:scale-105 shadow-2xl shadow-accent/20"
                        >
                            <span className="relative z-10">Xem Tổng hợp Hành trình</span>
                            <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                        </button>
                    </div>
                </section>
            )}

            {/* Synthesis Modal (Simplified Logic) */}
            {isSynthesisOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-fade-in bg-black/95 backdrop-blur-xl overflow-y-auto">
                    <div className="w-full max-w-5xl bg-slate-900 rounded-[2.5rem] border border-white/5 p-8 md:p-16 my-auto relative">
                        <button
                            onClick={() => setSynthesisOpen(false)}
                            className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-16">
                                <span className="text-accent font-bold tracking-[0.5em] text-[10px] uppercase mb-4 block">Hành trình tổng hợp</span>
                                <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">Phác đồ cuộc sống & <br /> Phiên bản hoàn hảo</h2>
                            </div>

                            <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-[2] font-light space-y-8">
                                <p>
                                    Chào <strong>{userData?.fullName}</strong>, đây là thời khắc quan trọng trong hành trình của bạn.
                                    Dựa trên bối cảnh sống là <strong>{userData?.maritalStatus?.toLowerCase()}</strong>, <strong>{userData?.birthOrder?.toLowerCase()}</strong> và những khát khao bạn hằng ấp ủ,
                                    tôi nhận thấy một hành trình rực rỡ đang mở ra trước mắt.
                                </p>
                                <p>
                                    Thông tin từ 3 chặng vừa qua cho thấy bạn không chỉ sở hữu những tố chất thông minh đa diện, mà còn đang học cách cân bằng giữa thực tại và giấc mơ.
                                    Với mục tiêu <em>"{userData?.expectations}"</em>, lời khuyên chân thành nhất dành cho bạn là hãy tập trung vào <strong>sự nhất quán giữa thân - tâm - trí</strong>.
                                </p>
                                <div className="p-8 rounded-3xl bg-accent/5 border border-accent/20 italic text-accent-light text-center text-2xl font-serif">
                                    "Bạn không cần phải hoàn hảo để bắt đầu, nhưng bạn cần bắt đầu để trở nên hoàn hảo nhất theo cách của riêng mình."
                                </div>
                                <p>
                                    Hãy tiếp tục duy trì <strong>tinh thần cầu tiến (Growth Mindset)</strong> và sự kiên trì đã được kiểm chứng.
                                    Chân trời mới đã mở, và bạn chính là kiến trúc sư vĩ đại nhất của cuộc đời mình.
                                </p>
                            </div>

                            <div className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center">
                                <p className="text-slate-500 text-sm italic mb-8">Đây là tóm tắt dựa trên các chỉ số hiện có. Bạn có thể sử dụng Chatbot ở từng chặng để hỏi sâu hơn về phác đồ chi tiết.</p>
                                <button
                                    onClick={() => setSynthesisOpen(false)}
                                    className="px-10 py-4 border border-white/20 text-white rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                                >
                                    Trở lại hành trình
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default HomePage;