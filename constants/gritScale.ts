import { Step, Question, GritGroupKey, Introduction } from '../types';

export const GRIT_STEPS: Step[] = [
  { id: 0, title: 'Bắt đầu' },
  { id: 1, title: 'Câu hỏi' },
  { id: 2, title: 'Đăng ký' },
  { id: 3, title: 'Kết quả' },
];

export const GRIT_INTRODUCTION: Introduction = {
  title: 'Thang đo Bền chí (Grit Scale)',
  main_description: "Tại sao một số người lại thành công hơn những người khác dù có cùng tài năng? Câu trả lời có thể nằm ở 'Grit' - sự bền bỉ. Bài trắc nghiệm này sẽ đo lường mức độ bền chí của bạn qua hai yếu tố: đam mê ổn định và kiên trì nỗ lực. Hiểu được điểm Grit của mình giúp bạn nhận ra sức mạnh nội tại và xác định những lĩnh vực cần rèn luyện để theo đuổi mục tiêu đến cùng.",
  theory_details: {
    title: "Lý thuyết đằng sau: Thang đo Bền chí (Grit Scale)",
    content: "Được nghiên cứu và phổ biến bởi nhà tâm lý học Angela Duckworth, 'Grit' được định nghĩa là 'đam mê và kiên trì cho các mục tiêu dài hạn'. Đây không phải là tài năng bẩm sinh, mà là một phẩm chất có thể rèn luyện. Nghiên cứu của bà cho thấy Grit là một yếu tố dự báo thành công quan trọng hơn cả IQ trong nhiều lĩnh vực. Kết quả của bài trắc nghiệm sẽ giúp bạn hiểu mình đang ở đâu trên thang đo này và làm thế nào để nuôi dưỡng sự bền bỉ của mình.",
    source: "Angela Duckworth, Grit: The Power of Passion and Perseverance, 2016."
  },
  guidance: {
    before: [
      'Đánh giá bản thân một cách tổng quan, so sánh với mọi người nói chung.',
      'Không có câu trả lời nào là đúng hay sai.',
      'Sự trung thực sẽ mang lại kết quả chính xác nhất.',
    ],
    during: [
      'Thang đo gồm 2 thành phần: Kiên trì nỗ lực và Đam mê ổn định.',
      'Bạn sẽ trả lời 12 câu hỏi.',
      'Chọn mức độ từ 1 (Hoàn toàn không đúng) đến 5 (Rất đúng).',
    ],
    note: "Hiểu được mức độ bền chí của mình là một yếu tố quan trọng giúp bạn lựa chọn và theo đuổi sự nghiệp một cách bền vững."
  }
};


export const GRIT_RATING_OPTIONS = [1, 2, 3, 4, 5];
export const GRIT_RATING_LABELS = {
  start: 'Hoàn toàn không đúng',
  end: 'Rất đúng'
};


export interface GritCategory {
    key: GritGroupKey;
    title: string;
    questions: Question[];
}

export const GRIT_QUIZ_DATA: GritCategory[] = [
  {
    key: GritGroupKey.Effort,
    title: 'Nhóm A – Kiên trì nỗ lực (Perseverance of Effort)',
    questions: [
      { id: 'G_A1', grit_group_code: GritGroupKey.Effort, text: 'Tôi hoàn thành công việc ngay cả khi mất nhiều thời gian hơn dự kiến.' },
      { id: 'G_A2', grit_group_code: GritGroupKey.Effort, text: 'Tôi không dễ dàng từ bỏ khi gặp khó khăn.' },
      { id: 'G_A3', grit_group_code: GritGroupKey.Effort, text: 'Tôi thường cố gắng đến cùng dù kết quả chưa rõ ràng.' },
      { id: 'G_A4', grit_group_code: GritGroupKey.Effort, text: 'Tôi tiếp tục cố gắng cho đến khi đạt được mục tiêu.' },
      { id: 'G_A5', grit_group_code: GritGroupKey.Effort, text: 'Tôi xem thất bại chỉ là một phần của quá trình học hỏi.' },
      { id: 'G_A6', grit_group_code: GritGroupKey.Effort, text: 'Tôi tin rằng nỗ lực quan trọng hơn tài năng.' },
    ],
  },
  {
    key: GritGroupKey.Interest,
    title: 'Nhóm B – Đam mê ổn định (Consistency of Interest)',
    questions: [
      { id: 'G_B1', grit_group_code: GritGroupKey.Interest, text: 'Tôi thường kiên định với mục tiêu của mình trong thời gian dài.' },
      { id: 'G_B2', grit_group_code: GritGroupKey.Interest, text: 'Tôi ít khi thay đổi hứng thú hay hướng đi chỉ vì điều mới mẻ.' },
      { id: 'G_B3', grit_group_code: GritGroupKey.Interest, text: 'Tôi duy trì niềm đam mê với cùng một lĩnh vực trong nhiều năm.' },
      { id: 'G_B4', grit_group_code: GritGroupKey.Interest, text: 'Tôi có định hướng nghề nghiệp rõ ràng và ít dao động.' },
      { id: 'G_B5', grit_group_code: GritGroupKey.Interest, text: 'Tôi hiếm khi bỏ giữa chừng một dự án mình đã bắt đầu.' },
      { id: 'G_B6', grit_group_code: GritGroupKey.Interest, text: 'Tôi luôn cảm thấy có mục tiêu lớn để theo đuổi lâu dài.' },
    ],
  },
];

export const GRIT_CLASSIFICATION = [
    { range: [4.5, 5.0], level: "Rất cao", description: "Kiên định, bền bỉ vượt trội, hiếm khi bỏ cuộc" },
    { range: [3.5, 4.4], level: "Cao", description: "Có mục tiêu rõ ràng, kiên trì lâu dài" },
    { range: [2.5, 3.4], level: "Trung bình", description: "Đôi khi nản lòng hoặc dễ thay đổi hướng" },
    { range: [1.5, 2.4], level: "Thấp", description: "Dễ chán, khó duy trì mục tiêu dài hạn" },
    { range: [1.0, 1.4], level: "Rất thấp", description: "Thiếu kiên định, không bền chí với mục tiêu" },
];

export const GRIT_CAREER_SUGGESTIONS = [
    { level: "Rất cao / Cao", environment: "Nghiên cứu, thiết kế, kỹ thuật, startup, giáo dục, thể thao chuyên nghiệp", development: "Phát huy vai trò lãnh đạo, mentor" },
    { level: "Trung bình", environment: "Nghề sáng tạo linh hoạt, marketing, dịch vụ, thiết kế, MEP", development: "Cần hỗ trợ huấn luyện mục tiêu dài hạn" },
    { level: "Thấp", environment: "Nghề thay đổi nhanh, ít ràng buộc lâu dài", development: "Phát triển kỹ năng tự quản, quản lý thời gian" },
];