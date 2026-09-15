import { EasternStarArchetype, ElementTemperament } from './types/archetypes';
import { CategoryKey } from '../types';

export const EASTERN_ARCHETYPES: EasternStarArchetype[] = [
  // 1. Nhóm TỬ PHỦ VŨ TƯỚNG (Quản trị & Kiến tạo)
  {
    id: 'tu_vi',
    name: 'Tử Vi',
    title: 'Đế Tinh - Nhà Lãnh Đạo Kiến Tạo',
    group: 'tu_phu_vu_tuong',
    groupNameVi: 'Tử Phủ Vũ Tướng (Quản trị & Kiến tạo)',
    element: 'Tho',
    jungianArchetype: 'The Ruler / The Leader',
    matchingRiasec: [CategoryKey.E, CategoryKey.C],
    coreDescription: 'Đại diện cho tư duy chiến lược bao quát, bản lĩnh tự chủ, khả năng tập hợp lực lượng và dẫn dắt tổ chức hướng tới mục tiêu chung.',
    coreStrengths: [
      'Tầm nhìn chiến lược dài hạn và tư duy hệ thống',
      'Phong thái tự tin, bản lĩnh ra quyết định trong tình huống khó',
      'Khả năng điều phối và kết nối các nguồn lực xã hội'
    ],
    growthOpportunities: [
      'Cần lắng nghe phản hồi chi tiết từ cộng sự, tránh áp đặt ý kiến chủ quan',
      'Học cách trao quyền và tin tưởng vào khả năng của người khác'
    ],
    idealWorkEnvironments: ['Môi trường doanh nghiệp quy mô lớn', 'Tổ chức nhà nước', 'Dự án khởi nghiệp quy mô'],
    representativeCareers: ['Giám đốc điều hành (CEO)', 'Hoạch định chiến lược', 'Quản lý dự án cấp cao', 'Chuyên gia chính sách'],
    motto: 'Lãnh đạo bằng sự thấu hiểu và trao quyền, biến tầm nhìn thành hiện thực vững chắc.'
  },
  {
    id: 'thien_phu',
    name: 'Thiên Phủ',
    title: 'Lệnh Tinh - Nhà Quản Trị Vững Vàng',
    group: 'tu_phu_vu_tuong',
    groupNameVi: 'Tử Phủ Vũ Tướng (Quản trị & Kiến tạo)',
    element: 'Tho',
    jungianArchetype: 'The Guardian / The Executive',
    matchingRiasec: [CategoryKey.C, CategoryKey.E],
    coreDescription: 'Đại diện cho sự điềm đạm, cẩn trọng, khả năng tích lũy tài nguyên và bảo toàn giá trị cốt lõi.',
    coreStrengths: [
      'Năng lực quản lý tài chính, ngân sách và rủi ro xuất sắc',
      'Tính kỷ luật cao, làm việc có phương pháp và quy trình',
      'Đáng tin cậy, tạo dựng môi trường làm việc ổn định'
    ],
    growthOpportunities: [
      'Cởi mở hơn với những thay đổi và thử nghiệm công nghệ mới',
      'Tránh tâm lý quá an toàn làm chậm tiến độ bứt phá'
    ],
    idealWorkEnvironments: ['Ngân hàng & Quỹ đầu tư', 'Kiểm toán & Kế toán', 'Quản trị chuỗi cung ứng'],
    representativeCareers: ['Chuyên gia phân tích tài chính', 'Giám đốc tài chính (CFO)', 'Quản lý vận hành'],
    motto: 'Bền bỉ gìn giữ nền móng, xây dựng sự thịnh vượng trên nền tảng kỷ luật và minh bạch.'
  },
  {
    id: 'vu_khuc',
    name: 'Vũ Khúc',
    title: 'Tài Tinh - Chuyên Gia Quyết Đoán & Thực Thi',
    group: 'tu_phu_vu_tuong',
    groupNameVi: 'Tử Phủ Vũ Tướng (Quản trị & Kiến tạo)',
    element: 'Kim',
    jungianArchetype: 'The Achiever / The Pragmatist',
    matchingRiasec: [CategoryKey.C, CategoryKey.R],
    coreDescription: 'Đại diện cho tư duy kinh tế sắc bén, tính logic thực dụng, sự kiên định và năng lực biến ý tưởng thành dòng tiền hoặc sản phẩm cụ thể.',
    coreStrengths: [
      'Tư duy logic về con số, tối ưu hóa chi phí và lợi nhuận',
      'Ý chí kiên định, tập trung cao độ vào kết quả thực tế',
      'Nói ít làm nhiều, hành động dứt khoát'
    ],
    growthOpportunities: [
      'Rèn luyện kỹ năng biểu đạt cảm xúc và giao tiếp mềm mỏng',
      'Tăng cường sự linh hoạt trong các mối quan hệ đồng nghiệp'
    ],
    idealWorkEnvironments: ['Thương mại điện tử & Kinh doanh', 'Đầu tư & Ngân hàng', 'Sản xuất công nghiệp'],
    representativeCareers: ['Chuyên gia phân tích đầu tư', 'Kiến trúc sư giải pháp kinh tế', 'Quản lý kinh doanh'],
    motto: 'Giá trị thực tế được đo lường bằng kết quả bền vững và sự chính trực trong từng cam kết.'
  },
  {
    id: 'thien_tuong',
    name: 'Thiên Tướng',
    title: 'Ấn Tinh - Nhà Điều Phối Tận Tâm & Cố Vấn',
    group: 'tu_phu_vu_tuong',
    groupNameVi: 'Tử Phủ Vũ Tướng (Quản trị & Kiến tạo)',
    element: 'Thuy',
    jungianArchetype: 'The Loyalist / The Diplomat',
    matchingRiasec: [CategoryKey.S, CategoryKey.C],
    coreDescription: 'Đại diện cho lòng trung chính, tinh thần trách nhiệm, năng lực hỗ trợ xuất sắc và khả năng điều hành chính trực.',
    coreStrengths: [
      'Khả năng hỗ trợ, làm việc nhóm và giữ gìn sự gắn kết tổ chức',
      'Ý thức đạo đức nghề nghiệp và tiêu chuẩn công vụ cao',
      'Chu đáo, thận trọng và thấu hiểu lòng người'
    ],
    growthOpportunities: [
      'Rèn luyện tính chủ động khởi xướng, giảm bớt sự phụ thuộc vào người khác',
      'Học cách từ chối khéo léo khi khối lượng công việc quá tải'
    ],
    idealWorkEnvironments: ['Hành chính nhân sự', 'Quan hệ đối ngoại', 'Y tế & Giáo dục'],
    representativeCareers: ['Giám đốc nhân sự (CHRO)', 'Thư ký điều hành', 'Chuyên viên quan hệ công chúng'],
    motto: 'Phụng sự bằng sự tận tâm, là điểm tựa vững chắc cho sự phát triển của tập thể.'
  },

  // 2. Nhóm SÁT PHÁ THAM (Tiên phong & Đổi mới)
  {
    id: 'that_sat',
    name: 'Thất Sát',
    title: 'Tướng Tinh - Chiến Binh Tiên Phong & Đột Phá',
    group: 'sat_pha_tham',
    groupNameVi: 'Sát Phá Tham (Tiên phong & Đổi mới)',
    element: 'Kim',
    jungianArchetype: 'The Hero / The Warrior',
    matchingRiasec: [CategoryKey.R, CategoryKey.E],
    coreDescription: 'Đại diện cho sự quả cảm, tính tiên phong, tốc độ thực thi sấm sét và tinh thần không ngại đối mặt với thách thức gian khó.',
    coreStrengths: [
      'Khả năng đương đầu với áp lực lớn và giải quyết khủng hoảng',
      'Tinh thần độc lập, không sợ thất bại',
      'Tập trung mục tiêu cao độ, quyết liệt đến cùng'
    ],
    growthOpportunities: [
      'Kiểm soát tính nóng vội, cân nhắc kỹ rủi ro trước khi hành động',
      'Xây dựng sự kiên nhẫn khi làm việc với đội ngũ có nhịp độ chậm hơn'
    ],
    idealWorkEnvironments: ['Khởi nghiệp công nghệ', 'Kỹ thuật quân sự / An ninh mạng', 'Môi trường cứu hộ / Khủng hoảng'],
    representativeCareers: ['Chuyên gia an ninh mạng', 'Kỹ sư trưởng dự án đột phá', 'Doanh nhân khởi nghiệp'],
    motto: 'Biến thử thách thành bệ phóng, tiên phong khai phá những con đường chưa ai từng đi.'
  },
  {
    id: 'pha_quan',
    name: 'Phá Quân',
    title: 'Hao Tinh - Nhà Cách Mạng & Đổi Mới Sáng Tạo',
    group: 'sat_pha_tham',
    groupNameVi: 'Sát Phá Tham (Tiên phong & Đổi mới)',
    element: 'Thuy',
    jungianArchetype: 'The Rebel / The Transformer',
    matchingRiasec: [CategoryKey.R, CategoryKey.A],
    coreDescription: 'Đại diện cho tinh thần phá vỡ lối mòn (Disruptive Innovation), tái cấu trúc cái cũ để tạo dựng những giải pháp hoàn toàn mới.',
    coreStrengths: [
      'Tư duy đột phá, dám làm khác biệt và thách thức các quy chuẩn lỗi thời',
      'Khả năng thích ứng nhanh trong môi trường biến động liên tục',
      'Đam mê kiến tạo sản phẩm mới từ con số 0'
    ],
    growthOpportunities: [
      'Cần duy trì tính kiên trì ở giai đoạn hoàn thiện sau khi đã tạo dựng cái mới',
      'Tôn trọng những giá trị truyền thống có ích để tránh lãng phí nguồn lực'
    ],
    idealWorkEnvironments: ['R&D Công nghệ cao', 'Thiết kế sản phẩm mới (Product Design)', 'Tái cấu trúc doanh nghiệp'],
    representativeCareers: ['Product Manager (PM)', 'Kỹ sư R&D AI', 'Kiến trúc sư đổi mới sáng tạo'],
    motto: 'Dám phá bỏ rào cản để tái sinh những giá trị vượt bậc cho tương lai.'
  },
  {
    id: 'tham_lang',
    name: 'Tham Lang',
    title: 'Đào Hoa Tinh - Nhà Sáng Tạo & Đa Tài Nghệ Thuật',
    group: 'sat_pha_tham',
    groupNameVi: 'Sát Phá Tham (Tiên phong & Đổi mới)',
    element: 'Thuy',
    jungianArchetype: 'The Magician / The Charismatic',
    matchingRiasec: [CategoryKey.A, CategoryKey.E],
    coreDescription: 'Đại diện cho sức hút cá nhân, khả năng giao thiệp tinh tế, trí tò mò vô tận và năng khiếu thẩm mỹ / nghệ thuật đa dạng.',
    coreStrengths: [
      'Khả năng thấu cảm và nắm bắt tâm lý đám đông nhanh nhạy',
      'Đa tài, học hỏi nhanh nhiều lĩnh vực khác nhau',
      'Tư duy sáng tạo, phong cách truyền cảm hứng cuốn hút'
    ],
    growthOpportunities: [
      'Tránh phân tán năng lượng vào quá nhiều mục tiêu cùng lúc',
      'Xây dựng chiều sâu chuyên môn thay vì chỉ dừng lại ở bề nổi'
    ],
    idealWorkEnvironments: ['Truyền thông giải trí & Nghệ thuật', 'Marketing & Branding', 'Thiết kế & Thời trang'],
    representativeCareers: ['Creative Director', 'Chuyên gia xây dựng thương hiệu', 'Nhà sản xuất nội dung'],
    motto: 'Khám phá thế giới bằng đam mê đa chiều, kết nối con người bằng cảm xúc chân thành.'
  },

  // 3. Nhóm CƠ NGUYỆT ĐỒNG LƯƠNG (Nghiên cứu & Nhân văn)
  {
    id: 'thien_co',
    name: 'Thiên Cơ',
    title: 'Thiện Tinh - Nhà Tham Mưu & Trí Tuệ Logic',
    group: 'co_nguyet_dong_luong',
    groupNameVi: 'Cơ Nguyệt Đồng Lương (Nghiên cứu & Nhân văn)',
    element: 'Moc',
    jungianArchetype: 'The Sage / The Strategist',
    matchingRiasec: [CategoryKey.I, CategoryKey.C],
    coreDescription: 'Đại diện cho trí tuệ sắc sảo, tư duy thuật toán, khả năng phân tích dữ liệu phức tạp và năng khiếu hoạch định chiến thuật.',
    coreStrengths: [
      'Tư duy phân tích nguyên nhân - kết quả cực kỳ chuẩn xác',
      'Khả năng tính toán logic và tối ưu hóa quy trình',
      'Thích ứng nhanh với công nghệ mới và tri thức chuyên sâu'
    ],
    growthOpportunities: [
      'Tránh suy nghĩ quá nhiều (overthinking) dẫn đến do dự không dám hành động',
      'Cần giải tỏa căng thẳng trí óc bằng các hoạt động thể chất'
    ],
    idealWorkEnvironments: ['Khoa học máy tính & AI', 'Viện nghiên cứu học thuật', 'Tư vấn chiến lược'],
    representativeCareers: ['Data Scientist / Kỹ sư AI', 'Chuyên gia tư vấn chiến lược', 'Nhà nghiên cứu thuật toán'],
    motto: 'Trí tuệ minh triết là chìa khóa tháo gỡ mọi nút thắt phức tạp.'
  },
  {
    id: 'thai_am',
    name: 'Thái Âm',
    title: 'Phú Tinh - Người Thấu Cảm Sâu Sắc & Nghệ Thuật',
    group: 'co_nguyet_dong_luong',
    groupNameVi: 'Cơ Nguyệt Đồng Lương (Nghiên cứu & Nhân văn)',
    element: 'Thuy',
    jungianArchetype: 'The Artist / The Empath',
    matchingRiasec: [CategoryKey.A, CategoryKey.I],
    coreDescription: 'Đại diện cho chiều sâu tâm hồn, trực giác nhạy bén, gu thẩm mỹ tinh tế và năng lực quan sát tỉ mỉ.',
    coreStrengths: [
      'Trực giác tinh nhạy và khả năng thấu hiểu cảm xúc ngầm',
      'Tư duy thẩm mỹ cao, nhạy cảm với vẻ đẹp và chi tiết nhỏ',
      'Khả năng quản lý tài nguyên bền bỉ và chu đáo'
    ],
    growthOpportunities: [
      'Tránh để tâm trạng cá nhân ảnh hưởng quá nhiều đến hiệu suất công việc',
      'Học cách bày tỏ quan điểm thẳng thắn hơn khi cần bảo vệ quyền lợi'
    ],
    idealWorkEnvironments: ['Thiết kế mỹ thuật & Kiến trúc', 'Tâm lý học trị liệu', 'Viết lách & Văn học'],
    representativeCareers: ['Chuyên gia tâm lý trị liệu', 'Nhà thiết kế UX/UI', 'Tác giả & Biên kịch'],
    motto: 'Lắng nghe bằng cả trái tim, làm đẹp cuộc sống bằng sự tinh tế và nhân hậu.'
  },
  {
    id: 'thien_dong',
    name: 'Thiên Đồng',
    title: 'Phúc Tinh - Tâm Hồn Thuần Khiết & Trải Nghiệm',
    group: 'co_nguyet_dong_luong',
    groupNameVi: 'Cơ Nguyệt Đồng Lương (Nghiên cứu & Nhân văn)',
    element: 'Thuy',
    jungianArchetype: 'The Innocent / The Explorer',
    matchingRiasec: [CategoryKey.S, CategoryKey.A],
    coreDescription: 'Đại diện cho sự lạc quan, tinh thần hòa đồng, niềm đam mê khám phá điều mới và khả năng lan tỏa năng lượng tích cực.',
    coreStrengths: [
      'Dễ hòa nhập và tạo bầu không khí làm việc vui vẻ, cởi mở',
      'Tâm hồn cởi mở, không thành kiến, đón nhận ý tưởng mới dễ dàng',
      'Năng khiếu nghệ thuật, ẩm thực, du lịch và giải trí'
    ],
    growthOpportunities: [
      'Xây dựng tính kiên trì trước những công việc mang tính lặp lại hoặc áp lực cao',
      'Tránh xu hướng dễ thoái lui khi gặp trở ngại ban đầu'
    ],
    idealWorkEnvironments: ['Du lịch & Nhà hàng khách sạn', 'Giáo dục mầm non / Tiểu học', 'Tổ chức sự kiện'],
    representativeCareers: ['Chuyên viên trải nghiệm khách hàng', 'Nhà sáng tạo nội dung giải trí', 'Chuyên gia giáo dục sớm'],
    motto: 'Giữ trọn niềm vui khám phá, mang lại sự an vui và nụ cười cho mọi người.'
  },
  {
    id: 'thien_luong',
    name: 'Thiên Lương',
    title: 'Ấm Tinh - Người Thầy Nhân Ái & Cố Vấn',
    group: 'co_nguyet_dong_luong',
    groupNameVi: 'Cơ Nguyệt Đồng Lương (Nghiên cứu & Nhân văn)',
    element: 'Moc',
    jungianArchetype: 'The Caregiver / The Mentor',
    matchingRiasec: [CategoryKey.S, CategoryKey.I],
    coreDescription: 'Đại diện cho sự chính trực, lòng trắc ẩn, sứ mệnh truyền dạy tri thức và bảo vệ những giá trị đạo đức xã hội.',
    coreStrengths: [
      'Tâm huyết với sự tiến bộ của người khác, kiên nhẫn lắng nghe',
      'Uy tín tự nhiên, được mọi người tin tưởng tìm đến xin lời khuyên',
      'Bền bỉ, công tâm và trung thực trong mọi hoàn cảnh'
    ],
    growthOpportunities: [
      'Tránh xu hướng giáo điều hoặc can thiệp quá sâu vào quyết định của người khác',
      'Biết cách tự chăm sóc bản thân, tránh kiệt sức vì lo lắng cho người khác'
    ],
    idealWorkEnvironments: ['Giáo dục & Đào tạo', 'Y tế & Chăm sóc sức khỏe', 'Tổ chức phi chính phủ (NGO)'],
    representativeCareers: ['Giảng viên đại học', 'Bác sĩ đa khoa', 'Chuyên gia tư vấn hướng nghiệp'],
    motto: 'Cho đi là còn mãi, nâng đỡ người khác chính là hoàn thiện chính mình.'
  },

  // 4. Nhóm CỰ NHẬT (Khai phóng & Truyền thông)
  {
    id: 'cu_mon',
    name: 'Cự Môn',
    title: 'Ám Tinh - Nhà Hùng Biện & Tư Duy Phản Biện',
    group: 'cu_nhat',
    groupNameVi: 'Cự Nhật (Khai phóng & Truyền thông)',
    element: 'Thuy',
    jungianArchetype: 'The Truth Seeker / The Debater',
    matchingRiasec: [CategoryKey.A, CategoryKey.I],
    coreDescription: 'Đại diện cho khả năng ngôn ngữ bậc thầy, tư duy phản biện sắc bén, năng lực bóc tách sự thật và tài hùng biện.',
    coreStrengths: [
      'Năng lực diễn đạt xuất sắc, lập luận chặt chẽ và thuyết phục',
      'Khả năng nhận diện sơ hở logic và vấn đề tiềm ẩn trong các bản đề xuất',
      'Đam mê tìm hiểu đến tận cùng bản chất sự việc'
    ],
    growthOpportunities: [
      'Sử dụng lời nói mang tính xây dựng, tránh những nhận xét quá gay gắt làm tổn thương người khác',
      'Học cách đồng cảm trước khi đưa ra phản biện'
    ],
    idealWorkEnvironments: ['Ngành Luật & Tòa án', 'Báo chí & Truyền thông điều tra', 'Ngoại giao & Đàm phán'],
    representativeCareers: ['Luật sư tranh tụng', 'Nhà báo điều tra', 'Chuyên gia đàm phán hợp đồng'],
    motto: 'Dùng sức mạnh của ngôn từ để bảo vệ sự thật và xây dựng sự công bằng.'
  },
  {
    id: 'thai_duong',
    name: 'Thái Dương',
    title: 'Quang Tinh - Nhà Khai Phóng & Truyền Cảm Hứng',
    group: 'cu_nhat',
    groupNameVi: 'Cự Nhật (Khai phóng & Truyền thông)',
    element: 'Hoa',
    jungianArchetype: 'The Visionary / The Sun',
    matchingRiasec: [CategoryKey.S, CategoryKey.E],
    coreDescription: 'Đại diện cho nguồn năng lượng rực rỡ, tinh thần công khai minh bạch, lòng bác ái và khả năng truyền lửa cho đám đông.',
    coreStrengths: [
      'Sức lan tỏa tự nhiên, khả năng truyền cảm hứng và cổ vũ tinh thần người khác',
      'Tính cách bộc trực, phóng khoáng, minh bạch và quang minh chính đại',
      'Tầm nhìn rộng mở, thích những dự án mang lại lợi ích chung cho cộng đồng'
    ],
    growthOpportunities: [
      'Cần chú ý hơn đến các chi tiết nhỏ trong khâu triển khai thực tế',
      'Tránh tiêu hao năng lượng quá mức, cần học cách tái tạo năng lượng cá nhân'
    ],
    idealWorkEnvironments: ['Truyền thông đại chúng', 'Diễn giả & Hoạt động xã hội', 'Quan hệ quốc tế'],
    representativeCareers: ['Chuyên gia truyền thông', 'Nhà hoạt động xã hội', 'Nhà ngoại giao', 'Diễn giả truyền cảm hứng'],
    motto: 'Chiếu sáng những nơi tăm tối, lan tỏa tri thức và niềm tin tích cực đến muôn nơi.'
  }
];

