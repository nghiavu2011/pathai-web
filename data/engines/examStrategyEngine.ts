import { AdmissionProgram, StudentScoreProfile } from '../types/admissions';
import { ADMISSION_PROGRAMS } from '../admissionsData';

export type ExamType = 'thpt' | 'tsa' | 'hsa' | 'dgnl_hcm' | 'sat' | 'ielts';
export type ExamPriority = 'Core' | 'Primary' | 'Support' | 'Backup' | 'Low Priority';

export interface ExamROIAnalysis {
  exam: ExamType;
  examName: string;
  priority: ExamPriority;
  priorityLabel: string;
  opportunityGainProgramsCount: number;
  unlockedProgramNames: string[];
  effortCost: 'Low' | 'Medium' | 'High';
  roiScore: number; // 0-100
  recommendationReason: string;
}

export function evaluateExamStrategy(
  profile: StudentScoreProfile,
  targetCareerFamilyIds: string[],
  programs: AdmissionProgram[] = ADMISSION_PROGRAMS
): ExamROIAnalysis[] {
  // Filter relevant programs by target career families
  const relevantPrograms = targetCareerFamilyIds.length > 0
    ? programs.filter(p => p.careerFamilyIds.some(id => targetCareerFamilyIds.includes(id)))
    : programs;

  // 1. THPT Evaluation (Always Core in Vietnam)
  const thptPrograms = relevantPrograms.filter(p => p.rules.some(r => r.method === 'thpt'));
  const thptAnalysis: ExamROIAnalysis = {
    exam: 'thpt',
    examName: 'Tốt nghiệp & Xét tuyển THPT',
    priority: 'Core',
    priorityLabel: 'Bắt buộc (Core)',
    opportunityGainProgramsCount: thptPrograms.length,
    unlockedProgramNames: thptPrograms.map(p => p.programName).slice(0, 4),
    effortCost: 'Medium',
    roiScore: 95,
    recommendationReason: 'Kỳ thi cốt lõi bắt buộc, áp dụng cho 100% các trường đại học tại Việt Nam.'
  };

  // 2. TSA Evaluation (Đánh giá tư duy - Bách Khoa)
  const isEngineeringOrTech = targetCareerFamilyIds.some(id => ['engineering', 'cs-ai', 'data-math'].includes(id));
  const tsaPrograms = relevantPrograms.filter(p => p.rules.some(r => r.method === 'tsa'));
  const tsaAnalysis: ExamROIAnalysis = {
    exam: 'tsa',
    examName: 'Đánh giá Tư duy (TSA - ĐHBK Hà Nội)',
    priority: isEngineeringOrTech ? 'Primary' : 'Low Priority',
    priorityLabel: isEngineeringOrTech ? 'Chiến lược chính (Primary)' : 'Ưu tiên thấp',
    opportunityGainProgramsCount: tsaPrograms.length,
    unlockedProgramNames: tsaPrograms.map(p => p.programName),
    effortCost: 'High',
    roiScore: isEngineeringOrTech ? 90 : 30,
    recommendationReason: isEngineeringOrTech 
      ? 'Được hơn 30+ trường kỹ thuật top đầu công nhận. Tăng 2-3 cơ hội xét tuyển sớm vào khối ngành Công nghệ & Kỹ thuật.'
      : 'Không có nhiều chương trình thuộc nhóm ngành mục tiêu của bạn xét tuyển bằng phương thức này.'
  };

  // 3. HSA / DGNL HCM Evaluation (Đánh giá năng lực)
  const hsaPrograms = relevantPrograms.filter(p => p.rules.some(r => r.method === 'hsa' || r.method === 'dgnl_hcm'));
  const hsaAnalysis: ExamROIAnalysis = {
    exam: 'hsa',
    examName: 'Đánh giá Năng lực (HSA / ĐHQG-HCM)',
    priority: hsaPrograms.length >= 2 ? 'Primary' : 'Backup',
    priorityLabel: hsaPrograms.length >= 2 ? 'Chiến lược chính (Primary)' : 'Phương án dự phòng (Backup)',
    opportunityGainProgramsCount: hsaPrograms.length,
    unlockedProgramNames: hsaPrograms.map(p => p.programName),
    effortCost: 'Medium',
    roiScore: hsaPrograms.length >= 2 ? 85 : 55,
    recommendationReason: hsaPrograms.length >= 2
      ? 'Mở thêm cửa vào các trường thuộc hệ thống ĐHQG và khối trường Kinh tế (NEU, UEH).'
      : 'Có thể cân nhắc như một đợt thi thử sức dượt trước kỳ thi THPT.'
  };

  // 4. IELTS / Ngoại ngữ Evaluation
  const ieltsPrograms = relevantPrograms.filter(p => p.rules.some(r => r.method === 'ielts_combined' || r.ieltsRequirement));
  const hasIeltsAlready = profile.ieltsScore && profile.ieltsScore >= 6.5;
  const ieltsAnalysis: ExamROIAnalysis = {
    exam: 'ielts',
    examName: 'Chứng chỉ Tiếng Anh (IELTS / TOEFL)',
    priority: hasIeltsAlready ? 'Core' : 'Support',
    priorityLabel: hasIeltsAlready ? 'Đã có lợi thế (Core Asset)' : 'Bổ trợ đắc lực (Support)',
    opportunityGainProgramsCount: ieltsPrograms.length,
    unlockedProgramNames: ieltsPrograms.map(p => p.programName),
    effortCost: hasIeltsAlready ? 'Low' : 'High',
    roiScore: 88,
    recommendationReason: 'Chứng chỉ từ 6.5+ mở khóa phương thức xét tuyển kết hợp và quy đổi điểm 10 tiếng Anh tại hầu hết các trường Top đầu.'
  };

  // 5. SAT Evaluation
  const satPrograms = relevantPrograms.filter(p => p.rules.some(r => r.method === 'sat'));
  const satAnalysis: ExamROIAnalysis = {
    exam: 'sat',
    examName: 'Chứng chỉ Quốc tế SAT',
    priority: satPrograms.length >= 2 ? 'Support' : 'Low Priority',
    priorityLabel: satPrograms.length >= 2 ? 'Bổ trợ (Support)' : 'Ưu tiên thấp (Low ROI)',
    opportunityGainProgramsCount: satPrograms.length,
    unlockedProgramNames: satPrograms.map(p => p.programName),
    effortCost: 'High',
    roiScore: satPrograms.length >= 2 ? 65 : 25,
    recommendationReason: satPrograms.length >= 2
      ? 'Thích hợp nếu bạn nhắm tới chương trình tiên tiến / liên kết quốc tế tại FTU, UET hoặc du học.'
      : 'Tỷ lệ chỉ tiêu xét SAT đơn lẻ không cao, chi phí luyện thi và lệ phí thi cao. Nên ưu tiên THPT/TSA trước.'
  };

  return [thptAnalysis, tsaAnalysis, hsaAnalysis, ieltsAnalysis, satAnalysis].sort((a, b) => b.roiScore - a.roiScore);
}
