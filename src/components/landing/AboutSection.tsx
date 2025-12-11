/**
 * @file AboutSection.tsx
 * @description Section giới thiệu về EngliMaster bao gồm:
 * - Thông tin tổng quan và số liệu nổi bật
 * - Sứ mệnh và Tầm nhìn
 * - Giá trị cốt lõi
 * - Đội ngũ giáo viên
 * - Chứng nhận và Giải thưởng
 */

import Image from 'next/image';
import {
    Star,
    Handshake,
    Trophy,
    Globe,
    ScrollText,
    Medal,
} from 'lucide-react';

/**
 * @interface Teacher
 * @description Định nghĩa cấu trúc dữ liệu cho một giáo viên
 * @property {string} name - Tên giáo viên
 * @property {string} role - Chức vụ/vai trò
 * @property {string} flag - Emoji cờ quốc gia
 * @property {string} [experience] - Số năm kinh nghiệm (optional)
 * @property {string} [education] - Bằng cấp/học vấn (optional)
 * @property {string} [specialty] - Chuyên môn (optional)
 */
interface Teacher {
    name: string;
    role: string;
    flag: string;
    experience?: string;
    education?: string;
    specialty?: string;
}

/**
 * @interface AboutSectionProps
 * @description Props cho component AboutSection
 */
interface AboutSectionProps {
    teachers: Teacher[];
}

/**
 * @component AboutSection
 * @description Component hiển thị thông tin giới thiệu về EngliMaster
 */
