// app/page.tsx
import EnglishLearningLanding from '@/components/EnglishLearningLanding';
import { getLandingPageData } from '@/lib/api';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'EngliMaster - Học tiếng Anh hiệu quả',
    description: 'Nền tảng học tiếng Anh trực tuyến cá nhân hóa, giúp bạn giao tiếp tự tin và đạt chứng chỉ quốc tế.',
    keywords: ['học tiếng Anh', 'EngliMaster', 'IELTS', 'TOEIC', 'giao tiếp tiếng Anh'],
    openGraph: {
        title: 'EngliMaster - Học tiếng Anh hiệu quả',
        description: 'Thành thạo tiếng Anh chỉ sau 6 tháng cùng EngliMaster',
        url: 'https://englisg-ladingpage.vercel.app',
        siteName: 'EngliMaster',
        images: [
            {
                url: '/logo.png', // bạn nên đặt file này trong public/
                width: 1200,
                height: 630,
                alt: 'EngliMaster Landing Page',
            },
        ],
        locale: 'vi_VN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'EngliMaster - Học tiếng Anh hiệu quả',
        description: 'Học tiếng Anh với giáo viên bản ngữ, AI và gamification',
        images: ['/logo.png'],
    },
    metadataBase: new URL('https://englisg-ladingpage.vercel.app'),
};

export default async function HomePage() {
    // Fetch data from API on server-side
    const data = await getLandingPageData();

    return <EnglishLearningLanding data={data} />;
}
