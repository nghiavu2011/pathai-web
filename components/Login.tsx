
import React, { useState } from 'react';
import { UserData } from '../types';
import { auth, googleProvider, db } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface LoginProps {
    onLogin: (data: UserData) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [step, setStep] = useState(1); // Default to Personal Info (Step 1)
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    const [formData, setFormData] = useState<UserData>({
        fullName: '',
        email: '',
        phone: '',
        birthYear: '',
        gender: '',
        location: '',
        status: '',
        educationLevel: '',
        source: '',
        expectations: '',
        birthOrder: '',
        maritalStatus: '',
        sexualOrientation: '',
        bio: '',
        avatarUrl: '',
        uid: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Google Login Removed


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
        if (!formData.educationLevel) newErrors.educationLevel = "Vui lòng chọn trình độ học vấn.";
        if (!formData.location) newErrors.location = "Vui lòng chọn nơi sinh sống.";
        if (!formData.birthOrder) newErrors.birthOrder = "Vui lòng chọn thứ tự trong gia đình.";
        if (!formData.maritalStatus) newErrors.maritalStatus = "Vui lòng chọn tình trạng hôn nhân.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.status) newErrors.status = "Vui lòng chọn trạng thái hiện tại.";
        if (!formData.expectations.trim()) newErrors.expectations = "Hãy chia sẻ mong muốn của bạn.";

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

    const saveUserProfile = async () => {
        setLoading(true);
        try {
            // Generate a random guest ID if not present
            const finalData = { ...formData, uid: formData.uid || `guest-${Date.now()}` };

            // Save to localStorage directly (Offline Mode)
            localStorage.setItem('localUserProfile', JSON.stringify(finalData));
            onLogin(finalData);
        } catch (error: any) {
            console.error("Save Profile Error:", error);
            // setAuthError("Không thể lưu hồ sơ. Vui lòng thử lại."); // No auth error needed for local
        } finally {
            setLoading(false);
        }
    };



    const renderStep1 = () => (
        <div className="animate-slide-up space-y-4">
            <h3 className="text-xl font-bold text-sage-800 dark:text-slate-100 text-center mb-4">Thông tin cơ bản</h3>

            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Tên hiển thị</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500" placeholder="Họ và tên hoặc Biệt danh" />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Địa chỉ Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500" placeholder="email@vi-du.com" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Năm sinh</label>
                    <select name="birthYear" value={formData.birthYear} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500">
                        <option value="">Chọn năm</option>
                        {Array.from({ length: 60 }, (_, i) => new Date().getFullYear() - 10 - i).map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    {errors.birthYear && <p className="text-red-500 text-xs mt-1">{errors.birthYear}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Giới tính</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500">
                        <option value="">Chọn</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Xu hướng tính dục <span className="text-slate-400 font-normal">(Không bắt buộc)</span></label>
                <select name="sexualOrientation" value={formData.sexualOrientation} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500">
                    <option value="">Chọn (Bạn có thể bỏ qua)</option>
                    <option value="Khác giới">Khác giới (Heterosexual)</option>
                    <option value="Đồng giới">Đồng giới (Homosexual)</option>
                    <option value="Song giới">Song giới (Bisexual)</option>
                    <option value="Toàn giới">Toàn giới (Pansexual)</option>
                    <option value="Khác">Khác</option>
                    <option value="Kín">Không muốn tiết lộ</option>
                </select>
            </div>

            <button onClick={handleNext} className="w-full py-3 bg-sage-600 hover:bg-sage-700 text-white font-bold rounded-xl transition-colors mt-2 shadow-lg shadow-sage-100">
                Tiếp tục
            </button>
        </div>
    );

    const renderStep2 = () => (
        <div className="animate-slide-up space-y-4">
            <h3 className="text-xl font-bold text-sage-800 dark:text-slate-100 text-center mb-4">Gia đình & Xã hội</h3>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Bạn là con thứ mấy?</label>
                    <select name="birthOrder" value={formData.birthOrder} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500">
                        <option value="">Chọn</option>
                        <option value="Con cả">Con cả</option>
                        <option value="Con thứ">Con thứ</option>
                        <option value="Con út">Con út</option>
                        <option value="Con một">Con một</option>
                    </select>
                    {errors.birthOrder && <p className="text-red-500 text-xs mt-1">{errors.birthOrder}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Gia đình</label>
                    <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500">
                        <option value="">Tình trạng</option>
                        <option value="Độc thân">Độc thân</option>
                        <option value="Đang hẹn hò">Đang hẹn hò</option>
                        <option value="Kết hôn">Kết hôn</option>
                        <option value="Ly hôn">Ly hôn / Ly thân</option>
                        <option value="Góa">Góa</option>
                    </select>
                    {errors.maritalStatus && <p className="text-red-500 text-xs mt-1">{errors.maritalStatus}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Trình độ học vấn</label>
                <select name="educationLevel" value={formData.educationLevel} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500">
                    <option value="">Chọn trình độ cao nhất</option>
                    <option value="THCS">Trung học cơ sở</option>
                    <option value="THPT">Trung học phổ thông</option>
                    <option value="Cao đẳng/Đại học">Cao đẳng / Đại học</option>
                    <option value="Sau Đại học">Sau Đại học (Thạc sĩ, Tiến sĩ)</option>
                    <option value="Khác">Khác</option>
                </select>
                {errors.educationLevel && <p className="text-red-500 text-xs mt-1">{errors.educationLevel}</p>}
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Nơi sinh sống</label>
                <select name="location" value={formData.location} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500">
                    <option value="">Chọn khu vực</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Khác">Tỉnh/Thành phố khác</option>
                    <option value="Nước ngoài">Nước ngoài</option>
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
            <h3 className="text-xl font-bold text-sage-800 dark:text-slate-100 text-center mb-4">Danh tính & Mục tiêu</h3>

            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Trạng thái hiện tại</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500">
                    <option value="">Bạn đang là...</option>
                    <option value="Học sinh">Học sinh THPT tìm hướng đi</option>
                    <option value="Sinh viên">Sinh viên đang học tập</option>
                    <option value="Người mới đi làm">Người mới đi làm (dưới 2 năm)</option>
                    <option value="Người đi làm lâu năm">Người đi làm muốn chuyển nghề</option>
                    <option value="Tự do">Người lao động tự do / Freelancer</option>
                    <option value="Khác">Khác</option>
                </select>
                {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Đôi điều về bản thân <span className="text-slate-400 font-normal">(Tính cách, sở thích...)</span></label>
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={2}
                    placeholder="VD: Tôi là người hướng nội, yêu thiên nhiên và thích đọc sách..."
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500 text-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Mong muốn lớn nhất tại PathAI?</label>
                <textarea
                    name="expectations"
                    value={formData.expectations}
                    onChange={handleChange}
                    rows={2}
                    placeholder="VD: Tìm nghề phù hợp, chữa lành rào cản tâm lý..."
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500 text-sm"
                />
                {errors.expectations && <p className="text-red-500 text-xs mt-1">{errors.expectations}</p>}
            </div>

            <div className="flex gap-3 mt-4">
                <button onClick={() => setStep(2)} className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl transition-colors">
                    Quay lại
                </button>
                <button disabled={loading} onClick={handleNext} className="flex-[2] py-3 bg-sage-600 hover:bg-sage-700 text-white font-bold rounded-xl transition-colors flex justify-center shadow-lg shadow-sage-100">
                    {loading ? <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> : "Hoàn tất & Bắt đầu"}
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-cream-50 dark:bg-slate-900 p-4 font-sans relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sage-200/40 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-200/40 rounded-full blur-[100px]"></div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 dark:border-slate-700">

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

                    {/* Progress Bar for Steps 1, 2 & 3 */}
                    <div className="mb-6">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
                            <span className={step >= 1 ? "text-sage-600" : ""}>Hồ sơ</span>
                            <span className={step >= 2 ? "text-sage-600" : ""}>Bối cảnh</span>
                            <span className={step >= 3 ? "text-sage-600" : ""}>Định hướng</span>
                        </div>
                        <div className="h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-sage-500 transition-all duration-500 ease-out"
                                style={{ width: step === 1 ? '33.33%' : step === 2 ? '66.66%' : '100%' }}
                            ></div>
                        </div>
                    </div>

                    {/* Content Render */}
                    <div className="min-h-[350px]">
                        {step === 1 && renderStep1()}
                        {step === 2 && renderStep2()}
                        {step === 3 && renderStep3()}
                    </div>

                </div>

                <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-8 font-medium">
                    Developed by NM_AI_ART © 2025
                </p>
            </div>
        </div>
    );
};

export default Login;
