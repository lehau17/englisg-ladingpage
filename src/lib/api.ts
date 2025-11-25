// API configuration for landing page
// Use NEXT_PUBLIC_API_URL from environment variables
// For production, this is set in .env.local or Vercel environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.haudev.io.vn/api';

export interface LandingPageFeature {
  icon: string;
  title: string;
  description: string;
}

export interface LandingPageStat {
  number: string;
  label: string;
}

export interface LandingPageTestimonial {
  text: string;
  author: string;
  role: string;
  avatar: string;
}

export interface LandingPageClass {
  level: string;
  levelVi: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  duration: string;
  schedule: string;
  students: string;
  teacher: string;
  teacherFlag: string;
  price: string;
  features: string[];
  nextClass: string;
  popular?: boolean;
  courseId?: string;
  classroomId?: string;
}

export interface LandingPageFooterSection {
  title: string;
  links: string[];
}

export interface LandingPageScheduleRow {
  time: string;
  days: Record<string, string>;
}

export interface LandingPageTeacher {
  name: string;
  role: string;
  flag: string;
  experience?: string;
  specialty?: string;
  education?: string;
  bio?: string;
}

export interface LandingPageData {
  features: LandingPageFeature[];
  stats: LandingPageStat[];
  testimonials: LandingPageTestimonial[];
  classes: LandingPageClass[];
  classSchedule: LandingPageScheduleRow[];
  teachers: LandingPageTeacher[];
  footerSections: LandingPageFooterSection[];
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  level?: string;
  goals?: string[];
  message?: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}

// Server-side data fetching function
export async function getLandingPageData(): Promise<LandingPageData> {
  try {
    // During build time or when no API is available, use fallback data
    if (typeof window === 'undefined' && !process.env.NEXT_PUBLIC_API_URL) {
      console.log('[Landing Page] Using fallback data for build/prerendering');
      return getFallbackData();
    }

    console.log('[Landing Page] Fetching data from API:', `${API_BASE_URL}/public/v1/landing-page`);

    const response = await fetch(`${API_BASE_URL}/public/v1/landing-page`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add cache for better performance
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('[Landing Page] API returned error status:', response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('[Landing Page] Raw response:', result);

    // Backend returns { statusCode, message, data }
    const actualData = result.data || result;

    // Log to check if we're getting real data or fallback
    const hasRealData = actualData.classes && actualData.classes.length > 0 &&
                        actualData.classes.some((c: LandingPageClass) => c.courseId || c.classroomId);
    console.log('[Landing Page] Data received:', {
      classesCount: actualData.classes?.length || 0,
      teachersCount: actualData.teachers?.length || 0,
      scheduleCount: actualData.classSchedule?.length || 0,
      hasRealData,
      firstClassHasCourseId: actualData.classes?.[0]?.courseId ? 'YES' : 'NO',
      firstTeacher: actualData.teachers?.[0]?.name || 'N/A',
    });

    return actualData;
  } catch (error) {
    console.error('[Landing Page] Error fetching data, using fallback:', error);
    // Return fallback data if API fails
    return getFallbackData();
  }
}

// Client-side contact form submission
export async function submitContactForm(data: ContactFormData): Promise<ContactFormResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/v1/landing-page/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error submitting contact form:', error);
    }
    return {
      success: false,
      message: 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.'
    };
  }
}

// Course and Classroom types for enrollment
export interface Course {
  id: string;
  name: string;
  description: string;
  level: string;
  duration: string;
  price: number;
  thumbnail?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Classroom {
  id: string;
  courseId: string;
  name: string;
  courseName: string;
  startDate: string;
  endDate: string;
  schedule: string;
  teacher: string;
  maxStudents: number;
  currentStudents: number;
  price: number;
  status: 'OPEN' | 'FULL' | 'CLOSED' | 'IN_PROGRESS';
}

export interface CourseListResponse {
  success: boolean;
  data: {
    courses: Course[];
    total: number;
  };
}

export interface ClassroomListResponse {
  success: boolean;
  data: {
    classrooms: Classroom[];
    total: number;
  };
}

// Get all available courses
export async function getCourses(): Promise<Course[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/v1/courses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 1800 }, // Cache for 30 minutes
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data.data.courses || [];
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching courses:', error);
    }
    return getFallbackCourses();
  }
}

