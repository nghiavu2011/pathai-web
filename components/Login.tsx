
import React, { useState } from 'react';
import { UserData } from '../types';
import { auth, googleProvider, db } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface LoginProps {
    onLogin: (data: UserData) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [step, setStep] = useState(0); // 0: Google Login, 1: Personal Info, 2: Survey
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
        avatarUrl: '',
        uid: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Handle Google Login
    const handleGoogleLogin = async () => {
        setLoading(true);
        setAuthError(null);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Check if user exists in Firestore
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                // User exists, log them in directly
                const userData = userSnap.data() as UserData;
                onLogin({ ...userData, uid: user.uid }); // Ensure UID is present
            } else {
                // New user, prefill data and move to registration
                setFormData(prev => ({
                    ...prev,
                    uid: user.uid,
                    email: user.email || '',
                    fullName: user.displayName || '',
                    avatarUrl: user.photoURL || ''
                }));
                setStep(1);
            }
        } catch (error: any) {
            console.error("Login Error:", error);
            setAuthError("Đăng nhập thất bại. Vui lòng thử lại. " + (error.message || ""));
        } finally {
            setLoading(false);
        }
    };

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
        if (!formData.birthYear) newErrors.birthYear = "Vui lòng chọn năm sinh.";
        if (!formData.gender) newErrors.gender = "Vui lòng chọn giới tính.";
        if (!formData.educationLevel) newErrors.educationLevel = "Vui lòng chọn trình độ học vấn.";
        if (!formData.location) newErrors.location = "Vui lòng chọn nơi sinh sống.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.status) newErrors.status = "Vui lòng chọn trạng thái hiện tại.";
        if (!formData.source) newErrors.source = "Vui lòng cho biết bạn biết đến chúng tôi từ đâu.";
        if (!formData.expectations.trim()) newErrors.expectations = "Hãy chia sẻ mong muốn của bạn.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
        } else if (step === 2 && validateStep2()) {
            saveUserProfile();
        }
    };

    const saveUserProfile = async () => {
        setLoading(true);
        try {
            if (!formData.uid) throw new Error("Missing UID");
            const userRef = doc(db, "users", formData.uid);
            await setDoc(userRef, formData);
            onLogin(formData);
        } catch (error: any) {
            console.error("Save Profile Error:", error);
            setAuthError("Không thể lưu hồ sơ. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    const renderGoogleButton = () => (
        <div className="text-center animate-fade-in">
            <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6">
                <svg viewBox="0 0 24 24" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.734 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                    </g>
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Đăng nhập với Google</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs mx-auto text-sm">
                Kết nối tài khoản để lưu trữ hồ sơ, lịch sử trắc nghiệm và nhận tư vấn AI được cá nhân hóa.
            </p>

            {authError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline text-sm">{authError}</span>
                </div>
            )}

            <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full max-w-xs py-3 px-6 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl shadow-sm hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-600 transition-all flex items-center justify-center gap-3 group mx-auto"
            >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-slate-400 border-t-blue-500 rounded-full animate-spin"></div>
                ) : (
                    <>
                        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.734 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                            </g>
                        </svg>
                        <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">Tiếp tục với Google</span>
                    </>
                )}
            </button>
            <p className="mt-6 text-xs text-slate-400">
                Bằng việc tiếp tục, bạn đồng ý với Điều khoản sử dụng và Chính sách bảo mật của PathAI.
            </p>
        </div>
    );

    const renderStep1 = () => (
        <div className="animate-slide-up space-y-5">
            <h3 className="text-xl font-bold text-sage-800 dark:text-slate-100 text-center mb-6">Thông tin cơ bản</h3>

            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Tên hiển thị</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500" placeholder="Tên bạn muốn được gọi" />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Năm sinh</label>
                    <select name="birthYear" value={formData.birthYear} onChange={handleChange} className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500">
                        <option value="">Chọn năm</option>
                        {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - 10 - i).map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    {errors.birthYear && <p className="text-red-500 text-xs mt-1">{errors.birthYear}</p>}
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Giới tính</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500">
                        <option value="">Chọn</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Trình độ học vấn</label>
                <select name="educationLevel" value={formData.educationLevel} onChange={handleChange} className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500">
                    <option value="">Chọn trình độ cao nhất</option>
                    <option value="THPT">Trung học phổ thông</option>
                    <option value="Cao đẳng/Đại học">Cao đẳng / Đại học</option>
                    <option value="Sau Đại học">Sau Đại học (Thạc sĩ, Tiến sĩ)</option>
                    <option value="Khác">Khác</option>
                </select>
                {errors.educationLevel && <p className="text-red-500 text-xs mt-1">{errors.educationLevel}</p>}
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Nơi sinh sống</label>
                <select name="location" value={formData.location} onChange={handleChange} className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500">
                    <option value="">Chọn khu vực</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Khác">Tỉnh/Thành phố khác</option>
                    <option value="Nước ngoài">Nước ngoài</option>
                </select>
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>

            <button onClick={handleNext} className="w-full py-3 bg-sage-600 hover:bg-sage-700 text-white font-bold rounded-xl transition-colors mt-4">
                Tiếp tục
            </button>
        </div>
    );

    const renderStep2 = () => (
        <div className="animate-slide-up space-y-5">
            <h3 className="text-xl font-bold text-sage-800 dark:text-slate-100 text-center mb-6">Thấu hiểu nhu cầu</h3>

            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Trạng thái hiện tại</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500">
                    <option value="">Bạn đang là...</option>
                    <option value="Học sinh">Học sinh THPT tìm hướng đi</option>
                    <option value="Sinh viên">Sinh viên đang học tập</option>
                    <option value="Người mới đi làm">Người mới đi làm (dưới 2 năm)</option>
                    <option value="Người đi làm lâu năm">Người đi làm muốn chuyển nghề</option>
                    <option value="Khác">Khác</option>
                </select>
                {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Bạn biết đến PathAI từ đâu?</label>
                <select name="source" value={formData.source} onChange={handleChange} className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500">
                    <option value="">Chọn nguồn</option>
                    <option value="Facebook">Facebook / Mạng xã hội</option>
                    <option value="Google">Tìm kiếm Google</option>
                    <option value="Bạn bè">Bạn bè giới thiệu</option>
                    <option value="Trường học">Nhà trường / Thầy cô</option>
                    <option value="Khác">Khác</option>
                </select>
                {errors.source && <p className="text-red-500 text-xs mt-1">{errors.source}</p>}
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Mong muốn lớn nhất của bạn tại PathAI?</label>
                <textarea
                    name="expectations"
                    value={formData.expectations}
                    onChange={handleChange}
                    rows={3}
                    placeholder="VD: Tôi muốn tìm một nghề phù hợp với tính cách hướng nội..."
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sage-500"
                />
                {errors.expectations && <p className="text-red-500 text-xs mt-1">{errors.expectations}</p>}
            </div>

            <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="flex-1 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-colors">
                    Quay lại
                </button>
                <button disabled={loading} onClick={handleNext} className="flex-[2] py-3 bg-sage-600 hover:bg-sage-700 text-white font-bold rounded-xl transition-colors flex justify-center">
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
                    {step === 0 && (
                        <div className="flex flex-col items-center mb-8">
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
                    )}

                    {/* Progress Bar for Steps 1 & 2 */}
                    {step > 0 && (
                        <div className="mb-8">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                                <span className={step >= 1 ? "text-sage-600" : ""}>Hồ sơ</span>
                                <span className={step >= 2 ? "text-sage-600" : ""}>Nhu cầu</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-sage-500 transition-all duration-500 ease-out"
                                    style={{ width: step === 1 ? '50%' : '100%' }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Content Render */}
                    <div className="min-h-[300px]">
                        {step === 0 && renderGoogleButton()}
                        {step === 1 && renderStep1()}
                        {step === 2 && renderStep2()}
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
