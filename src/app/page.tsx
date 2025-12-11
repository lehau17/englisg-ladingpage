// app/page.tsx
import EnglishLearningLanding from '@/components/EnglishLearningLanding';
import AIConsultantWidget from '@/components/AIConsultantWidget';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import StructuredData from '@/components/StructuredData';
import { getLandingPageData } from '@/lib/api';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    // Tiêu đề hiển thị trên tab trình duyệt và kết quả Google
    title: 'EngliMaster - Học tiếng Anh hiệu quả',
    // Mô tả ngắn dưới tiêu đề khi tìm kiếm trên Google
    description: 'Nền tảng học tiếng Anh trực tuyến cá nhân hóa, giúp bạn giao tiếp tự tin và đạt chứng chỉ quốc tế.',
    // Các từ khóa giúp Google hiểu nội dung trang web
    keywords: ['học tiếng Anh', 'EngliMaster', 'IELTS', 'TOEIC', 'giao tiếp tiếng Anh'],

    // Cấu hình hiển thị khi chia sẻ link lên Facebook, Zalo, LinkedIn...
    openGraph: {
        title: 'EngliMaster - Học tiếng Anh hiệu quả',
        description: 'Thành thạo tiếng Anh chỉ sau 6 tháng cùng EngliMaster',
        url: 'https://englisg-ladingpage.vercel.app',
        siteName: 'EngliMaster',
        images: [
            {
                url: '/logo.png', // Ảnh đại diện khi share link
                width: 1200,
                height: 630,
                alt: 'EngliMaster Landing Page',
            },
        ],
        locale: 'vi_VN',
        type: 'website',
    },
    // Cấu hình hiển thị khi chia sẻ lên Twitter/X
    twitter: {
        card: 'summary_large_image',
        title: 'EngliMaster - Học tiếng Anh hiệu quả',
        description: 'Học tiếng Anh với giáo viên bản ngữ, AI và gamification',
        images: ['/logo.png'],
    },
    // Đường dẫn gốc của website (quan trọng để các link ảnh/url hoạt động đúng)
    metadataBase: new URL('https://englisg-ladingpage.vercel.app'),
};

// 'async' nghĩa là component này có xử lý bất đồng bộ (chờ lấy dữ liệu server)
export default async function HomePage() {

    // --- PHẦN 1: GỌI API (Data Fetching) ---
    // Gọi hàm getLandingPageData() để lấy nội dung từ server.
    // Hàm này chạy trên Server Next.js, người dùng không thấy được quá trình gọi này.
    const data = await getLandingPageData();

    // --- PHẦN 2: HIỂN THỊ GIAO DIỆN (Rendering) ---
    return (
        // ErrorBoundary: Bọc bên ngoài để nếu có lỗi code bên trong, web không bị sập hoàn toàn
        <ErrorBoundary>

            {/* StructuredData: Một phần SEO nâng cao khác. 
                Nó tạo JSON-LD giúp Google hiểu đây là web giáo dục (EducationalOrganization) */}
            <StructuredData data={data} />

            {/* EnglishLearningLanding: Component hiển thị CHÍNH của trang web.
                Toàn bộ nội dung (Banner, Khóa học, Giáo viên...) được truyền vào qua biến 'data' */}
            <EnglishLearningLanding data={data} />

            {/* AIConsultantWidget: Bong bóng chat AI nằm nổi ở góc màn hình */}
            <AIConsultantWidget />

        </ErrorBoundary>
    );
}