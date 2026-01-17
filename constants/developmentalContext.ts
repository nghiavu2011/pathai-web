import { Step, Question, ContextCategoryKey, Introduction } from '../types';

export const CONTEXT_RESULT_DETAILS = {
  [ContextCategoryKey.ATT]: { name: "Chỉ số Gắn bó (Attachment)" },
  [ContextCategoryKey.AUT]: { name: "Tự chủ & Niềm tin (Autonomy & Trust)" },
  [ContextCategoryKey.ENV]: { name: "Ổn định Môi trường (Stability)" },
  [ContextCategoryKey.HLT]: { name: "Sức khỏe Nền tảng (Foundational Health)" },
};

export const CONTEXT_STEPS: Step[] = [
  { id: 0, title: 'Bắt đầu' },
  { id: 1, title: 'Gắn bó' },
  { id: 2, title: 'Tự chủ' },
  { id: 3, title: 'Ổn định' },
  { id: 4, title: 'Sức khỏe' },
  { id: 5, title: 'Đăng ký' },
  { id: 6, title: 'Kết quả' },
];

export const CONTEXT_INTRODUCTION: Introduction = {
  title: "Hồ sơ Nền tảng (Developmental Context Profile)",
  main_description: "Cách chúng ta làm việc thường phản chiếu cách chúng ta được yêu thương và nuôi dạy. Hồ sơ Nền tảng giúp bạn khám phá 'đứa trẻ bên trong' và những yếu tố tâm lý gốc rễ—từ phong cách gắn bó đến mức độ tự chủ—đang âm thầm điều khiển sự tự tin, khả năng chịu đựng rủi ro và cách bạn tương tác với đồng nghiệp.",
  theory_details: {
    title: "Cơ sở lý thuyết: Thuyết Gắn bó & Phát triển Tâm lý Xã hội",
    content: "Dựa trên Thuyết Gắn bó (John Bowlby) và Mô hình Phát triển của Erik Erikson. Kết quả sẽ cho thấy Mô hình Hoạt động Nội tâm (Internal Working Model) của bạn: Người có gắn bó An toàn thường tự tin và quản lý stress tốt; Gắn bó Lo âu có thể nhạy cảm với sự phê bình; Gắn bó Né tránh có xu hướng làm việc độc lập cực đoan. Hiểu điều này giúp bạn chọn môi trường làm việc 'chữa lành' và phù hợp.",
    source: "Tổng hợp từ Bowlby, Ainsworth & Erikson."
  },
  guidance: {
    before: [
      'Đây là bài trắc nghiệm tâm lý sâu sắc, hãy tìm không gian yên tĩnh.',
      'Các câu hỏi liên quan đến quá khứ và cảm xúc, hãy thả lỏng.',
      'Không có đúng sai, mọi cảm xúc đều được chấp nhận.'
    ],
    during: [
      'Bạn sẽ trả lời 25 câu hỏi về các mối quan hệ và môi trường lớn lên.',
      'Chọn mức độ từ 1 (Không đúng) đến 5 (Rất đúng).',
      'Hãy trả lời dựa trên cảm nhận trực giác đầu tiên.'
    ],
    note: "Kết quả nhằm mục đích thấu hiểu bản thân để phát triển sự nghiệp, không phải chẩn đoán tâm lý lâm sàng."
  }
};

export const CONTEXT_RATING_OPTIONS = [1, 2, 3, 4, 5];
export const CONTEXT_RATING_LABELS = {
  start: 'Hoàn toàn không đúng',
  end: 'Rất đúng'
};

interface ContextCategory {
    key: ContextCategoryKey;
    title: string;
    subtitle: string;
    questions: Question[];
}

