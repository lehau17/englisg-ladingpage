'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.haudev.io.vn/api';

function PaymentVerificationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError('Token xác thực không hợp lệ');
      setIsProcessing(false);
      return;
    }

    createPaymentFromToken(token);
  }, [token]);

  const createPaymentFromToken = async (verificationToken: string) => {
    try {
      // Call API to create payment with token
      const response = await fetch(`${API_BASE_URL}/public/v1/landing-page/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: verificationToken,
          returnUrl: `${window.location.origin}/payment/return`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Không thể tạo thanh toán');
      }

      const result = await response.json();

      // Redirect to VNPay payment URL
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

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Đang xác thực thông tin...
          </h2>
          <p className="text-gray-600">
            Vui lòng chờ trong giây lát, bạn sẽ được chuyển đến trang thanh toán
          </p>
        </div>
      </div>
    );
  }

  if (error) {
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
            Xác thực thất bại
          </h2>
          <p className="text-red-600 mb-6">{error}</p>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/enroll')}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Đăng ký lại
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Về trang chủ
            </button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-left">
            <p className="text-sm text-yellow-800">
              <strong>Lưu ý:</strong> Link xác thực chỉ có hiệu lực trong 30 phút.
              Nếu link đã hết hạn, vui lòng đăng ký lại.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default function PaymentVerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
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
