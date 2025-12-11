/**
 * @file ContactSection.tsx
 * @description Section liên hệ bao gồm:
 * - Form liên hệ (import từ ContactForm)
 * - Thông tin liên hệ: hotline, email, địa chỉ
 * - Ưu đãi đặc biệt
 * - Câu hỏi thường gặp (FAQ)
 */

import ContactForm from '../ContactForm';
import { Gift } from 'lucide-react';
import type { LandingPageClass } from '@/lib/api';

/**
 * @interface ContactSectionProps
 * @description Props cho component ContactSection
 * @property {LandingPageClass[]} classes - Mảng các lớp học để hiển thị trong form đăng ký
 */
interface ContactSectionProps {
    classes: LandingPageClass[];
}

/**
 * @component ContactSection
 * @description Component hiển thị section liên hệ với form và thông tin hỗ trợ
 */
export default function ContactSection({ classes }: ContactSectionProps) {

    // ==================== FAQ DATA ====================
    // Mảng các câu hỏi thường gặp với câu trả lời
    const faqs = [
        {
            question: "Tôi có thể học thử miễn phí không?",
            answer: "Có! Chúng tôi cung cấp khóa học thử miễn phí 7 ngày với đầy đủ tính năng để bạn trải nghiệm phương pháp học của EngliMaster."
        },
        {
            question: "Thời gian học như thế nào?",
            answer: "Bạn có thể học mọi lúc mọi nơi với ứng dụng của chúng tôi. Mỗi bài học chỉ 15-30 phút, phù hợp với lịch trình bận rộn."
        },
        {
            question: "Có giáo viên bản ngữ không?",
            answer: "Có! Đội ngũ giáo viên bản ngữ từ Mỹ, Anh, Australia sẽ hướng dẫn bạn trong các lớp học trực tuyến và phản hồi bài tập."
        },
        {
            question: "Học phí như thế nào?",
            answer: "Chúng tôi có nhiều gói học phù hợp với ngân sách của bạn, từ 299k/tháng. Liên hệ để được tư vấn gói học phù hợp nhất."
        }
    ];

    return (
        // ==================== CONTACT SECTION WRAPPER ====================
        // id="contact": anchor link cho navigation
        // py-20: padding trên/dưới 80px
        // bg-white: nền trắng
        <section id="contact" className="py-20 bg-white">

            {/* ==================== CONTAINER ==================== */}
            {/* max-w-7xl mx-auto: chiều rộng tối đa 1280px, căn giữa */}
            {/* px-4 sm:px-6 lg:px-8: responsive padding */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ==================== SECTION HEADER ==================== */}
                {/* text-center: căn giữa text */}
                {/* mb-16: margin-bottom 64px */}
                <div className="text-center mb-16">

                    {/* ==================== SECTION TITLE ==================== */}
                    {/* text-4xl lg:text-5xl: responsive font-size 36px -> 48px */}
                    {/* font-bold: font-weight 700 */}
                    {/* text-gray-900: màu chữ đen (#111827) */}
                    {/* mb-4: margin-bottom 16px */}
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Liên hệ với chúng tôi
                    </h2>

                    {/* ==================== SECTION DESCRIPTION ==================== */}
                    {/* text-xl: font-size 20px */}
                    {/* text-gray-600: màu xám (#4b5563) */}
                    {/* max-w-3xl mx-auto: giới hạn chiều rộng, căn giữa */}
                    {/* leading-relaxed: line-height 1.625 */}
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Bạn có câu hỏi về khóa học? Đội ngũ tư vấn của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
                    </p>

                    {/* ==================== DECORATIVE UNDERLINE ==================== */}
                    {/* w-24 h-1: kích thước 96px x 4px */}
                    {/* bg-gradient-to-r: gradient ngang */}
                    {/* mx-auto: căn giữa */}
                    {/* rounded-full: bo tròn hoàn toàn */}
                    {/* mt-6: margin-top 24px */}
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mt-6"></div>
                </div>

                {/* ==================== TWO COLUMN LAYOUT ==================== */}
                {/* grid lg:grid-cols-2: 2 cột từ 1024px */}
                {/* gap-16: khoảng cách 64px */}
                {/* items-start: căn trên */}
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* ==================== LEFT COLUMN: CONTACT FORM ==================== */}
                    {/* Import ContactForm component với prop classes */}
                    <ContactForm classes={classes} />

                    {/* ==================== RIGHT COLUMN: CONTACT INFO ==================== */}
                    {/* space-y-8: khoảng cách dọc 32px */}
                    <div className="space-y-8">

                        {/* ==================== HOTLINE CARD ==================== */}
                        {/* bg-white: nền trắng */}
                        {/* rounded-3xl: border-radius 24px */}
                        {/* p-8: padding 32px */}
                        {/* shadow-xl: bóng đổ lớn */}
                        {/* border-l-4 border-indigo-500: viền trái 4px màu indigo */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border-l-4 border-indigo-500">

                            {/* ==================== CARD HEADER ==================== */}
                            {/* flex items-center: sắp xếp ngang, căn giữa theo trục dọc */}
                            {/* mb-4: margin-bottom 16px */}
                            <div className="flex items-center mb-4">

                                {/* ==================== ICON CIRCLE ==================== */}
                                {/* w-12 h-12: kích thước 48px */}
                                {/* bg-gradient-to-r: gradient nền */}
                                {/* rounded-full: hình tròn */}
                                {/* flex items-center justify-center: căn giữa icon */}
                                {/* text-white text-xl: icon trắng 20px */}
                                {/* mr-4: margin-right 16px */}
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl mr-4">
                                </div>

                                <div>
                                    {/* font-bold text-gray-900 text-lg: tiêu đề đậm */}
                                    <h4 className="font-bold text-gray-900 text-lg">Hotline tư vấn</h4>
                                    {/* text-gray-600: mô tả màu xám */}
                                    <p className="text-gray-600">Liên hệ ngay để được tư vấn miễn phí</p>
                                </div>
                            </div>

                            {/* ==================== HOTLINE DETAILS ==================== */}
                            {/* space-y-2: khoảng cách dọc 8px */}
                            {/* ml-16: margin-left 64px (căn với text header) */}
                            <div className="space-y-2 ml-16">
                                {/* text-2xl font-bold text-indigo-600: số điện thoại lớn nổi bật */}
                                <p className="text-2xl font-bold text-indigo-600">1900-1234</p>
                                <p className="text-gray-600">Miễn phí từ 8:00 - 22:00 hàng ngày</p>
                            </div>
                        </div>

                        {/* ==================== EMAIL CARD ==================== */}
                        {/* border-l-4 border-purple-500: viền trái màu purple */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border-l-4 border-purple-500">
                            <div className="flex items-center mb-4">
                                {/* Gradient purple-pink cho email */}
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-xl mr-4">
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">Email hỗ trợ</h4>
                                    <p className="text-gray-600">Gửi email cho chúng tôi</p>
                                </div>
                            </div>
                            <div className="space-y-2 ml-16">
                                {/* text-lg font-semibold text-purple-600: email nổi bật */}
                                <p className="text-lg font-semibold text-purple-600">support@englimaster.com</p>
                                <p className="text-gray-600">Phản hồi trong vòng 2 giờ</p>
                            </div>
                        </div>

                        {/* ==================== ADDRESS CARD ==================== */}
                        {/* border-l-4 border-green-500: viền trái màu xanh lá */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border-l-4 border-green-500">
                            <div className="flex items-center mb-4">
                                {/* Gradient green-teal cho địa chỉ */}
                                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center text-white text-xl mr-4">
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">Địa chỉ văn phòng</h4>
                                    <p className="text-gray-600">Ghé thăm chúng tôi</p>
                                </div>
                            </div>
                            <div className="space-y-2 ml-16">
                                <p className="font-semibold text-gray-900">Tầng 15, Tòa nhà ABC</p>
                                <p className="text-gray-600">123 Đường Nguyễn Huệ, Quận 1</p>
                                <p className="text-gray-600">TP. Hồ Chí Minh, Việt Nam</p>
                            </div>
                        </div>

                        {/* ==================== SPECIAL OFFER CARD ==================== */}
                        {/* bg-gradient-to-r: gradient ngang */}
                        {/* from-indigo-600 to-purple-600: gradient indigo -> purple */}
                        {/* rounded-3xl: border-radius 24px */}
                        {/* p-8: padding 32px */}
                        {/* text-white: chữ trắng */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white">

                            {/* ==================== OFFER HEADER ==================== */}
                            {/* font-bold text-xl: tiêu đề lớn đậm */}
                            {/* mb-4: margin-bottom 16px */}
                            {/* flex items-center gap-2: icon + text với khoảng cách */}
                            <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                                {/* w-6 h-6: icon kích thước 24px */}
                                <Gift className="w-6 h-6" /> Ưu đãi đặc biệt
                            </h4>

                            <p className="mb-4">Đăng ký tư vấn ngay hôm nay để nhận:</p>

                            {/* ==================== OFFER LIST ==================== */}
                            {/* space-y-2: khoảng cách dọc 8px */}
                            <ul className="space-y-2">

                                {/* ==================== OFFER ITEM ==================== */}
                                {/* flex items-center: sắp xếp ngang, căn giữa */}
                                <li className="flex items-center">
                                    {/* Bullet point vàng */}
                                    {/* w-2 h-2: kích thước 8px */}
                                    {/* bg-yellow-400: màu vàng */}
                                    {/* rounded-full: hình tròn */}
                                    {/* mr-3: margin-right 12px */}
                                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                                    Khóa học thử miễn phí 7 ngày
                                </li>

                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                                    Bài test trình độ miễn phí
                                </li>

                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                                    Tài liệu học tập độc quyền
                                </li>

                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                                    Giảm 30% học phí khóa đầu tiên
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ==================== FAQ SECTION ==================== */}
                {/* mt-20: margin-top 80px */}
                <div className="mt-20">

                    {/* ==================== FAQ HEADER ==================== */}
                    {/* text-3xl font-bold: tiêu đề lớn đậm */}
                    {/* text-gray-900: màu đen */}
                    {/* text-center: căn giữa */}
                    {/* mb-12: margin-bottom 48px */}
                    <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Câu hỏi thường gặp
                    </h3>

                    {/* ==================== FAQ GRID ==================== */}
                    {/* grid md:grid-cols-2: 2 cột từ 768px */}
                    {/* gap-8: khoảng cách 32px */}
                    <div className="grid md:grid-cols-2 gap-8">

                        {/* Map qua mảng faqs */}
                        {faqs.map((faq, index) => (

                            // ==================== FAQ CARD ====================
                            // bg-white: nền trắng
                            // rounded-2xl: border-radius 16px
                            // p-6: padding 24px
                            // shadow-lg: bóng đổ lớn
                            // border border-gray-100: viền xám nhạt
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">

                                {/* ==================== QUESTION ==================== */}
                                {/* font-bold text-gray-900: câu hỏi đậm đen */}
                                {/* mb-3: margin-bottom 12px */}
                                {/* text-lg: font-size 18px */}
                                <h4 className="font-bold text-gray-900 mb-3 text-lg">{faq.question}</h4>

                                {/* ==================== ANSWER ==================== */}
                                {/* text-gray-600: màu xám */}
                                {/* leading-relaxed: line-height 1.625 */}
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
