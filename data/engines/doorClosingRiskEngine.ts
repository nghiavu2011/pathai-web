import { CareerFamily } from '../types/career';
import { Subject, SUBJECT_NAME_TO_ID } from '../subjects';

export type RiskLevel = 'high' | 'medium' | 'low' | 'none';

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
  riskLevel: RiskLevel;
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
    throw new Error(`Subject with ID ${droppedSubjectId} not found`);
  }

  const risks: CareerFamilyRisk[] = [];
  let overallRisk: RiskLevel = 'none';
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
          riskLevel: 'high',
          reason: `Môn ${subject.name} là môn học then chốt cho ${family.name} - nhóm ngành bạn đang hướng tới.`
        });
        highRiskCount++;
      } else {
        risks.push({
          careerFamilyId: family.id,
          careerFamilyName: family.name,
          riskLevel: 'medium',
          reason: `Bạn sẽ khó theo đuổi ${family.name} nếu bỏ môn ${subject.name}.`
        });
        mediumRiskCount++;
      }
    }
  }

  if (highRiskCount > 0) {
    overallRisk = 'high';
  } else if (mediumRiskCount > 0) {
    overallRisk = 'medium';
  }

  let summary = `Bỏ môn ${subject.name} không ảnh hưởng đến các nhóm ngành bạn đang quan tâm.`;
  if (overallRisk === 'high') {
    summary = `Cảnh báo: Bỏ môn ${subject.name} sẽ thu hẹp đáng kể cơ hội của bạn trong ${highRiskCount} nhóm ngành bạn đang nhắm tới!`;
  } else if (overallRisk === 'medium') {
    summary = `Lưu ý: Bạn sẽ đóng lại cơ hội ở ${mediumRiskCount} nhóm ngành khác nếu bỏ môn ${subject.name}.`;
  }

  const riskOrder = { 'high': 1, 'medium': 2, 'low': 3, 'none': 4 };
  risks.sort((a, b) => riskOrder[a.riskLevel] - riskOrder[b.riskLevel]);

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

  let summary = 'Tổ hợp môn của bạn giữ mở phần lớn các lựa chọn nghề nghiệp.';
  if (level === 'medium') {
    summary = 'Tổ hợp môn của bạn tập trung vào một số hướng đi nhất định.';
  } else if (level === 'low') {
    summary = 'Tổ hợp môn của bạn đang thu hẹp đáng kể các hướng đi tương lai. Hãy chắc chắn về lựa chọn của mình.';
  }

  return {
    score,
    level,
    accessibleFamilies,
    blockedFamilies,
    summary
  };
}
