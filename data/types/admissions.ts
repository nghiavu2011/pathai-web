export type UniversityType = 'public' | 'private' | 'international';
export type Region = 'North' | 'Central' | 'South';

export interface University {
  id: string;
  code: string; // e.g. BKA, NEU, FTU, HMU
  name: string;
  nameEn?: string;
  shortName: string;
  logo?: string;
  location: string;
  region: Region;
  type: UniversityType;
  website: string;
  description: string;
}

export type AdmissionMethodType = 
  | 'thpt' // Điểm thi tốt nghiệp THPT
  | 'tsa'  // Đánh giá tư duy Bách Khoa
  | 'hsa'  // Đánh giá năng lực ĐHQGHN
  | 'dgnl_hcm' // Đánh giá năng lực ĐHQG HCM
  | 'sat'  // SAT / ACT Quốc tế
  | 'ielts_combined' // Kết hợp chứng chỉ Tiếng Anh
  | 'hocba'; // Xét tuyển học bạ

export type AdmissionRuleStatus = 
  | 'VERIFIED_CURRENT'
  | 'HISTORICAL_REFERENCE'
  | 'FUTURE_NOT_PUBLISHED'
  | 'STALE'
  | 'UNKNOWN';

export interface SubjectCombination {
  code: string; // e.g. A00, A01, D01, D07, B00
  subjects: string[]; // ['Toán', 'Vật lý', 'Hóa học']
}

export interface AdmissionRule {
  method: AdmissionMethodType;
  methodName: string;
  combinationCode?: string; // e.g. A00, A01
  minScore?: number; // Điểm sàn nộp hồ sơ
  cutoffScoreLastYear: number; // Điểm chuẩn năm gần nhất
  maxScale: number; // Thang điểm (30 for THPT, 100 for TSA, 150 for HSA, 1200 for ĐGNL HCM, 1600 for SAT)
  admissionYear?: number; // e.g. 2025/2026
  status?: AdmissionRuleStatus;
  ieltsRequirement?: {
    minOverall: number;
    convertedScoreOrBonus: string;
  };
  specialRequirement?: string;
}

export interface AdmissionProgram {
  id: string;
  universityId: string;
  facultyName: string;
  programName: string;
  programCode: string;
  careerFamilyIds: string[]; // Map to CareerFamily IDs in careerFamilies.ts
  tuitionPerYearMillionVND: number; // Học phí ước tính triệu VNĐ/năm
  rules: AdmissionRule[];
  sourceUrl: string;
  lastVerified: string;
}

export type FitCategory = 'dream' | 'target' | 'safe' | 'explore';
export type AdmissionConfidenceLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface ProgramMatchResult {
  program: AdmissionProgram;
  university: University;
  fitCategory: FitCategory;
  fitCategoryLabel: string;
  careerFitScore: number; // 0-100
  academicFitScore?: number; // 0-100 (optional if academic data missing)
  academicReadinessStatus: 'SUFFICIENT_DATA' | 'ACADEMIC_DATA_MISSING' | 'UNKNOWN';
  classificationConfidence: AdmissionConfidenceLevel;
  bestMethod: AdmissionRule;
  estimatedMargin?: number; // Điểm của học sinh - Điểm chuẩn
  referenceYearNote: string;
  reasons: string[];
}

export interface StudentScoreProfile {
  thptScores: Record<string, number>; // subjectId -> score (0-10)
  tsaScore?: number; // 0-100
  hsaScore?: number; // 0-150
  dgnlHcmScore?: number; // 0-1200
  satScore?: number; // 400-1600
  ieltsScore?: number; // 0-9.0
  gpa10?: number;
  gpa11?: number;
  gpa12?: number;
  preferredRegions?: Region[];
  maxTuitionMillionVND?: number;
}
