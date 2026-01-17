
import { Step, Question, BigFiveCategoryKey, Introduction } from '../types';

export const BIG5_STEPS: Step[] = [
  { id: 0, title: 'Bắt đầu' },
  { id: 1, title: 'Cảm xúc' },
  { id: 2, title: 'Hướng ngoại' },
  { id: 3, title: 'Cởi mở' },
  { id: 4, title: 'Hòa đồng' },
  { id: 5, title: 'Tận tâm' },
  { id: 6, title: 'Đăng ký' },
  { id: 7, title: 'Kết quả' },
];

export const BIG5_INTRODUCTION: Introduction = {
  title: "Trắc nghiệm Tính cách Big Five (OCEAN)",
  main_description: "Nếu bạn muốn hiểu bản chất con người mình một cách khoa học nhất, Big Five là câu trả lời. Không chia con người thành các 'hộp' cố định như MBTI, Big Five đo lường mức độ của bạn trên 5 phổ tính cách cốt lõi: Cởi mở, Tận tâm, Hướng ngoại, Hòa đồng và Ổn định cảm xúc. Kết quả sẽ giúp bạn hiểu tại sao mình lại phản ứng như vậy trước áp lực, công việc và các mối quan hệ.",
  theory_details: {
    title: "Cơ sở lý thuyết: Mô hình 5 Yếu tố (Five Factor Model)",
    content: "Được chấp nhận rộng rãi nhất trong giới tâm lý học hiện đại, Big Five (OCEAN) cho rằng tính cách con người được cấu thành từ 5 yếu tố chính. Các nghiên cứu cho thấy các yếu tố này có tính di truyền và khá ổn định theo thời gian, đồng thời dự báo chính xác hiệu suất làm việc, khả năng lãnh đạo và sự hài lòng trong cuộc sống.",
    source: "Costa & McCrae, 1992."
  },
  guidance: {
    before: [
      'Hãy trả lời dựa trên con người thật của bạn, không phải người bạn muốn trở thành.',
      'So sánh bản thân với người cùng trang lứa/giới tính để có cái nhìn khách quan.',
    ],
    during: [
      'Bạn sẽ trả lời 25 câu hỏi.',
      'Thang điểm từ 1 (Rất không đúng) đến 5 (Rất đúng).',
    ],
    note: "Không có tính cách nào là 'tốt' hay 'xấu'. Mỗi đặc điểm đều có ưu và nhược điểm riêng trong từng hoàn cảnh."
  }
};

export const BIG5_RATING_OPTIONS = [1, 2, 3, 4, 5];
export const BIG5_RATING_LABELS = {
  start: 'Rất không đúng',
  end: 'Rất đúng'
};

interface BigFiveCategory {
    key: BigFiveCategoryKey;
    title: string;
    subtitle: string;
    questions: Question[];
}

