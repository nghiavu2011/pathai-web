import { Step, Question, WorkValueKey, Introduction } from '../types';

export const WORK_VALUES_RESULT_DETAILS: Record<WorkValueKey, { name: string; description: string }> = {
  [WorkValueKey.ACH]: { name: "Thành tựu (Achievement)", description: "Thành tựu cá nhân, kết quả cụ thể." },
  [WorkValueKey.SEC]: { name: "An toàn (Security)", description: "Ổn định, an toàn, ít rủi ro." },
  [WorkValueKey.AUT]: { name: "Tự chủ (Autonomy)", description: "Tự do, sáng tạo, linh hoạt." },
  [WorkValueKey.INF]: { name: "Ảnh hưởng (Influence)", description: "Quyền lực, tầm ảnh hưởng, lãnh đạo." },
  [WorkValueKey.ALT]: { name: "Vị tha (Altruism)", description: "Cống hiến xã hội, giúp người khác." },
  [WorkValueKey.AES]: { name: "Thẩm mỹ (Aesthetic)", description: "Thẩm mỹ, sáng tạo, giá trị tinh thần." },
};

export const WORK_VALUES_STEPS: Step[] = [
  { id: 0, title: 'Bắt đầu' },
  { id: 1, title: 'Nhóm 1' },
  { id: 2, title: 'Nhóm 2' },
  { id: 3, title: 'Nhóm 3' },
  { id: 4, title: 'Nhóm 4' },
  { id: 5, title: 'Nhóm 5' },
  { id: 6, title: 'Nhóm 6' },
  { id: 7, title: 'Đăng ký' },
  { id: 8, title: 'Kết quả' },
];

export const WORK_VALUES_INTRODUCTION: Introduction = {
  title: "Giá trị Nghề nghiệp – Work Values Inventory",
  main_description: "Một công việc lý tưởng không chỉ là công việc bạn làm giỏi, mà còn là công việc phù hợp với những giá trị mà bạn coi trọng. Bài trắc nghiệm này giúp bạn làm rõ hệ thống giá trị của mình trong công việc, từ việc mong muốn sự thành tựu, an toàn, đến cống hiến cho xã hội. Khi công việc và giá trị cá nhân song hành, bạn sẽ cảm thấy có động lực, ý nghĩa và sự viên mãn.",
  theory_details: {
    title: "Lý thuyết đằng sau: Bảng kiểm Giá trị Nghề nghiệp (Work Values Inventory)",
    content: "Dựa trên các nghiên cứu về sự hài lòng trong công việc, lý thuyết này cho rằng sự phù hợp giữa giá trị cá nhân và giá trị của tổ chức là một yếu tố quan trọng quyết định sự gắn bó và hiệu suất làm việc. Các giá trị này là những niềm tin sâu sắc định hướng hành vi và quyết định của chúng ta. Bằng cách xác định các giá trị quan trọng nhất, bạn có thể chủ động tìm kiếm những vai trò và công ty không chỉ mang lại lợi ích vật chất mà còn nuôi dưỡng tâm hồn và đáp ứng những mong muốn sâu sắc của bạn.",
    source: "Dựa trên các mô hình về Giá trị Nghề nghiệp như của Donald E. Super."
  },
  guidance: {
    before: [
      'Hãy trả lời dựa trên cảm nhận thật của bạn.',
      'Không có giá trị nào tốt hơn giá trị nào.',
      'Kết quả sẽ là “la bàn” cho các quyết định sự nghiệp của bạn.'
    ],
    during: [
      'Bạn sẽ đánh giá mức độ quan trọng của 30 yếu tố công việc.',
      'Thang điểm từ 1 (Không quan trọng) đến 5 (Rất quan trọng).',
      'Hãy chọn câu trả lời xuất hiện đầu tiên trong đầu.'
    ],
    note: "Đây là công cụ tham khảo giúp bạn nhận diện giá trị cá nhân, không thay thế cho tư vấn chuyên sâu từ chuyên gia hướng nghiệp."
  }
};

export const WORK_VALUES_RATING_OPTIONS = [1, 2, 3, 4, 5];
export const WORK_VALUES_RATING_LABELS = {
  start: 'Không quan trọng',
  end: 'Rất quan trọng'
};

interface WorkValueCategory {
    key: WorkValueKey;
    title: string;
    subtitle: string;
    questions: Question[];
}

