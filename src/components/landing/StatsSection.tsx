/**
 * @component StatsSection
 * @description Section hiển thị các số liệu thống kê nổi bật.
 * Nền gradient với các con số có hiệu ứng gradient text.
 * 
 * @param {Stat[]} stats - Mảng các số liệu thống kê từ API
 */

/**
 * @interface Stat
 * @description Định nghĩa cấu trúc cho một số liệu thống kê
 * @property {string} number - Giá trị số (ví dụ: "50K+", "95%")
 * @property {string} label - Nhãn mô tả
 */
interface Stat {
    number: string;
    label: string;
}

/**
 * @interface StatsSectionProps
 * @description Props cho component StatsSection
 */
interface StatsSectionProps {
    stats: Stat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
    return (
        // ==================== STATS SECTION WRAPPER ====================
        // py-20: padding trên/dưới 80px
        // bg-gradient-to-r: gradient từ trái sang phải
        // from-indigo-600: bắt đầu từ indigo (#4f46e5)
        // via-purple-600: qua purple ở giữa (#9333ea)
        // to-blue-700: kết thúc tại blue (#1d4ed8)
        // text-white: chữ màu trắng
        <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 text-white">

            {/* ==================== CONTAINER ==================== */}
            {/* max-w-7xl mx-auto: chiều rộng tối đa, căn giữa */}
            {/* px-4 sm:px-6 lg:px-8: responsive padding */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ==================== STATS GRID ==================== */}
                {/* grid: display grid */}
                {/* grid-cols-2: 2 cột trên mobile */}
                {/* md:grid-cols-4: từ 768px, 4 cột */}
                {/* gap-8: khoảng cách 32px */}
                {/* text-center: căn giữa text */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

                    {/* Map qua mảng stats để render từng item */}
                    {stats.map((stat, index) => (

                        // ==================== STAT ITEM ====================
                        // space-y-2: khoảng cách dọc giữa number và label 8px
                        <div key={index} className="space-y-2">

                            {/* ==================== STAT NUMBER ==================== */}
                            {/* text-4xl: font-size 2.25rem (36px) trên mobile */}
                            {/* md:text-5xl: từ 768px, font-size 3rem (48px) */}
                            {/* font-bold: font-weight 700 */}
                            {/* bg-gradient-to-r from-yellow-400 to-orange-400: gradient vàng-cam */}
                            {/* bg-clip-text text-transparent: áp gradient lên text */}
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                {stat.number}
                            </div>

                            {/* ==================== STAT LABEL ==================== */}
                            {/* text-white/90: màu trắng với 90% opacity */}
                            {/* font-medium: font-weight 500 */}
                            <div className="text-white/90 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
