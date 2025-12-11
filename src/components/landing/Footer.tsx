/**
 * @component Footer
 * @description Footer của trang landing với logo, mô tả và các link điều hướng.
 * Nền tối với text sáng, sử dụng grid layout responsive.
 * 
 * @param {FooterSection[]} footerSections - Mảng các section links từ API
 */

/**
 * @interface FooterSection
 * @description Định nghĩa cấu trúc cho một section trong footer
 * @property {string} title - Tiêu đề section (VD: "Khóa học", "Hỗ trợ")
 * @property {string[]} links - Mảng các link text
 */
interface FooterSection {
    title: string;
    links: string[];
}

/**
 * @interface FooterProps
 * @description Props cho component Footer
 */
interface FooterProps {
    footerSections: FooterSection[];
}

export default function Footer({ footerSections }: FooterProps) {
    return (
        // ==================== FOOTER WRAPPER ====================
        // bg-gray-900: nền xám đậm gần đen (#111827)
        // text-white: chữ màu trắng
        // py-16: padding trên/dưới 64px
        <footer className="bg-gray-900 text-white py-16">

            {/* ==================== CONTAINER ==================== */}
            {/* max-w-7xl mx-auto: chiều rộng tối đa 1280px, căn giữa */}
            {/* px-4 sm:px-6 lg:px-8: responsive padding */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ==================== FOOTER GRID ==================== */}
                {/* grid: display grid */}
                {/* md:grid-cols-4: từ 768px, 4 cột */}
                {/* gap-8: khoảng cách 32px */}
                {/* mb-12: margin-bottom 48px */}
                <div className="grid md:grid-cols-4 gap-8 mb-12">

                    {/* ==================== BRAND COLUMN ==================== */}
                    {/* space-y-4: khoảng cách dọc 16px */}
                    <div className="space-y-4">

                        {/* ==================== LOGO ==================== */}
                        {/* text-2xl: font-size 24px */}
                        {/* font-bold: font-weight 700 */}
                        {/* bg-gradient-to-r: gradient ngang */}
                        {/* from-yellow-400 to-orange-400: gradient vàng-cam */}
                        {/* bg-clip-text text-transparent: áp gradient lên text */}
                        <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                            EngliMaster
                        </div>

                        {/* ==================== BRAND DESCRIPTION ==================== */}
                        {/* text-gray-400: màu xám nhạt (#9ca3af) */}
                        {/* leading-relaxed: line-height 1.625 */}
                        <p className="text-gray-400 leading-relaxed">
                            Nền tảng học tiếng Anh trực tuyến hàng đầu Việt Nam, giúp bạn thành thạo tiếng Anh một cách hiệu quả và thú vị.
                        </p>
                    </div>

                    {/* ==================== DYNAMIC FOOTER SECTIONS ==================== */}
                    {/* Map qua mảng footerSections từ API */}
                    {footerSections.map((section, index) => (

                        // ==================== FOOTER SECTION COLUMN ====================
                        // space-y-4: khoảng cách dọc 16px giữa title và links
                        <div key={index} className="space-y-4">

                            {/* ==================== SECTION TITLE ==================== */}
                            {/* text-lg: font-size 18px */}
                            {/* font-bold: font-weight 700 */}
                            {/* text-yellow-400: màu vàng nổi bật (#facc15) */}
                            <h3 className="text-lg font-bold text-yellow-400">{section.title}</h3>

                            {/* ==================== LINKS LIST ==================== */}
                            {/* space-y-2: khoảng cách dọc 8px giữa các link */}
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        {/* ==================== FOOTER LINK ==================== */}
                                        {/* text-gray-400: màu xám nhạt */}
                                        {/* hover:text-yellow-400: đổi sang vàng khi hover */}
                                        {/* transition-colors: chỉ animate màu sắc */}
                                        <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* ==================== COPYRIGHT SECTION ==================== */}
                {/* border-t: viền trên */}
                {/* border-gray-800: màu viền xám đậm */}
                {/* pt-8: padding-top 32px */}
                {/* text-center: căn giữa */}
                {/* text-gray-400: màu xám nhạt */}
                <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 EngliMaster. Tất cả quyền được bảo lưu.</p>
                </div>
            </div>
        </footer>
    );
}
