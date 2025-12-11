/**
 * @file EnglishLearningLanding.tsx
 * @description Component chính của trang landing, compose tất cả các section con.
 * File này đã được refactor từ 915 dòng xuống còn ~60 dòng bằng cách
 * tách thành các section components riêng biệt trong thư mục landing/.
 */

import { LandingPageData } from '@/lib/api';
import {
  Header,
  HeroSection,
  FeaturesSection,
  AboutSection,
  StatsSection,
  ClassesSection,
  TestimonialsSection,
  ContactSection,
  CTASection,
  Footer,
} from './landing';

/**
 * @interface EnglishLearningLandingProps
 * @description Props cho component chính của landing page
 * @property {LandingPageData} data - Dữ liệu từ API bao gồm features, stats, classes, teachers, etc.
 */
interface EnglishLearningLandingProps {
  data: LandingPageData;
}

/**
 * @component EnglishLearningLanding
 * @description Component compose chính, sắp xếp tất cả các section theo thứ tự hiển thị.
 * Mỗi section là một component độc lập, nhận dữ liệu qua props.
 * 
 * @param {EnglishLearningLandingProps} props - Props chứa dữ liệu từ API
 * @returns {JSX.Element} Trang landing hoàn chỉnh
 */
export default function EnglishLearningLanding({ data }: EnglishLearningLandingProps) {

  // ==================== DESTRUCTURE DATA ====================
  // Destructure dữ liệu từ API với giá trị mặc định là mảng rỗng
  // Điều này đảm bảo không bị lỗi nếu API trả về null/undefined
  const {
    features = [],      // Mảng các tính năng nổi bật
    stats = [],         // Mảng số liệu thống kê (50K+ học viên, 95% hài lòng...)
    testimonials = [],  // Mảng đánh giá từ học viên
    classes = [],       // Mảng các lớp học (Beginner, Intermediate, Advanced)
    classSchedule = [], // Mảng lịch học trong tuần
    teachers = [],      // Mảng thông tin giáo viên
    footerSections = [] // Mảng các section links cho footer
  } = data || {};

  return (
    // ==================== MAIN WRAPPER ====================
    // min-h-screen: chiều cao tối thiểu = viewport height (100vh)
    // bg-gradient-to-br: gradient từ góc trên trái xuống góc dưới phải
    // from-indigo-600: bắt đầu từ màu indigo (#4f46e5)
    // via-purple-600: qua màu purple ở giữa (#9333ea)
    // to-blue-700: kết thúc tại màu blue (#1d4ed8)
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700">

      {/* ==================== HEADER ==================== */}
      {/* Thanh điều hướng cố định ở đầu trang với logo và nav links */}
      <Header />

      {/* ==================== HERO SECTION ==================== */}
      {/* Banner chính với tiêu đề lớn, mô tả và nút CTA */}
      <HeroSection />

      {/* ==================== FEATURES SECTION ==================== */}
      {/* Grid hiển thị các tính năng nổi bật của EngliMaster */}
      <FeaturesSection features={features} />

      {/* ==================== ABOUT SECTION ==================== */}
      {/* Giới thiệu về EngliMaster: sứ mệnh, tầm nhìn, giá trị, đội ngũ giáo viên */}
      <AboutSection teachers={teachers} />

      {/* ==================== STATS SECTION ==================== */}
      {/* Hiển thị các con số ấn tượng: số học viên, tỷ lệ hài lòng... */}
      <StatsSection stats={stats} />

      {/* ==================== CLASSES SECTION ==================== */}
      {/* Cards các lớp học theo trình độ và bảng lịch học trong tuần */}
      <ClassesSection classes={classes} classSchedule={classSchedule} />

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      {/* Đánh giá và nhận xét từ học viên */}
      <TestimonialsSection testimonials={testimonials} />

      {/* ==================== CONTACT SECTION ==================== */}
      {/* Form liên hệ, thông tin hotline, email, địa chỉ và FAQ */}
      <ContactSection classes={classes} />

      {/* ==================== CTA SECTION ==================== */}
      {/* Kêu gọi hành động cuối trang với nút đăng ký nổi bật */}
      <CTASection />

      {/* ==================== FOOTER ==================== */}
      {/* Chân trang với logo, mô tả và các link điều hướng */}
      <Footer footerSections={footerSections} />
    </div>
  );
}
