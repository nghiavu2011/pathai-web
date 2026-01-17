import { Step, Question, CRSCategoryKey, Introduction } from '../types';

export const CRS_RESULT_DETAILS = {
  [CRSCategoryKey.SU]: { name: "Hiểu biết bản thân" },
  [CRSCategoryKey.DM]: { name: "Ra quyết định nghề nghiệp" },
  [CRSCategoryKey.SS]: { name: "Kỹ năng xã hội – nghề nghiệp" },
  [CRSCategoryKey.CP]: { name: "Lập kế hoạch nghề nghiệp" },
  [CRSCategoryKey.AD]: { name: "Tư duy phát triển nghề nghiệp" },
};

export const CRS_STEPS: Step[] = [
  { id: 0, title: 'Bắt đầu' },
  { id: 1, title: 'Hiểu bản thân' },
  { id: 2, title: 'Ra quyết định' },
  { id: 3, title: 'Kỹ năng xã hội' },
  { id: 4, title: 'Lập kế hoạch' },
  { id: 5, title: 'Tư duy' },
  { id: 6, title: 'Đăng ký' },
  { id: 7, title: 'Kết quả' },
];

export const CRS_INTRODUCTION: Introduction = {
  title: 'Bảng "Sẵn sàng nghề nghiệp"',
  main_description: "Sẵn sàng cho sự nghiệp không chỉ là có một tấm bằng, mà còn là sự chuẩn bị về mặt kỹ năng và tư duy. Bài đánh giá này giúp bạn tự kiểm tra mức độ 'sẵn sàng' của mình trên 5 lĩnh vực quan trọng: từ việc hiểu rõ bản thân, ra quyết định, đến lập kế hoạch và thích nghi với thay đổi. Đây là một 'bản đồ' giúp bạn thấy rõ mình đang mạnh ở đâu và cần trang bị thêm gì cho hành trình phía trước.",
  theory_details: {
    title: "Lý thuyết đằng sau: Mô hình Phát triển Nghề nghiệp",
    content: "Dựa trên các lý thuyết về phát triển nghề nghiệp, công cụ này tổng hợp các yếu tố cốt lõi quyết định sự thành công trong việc chuyển đổi từ môi trường học tập sang làm việc. Nó không chỉ đo lường kiến thức, mà còn cả thái độ và kỹ năng mềm. Kết quả sẽ cho bạn một cái nhìn toàn diện về các 'năng lực nghề nghiệp' của mình, giúp bạn xây dựng một lộ trình phát triển cá nhân hóa và chủ động hơn trong việc tìm kiếm cơ hội.",
    source: "Tổng hợp từ các mô hình Career Development & Employability."
  },
  guidance: {
    before: [
      'Hãy trả lời một cách trung thực và khách quan.',
      'Không có câu trả lời nào là "đúng" hay "sai".',
      'Đây là cơ hội để bạn tự đánh giá bản thân.',
    ],
    during: [
      'Bạn sẽ trả lời 25 câu hỏi, chia thành 5 nhóm kỹ năng.',
      'Chọn mức độ đồng ý từ 1 (Hoàn toàn không đúng) đến 5 (Rất đúng).',
      'Kết quả sẽ phản ánh mức độ sẵn sàng hiện tại của bạn.',
    ],
    note: 'Công cụ này mang tính tham khảo, giúp bạn nhận diện điểm mạnh và lĩnh vực cần cải thiện để chuẩn bị tốt hơn cho tương lai.'
  }
};


export const CRS_RATING_OPTIONS = [1, 2, 3, 4, 5];
export const CRS_RATING_LABELS = {
  start: 'Hoàn toàn không đúng',
  end: 'Rất đúng'
};


export interface CRSCategory {
    key: CRSCategoryKey;
    title: string;
    questions: Question[];
}