export const BIG5_QUIZ_DATA: BigFiveCategory[] = [
    {
        key: BigFiveCategoryKey.N,
        title: "Ổn định Cảm xúc (Neuroticism)",
        subtitle: "Đo lường mức độ nhạy cảm với các cảm xúc tiêu cực như lo âu, buồn bã.",
        questions: [
            { id: "B5_N1", big_five_code: BigFiveCategoryKey.N, text: "Tôi thường xuyên lo lắng về những điều nhỏ nhặt." },
            { id: "B5_N2", big_five_code: BigFiveCategoryKey.N, text: "Tôi dễ cảm thấy buồn bã hoặc chán nản." },
            { id: "B5_N3", big_five_code: BigFiveCategoryKey.N, text: "Tâm trạng của tôi thay đổi thất thường." },
            { id: "B5_N4", big_five_code: BigFiveCategoryKey.N, text: "Tôi dễ bị căng thẳng (stress) khi gặp áp lực." },
            { id: "B5_N5", big_five_code: BigFiveCategoryKey.N, text: "Tôi hay để bụng và suy nghĩ nhiều về những lời phê bình." },
        ]
    },
    {
        key: BigFiveCategoryKey.E,
        title: "Hướng ngoại (Extraversion)",
        subtitle: "Đo lường mức độ năng lượng, sự nhiệt tình và nhu cầu giao tiếp xã hội.",
        questions: [
            { id: "B5_E1", big_five_code: BigFiveCategoryKey.E, text: "Tôi là người chủ động bắt chuyện trong các buổi gặp gỡ." },
            { id: "B5_E2", big_five_code: BigFiveCategoryKey.E, text: "Tôi cảm thấy tràn đầy năng lượng khi ở bên nhiều người." },
            { id: "B5_E3", big_five_code: BigFiveCategoryKey.E, text: "Tôi thích là trung tâm của sự chú ý." },
            { id: "B5_E4", big_five_code: BigFiveCategoryKey.E, text: "Tôi nói nhiều và thích thể hiện quan điểm." },
            { id: "B5_E5", big_five_code: BigFiveCategoryKey.E, text: "Tôi thích cuộc sống sôi động, nhiều hoạt động." },
        ]
    },
    {
        key: BigFiveCategoryKey.O,
        title: "Sẵn sàng Trải nghiệm (Openness)",
        subtitle: "Đo lường trí tưởng tượng, sự tò mò và cởi mở với những điều mới mẻ.",
        questions: [
            { id: "B5_O1", big_five_code: BigFiveCategoryKey.O, text: "Tôi có trí tưởng tượng phong phú và hay mơ mộng." },
            { id: "B5_O2", big_five_code: BigFiveCategoryKey.O, text: "Tôi thích tìm hiểu về các ý tưởng trừu tượng, triết học." },
            { id: "B5_O3", big_five_code: BigFiveCategoryKey.O, text: "Tôi thích thử những món ăn mới, đi đến những nơi mới." },
            { id: "B5_O4", big_five_code: BigFiveCategoryKey.O, text: "Tôi quan tâm đến nghệ thuật, âm nhạc hoặc văn học." },
            { id: "B5_O5", big_five_code: BigFiveCategoryKey.O, text: "Tôi thích suy nghĩ vượt ra khỏi khuôn khổ thông thường." },
        ]
    },
    {
        key: BigFiveCategoryKey.A,
        title: "Hòa đồng (Agreeableness)",
        subtitle: "Đo lường lòng trắc ẩn, sự tin tưởng và thái độ hợp tác với người khác.",
        questions: [
            { id: "B5_A1", big_five_code: BigFiveCategoryKey.A, text: "Tôi quan tâm và đồng cảm với cảm xúc của người khác." },
            { id: "B5_A2", big_five_code: BigFiveCategoryKey.A, text: "Tôi sẵn sàng giúp đỡ mọi người khi họ cần." },
            { id: "B5_A3", big_five_code: BigFiveCategoryKey.A, text: "Tôi hiếm khi tranh cãi gay gắt hay xúc phạm người khác." },
            { id: "B5_A4", big_five_code: BigFiveCategoryKey.A, text: "Tôi tin rằng hầu hết mọi người đều có ý tốt." },
            { id: "B5_A5", big_five_code: BigFiveCategoryKey.A, text: "Tôi thích sự hòa hợp hơn là cạnh tranh." },
        ]
    },
    {
        key: BigFiveCategoryKey.C,
        title: "Tận tâm (Conscientiousness)",
        subtitle: "Đo lường tính kỷ luật, tổ chức và định hướng mục tiêu.",
        questions: [
            { id: "B5_C1", big_five_code: BigFiveCategoryKey.C, text: "Tôi luôn chuẩn bị kỹ lưỡng trước khi làm việc gì đó." },
            { id: "B5_C2", big_five_code: BigFiveCategoryKey.C, text: "Tôi chú ý đến các chi tiết nhỏ." },
            { id: "B5_C3", big_five_code: BigFiveCategoryKey.C, text: "Tôi làm việc theo kế hoạch và lịch trình cụ thể." },
            { id: "B5_C4", big_five_code: BigFiveCategoryKey.C, text: "Tôi luôn hoàn thành công việc đúng hạn." },
            { id: "B5_C5", big_five_code: BigFiveCategoryKey.C, text: "Tôi thích sự ngăn nắp và trật tự." },
        ]
    }
];

export const BIG5_DETAILS = {
    [BigFiveCategoryKey.O]: { name: "Sẵn sàng Trải nghiệm (Openness)", desc: "Sáng tạo, tò mò, thích cái mới." },
    [BigFiveCategoryKey.C]: { name: "Tận tâm (Conscientiousness)", desc: "Kỷ luật, trách nhiệm, ngăn nắp." },
    [BigFiveCategoryKey.E]: { name: "Hướng ngoại (Extraversion)", desc: "Năng động, thích giao tiếp, nhiệt tình." },
    [BigFiveCategoryKey.A]: { name: "Hòa đồng (Agreeableness)", desc: "Thân thiện, hợp tác, vị tha." },
    [BigFiveCategoryKey.N]: { name: "Bất ổn Cảm xúc (Neuroticism)", desc: "Nhạy cảm, hay lo âu, dễ stress." }
};