// Get classrooms for a specific course
export async function getClassroomsByCourse(courseId: string): Promise<Classroom[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/v1/courses/${courseId}/classrooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 600 }, // Cache for 10 minutes
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data.data.classrooms || [];
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching classrooms:', error);
    }
    return getFallbackClassrooms();
  }
}

// Fallback courses data
function getFallbackCourses(): Course[] {
  return [
    {
      id: 'course-1',
      name: 'Tiếng Anh Giao Tiếp Cơ Bản',
      description: 'Khóa học dành cho người mới bắt đầu, tập trung vào giao tiếp hàng ngày',
      level: 'Beginner',
      duration: '3 tháng',
      price: 1200000,
      status: 'ACTIVE',
    },
    {
      id: 'course-2',
      name: 'Tiếng Anh Giao Tiếp Trung Cấp',
      description: 'Nâng cao khả năng giao tiếp, mở rộng từ vựng và ngữ pháp',
      level: 'Intermediate',
      duration: '4 tháng',
      price: 1500000,
      status: 'ACTIVE',
    },
    {
      id: 'course-3',
      name: 'Tiếng Anh Giao Tiếp Nâng Cao',
      description: 'Hoàn thiện kỹ năng giao tiếp, chuẩn bị cho môi trường làm việc quốc tế',
      level: 'Advanced',
      duration: '6 tháng',
      price: 2000000,
      status: 'ACTIVE',
    },
  ];
}

// Fallback classrooms data
function getFallbackClassrooms(): Classroom[] {
  return [
    {
      id: 'class-1',
      courseId: 'course-1',
      name: 'Lớp Sáng Thứ 2-4-6',
      courseName: 'Tiếng Anh Giao Tiếp Cơ Bản',
      startDate: '2025-01-15',
      endDate: '2025-04-15',
      schedule: 'Thứ 2, 4, 6 - 08:00-10:00',
      teacher: 'Ms. Sarah Johnson',
      maxStudents: 15,
      currentStudents: 8,
      price: 1200000,
      status: 'OPEN',
    },
  ];
}

// Guest Enrollment types and API
export interface GuestEnrollmentData {
  role: 'student' | 'parent';
  courseId: string;
  classroomId: string;
  students: Array<{
    firstName?: string;
    lastName?: string;
    displayName?: string;
    email: string;
    phone?: string;
  }>;
  parent?: {
    firstName?: string;
    lastName?: string;
    displayName?: string;
    email: string;
    phone?: string;
  };
  returnUrl?: string;
  source?: string;
  note?: string;
}

export interface GuestEnrollmentResponse {
  paymentUrl: string;
  transactionId: string;
  studentId: string;
  parentId?: string | null;
  role: 'student' | 'parent';
  message?: string;
}

// AI Consultant API
export interface ConsultantQueryRequest {
  question: string;
}

export interface ExecutionStep {
  step: string;
  result?: string | number | boolean;
  [key: string]: unknown;
}

export interface ConsultantQueryResponse {
  answer: string;
  toolsUsed?: string[];
  processingTime?: number;
  executionSteps?: ExecutionStep[];
}

// Query AI consultant (for landing page)
export async function queryConsultant(
  question: string
): Promise<ConsultantQueryResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/v1/ai/consultant/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error querying consultant:', error);
    }
    throw error;
  }
}

// Create guest enrollment (for landing page users)
export async function createGuestEnrollment(
  data: GuestEnrollmentData
): Promise<GuestEnrollmentResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/v1/landing-page/guest-enrollment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create enrollment' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    // Backend wraps response in { statusCode, message, data }
    return result.data || result;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error creating guest enrollment:', error);
    }
    throw error;
  }
}

