import { Step, Question, GritGroupKey, Introduction } from '../types';

export const GRIT_STEPS: Step[] = [
  { id: 0, title: 'Bắt đầu' },
  { id: 1, title: 'Đánh giá Bền chí' },
  { id: 2, title: 'Kết quả' },
];

export const GRIT_INTRODUCTION: Introduction = {
  title: 'Thang đo Bền chí (Grit Scale)',
  main_description: "Tại sao một số người kiên trì theo đuổi mục tiêu và đạt được thành công bền vững? Câu trả lời nằm ở 'Grit' - sự bền bỉ. Bài trắc nghiệm này đo lường mức độ kiên trì của bạn qua hai yếu tố: Đam mê ổn định và Kiên trì nỗ lực. Hiểu được mức độ bền chí giúp bạn nhận ra sức mạnh nội tại và xây dựng phương pháp học tập hiệu quả.",
  theory_details: {
    title: "Cơ sở lý thuyết & Ghi chú học thuật",
    content: "Khái niệm 'Grit' được nghiên cứu và phổ biến bởi GS. Angela Duckworth (Đại học Pennsylvania), định nghĩa là 'sự đam mê và bền bỉ theo đuổi các mục tiêu dài hạn'. Bảng hỏi trong PathAI là phiên bản thích ứng sư phạm phục vụ mục đích tự phản chiếu và rèn luyện bản thân của học sinh THPT, không thay thế cho thang đo chẩn đoán chuẩn hóa lâm sàng.",
    source: "Angela Duckworth, Grit: The Power of Passion and Perseverance, 2016."
  },
  guidance: {
    before: [
      'Đánh giá bản thân một cách trung thực và khách quan.',
      'Không có câu trả lời đúng hay sai, mỗi mức độ phản ánh thói quen hiện tại.',
      'Sự trung thực sẽ giúp bạn nhận diện chính xác điểm cần rèn luyện.',
    ],
    during: [
      'Thang đo gồm 2 thành phần: Kiên trì nỗ lực và Đam mê ổn định.',
      'Bạn sẽ trả lời 12 câu hỏi.',
      'Chọn mức độ từ 1 (Hoàn toàn không đúng) đến 5 (Rất đúng).',
    ],
    note: "Sự bền chí là một phẩm chất hoàn toàn có thể rèn luyện và nâng cao qua thời gian thông qua việc thiết lập thói quen nhỏ mỗi ngày."
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
      { id: 'G_A1', grit_group_code: GritGroupKey.Effort, text: 'Tôi hoàn thành bài tập hoặc công việc ngay cả khi mất nhiều thời gian hơn dự kiến.' },
      { id: 'G_A2', grit_group_code: GritGroupKey.Effort, text: 'Tôi không dễ dàng từ bỏ khi gặp bài toán hoặc thử thách khó.' },
      { id: 'G_A3', grit_group_code: GritGroupKey.Effort, text: 'Tôi thường cố gắng đến cùng dù kết quả ban đầu chưa như ý.' },
      { id: 'G_A4', grit_group_code: GritGroupKey.Effort, text: 'Tôi tiếp tục luyện tập cho đến khi đạt được mục tiêu đề ra.' },
      { id: 'G_A5', grit_group_code: GritGroupKey.Effort, text: 'Tôi xem thất bại là cơ hội để học hỏi và hoàn thiện bản thân.' },
      { id: 'G_A6', grit_group_code: GritGroupKey.Effort, text: 'Tôi tin rằng sự kiên trì nỗ lực quan trọng hơn tài năng bẩm sinh.' },
    ],
  },
  {
    key: GritGroupKey.Interest,
    title: 'Nhóm B – Đam mê ổn định (Consistency of Interest)',
    questions: [
      { id: 'G_B1', grit_group_code: GritGroupKey.Interest, text: 'Tôi kiên định với mục tiêu học tập và định hướng của mình trong thời gian dài.' },
      { id: 'G_B2', grit_group_code: GritGroupKey.Interest, text: 'Tôi ít khi thay đổi hứng thú chỉ vì có trào lưu mới.' },
      { id: 'G_B3', grit_group_code: GritGroupKey.Interest, text: 'Tôi duy trì niềm yêu thích với một lĩnh vực hoặc môn học trong nhiều năm.' },
      { id: 'G_B4', grit_group_code: GritGroupKey.Interest, text: 'Tôi có định hướng ngành nghề rõ ràng và ít bị dao động bởi ý kiến ngoài luồng.' },
      { id: 'G_B5', grit_group_code: GritGroupKey.Interest, text: 'Tôi hiếm khi bỏ dở giữa chừng một dự án hay kế hoạch mình đã bắt đầu.' },
      { id: 'G_B6', grit_group_code: GritGroupKey.Interest, text: 'Tôi luôn duy trì mục tiêu dài hạn để phấn đấu mỗi ngày.' },
    ],
  },
];

export const GRIT_CLASSIFICATION = [
    { range: [4.5, 5.0], level: "Rất cao", description: "Kiên định và bền bỉ vượt trội, hiếm khi bỏ cuộc trước khó khăn." },
    { range: [3.5, 4.4], level: "Cao", description: "Có mục tiêu rõ ràng, duy trì được nỗ lực học tập lâu dài." },
    { range: [2.5, 3.4], level: "Trung bình", description: "Có quyết tâm nhưng đôi khi còn nản lòng trước áp lực lớn." },
    { range: [1.5, 2.4], level: "Cần cải thiện", description: "Dễ bị phân tâm bởi những điều mới mẻ, khó duy trì mục tiêu dài hạn." },
    { range: [1.0, 1.4], level: "Khởi đầu", description: "Cần xây dựng thói quen tự quản lý và đặt các mục tiêu vi mô hàng tuần." },
];

export const GRIT_CAREER_SUGGESTIONS = [
    { level: "Rất cao / Cao", environment: "Nghiên cứu khoa học, Kỹ thuật công nghệ, Y khoa, Lập trình, Chuyên gia phân tích, Khởi nghiệp", development: "Phát huy vai trò dẫn dắt dự án học tập, truyền cảm hứng cho đội ngũ." },
    { level: "Trung bình", environment: "Truyền thông sáng tạo, Marketing, Dịch vụ khách hàng, Quản lý sự kiện, Thiết kế", development: "Tập trung xây dựng bảng theo dõi mục tiêu định kỳ và tìm bạn đồng hành học tập." },
    { level: "Cần cải thiện / Khởi đầu", environment: "Các môi trường học tập linh hoạt, dự án ngắn hạn, trải nghiệm đa ngành", development: "Rèn luyện kỹ năng Pomodoro, chia nhỏ mục tiêu thành từng chặng 15-30 ngày." },
];