import { describe, it, expect } from 'vitest';
import { generateCareerHypotheses } from '../data/engines/careerHypothesisEngine';
import { generateSubjectPlan } from '../data/engines/subjectPlannerEngine';
import { assessDoorClosingRisk } from '../data/engines/doorClosingRiskEngine';
import { matchUniversityPrograms } from '../data/engines/universityMatchingEngine';
import { evaluateExamStrategy } from '../data/engines/examStrategyEngine';
import { simulateScenarios } from '../data/engines/scenarioSimulatorEngine';
import { synthesizeEasternArchetype } from '../data/engines/archetypeEngine';
import { CategoryKey } from '../types';
import { CAREER_FAMILIES } from '../data/careerFamilies';
import { THPT_SUBJECTS } from '../data/subjects';

describe('PATHAI Decision System Engines Comprehensive Suite', () => {

  describe('1. Career Hypothesis Engine', () => {
    it('generates hypotheses with supporting, contradicting, and missing evidence', () => {
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
  });

  describe('2. Subject Planner Engine (CTGDPT 2018 / TT 13/2022)', () => {
    it('enforces compulsory core status for Lịch sử, Toán, Ngữ văn, Ngoại ngữ', () => {
      const plans = generateSubjectPlan(['engineering', 'cs-ai'], CAREER_FAMILIES);

      expect(plans.length).toBeGreaterThan(0);
      
      const historyPlan = plans.find(p => p.subjectId === 'su');
      expect(historyPlan).toBeDefined();
      expect(historyPlan?.importance).toBe('core_compulsory');
      expect(historyPlan?.subjectType).toBe('core');

      const mathPlan = plans.find(p => p.subjectId === 'toan');
      expect(mathPlan).toBeDefined();
      expect(mathPlan?.importance).toBe('core_compulsory');
      expect(mathPlan?.subjectType).toBe('core');
    });

    it('assigns learning priority levels (high, medium, low) to electives based on career relevance', () => {
      const plans = generateSubjectPlan(['engineering', 'cs-ai', 'architecture-design'], CAREER_FAMILIES);
      
      const informaticsPlan = plans.find(p => p.subjectId === 'tin');
      expect(informaticsPlan).toBeDefined();
      expect(informaticsPlan?.importance).toBe('learning_priority_high');

      const physicsPlan = plans.find(p => p.subjectId === 'ly');
      expect(physicsPlan).toBeDefined();
      expect(physicsPlan?.importance).toBe('learning_priority_medium');
    });
  });

  describe('3. Door Closing Risk & Optionality Engine', () => {
    it('flags high risk when dropping a critical elective subject like Physics for Engineering', () => {
      const riskAnalysis = assessDoorClosingRisk(
        'ly',
        ['engineering'],
        CAREER_FAMILIES,
        THPT_SUBJECTS
      );

      expect(riskAnalysis.overallRisk).toBe('high');
      expect(riskAnalysis.risks.length).toBeGreaterThan(0);
      expect(riskAnalysis.summary).toBeDefined();
      expect(riskAnalysis.droppedSubjectName).toBe('Vật lí');
    });

    it('warns correctly when student queries dropping a core compulsory subject (e.g. Lịch sử)', () => {
      const riskAnalysis = assessDoorClosingRisk(
        'su',
        ['engineering'],
        CAREER_FAMILIES,
        THPT_SUBJECTS
      );

      expect(riskAnalysis.summary).toContain('bắt buộc');
    });
  });

  describe('4. University Matching Engine (Strict Missing Data & No Fake Scores)', () => {
    it('handles missing scores strictly as ACADEMIC_DATA_MISSING with explore status and LOW confidence', () => {
      const matches = matchUniversityPrograms(
        { thptScores: {} },
        ['engineering', 'cs-ai']
      );

      expect(matches.length).toBeGreaterThan(0);
      matches.forEach(m => {
        expect(m.academicReadinessStatus).toBe('ACADEMIC_DATA_MISSING');
        expect(m.fitCategory).toBe('explore');
        expect(m.classificationConfidence).toBe('LOW');
        expect(m.estimatedMargin).toBeUndefined();
      });
    });

    it('computes accurate margins and fit categories when real scores are supplied', () => {
      const matches = matchUniversityPrograms(
        {
          thptScores: { toan: 9.0, ly: 9.0, hoa: 8.5 },
          tsaScore: 82,
          ieltsScore: 7.0
        },
        ['engineering', 'cs-ai']
      );

      expect(matches.length).toBeGreaterThan(0);
      const firstMatch = matches[0];
      expect(firstMatch.academicReadinessStatus).toBe('SUFFICIENT_DATA');
      expect(['safe', 'target', 'dream', 'explore']).toContain(firstMatch.fitCategory);
      expect(firstMatch.classificationConfidence).toBe('HIGH');
      expect(firstMatch.program.lastVerified).toBe('2026-03-01');
    });
  });

  describe('5. Exam Strategy Engine (6 Distinct Examinations & Categorical ROI)', () => {
    it('evaluates all 6 exams (THPT, TSA, HSA, DGNL HCM, IELTS, SAT) with categorical ROI', () => {
      const analyses = evaluateExamStrategy(
        {
          thptScores: { toan: 8.5, ly: 8.5, hoa: 8.0 },
          tsaScore: 75,
          hsaScore: 90,
          dgnlHcmScore: 800,
          ieltsScore: 6.5,
          satScore: 1350
        },
        ['engineering', 'cs-ai']
      );

      expect(analyses.length).toBe(6);
      
      const examNames = analyses.map(a => a.exam);
      expect(examNames).toContain('thpt');
      expect(examNames).toContain('tsa');
      expect(examNames).toContain('hsa');
      expect(examNames).toContain('dgnl_hcm');
      expect(examNames).toContain('ielts');
      expect(examNames).toContain('sat');

      analyses.forEach(analysis => {
        expect(['High', 'Medium', 'Low', 'Unknown']).toContain(analysis.roiLevel);
        expect(analysis.roiLevelLabel).toBeDefined();
        expect(analysis.opportunityGainProgramsCount).toBeGreaterThanOrEqual(0);
      });
    });

    it('distinguishes HSA (ĐHQGHN) and DGNL HCM (ĐHQG-HCM) with distinct targets', () => {
      const analyses = evaluateExamStrategy({ thptScores: {} }, ['cs-ai']);
      
      const hsa = analyses.find(a => a.exam === 'hsa');
      const dgnlHcm = analyses.find(a => a.exam === 'dgnl_hcm');

      expect(hsa).toBeDefined();
      expect(dgnlHcm).toBeDefined();
      expect(hsa?.examName).toContain('HSA');
      expect(dgnlHcm?.examName).toContain('ĐHQG TP.HCM');
    });
  });

  describe('6. Scenario Simulator Engine', () => {
    it('flags hypothetical baseline when user scores are missing', () => {
      const scenarios = simulateScenarios({ thptScores: {} }, ['engineering', 'cs-ai']);

      expect(scenarios.length).toBeGreaterThan(0);
      scenarios.forEach(sc => {
        expect(sc.isHypotheticalBaseline).toBe(true);
        expect(sc.marginalGainSummary).toBeDefined();
      });
    });

    it('computes real baseline transitions when scores are provided', () => {
      const scenarios = simulateScenarios(
        {
          thptScores: { toan: 7.5, ly: 7.5, hoa: 7.0 },
          tsaScore: 62,
          ieltsScore: 5.5
        },
        ['engineering', 'cs-ai']
      );

      expect(scenarios.length).toBeGreaterThan(0);
      const tsaScenario = scenarios.find(s => s.parameterName.includes('TSA'));
      expect(tsaScenario).toBeDefined();
      expect(tsaScenario?.isHypotheticalBaseline).toBe(false);
    });
  });

  describe('7. Cultural Archetype Reflection Engine', () => {
    it('synthesizes cultural reflection without fake scientific coupling', () => {
      const synthesis = synthesizeEasternArchetype({
        riasecScores: {
          [CategoryKey.R]: 22,
          [CategoryKey.I]: 25,
          [CategoryKey.A]: 12,
          [CategoryKey.S]: 14,
          [CategoryKey.E]: 8,
          [CategoryKey.C]: 16
        },
        birthYear: 2009
      });

      expect(synthesis.dominantStar).toBeDefined();
      expect(synthesis.dominantElement).toBeDefined();
      expect(synthesis.synthesisNarrative).toBeDefined();
      expect(synthesis.actionableInsights.naturalTalent).toBeDefined();
      // Verify no fake riasecAlignmentScore field
      expect((synthesis as any).riasecAlignmentScore).toBeUndefined();
    });
  });
});

