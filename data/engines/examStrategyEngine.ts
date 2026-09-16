import { AdmissionProgram, StudentScoreProfile } from '../types/admissions';
import { ADMISSION_PROGRAMS } from '../admissionsData';

export type ExamType = 'thpt' | 'tsa' | 'hsa' | 'dgnl_hcm' | 'sat' | 'ielts';
export type ExamPriority = 'Core' | 'Primary' | 'Support' | 'Backup' | 'Low Priority';
export type ROILevel = 'High' | 'Medium' | 'Low' | 'Unknown';

export interface ExamROIAnalysis {
  exam: ExamType;
  examName: string;
  priority: ExamPriority;
  priorityLabel: string;
  opportunityGainProgramsCount: number;
  unlockedProgramNames: string[];
  effortCost: 'Low' | 'Medium' | 'High';
  roiLevel: ROILevel;
  roiLevelLabel: string;
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

  // 1. THPT Evaluation
  const thptPrograms = relevantPrograms.filter(p => p.rules.some(r => r.method === 'thpt'));
  const thptAnalysis: ExamROIAnalysis = {
    exam: 'thpt',
    examName: 'Tốt nghiệp & Xét tuyển THPT',
    priority: 'Core',
    priorityLabel: 'Bắt buộc (Core)',
    opportunityGainProgramsCount: thptPrograms.length,
    unlockedProgramNames: thptPrograms.map(p => p.programName).slice(0, 4),
    effortCost: 'Medium',
    roiLevel: 'High',
    roiLevelLabel: 'Rất cao (Nền tảng cốt lõi)',
    recommendationReason: 'Kỳ thi quốc gia then chốt, là điều kiện công nhận tốt nghiệp THPT và phương thức xét tuyển truyền thống chủ lực tại đa số các trường đại học.'
  };

  // 2. TSA Evaluation (Đánh giá tư duy - Bách Khoa Hà Nội)
  const isTechOrEng = targetCareerFamilyIds.some(id => ['engineering', 'cs-ai', 'data-math'].includes(id));
  const tsaPrograms = relevantPrograms.filter(p => p.rules.some(r => r.method === 'tsa'));
  const tsaAnalysis: ExamROIAnalysis = {
    exam: 'tsa',
    examName: 'Đánh giá Tư duy (TSA - ĐHBK Hà Nội)',
    priority: isTechOrEng ? 'Primary' : 'Low Priority',
    priorityLabel: isTechOrEng ? 'Chiến lược chính (Primary)' : 'Ưu tiên thấp',
    opportunityGainProgramsCount: tsaPrograms.length,
    unlockedProgramNames: tsaPrograms.map(p => p.programName),
    effortCost: 'High',
    roiLevel: isTechOrEng ? 'High' : 'Low',
    roiLevelLabel: isTechOrEng ? 'Cao (Ngành Kỹ thuật/Công nghệ)' : 'Thấp',
    recommendationReason: isTechOrEng 
      ? 'Được hơn 30+ trường đại học kỹ thuật top đầu công nhận. Tăng thêm 2-3 cơ hội xét tuyển sớm vào khối ngành Công nghệ & Kỹ thuật.'
      : 'Không có nhiều chương trình thuộc nhóm ngành mục tiêu của bạn xét tuyển bằng phương thức này.'
  };

  // 3. HSA Evaluation (Đánh giá năng lực - ĐHQG Hà Nội)
  const hsaPrograms = relevantPrograms.filter(p => p.rules.some(r => r.method === 'hsa'));
  const hsaAnalysis: ExamROIAnalysis = {
    exam: 'hsa',
    examName: 'Đánh giá Năng lực (HSA - ĐHQG Hà Nội)',
    priority: hsaPrograms.length >= 2 ? 'Primary' : 'Backup',
    priorityLabel: hsaPrograms.length >= 2 ? 'Chiến lược chính (Primary)' : 'Phương án dự phòng (Backup)',
    opportunityGainProgramsCount: hsaPrograms.length,
    unlockedProgramNames: hsaPrograms.map(p => p.programName),
    effortCost: 'Medium',
    roiLevel: hsaPrograms.length >= 2 ? 'High' : 'Medium',
    roiLevelLabel: hsaPrograms.length >= 2 ? 'Cao (Miền Bắc)' : 'Trung bình',
    recommendationReason: hsaPrograms.length >= 2
      ? 'Mở thêm cơ hội xét tuyển sớm vào hệ thống ĐHQG Hà Nội và các trường khối Kinh tế/Xã hội phía Bắc.'
      : 'Có thể cân nhắc như một đợt thi thử sức cọ xát kiến thức trước kỳ thi tốt nghiệp THPT.'
  };

