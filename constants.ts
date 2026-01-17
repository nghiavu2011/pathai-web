
import { Quiz, QuizCategory, ResultDetail, CategoryKey, Step, Introduction } from './types';

// Generic Components Lazy Load
import React from 'react';
const HollandResultsDisplay = React.lazy(() => import('./components/holland/HollandResultsDisplay'));
const CDIResultsDisplay = React.lazy(() => import('./components/career-difficulties/CDIResultsDisplay'));
const GritResultsDisplay = React.lazy(() => import('./components/grit-scale/GritResultsDisplay'));
const MIResultsDisplay = React.lazy(() => import('./components/multiple-intelligences/MIResultsDisplay'));
const CRSResultsDisplay = React.lazy(() => import('./components/development-scale/CDEDResultsDisplay'));
const GMSResultsDisplay = React.lazy(() => import('./components/growth-mindset/GMSResultsDisplay'));
const CareerAnchorsResultsDisplay = React.lazy(() => import('./components/career-anchors/CareerAnchorsResultsDisplay'));
const WorkValuesResultsDisplay = React.lazy(() => import('./components/work-values/WorkValuesResultsDisplay'));
const ContextResultsDisplay = React.lazy(() => import('./components/developmental-context/ContextResultsDisplay'));
const WheelOfLifeResultsDisplay = React.lazy(() => import('./components/wheel-of-life/WheelOfLifeResultsDisplay'));
const BigFiveResultsDisplay = React.lazy(() => import('./components/big-five/BigFiveResultsDisplay'));
const EQResultsDisplay = React.lazy(() => import('./components/eq/EQResultsDisplay'));

export const AVAILABLE_QUIZZES: Quiz[] = [
  {
    id: 'holland',
    title: 'Trắc nghiệm Sở thích Holland (RIASEC)',
    description: 'Khám phá 6 nhóm sở thích nghề giúp bạn hiểu rõ môi trường làm việc phù hợp.',
    isAvailable: true,
    component: HollandResultsDisplay,
  },
  {
    id: 'mi',
    title: 'Trí thông minh Đa diện (MI)',
    description: 'Nhận diện 8 loại hình trí thông minh để khám phá tiềm năng và thế mạnh độc đáo của bạn.',
    isAvailable: true,
    component: MIResultsDisplay,
  },
  {
    id: 'big-five',
    title: 'Trắc nghiệm Tính cách Big Five (OCEAN)',
    description: 'Hiểu sâu về 5 đặc điểm tính cách cốt lõi ảnh hưởng đến hành vi và công việc.',
    isAvailable: true,
    component: BigFiveResultsDisplay,
  },
  {
    id: 'eq',
    title: 'Trí tuệ Cảm xúc (EQ)',
    description: 'Đánh giá 5 khía cạnh: Tự nhận thức, Tự điều chỉnh, Động lực, Đồng cảm và Kỹ năng xã hội.',
    isAvailable: true,
    component: EQResultsDisplay,
  },
  {
    id: 'wheel',
    title: 'Bánh xe Cuộc đời (Wheel of Life)',
    description: 'Đánh giá mức độ cân bằng và hài lòng trên 8 khía cạnh quan trọng của cuộc sống.',
    isAvailable: true,
    component: WheelOfLifeResultsDisplay,
  },
  {
    id: 'context',
    title: 'Hồ sơ Nền tảng (Context Profile)',
    description: 'Khám phá phong cách gắn bó và nền tảng tâm lý ảnh hưởng đến sự nghiệp.',
    isAvailable: true,
    component: ContextResultsDisplay,
  },
  {
    id: 'grit',
    title: 'Thang đo Bền chí (Grit Scale)',
    description: 'Đánh giá sự kiên trì và đam mê, hai yếu tố cốt lõi quyết định thành công lâu dài.',
    isAvailable: true,
    component: GritResultsDisplay,
  },
  {
    id: 'cdb',
    title: 'Các Rào cản Nghề nghiệp (CDB)',
    description: 'Xác định những khó khăn đang cản trở bạn để tìm ra hướng giải quyết phù hợp.',
    isAvailable: true,
    component: CDIResultsDisplay,
  },
  {
    id: 'schein',
    title: 'Mỏ neo Nghề nghiệp (Schein)',
    description: 'Hiểu rõ 8 động cơ cốt lõi làm nền tảng cho các quyết định sự nghiệp của bạn.',
    isAvailable: true,
    component: CareerAnchorsResultsDisplay,
  },
  {
    id: 'work-values',
    title: 'Giá trị Nghề nghiệp (Work Values)',
    description: 'Xác định giá trị và môi trường làm việc giúp bạn cảm thấy công việc có ý nghĩa.',
    isAvailable: true,
    component: WorkValuesResultsDisplay,
  },
  {
    id: 'crs',
    title: 'Mức độ Sẵn sàng Nghề nghiệp (CRS)',
    description: 'Đo lường mức độ sẵn sàng của bạn để bước vào và phát triển trong thế giới công việc.',
    isAvailable: true,
    component: CRSResultsDisplay,
  },
  {
    id: 'gms',
    title: 'Tư duy Phát triển (Growth Mindset)',
    description: 'Khám phá niềm tin của bạn vào khả năng phát triển bản thân và học hỏi không ngừng.',
    isAvailable: true,
    component: GMSResultsDisplay,
  },
];


