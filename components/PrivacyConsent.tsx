import React, { useState, useEffect } from 'react';

const PrivacyConsent: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consented = localStorage.getItem('privacyConsented');
    if (!consented) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const handleAccept = () => {
    localStorage.setItem('privacyConsented', 'true');
    setShow(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#F4F4F9] border-t border-[#899B8E]/30 p-4 z-50 shadow-lg font-sans text-gray-800">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-sm">
          <p className="font-medium text-[#2E4032] mb-1">Quyền riêng tư của bạn</p>
          <p>
            Chúng tôi thu thập dữ liệu về câu trả lời trắc nghiệm và thông tin hồ sơ của bạn nhằm mục đích cung cấp hướng nghiệp tốt nhất. 
            Dữ liệu này được lưu trữ cục bộ (và tùy chọn trên hệ thống bảo mật Firebase). 
            Bạn có quyền xóa toàn bộ dữ liệu bất cứ lúc nào trong phần Cài đặt.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <a href="#" className="text-sm text-[#5C7162] hover:text-[#2E4032] underline py-2">Tìm hiểu thêm</a>
          <button 
            onClick={handleAccept}
            className="bg-[#899B8E] hover:bg-[#728277] text-white text-sm font-medium px-6 py-2 rounded-md transition-colors"
          >
            Tôi đồng ý
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyConsent;
