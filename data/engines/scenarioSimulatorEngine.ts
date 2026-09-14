import { StudentScoreProfile, ProgramMatchResult } from '../types/admissions';
import { matchUniversityPrograms } from './universityMatchingEngine';

export interface ScoreDeltaScenario {
  parameterName: string; // e.g. "Tăng điểm TSA (+8 điểm)", "Tăng IELTS (+0.5 band)", "Tăng Toán THPT (+0.8 điểm)"
  modifiedProfile: StudentScoreProfile;
  dreamToTargetCount: number;
  targetToSafeCount: number;
  newlyUnlockedPrograms: string[];
  effortRequired: 'Low' | 'Medium' | 'High';
  marginalGainSummary: string;
}

export function simulateScenarios(
  baseProfile: StudentScoreProfile,
  targetCareerFamilyIds: string[]
): ScoreDeltaScenario[] {
  const baseMatches = matchUniversityPrograms(baseProfile, targetCareerFamilyIds);
  const baseMap = new Map<string, ProgramMatchResult>(baseMatches.map(m => [m.program.id, m]));

  const scenarios: ScoreDeltaScenario[] = [];

  // Scenario 1: Boost TSA by +8 points (e.g. 68 -> 76)
  const currentTsa = baseProfile.tsaScore || 68;
  const boostedTsaProfile: StudentScoreProfile = {
    ...baseProfile,
    tsaScore: Math.min(100, currentTsa + 8)
  };
  const tsaMatches = matchUniversityPrograms(boostedTsaProfile, targetCareerFamilyIds);
  scenarios.push(calculateDelta(
    `Tăng điểm TSA (+8 điểm: ${currentTsa} ➔ ${boostedTsaProfile.tsaScore})`,
    boostedTsaProfile,
    baseMap,
    tsaMatches,
    'Medium'
  ));

  // Scenario 2: Boost IELTS by +0.5 (e.g. 6.0 -> 6.5 or 6.5 -> 7.0)
  const currentIelts = baseProfile.ieltsScore || 6.0;
  const boostedIeltsProfile: StudentScoreProfile = {
    ...baseProfile,
    ieltsScore: Math.min(9.0, currentIelts + 0.5)
  };
  const ieltsMatches = matchUniversityPrograms(boostedIeltsProfile, targetCareerFamilyIds);
  scenarios.push(calculateDelta(
    `Nâng band IELTS (+0.5 band: ${currentIelts} ➔ ${boostedIeltsProfile.ieltsScore})`,
    boostedIeltsProfile,
    baseMap,
    ieltsMatches,
    'Medium'
  ));

  // Scenario 3: Boost Math THPT by +0.8 (e.g. 8.0 -> 8.8)
  const currentMath = baseProfile.thptScores['toan'] || 8.0;
  const boostedMathProfile: StudentScoreProfile = {
    ...baseProfile,
    thptScores: {
      ...baseProfile.thptScores,
      toan: Math.min(10, currentMath + 0.8)
    }
  };
  const mathMatches = matchUniversityPrograms(boostedMathProfile, targetCareerFamilyIds);
  scenarios.push(calculateDelta(
    `Bứt phá môn Toán THPT (+0.8 điểm: ${currentMath} ➔ ${boostedMathProfile.thptScores['toan']})`,
    boostedMathProfile,
    baseMap,
    mathMatches,
    'Medium'
  ));

  return scenarios;
}

function calculateDelta(
  name: string,
  profile: StudentScoreProfile,
  baseMap: Map<string, ProgramMatchResult>,
  newMatches: ProgramMatchResult[],
  effort: 'Low' | 'Medium' | 'High'
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
    ? `Giúp chuyển đổi ${dreamToTarget} ngành từ Thử thách sang Mục tiêu và ${targetToSafe} ngành sang An toàn.`
    : 'Cải thiện biên độ an toàn tổng thể của các ngành hiện tại.';

  return {
    parameterName: name,
    modifiedProfile: profile,
    dreamToTargetCount: dreamToTarget,
    targetToSafeCount: targetToSafe,
    newlyUnlockedPrograms: newlyUnlocked,
    effortRequired: effort,
    marginalGainSummary: summary
  };
}
