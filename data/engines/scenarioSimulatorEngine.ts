import { StudentScoreProfile, ProgramMatchResult } from '../types/admissions';
import { matchUniversityPrograms } from './universityMatchingEngine';

export interface ScoreDeltaScenario {
  parameterName: string; // e.g. "Tăng điểm TSA (+8 điểm)", "Tăng IELTS (+0.5 band)", "Tăng Toán THPT (+0.8 điểm)"
  modifiedProfile: StudentScoreProfile;
  dreamToTargetCount: number;
  targetToSafeCount: number;
  newlyUnlockedPrograms: string[];
  effortRequired: 'Low' | 'Medium' | 'High';
  isHypotheticalBaseline: boolean;
  marginalGainSummary: string;
}

export function simulateScenarios(
  baseProfile: StudentScoreProfile,
  targetCareerFamilyIds: string[]
): ScoreDeltaScenario[] {
  const baseMatches = matchUniversityPrograms(baseProfile, targetCareerFamilyIds);
  const baseMap = new Map<string, ProgramMatchResult>(baseMatches.map(m => [m.program.id, m]));

  const scenarios: ScoreDeltaScenario[] = [];

  // Scenario 1: Boost TSA by +8 points
  const hasActualTsa = baseProfile.tsaScore !== undefined && baseProfile.tsaScore !== null;
  const currentTsa = hasActualTsa ? (baseProfile.tsaScore as number) : 65;
  const boostedTsaProfile: StudentScoreProfile = {
    ...baseProfile,
    tsaScore: Math.min(100, currentTsa + 8)
  };
  const tsaMatches = matchUniversityPrograms(boostedTsaProfile, targetCareerFamilyIds);
  scenarios.push(calculateDelta(
    hasActualTsa
      ? `Bứt phá TSA (+8 điểm: ${currentTsa} ➔ ${boostedTsaProfile.tsaScore}đ)`
      : `Mô phỏng kỳ vọng TSA (+8 điểm giả định: 65 ➔ 73đ)`,
    boostedTsaProfile,
    baseMap,
    tsaMatches,
    'Medium',
    !hasActualTsa
  ));

  // Scenario 2: Boost IELTS by +0.5
  const hasActualIelts = baseProfile.ieltsScore !== undefined && baseProfile.ieltsScore !== null;
  const currentIelts = hasActualIelts ? (baseProfile.ieltsScore as number) : 6.0;
  const boostedIeltsProfile: StudentScoreProfile = {
    ...baseProfile,
    ieltsScore: Math.min(9.0, currentIelts + 0.5)
  };
  const ieltsMatches = matchUniversityPrograms(boostedIeltsProfile, targetCareerFamilyIds);
  scenarios.push(calculateDelta(
    hasActualIelts
      ? `Nâng band IELTS (+0.5 band: ${currentIelts} ➔ ${boostedIeltsProfile.ieltsScore})`
      : `Mô phỏng kỳ vọng IELTS (+0.5 band giả định: 6.0 ➔ 6.5)`,
    boostedIeltsProfile,
    baseMap,
    ieltsMatches,
    'Medium',
    !hasActualIelts
  ));

  // Scenario 3: Boost Math THPT by +0.8
  const hasActualMath = baseProfile.thptScores && baseProfile.thptScores['toan'] !== undefined;
  const currentMath = hasActualMath ? baseProfile.thptScores['toan'] : 7.5;
  const boostedMathProfile: StudentScoreProfile = {
    ...baseProfile,
    thptScores: {
      ...(baseProfile.thptScores || {}),
      toan: Math.min(10, currentMath + 0.8)
    }
  };
  const mathMatches = matchUniversityPrograms(boostedMathProfile, targetCareerFamilyIds);
  scenarios.push(calculateDelta(
    hasActualMath
      ? `Bứt phá môn Toán THPT (+0.8 điểm: ${currentMath} ➔ ${boostedMathProfile.thptScores['toan']})`
      : `Mô phỏng kỳ vọng môn Toán (+0.8 điểm giả định: 7.5 ➔ 8.3)`,
    boostedMathProfile,
    baseMap,
    mathMatches,
    'Medium',
    !hasActualMath
  ));

  return scenarios;
}

function calculateDelta(
  name: string,
  profile: StudentScoreProfile,
  baseMap: Map<string, ProgramMatchResult>,
  newMatches: ProgramMatchResult[],
  effort: 'Low' | 'Medium' | 'High',
  isHypothetical: boolean
): ScoreDeltaScenario {
  let dreamToTarget = 0;
  let targetToSafe = 0;
  const newlyUnlocked: string[] = [];

  for (const newM of newMatches) {
    const oldM = baseMap.get(newM.program.id);
    if (!oldM) continue;

    if (oldM.fitCategory === 'dream' && newM.fitCategory === 'target') {
      dreamToTarget++;
      newlyUnlocked.push(`${newM.university.shortName} - ${newM.program.programName} (Dream ➔ Target)`);
    } else if (oldM.fitCategory === 'target' && newM.fitCategory === 'safe') {
      targetToSafe++;
      newlyUnlocked.push(`${newM.university.shortName} - ${newM.program.programName} (Target ➔ Safe)`);
    } else if (oldM.fitCategory === 'explore' && (newM.fitCategory === 'target' || newM.fitCategory === 'safe')) {
      newlyUnlocked.push(`${newM.university.shortName} - ${newM.program.programName} (Mở khóa cơ hội mới)`);
    }
  }

  const totalImpact = dreamToTarget + targetToSafe;
  const summary = totalImpact > 0
    ? `Mở rộng biên độ an toàn, chuyển dịch ${dreamToTarget} ngành sang Mục tiêu và ${targetToSafe} ngành sang An toàn.`
    : 'Cải thiện chỉ số cạnh tranh học thuật tổng thể.';

  return {
    parameterName: name,
    modifiedProfile: profile,
    dreamToTargetCount: dreamToTarget,
    targetToSafeCount: targetToSafe,
    newlyUnlockedPrograms: newlyUnlocked,
    effortRequired: effort,
    isHypotheticalBaseline: isHypothetical,
    marginalGainSummary: summary
  };
}
