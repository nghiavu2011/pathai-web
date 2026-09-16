import { CategoryKey } from '../../types';

export type ArchetypeGroup = 
  | 'tu_phu_vu_tuong' // Tử Phủ Vũ Tướng (Quản trị & Kiến tạo)
  | 'sat_pha_tham'     // Sát Phá Tham (Tiên phong & Đổi mới)
  | 'co_nguyet_dong_luong' // Cơ Nguyệt Đồng Lương (Nghiên cứu & Nhân văn)
  | 'cu_nhat';         // Cự Nhật (Khai phóng & Truyền thông)

export type ElementType = 'Kim' | 'Moc' | 'Thuy' | 'Hoa' | 'Tho';

export interface EasternStarArchetype {
  id: string;
  name: string; // e.g. "Tử Vi"
  title: string; // e.g. "Đế Tinh - Nhà Lãnh Đạo Kiến Tạo"
  group: ArchetypeGroup;
  groupNameVi: string;
  element: ElementType;
  jungianArchetype: string; // e.g. "The Ruler / The Leader"
  matchingRiasec: CategoryKey[]; // e.g. ['E', 'C']
  coreDescription: string;
  coreStrengths: string[];
  growthOpportunities: string[]; // Vùng cần hoàn thiện (không phán xét tiêu cực)
  idealWorkEnvironments: string[];
  representativeCareers: string[];
  motto: string; // Châm ngôn phát triển
}

export interface ElementTemperament {
  element: ElementType;
  nameVi: string;
  symbol: string;
  keyword: string;
  workStyle: string;
  communicationStyle: string;
  stressResponse: string;
  balanceAdvice: string;
}

export interface ArchetypeSynthesis {
  dominantStar: EasternStarArchetype;
  secondaryStar?: EasternStarArchetype;
  dominantElement: ElementTemperament;
  synthesisNarrative: string;
  actionableInsights: {
    naturalTalent: string;
    shadowWork: string; // Nhận diện điểm mù tâm lý
    growthStrategy: string;
  };
}
