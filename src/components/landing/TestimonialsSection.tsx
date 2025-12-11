/**
 * @component TestimonialsSection
 * @description Section hiển thị đánh giá từ học viên.
 * Sử dụng grid 3 cột với các testimonial cards có avatar và thông tin.
 * 
 * @param {Testimonial[]} testimonials - Mảng các đánh giá từ API
 */

/**
 * @interface Testimonial
 * @description Định nghĩa cấu trúc cho một đánh giá học viên
 * @property {string} text - Nội dung đánh giá
 * @property {string} avatar - Tên viết tắt (VD: "MT" cho "Minh Tuấn")
 * @property {string} author - Tên người đánh giá
 * @property {string} role - Nghề nghiệp / vai trò
 */
interface Testimonial {
    text: string;
    avatar: string;
    author: string;
    role: string;
}

/**
 * @interface TestimonialsSectionProps
 * @description Props cho component TestimonialsSection
 */
interface TestimonialsSectionProps {
    testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
    return (
        // ==================== TESTIMONIALS SECTION WRAPPER ====================
        // id="testimonials": anchor link cho navigation
        // py-20: padding trên/dưới 80px
        // bg-gray-50: nền xám nhạt (#f9fafb)
        <section id="testimonials" className="py-20 bg-gray-50">

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
                        Học viên nói gì về chúng tôi
                    </h2>

                    {/* ==================== DECORATIVE UNDERLINE ==================== */}
                    {/* w-24 h-1: kích thước 96px x 4px */}
                    {/* bg-gradient-to-r: gradient ngang */}
                    {/* mx-auto: căn giữa */}
                    {/* rounded-full: bo tròn hoàn toàn */}
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
                </div>

                {/* ==================== TESTIMONIALS GRID ==================== */}
                {/* grid: display grid */}
                {/* md:grid-cols-3: từ 768px, 3 cột */}
                {/* gap-8: khoảng cách 32px */}
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Map qua mảng testimonials để render từng card */}
                    {testimonials.map((testimonial, index) => (

                        // ==================== TESTIMONIAL CARD ====================
                        // bg-white: nền trắng
                        // rounded-3xl: border-radius 24px
                        // p-8: padding 32px
                        // shadow-xl: bóng đổ lớn
                        // hover:shadow-2xl: bóng lớn hơn khi hover
                        // transition-all duration-300: animation mượt
                        <div key={index} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">

                            {/* ==================== TESTIMONIAL TEXT ==================== */}
                            {/* text-gray-600: màu xám (#4b5563) */}
                            {/* italic: in nghiêng (kiểu trích dẫn) */}
                            {/* text-lg: font-size 1.125rem (18px) */}
                            {/* mb-6: margin-bottom 24px */}
                            {/* leading-relaxed: line-height 1.625 */}
                            <div className="text-gray-600 italic text-lg mb-6 leading-relaxed">
                                {testimonial.text}
                            </div>

                            {/* ==================== AUTHOR INFO ==================== */}
                            {/* flex items-center: sắp xếp ngang, căn giữa theo trục dọc */}
                            <div className="flex items-center">

                                {/* ==================== AVATAR ==================== */}
                                {/* w-12 h-12: kích thước 48x48px */}
                                {/* bg-gradient-to-r: gradient nền */}
                                {/* rounded-full: hình tròn */}
                                {/* flex items-center justify-center: căn giữa text */}
                                {/* text-white font-bold: chữ trắng đậm */}
                                {/* mr-4: margin-right 16px */}
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                    {testimonial.avatar}
                                </div>

                                {/* ==================== AUTHOR DETAILS ==================== */}
                                <div>
                                    {/* Author name: đậm, màu đen */}
                                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                                    {/* Role: màu xám, nhỏ hơn */}
                                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
