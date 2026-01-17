
import { Step, Question, EQCategoryKey, Introduction } from '../types';

export const EQ_STEPS: Step[] = [
  { id: 0, title: 'Bắt đầu' },
  { id: 1, title: 'Tự nhận thức' },
  { id: 2, title: 'Tự kiểm soát' },
  { id: 3, title: 'Động lực' },
  { id: 4, title: 'Đồng cảm' },
  { id: 5, title: 'Kỹ năng XH' },
  { id: 6, title: 'Đăng ký' },
  { id: 7, title: 'Kết quả' },
];

export const EQ_INTRODUCTION: Introduction = {
  title: "Trí tuệ Cảm xúc (Emotional Intelligence - EQ)",
  main_description: "IQ giúp bạn được tuyển dụng, nhưng EQ giúp bạn thăng tiến và hạnh phúc. Bài trắc nghiệm này đánh giá khả năng nhận biết, kiểm soát cảm xúc của bản thân và người khác. Một chỉ số EQ cao giúp bạn xây dựng các mối quan hệ bền vững, lãnh đạo hiệu quả và vượt qua áp lực cuộc sống một cách nhẹ nhàng.",
  theory_details: {
    title: "Cơ sở lý thuyết: Mô hình EQ của Daniel Goleman",
    content: "Daniel Goleman chia EQ thành 5 thành phần: Tự nhận thức (hiểu cảm xúc mình), Tự điều chỉnh (kiểm soát xung động), Động lực (đam mê vượt lên nghịch cảnh), Đồng cảm (hiểu người khác) và Kỹ năng xã hội (quản lý mối quan hệ). Đây là những kỹ năng cốt lõi cho sự thành công trong thế kỷ 21.",
    source: "Daniel Goleman, Emotional Intelligence, 1995."
  },
  guidance: {
    before: [
      'Hãy nhớ lại cách bạn phản ứng trong các tình huống căng thẳng gần đây.',
      'Trung thực với những điểm yếu của mình.',
    ],
    during: [
      'Bạn sẽ trả lời 25 câu hỏi.',
      'Thang điểm từ 1 (Hiếm khi) đến 5 (Luôn luôn).',
    ],
    note: "EQ là kỹ năng có thể rèn luyện và nâng cao được qua thời gian."
  }
};

export const EQ_RATING_OPTIONS = [1, 2, 3, 4, 5];
export const EQ_RATING_LABELS = {
  start: 'Hiếm khi',
  end: 'Luôn luôn'
};

interface EQCategory {
    key: EQCategoryKey;
    title: string;
    subtitle: string;
    questions: Question[];
}

