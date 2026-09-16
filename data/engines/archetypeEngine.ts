import { CategoryKey } from '../../types';
import { EasternStarArchetype, ArchetypeSynthesis, ElementType } from '../types/archetypes';
import { EASTERN_ARCHETYPES, ELEMENT_TEMPERAMENTS } from '../archetypesData';

export interface ArchetypeEngineInput {
  riasecScores: Record<CategoryKey, number>;
  birthYear?: number; // e.g. 2008, 2009, 2010
}

/**
 * Calculates Eastern Archetype Synthesis based on RIASEC traits and Academic Psychological Cross-Mapping.
 */
export function synthesizeEasternArchetype(input: ArchetypeEngineInput): ArchetypeSynthesis {
  const { riasecScores, birthYear } = input;

  // 1. Normalize RIASEC scores to identify top traits
  const totalRiasec = Object.values(riasecScores).reduce((sum, s) => sum + s, 0);
  const normalized = totalRiasec > 0
    ? Object.entries(riasecScores).reduce((acc, [k, v]) => {
        acc[k as CategoryKey] = v / totalRiasec;
        return acc;
      }, {} as Record<CategoryKey, number>)
    : ({} as Record<CategoryKey, number>);

  const sortedRiasec = Object.entries(normalized)
    .sort(([, a], [, b]) => b - a)
    .map(([k]) => k as CategoryKey);

  const primaryTrait = sortedRiasec[0] || CategoryKey.I;
  const secondaryTrait = sortedRiasec[1] || CategoryKey.A;

  // 2. Score 14 Eastern Star Archetypes based on RIASEC alignment
  const scoredArchetypes = EASTERN_ARCHETYPES.map(star => {
    let score = 0;
    if (star.matchingRiasec.includes(primaryTrait)) score += 60;
    if (star.matchingRiasec.includes(secondaryTrait)) score += 40;
    return { star, score };
  }).sort((a, b) => b.score - a.score);

  const dominantStar = scoredArchetypes[0]?.star || EASTERN_ARCHETYPES[0];
  const secondaryStar = scoredArchetypes[1]?.star;

  // 3. Determine Dominant Element Temperament
  let dominantElementKey: ElementType = dominantStar.element;
  if (birthYear) {
    // Can-Chi element approximation based on last digit of lunar birth year (Thập Can)
    const canElements: Record<number, ElementType> = {
      0: 'Kim', 1: 'Kim', // Canh, Tân
      2: 'Thuy', 3: 'Thuy', // Nhâm, Quý
      4: 'Moc', 5: 'Moc', // Giáp, Ất
      6: 'Hoa', 7: 'Hoa', // Bính, Đinh
      8: 'Tho', 9: 'Tho'  // Mậu, Kỷ
    };
    const lastDigit = birthYear % 10;
    if (canElements[lastDigit]) {
      dominantElementKey = canElements[lastDigit];
    }
  }

  const dominantElement = ELEMENT_TEMPERAMENTS[dominantElementKey] || ELEMENT_TEMPERAMENTS['Tho'];

  // 4. Generate Empathetic Academic Synthesis Narrative
  const synthesisNarrative = `
Hồ sơ của bạn mang đậm dấu ấn của nhóm khí chất "${dominantStar.groupNameVi}". 
Được dẫn dắt bởi hình tượng "${dominantStar.title}", bạn có thiên hướng tự nhiên về sự kết hợp giữa 
trí tuệ phân tích, tầm nhìn độc lập và khả năng tạo tác động tích cực lên môi trường xung quanh. 
Khí chất ${dominantElement.nameVi} tiếp thêm cho bạn phong cách làm việc "${dominantElement.keyword}".
  `.trim();

  const actionableInsights = {
    naturalTalent: `Thế mạnh vượt trội của bạn là: ${dominantStar.coreStrengths[0]}. Bạn phát huy rực rỡ nhất khi được đặt trong ${dominantStar.idealWorkEnvironments[0]}.`,
    shadowWork: `Điểm mù tâm lý cần lưu tâm: ${dominantStar.growthOpportunities[0]}. Khi chịu áp lực, ${dominantElement.stressResponse}`,
    growthStrategy: `Chiến lược phát triển: ${dominantStar.motto} Lời khuyên cân bằng: ${dominantElement.balanceAdvice}`
  };

  return {
    dominantStar,
    secondaryStar,
    dominantElement,
    synthesisNarrative,
    actionableInsights
  };
}
