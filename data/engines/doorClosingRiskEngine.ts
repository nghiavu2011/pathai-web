import { CareerFamily } from '../types/career';
import { Subject, SUBJECT_NAME_TO_ID } from '../subjects';

export type RiskLevel = 'high' | 'medium' | 'low' | 'unknown' | 'none';

export interface DoorClosingRisk {
  droppedSubjectId: string;
  droppedSubjectName: string;
  risks: CareerFamilyRisk[];
  overallRisk: RiskLevel;
  summary: string; // Vietnamese summary
}

export interface CareerFamilyRisk {
  careerFamilyId: string;
  careerFamilyName: string;
  academicPathwayImpact: RiskLevel;
  admissionDoorClosing: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN';
  reason: string; // Vietnamese
}

export function assessDoorClosingRisk(
  droppedSubjectId: string,
  careerFamilyIds: string[], // student's career hypotheses
  careerFamilies: CareerFamily[],
  subjects: Subject[]
): DoorClosingRisk {
  const subject = subjects.find(s => s.id === droppedSubjectId);
  if (!subject) {
    return {
      droppedSubjectId,
      droppedSubjectName: 'Môn học chưa xác định',
      risks: [],
      overallRisk: 'unknown',
      summary: 'Không tìm thấy dữ liệu môn học để phân tích.'
    };
  }

  // If student drops a core compulsory subject (e.g. Math, Literature, English, History)
  if (subject.type === 'core') {
    return {
      droppedSubjectId,
      droppedSubjectName: subject.name,
      risks: [],
      overallRisk: 'high',
      summary: `Môn ${subject.name} là môn học bắt buộc toàn quốc theo Chương trình GDPT 2018, học sinh không thể bỏ môn này.`
    };
  }

  const risks: CareerFamilyRisk[] = [];
  let highRiskCount = 0;
  let mediumRiskCount = 0;

  for (const family of careerFamilies) {
    const isExploring = careerFamilyIds.includes(family.id);
    const requiresSubject = family.keySubjects.some(
      s => SUBJECT_NAME_TO_ID[s] === droppedSubjectId
    );

    if (requiresSubject) {
      if (isExploring) {
        risks.push({
          careerFamilyId: family.id,
          careerFamilyName: family.name,
          academicPathwayImpact: 'high',
          admissionDoorClosing: 'HIGH',
          reason: `Môn ${subject.name} là kiến thức nền tảng trọng yếu cho ${family.name} - nhóm ngành bạn đang hướng tới.`
        });
        highRiskCount++;
      } else {
        risks.push({
          careerFamilyId: family.id,
          careerFamilyName: family.name,
          academicPathwayImpact: 'medium',
          admissionDoorClosing: 'MEDIUM',
          reason: `Bạn có thể gặp trở ngại khi xây dựng năng lực chuyên sâu cho ${family.name} nếu không học môn ${subject.name}.`
        });
        mediumRiskCount++;
      }
    }
  }

  let overallRisk: RiskLevel = 'none';
  if (highRiskCount > 0) {
    overallRisk = 'high';
  } else if (mediumRiskCount > 0) {
    overallRisk = 'medium';
  } else if (careerFamilyIds.length === 0) {
    overallRisk = 'unknown';
  }

  let summary = `Bỏ môn ${subject.name} không ảnh hưởng trực tiếp đến các nhóm ngành bạn đang quan tâm.`;
  if (overallRisk === 'high') {
    summary = `Cảnh báo: Bỏ môn ${subject.name} sẽ thu hẹp cơ hội phát triển năng lực trong ${highRiskCount} nhóm ngành mục tiêu của bạn.`;
  } else if (overallRisk === 'medium') {
    summary = `Lưu ý: Bạn sẽ đóng lại cơ hội trau dồi ở ${mediumRiskCount} nhóm ngành khác nếu bỏ môn ${subject.name}.`;
  } else if (overallRisk === 'unknown') {
    summary = `Chưa có đủ dữ liệu mục tiêu nghề nghiệp để đánh giá nguy cơ đóng cửa cơ hội.`;
  }

  const riskOrder: Record<RiskLevel, number> = { 'high': 1, 'medium': 2, 'low': 3, 'unknown': 4, 'none': 5 };
  risks.sort((a, b) => riskOrder[a.academicPathwayImpact] - riskOrder[b.academicPathwayImpact]);

  return {
    droppedSubjectId,
    droppedSubjectName: subject.name,
    risks,
    overallRisk,
    summary
  };
}

export interface OptionalityScore {
  score: number; // 0-100
  level: 'high' | 'medium' | 'low';
  accessibleFamilies: string[]; // career family names still accessible
  blockedFamilies: string[]; // career family names blocked
  summary: string; // Vietnamese
}

export function calculateOptionalityScore(
  chosenSubjectIds: string[],
  allCareerFamilies: CareerFamily[],
  subjects: Subject[]
): OptionalityScore {
  const accessibleFamilies: string[] = [];
  const blockedFamilies: string[] = [];

  for (const family of allCareerFamilies) {
    const isAccessible = family.keySubjects.every(subjectName => {
      const subjectId = SUBJECT_NAME_TO_ID[subjectName];
      return !subjectId || chosenSubjectIds.includes(subjectId);
    });

    if (isAccessible) {
      accessibleFamilies.push(family.name);
    } else {
      blockedFamilies.push(family.name);
    }
  }

  const totalFamilies = allCareerFamilies.length;
  const score = totalFamilies === 0 ? 0 : Math.round((accessibleFamilies.length / totalFamilies) * 100);

  let level: 'high' | 'medium' | 'low' = 'low';
  if (score >= 70) level = 'high';
  else if (score >= 40) level = 'medium';

  let summary = 'Tổ hợp môn của bạn giữ mở phần lớn các hướng đi nghề nghiệp.';
  if (level === 'medium') {
    summary = 'Tổ hợp môn của bạn tập trung vào một số hướng đi nhất định.';
  } else if (level === 'low') {
    summary = 'Tổ hợp môn của bạn đang thu hẹp đáng kể các hướng đi tương lai. Hãy cân nhắc kỹ sự phù hợp.';
  }

  return {
    score,
    level,
    accessibleFamilies,
    blockedFamilies,
    summary
  };
}
