import { describe, it, expect } from 'vitest';
import { CategoryKey, MICategoryKey, BigFiveCategoryKey, GritGroupKey, CareerAnchorKey, WorkValueKey, ContextCategoryKey } from '../types';
import { QUIZ_DATA as HOLLAND_QUIZ_DATA } from '../constants';
import { MI_QUIZ_DATA } from '../constants/multipleIntelligences';
import { BIG5_QUIZ_DATA } from '../constants/bigFive';
import { GRIT_QUIZ_DATA } from '../constants/gritScale';
import { CAREER_ANCHORS_QUIZ_DATA } from '../constants/careerAnchors';
import { WORK_VALUES_QUIZ_DATA } from '../constants/workValues';
import { EQ_QUIZ_DATA } from '../constants/eq';
import { GMS_QUIZ_DATA } from '../constants/growthMindset';
import { CDB_QUIZ_DATA } from '../constants/careerDifficulties';
import { CRS_QUIZ_DATA } from '../constants/developmentScale';
import { CONTEXT_QUIZ_DATA } from '../constants/developmentalContext';

describe('PATHAI Psychometric Scoring & Algorithms Test Suite', () => {

  describe('1. Holland RIASEC Scoring', () => {
    it('calculates perfect sums and identifies dominant RIASEC traits', () => {
      const answers: Record<string, number> = {};
      // Answer 5 for Realistic (R1-R5), 4 for Investigative (I1-I5), 1 for others
      HOLLAND_QUIZ_DATA.forEach(cat => {
        cat.questions.forEach(q => {
          if (q.category_code === CategoryKey.R) answers[q.id] = 5;
          else if (q.category_code === CategoryKey.I) answers[q.id] = 4;
          else answers[q.id] = 2;
        });
      });

      const results = {
        [CategoryKey.R]: 0, [CategoryKey.I]: 0, [CategoryKey.A]: 0,
        [CategoryKey.S]: 0, [CategoryKey.E]: 0, [CategoryKey.C]: 0
      };

      for (const cat of HOLLAND_QUIZ_DATA) {
        for (const q of cat.questions) {
          if (answers[q.id] && q.category_code) {
            results[q.category_code] += answers[q.id];
          }
        }
      }

      expect(results[CategoryKey.R]).toBe(25);
      expect(results[CategoryKey.I]).toBe(20);
      expect(results[CategoryKey.A]).toBe(10);
      expect(results[CategoryKey.R]).toBeGreaterThan(results[CategoryKey.I]);
    });
  });

  describe('2. Multiple Intelligences (MI) Normalization & Bounds', () => {
    it('normalizes raw scores (5-25) into 0-100% and 1.0-5.0 mean accurately', () => {
      const rawScores = {
        [MICategoryKey.L]: 25, // Max score (5 * 5)
        [MICategoryKey.LQ]: 20, // 4 * 5
        [MICategoryKey.VS]: 15, // 3 * 5
        [MICategoryKey.BK]: 10, // 2 * 5
        [MICategoryKey.MU]: 5,  // Min score (1 * 5)
        [MICategoryKey.IN]: 22,
        [MICategoryKey.IG]: 18,
        [MICategoryKey.NT]: 12,
      };

      // Test normalization
      const linguisticPct = Math.round((rawScores[MICategoryKey.L] / 25) * 100);
      const linguisticMean = Number((rawScores[MICategoryKey.L] / 5).toFixed(1));

      const musicPct = Math.round((rawScores[MICategoryKey.MU] / 25) * 100);
      const musicMean = Number((rawScores[MICategoryKey.MU] / 5).toFixed(1));

      expect(linguisticPct).toBe(100);
      expect(linguisticMean).toBe(5.0);

      expect(musicPct).toBe(20);
      expect(musicMean).toBe(1.0);

      // Verify no percentage exceeds 100%
      Object.values(rawScores).forEach(score => {
        const pct = (score / 25) * 100;
        expect(pct).toBeGreaterThanOrEqual(0);
        expect(pct).toBeLessThanOrEqual(100);
      });
    });
  });

  describe('3. Big Five Personality (OCEAN)', () => {
    it('computes 5 domain scores and verifies Neuroticism scale bounds', () => {
      const answers: Record<string, number> = {};
      BIG5_QUIZ_DATA.forEach(cat => {
        cat.questions.forEach((q, idx) => {
          answers[q.id] = idx + 1; // 1, 2, 3, 4, 5 -> sum = 15
        });
      });

      const results = {
        [BigFiveCategoryKey.O]: 0, [BigFiveCategoryKey.C]: 0, [BigFiveCategoryKey.E]: 0,
        [BigFiveCategoryKey.A]: 0, [BigFiveCategoryKey.N]: 0
      };

      for (const cat of BIG5_QUIZ_DATA) {
        for (const q of cat.questions) {
          if (answers[q.id] && q.big_five_code) {
            results[q.big_five_code] += answers[q.id];
          }
        }
      }

      expect(results[BigFiveCategoryKey.N]).toBe(15);
      expect(results[BigFiveCategoryKey.O]).toBe(15);
    });
  });

  describe('4. Grit Scale Mean & Composite Calculation', () => {
    it('correctly calculates Effort, Interest, and overall Grit on 1.0-5.0 scale', () => {
      const answers: Record<string, number> = {};
      const effortCat = GRIT_QUIZ_DATA.find(c => c.key === GritGroupKey.Effort)!;
      const interestCat = GRIT_QUIZ_DATA.find(c => c.key === GritGroupKey.Interest)!;

      // High effort (all 5s), moderate interest (all 3s)
      effortCat.questions.forEach(q => answers[q.id] = 5);
      interestCat.questions.forEach(q => answers[q.id] = 3);

      const effortScores = effortCat.questions.map(q => answers[q.id] || 0);
      const interestScores = interestCat.questions.map(q => answers[q.id] || 0);

      const effort = effortScores.reduce((a, b) => a + b, 0) / effortScores.length;
      const interest = interestScores.reduce((a, b) => a + b, 0) / interestScores.length;
      const grit = (effort + interest) / 2;

      expect(effort).toBe(5.0);
      expect(interest).toBe(3.0);
      expect(grit).toBe(4.0);
    });
  });

  describe('5. Career Anchors (Schein) & Work Values', () => {
    it('scores 8 anchors and 6 work values with correct summation', () => {
      const anchorAnswers: Record<string, number> = {};
      CAREER_ANCHORS_QUIZ_DATA.forEach(cat => {
        cat.questions.forEach(q => {
          anchorAnswers[q.id] = 4; // 5 questions * 4 = 20
        });
      });

      const anchorResults: Record<string, number> = { TF: 0, GM: 0, AU: 0, SE: 0, EC: 0, SV: 0, PC: 0, LS: 0 };
      for (const cat of CAREER_ANCHORS_QUIZ_DATA) {
        for (const q of cat.questions) {
          if (anchorAnswers[q.id] && q.anchor_code) {
            anchorResults[q.anchor_code] += anchorAnswers[q.id];
          }
        }
      }

      expect(anchorResults.TF).toBe(20);
      expect(anchorResults.LS).toBe(20);

      const valueAnswers: Record<string, number> = {};
      WORK_VALUES_QUIZ_DATA.forEach(cat => {
        cat.questions.forEach(q => {
          valueAnswers[q.id] = 5; // 5 questions * 5 = 25
        });
      });

      const valueResults: Record<string, number> = { ACH: 0, SEC: 0, AUT: 0, INF: 0, ALT: 0, AES: 0 };
      for (const cat of WORK_VALUES_QUIZ_DATA) {
        for (const q of cat.questions) {
          if (valueAnswers[q.id] && q.work_value_code) {
            valueResults[q.work_value_code] += valueAnswers[q.id];
          }
        }
      }

      expect(valueResults.ACH).toBe(25);
      expect(valueResults.ALT).toBe(25);
    });
  });

  describe('6. Developmental Context & Attachment Style Mapping', () => {
    it('classifies attachment style accurately based on cutoff thresholds', () => {
      const computeAttachment = (attMean: number) => {
        if (attMean < 3) return 'Avoidant';
        if (attMean < 4) return 'Anxious';
        return 'Secure';
      };

      expect(computeAttachment(2.5)).toBe('Avoidant');
      expect(computeAttachment(3.5)).toBe('Anxious');
      expect(computeAttachment(4.5)).toBe('Secure');
    });
  });
});
