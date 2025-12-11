/**
 * @component HeroSection
 * @description Section hero chính của trang landing.
 * Bao gồm tiêu đề lớn, mô tả, các nút CTA và card hiển thị tiến độ học.
 * Có hiệu ứng floating words animation.
 */

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function HeroSection() {
    return (
        // ==================== HERO SECTION WRAPPER ====================
        // id="home": anchor link cho navigation
        // relative: position relative để chứa absolute children
        // pt-16: padding-top 64px (để tránh header fixed)
        // min-h-screen: chiều cao tối thiểu = viewport height
        // flex items-center: căn giữa nội dung theo trục dọc
        // overflow-hidden: ẩn phần tử floating tràn ra ngoài
        <section id="home" className="relative pt-16 min-h-screen flex items-center overflow-hidden">

            {/* ==================== CONTENT CONTAINER ==================== */}
            {/* max-w-7xl: chiều rộng tối đa 1280px */}
            {/* mx-auto: căn giữa theo chiều ngang */}
            {/* px-4 sm:px-6 lg:px-8: responsive padding */}
            {/* relative z-10: đảm bảo content nằm trên floating elements */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* ==================== GRID LAYOUT ==================== */}
                {/* grid: display grid */}
                {/* lg:grid-cols-2: từ 1024px, chia 2 cột bằng nhau */}
                {/* gap-12: khoảng cách giữa các cột 48px */}
                {/* items-center: căn giữa theo trục dọc */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* ==================== LEFT COLUMN - TEXT CONTENT ==================== */}
                    {/* text-white: màu chữ trắng (vì nền gradient tối) */}
                    {/* space-y-8: khoảng cách dọc giữa các element 32px */}
                    <div className="text-white space-y-8">

                        {/* ==================== MAIN HEADING ==================== */}
                        {/* text-5xl: font-size 3rem (48px) trên mobile */}
                        {/* lg:text-6xl: từ 1024px, font-size 3.75rem (60px) */}
                        {/* font-bold: font-weight 700 */}
                        {/* leading-tight: line-height 1.25 (chữ sát nhau hơn) */}
                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                            Học Tiếng Anh{' '}
                            {/* ==================== GRADIENT TEXT ==================== */}
                            {/* bg-gradient-to-r: gradient từ trái sang phải */}
                            {/* from-yellow-400 to-orange-400: vàng -> cam */}
                            {/* bg-clip-text text-transparent: áp gradient lên text */}
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                Hiệu Quả
                            </span>{' '}
                            Cùng EngliMaster
                        </h1>

                        {/* ==================== DESCRIPTION ==================== */}
                        {/* text-xl: font-size 1.25rem (20px) */}
                        {/* text-white/90: màu trắng với 90% opacity */}
                        {/* leading-relaxed: line-height 1.625 (dễ đọc) */}
                        <p className="text-xl text-white/90 leading-relaxed">
                            Phương pháp học tiếng Anh hiện đại, tương tác và thú vị. Từ cơ bản đến nâng cao,
                            chúng tôi giúp bạn thành thạo tiếng Anh chỉ trong 6 tháng!
                        </p>

                        {/* ==================== CTA BUTTONS ==================== */}
                        {/* flex: display flex */}
                        {/* flex-col: xếp dọc trên mobile */}
                        {/* sm:flex-row: từ 640px, xếp ngang */}
                        {/* gap-4: khoảng cách 16px */}
                        <div className="flex flex-col sm:flex-row gap-4">

                            {/* ==================== PRIMARY CTA BUTTON ==================== */}
                            {/* bg-gradient-to-r from-yellow-400 to-orange-400: gradient vàng-cam */}
                            {/* text-gray-900: chữ màu đen (tương phản với nền sáng) */}
                            {/* px-8 py-4: padding 32px ngang, 16px dọc */}
                            {/* rounded-full: bo tròn hoàn toàn */}
                            {/* text-lg: font-size 1.125rem (18px) */}
                            {/* font-bold: font-weight 700 */}
                            {/* hover:shadow-xl: bóng đổ lớn khi hover */}
                            {/* hover:-translate-y-1: nâng lên 4px khi hover */}
                            {/* transition-all duration-300: animation mượt */}
                            {/* text-center: căn giữa text */}
                            <Link href="/enroll" className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                                Đăng ký khóa học ngay
                            </Link>

                            {/* ==================== SECONDARY CTA BUTTON ==================== */}
                            {/* border-2 border-white: viền trắng 2px */}
                            {/* text-white: chữ trắng */}
                            {/* hover:bg-white hover:text-indigo-600: đổi màu khi hover */}
                            {/* justify-center: căn giữa icon và text */}
                            {/* gap-2: khoảng cách icon-text 8px */}
                            <Link href="/ai-consultant" className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300 text-center flex items-center justify-center gap-2">
                                {/* w-5 h-5: icon 20x20px */}
                                <MessageCircle className="w-5 h-5" /> Tư vấn AI miễn phí
                            </Link>
                        </div>
                    </div>

                    {/* ==================== RIGHT COLUMN - PROGRESS CARD ==================== */}
                    <div className="relative">

                        {/* ==================== GLASSMORPHISM CARD ==================== */}
                        {/* bg-white/10: nền trắng 10% opacity (trong suốt) */}
                        {/* backdrop-blur-lg: blur nền mạnh hơn */}
                        {/* rounded-3xl: border-radius 1.5rem (24px) */}
                        {/* p-8: padding 32px */}
                        {/* border border-white/20: viền trắng mờ */}
                        {/* shadow-2xl: bóng đổ rất lớn */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">

                            {/* ==================== CARD HEADER ==================== */}
                            {/* text-2xl: font-size 1.5rem (24px) */}
                            {/* mb-6: margin-bottom 24px */}
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <span className="ml-2">Lesson Today</span>
                            </h3>

                            {/* ==================== PROGRESS ITEMS ==================== */}
                            {/* space-y-6: khoảng cách dọc 24px */}
                            <div className="space-y-6">

                                {/* ==================== SPEAKING PROGRESS ==================== */}
                                {/* bg-white/10: nền mờ */}
                                {/* rounded-2xl: border-radius 16px */}
                                {/* p-4: padding 16px */}
                                <div className="bg-white/10 rounded-2xl p-4">
                                    {/* flex justify-between: đẩy về 2 đầu */}
                                    {/* mb-3: margin-bottom 12px */}
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-white font-semibold">Speaking</span>
                                        {/* text-yellow-400: màu vàng nổi bật */}
                                        <span className="text-yellow-400 font-bold">85%</span>
                                    </div>
                                    {/* ==================== PROGRESS BAR ==================== */}
                                    {/* w-full: rộng 100% */}
                                    {/* bg-white/20: nền track mờ */}
                                    {/* rounded-full h-3: thanh tròn cao 12px */}
                                    <div className="w-full bg-white/20 rounded-full h-3">
                                        {/* style width 85%: độ dài progress */}
                                        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                </div>

                                {/* ==================== VOCABULARY PROGRESS ==================== */}
                                <div className="bg-white/10 rounded-2xl p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-white font-semibold">Vocabulary</span>
                                        <span className="text-yellow-400 font-bold">92%</span>
                                    </div>
                                    <div className="w-full bg-white/20 rounded-full h-3">
                                        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full" style={{ width: '92%' }}></div>
                                    </div>
                                </div>

                                {/* ==================== GRAMMAR PROGRESS ==================== */}
                                <div className="bg-white/10 rounded-2xl p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-white font-semibold">Grammar</span>
                                        <span className="text-yellow-400 font-bold">78%</span>
                                    </div>
                                    <div className="w-full bg-white/20 rounded-full h-3">
                                        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full" style={{ width: '78%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==================== FLOATING WORDS ANIMATION ==================== */}
            {/* absolute inset-0: phủ kín section */}
            {/* pointer-events-none: không chặn click */}
            <div className="absolute inset-0 pointer-events-none">

                {/* ==================== FLOATING WORD: HELLO ==================== */}
                {/* absolute: vị trí tuyệt đối */}
                {/* top-1/4: cách top 25% */}
                {/* left-1/4: cách left 25% */}
                {/* animate-pulse: animation nhấp nháy */}
                <div className="absolute top-1/4 left-1/4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold animate-pulse">
                    Hello
                </div>

                {/* ==================== FLOATING WORD: LEARNING ==================== */}
                <div className="absolute top-1/3 right-1/4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold animate-pulse">
                    Learning
                </div>

                {/* ==================== FLOATING WORD: SUCCESS ==================== */}
                <div className="absolute bottom-1/3 left-1/5 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold animate-pulse">
                    Success
                </div>
            </div>
        </section>
    );
}
