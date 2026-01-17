
import React, { useState } from 'react';
import { UserData } from '../types';

interface RegistrationFormProps {
  onRegister: (data: UserData) => void;
  onBack: () => void;
  initialEmail?: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister, onBack, initialEmail }) => {
  const [formData, setFormData] = useState<UserData>({
    fullName: '',
    email: initialEmail || '',
    password: '', // Kept for type compatibility but unused in UI
    phone: '',
    birthYear: '',
    gender: '',
    location: '',
    status: '',
    source: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleChipSelect = (name: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
     if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = "Vui lòng nhập họ và tên.";
    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Địa chỉ email không hợp lệ.";
    }
    // Password validation removed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Data Submitted:', formData);
      onRegister(formData);
    }
  };
  
  const renderChipOptions = (name: keyof typeof formData, options: {value: string, label: string}[]) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map(option => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleChipSelect(name, option.value)}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors duration-200 ${
            formData[name] === option.value
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-slate-100 dark:bg-slate-700/80 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
  
  const genderOptions = [ { value: 'male', label: 'Nam' }, { value: 'female', label: 'Nữ' }, { value: 'other', label: 'Khác' }];
  const locationOptions = [ { value: 'hanoi', label: 'Hà Nội' }, { value: 'hcm', label: 'Hồ Chí Minh' }, { value: 'danang', label: 'Đà Nẵng' }, { value: 'haiphong', label: 'Hải Phòng' }, { value: 'cantho', label: 'Cần Thơ' }, { value: 'other', label: 'Khác' }];
  const statusOptions = [ { value: 'student_highschool', label: 'Học sinh THPT' }, { value: 'student_college', label: 'Sinh viên' }, { value: 'employee', label: 'Người đi làm' }, { value: 'other', label: 'Khác' }];
  const sourceOptions = [ { value: 'friends', label: 'Bạn bè giới thiệu' }, { value: 'social', label: 'Mạng xã hội' }, { value: 'google', label: 'Google' }, { value: 'school', label: 'Nhà trường' }, { value: 'other', label: 'Khác' }];


  return (
    <div className="animate-fade-in max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 text-center">Hoàn tất hồ sơ</h2>
      <p className="mt-2 mb-8 text-slate-600 dark:text-slate-400 text-center">Chỉ một bước nữa thôi! Thông tin này giúp AI cá nhân hóa lời khuyên dành riêng cho bạn.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Họ và tên của bạn</label>
          <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} placeholder="Ví dụ: Nguyễn Văn A" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all"/>
          {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email nhận kết quả</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={formData.email} 
            onChange={handleChange} 
            readOnly={!!initialEmail}
            placeholder="email@example.com" 
            className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all ${!!initialEmail ? 'opacity-70 cursor-not-allowed' : ''}`}
          />
           {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Số điện thoại (Tùy chọn)</label>
              <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} placeholder="Ví dụ: 0912..." className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-all"/>
            </div>
            <div className="relative">
              <label htmlFor="birthYear" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Năm sinh</label>
              <select name="birthYear" id="birthYear" value={formData.birthYear} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white appearance-none transition-all">
                <option value="">Chọn năm sinh</option>
                {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - 10 - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none mt-6">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
        </div>
        
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Giới tính</label>
            {renderChipOptions('gender', genderOptions)}
        </div>
        
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nơi sinh sống</label>
            {renderChipOptions('location', locationOptions)}
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bạn đang là</label>
            {renderChipOptions('status', statusOptions)}
        </div>
        
         <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bạn biết đến PathAI qua</label>
            {renderChipOptions('source', sourceOptions)}
        </div>

        <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-700">
            <button
              type="button"
              onClick={onBack}
              className="text-slate-600 dark:text-slate-300 font-semibold py-2.5 px-6 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              Quay lại
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              Xem Kết Quả Ngay
            </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
