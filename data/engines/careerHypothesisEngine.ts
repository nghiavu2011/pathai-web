import { CategoryKey, WorkValueKey } from '../../types';
import { CAREER_FAMILIES } from '../careerFamilies';
import type { CareerHypothesis } from '../types/career';

export interface HypothesisEngineInput {
  studentId: string;
  riasecScores: Record<CategoryKey, number>;
  workValuesScores?: Record<WorkValueKey, number>;
}

/**
 * Career Hypothesis Engine
 * Takes assessment results and generates hypotheses to test, rather than final "matches".
 */
export function generateCareerHypotheses(input: HypothesisEngineInput): CareerHypothesis[] {
  const { studentId, riasecScores, workValuesScores } = input;
  
  // 1. Normalize RIASEC scores to get the top dominant traits
  const totalRiasec = Object.values(riasecScores).reduce((sum, score) => sum + score, 0);
  const normalizedRiasec = totalRiasec > 0 
    ? Object.entries(riasecScores).reduce((acc, [key, score]) => {
        acc[key as CategoryKey] = score / totalRiasec;
        return acc;
      }, {} as Record<CategoryKey, number>)
    : ({} as Record<CategoryKey, number>);

  const topStudentRiasec = Object.entries(normalizedRiasec)
    .sort(([, a], [, b]) => b - a)
    .map(([key]) => key as CategoryKey);

  const primaryRiasec = topStudentRiasec.slice(0, 3);

  // 2. Score each career family
  const familyScores = CAREER_FAMILIES.map(family => {
    let relevanceScore = 0;
    const supporting: string[] = [];
    const contradicting: string[] = [];
    const missing: string[] = [
      'Cần thêm bằng chứng từ kết quả học tập thực tế (điểm số, chứng chỉ)',
      'Cần trải nghiệm thực tiễn hoặc dự án liên quan để xác nhận sự hứng thú'
    ];
    
    // Evaluate RIASEC Alignment
    let matchedRiasecCount = 0;
    family.relatedRIASEC.forEach((code, index) => {
      // Weight primary trait match higher
      const weight = index === 0 ? 3 : index === 1 ? 2 : 1;
      if (primaryRiasec.includes(code as CategoryKey)) {
        relevanceScore += weight;
        matchedRiasecCount++;
      }
    });

    if (matchedRiasecCount > 0) {
      supporting.push(`Kết quả bài trắc nghiệm RIASEC cho thấy bạn có thiên hướng mạnh về ${family.relatedRIASEC.join(', ')} - rất phù hợp với đặc thù nhóm ngành này.`);
    }

    // Identify conflicting RIASEC patterns (Holland Hexagon opposite traits)
    const hollandOpposites: Record<string, string> = { 
      'R': 'S', 'S': 'R', 
      'I': 'E', 'E': 'I', 
      'A': 'C', 'C': 'A' 
    };
    
    family.relatedRIASEC.forEach(code => {
      const opposing = hollandOpposites[code];
      if (opposing && topStudentRiasec.slice(0, 2).includes(opposing as CategoryKey)) {
        contradicting.push(`Sở thích nổi trội của bạn về "${opposing}" có thể mâu thuẫn một phần với yêu cầu đặc trưng "${code}" của ngành này.`);
      }
    });

    // Evaluate Work Values Alignment
    if (workValuesScores) {
      const topValues = Object.entries(workValuesScores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([key]) => key as WorkValueKey);
        
      const matchedValues = family.relatedWorkValues.filter(v => topValues.includes(v as WorkValueKey));
      
      if (matchedValues.length > 0) {
        relevanceScore += matchedValues.length * 1.5;
        supporting.push(`Các giá trị nghề nghiệp bạn coi trọng (như ${matchedValues.join(', ')}) có khả năng được đáp ứng tốt trong môi trường này.`);
      } else {
        contradicting.push('Môi trường làm việc của ngành này có thể không hoàn toàn tương thích với các giá trị nghề nghiệp ưu tiên của bạn.');
      }
    } else {
      missing.push('Chưa có dữ liệu đánh giá Giá trị nghề nghiệp để xem xét sự phù hợp về văn hóa và môi trường làm việc.');
    }

    return {
      family,
      relevanceScore,
      supporting,
      contradicting,
      missing
    };
  });

  // 3. Sort and select top hypotheses
  const topFamilies = familyScores
    .filter(f => f.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 3); // Take top 3 as hypotheses

  // 4. Map to CareerHypothesis output
  return topFamilies.map(tf => {
    // Generate a practical next experiment
    const experimentSubject = tf.family.sampleMajors[0] || tf.family.name;
    const nextExperiment = `Tìm hiểu sâu: Thử thực hiện một dự án nhỏ liên quan đến ${experimentSubject} hoặc phỏng vấn một người đang làm trong ngành.`;

    return {
      id: `hyp-${studentId}-${tf.family.id}-${Date.now()}`,
      studentId,
      careerFamilyId: tf.family.id,
      status: 'exploring', // Always exploring to start
      confidence: 'low', // Low because it is based purely on self-reported assessments
      supportingEvidence: tf.supporting,
      contradictingEvidence: tf.contradicting,
      missingEvidence: tf.missing,
      nextExperiment,
      createdAt: Date.now(),
      updatedAt: Date.now()
    } as CareerHypothesis;
  });
}