export const ELEMENT_TEMPERAMENTS: Record<string, ElementTemperament> = {
  Kim: {
    element: 'Kim',
    nameVi: 'Khí chất Hành Kim (The Precision)',
    symbol: '🪙',
    keyword: 'Chính trực • Logic • Sắc bén • Kỷ luật',
    workStyle: 'Làm việc theo nguyên tắc, đề cao tính chuẩn xác, công bằng, thích dữ liệu và cấu trúc rõ ràng.',
    communicationStyle: 'Ngắn gọn, súc tích, đi thẳng vào trọng tâm, chú trọng tính khách quan.',
    stressResponse: 'Dễ trở nên quá khắt khe với bản thân và người khác khi mọi việc lệch khỏi kế hoạch.',
    balanceAdvice: 'Rèn luyện sự bao dung, cho phép những sai số nhỏ mang tính sáng tạo.'
  },
  Moc: {
    element: 'Moc',
    nameVi: 'Khí chất Hành Mộc (The Growth)',
    symbol: '🌿',
    keyword: 'Nhân văn • Bền bỉ • Phát triển • Nuôi dưỡng',
    workStyle: 'Tập trung vào sự tiến bộ của con người, xây dựng giá trị lâu dài, thích môi trường hợp tác.',
    communicationStyle: 'Ân cần, mang tính động viên và hướng dẫn, lắng nghe kiên nhẫn.',
    stressResponse: 'Dễ gánh vác quá nhiều trách nhiệm vì cả nể và muốn chăm sóc tất cả mọi người.',
    balanceAdvice: 'Đặt ra ranh giới cá nhân rõ ràng và ưu tiên năng lượng cho những mục tiêu then chốt.'
  },
  Thuy: {
    element: 'Thuy',
    nameVi: 'Khí chất Hành Thủy (The Adaptability)',
    symbol: '🌊',
    keyword: 'Linh hoạt • Trực giác • Sâu sắc • Thấu cảm',
    workStyle: 'Thích ứng cao với thay đổi, nhìn thấu các luồng thông tin ngầm, kết nối mạng lưới linh hoạt.',
    communicationStyle: 'Mềm mỏng, khéo léo, giàu tính biểu cảm và nắm bắt cảm xúc đối phương tốt.',
    stressResponse: 'Dễ bị chi phối bởi cảm xúc tiêu cực của môi trường xung quanh, khó đưa ra quyết định dứt khoát.',
    balanceAdvice: 'Thiết lập thói quen ghi chép dữ liệu logic để cân bằng trực giác với thực tế.'
  },
  Hoa: {
    element: 'Hoa',
    nameVi: 'Khí chất Hành Hỏa (The Passion)',
    symbol: '🔥',
    keyword: 'Nhiệt huyết • Tốc độ • Tỏa sáng • Truyền lửa',
    workStyle: 'Hành động nhanh, dũng cảm tiên phong, thích thử thách mới và những dự án có tầm ảnh hưởng lớn.',
    communicationStyle: 'Sôi nổi, đầy năng lượng, giàu tính thuyết phục và truyền cảm hứng mạnh mẽ.',
    stressResponse: 'Dễ nổi nóng hoặc kiệt sức nhanh khi ngọn lửa nhiệt huyết bị cản trở bởi thủ tục rườm rà.',
    balanceAdvice: 'Học cách điều hòa nhịp thở và nuôi dưỡng sự kiên nhẫn trong những chặng đường dài hạn.'
  },
  Tho: {
    element: 'Tho',
    nameVi: 'Khí chất Hành Thổ (The Grounded)',
    symbol: '🏔️',
    keyword: 'Vững chãi • Đáng tin cậy • Bảo chứng • Thực tế',
    workStyle: 'Điềm đạm, thận trọng, tạo điểm tựa ổn định cho cả nhóm, đề cao tính an toàn và bền vững.',
    communicationStyle: 'Chắc chắn, từ tốn, tạo cảm giác an tâm và tin cậy tuyệt đối.',
    stressResponse: 'Dễ bảo thủ, ngại đổi mới hoặc chần chừ trước những cơ hội cần tốc độ.',
    balanceAdvice: 'Chủ động thử nghiệm những thay đổi nhỏ hàng ngày để tăng cường tính linh hoạt.'
  }
};