export const WORK_VALUES_QUIZ_DATA: WorkValueCategory[] = [
    {
        key: WorkValueKey.ACH,
        title: "Nhóm 1: Thành tựu (Achievement)",
        subtitle: "Bạn coi trọng việc tạo ra kết quả cụ thể, được công nhận và vượt qua các thử thách.",
        questions: [
            { id: "WV_ACH1", work_value_code: WorkValueKey.ACH, text: "Hoàn thành một dự án khó và thấy kết quả rõ ràng." },
            { id: "WV_ACH2", work_value_code: WorkValueKey.ACH, text: "Được công nhận và khen thưởng cho những nỗ lực của mình." },
            { id: "WV_ACH3", work_value_code: WorkValueKey.ACH, text: "Cảm thấy mình đang tiến bộ và phát triển kỹ năng liên tục." },
            { id: "WV_ACH4", work_value_code: WorkValueKey.ACH, text: "Đặt ra các mục tiêu đầy thách thức và đạt được chúng." },
            { id: "WV_ACH5", work_value_code: WorkValueKey.ACH, text: "Có cơ hội để thể hiện năng lực và sự xuất sắc của bản thân." },
        ]
    },
    {
        key: WorkValueKey.SEC,
        title: "Nhóm 2: An toàn (Security)",
        subtitle: "Bạn ưu tiên sự ổn định, chắc chắn và một môi trường làm việc có thể đoán trước.",
        questions: [
            { id: "WV_SEC1", work_value_code: WorkValueKey.SEC, text: "Có một công việc với hợp đồng dài hạn và phúc lợi tốt." },
            { id: "WV_SEC2", work_value_code: WorkValueKey.SEC, text: "Biết trước những gì mình sẽ làm mỗi ngày, ít có sự thay đổi đột ngột." },
            { id: "WV_SEC3", work_value_code: WorkValueKey.SEC, text: "Làm việc trong một công ty có tài chính vững mạnh và danh tiếng tốt." },
            { id: "WV_SEC4", work_value_code: WorkValueKey.SEC, text: "Có sự hướng dẫn rõ ràng và quy trình làm việc cụ thể." },
            { id: "WV_SEC5", work_value_code: WorkValueKey.SEC, text: "Cảm thấy yên tâm về tương lai công việc của mình." },
        ]
    },
    {
        key: WorkValueKey.AUT,
        title: "Nhóm 3: Tự chủ (Autonomy)",
        subtitle: "Bạn khao khát sự tự do, linh hoạt và cơ hội để làm việc theo cách của riêng mình.",
        questions: [
            { id: "WV_AUT1", work_value_code: WorkValueKey.AUT, text: "Tự do quyết định cách thức và thời gian làm việc của mình." },
            { id: "WV_AUT2", work_value_code: WorkValueKey.AUT, text: "Được thử nghiệm những ý tưởng mới của riêng mình mà không bị gò bó." },
            { id: "WV_AUT3", work_value_code: WorkValueKey.AUT, text: "Làm việc độc lập và tự chịu trách nhiệm về kết quả." },
            { id: "WV_AUT4", work_value_code: WorkValueKey.AUT, text: "Có một lịch trình làm việc linh hoạt." },
            { id: "WV_AUT5", work_value_code: WorkValueKey.AUT, text: "Được tin tưởng để hoàn thành công việc mà không cần giám sát liên tục." },
        ]
    },
    {
        key: WorkValueKey.INF,
        title: "Nhóm 4: Ảnh hưởng (Influence)",
        subtitle: "Bạn muốn có quyền lực, dẫn dắt người khác và tạo ra tác động lớn trong tổ chức.",
        questions: [
            { id: "WV_INF1", work_value_code: WorkValueKey.INF, text: "Dẫn dắt một đội nhóm để đạt được mục tiêu chung." },
            { id: "WV_INF2", work_value_code: WorkValueKey.INF, text: "Có tiếng nói trong các quyết định quan trọng của tổ chức." },
            { id: "WV_INF3", work_value_code: WorkValueKey.INF, text: "Thuyết phục và gây ảnh hưởng đến suy nghĩ của người khác." },
            { id: "WV_INF4", work_value_code: WorkValueKey.INF, text: "Giữ một vị trí có quyền hạn và được tôn trọng." },
            { id: "WV_INF5", work_value_code: WorkValueKey.INF, text: "Kiểm soát các nguồn lực và định hướng chiến lược." },
        ]
    },
    {
        key: WorkValueKey.ALT,
        title: "Nhóm 5: Vị tha (Altruism)",
        subtitle: "Bạn được thúc đẩy bởi mong muốn giúp đỡ người khác và cống hiến cho xã hội.",
        questions: [
            { id: "WV_ALT1", work_value_code: WorkValueKey.ALT, text: "Công việc của tôi mang lại lợi ích trực tiếp cho người khác hoặc cộng đồng." },
            { id: "WV_ALT2", work_value_code: WorkValueKey.ALT, text: "Góp phần giải quyết một vấn đề xã hội hoặc môi trường quan trọng." },
            { id: "WV_ALT3", work_value_code: WorkValueKey.ALT, text: "Cảm thấy công việc của mình đang làm cho thế giới tốt đẹp hơn." },
            { id: "WV_ALT4", work_value_code: WorkValueKey.ALT, text: "Chăm sóc, tư vấn hoặc hỗ trợ những người gặp khó khăn." },
            { id: "WV_ALT5", work_value_code: WorkValueKey.ALT, text: "Làm việc vì một mục tiêu lớn hơn lợi ích cá nhân." },
        ]
    },
    {
        key: WorkValueKey.AES,
        title: "Nhóm 6: Thẩm mỹ (Aesthetic)",
        subtitle: "Bạn tìm kiếm vẻ đẹp, sự sáng tạo và những giá trị tinh thần trong công việc.",
        questions: [
            { id: "WV_AES1", work_value_code: WorkValueKey.AES, text: "Tạo ra những sản phẩm, dịch vụ đẹp và có tính thẩm mỹ cao." },
            { id: "WV_AES2", work_value_code: WorkValueKey.AES, text: "Làm việc trong một không gian truyền cảm hứng và sáng tạo." },
            { id: "WV_AES3", work_value_code: WorkValueKey.AES, text: "Có cơ hội thể hiện sự sáng tạo và trí tưởng tượng của mình." },
            { id: "WV_AES4", work_value_code: WorkValueKey.AES, text: "Tìm kiếm sự hài hòa và trật tự trong công việc." },
            { id: "WV_AES5", work_value_code: WorkValueKey.AES, text: "Công việc mang lại cho tôi cảm giác thỏa mãn về mặt tinh thần." },
        ]
    }
];