// --- HOLLAND (RIASEC) QUIZ CONSTANTS ---

export const STEPS: Step[] = [
  { id: 0, title: 'Bắt đầu' },
  { id: 1, title: 'Nhóm R' },
  { id: 2, title: 'Nhóm I' },
  { id: 3, title: 'Nhóm A' },
  { id: 4, title: 'Nhóm S' },
  { id: 5, title: 'Nhóm E' },
  { id: 6, title: 'Nhóm C' },
  { id: 7, title: 'Đăng ký' },
  { id: 8, title: 'Kết quả' },
];

export const HOLLAND_INTRODUCTION: Introduction = {
  title: "Trắc nghiệm Sở thích Holland (RIASEC)",
  main_description: "Bài trắc nghiệm này giúp bạn khám phá những sở thích và hoạt động khiến bạn hứng thú nhất. Bằng cách hiểu rõ sở thích của mình, bạn có thể tìm ra những ngành học, nghề nghiệp và môi trường làm việc không chỉ phù hợp với năng lực mà còn mang lại sự hài lòng và động lực lâu dài.",
  theory_details: {
    title: "Lý thuyết đằng sau: Mô hình Holland (RIASEC)",
    content: "Được phát triển bởi nhà tâm lý học John Holland, mô hình này cho rằng sự hài lòng trong công việc và xu hướng gắn bó với một nghề nghiệp phụ thuộc vào mức độ phù hợp giữa tính cách của một người và môi trường làm việc. Lý thuyết này phân loại con người và môi trường nghề nghiệp thành 6 nhóm chính: Thực tế (Realistic), Nghiên cứu (Investigative), Nghệ thuật (Artistic), Xã hội (Social), Quản lý (Enterprising), và Nghiệp vụ (Conventional). Kết quả của bạn sẽ là một 'Mật mã Holland' gồm 3 chữ cái, đại diện cho 3 nhóm nổi bật nhất, giúp bạn thu hẹp lựa chọn và khám phá các con đường sự nghiệp tiềm năng.",
    source: "John L. Holland, The Career Interests Game, 1985."
  },
  guidance: {
    before: [
      'Hãy ở trong một không gian yên tĩnh, tập trung.',
      'Dành khoảng 15-20 phút để hoàn thành.',
      'Trả lời một cách trung thực nhất với bản thân.',
    ],
    during: [
      'Bạn sẽ đánh giá mức độ yêu thích 30 hoạt động.',
      'Chọn câu trả lời xuất hiện đầu tiên trong đầu.',
      'Không có câu trả lời nào là "đúng" hay "sai".',
    ],
    note: "Kết quả này là một điểm khởi đầu giá trị cho hành trình khám phá bản thân, không thay thế cho việc tư vấn chuyên sâu cùng chuyên gia."
  }
};


export const RATING_OPTIONS = [1, 2, 3, 4, 5];
export const RATING_LABELS = {
  start: 'Rất không thích',
  end: 'Rất thích'
}


