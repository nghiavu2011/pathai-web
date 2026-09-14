import { 
  University, 
  AdmissionProgram, 
  StudentScoreProfile, 
  ProgramMatchResult, 
  FitCategory, 
  AdmissionRule 
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
    let maxMargin = -999;
    let academicFitScore = 50;
    const reasons: string[] = [];

    for (const rule of program.rules) {
      let studentScore = 0;
      let ruleMargin = -999;

      if (rule.method === 'thpt' && rule.combinationCode) {
        // Estimate combination score from profile (or default approximation)
        const toan = profile.thptScores['toan'] || 8.0;
        const ly = profile.thptScores['ly'] || 7.5;
        const hoa = profile.thptScores['hoa'] || 7.5;
        const van = profile.thptScores['van'] || 7.5;
        const anh = profile.thptScores['anh'] || (profile.ieltsScore ? Math.min(10, profile.ieltsScore * 1.3) : 7.5);
        const sinh = profile.thptScores['sinh'] || 7.0;

        if (rule.combinationCode === 'A00') studentScore = toan + ly + hoa;
        else if (rule.combinationCode === 'A01') studentScore = toan + ly + anh;
        else if (rule.combinationCode === 'D01') studentScore = toan + van + anh;
        else if (rule.combinationCode === 'D07') studentScore = toan + hoa + anh;
        else if (rule.combinationCode === 'B00') studentScore = toan + hoa + sinh;
        else if (rule.combinationCode === 'C00') studentScore = van + 7.5 + 7.5;
        else studentScore = toan + ly + hoa;

        ruleMargin = studentScore - rule.cutoffScoreLastYear;
      } else if (rule.method === 'tsa' && profile.tsaScore !== undefined) {
        studentScore = profile.tsaScore;
        ruleMargin = studentScore - rule.cutoffScoreLastYear;
      } else if (rule.method === 'hsa' && profile.hsaScore !== undefined) {
        studentScore = profile.hsaScore;
        ruleMargin = studentScore - rule.cutoffScoreLastYear;
      } else if (rule.method === 'dgnl_hcm' && profile.dgnlHcmScore !== undefined) {
        studentScore = profile.dgnlHcmScore;
        ruleMargin = studentScore - rule.cutoffScoreLastYear;
      } else if (rule.method === 'sat' && profile.satScore !== undefined) {
        studentScore = profile.satScore;
        ruleMargin = (studentScore - rule.cutoffScoreLastYear) / 20; // scale margin
      } else if (rule.method === 'ielts_combined' && profile.ieltsScore !== undefined) {
        const meetsIelts = profile.ieltsScore >= (rule.ieltsRequirement?.minOverall || 6.5);
        const toan = profile.thptScores['toan'] || 8.0;
        const ly = profile.thptScores['ly'] || 7.5;
        const estCombined = toan + ly + (profile.ieltsScore >= 7.0 ? 10 : 9.0);
        ruleMargin = meetsIelts ? (estCombined - rule.cutoffScoreLastYear) : -5;
      } else if (rule.method === 'hocba') {
        const avgGpa = ((profile.gpa10 || 8.0) + (profile.gpa11 || 8.0) + (profile.gpa12 || 8.5)) / 3;
        studentScore = avgGpa * 3; // out of 30
        ruleMargin = studentScore - rule.cutoffScoreLastYear;
      }

      if (ruleMargin > maxMargin) {
        maxMargin = ruleMargin;
        bestRule = rule;
      }
    }

    // 3. Determine Fit Category
    let fitCategory: FitCategory = 'target';
    let fitCategoryLabel = 'Mục tiêu (Target)';

    if (maxMargin >= 1.5) {
      fitCategory = 'safe';
      fitCategoryLabel = 'An toàn (Safe)';
      reasons.push(`Điểm ước tính của bạn cao hơn điểm chuẩn năm trước khoảng +${maxMargin.toFixed(1)} điểm.`);
    } else if (maxMargin >= -0.75) {
      fitCategory = 'target';
      fitCategoryLabel = 'Mục tiêu (Target)';
      reasons.push(`Điểm số của bạn sát điểm chuẩn năm trước (chênh lệch ${maxMargin > 0 ? '+' : ''}${maxMargin.toFixed(1)} điểm). Cơ hội trúng tuyển tốt.`);
    } else if (maxMargin >= -3.0) {
      fitCategory = 'dream';
      fitCategoryLabel = 'Thử thách (Dream)';
      reasons.push(`Điểm chuẩn năm trước cao hơn khoảng ${Math.abs(maxMargin).toFixed(1)} điểm. Cần nỗ lực bứt phá để đạt ngưỡng an toàn.`);
    } else {
      fitCategory = 'explore';
      fitCategoryLabel = 'Khám phá (Explore)';
      reasons.push(`Khoảng cách điểm khá lớn (-${Math.abs(maxMargin).toFixed(1)} điểm) hoặc chưa đủ dữ liệu phương thức xét tuyển.`);
    }

    if (matchedFamilies.length > 0) {
      reasons.push(`Chương trình thuộc nhóm ngành ${matchedFamilies.join(', ')} rất phù hợp với định hướng của bạn.`);
    }

    academicFitScore = Math.max(10, Math.min(99, Math.round(50 + maxMargin * 10)));

    return {
      program,
      university,
      fitCategory,
      fitCategoryLabel,
      careerFitScore,
      academicFitScore,
      bestMethod: bestRule,
      estimatedMargin: Number(maxMargin.toFixed(2)),
      reasons
    };
  }).sort((a, b) => {
    // Sort by Career Fit first, then Academic Fit
    return b.careerFitScore - a.careerFitScore || b.academicFitScore - a.academicFitScore;
  });
}
