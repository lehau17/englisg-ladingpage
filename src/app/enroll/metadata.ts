/**
 * @file enroll/metadata.ts
 * @description SEO metadata cho trang đăng ký khóa học.
 * Được import vào layout.tsx để Next.js tự động generate <head> tags.
 * 
 * Metadata bao gồm:
 * - title: Tiêu đề trang hiển thị trên tab browser
 * - description: Mô tả ngắn cho Google search results
 * - openGraph: Cấu hình hiển thị khi share lên Facebook, LinkedIn, Zalo
 * - twitter: Cấu hình hiển thị khi share lên Twitter/X
 * - alternates.canonical: URL chính thức tránh duplicate content
 */

import type { Metadata } from 'next';

/**
 * @constant metadata
 * @type {Metadata}
 * @description Object chứa tất cả SEO metadata cho trang enroll
 */
export const metadata: Metadata = {
    // ==================== BASIC META ====================
    // Tiêu đề hiển thị trên tab browser và kết quả Google
    title: 'Đăng ký khóa học | EngliMaster',

    // Mô tả ngắn (160 ký tự) dưới tiêu đề khi tìm kiếm Google
    description:
        'Chọn khóa học tiếng Anh phù hợp và giữ chỗ ngay với EngliMaster. Đội ngũ tư vấn hỗ trợ bạn hoàn tất đăng ký nhanh chóng.',

    // ==================== OPEN GRAPH (FACEBOOK, LINKEDIN, ZALO) ====================
    // Cấu hình hiển thị khi chia sẻ link lên mạng xã hội
    openGraph: {
        // Tiêu đề khi share
        title: 'Đăng ký khóa học | EngliMaster',

        // Mô tả khi share
        description:
            'Khám phá các khóa học tiếng Anh đang mở và giữ chỗ chỉ trong vài bước. EngliMaster đồng hành cùng bạn trên hành trình chinh phục tiếng Anh.',

        // URL của trang
        url: '/enroll',

        // Loại nội dung: website (không phải article, video, etc.)
        type: 'website',

        // Ảnh đại diện khi share (recommended: 1200x630px)
        images: [
            {
                url: '/logo.png',      // Đường dẫn đến ảnh
                width: 1200,           // Chiều rộng
                height: 630,           // Chiều cao
                alt: 'EngliMaster Enrollment',  // Alt text cho accessibility
            },
        ],
    },

    // ==================== TWITTER CARD ====================
    // Cấu hình hiển thị khi chia sẻ link lên Twitter/X
    twitter: {
        // summary_large_image: card với ảnh lớn ở trên
        card: 'summary_large_image',

        // Tiêu đề khi share
        title: 'Đăng ký khóa học | EngliMaster',

        // Mô tả khi share
        description:
            'Tìm khóa học tiếng Anh phù hợp và đăng ký tư vấn ngay cùng EngliMaster.',

        // Ảnh đại diện
        images: ['/logo.png'],
    },

    // ==================== CANONICAL URL ====================
    // URL chính thức của trang, giúp Google tránh index duplicate content
    alternates: {
        canonical: '/enroll',
    },
};
