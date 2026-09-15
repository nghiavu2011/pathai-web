// Career Taxonomy — The career universe for Vietnamese students
// Career Hypothesis — Not "matching" but "hypotheses to test"

import type { ConfidenceLevel } from './student';

export interface CareerFamily {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  icon: string; // emoji
  relatedRIASEC: string[]; // e.g., ['R', 'I']
  relatedWorkValues: string[];
  keySubjects: string[]; // THPT subjects important for this family
  sampleOccupations: string[];
  sampleMajors: string[];
}

export interface CareerHypothesis {
  id: string;
  studentId: string;
  careerFamilyId: string;
  status: 'exploring' | 'promising' | 'unlikely' | 'confirmed';
  confidence: ConfidenceLevel;
  supportingEvidence: string[]; // evidence IDs
  contradictingEvidence: string[]; // evidence IDs
  missingEvidence: string[]; // descriptions of what's needed
  nextExperiment?: string;
  createdAt: number;
  updatedAt: number;
}
