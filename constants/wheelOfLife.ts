
import { Step, Question, WheelCategoryKey, Introduction } from '../types';

export const WHEEL_STEPS: Step[] = [
  { id: 0, title: 'Bắt đầu' },
  { id: 1, title: 'Sự nghiệp & Tài chính' },
  { id: 2, title: 'Sức khỏe & Gia đình' },
  { id: 3, title: 'Mối quan hệ & Cảm xúc' },
  { id: 4, title: 'Phát triển & Tâm linh' },
  { id: 5, title: 'Đăng ký' },
  { id: 6, title: 'Kết quả' },
];

export const WHEEL_INTRODUCTION: Introduction = {
  title: "Bánh xe Cuộc đời (Wheel of Life)",
  main_description: "Cuộc sống giống như một chiếc xe, muốn chạy bon bon trên đường đời thì các bánh xe cần phải tròn trịa và cân bằng. Bài đánh giá này giúp bạn nhìn lại 8 khía cạnh quan trọng nhất của cuộc sống: từ sự nghiệp, tài chính đến sức khỏe, gia đình và tâm linh. Kết quả sẽ cho bạn thấy bức tranh toàn cảnh về mức độ hài lòng hiện tại và điểm nào cần được 'bơm hơi' thêm.",
  theory_details: {
    title: "Cơ sở lý thuyết: Wellness Wheel / Life Balance",
    content: "Mô hình Bánh xe Cuộc đời là công cụ khai vấn (coaching) kinh điển, giúp cá nhân tự đánh giá mức độ hài lòng trong các lĩnh vực khác nhau. Mục tiêu không phải là đạt điểm 10 ở mọi mặt, mà là tìm ra sự cân bằng phù hợp với giai đoạn hiện tại của bạn. Sự mất cân bằng kéo dài (ví dụ: quá tập trung sự nghiệp mà bỏ bê sức khỏe) sẽ dẫn đến căng thẳng và giảm chất lượng sống.",
    source: "Paul J. Meyer, Leadership Management International, 1960s."
  },
  guidance: {
    before: [
      'Hãy hít thở sâu và nhìn lại cuộc sống của bạn trong 3 tháng qua.',
      'Đánh giá dựa trên mức độ HÀI LÒNG của bạn, không phải thành tích.',
      'Trung thực với cảm xúc của chính mình.'
    ],
    during: [
      'Bạn sẽ trả lời 24 câu hỏi thuộc 8 khía cạnh.',
      'Thang điểm từ 1 (Rất không hài lòng) đến 5 (Rất hài lòng/Tuyệt vời).',
    ],
    note: "Kết quả là một biểu đồ Radar giúp bạn nhận diện ngay lập tức vùng trũng cần cải thiện."
  }
};

export const WHEEL_RATING_OPTIONS = [1, 2, 3, 4, 5];
export const WHEEL_RATING_LABELS = {
  start: 'Rất thất vọng',
  end: 'Rất hài lòng'
};

interface WheelCategory {
    key: string;
    title: string;
    questions: Question[];
}

