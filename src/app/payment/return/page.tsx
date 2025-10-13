'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { paymentApi, type VNPayReturnParams, type PaymentResult } from '../../../lib/payment';

function PaymentReturnContent() {
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [result, setResult] = useState<PaymentResult | null>(null);


  useEffect(() => {
    const processPayment = async () => {
      try {
        // Extract VNPay parameters from URL
        const vnpayParams: VNPayReturnParams = {
          vnp_Amount: searchParams.get('vnp_Amount') || '0',
          vnp_BankCode: searchParams.get('vnp_BankCode') || undefined,
          vnp_BankTranNo: searchParams.get('vnp_BankTranNo') || undefined,
          vnp_CardType: searchParams.get('vnp_CardType') || undefined,
          vnp_OrderInfo: searchParams.get('vnp_OrderInfo') || '',
          vnp_PayDate: searchParams.get('vnp_PayDate') || undefined,
          vnp_ResponseCode: searchParams.get('vnp_ResponseCode') || '99',
          vnp_TmnCode: searchParams.get('vnp_TmnCode') || '',
          vnp_TransactionNo: searchParams.get('vnp_TransactionNo') || undefined,
          vnp_TransactionStatus: searchParams.get('vnp_TransactionStatus') || undefined,
          vnp_TxnRef: searchParams.get('vnp_TxnRef') || '',
          vnp_SecureHash: searchParams.get('vnp_SecureHash') || '',
        };

        await paymentApi.handleVNPayReturn(vnpayParams);

        const isSuccess = paymentApi.isPaymentSuccess(vnpayParams.vnp_ResponseCode);
        const message = paymentApi.getPaymentStatusMessage(vnpayParams.vnp_ResponseCode);

        setResult({
          success: isSuccess,
          message,
          responseCode: vnpayParams.vnp_ResponseCode,
        });
      } catch (error) {
        setResult({
          success: false,
          message: error instanceof Error ? error.message : 'Có lỗi xảy ra khi xử lý thanh toán',
        });
      } finally {
        setIsProcessing(false);
      }
    };

    if (searchParams.toString()) {
      processPayment();
    } else {
      setIsProcessing(false);
    }
  }, [searchParams]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Đang xử lý kết quả thanh toán...
          </h2>
          <p className="text-gray-600">Vui lòng chờ trong giây lát</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        {result.success ? (
          <>
            {/* Success State */}
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
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

            {/* Success Actions */}
            <div className="space-y-3">
              <Link
                href="/"
                className="block w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Về trang chủ
              </Link>
              <Link
                href="/#contact"
                className="block w-full px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Liên hệ hỗ trợ
              </Link>
            </div>

            {/* Transaction Info */}
            {result.responseCode && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">
                  Mã giao dịch: <span className="font-mono">{result.responseCode}</span>
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Error State */}
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
            <p className="text-red-600 mb-6">{result.message}</p>

            {/* Error Actions */}
            <div className="space-y-3">
              <Link
                href="/#contact"
                className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Liên hệ để thử lại
              </Link>
              <Link
                href="/"
                className="block w-full px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Về trang chủ
              </Link>
            </div>

            {/* Error Details */}
            {result.responseCode && (
              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-red-700">
                  Mã lỗi: <span className="font-mono">{result.responseCode}</span>
                </p>
              </div>
            )}
          </>
        )}

        {/* Help Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Cần hỗ trợ?{' '}
            <Link href="/#contact" className="text-blue-600 hover:text-blue-700">
              Liên hệ với chúng tôi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentReturn() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
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

