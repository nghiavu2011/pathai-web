import { CareerFamily } from '../types/career';
import { Subject, SUBJECT_NAME_TO_ID, THPT_SUBJECTS } from '../subjects';

export interface SubjectRecommendation {
  subjectId: string;
  subjectName: string;
  importance: 'required' | 'strongly_recommended' | 'useful' | 'low_relevance';
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
    
    let importance: SubjectRecommendation['importance'] = 'low_relevance';
    let importanceLabel = 'Ít liên quan';
    let reason = 'Không yêu cầu bởi các nhóm ngành bạn đang quan tâm.';
    
    if (data.count >= 3) {
      importance = 'required';
      importanceLabel = 'Ưu tiên cao';
      reason = `Rất quan trọng, được yêu cầu bởi ${data.count} nhóm ngành bạn đang hướng tới.`;
    } else if (data.count === 2) {
      importance = 'strongly_recommended';
      importanceLabel = 'Nên chọn';
      reason = 'Quan trọng, hỗ trợ tốt cho 2 nhóm ngành mục tiêu của bạn.';
    } else if (data.count === 1) {
      importance = 'useful';
      importanceLabel = 'Có ích';
      reason = `Có ích nếu bạn muốn theo đuổi ${data.families[0]}.`;
    }

    return {
      subjectId: subject.id,
      subjectName: subject.name,
      importance,
      importanceLabel,
      supportingCareerFamilies: data.families,
      reason
    };
  });

  const order = {
    'required': 1,
    'strongly_recommended': 2,
    'useful': 3,
    'low_relevance': 4
  };

  return recommendations.sort((a, b) => order[a.importance] - order[b.importance]);
}