export const CONTEXT_QUIZ_DATA: ContextCategory[] = [
    {
        key: ContextCategoryKey.ATT,
        title: "Phần 1: Mối quan hệ & Gắn bó (Attachment)",
        subtitle: "Khám phá cảm giác an toàn và cách bạn kết nối với những người quan trọng.",
        questions: [
            { id: "CTX_ATT1", context_code: ContextCategoryKey.ATT, text: "Khi gặp khó khăn, tôi cảm thấy thoải mái khi tìm kiếm sự giúp đỡ từ người thân/bạn bè." },
            { id: "CTX_ATT2", context_code: ContextCategoryKey.ATT, text: "Tôi tin rằng mình xứng đáng được yêu thương và hỗ trợ." },
            { id: "CTX_ATT3", context_code: ContextCategoryKey.ATT, text: "Tôi hiếm khi lo lắng về việc bị người khác bỏ rơi hoặc phớt lờ." },
            { id: "CTX_ATT4", context_code: ContextCategoryKey.ATT, text: "Tôi cảm thấy dễ dàng khi chia sẻ cảm xúc thật của mình với người khác." },
            { id: "CTX_ATT5", context_code: ContextCategoryKey.ATT, text: "Tôi không cảm thấy ngột ngạt khi ai đó muốn quá gần gũi với mình." },
            { id: "CTX_ATT6", context_code: ContextCategoryKey.ATT, text: "Tôi tin tưởng vào thiện chí của người khác cho đến khi có bằng chứng ngược lại." },
            { id: "CTX_ATT7", context_code: ContextCategoryKey.ATT, text: "Trong các mối quan hệ, tôi cảm thấy an toàn và bình đẳng." },
        ]
    },
    {
        key: ContextCategoryKey.AUT,
        title: "Phần 2: Tự chủ & Niềm tin (Autonomy & Trust)",
        subtitle: "Đánh giá mức độ tự tin vào bản thân và sự khuyến khích từ môi trường nuôi dạy.",
        questions: [
            { id: "CTX_AUT1", context_code: ContextCategoryKey.AUT, text: "Khi còn nhỏ, tôi được khuyến khích tự do khám phá và thử những điều mới." },
            { id: "CTX_AUT2", context_code: ContextCategoryKey.AUT, text: "Tôi cảm thấy ý kiến của mình được lắng nghe và tôn trọng trong gia đình." },
            { id: "CTX_AUT3", context_code: ContextCategoryKey.AUT, text: "Tôi không bị trừng phạt nặng nề khi mắc sai lầm mà được hướng dẫn để sửa chữa." },
            { id: "CTX_AUT4", context_code: ContextCategoryKey.AUT, text: "Tôi tin vào khả năng tự đưa ra quyết định đúng đắn của mình." },
            { id: "CTX_AUT5", context_code: ContextCategoryKey.AUT, text: "Tôi cảm thấy mình có quyền kiểm soát cuộc sống của chính mình." },
            { id: "CTX_AUT6", context_code: ContextCategoryKey.AUT, text: "Tôi được phép thể hiện cá tính riêng mà không bị ép buộc phải giống người khác." },
        ]
    },
    {
        key: ContextCategoryKey.ENV,
        title: "Phần 3: Ổn định Môi trường (Stability)",
        subtitle: "Đánh giá sự ổn định về nơi ở, tài chính và cảm xúc trong quá khứ.",
        questions: [
            { id: "CTX_ENV1", context_code: ContextCategoryKey.ENV, text: "Gia đình tôi có sự ổn định về mặt tài chính trong suốt thời thơ ấu." },
            { id: "CTX_ENV2", context_code: ContextCategoryKey.ENV, text: "Tôi ít phải chuyển nhà hoặc chuyển trường liên tục." },
            { id: "CTX_ENV3", context_code: ContextCategoryKey.ENV, text: "Môi trường gia đình tôi thường yên bình, ít xung đột lớn." },
            { id: "CTX_ENV4", context_code: ContextCategoryKey.ENV, text: "Tôi luôn có một không gian riêng tư và an toàn để học tập/nghỉ ngơi." },
            { id: "CTX_ENV5", context_code: ContextCategoryKey.ENV, text: "Các quy tắc trong gia đình tôi rõ ràng và nhất quán." },
        ]
    },
    {
        key: ContextCategoryKey.HLT,
        title: "Phần 4: Sức khỏe Nền tảng (Foundational Health)",
        subtitle: "Đánh giá các yếu tố sức khỏe và sự kiện ảnh hưởng dài hạn.",
        questions: [
            { id: "CTX_HLT1", context_code: ContextCategoryKey.HLT, text: "Tôi có sức khỏe thể chất tốt và ít gặp vấn đề bệnh lý mãn tính." },
            { id: "CTX_HLT2", context_code: ContextCategoryKey.HLT, text: "Tôi ngủ ngon và cảm thấy tràn đầy năng lượng vào buổi sáng." },
            { id: "CTX_HLT3", context_code: ContextCategoryKey.HLT, text: "Tôi hiếm khi trải qua những sự kiện gây sốc tâm lý lớn trước tuổi 18." },
            { id: "CTX_HLT4", context_code: ContextCategoryKey.HLT, text: "Tôi biết cách tự chăm sóc bản thân khi căng thẳng hoặc mệt mỏi." },
            { id: "CTX_HLT5", context_code: ContextCategoryKey.HLT, text: "Tôi cảm thấy tinh thần mình vững vàng và lạc quan." },
        ]
    }
];

export const ATTACHMENT_STYLES = {
  SECURE: {
    label: "Gắn bó An toàn (Secure)",
    description: "Bạn có nền tảng tâm lý vững chắc, tin tưởng vào bản thân và người khác. Trong công việc, bạn tự tin, quản lý stress tốt, dễ dàng hợp tác và không ngại tìm kiếm sự hỗ trợ khi cần."
  },
  ANXIOUS: {
    label: "Gắn bó Lo âu (Anxious/Preoccupied)",
    description: "Bạn có thể nhạy cảm với sự từ chối hoặc phê bình. Trong công việc, bạn khao khát sự công nhận, làm việc chăm chỉ để làm hài lòng người khác nhưng dễ bị kiệt sức (burnout) do lo lắng quá mức."
  },
  AVOIDANT: {
    label: "Gắn bó Né tránh (Dismissive/Avoidant)",
    description: "Bạn đề cao sự độc lập và tự chủ, thường giữ khoảng cách cảm xúc. Trong công việc, bạn xuất sắc khi làm việc một mình nhưng có thể gặp khó khăn trong việc tin tưởng giao việc hoặc làm việc nhóm sâu sắc."
  }
};