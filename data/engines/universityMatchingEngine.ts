import { 
  University, 
  AdmissionProgram, 
  StudentScoreProfile, 
  ProgramMatchResult, 
  FitCategory, 
  AdmissionRule,
  AdmissionConfidenceLevel
} from '../types/admissions';
import { UNIVERSITIES, ADMISSION_PROGRAMS } from '../admissionsData';

export function matchUniversityPrograms(
  profile: StudentScoreProfile,
  targetCareerFamilyIds: string[],
  programs: AdmissionProgram[] = ADMISSION_PROGRAMS,
  universities: University[] = UNIVERSITIES
): ProgramMatchResult[] {
  const universityMap = new Map(universities.map(u => [u.id, u]));

  return programs.map(program => {
    const university = universityMap.get(program.universityId) || {
      id: program.universityId,
      code: 'UNKNOWN',
      name: 'Đại học',
      shortName: 'Đại học',
      location: 'Việt Nam',
      region: 'North',
      type: 'public',
      website: '',
      description: ''
    };

    // 1. Career Fit
    const matchedFamilies = program.careerFamilyIds.filter(id => targetCareerFamilyIds.includes(id));
    const careerFitScore = targetCareerFamilyIds.length === 0 
      ? 50 
      : Math.round((matchedFamilies.length / Math.max(1, program.careerFamilyIds.length)) * 100);

    // 2. Academic Fit & Margin Analysis across rules
    let bestRule: AdmissionRule = program.rules[0];
    let maxMargin: number | null = null;
    let hasCalculatedAcademicScore = false;
    const reasons: string[] = [];

    const thpt = profile.thptScores || {};

    for (const rule of program.rules) {
      let studentScore: number | null = null;
      let ruleMargin: number | null = null;

      if (rule.method === 'thpt' && rule.combinationCode) {
        // Only calculate if user actually provided the necessary subject scores
        const toan = thpt['toan'];
        const ly = thpt['ly'];
        const hoa = thpt['hoa'];
        const van = thpt['van'];
        const anh = thpt['anh'] ?? (profile.ieltsScore ? Math.min(10, profile.ieltsScore * 1.3) : undefined);
        const sinh = thpt['sinh'];
        const su = thpt['su'];
        const dia = thpt['dia'];
        const ktpl = thpt['ktpl'];

        if (rule.combinationCode === 'A00' && toan !== undefined && ly !== undefined && hoa !== undefined) {
          studentScore = toan + ly + hoa;
        } else if (rule.combinationCode === 'A01' && toan !== undefined && ly !== undefined && anh !== undefined) {
          studentScore = toan + ly + anh;
        } else if (rule.combinationCode === 'D01' && toan !== undefined && van !== undefined && anh !== undefined) {
          studentScore = toan + van + anh;
        } else if (rule.combinationCode === 'D07' && toan !== undefined && hoa !== undefined && anh !== undefined) {
          studentScore = toan + hoa + anh;
        } else if (rule.combinationCode === 'B00' && toan !== undefined && hoa !== undefined && sinh !== undefined) {
          studentScore = toan + hoa + sinh;
        } else if (rule.combinationCode === 'C00' && van !== undefined && su !== undefined && dia !== undefined) {
          studentScore = van + su + dia;
        }

        if (studentScore !== null) {
          ruleMargin = studentScore - rule.cutoffScoreLastYear;
        }
      } else if (rule.method === 'tsa' && profile.tsaScore !== undefined && profile.tsaScore !== null) {
        studentScore = profile.tsaScore;
        ruleMargin = studentScore - rule.cutoffScoreLastYear;
      } else if (rule.method === 'hsa' && profile.hsaScore !== undefined && profile.hsaScore !== null) {
        studentScore = profile.hsaScore;
        ruleMargin = studentScore - rule.cutoffScoreLastYear;
      } else if (rule.method === 'dgnl_hcm' && profile.dgnlHcmScore !== undefined && profile.dgnlHcmScore !== null) {
        studentScore = profile.dgnlHcmScore;
        ruleMargin = studentScore - rule.cutoffScoreLastYear;
      } else if (rule.method === 'sat' && profile.satScore !== undefined && profile.satScore !== null) {
        studentScore = profile.satScore;
        ruleMargin = (studentScore - rule.cutoffScoreLastYear) / 20; // scale margin
      } else if (rule.method === 'ielts_combined' && profile.ieltsScore !== undefined && profile.ieltsScore !== null) {
        const meetsIelts = profile.ieltsScore >= (rule.ieltsRequirement?.minOverall || 6.5);
        const toan = thpt['toan'];
        const ly = thpt['ly'];
        if (toan !== undefined && ly !== undefined) {
          const estCombined = toan + ly + (profile.ieltsScore >= 7.0 ? 10 : 9.0);
          ruleMargin = meetsIelts ? (estCombined - rule.cutoffScoreLastYear) : -5;
          studentScore = estCombined;
        }
      } else if (rule.method === 'hocba') {
        if (profile.gpa10 !== undefined && profile.gpa11 !== undefined && profile.gpa12 !== undefined) {
          const avgGpa = (profile.gpa10 + profile.gpa11 + profile.gpa12) / 3;
          studentScore = avgGpa * 3; // out of 30
          ruleMargin = studentScore - rule.cutoffScoreLastYear;
        }
      }

      if (ruleMargin !== null && (maxMargin === null || ruleMargin > maxMargin)) {
        maxMargin = ruleMargin;
        bestRule = rule;
        hasCalculatedAcademicScore = true;
      }
    }

    // 3. Determine Fit Category & Confidence
    let fitCategory: FitCategory = 'explore';
    let fitCategoryLabel = 'Khám phá (Explore)';
    let classificationConfidence: AdmissionConfidenceLevel = 'LOW';
    let academicFitScore: number | undefined = undefined;
    let academicReadinessStatus: 'SUFFICIENT_DATA' | 'ACADEMIC_DATA_MISSING' | 'UNKNOWN' = 'ACADEMIC_DATA_MISSING';

    if (hasCalculatedAcademicScore && maxMargin !== null) {
      academicReadinessStatus = 'SUFFICIENT_DATA';
      classificationConfidence = 'HIGH';
      academicFitScore = Math.max(10, Math.min(99, Math.round(50 + maxMargin * 10)));

      if (maxMargin >= 1.5) {
        fitCategory = 'safe';
        fitCategoryLabel = 'An toàn (Safe)';
        reasons.push(`Điểm ước tính của bạn cao hơn điểm chuẩn tham khảo năm trước khoảng +${maxMargin.toFixed(1)} điểm.`);
      } else if (maxMargin >= -0.75) {
        fitCategory = 'target';
        fitCategoryLabel = 'Mục tiêu (Target)';
        reasons.push(`Điểm số của bạn sát điểm chuẩn tham khảo (chênh lệch ${maxMargin > 0 ? '+' : ''}${maxMargin.toFixed(1)} điểm).`);
      } else if (maxMargin >= -3.0) {
        fitCategory = 'dream';
        fitCategoryLabel = 'Thử thách (Dream)';
        reasons.push(`Điểm chuẩn tham khảo cao hơn khoảng ${Math.abs(maxMargin).toFixed(1)} điểm. Cần kế hoạch bứt phá.`);
      } else {
        fitCategory = 'explore';
        fitCategoryLabel = 'Khám phá (Explore)';
        reasons.push(`Khoảng cách điểm khá lớn (-${Math.abs(maxMargin).toFixed(1)} điểm). Cân nhắc thêm phương thức khác.`);
      }
    } else {
      fitCategory = 'explore';
      fitCategoryLabel = 'Khám phá (Explore)';
      academicReadinessStatus = 'ACADEMIC_DATA_MISSING';
      classificationConfidence = 'LOW';
      reasons.push('Chưa có đủ điểm học tập/kỳ thi thực tế để xếp loại giỏ an toàn/mục tiêu/thử thách.');
    }

    if (matchedFamilies.length > 0) {
      reasons.push(`Chương trình thuộc nhóm ngành ${matchedFamilies.join(', ')} rất phù hợp với định hướng của bạn.`);
    }

    return {
      program,
      university,
      fitCategory,
      fitCategoryLabel,
      careerFitScore,
      academicFitScore,
      academicReadinessStatus,
      classificationConfidence,
      bestMethod: bestRule,
      estimatedMargin: maxMargin !== null ? Number(maxMargin.toFixed(2)) : undefined,
      referenceYearNote: 'Dữ liệu điểm chuẩn tham khảo năm 2024-2026. Quy chế chính thức cần xác nhận tại thời điểm nộp hồ sơ.',
      reasons
    };
  }).sort((a, b) => {
    return b.careerFitScore - a.careerFitScore || (b.academicFitScore || 0) - (a.academicFitScore || 0);
  });
}
