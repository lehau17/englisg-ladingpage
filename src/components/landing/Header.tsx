/**
 * @component Header
 * @description Thanh điều hướng (navigation) cố định ở đầu trang.
 * Bao gồm logo, các link điều hướng và nút CTA đăng ký.
 * Sử dụng hiệu ứng glassmorphism với backdrop-blur.
 */

'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function Header() {
    return (
        // ==================== HEADER WRAPPER ====================
        // fixed: vị trí cố định, không cuộn theo trang
        // top-0: đặt ở cạnh trên cùng (0px từ top)
        // w-full: chiều rộng 100% viewport
        // bg-white/95: nền trắng với 95% opacity (hơi trong suốt)
        // backdrop-blur-md: hiệu ứng làm mờ nền phía sau (glassmorphism)
        // shadow-lg: bóng đổ lớn (0 10px 15px -3px rgba)
        // z-50: z-index 50, đảm bảo header nằm trên mọi element khác
        // transition-all: áp dụng transition cho tất cả thuộc tính
        // duration-300: thời gian transition 300ms
        <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 transition-all duration-300">

            {/* ==================== NAVIGATION CONTAINER ==================== */}
            {/* max-w-7xl: chiều rộng tối đa 1280px (80rem) */}
            {/* mx-auto: margin trái/phải auto = căn giữa */}
            {/* px-4: padding trái/phải 16px (1rem) */}
            {/* sm:px-6: responsive - từ 640px trở lên, padding 24px */}
            {/* lg:px-8: responsive - từ 1024px trở lên, padding 32px */}
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ==================== FLEX CONTAINER ==================== */}
                {/* flex: display flex, sắp xếp con theo hàng ngang */}
                {/* justify-between: phân bố đều, đẩy về 2 đầu */}
                {/* items-center: căn giữa theo trục dọc */}
                {/* h-16: chiều cao 64px (4rem) */}
                <div className="flex justify-between items-center h-16">

                    {/* ==================== LOGO ==================== */}
                    {/* text-2xl: font-size 1.5rem (24px) */}
                    {/* font-bold: font-weight 700 */}
                    {/* bg-gradient-to-r: gradient từ trái sang phải */}
                    {/* from-indigo-600: màu bắt đầu indigo (#4f46e5) */}
                    {/* to-purple-600: màu kết thúc purple (#9333ea) */}
                    {/* bg-clip-text: clip background theo text */}
                    {/* text-transparent: làm text trong suốt để thấy gradient */}
                    <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        EngliMaster
                    </div>

                    {/* ==================== DESKTOP NAVIGATION LINKS ==================== */}
                    {/* hidden: ẩn trên mobile */}
                    {/* md:flex: hiện flex từ 768px trở lên */}
                    {/* space-x-8: khoảng cách ngang giữa các item 32px */}
                    <div className="hidden md:flex space-x-8">

                        {/* ==================== NAV LINK ITEM ==================== */}
                        {/* text-gray-700: màu chữ xám đậm (#374151) */}
                        {/* hover:text-indigo-600: khi hover, đổi màu indigo */}
                        {/* font-medium: font-weight 500 */}
                        {/* transition-colors: chỉ animate màu sắc */}
                        {/* relative: position relative cho pseudo-element */}
                        {/* group: đánh dấu parent cho group-hover */}
                        <a href="#home" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group">
                            Trang chủ
                            {/* ==================== UNDERLINE ANIMATION ==================== */}
                            {/* absolute: vị trí tuyệt đối trong relative parent */}
                            {/* -bottom-1: đặt dưới text 4px */}
                            {/* left-0: bắt đầu từ bên trái */}
                            {/* w-0: chiều rộng ban đầu 0 */}
                            {/* h-0.5: chiều cao 2px */}
                            {/* bg-gradient-to-r: gradient ngang */}
                            {/* group-hover:w-full: khi hover parent, mở rộng 100% */}
                            {/* transition-all duration-300: animation mượt 300ms */}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                        </a>

                        <a href="#features" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group">
                            Tính năng
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                        </a>

                        <a href="#about" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group">
                            Về chúng tôi
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                        </a>

                        <a href="#classes" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group">
                            Lớp học
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                        </a>

                        <a href="#testimonials" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group">
                            Đánh giá
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                        </a>

                        <a href="#contact" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group">
                            Liên hệ
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                        </a>
                    </div>

                    {/* ==================== CTA BUTTONS ==================== */}
                    {/* flex: display flex */}
                    {/* items-center: căn giữa theo trục dọc */}
                    {/* space-x-4: khoảng cách ngang 16px */}
                    <div className="flex items-center space-x-4">

                        {/* ==================== AI CONSULTANT LINK ==================== */}
                        {/* gap-1: khoảng cách giữa icon và text 4px */}
                        <Link href="/ai-consultant" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors flex items-center gap-1">
                            {/* w-4 h-4: icon kích thước 16x16px */}
                            <MessageCircle className="w-4 h-4" /> Tư vấn AI
                        </Link>

                        {/* ==================== REGISTER BUTTON ==================== */}
                        {/* bg-gradient-to-r: gradient từ trái sang phải */}
                        {/* from-indigo-600 to-purple-600: gradient indigo -> purple */}
                        {/* text-white: chữ màu trắng */}
                        {/* px-6: padding trái/phải 24px */}
                        {/* py-2: padding trên/dưới 8px */}
                        {/* rounded-full: bo tròn hoàn toàn (border-radius 9999px) */}
                        {/* font-semibold: font-weight 600 */}
                        {/* hover:shadow-lg: khi hover, thêm bóng đổ */}
                        {/* hover:-translate-y-0.5: khi hover, nâng lên 2px */}
                        {/* transition-all duration-300: animation mượt */}
                        <Link href="/enroll" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                            Đăng ký khóa học
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
