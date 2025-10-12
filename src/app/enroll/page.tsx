'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCourses, getClassroomsByCourse, type Course, type Classroom } from '../../lib/api';
import PaymentModal from '../../components/PaymentModal';

export default function EnrollPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [isLoadingClassrooms, setIsLoadingClassrooms] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // For payment modal
  const [contactInfo, setContactInfo] = useState({
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
      setCourses(data);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error loading courses:', error);
      }
    } finally {
      setIsLoadingCourses(false);
    }
  };

  const loadClassrooms = async (courseId: string) => {
    setIsLoadingClassrooms(true);
    try {
      const data = await getClassroomsByCourse(courseId);
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
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo.name || !contactInfo.phone || !contactInfo.email) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }
    setShowContactForm(false);
    setShowPaymentModal(true);
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
                <span className="text-2xl mr-2">📚</span>
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
                        <span className="text-gray-500">
                          📅 {course.duration}
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
                <div className="text-6xl mb-4">🎓</div>
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
                    <div className="text-6xl mb-4">📅</div>
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
                              <span className="mr-2">📅</span>
                              <div>
                                <div className="text-sm text-gray-500">Thời gian</div>
                                <div className="font-medium">{classroom.schedule}</div>
                              </div>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <span className="mr-2">👨‍🏫</span>
                              <div>
                                <div className="text-sm text-gray-500">Giáo viên</div>
                                <div className="font-medium">{classroom.teacher}</div>
                              </div>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <span className="mr-2">🗓️</span>
                              <div>
                                <div className="text-sm text-gray-500">Ngày khai giảng</div>
                                <div className="font-medium">{formatDate(classroom.startDate)}</div>
                              </div>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <span className="mr-2">👥</span>
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
                            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${isAvailable
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:-translate-y-0.5'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                          >
                            {isAvailable ? '💳 Đăng Ký & Thanh Toán' : 'Không Thể Đăng Ký'}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Thông Tin Liên Hệ
            </h3>
            <p className="text-gray-600 mb-6">
              Vui lòng cung cấp thông tin để chúng tôi liên hệ xác nhận đăng ký
            </p>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ tên *
                </label>
                <input
                  type="text"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Nhập họ tên của bạn"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Nhập địa chỉ email"
                />
              </div>
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

      {/* Payment Modal */}
      {selectedClassroom && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setShowContactForm(false);
          }}
          selectedClass={{
            level: selectedClassroom.name,
            levelVi: selectedClassroom.courseName,
            color: 'from-indigo-500 to-purple-600',
            bgColor: 'from-indigo-50 to-purple-50',
            borderColor: 'border-indigo-500',
            description: selectedCourse?.description || '',
            duration: selectedCourse?.duration || '',
            schedule: selectedClassroom.schedule,
            students: `${selectedClassroom.currentStudents}/${selectedClassroom.maxStudents} học viên`,
            teacher: selectedClassroom.teacher,
            teacherFlag: '🇺🇸',
            price: `${selectedClassroom.price}đ`,
            features: [],
            nextClass: formatDate(selectedClassroom.startDate),
            courseId: selectedClassroom.courseId,
            classroomId: selectedClassroom.id,
          }}
          contactInfo={contactInfo}
        />
      )}
    </div>
  );
}
