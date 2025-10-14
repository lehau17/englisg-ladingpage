// Payment-related types and API functions for landing page
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.VITE_API_URL ||
  `http://localhost:${process.env.CLIENT_API_PORT ?? 3000}/api`;

export interface CreatePaymentRequest {
  classroomId: string;
  courseId: string;
  amount: number;
  description?: string;
  studentId?: string;
}

export interface CreatePaymentResponse {
  statusCode: number;
  message: string;
  data: {
    id: string;
    paymentUrl: string;
    amount: number;
    currency: string;
    status: string;
    provider: string;
    type: string;
    transactionId: string;
    orderId: string;
    vnpayTxnRef: string;
    createdAt: string;
  };
}

export interface VNPayReturnParams {
  vnp_Amount: string;
  vnp_BankCode?: string;
  vnp_BankTranNo?: string;
  vnp_CardType?: string;
  vnp_OrderInfo: string;
  vnp_PayDate?: string;
  vnp_ResponseCode: string;
  vnp_TmnCode: string;
  vnp_TransactionNo?: string;
  vnp_TransactionStatus?: string;
  vnp_TxnRef: string;
  vnp_SecureHash: string;
}

export interface PaymentResult {
  success: boolean;
  message: string;
  responseCode?: string;
}

// Payment API service
export const paymentApi = {
  // Create payment transaction (requires authentication for englishWeb, but landing page might need a public endpoint)
  createPayment: async (
    data: CreatePaymentRequest,
    token?: string
  ): Promise<CreatePaymentResponse> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/private/v1/payment/create`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Payment creation failed' }));
      throw new Error(error.message || 'Failed to create payment');
    }

    return response.json();
  },

  // Handle VNPay return (public endpoint)
  handleVNPayReturn: async (params: VNPayReturnParams): Promise<PaymentResult> => {
    const queryParams = new URLSearchParams(params as unknown as Record<string, string>);
    const response = await fetch(
      `${API_BASE_URL}/public/v1/payment/vnpay/return?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to process payment return');
    }

    const data = await response.json();
    return {
      success: data.success,
      message: data.message,
      responseCode: params.vnp_ResponseCode,
    };
  },

  // Utility: Check if response code indicates success
  isPaymentSuccess: (responseCode: string): boolean => {
    return responseCode === '00';
  },

  // Utility: Get payment status message in Vietnamese
  getPaymentStatusMessage: (responseCode: string): string => {
    const messages: { [key: string]: string } = {
      '00': 'Giao dịch thành công',
      '07': 'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).',
      '09': 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.',
      '10': 'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
      '11': 'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.',
      '12': 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.',
      '13': 'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.',
      '24': 'Giao dịch không thành công do: Khách hàng hủy giao dịch',
      '51': 'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.',
      '65': 'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.',
      '75': 'Ngân hàng thanh toán đang bảo trì.',
      '79': 'Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch',
      '99': 'Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)',
    };
    return messages[responseCode] || 'Lỗi không xác định';
  },
};
