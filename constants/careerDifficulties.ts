import { Step, Question, CDBBarrierKey, Introduction } from '../types';

export const CDB_RESULT_DETAILS = {
  [CDBBarrierKey.A]: { name: "Thiếu tự nhận thức" },
  [CDBBarrierKey.B]: { name: "Thiếu thông tin nghề" },
  [CDBBarrierKey.C]: { name: "Khó ra quyết định" },
  [CDBBarrierKey.D]: { name: "Ảnh hưởng bên ngoài" },
  [CDBBarrierKey.E]: { name: "Thiếu kỹ năng nghề" },
};

export const CDB_STEPS: Step[] = [
  { id: 0, title: 'Bắt đầu' },
  { id: 1, title: 'Tự nhận thức' },
  { id: 2, title: 'Thông tin' },
  { id: 3, title: 'Quyết định' },
  { id: 4, title: 'Ảnh hưởng' },
  { id: 5, title: 'Kỹ năng' },
  { id: 6, title: 'Đăng ký' },
  { id: 7, title: 'Kết quả' },
];

export const CDB_INTRODUCTION: Introduction = {
  title: "Bảng đánh giá Khó khăn Nghề nghiệp",
  main_description: "Trên hành trình sự nghiệp, ai cũng có lúc gặp phải những khó khăn, rào cản. Bài trắc nghiệm này giúp bạn xác định và gọi tên những rào cản cụ thể đang cản trở bạn, từ việc thiếu nhận thức về bản thân đến áp lực từ bên ngoài. Bằng cách hiểu rõ những khó khăn này, bạn có thể xây dựng kế hoạch hành động để vượt qua chúng một cách hiệu quả.",
  theory_details: {
    title: "Lý thuyết đằng sau: Bảng câu hỏi Khó khăn trong Quyết định nghề nghiệp (CDDQ)",
    content: "Công cụ này được phát triển dựa trên các nghiên cứu về những khó khăn phổ biến nhất mà mọi người gặp phải khi đưa ra quyết định nghề nghiệp. Nó không phải để 'chẩn đoán' vấn đề, mà là một công cụ tự phản ánh, giúp bạn hệ thống hóa những lo lắng của mình thành các nhóm cụ thể. Việc nhận diện được rào cản là bước đầu tiên và quan trọng nhất để tìm kiếm sự hỗ trợ và giải pháp phù hợp, giúp bạn tự tin hơn trong việc lựa chọn con đường của mình.",
    source: "Dựa trên mô hình của Gati, Krausz, & Osipow (1996)."
  },
  guidance: {
    before: [
      'Hãy trả lời một cách trung thực nhất.',
      'Không có câu trả lời nào là đúng hay sai.',
      'Kết quả giúp bạn xác định rào cản, không phải để phán xét.',
    ],
    during: [
      'Bạn sẽ trả lời 25 câu hỏi, chia thành 5 nhóm khó khăn.',
      'Hãy chọn mức độ đồng ý của bạn theo thang điểm từ 1 đến 5.',
      'Đừng suy nghĩ quá lâu, hãy chọn câu trả lời đầu tiên bạn nghĩ đến.'
    ],
    note: "Đây là công cụ tham khảo giúp bạn nhận diện khó khăn ban đầu, không thay thế cho tư vấn chuyên sâu từ chuyên gia hướng nghiệp."
  }
};


export const CDB_RATING_OPTIONS = [1, 2, 3, 4, 5];
export const CDB_RATING_LABELS = {
  start: 'Hoàn toàn không đúng',
  end: 'Rất đúng'
};


export interface CDBCategory {
    key: CDBBarrierKey;
    title: string;
    subtitle: string;
    questions: Question[];
}

