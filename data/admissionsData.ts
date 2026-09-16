import { University, AdmissionProgram } from './types/admissions';

export const UNIVERSITIES: University[] = [
  {
    id: 'hust',
    code: 'BKA',
    name: 'Đại học Bách khoa Hà Nội',
    nameEn: 'Hanoi University of Science and Technology',
    shortName: 'Bách Khoa Hà Nội',
    location: 'Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội',
    region: 'North',
    type: 'public',
    website: 'https://hust.edu.vn',
    description: 'Trường đại học kỹ thuật công lập trọng điểm quốc gia, hàng đầu về kỹ thuật và công nghệ tại Việt Nam.'
  },
  {
    id: 'neu',
    code: 'KHA',
    name: 'Trường Đại học Kinh tế Quốc dân',
    nameEn: 'National Economics University',
    shortName: 'Kinh tế Quốc dân',
    location: '207 Giải Phóng, Đồng Tâm, Hai Bà Trưng, Hà Nội',
    region: 'North',
    type: 'public',
    website: 'https://neu.edu.vn',
    description: 'Trung tâm đào tạo hàng đầu Việt Nam về kinh tế, quản lý và quản trị kinh doanh.'
  },
  {
    id: 'ftu',
    code: 'NTH',
    name: 'Trường Đại học Ngoại thương',
    nameEn: 'Foreign Trade University',
    shortName: 'Ngoại Thương',
    location: '91 Phố Chùa Láng, Láng Thượng, Đống Đa, Hà Nội',
    region: 'North',
    type: 'public',
    website: 'https://ftu.edu.vn',
    description: 'Trường đại học danh tiếng hàng đầu về kinh tế đối ngoại, tài chính quốc tế và ngoại ngữ thương mại.'
  },
  {
    id: 'uet',
    code: 'QHI',
    name: 'Trường Đại học Công nghệ - ĐHQGHN',
    nameEn: 'VNU University of Engineering and Technology',
    shortName: 'ĐH Công nghệ ĐHQGHN',
    location: '144 Xuân Thủy, Cầu Giấy, Hà Nội',
    region: 'North',
    type: 'public',
    website: 'https://uet.vnu.edu.vn',
    description: 'Cơ sở đào tạo chất lượng cao về công nghệ thông tin, điện tử viễn thông và cơ điện tử.'
  },
  {
    id: 'hmu',
    code: 'YHB',
    name: 'Trường Đại học Y Hà Nội',
    nameEn: 'Hanoi Medical University',
    shortName: 'Y Hà Nội',
    location: '1 Tôn Thất Tùng, Kim Liên, Đống Đa, Hà Nội',
    region: 'North',
    type: 'public',
    website: 'https://hmu.edu.vn',
    description: 'Trường đại học y khoa lâu đời và uy tín bậc nhất cả nước, đào tạo bác sĩ và chuyên gia y tế đầu ngành.'
  },
  {
    id: 'hlu',
    code: 'LPH',
    name: 'Trường Đại học Luật Hà Nội',
    nameEn: 'Hanoi Law University',
    shortName: 'Luật Hà Nội',
    location: '87 Nguyễn Chí Thanh, Láng Thượng, Đống Đa, Hà Nội',
    region: 'North',
    type: 'public',
    website: 'https://hlu.edu.vn',
    description: 'Cơ sở đào tạo cán bộ pháp luật lớn nhất cả nước với các chuyên ngành luật đa dạng.'
  },
  {
    id: 'hau',
    code: 'KTA',
    name: 'Trường Đại học Kiến trúc Hà Nội',
    nameEn: 'Hanoi Architectural University',
    shortName: 'Kiến trúc Hà Nội',
    location: 'Km 10, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
    region: 'North',
    type: 'public',
    website: 'https://hau.edu.vn',
    description: 'Trường đầu ngành trong đào tạo kiến trúc sư, kỹ sư quy hoạch đô thị và thiết kế mỹ thuật ứng dụng.'
  },
  {
    id: 'hcmut',
    code: 'QSB',
    name: 'Trường Đại học Bách khoa - ĐHQG-HCM',
    nameEn: 'VNU-HCM University of Technology',
    shortName: 'Bách Khoa TP.HCM',
    location: '268 Lý Thường Kiệt, Phường 14, Quận 10, TP.HCM',
    region: 'South',
    type: 'public',
    website: 'https://hcmut.edu.vn',
    description: 'Trung tâm đào tạo kỹ thuật - công nghệ hàng đầu tại khu vực phía Nam.'
  },
  {
    id: 'ueh',
    code: 'KSA',
    name: 'Đại học Kinh tế Thành phố Hồ Chí Minh',
    nameEn: 'University of Economics Ho Chi Minh City',
    shortName: 'UEH',
    location: '59C Nguyễn Đình Chiểu, Quận 3, TP.HCM',
    region: 'South',
    type: 'public',
    website: 'https://ueh.edu.vn',
    description: 'Đại học đa ngành trọng điểm quốc gia về kinh tế, kinh doanh, công nghệ và luật.'
  },
  {
    id: 'fpt',
    code: 'FPT',
    name: 'Trường Đại học FPT',
    nameEn: 'FPT University',
    shortName: 'ĐH FPT',
    location: 'Khu CNC Hòa Lạc, Thạch Thất, Hà Nội (và TP.HCM, Đà Nẵng)',
    region: 'North',
    type: 'private',
    website: 'https://daihoc.fpt.edu.vn',
    description: 'Trường đại học tư thục tiên phong về công nghệ, đổi mới sáng tạo, gắn liền với tập đoàn công nghệ FPT.'
  },
  {
    id: 'rmit',
    code: 'RMIT',
    name: 'Đại học RMIT Việt Nam',
    nameEn: 'RMIT University Vietnam',
    shortName: 'RMIT Việt Nam',
    location: '702 Nguyễn Văn Linh, Quận 7, TP.HCM (và Kim Mã, Hà Nội)',
    region: 'South',
    type: 'international',
    website: 'https://rmit.edu.vn',
    description: 'Phân hiệu quốc tế của Đại học RMIT (Úc), môi trường học chuẩn toàn cầu 100% tiếng Anh.'
  }
];