export default function AboutSection({ teachers }: AboutSectionProps) {

    // ==================== FALLBACK DATA ====================
    // Nếu API không trả về teachers, sử dụng dữ liệu mặc định
    const displayTeachers = teachers.length > 0 ? teachers : [
        {
            name: "Ms. Sarah Johnson",
            role: "Giám đốc học thuật",
            flag: "🇺🇸",
            experience: "8 năm kinh nghiệm",
            education: "Thạc sĩ TESOL - Stanford University",
            specialty: "Chuyên về phương pháp giao tiếp và phát âm",
        },
        {
            name: "Mr. David Smith",
            role: "Trưởng khoa Intermediate",
            flag: "🇬🇧",
            experience: "6 năm kinh nghiệm",
            education: "Cử nhân Ngôn ngữ Anh - Cambridge",
            specialty: "Chuyên về ngữ pháp và luyện thi IELTS",
        },
        {
            name: "Ms. Emma Wilson",
            role: "Chuyên gia Advanced",
            flag: "🇦🇺",
            experience: "10 năm kinh nghiệm",
            education: "Thạc sĩ Giáo dục - Melbourne University",
            specialty: "Chuyên về Business English và Academic Writing",
        }
    ];

    // ==================== CORE VALUES DATA ====================
    // Mảng các giá trị cốt lõi của EngliMaster
    const coreValues = [
        {
            icon: <Handshake className="w-8 h-8" />,
            title: "Sáng tạo",
            description: "Không ngừng đổi mới phương pháp giảng dạy, ứng dụng công nghệ hiện đại"
        },
        {
            icon: <Handshake className="w-8 h-8" />,
            title: "Tận tâm",
            description: "Đồng hành cùng học viên từ những bước đầu tiên đến khi đạt mục tiêu"
        },
        {
            icon: <Trophy className="w-8 h-8" />,
            title: "Chất lượng",
            description: "Cam kết mang đến chất lượng giảng dạy cao nhất với đội ngũ giáo viên xuất sắc"
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Toàn cầu",
            description: "Kết nối học viên với cộng đồng quốc tế thông qua việc thành thạo tiếng Anh"
        }
    ];

    // ==================== AWARDS DATA ====================
    // Mảng các chứng nhận và giải thưởng
    const awards = [
        { icon: <Trophy className="w-8 h-8" />, title: "Top 10", subtitle: "Trung tâm tiếng Anh uy tín 2023" },
        { icon: <ScrollText className="w-8 h-8" />, title: "Chứng nhận", subtitle: "Cambridge English Teaching" },
        { icon: <Star className="w-8 h-8" />, title: "5 sao", subtitle: "Đánh giá từ học viên" },
        { icon: <Medal className="w-8 h-8" />, title: "Giải thưởng", subtitle: "Đổi mới sáng tạo giáo dục" }
    ];

    return (
        // ==================== ABOUT SECTION WRAPPER ====================
        // id="about": anchor link cho navigation
        // py-20: padding trên/dưới 80px
        // bg-white: nền trắng
        <section id="about" className="py-20 bg-white">

            {/* ==================== CONTAINER ==================== */}
            {/* max-w-7xl mx-auto: chiều rộng tối đa 1280px, căn giữa */}
            {/* px-4 sm:px-6 lg:px-8: responsive padding */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ==================== MAIN ABOUT CONTENT ==================== */}
                {/* grid lg:grid-cols-2: 2 cột từ 1024px */}
                {/* gap-16: khoảng cách 64px */}
                {/* items-center: căn giữa theo trục dọc */}
                {/* mb-20: margin-bottom 80px */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">

                    {/* ==================== LEFT COLUMN: TEXT CONTENT ==================== */}
                    {/* space-y-8: khoảng cách dọc 32px */}
                    <div className="space-y-8">
                        <div>
                            {/* ==================== SECTION TITLE ==================== */}
                            {/* text-4xl lg:text-5xl: responsive font-size 36px -> 48px */}
                            {/* font-bold: font-weight 700 */}
                            {/* text-gray-900: màu chữ đen (#111827) */}
                            {/* mb-6: margin-bottom 24px */}
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                Về <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">EngliMaster</span>
                            </h2>

                            {/* ==================== DECORATIVE UNDERLINE ==================== */}
                            {/* w-24 h-1: kích thước 96px x 4px */}
                            {/* bg-gradient-to-r: gradient ngang */}
                            {/* rounded-full: bo tròn hoàn toàn */}
                            {/* mb-8: margin-bottom 32px */}
                            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-8"></div>

                            {/* ==================== DESCRIPTION PARAGRAPH 1 ==================== */}
                            {/* text-xl: font-size 20px */}
                            {/* text-gray-600: màu xám (#4b5563) */}
                            {/* leading-relaxed: line-height 1.625 */}
                            {/* mb-6: margin-bottom 24px */}
                            <p className="text-xl text-gray-600 leading-relaxed mb-6">
                                Được thành lập năm 2018, EngliMaster là trung tâm dạy tiếng Anh hàng đầu tại Việt Nam với hơn
                                {/* font-bold text-indigo-600: highlight số liệu quan trọng */}
                                <span className="font-bold text-indigo-600"> 50,000 học viên</span> đã tin tưởng và đạt được mục tiêu học tập.
                            </p>

                            {/* ==================== DESCRIPTION PARAGRAPH 2 ==================== */}
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Chúng tôi tự hào mang đến phương pháp học tiếng Anh hiện đại, kết hợp giữa công nghệ AI tiên tiến
                                và đội ngũ giáo viên bản ngữ giàu kinh nghiệm từ Mỹ, Anh, Australia.
                            </p>
                        </div>

                        {/* ==================== STATS GRID ==================== */}
                        {/* grid grid-cols-2: 2 cột */}
                        {/* gap-6: khoảng cách 24px */}
                        <div className="grid grid-cols-2 gap-6">

                            {/* ==================== STAT CARD 1: YEARS ==================== */}
                            {/* text-center: căn giữa text */}
                            {/* p-6: padding 24px */}
                            {/* bg-gradient-to-br: gradient từ góc trên trái xuống góc dưới phải */}
                            {/* from-blue-50 to-indigo-50: gradient xanh nhạt */}
                            {/* rounded-2xl: border-radius 16px */}
                            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                                {/* text-3xl font-bold: số lớn đậm */}
                                {/* text-indigo-600: màu indigo */}
                                {/* mb-2: margin-bottom 8px */}
                                <div className="text-3xl font-bold text-indigo-600 mb-2">6+</div>
                                {/* text-gray-700 font-medium: label */}
                                <div className="text-gray-700 font-medium">Năm kinh nghiệm</div>
                            </div>

                            {/* ==================== STAT CARD 2: PASS RATE ==================== */}
                            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                                <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                                <div className="text-gray-700 font-medium">Tỷ lệ đậu thi cử</div>
                            </div>

                            {/* ==================== STAT CARD 3: TEACHERS ==================== */}
                            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                                <div className="text-3xl font-bold text-purple-600 mb-2">20+</div>
                                <div className="text-gray-700 font-medium">Giáo viên bản ngữ</div>
                            </div>

                            {/* ==================== STAT CARD 4: RATING ==================== */}
                            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl">
                                <div className="text-3xl font-bold text-orange-600 mb-2">4.8/5</div>
                                <div className="text-gray-700 font-medium">Đánh giá học viên</div>
                            </div>
                        </div>
                    </div>

                    {/* ==================== RIGHT COLUMN: IMAGE ==================== */}
                    {/* relative: position relative cho absolute children */}
                    <div className="relative">

                        {/* ==================== IMAGE CONTAINER ==================== */}
                        {/* bg-gradient-to-br: gradient chéo */}
                        {/* from-indigo-100 to-purple-100: gradient nhạt */}
                        {/* rounded-3xl: border-radius 24px */}
                        {/* p-8: padding 32px */}
                        {/* shadow-2xl: bóng đổ rất lớn */}
                        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-8 shadow-2xl">

                            {/* ==================== IMAGE WRAPPER ==================== */}
                            {/* relative: cho Next.js Image fill */}
                            {/* w-full h-80: chiều rộng 100%, cao 320px */}
                            {/* rounded-2xl: border-radius 16px */}
                            {/* overflow-hidden: ẩn phần ảnh tràn */}
                            <div className="relative w-full h-80 rounded-2xl overflow-hidden">
                                <Image
                                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='none'%3E%3Crect width='400' height='300' fill='%23f8fafc'/%3E%3Ccircle cx='200' cy='150' r='80' fill='%236366f1' opacity='0.1'/%3E%3Cpath d='M120 120h160v60H120z' fill='%236366f1' opacity='0.2'/%3E%3Ccircle cx='160' cy='140' r='20' fill='%236366f1'/%3E%3Ccircle cx='240' cy='140' r='20' fill='%238b5cf6'/%3E%3Ctext x='200' y='220' text-anchor='middle' fill='%23374151' font-family='Arial' font-size='14'%3EEngliMaster Team%3C/text%3E%3C/svg%3E"
                                    alt="EngliMaster Team - Đội ngũ giáo viên chuyên nghiệp"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={false}
                                />
                            </div>

                            {/* ==================== ONLINE BADGE ==================== */}
                            {/* absolute: vị trí tuyệt đối */}
                            {/* -bottom-6 -right-6: đẩy ra ngoài container */}
                            {/* bg-white: nền trắng */}
                            {/* rounded-2xl: bo góc */}
                            {/* p-4: padding 16px */}
                            {/* shadow-xl: bóng đổ */}
                            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                                <div className="flex items-center space-x-2">
                                    {/* w-3 h-3: kích thước 12px */}
                                    {/* bg-green-500: màu xanh lá */}
                                    {/* rounded-full: hình tròn */}
                                    {/* animate-pulse: animation nhấp nháy */}
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-gray-700">Online 24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ==================== MISSION & VISION SECTION ==================== */}
                {/* grid md:grid-cols-2: 2 cột từ 768px */}
                {/* gap-12: khoảng cách 48px */}
                {/* mb-20: margin-bottom 80px */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">

                    {/* ==================== MISSION CARD ==================== */}
                    {/* bg-gradient-to-br: gradient chéo */}
                    {/* from-indigo-50 to-blue-50: gradient xanh nhạt */}
                    {/* rounded-3xl: border-radius 24px */}
                    {/* p-8: padding 32px */}
                    {/* shadow-lg: bóng đổ lớn */}
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 shadow-lg">

                        {/* ==================== MISSION ICON ==================== */}
                        {/* w-16 h-16: kích thước 64px */}
                        {/* bg-gradient-to-r: gradient ngang */}
                        {/* rounded-full: hình tròn */}
                        {/* flex items-center justify-center: căn giữa icon */}
                        {/* text-white text-2xl: chữ trắng, size 24px */}
                        {/* mb-6: margin-bottom 24px */}
                        <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl mb-6">
                        </div>

                        {/* text-2xl font-bold: tiêu đề lớn đậm */}
                        {/* text-gray-900: màu đen */}
                        {/* mb-4: margin-bottom 16px */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Sứ mệnh</h3>

                        {/* text-gray-700: màu xám đậm */}
                        {/* leading-relaxed: line-height thoáng */}
                        <p className="text-gray-700 leading-relaxed">
                            Làm cho việc học tiếng Anh trở nên dễ dàng, thú vị và hiệu quả cho mọi người Việt Nam.
                            Chúng tôi tin rằng ngôn ngữ là cầu nối để mở ra những cơ hội mới trong cuộc sống và sự nghiệp.
                        </p>
                    </div>

                    {/* ==================== VISION CARD ==================== */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl mb-6">
                            {/* Star icon từ lucide-react */}
                            <Star className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Tầm nhìn</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Trở thành trung tâm dạy tiếng Anh số 1 Việt Nam, nơi mọi học viên đều có thể tự tin giao tiếp
                            tiếng Anh trong môi trường quốc tế và đạt được ước mơ của mình.
                        </p>
                    </div>
                </div>

                {/* ==================== CORE VALUES SECTION ==================== */}
                {/* ==================== VALUES HEADER ==================== */}
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Giá trị cốt lõi</h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
                </div>

                {/* ==================== VALUES GRID ==================== */}
                {/* grid md:grid-cols-4: 4 cột từ 768px */}
                {/* gap-8: khoảng cách 32px */}
                {/* mb-20: margin-bottom 80px */}
                <div className="grid md:grid-cols-4 gap-8 mb-20">
                    {/* Map qua mảng coreValues */}
                    {coreValues.map((value, index) => (

                        // ==================== VALUE CARD ====================
                        // text-center: căn giữa
                        // p-6: padding 24px
                        // bg-white: nền trắng
                        // rounded-2xl: border-radius 16px
                        // shadow-lg hover:shadow-xl: bóng đổ với hover effect
                        // transition-all duration-300: animation mượt
                        // hover:-translate-y-2: nâng lên 8px khi hover
                        <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            {/* text-4xl: icon size 36px */}
                            {/* flex justify-center: căn giữa icon */}
                            {/* text-indigo-600: màu indigo */}
                            <div className="text-4xl mb-4 flex justify-center text-indigo-600">{value.icon}</div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                            <p className="text-gray-600 leading-relaxed">{value.description}</p>
                        </div>
                    ))}
                </div>

                {/* ==================== TEACHERS SECTION ==================== */}
                {/* ==================== TEACHERS HEADER ==================== */}
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Đội ngũ giáo viên</h3>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Đội ngũ giáo viên bản ngữ và Việt Nam giàu kinh nghiệm, được đào tạo chuyên nghiệp
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mt-6"></div>
                </div>

                {/* ==================== TEACHERS GRID ==================== */}
                {/* grid md:grid-cols-3: 3 cột từ 768px */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {displayTeachers.map((teacher, index) => {
                        // ==================== AVATAR GENERATION ====================
                        // Tạo avatar từ tên (VD: "Sarah Johnson" -> "SJ")
                        const nameParts = teacher.name.split(' ');
                        const avatar = nameParts.length >= 2
                            ? nameParts[0][0] + nameParts[nameParts.length - 1][0]
                            : nameParts[0].substring(0, 2);

                        return (
                            // ==================== TEACHER CARD ====================
                            // bg-white: nền trắng
                            // rounded-3xl: border-radius 24px
                            // p-8: padding 32px
                            // shadow-xl hover:shadow-2xl: bóng đổ với hover
                            // transition-all duration-300: animation
                            // hover:-translate-y-2: nâng lên khi hover
                            // border-t-4 border-indigo-500: viền trên màu indigo
                            <div key={index} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-indigo-500">

                                {/* ==================== TEACHER INFO ==================== */}
                                <div className="text-center mb-6">

                                    {/* ==================== TEACHER AVATAR ==================== */}
                                    {/* w-20 h-20: kích thước 80px */}
                                    {/* bg-gradient-to-r: gradient nền */}
                                    {/* rounded-full: hình tròn */}
                                    {/* mx-auto: căn giữa */}
                                    {/* mb-4: margin-bottom 16px */}
                                    <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                                        {avatar.toUpperCase()}
                                    </div>

                                    {/* ==================== TEACHER NAME ==================== */}
                                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                                        {teacher.flag} {teacher.name}
                                    </h4>

                                    {/* ==================== TEACHER ROLE ==================== */}
                                    {/* text-indigo-600: màu indigo nổi bật */}
                                    <p className="text-indigo-600 font-semibold mb-2">{teacher.role}</p>

                                    {/* ==================== EXPERIENCE ==================== */}
                                    {teacher.experience && (
                                        <p className="text-gray-600 text-sm">{teacher.experience}</p>
                                    )}
                                </div>

                                {/* ==================== TEACHER DETAILS ==================== */}
                                {/* space-y-3: khoảng cách dọc 12px */}
                                <div className="space-y-3">

                                    {/* ==================== EDUCATION ==================== */}
                                    {teacher.education && (
                                        <div className="flex items-start">
                                            {/* Bullet point với màu indigo */}
                                            <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                            <span className="text-gray-700 text-sm">{teacher.education}</span>
                                        </div>
                                    )}

                                    {/* ==================== SPECIALTY ==================== */}
                                    {teacher.specialty && (
                                        <div className="flex items-start">
                                            {/* Bullet point với màu purple */}
                                            <span className="w-2 h-2 bg-purple-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                            <span className="text-gray-700 text-sm">{teacher.specialty}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ==================== AWARDS SECTION ==================== */}
                {/* bg-gradient-to-r: gradient ngang */}
                {/* from-indigo-600 to-purple-600: gradient indigo -> purple */}
                {/* rounded-3xl: border-radius 24px */}
                {/* p-12: padding 48px */}
                {/* text-white text-center: chữ trắng, căn giữa */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white text-center">
                    <h3 className="text-3xl font-bold mb-8">Chứng nhận & Giải thưởng</h3>

                    {/* ==================== AWARDS GRID ==================== */}
                    {/* grid md:grid-cols-4: 4 cột từ 768px */}
                    <div className="grid md:grid-cols-4 gap-8">
                        {awards.map((award, index) => (
                            <div key={index} className="text-center">
                                {/* text-4xl: icon size */}
                                {/* flex justify-center: căn giữa */}
                                <div className="text-4xl mb-3 flex justify-center">{award.icon}</div>
                                <div className="text-xl font-bold mb-2">{award.title}</div>
                                {/* text-white/90: màu trắng với 90% opacity */}
                                <div className="text-white/90 text-sm">{award.subtitle}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
