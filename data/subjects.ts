export interface Subject {
  id: string;
  name: string;
  type: 'core' | 'elective';
  group?: string; // 'Bắt buộc' | 'KHTN' | 'KHXH' | 'Công nghệ & Nghệ thuật'
}

export const THPT_SUBJECTS: Subject[] = [
  // 4 Môn học Bắt buộc (Chương trình GDPT 2018 theo TT 13/2022/TT-BGDĐT)
  { id: 'toan', name: 'Toán', type: 'core', group: 'Bắt buộc' },
  { id: 'van', name: 'Ngữ văn', type: 'core', group: 'Bắt buộc' },
  { id: 'anh', name: 'Ngoại ngữ 1 (Tiếng Anh)', type: 'core', group: 'Bắt buộc' },
  { id: 'su', name: 'Lịch sử', type: 'core', group: 'Bắt buộc' },

  // Môn học Lựa chọn (Học sinh chọn 4 môn từ các nhóm bên dưới)
  // Nhóm Khoa học Tự nhiên
  { id: 'ly', name: 'Vật lí', type: 'elective', group: 'KHTN' },
  { id: 'hoa', name: 'Hóa học', type: 'elective', group: 'KHTN' },
  { id: 'sinh', name: 'Sinh học', type: 'elective', group: 'KHTN' },

  // Nhóm Khoa học Xã hội
  { id: 'dia', name: 'Địa lí', type: 'elective', group: 'KHXH' },
  { id: 'ktpl', name: 'Giáo dục Kinh tế và Pháp luật (GDKT&PL)', type: 'elective', group: 'KHXH' },

  // Nhóm Công nghệ và Nghệ thuật
  { id: 'tin', name: 'Tin học', type: 'elective', group: 'Công nghệ & Nghệ thuật' },
  { id: 'congnghe', name: 'Công nghệ', type: 'elective', group: 'Công nghệ & Nghệ thuật' },
  { id: 'amnhac', name: 'Âm nhạc', type: 'elective', group: 'Công nghệ & Nghệ thuật' },
  { id: 'mithuat', name: 'Mĩ thuật', type: 'elective', group: 'Công nghệ & Nghệ thuật' },
];

export const SUBJECT_NAME_TO_ID: Record<string, string> = {
  'Toán': 'toan',
  'Lý': 'ly',
  'Vật lý': 'ly',
  'Vật lí': 'ly',
  'Hóa': 'hoa',
  'Hóa học': 'hoa',
  'Sinh': 'sinh',
  'Sinh học': 'sinh',
  'Văn': 'van',
  'Ngữ văn': 'van',
  'Sử': 'su',
  'Lịch sử': 'su',
  'Địa': 'dia',
  'Địa lý': 'dia',
  'Địa lí': 'dia',
  'GDCD': 'ktpl',
  'Giáo dục Công dân': 'ktpl',
  'KTPL': 'ktpl',
  'Giáo dục Kinh tế và Pháp luật': 'ktpl',
  'Giáo dục kinh tế và pháp luật': 'ktpl',
  'Tin học': 'tin',
  'Tin': 'tin',
  'Tiếng Anh': 'anh',
  'Ngoại ngữ 1': 'anh',
  'Ngoại ngữ 1 (Tiếng Anh)': 'anh',
  'Công nghệ': 'congnghe',
  'Âm nhạc': 'amnhac',
  'Mĩ thuật': 'mithuat',
  'Mỹ thuật': 'mithuat',
};
