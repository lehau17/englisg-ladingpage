/**
 * @file enroll/payment/page.tsx
 * @description Trang xử lý xác thực thanh toán.
 * Nhận token từ email verification, gọi API tạo thanh toán,
 * và chuyển hướng đến VNPay.
 * 
 * Flow:
 * 1. User click link trong email -> /enroll/payment?token=xxx
 * 2. Component đọc token từ URL
 * 3. Gọi API /payment với token để tạo thanh toán VNPay
 * 4. Redirect đến VNPay payment URL
 */

'use client';

// ==================== IMPORTS ====================
// Hook để navigate programmatically
import { useRouter, useSearchParams } from 'next/navigation';
// React hooks và Suspense
import { Suspense, useEffect, useState } from 'react';

// ==================== CONSTANTS ====================
// URL của API backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.haudev.io.vn/api';

/**
 * @component PaymentVerificationContent
 * @description Component chính xử lý logic xác thực và tạo thanh toán
 */
function PaymentVerificationContent() {
  // ==================== HOOKS ====================
  // Hook đọc query params từ URL
  const searchParams = useSearchParams();
  // Hook navigation
  const router = useRouter();
  // Lấy token từ URL (?token=xxx)
  const token = searchParams.get('token');

  // ==================== STATE ====================
  // Trạng thái đang xử lý
  const [isProcessing, setIsProcessing] = useState(true);
  // Thông báo lỗi nếu có
  const [error, setError] = useState<string | null>(null);

  // ==================== EFFECTS ====================
  /**
   * Effect: Khi component mount, kiểm tra token và tạo thanh toán
   */
  useEffect(() => {
    // Nếu không có token, hiển thị lỗi
    if (!token) {
      setError('Token xác thực không hợp lệ');
      setIsProcessing(false);
      return;
    }

    // Gọi API tạo thanh toán
    createPaymentFromToken(token);
  }, [token]);

  // ==================== API FUNCTIONS ====================
  /**
   * Gọi API để tạo thanh toán VNPay từ verification token
   * @param {string} verificationToken - Token nhận từ email
   */
  const createPaymentFromToken = async (verificationToken: string) => {
    try {
      // Gọi API tạo payment
      const response = await fetch(`${API_BASE_URL}/public/v1/landing-page/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: verificationToken,
          // URL callback sau khi thanh toán xong
          returnUrl: `${window.location.origin}/payment/return`,
        }),
      });

      // Xử lý lỗi từ API
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Không thể tạo thanh toán');
      }

      const result = await response.json();

      // Redirect đến VNPay nếu có paymentUrl
      if (result.data?.paymentUrl) {
        window.location.href = result.data.paymentUrl;
      } else {
        throw new Error('Không nhận được link thanh toán');
      }
    } catch (err) {
      console.error('Payment creation error:', err);
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo thanh toán');
      setIsProcessing(false);
    }
  };

  // ==================== RENDER: LOADING STATE ====================
  if (isProcessing) {
    return (
      // ==================== LOADING CONTAINER ====================
      // min-h-screen: chiều cao tối thiểu = viewport
      // bg-gray-50: nền xám nhạt
      // flex items-center justify-center: căn giữa
      // p-4: padding 16px
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

        {/* Card loading */}
        {/* bg-white: nền trắng */}
        {/* rounded-xl: border-radius 12px */}
        {/* shadow-lg: bóng đổ lớn */}
        {/* p-8: padding 32px */}
        {/* max-w-md w-full: chiều rộng tối đa 448px */}
        {/* text-center: căn giữa text */}
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">

          {/* Spinner animation */}
          {/* animate-spin: animation quay */}
          {/* rounded-full: hình tròn */}
          {/* h-16 w-16: 64px */}
          {/* border-b-2 border-indigo-600: viền dưới màu indigo */}
          {/* mx-auto mb-4: căn giữa, margin-bottom 16px */}
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>

          {/* Tiêu đề */}
          {/* text-xl font-semibold: chữ lớn semi-bold */}
          {/* text-gray-900: màu đen */}
          {/* mb-2: margin-bottom 8px */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Đang xác thực thông tin...
          </h2>

          {/* Mô tả */}
          {/* text-gray-600: màu xám */}
          <p className="text-gray-600">
            Vui lòng chờ trong giây lát, bạn sẽ được chuyển đến trang thanh toán
          </p>
        </div>
      </div>
    );
  }

  // ==================== RENDER: ERROR STATE ====================
  if (error) {
    return (
      // Container tương tự loading
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

        {/* Error card */}
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">

          {/* Error icon */}
          {/* h-16 w-16: 64px */}
          {/* bg-red-100: nền đỏ nhạt */}
          {/* rounded-full: hình tròn */}
          {/* flex items-center justify-center: căn giữa icon */}
          {/* mx-auto mb-4: căn giữa, margin-bottom */}
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {/* SVG X icon */}
            {/* h-10 w-10: 40px */}
            {/* text-red-600: màu đỏ */}
            <svg
              className="h-10 w-10 text-red-600"
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
          </div>

          {/* Error title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Xác thực thất bại
          </h2>

          {/* Error message */}
          {/* text-red-600: màu đỏ */}
          {/* mb-6: margin-bottom 24px */}
          <p className="text-red-600 mb-6">{error}</p>

          {/* Action buttons */}
          {/* space-y-3: khoảng cách dọc 12px */}
          <div className="space-y-3">

            {/* Nút đăng ký lại */}
            {/* w-full: rộng 100% */}
            {/* px-6 py-3: padding */}
            {/* bg-indigo-600: nền indigo */}
            {/* text-white: chữ trắng */}
            {/* rounded-lg: border-radius 8px */}
            {/* hover:bg-indigo-700: nền đậm hơn khi hover */}
            <button
              onClick={() => router.push('/enroll')}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Đăng ký lại
            </button>

            {/* Nút về trang chủ */}
            {/* border border-gray-300: viền xám */}
            {/* text-gray-700: chữ xám */}
            {/* hover:bg-gray-50: nền xám nhạt khi hover */}
            <button
              onClick={() => router.push('/')}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Về trang chủ
            </button>
          </div>

          {/* Warning note */}
          {/* mt-6: margin-top 24px */}
          {/* p-4: padding 16px */}
          {/* bg-yellow-50: nền vàng nhạt */}
          {/* rounded-lg: border-radius 8px */}
          {/* text-left: căn trái text */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-left">
            {/* text-sm: font-size 14px */}
            {/* text-yellow-800: màu vàng đậm */}
            <p className="text-sm text-yellow-800">
              <strong>Lưu ý:</strong> Link xác thực chỉ có hiệu lực trong 30 phút.
              Nếu link đã hết hạn, vui lòng đăng ký lại.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Không render gì nếu đã redirect thành công
  return null;
}

/**
 * @component PaymentVerificationPage
 * @description Component wrapper với Suspense cho useSearchParams
 */
export default function PaymentVerificationPage() {
  return (
    // Suspense wrapper
    <Suspense
      fallback={
        // Loading fallback UI
        // min-h-screen bg-gray-50: nền xám nhạt fullscreen
        // flex items-center justify-center: căn giữa
        // p-4: padding 16px
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
            {/* Spinner */}
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Đang tải...
            </h2>
          </div>
        </div>
      }
    >
      <PaymentVerificationContent />
    </Suspense>
  );
}
