// Evidence Framework — Every claim must be traceable to evidence

export type EvidenceType = 'self_report' | 'academic' | 'project' | 'diagnostic' | 'experience';
export type EvidenceStrength = 'weak' | 'moderate' | 'strong';

export interface Evidence {
  id: string;
  studentId: string;
  type: EvidenceType;
  title: string;
  description: string;
  strength: EvidenceStrength;
  relatedSkills: string[];
  relatedCareerFamilies: string[]; // career family IDs
  source: string; // where this evidence comes from
  date: number;
  verified: boolean;
}

// Evidence strength rules
export const EVIDENCE_STRENGTH_RULES: Record<EvidenceType, { defaultStrength: EvidenceStrength; description: string }> = {
  self_report: { defaultStrength: 'weak', description: 'Tự đánh giá — cần xác nhận bằng bằng chứng khác' },
  academic: { defaultStrength: 'moderate', description: 'Kết quả học tập — bằng chứng khách quan' },
  project: { defaultStrength: 'moderate', description: 'Dự án thực tế — thể hiện năng lực ứng dụng' },
  diagnostic: { defaultStrength: 'moderate', description: 'Bài kiểm tra chuẩn — đo lường có hệ thống' },
  experience: { defaultStrength: 'strong', description: 'Trải nghiệm thực tế — bằng chứng hành vi' },
};
