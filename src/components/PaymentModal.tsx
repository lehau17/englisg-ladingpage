'use client';

import { useState } from 'react';
import { Clock, Calendar, UserCheck, Users, Info, GraduationCap } from 'lucide-react';
import type { LandingPageClass } from '../lib/api';
import { createGuestEnrollment, type GuestEnrollmentData } from '../lib/api';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedClass: LandingPageClass | null;
  role: 'student' | 'parent';
  students: Array<{
    name: string;
    phone: string;
    email: string;
  }>;
  parentInfo?: {
    name: string;
    phone: string;
    email: string;
  };
}

export default function PaymentModal({
  isOpen,
  onClose,
  selectedClass,
  role,
  students,
  parentInfo,
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<
    'idle' | 'creating' | 'redirecting' | 'error'
  >('idle');

  if (!isOpen || !selectedClass) return null;

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setPaymentStep('creating');
      setError(null);

      // Validate required fields
      if (!selectedClass.courseId || !selectedClass.classroomId) {
        throw new Error('Thiếu thông tin khóa học hoặc lớp học. Vui lòng thử lại.');
      }

      if (!students || students.length === 0) {
        throw new Error('Vui lòng điền thông tin ít nhất một học sinh.');
      }

      // Parse students data
      const studentsData = students.map(student => {
        const nameParts = student.name.trim().split(/\s+/);
        let firstName = '';
        let lastName = '';

        if (nameParts.length === 1) {
          firstName = nameParts[0];
          lastName = nameParts[0];
        } else {
          firstName = nameParts[0];
          lastName = nameParts.slice(1).join(' ');
        }

        return {
          firstName,
          lastName,
          displayName: student.name,
          email: student.email,
          phone: student.phone,
        };
      });

      // Prepare enrollment data
      const enrollmentData: GuestEnrollmentData = {
        role,
        courseId: selectedClass.courseId,
        classroomId: selectedClass.classroomId,
        students: studentsData,
        ...(role === 'parent' && parentInfo ? {
          parent: {
            firstName: parentInfo.name.trim().split(/\s+/)[0] || parentInfo.name,
            lastName: parentInfo.name.trim().split(/\s+/).length > 1
              ? parentInfo.name.trim().split(/\s+/).slice(1).join(' ')
              : parentInfo.name,
            displayName: parentInfo.name,
            email: parentInfo.email,
            phone: parentInfo.phone,
          }
        } : {}),
        returnUrl: typeof window !== 'undefined'
          ? `${window.location.origin}/payment/return`
          : '/payment/return',
        source: 'landing-page',
        note: `Đăng ký khóa học: ${selectedClass.levelVi} (${students.length} học sinh)`,
      };

      // Call Guest Enrollment API
      const response = await createGuestEnrollment(enrollmentData);

      if (response.paymentUrl) {
        setPaymentStep('redirecting');
        // Redirect to VNPay
        window.location.href = response.paymentUrl;
      } else {
        throw new Error(response.message || 'Không thể tạo link thanh toán. Vui lòng thử lại.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo thanh toán');
      setPaymentStep('error');
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setPaymentStep('idle');
    setError(null);
    setIsProcessing(false);
    onClose();
  };

  const parsePrice = (priceStr: string): number => {
    return parseInt(priceStr.replace(/\D/g, ''), 10);
  };

  const formatPrice = (price: string | number) => {
    const amount = typeof price === 'string' ? parsePrice(price) : price;
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getTotalPrice = () => {
    const basePrice = parsePrice(selectedClass.price);
    return basePrice * students.length;
  };

  const getStepContent = () => {
    switch (paymentStep) {
      case 'idle':
        return (
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Thông tin đăng ký</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Vai trò:</span>
                  <span className="font-medium text-gray-900 flex items-center gap-1">
                    {role === 'student' ? <><GraduationCap className="w-4 h-4" /> Học sinh</> : <><Users className="w-4 h-4" /> Phụ huynh</>}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Số học sinh:</span>
                  <span className="font-medium text-gray-900">{students.length} người</span>
                </div>
                {students.map((student, index) => (
                  <div key={index} className={index > 0 ? 'pt-2 mt-2 border-t' : ''}>
                    {students.length > 1 && (
                      <div className="font-semibold text-gray-800 mb-1">Học sinh {index + 1}</div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-700">Họ tên:</span>
                      <span className="font-medium text-gray-900">{student.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">SĐT:</span>
                      <span className="font-medium text-gray-900">{student.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Email:</span>
                      <span className="font-medium text-gray-900">{student.email}</span>
                    </div>
                  </div>
                ))}
                {role === 'parent' && parentInfo && (
                  <>
                    <div className="border-t pt-2 mt-2"></div>
                    <div className="font-semibold text-gray-800 mb-1">Thông tin phụ huynh</div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Phụ huynh:</span>
                      <span className="font-medium text-gray-900">{parentInfo.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">SĐT PH:</span>
                      <span className="font-medium text-gray-900">{parentInfo.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Email PH:</span>
                      <span className="font-medium text-gray-900">{parentInfo.email}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Course Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-2 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Khóa học: {selectedClass.levelVi}
              </h3>
              <div className="space-y-1 text-sm text-gray-600 mb-3">
                <p> {selectedClass.description}</p>
                <p className="flex items-center gap-1"><Clock className="w-4 h-4" /> Thời lượng: {selectedClass.duration}</p>
                <p className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Lịch học: {selectedClass.schedule}</p>
                <p className="flex items-center gap-1"><UserCheck className="w-4 h-4" /> Giáo viên: {selectedClass.teacher} {selectedClass.teacherFlag}</p>
                <p className="flex items-center gap-1"><Users className="w-4 h-4" /> Số học sinh: {students.length}</p>
              </div>
              <div className="space-y-2 pt-3 border-t border-blue-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Học phí (1 học sinh):</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(selectedClass.price)}
                  </span>
                </div>
                {students.length > 1 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">× {students.length} học sinh:</span>
                    <span className="font-medium text-gray-900">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                  <span className="text-gray-900 font-semibold">Tổng thanh toán:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
              </div>
            </div>

            {/* Notice */}
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <div className="flex items-start">
                <Info className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Thông tin:</p>
                  <p>
                    Hệ thống sẽ tự động tạo tài khoản cho bạn sau khi thanh toán thành công.
                    Bạn sẽ nhận email hướng dẫn đăng nhập sau khi hoàn tất thanh toán.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Method Info */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Phương thức thanh toán</h4>
              <div className="border rounded-lg p-4 bg-white">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">VNPay</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">VNPay</p>
                    <p className="text-sm text-gray-500">
                      Thanh toán qua ví điện tử, ngân hàng
                    </p>
                  </div>
                  <svg
                    className="h-5 w-5 text-gray-400 ml-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <span>Tiếp tục</span>
              </button>
            </div>
          </div>
        );

      case 'creating':
        return (
          <div className="text-center space-y-4 py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <h3 className="text-lg font-semibold text-gray-900">
              Đang tạo giao dịch...
            </h3>
            <p className="text-gray-600">Vui lòng chờ trong giây lát</p>
          </div>
        );

      case 'redirecting':
        return (
          <div className="text-center space-y-4 py-8">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Chuyển hướng đến VNPay...
            </h3>
            <p className="text-gray-600">
              Bạn sẽ được chuyển đến trang thanh toán VNPay
            </p>
          </div>
        );

      case 'error':
        return (
          <div className="text-center space-y-4 py-4">
            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Thông báo</h3>
            <p className="text-gray-700 whitespace-pre-line">{error}</p>
            <div className="flex space-x-3">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">
            Thanh toán khóa học
          </h2>
          <button
            onClick={handleClose}
            disabled={isProcessing && paymentStep !== 'error'}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <svg
              className="h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{getStepContent()}</div>
      </div>
    </div>
  );
}
