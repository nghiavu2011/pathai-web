import { describe, it, expect } from 'vitest';
import { generateCareerHypotheses } from '../data/engines/careerHypothesisEngine';
import { generateSubjectPlan } from '../data/engines/subjectPlannerEngine';
import { assessDoorClosingRisk } from '../data/engines/doorClosingRiskEngine';
import { matchUniversityPrograms } from '../data/engines/universityMatchingEngine';
import { evaluateExamStrategy } from '../data/engines/examStrategyEngine';
import { CategoryKey } from '../types';
import { CAREER_FAMILIES } from '../data/careerFamilies';
import { THPT_SUBJECTS } from '../data/subjects';

describe('PATHAI Decision System Engines Suite', () => {

  it('Career Hypothesis Engine generates hypotheses with evidence and caveats', () => {
    const hypotheses = generateCareerHypotheses({
      studentId: 'test-student',
      riasecScores: {
        [CategoryKey.R]: 25,
        [CategoryKey.I]: 24,
        [CategoryKey.A]: 10,
        [CategoryKey.S]: 12,
        [CategoryKey.E]: 8,
        [CategoryKey.C]: 14,
      }
    });

    expect(hypotheses.length).toBeGreaterThan(0);
    const topHypothesis = hypotheses[0];
    expect(topHypothesis.careerFamilyId).toBeDefined();
    expect(topHypothesis.supportingEvidence.length).toBeGreaterThan(0);
    expect(topHypothesis.missingEvidence.length).toBeGreaterThan(0);
  });

  it('Subject Planner Engine suggests subject recommendations for target career families', () => {
    const plans = generateSubjectPlan(['engineering', 'cs-ai'], CAREER_FAMILIES);

    expect(plans.length).toBeGreaterThan(0);
    const mathOrPhysics = plans.find(p => p.subjectId === 'toan' || p.subjectId === 'vat_ly');
    expect(mathOrPhysics).toBeDefined();
    expect(mathOrPhysics?.importance).toBeDefined();
  });

  it('Door Closing Risk Engine flags risks when critical subjects are dropped', () => {
    const riskAnalysis = assessDoorClosingRisk(
      'ly',
      ['engineering'],
      CAREER_FAMILIES,
      THPT_SUBJECTS
    );

    expect(riskAnalysis.overallRisk).toBeDefined();
    expect(riskAnalysis.risks.length).toBeGreaterThan(0);
    expect(riskAnalysis.summary).toBeDefined();
  });

  it('University Matching Engine matches target programs and computes margin analysis', () => {
    const matches = matchUniversityPrograms(
      {
        thptScores: { toan: 8.5, ly: 8.5, hoa: 8.0, anh: 7.5 },
        tsaScore: 75,
        ieltsScore: 6.5
      },
      ['engineering', 'cs-ai']
    );

    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0].program).toBeDefined();
    expect(matches[0].fitCategory).toBeDefined();
  });

  it('Exam Strategy Engine evaluates multiple admission exams (THPT, TSA, HSA, SAT)', () => {
    const analyses = evaluateExamStrategy(
      {
        thptScores: { toan: 8.5, ly: 8.5, hoa: 8.0 },
        tsaScore: 75
      },
      ['engineering', 'cs-ai']
    );

    expect(analyses.length).toBeGreaterThan(0);
    const thptAnalysis = analyses.find(a => a.exam === 'thpt');
    expect(thptAnalysis).toBeDefined();
    expect(thptAnalysis?.priority).toBe('Core');
  });
});
