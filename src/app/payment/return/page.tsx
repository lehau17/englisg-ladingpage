/**
 * @file payment/return/page.tsx
 * @description Trang xử lý kết quả thanh toán từ VNPay.
 * VNPay redirect về đây sau khi user hoàn tất (hoặc hủy) thanh toán.
 * 
 * Flow:
 * 1. VNPay redirect: /payment/return?vnp_Amount=xxx&vnp_ResponseCode=00&...
 * 2. Component đọc tất cả vnp_* params từ URL
 * 3. Gọi API backend để verify và lưu kết quả
 * 4. Hiển thị UI success/error tùy theo responseCode
 */

'use client';

// ==================== IMPORTS ====================
import { Suspense, useEffect, useState } from 'react';
// Hook đọc query params
import { useSearchParams } from 'next/navigation';
// Link component cho navigation
import Link from 'next/link';
// API functions và types cho payment
import { paymentApi, type VNPayReturnParams, type PaymentResult } from '../../../lib/payment';

/**
 * @component PaymentReturnContent
 * @description Component chính xử lý VNPay return params
 */
function PaymentReturnContent() {
  // ==================== HOOKS ====================
  // Đọc tất cả query params từ URL
  const searchParams = useSearchParams();

  // ==================== STATE ====================
  // Trạng thái đang xử lý
  const [isProcessing, setIsProcessing] = useState(true);
  // Kết quả thanh toán (success/error với message)
  const [result, setResult] = useState<PaymentResult | null>(null);

  // ==================== EFFECTS ====================
  /**
   * Effect: Xử lý payment return khi component mount
   */
  useEffect(() => {
    /**
     * Hàm async xử lý kết quả thanh toán
     */
    const processPayment = async () => {
      try {
        // ==================== EXTRACT VNPAY PARAMS ====================
        // Đọc tất cả params VNPay từ URL
        // VNPay trả về nhiều params: vnp_Amount, vnp_ResponseCode, vnp_TxnRef, etc.
        const vnpayParams: VNPayReturnParams = {
          vnp_Amount: searchParams.get('vnp_Amount') || '0',           // Số tiền (x100)
          vnp_BankCode: searchParams.get('vnp_BankCode') || undefined, // Mã ngân hàng
          vnp_BankTranNo: searchParams.get('vnp_BankTranNo') || undefined, // Mã giao dịch ngân hàng
          vnp_CardType: searchParams.get('vnp_CardType') || undefined, // Loại thẻ (ATM/VISA)
          vnp_OrderInfo: searchParams.get('vnp_OrderInfo') || '',      // Thông tin đơn hàng
          vnp_PayDate: searchParams.get('vnp_PayDate') || undefined,   // Thời gian thanh toán
          vnp_ResponseCode: searchParams.get('vnp_ResponseCode') || '99', // Mã kết quả (00=thành công)
          vnp_TmnCode: searchParams.get('vnp_TmnCode') || '',          // Mã merchant
          vnp_TransactionNo: searchParams.get('vnp_TransactionNo') || undefined, // Mã giao dịch VNPay
          vnp_TransactionStatus: searchParams.get('vnp_TransactionStatus') || undefined, // Trạng thái
          vnp_TxnRef: searchParams.get('vnp_TxnRef') || '',            // Mã tham chiếu giao dịch
          vnp_SecureHash: searchParams.get('vnp_SecureHash') || '',    // Hash để verify
        };

        // Gọi API backend để verify và lưu kết quả
        await paymentApi.handleVNPayReturn(vnpayParams);

        // Kiểm tra kết quả dựa trên responseCode
        // 00 = thành công, các mã khác = thất bại
        const isSuccess = paymentApi.isPaymentSuccess(vnpayParams.vnp_ResponseCode);
        // Lấy message tương ứng với mã lỗi
        const message = paymentApi.getPaymentStatusMessage(vnpayParams.vnp_ResponseCode);

        // Cập nhật state với kết quả
        setResult({
          success: isSuccess,
          message,
          responseCode: vnpayParams.vnp_ResponseCode,
        });
      } catch (error) {
        // Xử lý lỗi
        setResult({
          success: false,
          message: error instanceof Error ? error.message : 'Có lỗi xảy ra khi xử lý thanh toán',
        });
      } finally {
        setIsProcessing(false);
      }
    };

    // Chỉ xử lý nếu có params trong URL
    if (searchParams.toString()) {
      processPayment();
    } else {
      // Không có params = truy cập trực tiếp, không hợp lệ
      setIsProcessing(false);
    }
  }, [searchParams]);

  // ==================== RENDER: LOADING STATE ====================
  if (isProcessing) {
    return (
      // Container căn giữa toàn màn hình
      // min-h-screen: chiều cao tối thiểu = viewport
      // bg-gray-50: nền xám nhạt
      // flex items-center justify-center: căn giữa
      // p-4: padding 16px
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

        {/* Loading card */}
        {/* bg-white: nền trắng */}
        {/* rounded-xl: border-radius 12px */}
        {/* shadow-lg: bóng đổ lớn */}
        {/* p-8: padding 32px */}
        {/* max-w-md w-full: chiều rộng tối đa 448px */}
        {/* text-center: căn giữa */}
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">

          {/* Spinner */}
          {/* animate-spin: animation quay */}
          {/* rounded-full: hình tròn */}
          {/* h-16 w-16: 64px */}
          {/* border-b-2 border-blue-600: viền dưới màu xanh */}
          {/* mx-auto mb-4: căn giữa, margin-bottom 16px */}
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>

          {/* Tiêu đề loading */}
          {/* text-xl font-semibold: chữ lớn semi-bold */}
          {/* text-gray-900: màu đen */}
          {/* mb-2: margin-bottom 8px */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Đang xử lý kết quả thanh toán...
          </h2>

          {/* Mô tả */}
          {/* text-gray-600: màu xám */}
          <p className="text-gray-600">Vui lòng chờ trong giây lát</p>
        </div>
      </div>
    );
  }

  // ==================== RENDER: NO RESULT (Invalid Access) ====================
  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">

          {/* Error icon circle */}
          {/* h-16 w-16: 64px */}
          {/* bg-red-100: nền đỏ nhạt */}
          {/* rounded-full: hình tròn */}
          {/* flex items-center justify-center: căn giữa icon */}
          {/* mx-auto mb-4: căn giữa, margin-bottom */}
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {/* X icon SVG */}
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

          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Không tìm thấy thông tin thanh toán
          </h2>

          <p className="text-gray-600 mb-6">
            Có vẻ như bạn đã truy cập sai đường dẫn hoặc phiên thanh toán đã hết hạn.
          </p>

          {/* Nút về trang chủ */}
          {/* inline-flex items-center: icon + text inline */}
          {/* px-6 py-3: padding */}
          {/* bg-blue-600: nền xanh */}
          {/* text-white: chữ trắng */}
          {/* rounded-lg: border-radius 8px */}
          {/* hover:bg-blue-700: nền đậm khi hover */}
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {/* Home icon SVG */}
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  // ==================== RENDER: RESULT (Success/Error) ====================
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">

        {/* Conditional rendering: Success hoặc Error */}
        {result.success ? (
          <>
            {/* ==================== SUCCESS STATE ==================== */}

            {/* Success icon circle */}
            {/* bg-green-100: nền xanh lá nhạt */}
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {/* Check icon SVG */}
              {/* text-green-600: màu xanh lá */}
              <svg
                className="h-10 w-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Thanh toán thành công!
            </h2>

            <p className="text-gray-600 mb-6">
              Cảm ơn bạn đã đăng ký khóa học. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất
              để hướng dẫn tạo tài khoản và bắt đầu học.
            </p>

            {/* Success action buttons */}
            {/* space-y-3: khoảng cách dọc 12px */}
            <div className="space-y-3">

              {/* Nút về trang chủ - primary */}
              {/* block w-full: block element rộng 100% */}
              {/* bg-green-600: nền xanh lá */}
              {/* hover:bg-green-700: nền đậm khi hover */}
              <Link
                href="/"
                className="block w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Về trang chủ
              </Link>

              {/* Nút liên hệ - secondary */}
              {/* border border-gray-300: viền xám */}
              {/* text-gray-700: chữ xám */}
              {/* hover:bg-gray-50: nền xám nhạt khi hover */}
              <Link
                href="/#contact"
                className="block w-full px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Liên hệ hỗ trợ
              </Link>
            </div>

            {/* Mã giao dịch (nếu có) */}
            {result.responseCode && (
              // mt-6: margin-top 24px
              // p-4: padding 16px
              // bg-gray-50: nền xám nhạt
              // rounded-lg: border-radius 8px
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                {/* text-sm: font-size 14px */}
                {/* text-gray-500: màu xám */}
                <p className="text-sm text-gray-500">
                  Mã giao dịch: <span className="font-mono">{result.responseCode}</span>
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* ==================== ERROR STATE ==================== */}

            {/* Error icon circle */}
            {/* bg-red-100: nền đỏ nhạt */}
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {/* X icon SVG */}
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

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Thanh toán không thành công
            </h2>

            {/* Error message */}
            {/* text-red-600: màu đỏ */}
            {/* mb-6: margin-bottom 24px */}
            <p className="text-red-600 mb-6">{result.message}</p>

            {/* Error action buttons */}
            <div className="space-y-3">

              {/* Nút liên hệ để thử lại */}
              {/* bg-blue-600: nền xanh */}
              <Link
                href="/#contact"
                className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Liên hệ để thử lại
              </Link>

              {/* Nút về trang chủ */}
              <Link
                href="/"
                className="block w-full px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Về trang chủ
              </Link>
            </div>

            {/* Mã lỗi (nếu có) */}
            {result.responseCode && (
              // bg-red-50: nền đỏ rất nhạt
              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                {/* text-red-700: màu đỏ đậm */}
                <p className="text-sm text-red-700">
                  Mã lỗi: <span className="font-mono">{result.responseCode}</span>
                </p>
              </div>
            )}
          </>
        )}

        {/* ==================== HELP SECTION ==================== */}
        {/* mt-8: margin-top 32px */}
        {/* pt-6: padding-top 24px */}
        {/* border-t border-gray-200: viền trên xám */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          {/* text-sm: font-size 14px */}
          {/* text-gray-500: màu xám */}
          <p className="text-sm text-gray-500">
            Cần hỗ trợ?{' '}
            {/* text-blue-600: màu xanh */}
            {/* hover:text-blue-700: xanh đậm khi hover */}
            <Link href="/#contact" className="text-blue-600 hover:text-blue-700">
              Liên hệ với chúng tôi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * @component PaymentReturn
 * @description Component wrapper với Suspense cho useSearchParams
 * Next.js yêu cầu Suspense khi sử dụng useSearchParams (dynamic hook)
 */
export default function PaymentReturn() {
  return (
    // Suspense wrapper với loading fallback
    <Suspense
      fallback={
        // Loading UI giống như isProcessing state
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
            {/* Spinner */}
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Đang xử lý kết quả thanh toán...
            </h2>
            <p className="text-gray-600">Vui lòng chờ trong giây lát</p>
          </div>
        </div>
      }
    >
      <PaymentReturnContent />
    </Suspense>
  );
}