  // 4. DGNL HCM Evaluation (Đánh giá năng lực - ĐHQG TP.HCM)
  const dgnlHcmPrograms = relevantPrograms.filter(p => p.rules.some(r => r.method === 'dgnl_hcm'));
  const dgnlHcmAnalysis: ExamROIAnalysis = {
    exam: 'dgnl_hcm',
    examName: 'Đánh giá Năng lực ĐHQG TP.HCM',
    priority: dgnlHcmPrograms.length >= 1 ? 'Primary' : 'Support',
    priorityLabel: dgnlHcmPrograms.length >= 1 ? 'Chiến lược chính (Khu vực Phía Nam)' : 'Tham khảo mở rộng',
    opportunityGainProgramsCount: dgnlHcmPrograms.length,
    unlockedProgramNames: dgnlHcmPrograms.map(p => p.programName),
    effortCost: 'Medium',
    roiLevel: dgnlHcmPrograms.length >= 1 ? 'High' : 'Medium',
    roiLevelLabel: dgnlHcmPrograms.length >= 1 ? 'Cao (Miền Nam)' : 'Trung bình',
    recommendationReason: dgnlHcmPrograms.length >= 1
      ? 'Hơn 100 trường đại học, cao đẳng phía Nam (ĐHQG-HCM, UEH, UMP...) sử dụng kết quả để xét tuyển với chỉ tiêu lớn.'
      : 'Thích hợp nếu bạn có nguyện vọng học tập tại các trường đại học khu vực phía Nam.'
  };

  // 5. IELTS / Ngoại ngữ Evaluation
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
    roiLevel: 'High',
    roiLevelLabel: 'Cao (Lợi thế kết hợp)',
    recommendationReason: 'Chứng chỉ từ 6.5+ mở khóa phương thức xét tuyển kết hợp và quy đổi điểm 10 tiếng Anh tại hầu hết các trường Top đầu.'
  };

  // 6. SAT Evaluation
  const satPrograms = relevantPrograms.filter(p => p.rules.some(r => r.method === 'sat'));
  const satAnalysis: ExamROIAnalysis = {
    exam: 'sat',
    examName: 'Chứng chỉ Chuẩn hóa Quốc tế (SAT / ACT)',
    priority: satPrograms.length >= 2 ? 'Support' : 'Low Priority',
    priorityLabel: satPrograms.length >= 2 ? 'Bổ trợ (Support)' : 'Ưu tiên thấp (Low Priority)',
    opportunityGainProgramsCount: satPrograms.length,
    unlockedProgramNames: satPrograms.map(p => p.programName),
    effortCost: 'High',
    roiLevel: satPrograms.length >= 2 ? 'Medium' : 'Low',
    roiLevelLabel: satPrograms.length >= 2 ? 'Trung bình' : 'Thấp',
    recommendationReason: satPrograms.length >= 2
      ? 'Thích hợp nếu bạn nhắm tới chương trình tiên tiến / liên kết quốc tế tại FTU, UET hoặc dự định du học.'
      : 'Tỷ lệ chỉ tiêu xét SAT đơn lẻ không cao, chi phí luyện thi và lệ phí thi cao. Nên ưu tiên THPT/TSA/HSA trước.'
  };

  const priorityRank: Record<ExamPriority, number> = {
    'Core': 1,
    'Primary': 2,
    'Support': 3,
    'Backup': 4,
    'Low Priority': 5
  };

  return [thptAnalysis, tsaAnalysis, hsaAnalysis, dgnlHcmAnalysis, ieltsAnalysis, satAnalysis]
    .sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
}
