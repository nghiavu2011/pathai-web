import { Step, Question, CareerAnchorKey, Introduction } from '../types';

export const CAREER_ANCHORS_DETAILS: Record<CareerAnchorKey, { name: string; description: string }> = {
  [CareerAnchorKey.TF]: { name: "Năng lực Kỹ thuật/Chuyên môn", description: "Giỏi chuyên môn, yêu nghề nghiệp kỹ thuật." },
  [CareerAnchorKey.GM]: { name: "Năng lực Quản lý chung", description: "Thích lãnh đạo, điều phối, ra quyết định." },
  [CareerAnchorKey.AU]: { name: "Sự Tự chủ/Độc lập", description: "Muốn tự chủ, làm việc độc lập." },
  [CareerAnchorKey.SE]: { name: "Sự An toàn/Ổn định", description: "Cần ổn định, lâu dài, ít rủi ro." },
  [CareerAnchorKey.EC]: { name: "Sự Sáng tạo/Khởi nghiệp", description: "Thích sáng tạo, khởi nghiệp, tạo mới." },
  [CareerAnchorKey.SV]: { name: "Sự Phục vụ/Cống hiến", description: "Muốn giúp người khác, cống hiến xã hội." },
  [CareerAnchorKey.PC]: { name: "Sự Thử thách thuần túy", description: "Thích cạnh tranh, vượt giới hạn bản thân." },
  [CareerAnchorKey.LS]: { name: "Phong cách sống", description: "Muốn cân bằng giữa công việc – cuộc sống." },
};


export const CAREER_ANCHORS_STEPS: Step[] = [
  { id: 0, title: 'Bắt đầu' },
  { id: 1, title: 'Phần 1' },
  { id: 2, title: 'Phần 2' },
  { id: 3, title: 'Phần 3' },
  { id: 4, title: 'Phần 4' },
  { id: 5, title: 'Phần 5' },
  { id: 6, title: 'Phần 6' },
  { id: 7, title: 'Phần 7' },
  { id: 8, title: 'Phần 8' },
  { id: 9, title: 'Đăng ký' },
  { id: 10, title: 'Kết quả' },
];

export const CAREER_ANCHORS_INTRODUCTION: Introduction = {
  title: "Bảng Nhu cầu Nghề nghiệp – Career Anchors (Schein)",
  main_description: "Điều gì thực sự giữ chân bạn trong một công việc? Lương cao, sự ổn định, hay cơ hội sáng tạo? Bài trắc nghiệm này giúp bạn khám phá ra 'Mỏ neo Nghề nghiệp' của mình – đó là những giá trị, nhu cầu và động cơ cốt lõi mà bạn sẽ không muốn từ bỏ. Hiểu rõ 'mỏ neo' của mình giống như có một chiếc la bàn nội tâm, giúp bạn đưa ra những quyết định sự nghiệp đúng đắn và tìm thấy sự thỏa mãn thực sự.",
  theory_details: {
    title: "Lý thuyết đằng sau: Mỏ neo Nghề nghiệp (Career Anchors)",
    content: "Được phát triển bởi Edgar Schein, lý thuyết này cho rằng khi chúng ta tích lũy kinh nghiệm làm việc, mỗi người sẽ hình thành một nhận thức rõ ràng về tài năng, động cơ và giá trị của mình. Tổ hợp này hoạt động như một 'mỏ neo' giữ chúng ta ổn định và định hướng các lựa chọn nghề nghiệp. Khi một công việc phù hợp với mỏ neo của bạn, bạn sẽ cảm thấy hài lòng và gắn bó. Ngược lại, bạn sẽ cảm thấy bồn chồn và muốn tìm kiếm một 'bến đỗ' mới.",
    source: "Edgar H. Schein, Career Anchors: The Changing Nature of Careers, 2013."
  },
  guidance: {
    before: [
      'Hãy trả lời một cách trung thực nhất.',
      'Không có câu trả lời nào là đúng hay sai.',
      'Kết quả giúp bạn khám phá động cơ sâu thẳm của mình.',
    ],
    during: [
      'Bạn sẽ trả lời 40 câu hỏi, chia thành 8 nhóm động cơ.',
      'Hãy chọn mức độ quan trọng của mỗi yếu tố đối với bạn.',
      'Tổng điểm mỗi nhóm sẽ cho thấy mức độ “neo” của bạn.'
    ],
    note: "Đây là công cụ tham khảo giúp bạn nhận diện động cơ nghề nghiệp, không thay thế cho tư vấn chuyên sâu từ chuyên gia hướng nghiệp."
  }
};