export const EQ_QUIZ_DATA: EQCategory[] = [
    {
        key: EQCategoryKey.SA,
        title: "1. Tự nhận thức (Self-Awareness)",
        subtitle: "Khả năng nhận biết và hiểu rõ cảm xúc của chính mình ngay khi nó xảy ra.",
        questions: [
            { id: "EQ_SA1", eq_code: EQCategoryKey.SA, text: "Tôi biết rõ cảm xúc hiện tại của mình là gì và tại sao." },
            { id: "EQ_SA2", eq_code: EQCategoryKey.SA, text: "Tôi nhận ra cảm xúc của mình ảnh hưởng đến công việc như thế nào." },
            { id: "EQ_SA3", eq_code: EQCategoryKey.SA, text: "Tôi hiểu rõ điểm mạnh và điểm yếu của bản thân." },
            { id: "EQ_SA4", eq_code: EQCategoryKey.SA, text: "Tôi thường xuyên dành thời gian để suy ngẫm về bản thân." },
            { id: "EQ_SA5", eq_code: EQCategoryKey.SA, text: "Tôi tự tin vào giá trị và năng lực của mình." },
        ]
    },
    {
        key: EQCategoryKey.SR,
        title: "2. Tự điều chỉnh (Self-Regulation)",
        subtitle: "Khả năng kiểm soát và điều hướng các cảm xúc hoặc xung động tiêu cực.",
        questions: [
            { id: "EQ_SR1", eq_code: EQCategoryKey.SR, text: "Tôi giữ được bình tĩnh khi gặp tình huống căng thẳng." },
            { id: "EQ_SR2", eq_code: EQCategoryKey.SR, text: "Tôi suy nghĩ kỹ trước khi hành động hoặc nói năng." },
            { id: "EQ_SR3", eq_code: EQCategoryKey.SR, text: "Tôi dễ dàng thích nghi với những thay đổi bất ngờ." },
            { id: "EQ_SR4", eq_code: EQCategoryKey.SR, text: "Tôi chịu trách nhiệm về hành vi của mình, không đổ lỗi." },
            { id: "EQ_SR5", eq_code: EQCategoryKey.SR, text: "Tôi có thể kiềm chế sự tức giận hoặc thất vọng." },
        ]
    },
    {
        key: EQCategoryKey.MO,
        title: "3. Động lực (Motivation)",
        subtitle: "Niềm đam mê làm việc vì những lý do vượt lên trên tiền bạc hoặc địa vị.",
        questions: [
            { id: "EQ_MO1", eq_code: EQCategoryKey.MO, text: "Tôi luôn phấn đấu để cải thiện và đạt chuẩn mực cao hơn." },
            { id: "EQ_MO2", eq_code: EQCategoryKey.MO, text: "Tôi cam kết với các mục tiêu của nhóm/tổ chức." },
            { id: "EQ_MO3", eq_code: EQCategoryKey.MO, text: "Tôi sẵn sàng nắm bắt cơ hội khi chúng đến." },
            { id: "EQ_MO4", eq_code: EQCategoryKey.MO, text: "Tôi vẫn lạc quan ngay cả khi gặp thất bại." },
            { id: "EQ_MO5", eq_code: EQCategoryKey.MO, text: "Tôi làm việc vì đam mê và ý nghĩa hơn là phần thưởng bên ngoài." },
        ]
    },
    {
        key: EQCategoryKey.EM,
        title: "4. Đồng cảm (Empathy)",
        subtitle: "Khả năng thấu hiểu cấu trúc cảm xúc của người khác.",
        questions: [
            { id: "EQ_EM1", eq_code: EQCategoryKey.EM, text: "Tôi dễ dàng nhận ra cảm xúc của người khác qua cử chỉ, giọng nói." },
            { id: "EQ_EM2", eq_code: EQCategoryKey.EM, text: "Tôi lắng nghe người khác mà không vội phán xét." },
            { id: "EQ_EM3", eq_code: EQCategoryKey.EM, text: "Tôi quan tâm đến quan điểm và cảm nhận của người khác." },
            { id: "EQ_EM4", eq_code: EQCategoryKey.EM, text: "Tôi giỏi trong việc phát triển và bồi dưỡng tài năng của người khác." },
            { id: "EQ_EM5", eq_code: EQCategoryKey.EM, text: "Tôi hiểu và tôn trọng sự đa dạng của mọi người." },
        ]
    },
    {
        key: EQCategoryKey.SS,
        title: "5. Kỹ năng Xã hội (Social Skills)",
        subtitle: "Năng lực quản lý các mối quan hệ và xây dựng mạng lưới.",
        questions: [
            { id: "EQ_SS1", eq_code: EQCategoryKey.SS, text: "Tôi giỏi thuyết phục và gây ảnh hưởng đến người khác." },
            { id: "EQ_SS2", eq_code: EQCategoryKey.SS, text: "Tôi giao tiếp rõ ràng và hiệu quả." },
            { id: "EQ_SS3", eq_code: EQCategoryKey.SS, text: "Tôi giỏi giải quyết xung đột và bất đồng." },
            { id: "EQ_SS4", eq_code: EQCategoryKey.SS, text: "Tôi thích làm việc nhóm và hợp tác." },
            { id: "EQ_SS5", eq_code: EQCategoryKey.SS, text: "Tôi có khả năng truyền cảm hứng và dẫn dắt người khác." },
        ]
    }
];

export const EQ_DETAILS = {
    [EQCategoryKey.SA]: "Tự nhận thức",
    [EQCategoryKey.SR]: "Tự điều chỉnh",
    [EQCategoryKey.MO]: "Động lực nội tại",
    [EQCategoryKey.EM]: "Đồng cảm",
    [EQCategoryKey.SS]: "Kỹ năng xã hội"
};