export const ADMISSION_PROGRAMS: AdmissionProgram[] = [
  // HUST (Bách Khoa HN)
  {
    id: 'hust-it1',
    universityId: 'hust',
    facultyName: 'Trường CNTT & Truyền thông',
    programName: 'Khoa học Máy tính (IT1)',
    programCode: 'IT1',
    careerFamilyIds: ['cs-ai', 'data-math'],
    tuitionPerYearMillionVND: 30,
    rules: [
      {
        method: 'thpt',
        methodName: 'Điểm thi THPT',
        combinationCode: 'A00',
        cutoffScoreLastYear: 28.29,
        maxScale: 30
      },
      {
        method: 'tsa',
        methodName: 'Đánh giá tư duy TSA',
        cutoffScoreLastYear: 78.5,
        maxScale: 100
      }
    ],
    sourceUrl: 'https://ts.hust.edu.vn',
    lastVerified: '2026-03-01'
  },
  {
    id: 'hust-it-e10',
    universityId: 'hust',
    facultyName: 'Trường CNTT & Truyền thông',
    programName: 'Khoa học Dữ liệu & Trí tuệ Nhân tạo (IT-E10)',
    programCode: 'IT-E10',
    careerFamilyIds: ['cs-ai', 'data-math'],
    tuitionPerYearMillionVND: 55,
    rules: [
      {
        method: 'thpt',
        methodName: 'Điểm thi THPT',
        combinationCode: 'A00',
        cutoffScoreLastYear: 27.95,
        maxScale: 30
      },
      {
        method: 'tsa',
        methodName: 'Đánh giá tư duy TSA',
        cutoffScoreLastYear: 76.2,
        maxScale: 100
      },
      {
        method: 'ielts_combined',
        methodName: 'Xét tuyển kết hợp IELTS + TSA',
        cutoffScoreLastYear: 74.0,
        maxScale: 100,
        ieltsRequirement: { minOverall: 6.5, convertedScoreOrBonus: '+2 điểm quy đổi' }
      }
    ],
    sourceUrl: 'https://ts.hust.edu.vn',
    lastVerified: '2026-03-01'
  },
  {
    id: 'hust-me1',
    universityId: 'hust',
    facultyName: 'Trường Cơ khí',
    programName: 'Kỹ thuật Cơ điện tử (ME1)',
    programCode: 'ME1',
    careerFamilyIds: ['engineering'],
    tuitionPerYearMillionVND: 28,
    rules: [
      {
        method: 'thpt',
        methodName: 'Điểm thi THPT',
        combinationCode: 'A00',
        cutoffScoreLastYear: 26.5,
        maxScale: 30
      },
      {
        method: 'tsa',
        methodName: 'Đánh giá tư duy TSA',
        cutoffScoreLastYear: 68.0,
        maxScale: 100
      }
    ],
    sourceUrl: 'https://ts.hust.edu.vn',
    lastVerified: '2026-03-01'
  },
  {
    id: 'hust-ee1',
    universityId: 'hust',
    facultyName: 'Trường Điện - Điện tử',
    programName: 'Kỹ thuật Điều khiển & Tự động hóa (EE1)',
    programCode: 'EE1',
    careerFamilyIds: ['engineering'],
    tuitionPerYearMillionVND: 29,
    rules: [
      {
        method: 'thpt',
        methodName: 'Điểm thi THPT',
        combinationCode: 'A00',
        cutoffScoreLastYear: 27.1,
        maxScale: 30
      },
      {
        method: 'tsa',
        methodName: 'Đánh giá tư duy TSA',
        cutoffScoreLastYear: 71.5,
        maxScale: 100
      }
    ],
    sourceUrl: 'https://ts.hust.edu.vn',
    lastVerified: '2026-03-01'
  },

  // NEU (Kinh tế Quốc dân)
  {
    id: 'neu-marketing',
    universityId: 'neu',
    facultyName: 'Khoa Marketing',
    programName: 'Marketing',
    programCode: '7340115',
    careerFamilyIds: ['business-management', 'creative-industries'],
    tuitionPerYearMillionVND: 26,
    rules: [
      {
        method: 'thpt',
        methodName: 'Điểm thi THPT',
        combinationCode: 'D01',
        cutoffScoreLastYear: 27.8,
        maxScale: 30
      },
      {
        method: 'hsa',
        methodName: 'Đánh giá năng lực HSA',
        cutoffScoreLastYear: 105,
        maxScale: 150
      },
      {
        method: 'ielts_combined',
        methodName: 'IELTS kết hợp điểm 2 môn THPT',
        cutoffScoreLastYear: 27.2,
        maxScale: 30,
        ieltsRequirement: { minOverall: 6.5, convertedScoreOrBonus: 'Quy đổi 9.5-10đ môn Anh' }
      }
    ],
    sourceUrl: 'https://daotao.neu.edu.vn',
    lastVerified: '2026-03-01'
  },
  {
    id: 'neu-finance',
    universityId: 'neu',
    facultyName: 'Viện Ngân hàng - Tài chính',
    programName: 'Tài chính - Ngân hàng',
    programCode: '7340201',
    careerFamilyIds: ['economics-finance', 'data-math'],
    tuitionPerYearMillionVND: 26,
    rules: [
      {
        method: 'thpt',
        methodName: 'Điểm thi THPT',
        combinationCode: 'A00',
        cutoffScoreLastYear: 27.25,
        maxScale: 30
      },
      {
        method: 'hsa',
        methodName: 'Đánh giá năng lực HSA',
        cutoffScoreLastYear: 102,
        maxScale: 150
      }
    ],
    sourceUrl: 'https://daotao.neu.edu.vn',
    lastVerified: '2026-03-01'
  },
  {
    id: 'neu-logistics',
    universityId: 'neu',
    facultyName: 'Khoa Quản trị Kinh doanh',
    programName: 'Logistics & Quản lý Chuỗi Cung ứng',
    programCode: '7510605',
    careerFamilyIds: ['logistics-supply-chain', 'business-management'],
    tuitionPerYearMillionVND: 26,
    rules: [
      {
        method: 'thpt',
        methodName: 'Điểm thi THPT',
        combinationCode: 'A01',
        cutoffScoreLastYear: 27.9,
        maxScale: 30
      },
      {
        method: 'hsa',
        methodName: 'Đánh giá năng lực HSA',
        cutoffScoreLastYear: 106,
        maxScale: 150
      }
    ],
    sourceUrl: 'https://daotao.neu.edu.vn',
    lastVerified: '2026-03-01'
  },

  // FTU (Ngoại Thương)
  {
    id: 'ftu-ktnt',
    universityId: 'ftu',
    facultyName: 'Khoa Kinh tế & Kinh doanh Quốc tế',
    programName: 'Kinh tế Đối ngoại',
    programCode: 'NTH01',
    careerFamilyIds: ['economics-finance', 'business-management'],
    tuitionPerYearMillionVND: 25,
    rules: [
      {
        method: 'thpt',
        methodName: 'Điểm thi THPT',
        combinationCode: 'A00',
        cutoffScoreLastYear: 28.1,
        maxScale: 30
      },
      {
        method: 'ielts_combined',
        methodName: 'Xét kết hợp IELTS + Điểm thi THPT (Toán + Lý/Hóa/Văn)',
        cutoffScoreLastYear: 28.0,
        maxScale: 30,
        ieltsRequirement: { minOverall: 7.0, convertedScoreOrBonus: 'Điểm sàn tiếng Anh 7.0' }
      },
      {
        method: 'sat',
        methodName: 'Xét chứng chỉ quốc tế SAT',
        cutoffScoreLastYear: 1420,
        maxScale: 1600
      }
    ],
    sourceUrl: 'https://tuyensinh.ftu.edu.vn',
    lastVerified: '2026-03-01'
  },

  // UET (ĐH Công nghệ ĐHQGHN)
  {
    id: 'uet-cntt',
    universityId: 'uet',
    facultyName: 'Khoa Công nghệ Thông tin',
    programName: 'Công nghệ Thông tin (CN1)',
    programCode: 'CN1',
    careerFamilyIds: ['cs-ai'],
    tuitionPerYearMillionVND: 35,
    rules: [
      {
        method: 'thpt',
        methodName: 'Điểm thi THPT',
        combinationCode: 'A00',
        cutoffScoreLastYear: 27.8,
        maxScale: 30
      },
      {
        method: 'hsa',
        methodName: 'Đánh giá năng lực HSA',
        cutoffScoreLastYear: 108,
        maxScale: 150
      },
      {
        method: 'sat',
        methodName: 'Chứng chỉ SAT',
        cutoffScoreLastYear: 1380,
        maxScale: 1600
      }
    ],
    sourceUrl: 'https://uet.vnu.edu.vn',
    lastVerified: '2026-03-01'
  },

  // HMU (ĐH Y Hà Nội)
  {
    id: 'hmu-yk',
    universityId: 'hmu',
    facultyName: 'Khoa Y',
    programName: 'Y khoa (Bác sĩ Đa khoa)',
    programCode: '7720101',
    careerFamilyIds: ['healthcare-medicine'],
    tuitionPerYearMillionVND: 55,
    rules: [
      {
        method: 'thpt',
        methodName: 'Điểm thi THPT',
        combinationCode: 'B00',
        cutoffScoreLastYear: 27.73,
        maxScale: 30
      },
      {
        method: 'ielts_combined',
        methodName: 'Điểm THPT B00 kết hợp chứng chỉ IELTS',
        cutoffScoreLastYear: 26.5,
        maxScale: 30,
        ieltsRequirement: { minOverall: 6.5, convertedScoreOrBonus: 'Điều kiện nộp hồ sơ' }
      }
    ],
    sourceUrl: 'https://hmu.edu.vn',
    lastVerified: '2026-03-01'
  },

  // HLU (ĐH Luật Hà Nội)
  {
    id: 'hlu-luat',
    universityId: 'hlu',
    facultyName: 'Khoa Pháp luật Dân sự & Thương mại',
    programName: 'Luật Kinh tế',
    programCode: '7380107',
    careerFamilyIds: ['law-public-policy', 'business-management'],
    tuitionPerYearMillionVND: 25,
    rules: [
      {
        method: 'thpt',
        methodName: 'Điểm thi THPT',
        combinationCode: 'D01',
        cutoffScoreLastYear: 26.5,
        maxScale: 30
      },
      {
        method: 'thpt',
        methodName: 'Điểm thi THPT (Khối C00)',
        combinationCode: 'C00',
        cutoffScoreLastYear: 28.5,
        maxScale: 30
      }
    ],
    sourceUrl: 'https://hlu.edu.vn',
    lastVerified: '2026-03-01'
  },

  // HAU (ĐH Kiến trúc HN)
  {
    id: 'hau-kt',
    universityId: 'hau',
    facultyName: 'Khoa Kiến trúc',
    programName: 'Kiến trúc (KTS)',
    programCode: '7580101',
    careerFamilyIds: ['architecture-design'],
    tuitionPerYearMillionVND: 22,
    rules: [
      {
        method: 'thpt',
        methodName: 'Điểm thi Vẽ mỹ thuật kết hợp THPT',
        combinationCode: 'V00',
        cutoffScoreLastYear: 23.5,
        maxScale: 30,
        specialRequirement: 'Môn Vẽ mỹ thuật nhân hệ số 2'
      }
    ],
    sourceUrl: 'https://hau.edu.vn',
    lastVerified: '2026-03-01'
  },

  // HCMUT (Bách Khoa TP.HCM)
  {
    id: 'hcmut-cs',
    universityId: 'hcmut',
    facultyName: 'Khoa Khoa học & Kỹ thuật Máy tính',
    programName: 'Khoa học Máy tính',
    programCode: '106',
    careerFamilyIds: ['cs-ai'],
    tuitionPerYearMillionVND: 32,
    rules: [
      {
        method: 'dgnl_hcm',
        methodName: 'ĐGNL ĐHQG-HCM kết hợp THPT',
        cutoffScoreLastYear: 880,
        maxScale: 1200
      },
      {
        method: 'thpt',
        methodName: 'Điểm thi THPT',
        combinationCode: 'A00',
        cutoffScoreLastYear: 27.5,
        maxScale: 30
      }
    ],
    sourceUrl: 'https://aao.hcmut.edu.vn',
    lastVerified: '2026-03-01'
  },

  // UEH (ĐH Kinh tế TP.HCM)
  {
    id: 'ueh-tc',
    universityId: 'ueh',
    facultyName: 'Khoa Tài chính',
    programName: 'Tài chính - Ngân hàng',
    programCode: '7340201',
    careerFamilyIds: ['economics-finance'],
    tuitionPerYearMillionVND: 35,
    rules: [
      {
        method: 'thpt',
        methodName: 'Điểm thi THPT',
        combinationCode: 'A01',
        cutoffScoreLastYear: 26.8,
        maxScale: 30
      },
      {
        method: 'dgnl_hcm',
        methodName: 'ĐGNL ĐHQG-HCM',
        cutoffScoreLastYear: 830,
        maxScale: 1200
      }
    ],
    sourceUrl: 'https://tuyensinh.ueh.edu.vn',
    lastVerified: '2026-03-01'
  },

  // FPT (ĐH FPT)
  {
    id: 'fpt-se',
    universityId: 'fpt',
    facultyName: 'Khoa Công nghệ Thông tin',
    programName: 'Kỹ thuật Phần mềm',
    programCode: '7480201',
    careerFamilyIds: ['cs-ai'],
    tuitionPerYearMillionVND: 88,
    rules: [
      {
        method: 'hocba',
        methodName: 'Top 50 SchoolRank THPT (Xét học bạ)',
        cutoffScoreLastYear: 21.0,
        maxScale: 30,
        specialRequirement: 'Xếp hạng Top 50 toàn quốc trên trang SchoolRank FPT'
      },
      {
        method: 'thpt',
        methodName: 'Điểm thi THPT',
        combinationCode: 'A00',
        cutoffScoreLastYear: 21.0,
        maxScale: 30
      }
    ],
    sourceUrl: 'https://daihoc.fpt.edu.vn',
    lastVerified: '2026-03-01'
  },

  // RMIT (RMIT Việt Nam)
  {
    id: 'rmit-design',
    universityId: 'rmit',
    facultyName: 'Khoa Truyền thông & Thiết kế',
    programName: 'Thiết kế Ứng dụng Sáng tạo (Design)',
    programCode: 'BP316',
    careerFamilyIds: ['architecture-design', 'creative-industries'],
    tuitionPerYearMillionVND: 310,
    rules: [
      {
        method: 'hocba',
        methodName: 'Xét tuyển học bạ THPT + IELTS',
        cutoffScoreLastYear: 7.0, // GPA 7.0/10
        maxScale: 10,
        ieltsRequirement: { minOverall: 6.5, convertedScoreOrBonus: 'Không kỹ năng nào dưới 6.0' }
      }
    ],
    sourceUrl: 'https://rmit.edu.vn',
    lastVerified: '2026-03-01'
  }
];
