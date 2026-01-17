import { Step, Question, GrowthMindsetCategoryKey, Introduction } from '../types';

export const GMS_STEPS: Step[] = [
  { id: 0, title: 'Bắt đầu' },
  { id: 1, title: 'Niềm tin' },
  { id: 2, title: 'Thái độ' },
  { id: 3, title: 'Kiên trì' },
  { id: 4, title: 'Linh hoạt' },
  { id: 5, title: 'Đăng ký' },
  { id: 6, title: 'Kết quả' },
];

export const GMS_INTRODUCTION: Introduction = {
  title: 'Thang đo Tư duy Phát triển (Growth Mindset)',
  main_description: "Bạn tin rằng tài năng là bẩm sinh hay có thể rèn luyện? Câu trả lời của bạn phản ánh tư duy của bạn. Bài đánh giá này giúp bạn khám phá xem mình đang nghiêng về 'Tư duy Cố định' (Fixed Mindset) hay 'Tư duy Phát triển' (Growth Mindset). Nhận thức được điều này là bước đầu tiên để mở khóa tiềm năng học hỏi vô hạn và khả năng phục hồi sau thất bại.",
  theory_details: {
    title: "Lý thuyết đằng sau: Tư duy Phát triển",
    content: "Được nghiên cứu bởi nhà tâm lý học Carol S. Dweck, lý thuyết này chỉ ra rằng niềm tin của chúng ta về khả năng của bản thân có ảnh hưởng sâu sắc đến thành công. Người có Tư duy Phát triển tin rằng họ có thể giỏi hơn thông qua nỗ lực và học hỏi. Họ xem thử thách là cơ hội, không ngại thất bại và luôn tìm cách cải thiện. Ngược lại, người có Tư duy Cố định tin rằng năng lực là không đổi. Trong thế giới việc làm luôn biến động, sở hữu một Tư duy Phát triển là một lợi thế cạnh tranh cực kỳ lớn.",
    source: "Carol S. Dweck, Mindset: The New Psychology of Success, 2006."
  },
  guidance: {
    before: [
      'Dành thời gian suy ngẫm về từng câu hỏi.',
      'Hãy trả lời một cách trung thực nhất về bản thân.',
      'Tư duy là thứ có thể rèn luyện, kết quả này là điểm khởi đầu.'
    ],
    during: [
      'Bạn sẽ trả lời 20 câu hỏi, chia thành 4 nhóm.',
      'Chọn mức độ đồng ý từ 1 (Hoàn toàn không đồng ý) đến 5 (Hoàn toàn đồng ý).',
      'Không có câu trả lời nào là "đúng" hay "sai".'
    ],
    note: 'Kết quả sẽ giúp bạn dự báo khả năng thích ứng, học hỏi và đề xuất lộ trình phát triển cá nhân hóa.'
  }
};


export const GMS_RATING_OPTIONS = [1, 2, 3, 4, 5];
export const GMS_RATING_LABELS = {
  start: 'Hoàn toàn không đồng ý',
  end: 'Hoàn toàn đồng ý'
};


export interface GMSCategory {
    key: GrowthMindsetCategoryKey;
    title: string;
    subtitle: string;
    questions: Question[];
}

