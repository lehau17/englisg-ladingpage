/**
 * @component FeaturesSection
 * @description Section hiển thị các tính năng nổi bật của EngliMaster.
 * Sử dụng grid layout responsive với các feature cards có hiệu ứng hover.
 * 
 * @param {Feature[]} features - Mảng các tính năng từ API
 */

/**
 * @interface Feature
 * @description Định nghĩa cấu trúc dữ liệu cho một tính năng
 * @property {string} icon - Emoji hoặc icon đại diện
 * @property {string} title - Tiêu đề tính năng
 * @property {string} description - Mô tả chi tiết
 */
interface Feature {
    icon: string;
    title: string;
    description: string;
}

/**
 * @interface FeaturesSectionProps
 * @description Props cho component FeaturesSection
 */
interface FeaturesSectionProps {
    features: Feature[];
}

export default function FeaturesSection({ features }: FeaturesSectionProps) {
    return (
        // ==================== FEATURES SECTION WRAPPER ====================
        // id="features": anchor link cho navigation
        // py-20: padding trên/dưới 80px (5rem)
        // bg-white: nền trắng
        <section id="features" className="py-20 bg-white">

            {/* ==================== CONTAINER ==================== */}
            {/* max-w-7xl mx-auto: chiều rộng tối đa 1280px, căn giữa */}
            {/* px-4 sm:px-6 lg:px-8: responsive padding */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ==================== SECTION HEADER ==================== */}
                {/* text-center: căn giữa text */}
                {/* mb-16: margin-bottom 64px */}
                <div className="text-center mb-16">

                    {/* ==================== SECTION TITLE ==================== */}
                    {/* text-4xl: font-size 2.25rem (36px) trên mobile */}
                    {/* lg:text-5xl: từ 1024px, font-size 3rem (48px) */}
                    {/* font-bold: font-weight 700 */}
                    {/* text-gray-900: màu đen đậm (#111827) */}
                    {/* mb-4: margin-bottom 16px */}
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Tại sao chọn EngliMaster?
                    </h2>

                    {/* ==================== DECORATIVE UNDERLINE ==================== */}
                    {/* w-24: chiều rộng 96px */}
                    {/* h-1: chiều cao 4px */}
                    {/* bg-gradient-to-r: gradient ngang */}
                    {/* mx-auto: căn giữa */}
                    {/* rounded-full: bo tròn hoàn toàn */}
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
                </div>

                {/* ==================== FEATURES GRID ==================== */}
                {/* grid: display grid */}
                {/* md:grid-cols-2: từ 768px, 2 cột */}
                {/* lg:grid-cols-3: từ 1024px, 3 cột */}
                {/* gap-8: khoảng cách 32px */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Map qua mảng features để render từng card */}
                    {features.map((feature, index) => (

                        // ==================== FEATURE CARD ====================
                        // bg-white: nền trắng
                        // rounded-3xl: border-radius 24px
                        // p-8: padding 32px
                        // shadow-xl: bóng đổ lớn
                        // hover:shadow-2xl: bóng lớn hơn khi hover
                        // hover:-translate-y-2: nâng lên 8px khi hover
                        // transition-all duration-300: animation mượt
                        // border-t-4: viền trên 4px
                        // group: đánh dấu parent cho group-hover
                        <div key={index} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-gradient-to-r from-indigo-600 to-purple-600 group">

                            {/* ==================== FEATURE ICON ==================== */}
                            {/* text-5xl: font-size 3rem (48px) cho emoji */}
                            {/* mb-6: margin-bottom 24px */}
                            {/* group-hover:scale-110: phóng to 110% khi hover card */}
                            {/* transition-transform: chỉ animate transform */}
                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>

                            {/* ==================== FEATURE TITLE ==================== */}
                            {/* text-xl: font-size 1.25rem (20px) */}
                            {/* font-bold: font-weight 700 */}
                            {/* text-gray-900: màu chữ đen */}
                            {/* mb-4: margin-bottom 16px */}
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                {feature.title}
                            </h3>

                            {/* ==================== FEATURE DESCRIPTION ==================== */}
                            {/* text-gray-600: màu xám (#4b5563) */}
                            {/* leading-relaxed: line-height 1.625 */}
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