export const CAREER_ANCHORS_RATING_OPTIONS = [1, 2, 3, 4, 5];
export const CAREER_ANCHORS_RATING_LABELS = {
  start: 'Không quan trọng',
  end: 'Rất quan trọng'
};


interface CareerAnchorCategory {
    key: CareerAnchorKey;
    title: string;
    questions: Question[];
}

export const CAREER_ANCHORS_QUIZ_DATA: CareerAnchorCategory[] = [
    {
        key: CareerAnchorKey.TF, title: "Nhóm 1/8", questions: [
            { id: "CA_TF1", anchor_code: CareerAnchorKey.TF, text: "Xây dựng kỹ năng chuyên môn của tôi đến mức độ chuyên gia." },
            { id: "CA_TF2", anchor_code: CareerAnchorKey.TF, text: "Có cơ hội sử dụng kiến thức và tài năng đặc biệt của mình." },
            { id: "CA_TF3", anchor_code: CareerAnchorKey.TF, text: "Trở thành một người có năng lực cao trong lĩnh vực của tôi." },
            { id: "CA_TF4", anchor_code: CareerAnchorKey.TF, text: "Được làm việc trong lĩnh vực chuyên môn của mình." },
            { id: "CA_TF5", anchor_code: CareerAnchorKey.TF, text: "Được công nhận về năng lực chuyên môn của mình." },
        ]
    },
    {
        key: CareerAnchorKey.GM, title: "Nhóm 2/8", questions: [
            { id: "CA_GM1", anchor_code: CareerAnchorKey.GM, text: "Trở thành người quản lý ở một cấp độ cao." },
            { id: "CA_GM2", anchor_code: CareerAnchorKey.GM, text: "Có cơ hội lãnh đạo và chịu trách nhiệm cho một tổ chức." },
            { id: "CA_GM3", anchor_code: CareerAnchorKey.GM, text: "Tối đa hóa thu nhập của tôi." },
            { id: "CA_GM4", anchor_code: CareerAnchorKey.GM, text: "Có thể giám sát và tích hợp nỗ lực của người khác." },
            { id: "CA_GM5", anchor_code: CareerAnchorKey.GM, text: "Chịu trách nhiệm cho đầu ra của một tổ chức." },
        ]
    },
    {
        key: CareerAnchorKey.AU, title: "Nhóm 3/8", questions: [
            { id: "CA_AU1", anchor_code: CareerAnchorKey.AU, text: "Có một công việc cho phép tôi làm theo cách của mình." },
            { id: "CA_AU2", anchor_code: CareerAnchorKey.AU, text: "Tự do khỏi các quy tắc và ràng buộc của tổ chức." },
            { id: "CA_AU3", anchor_code: CareerAnchorKey.AU, text: "Có thể tự quyết định về lịch trình và quy trình làm việc." },
            { id: "CA_AU4", anchor_code: CareerAnchorKey.AU, text: "Có một công việc nơi tôi không bị ràng buộc bởi người khác." },
            { id: "CA_AU5", anchor_code: CareerAnchorKey.AU, text: "Theo đuổi sự nghiệp theo tốc độ của riêng tôi." },
        ]
    },
    {
        key: CareerAnchorKey.SE, title: "Nhóm 4/8", questions: [
            { id: "CA_SE1", anchor_code: CareerAnchorKey.SE, text: "Có một công việc ổn định và an toàn." },
            { id: "CA_SE2", anchor_code: CareerAnchorKey.SE, text: "Ở lại một nơi thay vì di chuyển nhiều." },
            { id: "CA_SE3", anchor_code: CareerAnchorKey.SE, text: "Có một công việc với tương lai chắc chắn." },
            { id: "CA_SE4", anchor_code: CareerAnchorKey.SE, text: "Được hưởng các lợi ích và phúc lợi tốt." },
            { id: "CA_SE5", anchor_code: CareerAnchorKey.SE, text: "Làm việc cho một công ty sẽ giữ chân tôi." },
        ]
    },
    {
        key: CareerAnchorKey.EC, title: "Nhóm 5/8", questions: [
            { id: "CA_EC1", anchor_code: CareerAnchorKey.EC, text: "Xây dựng một doanh nghiệp của riêng tôi." },
            { id: "CA_EC2", anchor_code: CareerAnchorKey.EC, text: "Có thể tạo ra hoặc xây dựng một cái gì đó là của riêng tôi." },
            { id: "CA_EC3", anchor_code: CareerAnchorKey.EC, text: "Có cơ hội tạo ra sản phẩm hoặc dịch vụ của riêng tôi." },
            { id: "CA_EC4", anchor_code: CareerAnchorKey.EC, text: "Có một sự nghiệp cho phép tôi sáng tạo và đổi mới." },
            { id: "CA_EC5", anchor_code: CareerAnchorKey.EC, text: "Biến một ý tưởng kinh doanh thành hiện thực." },
        ]
    },
    {
        key: CareerAnchorKey.SV, title: "Nhóm 6/8", questions: [
            { id: "CA_SV1", anchor_code: CareerAnchorKey.SV, text: "Sử dụng kỹ năng của tôi để phục vụ người khác." },
            { id: "CA_SV2", anchor_code: CareerAnchorKey.SV, text: "Làm cho thế giới trở thành một nơi tốt đẹp hơn." },
            { id: "CA_SV3", anchor_code: CareerAnchorKey.SV, text: "Có cơ hội giúp đỡ người khác." },
            { id: "CA_SV4", anchor_code: CareerAnchorKey.SV, text: "Làm công việc có ý nghĩa cho xã hội." },
            { id: "CA_SV5", anchor_code: CareerAnchorKey.SV, text: "Phục vụ một mục đích quan trọng." },
        ]
    },
    {
        key: CareerAnchorKey.PC, title: "Nhóm 7/8", questions: [
            { id: "CA_PC1", anchor_code: CareerAnchorKey.PC, text: "Vượt qua những thử thách rất khó khăn." },
            { id: "CA_PC2", anchor_code: CareerAnchorKey.PC, text: "Cạnh tranh và chiến thắng người khác." },
            { id: "CA_PC3", anchor_code: CareerAnchorKey.PC, text: "Giải quyết những vấn đề dường như không thể giải quyết." },
            { id: "CA_PC4", anchor_code: CareerAnchorKey.PC, text: "Có một công việc đòi hỏi tôi phải căng hết khả năng của mình." },
            { id: "CA_PC5", anchor_code: CareerAnchorKey.PC, text: "Chiến thắng những đối thủ khó nhằn." },
        ]
    },
    {
        key: CareerAnchorKey.LS, title: "Nhóm 8/8", questions: [
            { id: "CA_LS1", anchor_code: CareerAnchorKey.LS, text: "Có một công việc cho phép tôi cân bằng cuộc sống cá nhân và công việc." },
            { id: "CA_LS2", anchor_code: CareerAnchorKey.LS, text: "Có thời gian cho gia đình của tôi." },
            { id: "CA_LS3", anchor_code: CareerAnchorKey.LS, text: "Tránh làm việc vào cuối tuần hoặc buổi tối." },
            { id: "CA_LS4", anchor_code: CareerAnchorKey.LS, text: "Có thể dành thời gian cho sở thích của tôi." },
            { id: "CA_LS5", anchor_code: CareerAnchorKey.LS, text: "Tích hợp nhu cầu cá nhân, gia đình và sự nghiệp." },
        ]
    }
];