export const QUIZ_DATA: QuizCategory[] = [
  {
    key: CategoryKey.R,
    title: 'Nhóm R - Realistic (Thực tế)',
    subtitle: 'Những người thuộc nhóm này có sở thích và khả năng làm những công việc đòi hỏi sự khéo léo của tay chân, sử dụng máy móc, công cụ.',
    questions: [
      { id: 'R1', text: 'Sửa chữa đồ đạc, máy móc trong nhà', category_code: CategoryKey.R },
      { id: 'R2', text: 'Chơi hoặc sửa chữa các loại nhạc cụ', category_code: CategoryKey.R },
      { id: 'R3', text: 'Lắp ráp mô hình hoặc các vật thể 3D', category_code: CategoryKey.R },
      { id: 'R4', text: 'Làm các công việc thủ công (đan, mộc, v.v.)', category_code: CategoryKey.R },
      { id: 'R5', text: 'Tham gia các hoạt động thể thao, dã ngoại', category_code: CategoryKey.R },
    ],
  },
  {
    key: CategoryKey.I,
    title: 'Nhóm I - Investigative (Nghiên cứu)',
    subtitle: 'Những người thuộc nhóm này có sở thích và khả năng quan sát, tìm tòi, khám phá, phân tích và giải quyết vấn đề.',
    questions: [
      { id: 'I1', text: 'Đọc sách hoặc xem tài liệu về khoa học', category_code: CategoryKey.I },
      { id: 'I2', text: 'Làm các thí nghiệm khoa học', category_code: CategoryKey.I },
      { id: 'I3', text: 'Giải các bài toán logic hoặc các câu đố', category_code: CategoryKey.I },
      { id: 'I4', text: 'Tìm hiểu về cách hoạt động của sự vật', category_code: CategoryKey.I },
      { id: 'I5', text: 'Phân tích dữ liệu hoặc thông tin', category_code: CategoryKey.I },
    ],
  },
  {
    key: CategoryKey.A,
    title: 'Nhóm A - Artistic (Nghệ thuật)',
    subtitle: 'Những người thuộc nhóm này có sở thích và khả năng về nghệ thuật, óc sáng tạo, trí tưởng tượng và thích làm việc trong môi trường tự do.',
    questions: [
        { id: 'A1', text: 'Vẽ, sơn, hoặc điêu khắc', category_code: CategoryKey.A },
        { id: 'A2', text: 'Thiết kế quần áo, đồ họa, hoặc trang trí nội thất', category_code: CategoryKey.A },
        { id: 'A3', text: 'Viết truyện, làm thơ, hoặc sáng tác nhạc', category_code: CategoryKey.A },
        { id: 'A4', text: 'Chụp ảnh hoặc quay phim', category_code: CategoryKey.A },
        { id: 'A5', text: 'Tham gia diễn kịch hoặc múa hát', category_code: CategoryKey.A },
    ]
  },
  {
      key: CategoryKey.S,
      title: 'Nhóm S - Social (Xã hội)',
      subtitle: 'Những người thuộc nhóm này có sở thích và khả năng làm việc, giao tiếp với con người, giúp đỡ, giảng dạy hoặc cung cấp dịch vụ.',
      questions: [
          { id: 'S1', text: 'Dạy hoặc hướng dẫn người khác', category_code: CategoryKey.S },
          { id: 'S2', text: 'Giúp đỡ bạn bè hoặc người thân giải quyết vấn đề', category_code: CategoryKey.S },
          { id: 'S3', text: 'Tổ chức các hoạt động nhóm, sự kiện', category_code: CategoryKey.S },
          { id: 'S4', text: 'Lắng nghe và trò chuyện với mọi người', category_code: CategoryKey.S },
          { id: 'S5', text: 'Tham gia các hoạt động tình nguyện, cộng đồng', category_code: CategoryKey.S },
      ]
  },
  {
      key: CategoryKey.E,
      title: 'Nhóm E - Enterprising (Quản lý/Kinh doanh)',
      subtitle: 'Những người thuộc nhóm này có sở thích và khả năng lãnh đạo, kinh doanh, gây ảnh hưởng, thuyết phục và quản lý.',
      questions: [
          { id: 'E1', text: 'Thuyết trình hoặc phát biểu trước đám đông', category_code: CategoryKey.E },
          { id: 'E2', text: 'Bán một sản phẩm hoặc ý tưởng cho người khác', category_code: CategoryKey.E },
          { id: 'E3', text: 'Lãnh đạo một nhóm hoặc dự án', category_code: CategoryKey.E },
          { id: 'E4', text: 'Lập kế hoạch kinh doanh hoặc tài chính', category_code: CategoryKey.E },
          { id: 'E5', text: 'Thương lượng, đàm phán với người khác', category_code: CategoryKey.E },
      ]
  },
  {
      key: CategoryKey.C,
      title: 'Nhóm C - Conventional (Nghiệp vụ)',
      subtitle: 'Những người thuộc nhóm này có sở thích và khả năng làm việc với dữ liệu, con số, theo hướng dẫn, quy trình có sẵn.',
      questions: [
          { id: 'C1', text: 'Sắp xếp, phân loại tài liệu hoặc dữ liệu', category_code: CategoryKey.C },
          { id: 'C2', text: 'Làm việc với các con số, bảng tính', category_code: CategoryKey.C },
          { id: 'C3', text: 'Làm theo các hướng dẫn, quy trình chi tiết', category_code: CategoryKey.C },
          { id: 'C4', text: 'Kiểm tra lỗi hoặc đảm bảo chất lượng công việc', category_code: CategoryKey.C },
          { id: 'C5', text: 'Lập kế hoạch chi tiết cho một công việc', category_code: CategoryKey.C },
      ]
  }
];

