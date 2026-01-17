import { Step, Question, MICategoryKey, MIResultDetail, MICategory, Introduction } from '../types';

export const MI_STEPS: Step[] = [
  { id: 0, title: 'Bắt đầu' },
  { id: 1, title: 'Ngôn ngữ' },
  { id: 2, title: 'Logic' },
  { id: 3, title: 'Không gian' },
  { id: 4, title: 'Vận động' },
  { id: 5, title: 'Âm nhạc' },
  { id: 6, title: 'Nội tâm' },
  { id: 7, title: 'Giao tiếp' },
  { id: 8, title: 'Tự nhiên' },
  { id: 9, title: 'Đăng ký' },
  { id: 10, title: 'Kết quả' },
];

export const MI_INTRODUCTION: Introduction = {
  title: 'BẢNG HỎI NHẬN DẠNG TRÍ THÔNG MINH ĐA DIỆN',
  main_description: "'Thông minh' không chỉ là điểm số ở trường. Có rất nhiều cách để một người trở nên thông minh và tài giỏi. Bài trắc nghiệm này giúp bạn khám phá 8 loại hình trí thông minh khác nhau của mình, từ ngôn ngữ, logic đến âm nhạc và vận động. Việc nhận ra thế mạnh độc đáo của bản thân sẽ mở ra những cách học tập hiệu quả và những lựa chọn nghề nghiệp mà bạn có thể chưa từng nghĩ tới.",
  theory_details: {
    title: "Lý thuyết đằng sau: Thuyết Trí thông minh Đa diện",
    content: "Được đề xuất bởi nhà tâm lý học Howard Gardner, lý thuyết này thách thức quan niệm truyền thống về một loại trí thông minh duy nhất (IQ). Gardner cho rằng con người có nhiều loại hình trí thông minh tương đối độc lập. Một người có thể không giỏi toán nhưng lại có trí thông minh âm nhạc vượt trội. Hiểu được phổ trí thông minh của mình giúp bạn tận dụng điểm mạnh tự nhiên và tìm ra môi trường để tỏa sáng, thay vì cố gắng gò ép bản thân vào một khuôn mẫu duy nhất.",
    source: "Howard Gardner, Frames of Mind: The Theory of Multiple Intelligences, 1983."
  },
  guidance: {
    before: [
      'Hãy trả lời một cách trung thực nhất.',
      'Trí thông minh có nhiều dạng, không có dạng nào vượt trội hơn dạng nào.',
      'Bài trắc nghiệm giúp khám phá tiềm năng, không phải để xếp hạng.',
    ],
    during: [
      'Bạn sẽ trả lời 40 câu hỏi, mỗi nhóm trí thông minh có 5 câu.',
      'Hãy chọn mức độ mô tả đúng về bạn nhất.',
      'Điểm số sẽ được tính trung bình cho mỗi nhóm.',
    ],
    note: 'Kết quả sẽ cho bạn thấy những trí thông minh nổi trội nhất của mình, giúp bạn định hướng nghề nghiệp và phát triển bản thân tốt hơn.'
  }
};


export const MI_RATING_OPTIONS = [1, 2, 3, 4, 5];
export const MI_RATING_LABELS = {
  start: 'Không đúng',
  end: 'Rất đúng'
};


