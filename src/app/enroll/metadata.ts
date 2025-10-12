import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Đăng ký khóa học | EngliMaster',
    description:
        'Chọn khóa học tiếng Anh phù hợp và giữ chỗ ngay với EngliMaster. Đội ngũ tư vấn hỗ trợ bạn hoàn tất đăng ký nhanh chóng.',
    openGraph: {
        title: 'Đăng ký khóa học | EngliMaster',
        description:
            'Khám phá các khóa học tiếng Anh đang mở và giữ chỗ chỉ trong vài bước. EngliMaster đồng hành cùng bạn trên hành trình chinh phục tiếng Anh.',
        url: '/enroll',
        type: 'website',
        images: [
            {
                url: '/logo.png',
                width: 1200,
                height: 630,
                alt: 'EngliMaster Enrollment',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Đăng ký khóa học | EngliMaster',
        description:
            'Tìm khóa học tiếng Anh phù hợp và đăng ký tư vấn ngay cùng EngliMaster.',
        images: ['/logo.png'],
    },
    alternates: {
        canonical: '/enroll',
    },
};


