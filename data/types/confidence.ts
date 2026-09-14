// Confidence Engine — How certain are we about a recommendation?

import type { ConfidenceLevel } from './student';

export interface ConfidenceScore {
  level: ConfidenceLevel;
  score: number; // 0-100
  factors: ConfidenceFactor[];
}

export interface ConfidenceFactor {
  name: string;
  weight: number; // 0-1
  score: number; // 0-100
  reason: string;
}

// Calculate confidence from factors
export function calculateConfidence(factors: ConfidenceFactor[]): ConfidenceScore {
  if (factors.length === 0) return { level: 'low', score: 0, factors: [] };
  
  const totalWeight = factors.reduce((sum, f) => sum + f.weight, 0);
  const weightedScore = factors.reduce((sum, f) => sum + (f.score * f.weight), 0) / totalWeight;
  
  const level: ConfidenceLevel = weightedScore >= 70 ? 'high' : weightedScore >= 40 ? 'medium' : 'low';
  
  return { level, score: Math.round(weightedScore), factors };
}

// Pre-defined confidence factor templates
export const CONFIDENCE_FACTORS = {
  coverage: (assessmentCount: number, totalAssessments: number): ConfidenceFactor => ({
    name: 'Độ bao phủ',
    weight: 0.3,
    score: Math.min(100, (assessmentCount / totalAssessments) * 100),
    reason: `Đã hoàn thành ${assessmentCount}/${totalAssessments} đánh giá`,
  }),
  evidenceQuality: (strongCount: number, totalCount: number): ConfidenceFactor => ({
    name: 'Chất lượng bằng chứng',
    weight: 0.3,
    score: totalCount === 0 ? 0 : Math.min(100, (strongCount / totalCount) * 100),
    reason: `${strongCount}/${totalCount} bằng chứng có chất lượng tốt`,
  }),
  consistency: (isConsistent: boolean): ConfidenceFactor => ({
    name: 'Tính nhất quán',
    weight: 0.2,
    score: isConsistent ? 80 : 30,
    reason: isConsistent ? 'Các kết quả nhất quán với nhau' : 'Có mâu thuẫn giữa các kết quả',
  }),
  recency: (daysSinceLastAssessment: number): ConfidenceFactor => ({
    name: 'Tính cập nhật',
    weight: 0.2,
    score: daysSinceLastAssessment <= 90 ? 100 : daysSinceLastAssessment <= 180 ? 60 : 20,
    reason: daysSinceLastAssessment <= 90 ? 'Dữ liệu được cập nhật gần đây' : 'Nên cập nhật lại đánh giá',
  }),
};
