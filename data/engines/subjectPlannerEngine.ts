import { CareerFamily } from '../types/career';
import { Subject, SUBJECT_NAME_TO_ID, THPT_SUBJECTS } from '../subjects';

export type SubjectPriority = 
  | 'core_compulsory'
  | 'learning_priority_high'
  | 'learning_priority_medium'
  | 'learning_priority_low'
  | 'low_relevance';

export interface SubjectRecommendation {
  subjectId: string;
  subjectName: string;
  subjectType: 'core' | 'elective';
  importance: SubjectPriority;
  importanceLabel: string; // Vietnamese
  supportingCareerFamilies: string[]; // career family names that need this subject
  reason: string; // Vietnamese explanation
}

export function generateSubjectPlan(
  careerFamilyIds: string[],
  careerFamilies: CareerFamily[]
): SubjectRecommendation[] {
  const targetFamilies = careerFamilies.filter(f => careerFamilyIds.includes(f.id));
  
  const subjectCounts: Record<string, { count: number; families: string[] }> = {};
  
  for (const family of targetFamilies) {
    for (const subjectName of family.keySubjects) {
      const id = SUBJECT_NAME_TO_ID[subjectName];
      if (id) {
        if (!subjectCounts[id]) {
          subjectCounts[id] = { count: 0, families: [] };
        }
        subjectCounts[id].count++;
        subjectCounts[id].families.push(family.name);
      }
    }
  }

  const recommendations: SubjectRecommendation[] = THPT_SUBJECTS.map(subject => {
    const data = subjectCounts[subject.id] || { count: 0, families: [] };
    
    // Core subjects are compulsory for all students under CTGDPT 2018
    if (subject.type === 'core') {
      return {
        subjectId: subject.id,
        subjectName: subject.name,
        subjectType: 'core',
        importance: 'core_compulsory',
        importanceLabel: 'Môn học bắt buộc (Core)',
        supportingCareerFamilies: data.families,
        reason: `Môn học bắt buộc theo Chương trình GDPT 2018. ${data.count > 0 ? `Đồng thời hỗ trợ đắc lực cho ${data.count} nhóm ngành bạn đang quan tâm.` : 'Cung cấp nền tảng học vấn toàn diện.'}`
      };
    }

    let importance: SubjectPriority = 'low_relevance';
    let importanceLabel = 'Ít liên quan';
    let reason = 'Không phải môn trọng tâm của các nhóm ngành bạn đang quan tâm.';
    
    if (data.count >= 3) {
      importance = 'learning_priority_high';
      importanceLabel = 'Ưu tiên học tập cao';
      reason = `Rất quan trọng cho lộ trình phát triển năng lực của ${data.count} nhóm ngành bạn đang hướng tới.`;
    } else if (data.count === 2) {
      importance = 'learning_priority_medium';
      importanceLabel = 'Nên ưu tiên chọn';
      reason = `Hỗ trợ tốt cho 2 nhóm ngành mục tiêu: ${data.families.join(', ')}.`;
    } else if (data.count === 1) {
      importance = 'learning_priority_low';
      importanceLabel = 'Có thể cân nhắc';
      reason = `Bổ trợ kiến thức hữu ích nếu bạn theo đuổi ${data.families[0]}.`;
    }

    return {
      subjectId: subject.id,
      subjectName: subject.name,
      subjectType: 'elective',
      importance,
      importanceLabel,
      supportingCareerFamilies: data.families,
      reason
    };
  });

  const order: Record<SubjectPriority, number> = {
    'core_compulsory': 1,
    'learning_priority_high': 2,
    'learning_priority_medium': 3,
    'learning_priority_low': 4,
    'low_relevance': 5
  };

  return recommendations.sort((a, b) => order[a.importance] - order[b.importance]);
}
