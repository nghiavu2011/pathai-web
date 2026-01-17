
// FIX: Import React to use React.ComponentType
import React from 'react';

export interface Step {
  id: number;
  title: string;
}

export interface Question {
  id: string;
  text: string;
  category_code?: CategoryKey;
  cdb_code?: CDBBarrierKey;
  grit_group_code?: GritGroupKey;
  mi_code?: MICategoryKey;
  crs_code?: CRSCategoryKey;
  gms_code?: GrowthMindsetCategoryKey;
  anchor_code?: CareerAnchorKey;
  work_value_code?: WorkValueKey;
  context_code?: ContextCategoryKey;
  big_five_code?: BigFiveCategoryKey;
  wheel_code?: WheelCategoryKey;
  eq_code?: EQCategoryKey;
}

export interface QuizCategory {
  key: CategoryKey;
  title: string;
  subtitle: string;
  questions: Question[];
}

export type Answers = Record<string, number>;

export enum CategoryKey {
  R = 'R', // Realistic
  I = 'I', // Investigative
  A = 'A', // Artistic
  S = 'S', // Social
  E = 'E', // Enterprising
  C = 'C', // Conventional
}

export type Results = Record<CategoryKey, number>;

export interface ResultDetail {
  name: string;
  description: string;
  careers: { name: string }[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  isAvailable?: boolean;
  component: React.ComponentType<any>;
}

export interface Introduction {
  title: string;
  main_description: string;
  theory_details?: {
    title: string;
    content: string;
    source: string;
  };
  guidance: {
    before: string[];
    during: string[];
    note: string;
  }
}

// Career Difficulties Barrier
export enum CDBBarrierKey {
  A = 'A', // Thiếu tự nhận thức
  B = 'B', // Thiếu thông tin nghề
  C = 'C', // Khó ra quyết định
  D = 'D', // Ảnh hưởng bên ngoài
  E = 'E', // Thiếu kỹ năng nghề
}
export type CDBResults = Record<CDBBarrierKey, number>;

// Grit Scale
export enum GritGroupKey {
  Effort = 'Effort',
  Interest = 'Interest',
}
export interface GritResults {
  grit: number;
  effort: number;
  interest: number;
}

// Multiple Intelligences
export enum MICategoryKey {
  L = 'L',
  LQ = 'LQ',
  VS = 'VS',
  BK = 'BK',
  MU = 'MU',
  IN = 'IN',
  IG = 'IG',
  NT = 'NT',
}
export interface MIResultDetail {
  key: MICategoryKey;
  name: string;
  description: string;
  score: number;
}
export interface MICategory {
  key: MICategoryKey;
  title: string;
  questions: Question[];
}
export type MIResults = Record<MICategoryKey, number>;

// Career Readiness Scale (Development Scale)
export enum CRSCategoryKey {
  SU = 'SU', // Self-Understanding
  DM = 'DM', // Career Decision-Making
  SS = 'SS', // Social & Employability Skills
  CP = 'CP', // Career Planning
  AD = 'AD', // Career Adaptability
}
export interface CRSResults {
  scores: Record<CRSCategoryKey, number>;
  average: number;
}

// Growth Mindset Scale
export enum GrowthMindsetCategoryKey {
  CH = 'CH', // Belief in Changeability
  FB = 'FB', // Response to Failure & Feedback
  PL = 'PL', // Persistence in Learning
  AD = 'AD', // Adaptability & Openness
}
export interface GrowthMindsetResults {
  scores: Record<GrowthMindsetCategoryKey, number>;
  growth_mindset: number;
}

// Career Anchors
export enum CareerAnchorKey {
  TF = 'TF', // Technical/Functional Competence
  GM = 'GM', // General Managerial Competence
  AU = 'AU', // Autonomy/Independence
  SE = 'SE', // Security/Stability
  EC = 'EC', // Entrepreneurial Creativity
  SV = 'SV', // Service/Dedication to a Cause
  PC = 'PC', // Pure Challenge
  LS = 'LS', // Lifestyle
}
export interface CareerAnchorResult {
  key: CareerAnchorKey;
  name: string;
  score: number;
}
export type CareerAnchorResults = Record<CareerAnchorKey, number>;

// Work Values
export enum WorkValueKey {
  ACH = 'ACH', // Achievement
  SEC = 'SEC', // Security
  AUT = 'AUT', // Autonomy
  INF = 'INF', // Influence
  ALT = 'ALT', // Altruism
  AES = 'AES', // Aesthetic
}
export type WorkValuesResults = Record<WorkValueKey, number>;

// Developmental Context Profile
export enum ContextCategoryKey {
  ATT = 'ATT', // Attachment Style (Gắn bó)
  AUT = 'AUT', // Autonomy & Basic Trust (Tự chủ & Niềm tin)
  ENV = 'ENV', // Environmental Stability (Ổn định môi trường)
  HLT = 'HLT', // Foundational Health (Sức khỏe nền tảng)
}
export interface ContextResults {
  scores: Record<ContextCategoryKey, number>;
  attachmentStyle: string; // "Secure", "Anxious", "Avoidant"
}

// Big Five Personality (OCEAN)
export enum BigFiveCategoryKey {
  O = 'O', // Openness
  C = 'C', // Conscientiousness
  E = 'E', // Extraversion
  A = 'A', // Agreeableness
  N = 'N', // Neuroticism
}
export type BigFiveResults = Record<BigFiveCategoryKey, number>;

// Wheel of Life
export enum WheelCategoryKey {
  CAREER = 'CAREER',
  FINANCE = 'FINANCE',
  HEALTH = 'HEALTH',
  FAMILY = 'FAMILY',
  RELATIONSHIP = 'RELATIONSHIP',
  GROWTH = 'GROWTH',
  FUN = 'FUN',
  SPIRIT = 'SPIRIT',
}
export type WheelResults = Record<WheelCategoryKey, number>;

// EQ (Emotional Intelligence)
export enum EQCategoryKey {
  SA = 'SA', // Self-Awareness
  SR = 'SR', // Self-Regulation
  MO = 'MO', // Motivation
  EM = 'EM', // Empathy
  SS = 'SS', // Social Skills
}
export type EQResults = Record<EQCategoryKey, number>;

export interface UserData {
  fullName: string;
  email: string;
  phone?: string;
  birthYear: string;
  gender: string;
  location: string;
  status: string; // Current status (student, employee, etc.)
  educationLevel: string; // Trình độ học vấn
  source: string; // Where did they hear about us
  expectations: string; // What do they want from the app
  birthOrder?: string; // New: Thứ tự sinh
  maritalStatus?: string; // New: TÌnh trạng hôn nhân
  sexualOrientation?: string; // New: Xu hướng tính dục
  bio?: string; // New: Đôi điều về bản thân
  avatarUrl?: string; // For Gmail avatar simulation
  uid?: string; // Firebase Authentication UID
}

export interface QuizHistoryEntry {
  id: string;
  quizId: string;
  quizTitle: string;
  timestamp: number;
  userData: UserData;
  results: any;
  answers: Answers;
}

export interface Goal {
  id: string;
  quizId: string;
  quizTitle: string;
  text: string;
  status: 'todo' | 'completed';
  createdAt: number;
}
