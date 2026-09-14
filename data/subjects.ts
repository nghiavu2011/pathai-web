export interface Subject {
  id: string;
  name: string;
  type: 'core' | 'elective';
  group?: string; // e.g., 'KHTN' (Khoa học Tự nhiên), 'KHXH' (Khoa học Xã hội)
}

export const THPT_SUBJECTS: Subject[] = [
  // Core (bắt buộc)
  { id: 'toan', name: 'Toán', type: 'core' },
  { id: 'van', name: 'Ngữ văn', type: 'core' },
  { id: 'anh', name: 'Tiếng Anh', type: 'core' },
  // KHTN group
  { id: 'ly', name: 'Vật lý', type: 'elective', group: 'KHTN' },
  { id: 'hoa', name: 'Hóa học', type: 'elective', group: 'KHTN' },
  { id: 'sinh', name: 'Sinh học', type: 'elective', group: 'KHTN' },
  // KHXH group
  { id: 'su', name: 'Lịch sử', type: 'elective', group: 'KHXH' },
  { id: 'dia', name: 'Địa lý', type: 'elective', group: 'KHXH' },
  { id: 'gdcd', name: 'GDCD', type: 'elective', group: 'KHXH' },
  // Others
  { id: 'tin', name: 'Tin học', type: 'elective' },
  { id: 'congnghe', name: 'Công nghệ', type: 'elective' },
];

export const SUBJECT_NAME_TO_ID: Record<string, string> = {
  'Toán': 'toan',
  'Lý': 'ly',
  'Vật lý': 'ly',
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
  'GDCD': 'gdcd',
  'Giáo dục Công dân': 'gdcd',
  'Tin học': 'tin',
  'Tiếng Anh': 'anh',
  'Công nghệ': 'congnghe',
};
