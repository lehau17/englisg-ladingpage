
// Server Component - không cần 'use client'
export default function EnglishLearningLanding() {
    // Data tĩnh cho server component
    const features = [
        {
            icon: "🎯",
            title: "Học theo mục tiêu",
            description: "Chương trình học được cá nhân hóa theo mục tiêu và trình độ của từng học viên, giúp tối ưu hóa quá trình học tập."
        },
        {
            icon: "🗣️",
            title: "Thực hành giao tiếp",
            description: "Môi trường thực hành tiếng Anh với giáo viên bản ngữ và AI thông minh, giúp cải thiện khả năng giao tiếp tự nhiên."
        },
        {
            icon: "📱",
            title: "Học mọi lúc mọi nơi",
            description: "Ứng dụng di động hiện đại cho phép bạn học tiếng Anh bất cứ lúc nào, bất cứ nơi đâu với các bài học ngắn gọn hiệu quả."
        },
        {
            icon: "🏆",
            title: "Chứng chỉ uy tín",
            description: "Nhận chứng chỉ được công nhận quốc tế sau khi hoàn thành khóa học, nâng cao cơ hội nghề nghiệp của bạn."
        },
        {
            icon: "🎮",
            title: "Học qua trò chơi",
            description: "Phương pháp gamification thú vị giúp việc học trở nên vui nhộn và dễ dàng ghi nhớ kiến thức lâu dài."
        },
        {
            icon: "👥",
            title: "Cộng đồng học tập",
            description: "Tham gia cộng đồng học viên sôi động, chia sẻ kinh nghiệm và cùng nhau tiến bộ trong hành trình học tiếng Anh."
        }
    ];

    const stats = [
        { number: "50K+", label: "Học viên đã tham gia" },
        { number: "95%", label: "Học viên hài lòng" },
        { number: "500+", label: "Bài học tương tác" },
        { number: "24/7", label: "Hỗ trợ liên tục" }
    ];

    const testimonials = [
        {
            text: "EngliMaster đã thay đổi hoàn toàn cách tôi học tiếng Anh. Từ một người không dám nói tiếng Anh, giờ tôi đã tự tin giao tiếp với khách hàng quốc tế.",
            author: "Anh Minh Tuấn",
            role: "Nhân viên kinh doanh",
            avatar: "MT"
        },
        {
            text: "Chương trình học rất thú vị và hiệu quả. Tôi đã cải thiện điểm IELTS từ 5.5 lên 7.5 chỉ sau 4 tháng học với EngliMaster.",
            author: "Chị Thanh Hương",
            role: "Sinh viên",
            avatar: "TH"
        },
        {
            text: "Phương pháp gamification thật sự thu hút. Con tôi rất thích học và tiến bộ rõ rệt, từ việc ngại nói đến tự tin thuyết trình bằng tiếng Anh.",
            author: "Bà Minh Châu",
            role: "Phụ huynh",
            avatar: "MC"
        }
    ];

    const footerSections = [
        {
            title: "Khóa học",
            links: ["Tiếng Anh cơ bản", "Tiếng Anh giao tiếp", "IELTS/TOEIC", "Tiếng Anh thương mại"]
        },
        {
            title: "Hỗ trợ",
            links: ["Trung tâm trợ giúp", "Liên hệ", "FAQ", "Chính sách bảo mật"]
        },
        {
            title: "Liên hệ",
            links: ["📞 1900-1234", "✉️ support@englimaster.com", "📍 Hà Nội, Việt Nam"]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700">
            {/* Header */}
            <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 transition-all duration-300">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            EngliMaster
                        </div>

                        <div className="hidden md:flex space-x-8">
                            <a href="#home" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group">
                                Trang chủ
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                            </a>
                            <a href="#features" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group">
                                Tính năng
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                            </a>
                            <a href="#courses" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group">
                                Khóa học
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

                        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                            Đăng ký ngay
                        </button>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section id="home" className="relative pt-16 min-h-screen flex items-center overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-white space-y-8">
                            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                                Học Tiếng Anh{' '}
                                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                    Hiệu Quả
                                </span>{' '}
                                Cùng EngliMaster
                            </h1>

                            <p className="text-xl text-white/90 leading-relaxed">
                                Phương pháp học tiếng Anh hiện đại, tương tác và thú vị. Từ cơ bản đến nâng cao,
                                chúng tôi giúp bạn thành thạo tiếng Anh chỉ trong 6 tháng!
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    Bắt đầu học ngay
                                </button>
                                <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300">
                                    Xem demo
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    🎯 <span className="ml-2">Lesson Today</span>
                                </h3>

                                <div className="space-y-6">
                                    <div className="bg-white/10 rounded-2xl p-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-white font-semibold">Speaking</span>
                                            <span className="text-yellow-400 font-bold">85%</span>
                                        </div>
                                        <div className="w-full bg-white/20 rounded-full h-3">
                                            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full" style={{ width: '85%' }}></div>
                                        </div>
                                    </div>

                                    <div className="bg-white/10 rounded-2xl p-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-white font-semibold">Vocabulary</span>
                                            <span className="text-yellow-400 font-bold">92%</span>
                                        </div>
                                        <div className="w-full bg-white/20 rounded-full h-3">
                                            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full" style={{ width: '92%' }}></div>
                                        </div>
                                    </div>

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

                {/* Floating Words */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold animate-pulse">
                        Hello
                    </div>
                    <div className="absolute top-1/3 right-1/4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold animate-pulse">
                        Learning
                    </div>
                    <div className="absolute bottom-1/3 left-1/5 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold animate-pulse">
                        Success
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Tại sao chọn EngliMaster?
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-gradient-to-r from-indigo-600 to-purple-600 group">
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={index} className="space-y-2">
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                    {stat.number}
                                </div>
                                <div className="text-white/90 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Học viên nói gì về chúng tôi
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                                <div className="text-gray-600 italic text-lg mb-6 leading-relaxed">
                                    {testimonial.text}
                                </div>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{testimonial.author}</div>
                                        <div className="text-gray-600 text-sm">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Liên hệ với chúng tôi
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Bạn có câu hỏi về khóa học? Đội ngũ tư vấn của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mt-6"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Contact Form */}
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-xl">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Gửi tin nhắn cho chúng tôi</h3>
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Họ tên *</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white"
                                            placeholder="Nhập họ tên của bạn"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại *</label>
                                        <input
                                            type="tel"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white"
                                            placeholder="Nhập số điện thoại"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white"
                                        placeholder="Nhập địa chỉ email"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Trình độ hiện tại</label>
                                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white">
                                        <option>Chọn trình độ của bạn</option>
                                        <option>Mới bắt đầu (Beginner)</option>
                                        <option>Cơ bản (Elementary)</option>
                                        <option>Trung cấp (Intermediate)</option>
                                        <option>Khá (Upper-Intermediate)</option>
                                        <option>Thành thạo (Advanced)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mục tiêu học tập</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            "Giao tiếp hàng ngày",
                                            "Công việc/Kinh doanh",
                                            "Thi IELTS/TOEIC",
                                            "Du học",
                                            "Du lịch",
                                            "Khác"
                                        ].map((goal, index) => (
                                            <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                                <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" />
                                                <span className="text-sm text-gray-700">{goal}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tin nhắn</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white resize-none"
                                        placeholder="Chia sẻ thêm về mong muốn học tập của bạn..."
                                    ></textarea>
                                </div>

                                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    Gửi tin nhắn 📨
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-3xl p-8 shadow-xl border-l-4 border-indigo-500">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl mr-4">
                                        📞
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">Hotline tư vấn</h4>
                                        <p className="text-gray-600">Liên hệ ngay để được tư vấn miễn phí</p>
                                    </div>
                                </div>
                                <div className="space-y-2 ml-16">
                                    <p className="text-2xl font-bold text-indigo-600">1900-1234</p>
                                    <p className="text-gray-600">Miễn phí từ 8:00 - 22:00 hàng ngày</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-8 shadow-xl border-l-4 border-purple-500">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-xl mr-4">
                                        ✉️
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">Email hỗ trợ</h4>
                                        <p className="text-gray-600">Gửi email cho chúng tôi</p>
                                    </div>
                                </div>
                                <div className="space-y-2 ml-16">
                                    <p className="text-lg font-semibold text-purple-600">support@englimaster.com</p>
                                    <p className="text-gray-600">Phản hồi trong vòng 2 giờ</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-8 shadow-xl border-l-4 border-green-500">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center text-white text-xl mr-4">
                                        📍
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

                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white">
                                <h4 className="font-bold text-xl mb-4">🎁 Ưu đãi đặc biệt</h4>
                                <p className="mb-4">Đăng ký tư vấn ngay hôm nay để nhận:</p>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
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

                    {/* FAQ Section */}
                    <div className="mt-20">
                        <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
                            Câu hỏi thường gặp
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            {[
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
                            ].map((faq, index) => (
                                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                    <h4 className="font-bold text-gray-900 mb-3 text-lg">{faq.question}</h4>
                                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 text-white text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        Sẵn sàng chinh phục tiếng Anh?
                    </h2>
                    <p className="text-xl text-white/90 mb-10 leading-relaxed">
                        Tham gia cùng hàng nghìn học viên đã thành công với EngliMaster
                    </p>
                    <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-10 py-5 rounded-full text-xl font-bold hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                        Đăng ký học thử miễn phí
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div className="space-y-4">
                            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                EngliMaster
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                Nền tảng học tiếng Anh trực tuyến hàng đầu Việt Nam, giúp bạn thành thạo tiếng Anh một cách hiệu quả và thú vị.
                            </p>
                        </div>

                        {footerSections.map((section, index) => (
                            <div key={index} className="space-y-4">
                                <h3 className="text-lg font-bold text-yellow-400">{section.title}</h3>
                                <ul className="space-y-2">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 EngliMaster. Tất cả quyền được bảo lưu.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