export const GMS_QUIZ_DATA: GMSCategory[] = [
    {
        key: GrowthMindsetCategoryKey.CH,
        title: "Niềm tin về khả năng thay đổi (Belief in Changeability)",
        subtitle: "Đánh giá niềm tin của bạn vào việc năng lực và trí thông minh có thể phát triển.",
        questions: [
            { id: "GMS_CH1", gms_code: GrowthMindsetCategoryKey.CH, text: "Tôi tin rằng năng lực của con người có thể phát triển qua thời gian." },
            { id: "GMS_CH2", gms_code: GrowthMindsetCategoryKey.CH, text: "Tôi nghĩ rằng ai cũng có thể tiến bộ nếu họ cố gắng đủ." },
            { id: "GMS_CH3", gms_code: GrowthMindsetCategoryKey.CH, text: "Tôi tin rằng thất bại là cơ hội để học hỏi và cải thiện." },
            { id: "GMS_CH4", gms_code: GrowthMindsetCategoryKey.CH, text: "Tôi tin rằng sự luyện tập có thể giúp tôi giỏi hơn trong bất kỳ kỹ năng nào." },
            { id: "GMS_CH5", gms_code: GrowthMindsetCategoryKey.CH, text: "Tôi tin rằng trí thông minh không phải là yếu tố cố định." },
        ]
    },
    {
        key: GrowthMindsetCategoryKey.FB,
        title: "Thái độ với sai lầm và phản hồi (Response to Failure & Feedback)",
        subtitle: "Đánh giá cách bạn đối mặt với thử thách, sai lầm và những góp ý từ người khác.",
        questions: [
            { id: "GMS_FB1", gms_code: GrowthMindsetCategoryKey.FB, text: "Tôi thường xem phản hồi tiêu cực là cơ hội để tốt hơn." },
            { id: "GMS_FB2", gms_code: GrowthMindsetCategoryKey.FB, text: "Tôi sẵn sàng nhận góp ý để hoàn thiện bản thân." },
            { id: "GMS_FB3", gms_code: GrowthMindsetCategoryKey.FB, text: "Tôi không nản lòng khi người khác giỏi hơn mình." },
            { id: "GMS_FB4", gms_code: GrowthMindsetCategoryKey.FB, text: "Khi gặp thất bại, tôi cố gắng hiểu nguyên nhân để cải thiện." },
            { id: "GMS_FB5", gms_code: GrowthMindsetCategoryKey.FB, text: "Tôi thường tìm cách biến lỗi sai thành bài học." },
        ]
    },
    {
        key: GrowthMindsetCategoryKey.PL,
        title: "Tính kiên trì trong học hỏi (Persistence in Learning)",
        subtitle: "Đánh giá sự bền bỉ của bạn khi đối mặt với khó khăn trong quá trình học tập và làm việc.",
        questions: [
            { id: "GMS_PL1", gms_code: GrowthMindsetCategoryKey.PL, text: "Tôi sẵn sàng học lại khi thấy mình chưa hiểu rõ vấn đề." },
            { id: "GMS_PL2", gms_code: GrowthMindsetCategoryKey.PL, text: "Tôi không bỏ cuộc khi gặp khó trong việc học hoặc làm việc." },
            { id: "GMS_PL3", gms_code: GrowthMindsetCategoryKey.PL, text: "Tôi chủ động tìm nguồn học khác khi phương pháp hiện tại không hiệu quả." },
            { id: "GMS_PL4", gms_code: GrowthMindsetCategoryKey.PL, text: "Tôi tin rằng kết quả tốt đến từ nỗ lực bền bỉ, không phải may mắn." },
            { id: "GMS_PL5", gms_code: GrowthMindsetCategoryKey.PL, text: "Tôi thích thử thách bản thân bằng kỹ năng mới." },
        ]
    },
    {
        key: GrowthMindsetCategoryKey.AD,
        title: "Tư duy linh hoạt & thích nghi (Adaptability & Openness)",
        subtitle: "Đánh giá mức độ cởi mở của bạn với những ý tưởng mới và khả năng thích ứng với sự thay đổi.",
        questions: [
            { id: "GMS_AD1", gms_code: GrowthMindsetCategoryKey.AD, text: "Tôi cởi mở với những cách làm mới, dù khác với thói quen cũ." },
            { id: "GMS_AD2", gms_code: GrowthMindsetCategoryKey.AD, text: "Tôi dễ dàng thích ứng khi môi trường làm việc thay đổi." },
            { id: "GMS_AD3", gms_code: GrowthMindsetCategoryKey.AD, text: "Tôi tin rằng mỗi thay đổi đều ẩn chứa cơ hội phát triển." },
            { id: "GMS_AD4", gms_code: GrowthMindsetCategoryKey.AD, text: "Tôi thường tò mò tìm hiểu lĩnh vực mới ngoài chuyên môn." },
            { id: "GMS_AD5", gms_code: GrowthMindsetCategoryKey.AD, text: "Tôi cảm thấy hứng thú khi học điều mới dù ban đầu khó hiểu." },
        ]
    }
];

export const GMS_CLASSIFICATION = [
    { range: [4.5, 5.0], level: "Rất cao", description: "Luôn học hỏi, cởi mở, thích nghi xuất sắc" },
    { range: [3.5, 4.4], level: "Cao", description: "Sẵn sàng học, tiếp nhận phản hồi tích cực" },
    { range: [2.5, 3.4], level: "Trung bình", description: "Biết học hỏi nhưng còn e ngại thay đổi" },
    { range: [1.5, 2.4], level: "Thấp", description: "Dễ nản, sợ sai, ít tiếp thu phản hồi" },
    { range: [1.0, 1.4], level: "Rất thấp", description: "Tư duy cố định, ngại thử thách hoặc đổi mới" },
];

export const GMS_RESULT_DETAILS = {
  [GrowthMindsetCategoryKey.CH]: { name: "Niềm tin về khả năng thay đổi" },
  [GrowthMindsetCategoryKey.FB]: { name: "Thái độ với sai lầm & phản hồi" },
  [GrowthMindsetCategoryKey.PL]: { name: "Tính kiên trì trong học hỏi" },
  [GrowthMindsetCategoryKey.AD]: { name: "Tư duy linh hoạt & thích nghi" },
};