export const WHEEL_QUIZ_DATA: WheelCategory[] = [
    {
        key: "GROUP_1",
        title: "Sự nghiệp & Tài chính",
        questions: [
            { id: "W_CAR1", wheel_code: WheelCategoryKey.CAREER, text: "Tôi cảm thấy công việc hiện tại có ý nghĩa và phù hợp với năng lực." },
            { id: "W_CAR2", wheel_code: WheelCategoryKey.CAREER, text: "Tôi có định hướng và cơ hội phát triển rõ ràng trong sự nghiệp." },
            { id: "W_CAR3", wheel_code: WheelCategoryKey.CAREER, text: "Tôi hài lòng với hiệu suất và thành tựu công việc của mình." },
            { id: "W_FIN1", wheel_code: WheelCategoryKey.FINANCE, text: "Tôi có nguồn thu nhập đủ để đáp ứng các nhu cầu cơ bản và sở thích." },
            { id: "W_FIN2", wheel_code: WheelCategoryKey.FINANCE, text: "Tôi có khoản tiết kiệm dự phòng cho các tình huống khẩn cấp." },
            { id: "W_FIN3", wheel_code: WheelCategoryKey.FINANCE, text: "Tôi cảm thấy kiểm soát tốt tình hình tài chính cá nhân." },
        ]
    },
    {
        key: "GROUP_2",
        title: "Sức khỏe & Gia đình",
        questions: [
            { id: "W_HEA1", wheel_code: WheelCategoryKey.HEALTH, text: "Tôi thường xuyên tập thể dục và ăn uống lành mạnh." },
            { id: "W_HEA2", wheel_code: WheelCategoryKey.HEALTH, text: "Tôi cảm thấy tràn đầy năng lượng và ít khi bị ốm vặt." },
            { id: "W_HEA3", wheel_code: WheelCategoryKey.HEALTH, text: "Tôi hài lòng với vóc dáng và sức khỏe thể chất của mình." },
            { id: "W_FAM1", wheel_code: WheelCategoryKey.FAMILY, text: "Tôi dành đủ thời gian chất lượng cho gia đình/người thân." },
            { id: "W_FAM2", wheel_code: WheelCategoryKey.FAMILY, text: "Tôi cảm thấy được yêu thương và hỗ trợ từ gia đình." },
            { id: "W_FAM3", wheel_code: WheelCategoryKey.FAMILY, text: "Gia đình là nơi tôi có thể chia sẻ mọi vui buồn." },
        ]
    },
    {
        key: "GROUP_3",
        title: "Mối quan hệ & Giải trí",
        questions: [
            { id: "W_REL1", wheel_code: WheelCategoryKey.RELATIONSHIP, text: "Tôi có những người bạn thân thiết để chia sẻ và tin tưởng." },
            { id: "W_REL2", wheel_code: WheelCategoryKey.RELATIONSHIP, text: "Tôi thường xuyên kết nối và duy trì các mối quan hệ xã hội tích cực." },
            { id: "W_REL3", wheel_code: WheelCategoryKey.RELATIONSHIP, text: "Tôi cảm thấy hài lòng với đời sống tình cảm/lứa đôi của mình." },
            { id: "W_FUN1", wheel_code: WheelCategoryKey.FUN, text: "Tôi thường xuyên dành thời gian cho các sở thích cá nhân và giải trí." },
            { id: "W_FUN2", wheel_code: WheelCategoryKey.FUN, text: "Tôi biết cách tận hưởng cuộc sống và cười đùa vui vẻ." },
            { id: "W_FUN3", wheel_code: WheelCategoryKey.FUN, text: "Tôi cảm thấy cuộc sống của mình thú vị và nhiều màu sắc." },
        ]
    },
    {
        key: "GROUP_4",
        title: "Phát triển bản thân & Tâm linh",
        questions: [
            { id: "W_GRO1", wheel_code: WheelCategoryKey.GROWTH, text: "Tôi liên tục học hỏi những điều mới và phát triển kỹ năng." },
            { id: "W_GRO2", wheel_code: WheelCategoryKey.GROWTH, text: "Tôi chủ động tìm kiếm các thử thách để hoàn thiện bản thân." },
            { id: "W_GRO3", wheel_code: WheelCategoryKey.GROWTH, text: "Tôi cảm thấy mình đang trở thành phiên bản tốt hơn mỗi ngày." },
            { id: "W_SPI1", wheel_code: WheelCategoryKey.SPIRIT, text: "Tôi dành thời gian để tĩnh tâm, suy ngẫm hoặc thiền định." },
            { id: "W_SPI2", wheel_code: WheelCategoryKey.SPIRIT, text: "Tôi sống đúng với các giá trị đạo đức và niềm tin của mình." },
            { id: "W_SPI3", wheel_code: WheelCategoryKey.SPIRIT, text: "Tôi cảm thấy nội tâm bình an và có ý nghĩa sống." },
        ]
    }
];

export const WHEEL_LABELS: Record<WheelCategoryKey, string> = {
  [WheelCategoryKey.CAREER]: "Sự nghiệp",
  [WheelCategoryKey.FINANCE]: "Tài chính",
  [WheelCategoryKey.HEALTH]: "Sức khỏe",
  [WheelCategoryKey.FAMILY]: "Gia đình",
  [WheelCategoryKey.RELATIONSHIP]: "Mối quan hệ",
  [WheelCategoryKey.GROWTH]: "Phát triển",
  [WheelCategoryKey.FUN]: "Giải trí",
  [WheelCategoryKey.SPIRIT]: "Tâm linh",
};
