/**
 * @file enroll/page.tsx
 * @description Trang đăng ký khóa học chính của EngliMaster.
 * Cho phép người dùng:
 * - Chọn khóa học từ danh sách
 * - Xem các lớp học có sẵn
 * - Điền thông tin đăng ký (học sinh hoặc phụ huynh)
 * - Gửi email xác thực để hoàn tất thanh toán
 */

'use client';

// ==================== IMPORTS ====================
// Lucide React icons cho UI
import { BookOpen, Calendar, CalendarDays, Check, GraduationCap, UserCircle, Users } from 'lucide-react';
// Next.js Link component cho navigation
import Link from 'next/link';
// Hook để đọc query params từ URL
import { useSearchParams } from 'next/navigation';
// React hooks
import { Suspense, useEffect, useState } from 'react';
// Toast notifications từ Sonner
import { toast } from 'sonner';
// API functions và types
import { getClassroomsByCourse, getCourses, type Classroom, type Course } from '../../lib/api';

// ==================== CONSTANTS ====================
// URL của API backend, lấy từ biến môi trường hoặc dùng mặc định
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.haudev.io.vn/api';

/**
 * @component EnrollPageContent
 * @description Component chính của trang đăng ký, chứa toàn bộ logic và UI
 */
function EnrollPageContent() {
  // ==================== URL PARAMS ====================
  // Hook để đọc query parameters từ URL
  const searchParams = useSearchParams();
  // Lấy courseId từ URL nếu có (VD: /enroll?courseId=abc123)
  const courseIdFromUrl = searchParams.get('courseId');

  // ==================== STATE MANAGEMENT ====================
  // Danh sách tất cả các khóa học từ API
  const [courses, setCourses] = useState<Course[]>([]);
  // Khóa học được chọn hiện tại
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  // Danh sách lớp học của khóa đã chọn
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  // Lớp học được chọn để đăng ký
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);
  // Trạng thái loading cho danh sách khóa học
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  // Trạng thái loading cho danh sách lớp học
  const [isLoadingClassrooms, setIsLoadingClassrooms] = useState(false);

  // ==================== FORM STATE ====================
  // Vai trò người đăng ký: 'student' (học sinh tự đăng ký) hoặc 'parent' (phụ huynh đăng ký cho con)
  const [role, setRole] = useState<'student' | 'parent'>('student');
  // Mảng thông tin học sinh (có thể có nhiều học sinh nếu phụ huynh đăng ký)
  const [students, setStudents] = useState([{
    name: '',    // Họ tên học sinh
    phone: '',   // Số điện thoại
    email: '',   // Địa chỉ email
  }]);
  // Thông tin phụ huynh (chỉ dùng khi role = 'parent')
  const [parentInfo, setParentInfo] = useState({
    name: '',    // Họ tên phụ huynh
    phone: '',   // Số điện thoại phụ huynh
    email: '',   // Email phụ huynh
  });
  // Hiển thị/ẩn modal form liên hệ
  const [showContactForm, setShowContactForm] = useState(false);

  // ==================== EFFECTS ====================
  /**
   * Effect 1: Tải danh sách khóa học khi component mount
   */
  useEffect(() => {
    loadCourses();
  }, []);

  /**
   * Effect 2: Khi chọn khóa học mới, tải danh sách lớp học tương ứng
   */
  useEffect(() => {
    if (selectedCourse) {
      loadClassrooms(selectedCourse.id);
    } else {
      // Nếu bỏ chọn khóa học, reset danh sách lớp
      setClassrooms([]);
      setSelectedClassroom(null);
    }
  }, [selectedCourse]);

  // ==================== API FUNCTIONS ====================
  /**
   * Tải danh sách tất cả khóa học từ API
   */
  const loadCourses = async () => {
    setIsLoadingCourses(true);
    try {
      const data = await getCourses();
      console.log(' Courses loaded:', data);
      setCourses(data);

      // Tự động chọn khóa học nếu có courseId trong URL
      if (courseIdFromUrl && data.length > 0) {
        console.log('🔍 Looking for courseId:', courseIdFromUrl);
        const courseToSelect = data.find(c => c.id === courseIdFromUrl);
        if (courseToSelect) {
          console.log(' Course found and selected:', courseToSelect);
          setSelectedCourse(courseToSelect);
        } else {
          console.warn(' Course not found with ID:', courseIdFromUrl);
        }
      }
    } catch (error) {
      console.error(' Error loading courses:', error);
    } finally {
      setIsLoadingCourses(false);
    }
  };

  /**
   * Tải danh sách lớp học cho một khóa học cụ thể
   * @param {string} courseId - ID của khóa học
   */
  const loadClassrooms = async (courseId: string) => {
    setIsLoadingClassrooms(true);
    try {
      console.log('🏫 Loading classrooms for course:', courseId);
      const data = await getClassroomsByCourse(courseId);
      console.log(' Classrooms loaded:', data);
      setClassrooms(data);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error loading classrooms:', error);
      }
    } finally {
      setIsLoadingClassrooms(false);
    }
  };

  // ==================== EVENT HANDLERS ====================
  /**
   * Xử lý khi người dùng click nút "Đăng Ký & Thanh Toán"
   * @param {Classroom} classroom - Lớp học được chọn
   */
  const handleEnroll = (classroom: Classroom) => {
    setSelectedClassroom(classroom);
    setShowContactForm(true);
    toast.info('Vui lòng điền thông tin đăng ký');
  };

  /**
   * Thêm một học sinh mới vào form (cho phụ huynh đăng ký nhiều con)
   */
  const handleAddStudent = () => {
    setStudents([...students, { name: '', phone: '', email: '' }]);
  };

  /**
   * Xóa một học sinh khỏi form
   * @param {number} index - Vị trí của học sinh trong mảng
   */
  const handleRemoveStudent = (index: number) => {
    if (students.length > 1) {
      setStudents(students.filter((_, i) => i !== index));
    }
  };

  /**
   * Cập nhật thông tin của một học sinh
   * @param {number} index - Vị trí của học sinh
   * @param {string} field - Tên field cần cập nhật (name, phone, email)
   * @param {string} value - Giá trị mới
   */
  const handleStudentChange = (index: number, field: string, value: string) => {
    const newStudents = [...students];
    newStudents[index] = { ...newStudents[index], [field]: value };
    setStudents(newStudents);
  };

  /**
   * Xử lý submit form đăng ký
   * 1. Validate thông tin
   * 2. Parse tên thành firstName/lastName
   * 3. Gọi API gửi email xác thực
   * @param {React.FormEvent} e - Event form submit
   */
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate tất cả học sinh phải có đủ thông tin
    for (const student of students) {
      if (!student.name || !student.phone || !student.email) {
        toast.error('Vui lòng điền đầy đủ thông tin cho tất cả học sinh');
        return;
      }
    }

    // Validate thông tin phụ huynh nếu role = 'parent'
    if (role === 'parent' && (!parentInfo.name || !parentInfo.phone || !parentInfo.email)) {
      toast.error('Vui lòng điền đầy đủ thông tin phụ huynh');
      return;
    }

    // Parse tên học sinh thành firstName và lastName
    // VD: "Nguyễn Văn A" -> firstName: "Nguyễn", lastName: "Văn A"
    const parseStudents = students.map(s => {
      const nameParts = s.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      return {
        firstName,
        lastName,
        email: s.email.trim(),
        phone: s.phone.trim(),
      };
    });

    // Parse tên phụ huynh nếu có
    let parseParent = undefined;
    if (role === 'parent') {
      const parentNameParts = parentInfo.name.trim().split(' ');
      parseParent = {
        firstName: parentNameParts[0] || '',
        lastName: parentNameParts.slice(1).join(' ') || '',
        email: parentInfo.email.trim(),
        phone: parentInfo.phone.trim(),
      };
    }

    // Gọi API gửi email xác thực
    try {
      toast.loading('Đang gửi email xác thực...');

      const response = await fetch(`${API_BASE_URL}/public/v1/landing-page/verify-enrollment-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          students: parseStudents,
          parent: parseParent,
          courseId: selectedClassroom!.courseId,
          classroomId: selectedClassroom!.id,
        }),
      });

      const result = await response.json();
      toast.dismiss();

      // Xử lý lỗi từ API
      if (!response.ok) {
        const errorMessage = result.message || 'Có lỗi xảy ra';
        toast.error(errorMessage);
        return;
      }

      // Thành công - email đã gửi
      setShowContactForm(false);
      toast.dismiss();

      toast.success(
        `Email xác thực đã được gửi đến ${parseStudents[0].email}`,
        { duration: 6000 }
      );

      toast.info(
        'Vui lòng kiểm tra hộp thư và click vào link để hoàn tất thanh toán. Link có hiệu lực trong 30 phút.',
        { duration: 8000 }
      );
    } catch (error) {
      toast.dismiss();
      console.error('Verification error:', error);
      toast.error('Có lỗi xảy ra khi gửi email xác thực. Vui lòng thử lại.');
    }
  };

  // ==================== UTILITY FUNCTIONS ====================
  /**
   * Format số tiền theo định dạng VND
   * @param {number} price - Số tiền cần format
   * @returns {string} Chuỗi đã format (VD: "1.200.000 ₫")
   */
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  /**
   * Format ngày theo định dạng Việt Nam
   * @param {string} dateStr - Chuỗi ngày ISO
   * @returns {string} Ngày đã format (VD: "15/01/2025")
   */
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN');
  };

  /**
   * Lấy badge status cho lớp học
   * @param {Classroom['status']} status - Trạng thái lớp học
   * @returns {{ text: string, color: string }} Object chứa text và class CSS
   */
  const getStatusBadge = (status: Classroom['status']) => {
    const badges = {
      OPEN: { text: 'Còn chỗ', color: 'bg-green-100 text-green-800' },
      FULL: { text: 'Đã đầy', color: 'bg-red-100 text-red-800' },
      CLOSED: { text: 'Đã đóng', color: 'bg-gray-100 text-gray-800' },
      IN_PROGRESS: { text: 'Đang học', color: 'bg-blue-100 text-blue-800' },
    };
    return badges[status];
  };

  // ==================== RENDER ====================
  return (
    // ==================== PAGE WRAPPER ====================
    // min-h-screen: chiều cao tối thiểu = viewport height
    // bg-gray-50: nền xám nhạt (#f9fafb)
    <div className="min-h-screen bg-gray-50">

      {/* ==================== HEADER ==================== */}
      {/* bg-white: nền trắng */}
      {/* shadow-sm: bóng đổ nhẹ */}
      {/* sticky top-0: cố định ở đầu trang khi scroll */}
      {/* z-40: z-index 40 */}
      <header className="bg-white shadow-sm sticky top-0 z-40">

        {/* Container cho navigation */}
        {/* max-w-7xl mx-auto: chiều rộng tối đa 1280px, căn giữa */}
        {/* px-4 sm:px-6 lg:px-8: responsive padding */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Flex container */}
          {/* flex justify-between items-center: phân bố 2 đầu, căn giữa dọc */}
          {/* h-16: chiều cao 64px */}
          <div className="flex justify-between items-center h-16">

            {/* Logo với gradient text */}
            {/* text-2xl font-bold: chữ lớn đậm */}
            {/* bg-gradient-to-r: gradient từ trái sang phải */}
            {/* bg-clip-text text-transparent: áp gradient lên text */}
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              EngliMaster
            </Link>

            {/* Link quay về trang chủ */}
            {/* text-gray-600: màu xám */}
            {/* hover:text-indigo-600: đổi màu khi hover */}
            {/* transition-colors: animation màu mượt */}
            <Link
              href="/"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              ← Về trang chủ
            </Link>
          </div>
        </nav>
      </header>

      {/* ==================== HERO SECTION ==================== */}
      {/* bg-gradient-to-r: gradient ngang indigo -> purple */}
      {/* text-white: chữ trắng */}
      {/* py-16: padding trên/dưới 64px */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">

        {/* Container căn giữa */}
        {/* text-center: căn giữa text */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Tiêu đề chính */}
          {/* text-4xl md:text-5xl: responsive font-size */}
          {/* font-bold: chữ đậm */}
          {/* mb-4: margin-bottom 16px */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Đăng Ký Khóa Học
          </h1>

          {/* Mô tả */}
          {/* text-xl: font-size 20px */}
          {/* text-white/90: màu trắng với 90% opacity */}
          {/* max-w-2xl mx-auto: giới hạn chiều rộng, căn giữa */}
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Chọn khóa học phù hợp và đăng ký lớp học ngay hôm nay
          </p>
        </div>
      </section>

      {/* ==================== MAIN CONTENT ==================== */}
      {/* py-12: padding trên/dưới 48px */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Grid layout 3 cột */}
        {/* grid lg:grid-cols-3: 3 cột từ 1024px */}
        {/* gap-8: khoảng cách 32px */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ==================== LEFT COLUMN: COURSE SELECTION ==================== */}
          {/* lg:col-span-1: chiếm 1 cột */}
          <div className="lg:col-span-1">

            {/* Card chọn khóa học */}
            {/* bg-white: nền trắng */}
            {/* rounded-xl: border-radius 12px */}
            {/* shadow-lg: bóng đổ lớn */}
            {/* p-6: padding 24px */}
            {/* sticky top-24: cố định cách top 96px */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">

              {/* Tiêu đề section */}
              {/* text-2xl font-bold: chữ lớn đậm */}
              {/* text-gray-900: màu đen */}
              {/* mb-6: margin-bottom 24px */}
              {/* flex items-center: icon + text ngang hàng */}
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                {/* w-6 h-6: icon 24px */}
                {/* mr-2: margin-right 8px */}
                {/* text-indigo-600: màu indigo */}
                <BookOpen className="w-6 h-6 mr-2 text-indigo-600" />
                Chọn Khóa Học
              </h2>

              {/* Hiển thị skeleton loading khi đang tải */}
              {isLoadingCourses ? (
                // space-y-4: khoảng cách dọc 16px
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    // animate-pulse: animation nhấp nháy
                    <div key={i} className="animate-pulse">
                      {/* h-24: chiều cao 96px */}
                      {/* bg-gray-200: màu xám nhạt */}
                      {/* rounded-lg: border-radius 8px */}
                      <div className="h-24 bg-gray-200 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : (
                // Danh sách khóa học
                // space-y-3: khoảng cách dọc 12px
                <div className="space-y-3">
                  {courses.map((course) => (
                    // Course card button
                    // w-full text-left: rộng 100%, căn trái text
                    // p-4: padding 16px
                    // rounded-lg: border-radius 8px
                    // border-2: viền 2px
                    // transition-all: animation mượt
                    // Thay đổi style khi được chọn
                    <button
                      key={course.id}
                      onClick={() => setSelectedCourse(course)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${selectedCourse?.id === course.id
                        ? 'border-indigo-600 bg-indigo-50'   // Đã chọn: viền indigo, nền nhạt
                        : 'border-gray-200 hover:border-indigo-300 bg-white'  // Chưa chọn: viền xám
                        }`}
                    >
                      {/* Header: tên và check icon */}
                      {/* flex justify-between items-start: phân bố 2 đầu */}
                      {/* mb-2: margin-bottom 8px */}
                      <div className="flex justify-between items-start mb-2">
                        {/* font-semibold: chữ semi-bold */}
                        {/* text-gray-900: màu đen */}
                        {/* flex-1: chiếm hết không gian còn lại */}
                        <h3 className="font-semibold text-gray-900 flex-1">
                          {course.name}
                        </h3>
                        {/* Check icon khi được chọn */}
                        {selectedCourse?.id === course.id && (
                          <Check className="w-5 h-5 text-indigo-600" />
                        )}
                      </div>

                      {/* Mô tả khóa học */}
                      {/* text-sm: font-size 14px */}
                      {/* text-gray-600: màu xám */}
                      {/* mb-2: margin-bottom 8px */}
                      <p className="text-sm text-gray-600 mb-2">
                        {course.description}
                      </p>

                      {/* Footer: thời lượng và giá */}
                      {/* flex justify-between: phân bố 2 đầu */}
                      {/* text-xs: font-size 12px */}
                      <div className="flex justify-between items-center text-xs">
                        {/* Thời lượng với icon */}
                        {/* text-gray-500: màu xám nhạt */}
                        {/* flex items-center gap-1: icon + text với khoảng cách 4px */}
                        <span className="text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {course.duration}
                        </span>
                        {/* Giá */}
                        {/* font-semibold: chữ semi-bold */}
                        {/* text-indigo-600: màu indigo */}
                        <span className="font-semibold text-indigo-600">
                          {formatPrice(course.price)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ==================== RIGHT COLUMN: CLASSROOM LIST ==================== */}
          {/* lg:col-span-2: chiếm 2 cột */}
          <div className="lg:col-span-2">

            {/* Hiển thị placeholder nếu chưa chọn khóa học */}
            {!selectedCourse ? (
              // Card placeholder
              // bg-white rounded-xl shadow-lg: card style
              // p-12: padding 48px
              // text-center: căn giữa
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                {/* Icon lớn */}
                {/* w-20 h-20: 80px */}
                {/* mx-auto mb-4: căn giữa, margin-bottom 16px */}
                {/* text-indigo-600: màu indigo */}
                <GraduationCap className="w-20 h-20 mx-auto mb-4 text-indigo-600" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Chọn Khóa Học Để Xem Lớp
                </h3>
                <p className="text-gray-600">
                  Vui lòng chọn một khóa học bên trái để xem danh sách các lớp học có sẵn
                </p>
              </div>
            ) : (
              // Hiển thị danh sách lớp học
              <div>
                {/* Header */}
                {/* mb-6: margin-bottom 24px */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Lớp Học: {selectedCourse.name}
                  </h2>
                  <p className="text-gray-600">{selectedCourse.description}</p>
                </div>

                {/* Loading skeleton cho lớp học */}
                {isLoadingClassrooms ? (
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      // animate-pulse: animation loading
                      <div key={i} className="animate-pulse bg-white rounded-xl p-6">
                        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : classrooms.length === 0 ? (
                  // Không có lớp học
                  <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                    <CalendarDays className="w-20 h-20 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Chưa Có Lớp Nào
                    </h3>
                    <p className="text-gray-600">
                      Hiện tại chưa có lớp học nào cho khóa này. Vui lòng liên hệ để được tư vấn.
                    </p>
                  </div>
                ) : (
                  // Danh sách lớp học
                  // space-y-4: khoảng cách dọc 16px
                  <div className="space-y-4">
                    {classrooms.map((classroom) => {
                      // Lấy badge status
                      const statusBadge = getStatusBadge(classroom.status);
                      // Tính số chỗ còn trống
                      const availableSlots = classroom.maxStudents - classroom.currentStudents;
                      // Kiểm tra có thể đăng ký không
                      const isAvailable = classroom.status === 'OPEN';

                      return (
                        // Classroom card
                        // bg-white rounded-xl shadow-lg: card style
                        // p-6: padding 24px
                        // hover:shadow-xl: bóng lớn hơn khi hover
                        // transition-shadow: animation bóng mượt
                        <div
                          key={classroom.id}
                          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                        >
                          {/* Header: tên lớp, badge và giá */}
                          {/* flex justify-between items-start: phân bố 2 đầu */}
                          {/* mb-4: margin-bottom 16px */}
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              {/* Tên lớp */}
                              {/* text-xl font-bold: chữ lớn đậm */}
                              {/* mb-1: margin-bottom 4px */}
                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {classroom.name}
                              </h3>
                              {/* Status badge */}
                              {/* inline-block: để set padding */}
                              {/* px-3 py-1: padding 12px ngang, 4px dọc */}
                              {/* rounded-full: bo tròn hoàn toàn */}
                              {/* text-sm font-medium: chữ nhỏ medium */}
                              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusBadge.color}`}>
                                {statusBadge.text}
                              </span>
                            </div>

                            {/* Giá */}
                            <div className="text-right">
                              {/* text-2xl font-bold: giá lớn đậm */}
                              {/* text-indigo-600: màu indigo */}
                              <div className="text-2xl font-bold text-indigo-600">
                                {formatPrice(classroom.price)}
                              </div>
                              <div className="text-sm text-gray-500">
                                /khóa học
                              </div>
                            </div>
                          </div>

                          {/* Thông tin chi tiết */}
                          {/* grid md:grid-cols-2: 2 cột từ 768px */}
                          {/* gap-4: khoảng cách 16px */}
                          {/* mb-4: margin-bottom 16px */}
                          <div className="grid md:grid-cols-2 gap-4 mb-4">

                            {/* Thời gian */}
                            {/* flex items-center: icon + text ngang hàng */}
                            {/* text-gray-700: màu xám đậm */}
                            <div className="flex items-center text-gray-700">
                              {/* w-5 h-5: icon 20px */}
                              {/* mr-2: margin-right 8px */}
                              {/* text-indigo-600: màu indigo */}
                              <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
                              <div>
                                <div className="text-sm text-gray-500">Thời gian</div>
                                <div className="font-medium">{classroom.schedule}</div>
                              </div>
                            </div>

                            {/* Giáo viên */}
                            <div className="flex items-center text-gray-700">
                              <UserCircle className="w-5 h-5 mr-2 text-indigo-600" />
                              <div>
                                <div className="text-sm text-gray-500">Giáo viên</div>
                                <div className="font-medium">{classroom.teacher}</div>
                              </div>
                            </div>

                            {/* Ngày khai giảng */}
                            <div className="flex items-center text-gray-700">
                              <CalendarDays className="w-5 h-5 mr-2 text-indigo-600" />
                              <div>
                                <div className="text-sm text-gray-500">Ngày khai giảng</div>
                                <div className="font-medium">{formatDate(classroom.startDate)}</div>
                              </div>
                            </div>

                            {/* Số chỗ */}
                            <div className="flex items-center text-gray-700">
                              <Users className="w-5 h-5 mr-2 text-indigo-600" />
                              <div>
                                <div className="text-sm text-gray-500">Số chỗ</div>
                                <div className="font-medium">
                                  Còn {availableSlots}/{classroom.maxStudents} chỗ
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Nút đăng ký */}
                          {/* w-full: rộng 100% */}
                          {/* py-3 px-6: padding 12px dọc, 24px ngang */}
                          {/* rounded-lg: border-radius 8px */}
                          {/* font-semibold: chữ semi-bold */}
                          {/* transition-all: animation mượt */}
                          {/* flex items-center justify-center gap-2: icon + text căn giữa */}
                          <button
                            onClick={() => handleEnroll(classroom)}
                            disabled={!isAvailable}
                            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${isAvailable
                              // Có thể đăng ký: gradient, hover effects
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:-translate-y-0.5'
                              // Không thể đăng ký: xám, disabled
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                          >
                            {isAvailable ? (
                              <>
                                <GraduationCap className="w-5 h-5" />
                                Đăng Ký & Thanh Toán
                              </>
                            ) : (
                              'Không Thể Đăng Ký'
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==================== CONTACT INFO MODAL ==================== */}
      {/* Hiển thị khi showContactForm = true và đã chọn lớp */}
      {showContactForm && selectedClassroom && (
        // Modal overlay
        // fixed inset-0: phủ kín màn hình
        // bg-black/60: nền đen 60% opacity
        // backdrop-blur-sm: blur nền
        // flex items-center justify-center: căn giữa modal
        // z-[100]: z-index 100 (cao nhất)
        // p-4: padding 16px
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">

          {/* Modal content */}
          {/* bg-white: nền trắng */}
          {/* rounded-xl: border-radius 12px */}
          {/* max-w-md w-full: chiều rộng tối đa 448px */}
          {/* p-6: padding 24px */}
          {/* relative: cho absolute children */}
          {/* max-h-[90vh]: chiều cao tối đa 90% viewport */}
          {/* overflow-y-auto: scroll dọc nếu cần */}
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">

            {/* Modal title */}
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Thông Tin Liên Hệ
            </h3>

            <p className="text-gray-600 mb-6">
              Vui lòng cung cấp thông tin để chúng tôi liên hệ xác nhận đăng ký
            </p>

            {/* Form */}
            {/* space-y-4: khoảng cách dọc 16px */}
            <form onSubmit={handleContactSubmit} className="space-y-4">

              {/* ==================== ROLE SELECTION ==================== */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Bạn đăng ký với tư cách *
                </label>

                {/* Grid 2 cột cho role buttons */}
                {/* grid grid-cols-2: 2 cột bằng nhau */}
                {/* gap-3: khoảng cách 12px */}
                <div className="grid grid-cols-2 gap-3">

                  {/* Student button */}
                  {/* px-4 py-3: padding */}
                  {/* rounded-lg: border-radius 8px */}
                  {/* border-2: viền 2px */}
                  {/* transition-all: animation mượt */}
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${role === 'student'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'  // Đã chọn
                      : 'border-gray-300 hover:border-indigo-300'          // Chưa chọn
                      }`}
                  >
                    <div className="text-center">
                      {/* Icon */}
                      <div className="text-2xl mb-1 flex justify-center text-indigo-600">
                        <GraduationCap className="w-8 h-8" />
                      </div>
                      <div className="font-semibold">Học sinh</div>
                    </div>
                  </button>

                  {/* Parent button */}
                  <button
                    type="button"
                    onClick={() => setRole('parent')}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${role === 'parent'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-indigo-300'
                      }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1 flex justify-center text-purple-600">
                        <Users className="w-8 h-8" />
                      </div>
                      <div className="font-semibold">Phụ huynh</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* ==================== STUDENT INFO ==================== */}
              {/* Wrap trong div với nền xám nếu role = parent */}
              <div className={role === 'parent' ? 'bg-gray-50 p-4 rounded-lg' : ''}>

                {/* Header cho phần học sinh (chỉ hiện khi role = parent) */}
                {role === 'parent' && (
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-semibold text-gray-700">
                      Thông tin học sinh ({students.length})
                    </h4>
                    {/* Nút thêm học sinh */}
                    <button
                      type="button"
                      onClick={handleAddStudent}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                    >
                      <span>+</span> Thêm học sinh
                    </button>
                  </div>
                )}

                {/* Loop qua danh sách học sinh */}
                {students.map((student, index) => (
                  // Mỗi học sinh có border-top nếu không phải đầu tiên
                  <div key={index} className={`space-y-4 ${index > 0 ? 'mt-6 pt-6 border-t border-gray-200' : ''}`}>

                    {/* Header học sinh (nếu có nhiều học sinh) */}
                    {students.length > 1 && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Học sinh {index + 1}</span>
                        {/* Nút xóa học sinh */}
                        <button
                          type="button"
                          onClick={() => handleRemoveStudent(index)}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Xóa
                        </button>
                      </div>
                    )}

                    {/* Input họ tên */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Họ tên {role === 'parent' ? 'học sinh' : 'của bạn'} *
                      </label>
                      {/* w-full: rộng 100% */}
                      {/* px-4 py-3: padding */}
                      {/* rounded-lg: border-radius 8px */}
                      {/* border border-gray-300: viền xám */}
                      {/* text-gray-900: màu chữ đen */}
                      {/* placeholder:text-gray-400: placeholder màu xám nhạt */}
                      {/* focus:ring-2 focus:ring-indigo-500: viền focus màu indigo */}
                      {/* focus:border-transparent: ẩn border khi focus */}
                      <input
                        type="text"
                        value={student.name}
                        onChange={(e) => handleStudentChange(index, 'name', e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder={role === 'parent' ? 'Nhập họ tên học sinh' : 'Nhập họ tên của bạn'}
                      />
                    </div>

                    {/* Input số điện thoại */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Số điện thoại {role === 'parent' ? 'học sinh' : ''} *
                      </label>
                      <input
                        type="tel"
                        value={student.phone}
                        onChange={(e) => handleStudentChange(index, 'phone', e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>

                    {/* Input email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email {role === 'parent' ? 'học sinh' : ''} *
                      </label>
                      <input
                        type="email"
                        value={student.email}
                        onChange={(e) => handleStudentChange(index, 'email', e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Nhập địa chỉ email"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* ==================== PARENT INFO (chỉ hiện khi role = 'parent') ==================== */}
              {role === 'parent' && (
                // bg-indigo-50: nền indigo nhạt
                // p-4: padding 16px
                // rounded-lg: border-radius 8px
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Thông tin phụ huynh
                  </h4>
                  <div className="space-y-4">
                    {/* Họ tên phụ huynh */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Họ tên phụ huynh *
                      </label>
                      <input
                        type="text"
                        value={parentInfo.name}
                        onChange={(e) => setParentInfo({ ...parentInfo, name: e.target.value })}
                        required={role === 'parent'}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Nhập họ tên phụ huynh"
                      />
                    </div>

                    {/* Số điện thoại phụ huynh */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Số điện thoại phụ huynh *
                      </label>
                      <input
                        type="tel"
                        value={parentInfo.phone}
                        onChange={(e) => setParentInfo({ ...parentInfo, phone: e.target.value })}
                        required={role === 'parent'}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>

                    {/* Email phụ huynh */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email phụ huynh *
                      </label>
                      <input
                        type="email"
                        value={parentInfo.email}
                        onChange={(e) => setParentInfo({ ...parentInfo, email: e.target.value })}
                        required={role === 'parent'}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Nhập địa chỉ email"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== FORM ACTIONS ==================== */}
              {/* flex space-x-3: 2 nút cạnh nhau với khoảng cách 12px */}
              {/* pt-4: padding-top 16px */}
              <div className="flex space-x-3 pt-4">

                {/* Nút Hủy */}
                {/* flex-1: chiếm 50% */}
                {/* border border-gray-300: viền xám */}
                {/* text-gray-700: chữ xám */}
                {/* hover:bg-gray-50: nền xám nhạt khi hover */}
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>

                {/* Nút Tiếp tục */}
                {/* bg-indigo-600: nền indigo */}
                {/* text-white: chữ trắng */}
                {/* hover:bg-indigo-700: nền đậm hơn khi hover */}
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Tiếp tục
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * @component EnrollPage
 * @description Component wrapper với Suspense để hỗ trợ useSearchParams
 * Suspense cần thiết vì useSearchParams là một hook dynamic
 */
export default function EnrollPage() {
  return (
    // Suspense wrapper với fallback loading UI
    <Suspense fallback={
      // Loading state
      // min-h-screen: chiều cao tối thiểu = viewport
      // bg-gray-50: nền xám nhạt
      // flex items-center justify-center: căn giữa
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          {/* Spinner animation */}
          {/* animate-spin: animation quay */}
          {/* rounded-full: hình tròn */}
          {/* h-12 w-12: 48px */}
          {/* border-b-2 border-indigo-600: viền dưới màu indigo */}
          {/* mx-auto mb-4: căn giữa, margin-bottom 16px */}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    }>
      <EnrollPageContent />
    </Suspense>
  );
}
