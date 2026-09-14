// Student Passport — The living profile that evolves over time

export type Grade = 9 | 10 | 11 | 12;
export type GradePhase = 'discover' | 'explore' | 'validate' | 'execute';

export interface StudentPassport {
  id: string;
  displayName: string;
  grade: Grade;
  gradePhase: GradePhase;
  expectedAdmissionYear: number; // e.g., 2028
  location?: string; // city/province
  academicHistory: AcademicRecord[];
  goals: StudentGoal[];
  createdAt: number;
  updatedAt: number;
}

export interface AcademicRecord {
  subject: string;
  grade: number; // 0-10 scale
  semester: string; // e.g., 'HK1-L10'
  year: string; // e.g., '2025-2026'
  source: 'self_report' | 'transcript';
}

export interface StudentGoal {
  id: string;
  text: string;
  type: 'career' | 'academic' | 'skill' | 'personal';
  priority: 'high' | 'medium' | 'low';
  createdAt: number;
}

export interface ProfileSnapshot {
  id: string;
  studentId: string;
  snapshotDate: number;
  grade: Grade;
  assessmentSummary: Record<string, any>;
  careerHypotheses: string[]; // hypothesis IDs
  confidenceLevel: ConfidenceLevel;
  notes?: string;
}

export type ConfidenceLevel = 'low' | 'medium' | 'high';

export const GRADE_PHASES: Record<Grade, { phase: GradePhase; label: string; question: string }> = {
  9: { phase: 'discover', label: 'Khám phá', question: 'Tôi nên giữ những cánh cửa nào mở?' },
  10: { phase: 'explore', label: 'Trải nghiệm', question: 'Tôi thực sự thích và có năng lực ở đâu?' },
  11: { phase: 'validate', label: 'Xác nhận', question: 'Ngành, trường và chiến lược thi nào đáng đầu tư?' },
  12: { phase: 'execute', label: 'Hành động', question: 'Làm gì để tối đa xác suất vào đúng lựa chọn phù hợp?' },
};