export const CDB_QUIZ_DATA: CDBCategory[] = [
    {
        key: CDBBarrierKey.A,
        title: "Nhóm A – Thiếu tự nhận thức",
        subtitle: "Đánh giá mức độ bạn hiểu rõ về sở thích, năng lực và giá trị của bản thân.",
        questions: [
            { id: "CDB_A1", cdb_code: CDBBarrierKey.A, text: "Tôi cảm thấy không rõ điểm mạnh, điểm yếu của mình là gì." },
            { id: "CDB_A2", cdb_code: CDBBarrierKey.A, text: "Tôi không biết mình thực sự thích nghề nào." },
            { id: "CDB_A3", cdb_code: CDBBarrierKey.A, text: "Tôi thường thấy mâu thuẫn giữa điều mình muốn và điều mình giỏi." },
            { id: "CDB_A4", cdb_code: CDBBarrierKey.A, text: "Tôi không rõ điều gì khiến công việc có ý nghĩa với tôi." },
            { id: "CDB_A5", cdb_code: CDBBarrierKey.A, text: "Tôi gặp khó khi xác định mục tiêu nghề nghiệp cá nhân." },
        ]
    },
    {
        key: CDBBarrierKey.B,
        title: "Nhóm B – Thiếu thông tin nghề nghiệp",
        subtitle: "Đánh giá mức độ bạn am hiểu về thế giới nghề nghiệp và thị trường lao động.",
        questions: [
            { id: "CDB_B1", cdb_code: CDBBarrierKey.B, text: "Tôi không biết công việc cụ thể của các ngành nghề hiện nay." },
            { id: "CDB_B2", cdb_code: CDBBarrierKey.B, text: "Tôi ít hiểu về thị trường lao động và cơ hội việc làm." },
            { id: "CDB_B3", cdb_code: CDBBarrierKey.B, text: "Tôi không nắm rõ kỹ năng cần thiết cho ngành mình quan tâm." },
            { id: "CDB_B4", cdb_code: CDBBarrierKey.B, text: "Tôi thiếu thông tin về con đường phát triển nghề nghiệp." },
            { id: "CDB_B5", cdb_code: CDBBarrierKey.B, text: "Tôi thấy khó tìm nguồn thông tin nghề nghiệp đáng tin cậy." },
        ]
    },
    {
        key: CDBBarrierKey.C,
        title: "Nhóm C – Khó khăn ra quyết định",
        subtitle: "Đánh giá những rào cản tâm lý khi phải đưa ra lựa chọn nghề nghiệp.",
        questions: [
            { id: "CDB_C1", cdb_code: CDBBarrierKey.C, text: "Tôi thường lo sợ rằng mình chọn sai hướng nghề nghiệp." },
            { id: "CDB_C2", cdb_code: CDBBarrierKey.C, text: "Tôi cảm thấy căng thẳng khi phải đưa ra quyết định lớn." },
            { id: "CDB_C3", cdb_code: CDBBarrierKey.C, text: "Tôi trì hoãn việc chọn hoặc thay đổi nghề nghiệp." },
            { id: "CDB_C4", cdb_code: CDBBarrierKey.C, text: "Tôi cần nhiều sự khẳng định từ người khác trước khi quyết định." },
            { id: "CDB_C5", cdb_code: CDBBarrierKey.C, text: "Tôi sợ rằng bản thân không đủ năng lực để thành công." },
        ]
    },
    {
        key: CDBBarrierKey.D,
        title: "Nhóm D – Ảnh hưởng từ bên ngoài",
        subtitle: "Đánh giá tác động từ gia đình, xã hội đến quyết định nghề nghiệp của bạn.",
        questions: [
            { id: "CDB_D1", cdb_code: CDBBarrierKey.D, text: "Tôi chọn nghề chủ yếu theo mong muốn của người khác." },
            { id: "CDB_D2", cdb_code: CDBBarrierKey.D, text: "Gia đình hoặc người thân có ảnh hưởng lớn đến quyết định nghề của tôi." },
            { id: "CDB_D3", cdb_code: CDBBarrierKey.D, text: "Tôi sợ bị đánh giá nếu chọn nghề khác lạ." },
            { id: "CDB_D4", cdb_code: CDBBarrierKey.D, text: "Tôi cảm thấy áp lực phải đáp ứng kỳ vọng của người khác." },
            { id: "CDB_D5", cdb_code: CDBBarrierKey.D, text: "Tôi lo lắng khi nghề mình chọn không được xã hội coi trọng." },
        ]
    },
    {
        key: CDBBarrierKey.E,
        title: "Nhóm E – Thiếu kỹ năng nghề nghiệp",
        subtitle: "Đánh giá mức độ sẵn sàng của bạn về các kỹ năng tìm kiếm và phát triển sự nghiệp.",
        questions: [
            { id: "CDB_E1", cdb_code: CDBBarrierKey.E, text: "Tôi không biết cách đặt và theo dõi mục tiêu nghề nghiệp." },
            { id: "CDB_E2", cdb_code: CDBBarrierKey.E, text: "Tôi chưa biết cách xây dựng hồ sơ cá nhân (CV, portfolio)." },
            { id: "CDB_E3", cdb_code: CDBBarrierKey.E, text: "Tôi cảm thấy thiếu kỹ năng mềm như giao tiếp, thuyết trình, làm việc nhóm." },
            { id: "CDB_E4", cdb_code: CDBBarrierKey.E, text: "Tôi không biết cách kết nối hoặc tìm cơ hội nghề nghiệp phù hợp." },
            { id: "CDB_E5", cdb_code: CDBBarrierKey.E, text: "Tôi cảm thấy thiếu tự tin khi đi phỏng vấn hoặc ứng tuyển." },
        ]
    }
];

export const CDB_CLASSIFICATION = [
    { range: [20, 25], level: "Rất cao", description: "Cần can thiệp hoặc hướng dẫn chuyên sâu" },
    { range: [15, 19], level: "Cao", description: "Có rào cản đáng kể, nên được tư vấn nghề nghiệp" },
    { range: [10, 14], level: "Trung bình", description: "Có nhận thức cơ bản nhưng thiếu định hướng" },
    { range: [5, 9], level: "Thấp", description: "Nhận thức tốt, ít rào cản nghề nghiệp" },
];