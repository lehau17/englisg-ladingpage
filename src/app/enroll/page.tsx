'use client';

import { BookOpen, Calendar, CalendarDays, GraduationCap, UserCircle, Users } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getClassroomsByCourse, getCourses, type Classroom, type Course } from '../../lib/api';

// API Base URL - use environment variable or fallback to production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.haudev.io.vn/api';

function EnrollPageContent() {
  const searchParams = useSearchParams();
  const courseIdFromUrl = searchParams.get('courseId');

  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [isLoadingClassrooms, setIsLoadingClassrooms] = useState(false);

  // For contact form
  const [role, setRole] = useState<'student' | 'parent'>('student');
  const [students, setStudents] = useState([{
    name: '',
    phone: '',
    email: '',
  }]);
  const [parentInfo, setParentInfo] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      loadClassrooms(selectedCourse.id);
    } else {
      setClassrooms([]);
      setSelectedClassroom(null);
    }
  }, [selectedCourse]);

  const loadCourses = async () => {
    setIsLoadingCourses(true);
    try {
      const data = await getCourses();
      console.log(' Courses loaded:', data);
      setCourses(data);

      // Auto-select course if courseId is in URL
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

  const handleEnroll = (classroom: Classroom) => {
    setSelectedClassroom(classroom);
    setShowContactForm(true);
    // Test toast to verify it's working
    toast.info('Vui lòng điền thông tin đăng ký');
  };

  const handleAddStudent = () => {
    setStudents([...students, { name: '', phone: '', email: '' }]);
  };

  const handleRemoveStudent = (index: number) => {
    if (students.length > 1) {
      setStudents(students.filter((_, i) => i !== index));
    }
  };

  const handleStudentChange = (index: number, field: string, value: string) => {
    const newStudents = [...students];
    newStudents[index] = { ...newStudents[index], [field]: value };
    setStudents(newStudents);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all students
    for (const student of students) {
      if (!student.name || !student.phone || !student.email) {
        toast.error('Vui lòng điền đầy đủ thông tin cho tất cả học sinh');
        return;
      }
    }

    // Validate parent info if role is parent
    if (role === 'parent' && (!parentInfo.name || !parentInfo.phone || !parentInfo.email)) {
      toast.error('Vui lòng điền đầy đủ thông tin phụ huynh');
      return;
    }

    // Parse student names into firstName and lastName
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

    // Call verify-enrollment-email API to send verification email
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

      // Handle error response
      if (!response.ok) {
        const errorMessage = result.message || 'Có lỗi xảy ra';
        toast.error(errorMessage);
        return;
      }

      // Success - email sent
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN');
  };

  const getStatusBadge = (status: Classroom['status']) => {
    const badges = {
      OPEN: { text: 'Còn chỗ', color: 'bg-green-100 text-green-800' },
      FULL: { text: 'Đã đầy', color: 'bg-red-100 text-red-800' },
      CLOSED: { text: 'Đã đóng', color: 'bg-gray-100 text-gray-800' },
      IN_PROGRESS: { text: 'Đang học', color: 'bg-blue-100 text-blue-800' },
    };
    return badges[status];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              EngliMaster
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              ← Về trang chủ
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Đăng Ký Khóa Học
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Chọn khóa học phù hợp và đăng ký lớp học ngay hôm nay
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Selection - Left Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-indigo-600" />
                Chọn Khóa Học
              </h2>

              {isLoadingCourses ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-24 bg-gray-200 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {courses.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => setSelectedCourse(course)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${selectedCourse?.id === course.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300 bg-white'
                        }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 flex-1">
                          {course.name}
                        </h3>
                        {selectedCourse?.id === course.id && (
                          <span className="text-indigo-600">✓</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {course.description}
                      </p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {course.duration}
                        </span>
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

          {/* Classroom List - Right Side */}
          <div className="lg:col-span-2">
            {!selectedCourse ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <GraduationCap className="w-20 h-20 mx-auto mb-4 text-indigo-600" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Chọn Khóa Học Để Xem Lớp
                </h3>
                <p className="text-gray-600">
                  Vui lòng chọn một khóa học bên trái để xem danh sách các lớp học có sẵn
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Lớp Học: {selectedCourse.name}
                  </h2>
                  <p className="text-gray-600">{selectedCourse.description}</p>
                </div>

                {isLoadingClassrooms ? (
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="animate-pulse bg-white rounded-xl p-6">
                        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : classrooms.length === 0 ? (
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
                  <div className="space-y-4">
                    {classrooms.map((classroom) => {
                      const statusBadge = getStatusBadge(classroom.status);
                      const availableSlots = classroom.maxStudents - classroom.currentStudents;
                      const isAvailable = classroom.status === 'OPEN';

                      return (
                        <div
                          key={classroom.id}
                          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {classroom.name}
                              </h3>
                              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusBadge.color}`}>
                                {statusBadge.text}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-indigo-600">
                                {formatPrice(classroom.price)}
                              </div>
                              <div className="text-sm text-gray-500">
                                /khóa học
                              </div>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center text-gray-700">
                              <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
                              <div>
                                <div className="text-sm text-gray-500">Thời gian</div>
                                <div className="font-medium">{classroom.schedule}</div>
                              </div>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <UserCircle className="w-5 h-5 mr-2 text-indigo-600" />
                              <div>
                                <div className="text-sm text-gray-500">Giáo viên</div>
                                <div className="font-medium">{classroom.teacher}</div>
                              </div>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <CalendarDays className="w-5 h-5 mr-2 text-indigo-600" />
                              <div>
                                <div className="text-sm text-gray-500">Ngày khai giảng</div>
                                <div className="font-medium">{formatDate(classroom.startDate)}</div>
                              </div>
                            </div>
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

                          <button
                            onClick={() => handleEnroll(classroom)}
                            disabled={!isAvailable}
                            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${isAvailable
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:-translate-y-0.5'
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

      {/* Contact Info Modal */}
      {showContactForm && selectedClassroom && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Thông Tin Liên Hệ
            </h3>
            <p className="text-gray-600 mb-6">
              Vui lòng cung cấp thông tin để chúng tôi liên hệ xác nhận đăng ký
            </p>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Bạn đăng ký với tư cách *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${role === 'student'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-indigo-300'
                      }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">🎓</div>
                      <div className="font-semibold">Học sinh</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('parent')}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${role === 'parent'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-indigo-300'
                      }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">👨‍👩‍👧</div>
                      <div className="font-semibold">Phụ huynh</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Student Info */}
              <div className={role === 'parent' ? 'bg-gray-50 p-4 rounded-lg' : ''}>
                {role === 'parent' && (
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-semibold text-gray-700">
                      Thông tin học sinh ({students.length})
                    </h4>
                    <button
                      type="button"
                      onClick={handleAddStudent}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                    >
                      <span>+</span> Thêm học sinh
                    </button>
                  </div>
                )}

                {students.map((student, index) => (
                  <div key={index} className={`space-y-4 ${index > 0 ? 'mt-6 pt-6 border-t border-gray-200' : ''}`}>
                    {students.length > 1 && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Học sinh {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveStudent(index)}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Xóa
                        </button>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Họ tên {role === 'parent' ? 'học sinh' : 'của bạn'} *
                      </label>
                      <input
                        type="text"
                        value={student.name}
                        onChange={(e) => handleStudentChange(index, 'name', e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder={role === 'parent' ? 'Nhập họ tên học sinh' : 'Nhập họ tên của bạn'}
                      />
                    </div>
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

              {/* Parent Info - Only show if role is parent */}
              {role === 'parent' && (
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Thông tin phụ huynh
                  </h4>
                  <div className="space-y-4">
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

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
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

export default function EnrollPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    }>
      <EnrollPageContent />
    </Suspense>
  );
}