export const MI_QUIZ_DATA: MICategory[] = [
    { 
        key: MICategoryKey.L, 
        title: "1️⃣ Ngôn ngữ (Linguistic)",
        questions: [
            { id: 'MI_L1', mi_code: MICategoryKey.L, text: 'Tôi dễ dàng diễn đạt ý tưởng bằng lời nói hoặc viết.' },
            { id: 'MI_L2', mi_code: MICategoryKey.L, text: 'Tôi thích đọc sách, viết lách hoặc kể chuyện.' },
            { id: 'MI_L3', mi_code: MICategoryKey.L, text: 'Tôi ghi nhớ tốt những gì mình đọc hoặc nghe.' },
            { id: 'MI_L4', mi_code: MICategoryKey.L, text: 'Tôi thích chơi trò chơi chữ, đố vui, hoặc sáng tác thơ.' },
            { id: 'MI_L5', mi_code: MICategoryKey.L, text: 'Tôi thường giúp người khác hiểu vấn đề bằng cách diễn đạt lại dễ hiểu hơn.' },
        ]
    },
    { 
        key: MICategoryKey.LQ, 
        title: "2️⃣ Logic – Toán học (Logical / Mathematical)",
        questions: [
            { id: 'MI_LQ1', mi_code: MICategoryKey.LQ, text: 'Tôi thích tìm ra quy luật trong các hiện tượng.' },
            { id: 'MI_LQ2', mi_code: MICategoryKey.LQ, text: 'Tôi thường giải quyết vấn đề bằng lập luận logic.' },
            { id: 'MI_LQ3', mi_code: MICategoryKey.LQ, text: 'Tôi yêu thích các con số, bảng biểu và dữ liệu.' },
            { id: 'MI_LQ4', mi_code: MICategoryKey.LQ, text: 'Tôi thích thử nghiệm, phân tích và chứng minh.' },
            { id: 'MI_LQ5', mi_code: MICategoryKey.LQ, text: 'Tôi cảm thấy thoải mái với các bài toán trừu tượng hoặc mô hình hóa.' },
        ]
    },
    { 
        key: MICategoryKey.VS, 
        title: "3️⃣ Không gian (Visual / Spatial)",
        questions: [
            { id: 'MI_VS1', mi_code: MICategoryKey.VS, text: 'Tôi dễ tưởng tượng vật thể trong không gian.' },
            { id: 'MI_VS2', mi_code: MICategoryKey.VS, text: 'Tôi thích vẽ, chụp ảnh hoặc thiết kế.' },
            { id: 'MI_VS3', mi_code: MICategoryKey.VS, text: 'Tôi dễ hình dung đường đi, bản đồ, hoặc bố cục không gian.' },
            { id: 'MI_VS4', mi_code: MICategoryKey.VS, text: 'Tôi thường tư duy bằng hình ảnh hơn là lời nói.' },
            { id: 'MI_VS5', mi_code: MICategoryKey.VS, text: 'Tôi yêu thích màu sắc, ánh sáng và bố cục.' },
        ]
    },
    { 
        key: MICategoryKey.BK, 
        title: "4️⃣ Vận động (Bodily / Kinesthetic)",
        questions: [
            { id: 'MI_BK1', mi_code: MICategoryKey.BK, text: 'Tôi học tốt nhất khi được thực hành.' },
            { id: 'MI_BK2', mi_code: MICategoryKey.BK, text: 'Tôi thích các hoạt động thể chất, thể thao, hoặc làm thủ công.' },
            { id: 'MI_BK3', mi_code: MICategoryKey.BK, text: 'Tôi dễ ghi nhớ bằng vận động (làm thử, chạm, di chuyển).' },
            { id: 'MI_BK4', mi_code: MICategoryKey.BK, text: 'Tôi thấy hứng thú khi được làm việc bằng tay.' },
            { id: 'MI_BK5', mi_code: MICategoryKey.BK, text: 'Tôi có khả năng điều khiển cơ thể nhịp nhàng và chính xác.' },
        ]
    },
    { 
        key: MICategoryKey.MU, 
        title: "5️⃣ Âm nhạc (Musical / Rhythmic)",
        questions: [
            { id: 'MI_MU1', mi_code: MICategoryKey.MU, text: 'Tôi thường nhớ bài hát và giai điệu rất nhanh.' },
            { id: 'MI_MU2', mi_code: MICategoryKey.MU, text: 'Tôi cảm nhận rõ sự khác biệt giữa các nhịp điệu và âm sắc.' },
            { id: 'MI_MU3', mi_code: MICategoryKey.MU, text: 'Tôi thích hát, chơi nhạc cụ, hoặc nghe nhạc thường xuyên.' },
            { id: 'MI_MU4', mi_code: MICategoryKey.MU, text: 'Tôi dễ nhận ra khi ai đó hát lệch tông hoặc sai nhịp.' },
            { id: 'MI_MU5', mi_code: MICategoryKey.MU, text: 'Tôi thường học hoặc làm việc hiệu quả hơn khi có nhạc nền.' },
        ]
    },
    { 
        key: MICategoryKey.IN, 
        title: "6️⃣ Nội tâm (Intrapersonal)",
        questions: [
            { id: 'MI_IN1', mi_code: MICategoryKey.IN, text: 'Tôi hiểu rõ điểm mạnh và điểm yếu của mình.' },
            { id: 'MI_IN2', mi_code: MICategoryKey.IN, text: 'Tôi có thói quen tự suy ngẫm và ghi chép cảm xúc.' },
            { id: 'MI_IN3', mi_code: MICategoryKey.IN, text: 'Tôi thích làm việc một mình để tập trung hơn.' },
            { id: 'MI_IN4', mi_code: MICategoryKey.IN, text: 'Tôi luôn có định hướng rõ về mục tiêu cá nhân.' },
            { id: 'MI_IN5', mi_code: MICategoryKey.IN, text: 'Tôi thường suy nghĩ sâu về ý nghĩa của công việc mình làm.' },
        ]
    },
    { 
        key: MICategoryKey.IG, 
        title: "7️⃣ Giao tiếp (Interpersonal)",
        questions: [
            { id: 'MI_IG1', mi_code: MICategoryKey.IG, text: 'Tôi thích làm việc nhóm và dễ kết nối với người khác.' },
            { id: 'MI_IG2', mi_code: MICategoryKey.IG, text: 'Tôi có khả năng lắng nghe và đồng cảm.' },
            { id: 'MI_IG3', mi_code: MICategoryKey.IG, text: 'Tôi dễ nhận biết cảm xúc của người khác.' },
            { id: 'MI_IG4', mi_code: MICategoryKey.IG, text: 'Tôi thường được mọi người tin tưởng chia sẻ.' },
            { id: 'MI_IG5', mi_code: MICategoryKey.IG, text: 'Tôi có khả năng thuyết phục và dẫn dắt nhóm.' },
        ]
    },
    { 
        key: MICategoryKey.NT, 
        title: "8️⃣ Tự nhiên (Naturalist)",
        questions: [
            { id: 'MI_NT1', mi_code: MICategoryKey.NT, text: 'Tôi quan tâm đến thiên nhiên, cây cối, động vật.' },
            { id: 'MI_NT2', mi_code: MICategoryKey.NT, text: 'Tôi thích các hoạt động ngoài trời, du lịch, khám phá.' },
            { id: 'MI_NT3', mi_code: MICategoryKey.NT, text: 'Tôi nhận ra nhanh sự thay đổi trong môi trường xung quanh.' },
            { id: 'MI_NT4', mi_code: MICategoryKey.NT, text: 'Tôi thích tìm hiểu các hiện tượng tự nhiên và sinh học.' },
            { id: 'MI_NT5', mi_code: MICategoryKey.NT, text: 'Tôi cảm thấy thoải mái khi sống gần thiên nhiên.' },
        ]
    },
];