export const RESULT_DETAILS: Record<CategoryKey, Omit<ResultDetail, 'key'>> = {
  [CategoryKey.R]: {
    name: 'Realistic (Thực tế)',
    description: 'Bạn là người thực tế, thích làm việc với máy móc, công cụ và có khả năng vận động tốt.',
    careers: [{ name: 'Kỹ sư cơ khí' }, { name: 'Phi công' }, { name: 'Đầu bếp' }, { name: 'Vận động viên' }],
  },
  [CategoryKey.I]: {
    name: 'Investigative (Nghiên cứu)',
    description: 'Bạn có tư duy logic, thích quan sát, phân tích và giải quyết các vấn đề phức tạp.',
    careers: [{ name: 'Nhà khoa học' }, { name: 'Bác sĩ' }, { name: 'Lập trình viên' }, { name: 'Nhà phân tích dữ liệu' }],
  },
  [CategoryKey.A]: {
    name: 'Artistic (Nghệ thuật)',
    description: 'Bạn có óc sáng tạo, trí tưởng tượng phong phú và khả năng thể hiện bản thân qua các hình thức nghệ thuật.',
    careers: [{ name: 'Họa sĩ' }, { name: 'Nhà thiết kế đồ họa' }, { name: 'Nhạc sĩ' }, { name: 'Diễn viên' }],
  },
  [CategoryKey.S]: {
    name: 'Social (Xã hội)',
    description: 'Bạn thích làm việc với con người, có khả năng lắng nghe, thấu hiểu và giúp đỡ người khác.',
    careers: [{ name: 'Giáo viên' }, { name: 'Chuyên viên tư vấn' }, { name: 'Nhân viên công tác xã hội' }, { name: 'Y tá' }],
  },
  [CategoryKey.E]: {
    name: 'Enterprising (Quản lý)',
    description: 'Bạn có khả năng lãnh đạo, kinh doanh, thích gây ảnh hưởng và thuyết phục người khác.',
    careers: [{ name: 'Doanh nhân' }, { name: 'Nhà quản lý' }, { name: 'Luật sư' }, { name: 'Chuyên viên marketing' }],
  },
  [CategoryKey.C]: {
    name: 'Conventional (Nghiệp vụ)',
    description: 'Bạn là người cẩn thận, có óc tổ chức, thích làm việc với dữ liệu và theo các quy trình rõ ràng.',
    careers: [{ name: 'Kế toán' }, { name: 'Thư ký' }, { name: 'Chuyên viên phân tích tài chính' }, { name: 'Thủ thư' }],
  },
};