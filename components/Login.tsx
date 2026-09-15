import React, { useState } from 'react';
import { UserData } from '../types';
import { StorageService } from '../services/storageService';
import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface LoginProps {
    onLogin: (data: UserData) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<UserData>({
        fullName: '',
        email: '',
        birthYear: '',
        gender: '',
        location: '',
        status: 'Học sinh THPT',
        educationLevel: 'THPT',
        source: 'Website',
        expectations: '',
        bio: '',
        avatarUrl: '',
        uid: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateStep1 = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Vui lòng nhập tên hiển thị.";
        if (!formData.email.trim()) newErrors.email = "Vui lòng nhập địa chỉ email.";
        if (!formData.birthYear) newErrors.birthYear = "Vui lòng chọn năm sinh.";
        if (!formData.gender) newErrors.gender = "Vui lòng chọn giới tính.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.educationLevel) newErrors.educationLevel = "Vui lòng chọn trình độ học vấn hiện tại.";
        if (!formData.location) newErrors.location = "Vui lòng chọn tỉnh / thành phố.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.status) newErrors.status = "Vui lòng chọn trạng thái học tập.";
        if (!formData.expectations.trim()) newErrors.expectations = "Hãy chia sẻ mục tiêu hoặc băn khoăn của bạn.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
        } else if (step === 2 && validateStep2()) {
            setStep(3);
        } else if (step === 3 && validateStep3()) {
            saveUserProfile();
        }
    };

    const saveUserProfile = () => {
        setLoading(true);
        try {
            const uid = formData.uid || `student-${Date.now()}`;
            const finalData: UserData = { ...formData, uid };

            // Save via namespaced StorageService
            StorageService.saveUserProfile(finalData);

            // Optional background sync to Firestore
            try {
                if (db && import.meta.env.VITE_FIREBASE_API_KEY) {
                    setDoc(doc(db, 'users', uid), {
                        ...finalData,
                        createdAt: new Date().toISOString(),
                        lastActive: new Date().toISOString()
                    }).catch(() => {});
                }
            } catch {
                // Ignore silent sync errors in offline mode
            }

            onLogin(finalData);
        } catch (error) {
            console.error("Save Profile Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderStep1 = () => (
        <div className="animate-slide-up space-y-4">
            <h3 className="text-xl font-bold text-sage-800 dark:text-slate-100 text-center mb-4">Thông tin học sinh</h3>

            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Tên hiển thị / Biệt danh</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500"
                        placeholder="VD: Nguyễn Văn A hoặc Minh Anh"
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Địa chỉ Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500"
                        placeholder="hocsinh@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Năm sinh</label>
                    <select
                        name="birthYear"
                        value={formData.birthYear}
                        onChange={handleChange}
                        className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500"
                    >
                        <option value="">Chọn năm</option>
                        {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - 12 - i).map(year => (
                            <option key={year} value={year}>{year} {year === 2011 ? '(Lớp 9)' : year === 2010 ? '(Lớp 10)' : year === 2009 ? '(Lớp 11)' : year === 2008 ? '(Lớp 12)' : ''}</option>
                        ))}
                    </select>
                    {errors.birthYear && <p className="text-red-500 text-xs mt-1">{errors.birthYear}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Giới tính</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500"
                    >
                        <option value="">Chọn</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác / Không chia sẻ</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>
            </div>

            <button onClick={handleNext} className="w-full py-3 bg-sage-600 hover:bg-sage-700 text-white font-bold rounded-xl transition-colors mt-2 shadow-lg shadow-sage-100">
                Tiếp tục
            </button>
        </div>
    );

    const renderStep2 = () => (
        <div className="animate-slide-up space-y-4">
            <h3 className="text-xl font-bold text-sage-800 dark:text-slate-100 text-center mb-4">Học vấn & Khu vực</h3>

            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Khối lớp / Trình độ hiện tại</label>
                <select
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500"
                >
                    <option value="">Chọn khối lớp</option>
                    <option value="Lớp 9 (Chuẩn bị vào Lớp 10)">Học sinh Lớp 9 (Chuẩn bị chọn môn Lớp 10)</option>
                    <option value="Lớp 10">Học sinh Lớp 10 (Chương trình GDPT 2018)</option>
                    <option value="Lớp 11">Học sinh Lớp 11 (Chuẩn bị thi ĐGNL / HSA / TSA / SAT)</option>
                    <option value="Lớp 12">Học sinh Lớp 12 (Chuẩn bị thi tốt nghiệp & xét tuyển ĐH)</option>
                    <option value="Sinh viên Đại học / Cao đẳng">Sinh viên Đại học / Cao đẳng</option>
                    <option value="Khác">Phụ huynh / Khác</option>
                </select>
                {errors.educationLevel && <p className="text-red-500 text-xs mt-1">{errors.educationLevel}</p>}
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Tỉnh / Thành phố sinh sống</label>
                <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500"
                >
                    <option value="">Chọn khu vực</option>
                    <option value="Hà Nội">Hà Nội & Miền Bắc</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh & Miền Nam</option>
                    <option value="Đà Nẵng">Đà Nẵng & Miền Trung</option>
                    <option value="Tỉnh thành khác">Tỉnh / Thành phố khác</option>
                    <option value="Nước ngoài">Nước ngoài / Du học sinh</option>
                </select>
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>

            <div className="flex gap-3 mt-2">
                <button onClick={() => setStep(1)} className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl transition-colors">
                    Quay lại
                </button>
                <button onClick={handleNext} className="flex-[2] py-3 bg-sage-600 hover:bg-sage-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-sage-100">
                    Tiếp tục
                </button>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="animate-slide-up space-y-4">
            <h3 className="text-xl font-bold text-sage-800 dark:text-slate-100 text-center mb-4">Mục tiêu & Định hướng</h3>

            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Mục tiêu hiện tại của bạn</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500"
                >
                    <option value="">Chọn mục tiêu chính...</option>
                    <option value="Định hướng chọn môn Lớp 10">Định hướng chọn tổ hợp môn Lớp 10</option>
                    <option value="Khám phá ngành học Đại học phù hợp">Khám phá nhóm ngành học Đại học phù hợp</option>
                    <option value="Lên chiến lược thi ĐGNL / ĐGTD / SAT">Lên chiến lược thi ĐGNL / HSA / TSA / SAT</option>
                    <option value="Thấu hiểu bản thân & thế mạnh tự nhiên">Thấu hiểu bản thân & phát huy thế mạnh tự nhiên</option>
                    <option value="Giải tỏa lo âu & rào cản chọn ngành">Giải tỏa lo âu & giải quyết bế tắc chọn ngành</option>
                </select>
                {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Mong muốn lớn nhất tại PathAI?</label>
                <textarea
                    name="expectations"
                    value={formData.expectations}
                    onChange={handleChange}
                    rows={2}
                    placeholder="VD: Muốn biết mình hợp với Công nghệ hay Kinh tế, cần chuẩn bị môn gì..."
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500 text-sm"
                />
                {errors.expectations && <p className="text-red-500 text-xs mt-1">{errors.expectations}</p>}
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Đôi nét về sở thích / môn học yêu thích <span className="text-slate-400 font-normal">(Không bắt buộc)</span>
                </label>
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={2}
                    placeholder="VD: Thích môn Toán và Tin học, thích tìm tòi máy tính, hay vẽ tranh..."
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500 text-sm"
                />
            </div>

            <div className="flex gap-3 mt-4">
                <button onClick={() => setStep(2)} className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl transition-colors">
                    Quay lại
                </button>
                <button disabled={loading} onClick={handleNext} className="flex-[2] py-3 bg-sage-600 hover:bg-sage-700 text-white font-bold rounded-xl transition-colors flex justify-center shadow-lg shadow-sage-100">
                    {loading ? <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> : "Bắt đầu khám phá"}
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-cream-50 dark:bg-slate-900 p-4 font-sans relative overflow-hidden">
            {/* Ambient Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sage-200/40 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-200/40 rounded-full blur-[100px]"></div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 dark:border-slate-700">

                    {/* Logo Header */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-16 h-16 bg-sage-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sage-200 mb-4 transform rotate-3">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17L12 22L22 17" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-display font-bold text-sage-900 dark:text-slate-100">PathAI</h1>
                        <p className="text-sage-500 dark:text-slate-400 text-sm font-medium tracking-widest uppercase mt-1">Hành trình thấu hiểu bản thân</p>
                    </div>

                    {/* Stepper Indicator */}
                    <div className="mb-6">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
                            <span className={step >= 1 ? "text-sage-600 font-bold" : ""}>Học sinh</span>
                            <span className={step >= 2 ? "text-sage-600 font-bold" : ""}>Khối lớp</span>
                            <span className={step >= 3 ? "text-sage-600 font-bold" : ""}>Mục tiêu</span>
                        </div>
                        <div className="h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-sage-500 transition-all duration-500 ease-out"
                                style={{ width: step === 1 ? '33.33%' : step === 2 ? '66.66%' : '100%' }}
                            ></div>
                        </div>
                    </div>

                    {/* Active Step Content */}
                    <div className="min-h-[350px]">
                        {step === 1 && renderStep1()}
                        {step === 2 && renderStep2()}
                        {step === 3 && renderStep3()}
                    </div>

                </div>

                <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-8 font-medium">
                    PathAI Guidance System • GDPT 2018
                </p>
            </div>
        </div>
    );
};

export default Login;