// Fallback data in case API is unavailable
function getFallbackData(): LandingPageData {
  return {
    features: [
      {
        icon: "🎯",
        title: "Học theo mục tiêu",
        description: "Chương trình học được cá nhân hóa theo mục tiêu và trình độ của từng học viên, giúp tối ưu hóa quá trình học tập."
      },
      {
        icon: "🗣️",
        title: "Thực hành giao tiếp",
        description: "Môi trường thực hành tiếng Anh với giáo viên bản ngữ và AI thông minh, giúp cải thiện khả năng giao tiếp tự nhiên."
      },
      {
        icon: "📱",
        title: "Học mọi lúc mọi nơi",
        description: "Ứng dụng di động hiện đại cho phép bạn học tiếng Anh bất cứ lúc nào, bất cứ nơi đâu với các bài học ngắn gọn hiệu quả."
      },
      {
        icon: "🏆",
        title: "Chứng chỉ uy tín",
        description: "Nhận chứng chỉ được công nhận quốc tế sau khi hoàn thành khóa học, nâng cao cơ hội nghề nghiệp của bạn."
      },
      {
        icon: "🎮",
        title: "Học qua trò chơi",
        description: "Phương pháp gamification thú vị giúp việc học trở nên vui nhộn và dễ dàng ghi nhớ kiến thức lâu dài."
      },
      {
        icon: "👥",
        title: "Cộng đồng học tập",
        description: "Tham gia cộng đồng học viên sôi động, chia sẻ kinh nghiệm và cùng nhau tiến bộ trong hành trình học tiếng Anh."
      }
    ],
    stats: [
      { number: "50K+", label: "Học viên đã tham gia" },
      { number: "95%", label: "Học viên hài lòng" },
      { number: "500+", label: "Bài học tương tác" },
      { number: "24/7", label: "Hỗ trợ liên tục" }
    ],
    testimonials: [
      {
        text: "EngliMaster đã thay đổi hoàn toàn cách tôi học tiếng Anh. Từ một người không dám nói tiếng Anh, giờ tôi đã tự tin giao tiếp với khách hàng quốc tế.",
        author: "Anh Minh Tuấn",
        role: "Nhân viên kinh doanh",
        avatar: "MT"
      },
      {
        text: "Chương trình học rất thú vị và hiệu quả. Tôi đã cải thiện điểm IELTS từ 5.5 lên 7.5 chỉ sau 4 tháng học với EngliMaster.",
        author: "Chị Thanh Hương",
        role: "Sinh viên",
        avatar: "TH"
      },
      {
        text: "Phương pháp gamification thật sự thu hút. Con tôi rất thích học và tiến bộ rõ rệt, từ việc ngại nói đến tự tin thuyết trình bằng tiếng Anh.",
        author: "Bà Minh Châu",
        role: "Phụ huynh",
        avatar: "MC"
      }
    ],
    classes: [
      {
        level: "Beginner",
        levelVi: "Cơ bản",
        color: "from-green-500 to-emerald-600",
        bgColor: "from-green-50 to-emerald-50",
        borderColor: "border-green-500",
        description: "Dành cho người mới bắt đầu học tiếng Anh",
        duration: "3 tháng",
        schedule: "Thứ 2, 4, 6 - 19:00-21:00",
        students: "8/12 học viên",
        teacher: "Ms. Sarah Johnson",
        teacherFlag: "🇺🇸",
        price: "1.200.000đ",
        features: [
          "Học bảng chữ cái và phát âm cơ bản",
          "Từ vựng thiết yếu hàng ngày (500 từ)",
          "Ngữ pháp cơ bản (hiện tại đơn, quá khứ đơn)",
          "Giao tiếp cơ bản: chào hỏi, giới thiệu bản thân",
          "Luyện nghe với audio đơn giản"
        ],
        nextClass: "Ngày 15/01/2025"
      },
      {
        level: "Intermediate",
        levelVi: "Trung cấp",
        color: "from-blue-500 to-indigo-600",
        bgColor: "from-blue-50 to-indigo-50",
        borderColor: "border-blue-500",
        description: "Cho học viên đã có kiến thức cơ bản",
        duration: "4 tháng",
        schedule: "Thứ 3, 5, 7 - 19:30-21:30",
        students: "10/12 học viên",
        teacher: "Mr. David Smith",
        teacherFlag: "🇬🇧",
        price: "1.500.000đ",
        features: [
          "Mở rộng từ vựng (1500+ từ theo chủ đề)",
          "Ngữ pháp nâng cao (thì hoàn thành, câu điều kiện)",
          "Luyện speaking với chủ đề đa dạng",
          "Đọc hiểu văn bản trung bình",
          "Viết email và thư từ đơn giản"
        ],
        nextClass: "Ngày 22/01/2025",
        popular: true
      },
      {
        level: "Advanced",
        levelVi: "Nâng cao",
        color: "from-purple-500 to-pink-600",
        bgColor: "from-purple-50 to-pink-50",
        borderColor: "border-purple-500",
        description: "Hoàn thiện kỹ năng và chuẩn bị thi cử",
        duration: "6 tháng",
        schedule: "Thứ 2, 4, 6 - 18:00-20:00",
        students: "6/12 học viên",
        teacher: "Ms. Emma Wilson",
        teacherFlag: "🇦🇺",
        price: "2.000.000đ",
        features: [
          "Từ vựng chuyên ngành và thành ngữ",
          "Ngữ pháp phức tạp và cấu trúc câu nâng cao",
          "Thảo luận và tranh luận bằng tiếng Anh",
          "Đọc hiểu văn bản phức tạp, báo chí",
          "Viết essay, báo cáo chuyên nghiệp"
        ],
        nextClass: "Ngày 29/01/2025"
      }
    ],
    classSchedule: [
      {
        time: '18:00-20:00',
        days: { mon: 'Advanced', wed: 'Advanced', fri: 'Advanced' }
      },
      {
        time: '19:00-21:00',
        days: { mon: 'Beginner', wed: 'Beginner', fri: 'Beginner' }
      },
      {
        time: '19:30-21:30',
        days: { tue: 'Intermediate', thu: 'Intermediate', sat: 'Intermediate' }
      }
    ],
    teachers: [
      {
        name: 'Ms. Sarah Johnson',
        role: 'Giám đốc học thuật',
        flag: '🇺🇸',
        experience: '8 năm kinh nghiệm',
        specialty: 'Phương pháp giao tiếp & phát âm',
        education: 'Thạc sĩ TESOL - Stanford University',
      },
      {
        name: 'Mr. David Smith',
        role: 'Trưởng khoa Intermediate',
        flag: '🇬🇧',
        experience: '6 năm kinh nghiệm',
        specialty: 'Ngữ pháp và luyện thi IELTS',
        education: 'Cử nhân Ngôn ngữ Anh - Cambridge',
      },
      {
        name: 'Ms. Emma Wilson',
        role: 'Chuyên gia Advanced',
        flag: '🇦🇺',
        experience: '10 năm kinh nghiệm',
        specialty: 'Business English & Academic Writing',
        education: 'Thạc sĩ Giáo dục - Melbourne University',
      }
    ],
    footerSections: [
      {
        title: "Khóa học",
        links: ["Tiếng Anh cơ bản", "Tiếng Anh giao tiếp", "IELTS/TOEIC", "Tiếng Anh thương mại"]
      },
      {
        title: "Hỗ trợ",
        links: ["Trung tâm trợ giúp", "Liên hệ", "FAQ", "Chính sách bảo mật"]
      },
      {
        title: "Liên hệ",
        links: ["📞 1900-1234", "✉️ support@englimaster.com", "📍 Hà Nội, Việt Nam"]
      }
    ]
  };
}