// FIX: The type was incorrect, it should not expect a 'score' property as it is added at runtime.
export const MI_RESULT_DETAILS: Record<string, Omit<MIResultDetail, 'key' | 'score'>> = {
  [MICategoryKey.L]: { name: "Ngôn ngữ – Linguistic", description: "Giỏi ngôn từ, viết, nói, kể chuyện" },
  [MICategoryKey.LQ]: { name: "Logic – Logical/Mathematical", description: "Giỏi tư duy logic, phân tích, con số" },
  [MICategoryKey.VS]: { name: "Không gian – Visual/Spatial", description: "Giỏi tưởng tượng, hình ảnh, thiết kế" },
  [MICategoryKey.BK]: { name: "Vận động – Bodily/Kinesthetic", description: "Giỏi thao tác tay chân, cảm nhận cơ thể" },
  [MICategoryKey.MU]: { name: "Âm nhạc – Musical/Rhythmic", description: "Nhạy cảm với âm thanh, giai điệu, nhịp" },
  [MICategoryKey.IN]: { name: "Nội tâm – Intrapersonal", description: "Hiểu bản thân, định hướng giá trị cá nhân" },
  [MICategoryKey.IG]: { name: "Giao tiếp – Interpersonal", description: "Hiểu người khác, làm việc nhóm, giao tiếp" },
  [MICategoryKey.NT]: { name: "Tự nhiên – Naturalist", description: "Nhạy cảm với thiên nhiên, động vật, môi trường" }
};

export const MI_CAREER_SUGGESTIONS = [
    { code: 'L', intelligence: 'Ngôn ngữ (L)', strength: 'Giao tiếp, viết lách, ngôn từ', careers: 'Nhà báo, giáo viên, nhà văn, luật sư, PR' },
    { code: 'LQ', intelligence: 'Logic (LQ)', strength: 'Tư duy phân tích, dữ liệu', careers: 'Kỹ sư, lập trình, tài chính, khoa học dữ liệu' },
    { code: 'VS', intelligence: 'Không gian (VS)', strength: 'Tưởng tượng, thiết kế', careers: 'Kiến trúc sư, họa sĩ, designer, nhiếp ảnh gia' },
    { code: 'BK', intelligence: 'Vận động (BK)', strength: 'Cảm nhận cơ thể, thao tác', careers: 'Vận động viên, diễn viên, thợ thủ công, đầu bếp' },
    { code: 'MU', intelligence: 'Âm nhạc (MU)', strength: 'Cảm thụ âm thanh, nhịp điệu', careers: 'Nhạc sĩ, biên tập âm thanh, nhà sản xuất' },
    { code: 'IN', intelligence: 'Nội tâm (IN)', strength: 'Hiểu bản thân, định hướng giá trị', careers: 'Nhà tâm lý học, cố vấn, triết gia, nhà văn' },
    { code: 'IG', intelligence: 'Giao tiếp (IG)', strength: 'Đồng cảm, hợp tác', careers: 'HR, tư vấn, quản lý nhóm, đào tạo' },
    { code: 'NT', intelligence: 'Tự nhiên (NT)', strength: 'Quan sát, yêu thiên nhiên', careers: 'Nông nghiệp, môi trường, du lịch, sinh học' }
];