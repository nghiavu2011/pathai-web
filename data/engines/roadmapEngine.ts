import { Grade, GradePhase, GRADE_PHASES } from '../types/student';
import { CareerFamily } from '../types/career';

export interface RoadmapActionItem {
  id: string;
  timeframe: '30_days' | '90_days' | 'semester';
  title: string;
  description: string;
  category: 'academic' | 'exploration' | 'experiment' | 'skill';
  status: 'pending' | 'completed';
  relatedCareerFamily?: string;
}

export interface StudentRoadmap {
  grade: Grade;
  phase: GradePhase;
  phaseLabel: string;
  focusQuestion: string;
  actions: RoadmapActionItem[];
}

export function generateRoadmap(
  grade: Grade,
  targetFamilies: CareerFamily[]
): StudentRoadmap {
  const phaseInfo = GRADE_PHASES[grade] || GRADE_PHASES[9];
  const actions: RoadmapActionItem[] = [];

  if (grade === 9) {
    actions.push({
      id: 'g9-30d-1',
      timeframe: '30_days',
      title: 'Đánh giá lại kết quả học tập Toán & Ngữ văn',
      description: 'Kiểm tra điểm trung bình môn học kỳ gần nhất để nhận diện thế mạnh tự nhiên.',
      category: 'academic',
      status: 'pending'
    });

    if (targetFamilies.length > 0) {
      const topFamily = targetFamilies[0];
      actions.push({
        id: 'g9-30d-2',
        timeframe: '30_days',
        title: `Tìm hiểu 1 dự án thực tế về ${topFamily.name}`,
        description: `Xem video hoặc đọc bài viết về công việc hàng ngày của người làm trong ${topFamily.name}.`,
        category: 'exploration',
        status: 'pending',
        relatedCareerFamily: topFamily.name
      });
    }

    actions.push({
      id: 'g9-90d-1',
      timeframe: '90_days',
      title: 'Xác định tổ hợp môn tự chọn lớp 10',
      description: 'Sử dụng công cụ Door Closing Risk để kiểm tra không đóng quá nhiều cánh cửa trước khi nộp đăng ký.',
      category: 'academic',
      status: 'pending'
    });

    if (targetFamilies.length > 1) {
      const secondFamily = targetFamilies[1];
      actions.push({
        id: 'g9-90d-2',
        timeframe: '90_days',
        title: `Thử nghiệm mini: Trải nghiệm kỹ năng của ${secondFamily.name}`,
        description: `Thực hiện một bài tập thực hành nhỏ (mini-project) trong nhóm ngành ${secondFamily.name}.`,
        category: 'experiment',
        status: 'pending',
        relatedCareerFamily: secondFamily.name
      });
    }

    actions.push({
      id: 'g9-sem-1',
      timeframe: 'semester',
      title: 'Cập nhật lại Passport & Đánh giá mức độ hài lòng',
      description: 'Sau khi hoàn thành học kỳ, cập nhật điểm số và xem xét sự thay đổi về sở thích nghề nghiệp.',
      category: 'skill',
      status: 'pending'
    });
  } else {
    actions.push({
      id: `g${grade}-30d-1`,
      timeframe: '30_days',
      title: 'Xác thực mục tiêu học tập theo nhóm ngành',
      description: 'Tập trung củng cố các môn then chốt phục vụ xét tuyển.',
      category: 'academic',
      status: 'pending'
    });
  }

  return {
    grade,
    phase: phaseInfo.phase,
    phaseLabel: phaseInfo.label,
    focusQuestion: phaseInfo.question,
    actions
  };
}