export const CRS_QUIZ_DATA: CRSCategory[] = [
    {
        key: CRSCategoryKey.SU,
        title: "1️⃣ Hiểu biết bản thân (Self-Understanding)",
        questions: [
            { id: "CRS_SU1", crs_code: CRSCategoryKey.SU, text: "Tôi hiểu rõ những giá trị và điều quan trọng nhất với mình trong công việc." },
            { id: "CRS_SU2", crs_code: CRSCategoryKey.SU, text: "Tôi biết điểm mạnh và điểm yếu của bản thân." },
            { id: "CRS_SU3", crs_code: CRSCategoryKey.SU, text: "Tôi có khả năng nhận ra điều gì khiến tôi hứng thú trong công việc." },
            { id: "CRS_SU4", crs_code: CRSCategoryKey.SU, text: "Tôi hiểu rõ phong cách làm việc phù hợp với mình." },
            { id: "CRS_SU5", crs_code: CRSCategoryKey.SU, text: "Tôi biết rõ điều gì khiến mình cảm thấy thành công." },
        ]
    },
    {
        key: CRSCategoryKey.DM,
        title: "2️⃣ Ra quyết định nghề nghiệp (Career Decision-Making)",
        questions: [
            { id: "CRS_DM1", crs_code: CRSCategoryKey.DM, text: "Tôi biết cách thu thập và so sánh thông tin các nghề khác nhau." },
            { id: "CRS_DM2", crs_code: CRSCategoryKey.DM, text: "Tôi có thể xác định các tiêu chí quan trọng khi chọn nghề." },
            { id: "CRS_DM3", crs_code: CRSCategoryKey.DM, text: "Tôi cảm thấy tự tin khi phải ra quyết định nghề nghiệp." },
            { id: "CRS_DM4", crs_code: CRSCategoryKey.DM, text: "Tôi biết cách cân nhắc giữa sở thích và cơ hội việc làm." },
            { id: "CRS_DM5", crs_code: CRSCategoryKey.DM, text: "Tôi tin rằng mình có thể lựa chọn nghề phù hợp với năng lực bản thân." },
        ]
    },
    {
        key: CRSCategoryKey.SS,
        title: "3️⃣ Kỹ năng xã hội – nghề nghiệp (Social & Employability Skills)",
        questions: [
            { id: "CRS_SS1", crs_code: CRSCategoryKey.SS, text: "Tôi tự tin khi giao tiếp trong môi trường làm việc." },
            { id: "CRS_SS2", crs_code: CRSCategoryKey.SS, text: "Tôi biết cách hợp tác hiệu quả với người khác trong nhóm." },
            { id: "CRS_SS3", crs_code: CRSCategoryKey.SS, text: "Tôi có khả năng trình bày, thuyết phục hoặc báo cáo công việc." },
            { id: "CRS_SS4", crs_code: CRSCategoryKey.SS, text: "Tôi biết cách ứng xử chuyên nghiệp trong công việc." },
            { id: "CRS_SS5", crs_code: CRSCategoryKey.SS, text: "Tôi chủ động học hỏi từ đồng nghiệp hoặc cấp trên." },
        ]
    },
    {
        key: CRSCategoryKey.CP,
        title: "4️⃣ Lập kế hoạch nghề nghiệp (Career Planning)",
        questions: [
            { id: "CRS_CP1", crs_code: CRSCategoryKey.CP, text: "Tôi đã xác định rõ mục tiêu nghề nghiệp cho 3–5 năm tới." },
            { id: "CRS_CP2", crs_code: CRSCategoryKey.CP, text: "Tôi biết các bước cụ thể để đạt mục tiêu nghề nghiệp." },
            { id: "CRS_CP3", crs_code: CRSCategoryKey.CP, text: "Tôi thường xuyên theo dõi và điều chỉnh kế hoạch nghề." },
            { id: "CRS_CP4", crs_code: CRSCategoryKey.CP, text: "Tôi chủ động tìm cơ hội phát triển nghề nghiệp." },
            { id: "CRS_CP5", crs_code: CRSCategoryKey.CP, text: "Tôi có lộ trình rõ ràng để đạt đến vị trí mong muốn." },
        ]
    },
    {
        key: CRSCategoryKey.AD,
        title: "5️⃣ Tư duy phát triển nghề nghiệp (Career Adaptability)",
        questions: [
            { id: "CRS_AD1", crs_code: CRSCategoryKey.AD, text: "Tôi có thể thích nghi tốt với thay đổi trong công việc." },
            { id: "CRS_AD2", crs_code: CRSCategoryKey.AD, text: "Tôi coi khó khăn là cơ hội học hỏi." },
            { id: "CRS_AD3", crs_code: CRSCategoryKey.AD, text: "Tôi chủ động cập nhật kiến thức và kỹ năng mới." },
            { id: "CRS_AD4", crs_code: CRSCategoryKey.AD, text: "Tôi sẵn sàng thay đổi hướng nghề nếu phù hợp hơn." },
            { id: "CRS_AD5", crs_code: CRSCategoryKey.AD, text: "Tôi tin rằng năng lực có thể được phát triển qua nỗ lực." },
        ]
    }
];

export const CRS_CLASSIFICATION = [
    { range: [4.5, 5.0], level: "Rất cao", description: "Đã sẵn sàng phát triển nghề nghiệp độc lập" },
    { range: [3.5, 4.4], level: "Cao", description: "Có định hướng rõ, cần hoàn thiện kỹ năng" },
    { range: [2.5, 3.4], level: "Trung bình", description: "Hiểu bản thân cơ bản, cần hỗ trợ lập kế hoạch" },
    { range: [1.5, 2.4], level: "Thấp", description: "Mơ hồ về nghề nghiệp, cần định hướng cá nhân" },
    { range: [1.0, 1.4], level: "Rất thấp", description: "Thiếu định hướng nghề nghiệp, cần can thiệp chuyên sâu" },
];