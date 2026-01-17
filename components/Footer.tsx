import React, { useState } from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, FacebookIcon, InstagramIcon, TikTokIcon, HeartIcon } from './common/Icons';
import DisclaimerModal from './DisclaimerModal';

interface FooterProps {
    onOpenDonationModal: () => void;
}

const SocialLink: React.FC<{ href: string; ariaLabel: string; icon: React.ReactNode }> = ({ href, ariaLabel, icon }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label={ariaLabel} 
        className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-sage-600 dark:text-sage-400 hover:bg-sage-600 hover:text-white dark:hover:bg-sage-500 dark:hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-sage-200/50 border border-sage-100 dark:border-slate-700"
    >
        {icon}
    </a>
);

const ContactLink: React.FC<{ href: string; ariaLabel: string; icon: React.ReactNode }> = ({ href, ariaLabel, icon }) => (
    <a 
        href={href} 
        aria-label={ariaLabel} 
        className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-sage-600 dark:text-sage-400 hover:bg-sage-600 hover:text-white dark:hover:bg-sage-500 dark:hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-sage-200/50 border border-sage-100 dark:border-slate-700"
    >
        {icon}
    </a>
);

const Footer: React.FC<FooterProps> = ({ onOpenDonationModal }) => {
    const [isDisclaimerOpen, setDisclaimerOpen] = useState(false);

    return (
        <footer className="bg-sage-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 py-16 px-4 border-t border-sage-200 dark:border-slate-800 mt-24 transition-colors duration-300 font-sans relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sage-300 via-cream-300 to-sage-300 opacity-50"></div>
            
            <div className="container mx-auto">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-24 gap-12 mb-16">
                        {/* Column 1: Connect */}
                        <div className="flex flex-col items-center md:items-start space-y-8">
                            <div className="flex flex-col items-center md:items-start">
                                <h4 className="font-display font-bold text-lg uppercase tracking-widest text-sage-800 dark:text-slate-100 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-sage-500 rounded-full"></span>
                                    Kết Nối Với Chúng Tôi
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center md:text-left max-w-sm leading-loose font-light">
                                    Theo dõi PathAI trên các nền tảng xã hội để cập nhật những kiến thức mới nhất về định hướng sự nghiệp và thấu hiểu bản thân.
                                </p>
                            </div>
                            
                            <div className="flex items-center flex-wrap gap-4 justify-center md:justify-start">
                                <ContactLink href="https://zalo.me/0985578385" ariaLabel="Zalo" icon={<PhoneIcon className="w-5 h-5" />} />
                                <ContactLink href="mailto:nmaiart2011@gmail.com" ariaLabel="Email" icon={<EnvelopeIcon className="w-5 h-5" />} />
                                <SocialLink href="https://www.facebook.com/profile.php?id=100093268771639" ariaLabel="Facebook" icon={<FacebookIcon className="w-5 h-5" />} />
                                <SocialLink href="https://www.instagram.com/nmai_art/?igsh=d3BidzgzNXYwazg4&utm_source=qr" ariaLabel="Instagram" icon={<InstagramIcon className="w-5 h-5" />} />
                                <SocialLink href="https://www.tiktok.com/@nghiavt2011" ariaLabel="TikTok" icon={<TikTokIcon className="w-5 h-5" />} />
                            </div>
                        </div>

                        {/* Column 2: Support & Info */}
                        <div className="flex flex-col items-center md:items-start space-y-8">
                            <h4 className="font-display font-bold text-lg uppercase tracking-widest text-sage-800 dark:text-slate-100 mb-2 flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-sage-500 rounded-full"></span>
                                Thông Tin & Hỗ Trợ
                            </h4>
                            
                             <div className="space-y-4 w-full max-w-sm md:max-w-none">
                                {/* Map Link */}
                                <a 
                                    href="https://maps.app.goo.gl/eSTFSqLGfVKPppJL6" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 border border-sage-100 dark:border-slate-700 hover:border-sage-300 transition-all duration-300 group shadow-sm hover:shadow-md"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-sage-100 dark:bg-slate-700 flex items-center justify-center text-sage-600 dark:text-sage-400 group-hover:bg-sage-600 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                                        <MapPinIcon className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sage-900 dark:text-slate-200 font-bold text-sm group-hover:text-sage-700 dark:group-hover:text-sage-400 transition-colors font-display">Địa chỉ văn phòng</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 font-light">Xem vị trí trên Google Maps</p>
                                    </div>
                                </a>

                                {/* Donation Button */}
                                <button
                                    onClick={onOpenDonationModal}
                                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800 border border-sage-100 dark:border-slate-700 hover:border-rose-200 transition-all duration-300 group shadow-sm hover:shadow-md"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-slate-700 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                                        <HeartIcon className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sage-900 dark:text-slate-200 font-bold text-sm group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors font-display">Ủng hộ dự án</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 font-light">Góp phần duy trì và phát triển PathAI</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-sage-200 dark:border-slate-800 pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-6 text-xs text-slate-500 dark:text-slate-500 font-light">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                        <span className="flex items-center gap-1">
                            © 2025 PathAI Studio. <span className="hidden md:inline">|</span> All rights reserved.
                        </span>
                        
                        <div className="flex items-center gap-1">
                            <span>Developed by</span>
                            <a
                                href="https://www.facebook.com/nghiainterior"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-sage-600 dark:text-sage-400 hover:text-sage-800 dark:hover:text-sage-300 transition-colors uppercase tracking-wider"
                            >
                                NM_AI_ART
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => setDisclaimerOpen(true)}
                            className="text-slate-500 hover:text-sage-600 dark:hover:text-sage-400 underline decoration-dotted underline-offset-4 transition-colors"
                        >
                            Miễn trừ trách nhiệm & Bảo mật
                        </button>
                    </div>
                </div>
            </div>
            
            <DisclaimerModal isOpen={isDisclaimerOpen} onClose={() => setDisclaimerOpen(false)} />
        </footer>
    );
};

export default Footer;