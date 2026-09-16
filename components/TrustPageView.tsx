import React, { useEffect } from 'react';

export type TrustTab = 'methodology' | 'ai-safety' | 'privacy' | 'terms' | 'data-sources';

interface TrustPageViewProps {
  activeTab: TrustTab;
  onSelectTab: (tab: TrustTab) => void;
  onGoHome: () => void;
}

const TAB_CONFIG: Record<TrustTab, { title: string; pageTitle: string; path: string; label: string; badge: string; description: string }> = {
  methodology: {
    title: 'Phương Pháp Luận Khoa Học & Khung Đánh Giá',
    pageTitle: 'Phương pháp | PathAI',
    path: '/methodology',
    label: '1. Phương Pháp Luận',
    badge: '11 Khung Đánh Giá Chuẩn Hóa',
    description: 'Phương pháp luận khoa học, mô hình sở thích nghề nghiệp RIASEC và nguyên tắc AI an toàn của PathAI.'
  },
  'ai-safety': {
    title: 'An Toàn Trợ Lý AI & Bảo Vệ Học Đường',
    pageTitle: 'An toàn AI | PathAI',
    path: '/ai-safety',
    label: '2. An Toàn AI',
    badge: 'Can Thiệp Khủng Hoảng 111',
    description: 'Tiêu chuẩn an toàn AI, nguyên tắc không chẩn đoán y tế và giao thức can thiệp khủng hoảng trẻ em 111.'
  },
  privacy: {
    title: 'Chính Sách Bảo Mật & Quyền Riêng Tư Dữ Liệu',
    pageTitle: 'Chính sách bảo mật | PathAI',
    path: '/privacy',
    label: '3. Quyền Riêng Tư',
    badge: 'Nghị Định 13/2023/NĐ-CP',
    description: 'Chính sách bảo vệ dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP và cam kết lưu trữ cục bộ của PathAI.'
  },
  terms: {
    title: 'Điều Khoản Dịch Vụ & Giới Hạn Trách Nhiệm',
    pageTitle: 'Điều khoản sử dụng | PathAI',
    path: '/terms',
    label: '4. Điều Khoản Sử Dụng',
    badge: 'Phạm Vi Phi Y Tế',
    description: 'Điều khoản sử dụng và giới hạn trách nhiệm phi y tế của nền tảng hướng nghiệp PathAI.'
  },
  'data-sources': {
    title: 'Minh Bạch Nguồn Dữ Liệu Tuyển Sinh 2026',
    pageTitle: 'Nguồn dữ liệu | PathAI',
    path: '/data-sources',
    label: '5. Nguồn Tuyển Sinh',
    badge: 'CTGDPT 2018 & MOET',
    description: 'Minh bạch nguồn dữ liệu môn học GDPT 2018 và thông tin tuyển sinh Đại học 2026 trên PathAI.'
  }
};

