import React, { useState } from 'react';

const AssessmentDisclaimer: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-md">
      <div className="flex justify-between items-start">
        <p className="text-sm text-amber-800 font-medium">
          ⚠️ Lưu ý: Đây là công cụ tham khảo, không phải chẩn đoán tâm lý chuyên nghiệp.
        </p>
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="text-amber-600 hover:text-amber-800 text-xs font-semibold ml-4"
        >
          {expanded ? 'Thu gọn' : 'Chi tiết'}
        </button>
      </div>
      
      {expanded && (
        <div className="mt-2 text-sm text-amber-700">
          <p>
            Kết quả giúp bạn khám phá bản thân, không phải kết luận cuối cùng về con người bạn. 
            Vui lòng xem kết quả như một phần tham khảo trong quá trình định hướng nghề nghiệp.
          </p>
        </div>
      )}
    </div>
  );
};

export default AssessmentDisclaimer;
