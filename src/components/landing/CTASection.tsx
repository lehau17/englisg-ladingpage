/**
 * @component CTASection
 * @description Section kêu gọi hành động (Call To Action) cuối trang.
 * Nền gradient với tiêu đề lớn và nút đăng ký nổi bật.
 */

export default function CTASection() {
    return (
        // ==================== CTA SECTION WRAPPER ====================
        // py-20: padding trên/dưới 80px
        // bg-gradient-to-r: gradient từ trái sang phải
        // from-indigo-600: bắt đầu từ indigo (#4f46e5)
        // via-purple-600: qua purple ở giữa (#9333ea)
        // to-blue-700: kết thúc tại blue (#1d4ed8)
        // text-white: chữ màu trắng
        // text-center: căn giữa tất cả text
        <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 text-white text-center">

            {/* ==================== CONTAINER ==================== */}
            {/* max-w-4xl: chiều rộng tối đa 896px (nhỏ hơn để tập trung) */}
            {/* mx-auto: căn giữa theo chiều ngang */}
            {/* px-4 sm:px-6 lg:px-8: responsive padding */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ==================== CTA HEADING ==================== */}
                {/* text-4xl lg:text-5xl: responsive font-size 36px -> 48px */}
                {/* font-bold: font-weight 700 */}
                {/* mb-6: margin-bottom 24px */}
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    Sẵn sàng chinh phục tiếng Anh?
                </h2>

                {/* ==================== CTA DESCRIPTION ==================== */}
                {/* text-xl: font-size 1.25rem (20px) */}
                {/* text-white/90: màu trắng với 90% opacity */}
                {/* mb-10: margin-bottom 40px */}
                {/* leading-relaxed: line-height 1.625 */}
                <p className="text-xl text-white/90 mb-10 leading-relaxed">
                    Tham gia cùng hàng nghìn học viên đã thành công với EngliMaster
                </p>

                {/* ==================== CTA BUTTON ==================== */}
                {/* bg-gradient-to-r from-yellow-400 to-orange-400: gradient vàng-cam */}
                {/* text-gray-900: chữ màu đen (tương phản với nền sáng) */}
                {/* px-10: padding trái/phải 40px */}
                {/* py-5: padding trên/dưới 20px */}
                {/* rounded-full: bo tròn hoàn toàn */}
                {/* text-xl: font-size 20px */}
                {/* font-bold: font-weight 700 */}
                {/* hover:shadow-2xl: bóng đổ rất lớn khi hover */}
                {/* hover:-translate-y-2: nâng lên 8px khi hover */}
                {/* transition-all duration-300: animation mượt 300ms */}
                {/* aria-label: accessibility label cho screen readers */}
                <button
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-10 py-5 rounded-full text-xl font-bold hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                    aria-label="Đăng ký học thử miễn phí"
                >
                    Đăng ký học thử miễn phí
                </button>
            </div>
        </section>
    );
}