const TrustPageView: React.FC<TrustPageViewProps> = ({ activeTab, onSelectTab, onGoHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const cfg = TAB_CONFIG[activeTab];
    if (cfg) {
      document.title = cfg.pageTitle;
      
      // Update canonical link
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', `https://pathai-web-intro.vercel.app${cfg.path}`);

      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (metaDesc) {
        metaDesc.setAttribute('content', cfg.description);
      }
    }
  }, [activeTab]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 font-sans animate-fade-in">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={onGoHome}
          className="inline-flex items-center gap-2 text-sm font-semibold text-sage-600 hover:text-sage-800 dark:text-sage-400 dark:hover:text-sage-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Quay về Trang chủ
        </button>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sage-100 dark:bg-sage-900/60 text-sage-700 dark:text-sage-300">
          {TAB_CONFIG[activeTab]?.badge}
        </span>
      </div>

      {/* Main Page Title */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          {TAB_CONFIG[activeTab]?.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-3xl leading-relaxed">
          Cam kết minh bạch học thuật, an toàn tâm lý học sinh và bảo mật dữ liệu theo quy định pháp luật Việt Nam.
        </p>
      </div>

      {/* Navigation Tabs (Accessible Links) */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 mb-10 overflow-x-auto pb-1 scrollbar-thin">
        {(Object.keys(TAB_CONFIG) as TrustTab[]).map((tab) => {
          const cfg = TAB_CONFIG[tab];
          const isSelected = activeTab === tab;
          return (
            <a
              key={tab}
              href={cfg.path}
              onClick={(e) => {
                e.preventDefault();
                onSelectTab(tab);
              }}
              className={`py-3 px-5 text-sm font-bold border-b-2 whitespace-nowrap transition-all rounded-t-lg ${
                isSelected
                  ? 'border-sage-500 text-sage-700 dark:text-sage-300 bg-sage-50/50 dark:bg-slate-800/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/30'
              }`}
            >
              {cfg.label}
            </a>
          );
        })}
      </div>

      {/* Tab 1: Methodology */}
      {activeTab === 'methodology' && (
        <article className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
          <section className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">1. PathAI Đánh Giá Điều Gì?</h2>
            <p>PathAI tổng hợp 11 công cụ lượng giá tâm lý học giáo dục và hướng nghiệp tiêu chuẩn:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Sở Thích Nghề Nghiệp (Holland RIASEC)</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Đo lường mức độ hứng thú với 6 nhóm hoạt động: Kỹ thuật (R), Nghiên cứu (I), Nghệ thuật (A), Xã hội (S), Quản lý (E), Nghiệp vụ (C).</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Trí Thông Minh Đa Diện (Howard Gardner)</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Nhận diện 8 khuynh hướng tiếp nhận thông tin và giải quyết vấn đề nổi trội.</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Tính Cách Big Five (OCEAN)</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">5 chiều kích tính cách tương tác trong môi trường học tập và làm việc nhóm.</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Động Lực & Ý Chí (Grit & Growth Mindset)</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Thang đo kiên trì mục tiêu của Angela Duckworth và tư duy học tập của Carol Dweck.</p>
              </div>
            </div>
          </section>

          <section className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">2. PathAI KHÔNG Đánh Giá Điều Gì?</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
              <li><strong>Không chẩn đoán rối loạn tâm thần:</strong> Không thay thế xét nghiệm tâm thần học hay đánh giá y khoa lâm sàng.</li>
              <li><strong>Không ấn định tương lai hay số mệnh:</strong> Kết quả là bức tranh phản ánh tại thời điểm làm bài, không phán xét năng lực bẩm sinh vĩnh viễn.</li>
              <li><strong>Không áp đặt ngành học duy nhất:</strong> Đưa ra các <em>Giả thuyết nghề nghiệp (Career Hypotheses)</em> để học sinh tự thử nghiệm và kiểm chứng.</li>
            </ul>
          </section>

          <section className="p-6 bg-amber-50/60 dark:bg-amber-950/20 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 space-y-3">
            <h2 className="text-lg font-bold text-amber-900 dark:text-amber-300">3. Phân Lập Nội Dung Chiêm Nghiệm Cá Nhân</h2>
            <p className="text-sm text-amber-800 dark:text-amber-200">
              Các công cụ chiêm nghiệm mang tính văn hóa (Bản đồ Hình mẫu Phương Đông) là nội dung <strong>hoàn toàn tùy chọn</strong> nhằm hỗ trợ kích hoạt tư duy phản chiếu cá nhân. Thuật toán của PathAI cách ly 100% các yếu tố này khỏi hệ thống chấm điểm RIASEC, đề xuất tổ hợp môn học và cơ chế xét tuyển Đại học.
            </p>
          </section>
        </article>
      )}

      {/* Tab 2: AI Safety */}
      {activeTab === 'ai-safety' && (
        <article className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
          <section className="p-6 bg-rose-50/60 dark:bg-rose-950/20 rounded-2xl border border-rose-200/80 dark:border-rose-900/40 space-y-4">
            <h2 className="text-xl font-bold text-rose-900 dark:text-rose-300 font-display">1. Giao Thức Can Thiệp Khủng Hoảng Học Đường</h2>
            <p className="text-sm text-rose-800 dark:text-rose-200">
              Khi hệ thống phát hiện các tín hiệu liên quan đến tự hại, khủng hoảng tinh thần nghiêm trọng hoặc bạo lực học đường, Trợ lý AI sẽ ngay lập tức <strong>dừng toàn bộ hoạt động tham vấn nghề nghiệp</strong> và kích hoạt hộp thoại hỗ trợ khẩn cấp với các kênh liên lạc chính thức:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-800 text-center">
                <div className="text-2xl mb-1">🛡️</div>
                <div className="font-bold text-rose-700 dark:text-rose-400">Tổng Đài Trẻ Em: 111</div>
                <div className="text-xs text-slate-500 mt-1">24/7 • Miễn cước gọi toàn quốc</div>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-800 text-center">
                <div className="text-2xl mb-1">💚</div>
                <div className="font-bold text-rose-700 dark:text-rose-400">Đường Dây Ngày Mai: 096 306 1414</div>
                <div className="text-xs text-slate-500 mt-1">Hỗ trợ tâm lý & khủng hoảng</div>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-800 text-center">
                <div className="text-2xl mb-1">🚑</div>
                <div className="font-bold text-rose-700 dark:text-rose-400">Cấp Cứu Y Tế: 115</div>
                <div className="text-xs text-slate-500 mt-1">Trợ giúp y tế khẩn cấp</div>
              </div>
            </div>
          </section>

          <section className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">2. Định Vị Vai Trò Của Trợ Lý AI</h2>
            <p>Trợ lý AI PathAI được thiết kế với vai trò <strong>Người đồng hành & Gợi mở (Facilitator)</strong>:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
              <li><strong>Không đóng vai Bác sĩ/Chuyên gia Tâm thần học:</strong> Không kê đơn, không kết luận bệnh lý.</li>
              <li><strong>Không phán xét bất đồng gia đình:</strong> Khi học sinh và phụ huynh có quan điểm trái chiều về ngành học, AI đóng vai trò cầu nối trung gian, gợi ý các câu hỏi đối thoại thấu hiểu thay vì kết luận ai đúng ai sai.</li>
              <li><strong>Chống ảo giác số liệu (Anti-Hallucination):</strong> Khi thiếu dữ liệu điểm số, AI chủ động thông báo <em>"Chưa đủ dữ liệu"</em> thay vì tự dựng số liệu điểm chuẩn giả mạo.</li>
            </ul>
          </section>
        </article>
      )}

      {/* Tab 3: Privacy */}
      {activeTab === 'privacy' && (
        <article className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
          <section className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">1. Kiến Trúc Lưu Trữ & Quyền Riêng Tư Cục Bộ</h2>
            <p>PathAI tuân thủ nghiêm ngặt nguyên tắc tối thiểu hóa dữ liệu theo <strong>Nghị định 13/2023/NĐ-CP về Bảo vệ Dữ liệu Cá nhân</strong>:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
              <li><strong>Lưu trữ tại trình duyệt (Local Storage):</strong> Toàn bộ câu trả lời, kết quả trắc nghiệm và kế hoạch môn học được lưu trữ trực tiếp trên thiết bị cá nhân của bạn theo định dạng phân lập <code>pathai:v2</code>.</li>
              <li><strong>Không bán dữ liệu học sinh:</strong> PathAI không bán, cho thuê hoặc chia sẻ dữ liệu hồ sơ học sinh cho bất kỳ bên thứ ba hay mạng lưới quảng cáo thương mại nào.</li>
              <li><strong>Quyền xuất & xóa vĩnh viễn:</strong> Học sinh và phụ huynh có toàn quyền xóa toàn bộ lịch sử trắc nghiệm hoặc xuất file sao lưu JSON bất cứ lúc nào trong mục Cài đặt / Lịch sử.</li>
            </ul>
          </section>

          <section className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">2. Bảo Vệ Dữ Liệu Học Sinh & Trẻ Em Dưới 16 Tuổi</h2>
            <p>
              Đối với người dùng trong độ tuổi học sinh (Lớp 9–12), chúng tôi khuyến khích sự đồng hành và giám sát của cha mẹ hoặc người giám hộ hợp pháp khi tham gia xây dựng kế hoạch chọn trường, chọn ngành.
            </p>
          </section>
        </article>
      )}

      {/* Tab 4: Terms */}
      {activeTab === 'terms' && (
        <article className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
          <section className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">1. Bản Chất Dịch Vụ & Phạm Vi Sử Dụng</h2>
            <p>
              PathAI là nền tảng số hỗ trợ ra quyết định và khám phá bản thân dành cho học sinh THCS/THPT và phụ huynh. Kết quả từ các bài đánh giá mang tính chất tham khảo giáo dục, không phải văn bản pháp lý bắt buộc hay cam kết bảo đảm trúng tuyển vào bất kỳ trường đại học nào.
            </p>
          </section>

          <section className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">2. Trách Nhiệm Của Người Dùng</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
              <li>Cung cấp thông tin trung thực về kết quả học tập khi sử dụng tính năng tính toán rủi ro tổ hợp môn.</li>
              <li>Tự đối chiếu và xác minh thông tin tuyển sinh trên đề án chính thức của các trường Đại học trước khi nộp hồ sơ nguyện vọng.</li>
            </ul>
          </section>
        </article>
      )}

      {/* Tab 5: Data Sources */}
      {activeTab === 'data-sources' && (
        <article className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
          <section className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">1. Quy Định Giáo Dục Phổ Thông 2018</h2>
            <p>
              Khung môn học được lập trình chính xác theo <strong>Thông tư 32/2018/TT-BGDĐT</strong> và <strong>Thông tư 13/2022/TT-BGDĐT</strong> của Bộ Giáo dục và Đào tạo:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li><strong>4 môn học bắt buộc:</strong> Ngữ văn, Toán, Ngoại ngữ 1, Lịch sử.</li>
              <li><strong>Môn học lựa chọn:</strong> Địa lí, GD Kinh tế & Pháp luật, Vật lí, Hóa học, Sinh học, Tin học, Công nghệ, Nghệ thuật.</li>
            </ul>
          </section>

          <section className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">2. Cổng Thông Tin Tuyển Sinh & Đánh Giá Năng Lực 2026</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Kỳ thi ĐGNL ĐHQG-HCM & ĐHQGHN (HSA)</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Cấu trúc đề thi đánh giá năng lực tư duy định lượng, định tính và khoa học.</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Kỳ thi Đánh giá Tư duy (TSA) - ĐH Bách Khoa HN</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Chuẩn tư duy Toán học, Đọc hiểu và Khoa học / Giải quyết vấn đề.</p>
              </div>
            </div>
          </section>
        </article>
      )}

      {/* Bottom CTA */}
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
        <button
          onClick={onGoHome}
          className="px-8 py-3 bg-sage-500 hover:bg-sage-600 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg text-sm tracking-wide"
        >
          Khám phá Trắc nghiệm Hướng nghiệp
        </button>
      </div>
    </div>
  );
};

export default TrustPageView;
