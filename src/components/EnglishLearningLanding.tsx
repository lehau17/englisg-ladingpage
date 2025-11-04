
import { LandingPageData } from '@/lib/api';
import ContactForm from './ContactForm';

interface EnglishLearningLandingProps {
    data: LandingPageData;
}

export default function EnglishLearningLanding({ data }: EnglishLearningLandingProps) {
    // Sử dụng dữ liệu từ API thay vì data tĩnh
    const { features, stats, testimonials, classes, footerSections } = data;

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

            {/* About Us Section */}
            <section id="about" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Main About Content */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                    Về <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">EngliMaster</span>
                                </h2>
                                <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-8"></div>
                                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                                    Được thành lập năm 2018, EngliMaster là trung tâm dạy tiếng Anh hàng đầu tại Việt Nam với hơn
                                    <span className="font-bold text-indigo-600"> 50,000 học viên</span> đã tin tưởng và đạt được mục tiêu học tập.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Chúng tôi tự hào mang đến phương pháp học tiếng Anh hiện đại, kết hợp giữa công nghệ AI tiên tiến
                                    và đội ngũ giáo viên bản ngữ giàu kinh nghiệm từ Mỹ, Anh, Australia.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                                    <div className="text-3xl font-bold text-indigo-600 mb-2">6+</div>
                                    <div className="text-gray-700 font-medium">Năm kinh nghiệm</div>
                                </div>
                                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                                    <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                                    <div className="text-gray-700 font-medium">Tỷ lệ đậu thi cử</div>
                                </div>
                                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                                    <div className="text-3xl font-bold text-purple-600 mb-2">20+</div>
                                    <div className="text-gray-700 font-medium">Giáo viên bản ngữ</div>
                                </div>
                                <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl">
                                    <div className="text-3xl font-bold text-orange-600 mb-2">4.8/5</div>
                                    <div className="text-gray-700 font-medium">Đánh giá học viên</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
                                <img
                                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='none'%3E%3Crect width='400' height='300' fill='%23f8fafc'/%3E%3Ccircle cx='200' cy='150' r='80' fill='%236366f1' opacity='0.1'/%3E%3Cpath d='M120 120h160v60H120z' fill='%236366f1' opacity='0.2'/%3E%3Ccircle cx='160' cy='140' r='20' fill='%236366f1'/%3E%3Ccircle cx='240' cy='140' r='20' fill='%238b5cf6'/%3E%3Ctext x='200' y='220' text-anchor='middle' fill='%23374151' font-family='Arial' font-size='14'%3EEngliMaster Team%3C/text%3E%3C/svg%3E"
                                    alt="EngliMaster Team"
                                    className="w-full h-80 object-cover rounded-2xl"
                                />
                                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm font-medium text-gray-700">Online 24/7</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-12 mb-20">
                        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl mb-6">
                                🎯
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Sứ mệnh</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Làm cho việc học tiếng Anh trở nên dễ dàng, thú vị và hiệu quả cho mọi người Việt Nam.
                                Chúng tôi tin rằng ngôn ngữ là cầu nối để mở ra những cơ hội mới trong cuộc sống và sự nghiệp.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl mb-6">
                                🌟
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tầm nhìn</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Trở thành trung tâm dạy tiếng Anh số 1 Việt Nam, nơi mọi học viên đều có thể tự tin giao tiếp
                                tiếng Anh trong môi trường quốc tế và đạt được ước mơ của mình.
                            </p>
                        </div>
                    </div>

                    {/* Our Values */}
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Giá trị cốt lõi</h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 mb-20">
                        {[
                            {
                                icon: "💡",
                                title: "Sáng tạo",
                                description: "Không ngừng đổi mới phương pháp giảng dạy, ứng dụng công nghệ hiện đại"
                            },
                            {
                                icon: "🤝",
                                title: "Tận tâm",
                                description: "Đồng hành cùng học viên từ những bước đầu tiên đến khi đạt mục tiêu"
                            },
                            {
                                icon: "🏆",
                                title: "Chất lượng",
                                description: "Cam kết mang đến chất lượng giảng dạy cao nhất với đội ngũ giáo viên xuất sắc"
                            },
                            {
                                icon: "🌍",
                                title: "Toàn cầu",
                                description: "Kết nối học viên với cộng đồng quốc tế thông qua việc thành thạo tiếng Anh"
                            }
                        ].map((value, index) => (
                            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Our Team */}
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Đội ngũ giáo viên</h3>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Đội ngũ giáo viên bản ngữ và Việt Nam giàu kinh nghiệm, được đào tạo chuyên nghiệp
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mt-6"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {[
                            {
                                name: "Ms. Sarah Johnson",
                                role: "Giám đốc học thuật",
                                flag: "🇺🇸",
                                experience: "8 năm kinh nghiệm",
                                education: "Thạc sĩ TESOL - Stanford University",
                                specialty: "Chuyên về phương pháp giao tiếp và phát âm",
                                avatar: "SJ"
                            },
                            {
                                name: "Mr. David Smith",
                                role: "Trưởng khoa Intermediate",
                                flag: "🇬🇧",
                                experience: "6 năm kinh nghiệm",
                                education: "Cử nhân Ngôn ngữ Anh - Cambridge",
                                specialty: "Chuyên về ngữ pháp và luyện thi IELTS",
                                avatar: "DS"
                            },
                            {
                                name: "Ms. Emma Wilson",
                                role: "Chuyên gia Advanced",
                                flag: "🇦🇺",
                                experience: "10 năm kinh nghiệm",
                                education: "Thạc sĩ Giáo dục - Melbourne University",
                                specialty: "Chuyên về Business English và Academic Writing",
                                avatar: "EW"
                            }
                        ].map((teacher, index) => (
                            <div key={index} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-indigo-500">
                                <div className="text-center mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                                        {teacher.avatar}
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                                        {teacher.flag} {teacher.name}
                                    </h4>
                                    <p className="text-indigo-600 font-semibold mb-2">{teacher.role}</p>
                                    <p className="text-gray-600 text-sm">{teacher.experience}</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-start">
                                        <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                        <span className="text-gray-700 text-sm">{teacher.education}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                        <span className="text-gray-700 text-sm">{teacher.specialty}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Awards & Certifications */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white text-center">
                        <h3 className="text-3xl font-bold mb-8">Chứng nhận & Giải thưởng</h3>
                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: "🏆",
                                    title: "Top 10",
                                    subtitle: "Trung tâm tiếng Anh uy tín 2023"
                                },
                                {
                                    icon: "📜",
                                    title: "Chứng nhận",
                                    subtitle: "Cambridge English Teaching"
                                },
                                {
                                    icon: "⭐",
                                    title: "5 sao",
                                    subtitle: "Đánh giá từ học viên"
                                },
                                {
                                    icon: "🎖️",
                                    title: "Giải thưởng",
                                    subtitle: "Đổi mới sáng tạo giáo dục"
                                }
                            ].map((award, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-4xl mb-3">{award.icon}</div>
                                    <div className="text-xl font-bold mb-2">{award.title}</div>
                                    <div className="text-white/90 text-sm">{award.subtitle}</div>
                                </div>
                            ))}
                        </div>
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

            {/* Classes Section */}
            <section id="classes" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Lớp học theo trình độ
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Chọn lớp học phù hợp với trình độ của bạn. Mỗi lớp có tối đa 12 học viên để đảm bảo chất lượng học tập tốt nhất
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mt-6"></div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-16">
                        {classes.map((classInfo, index) => (
                            <div key={index} className={`relative bg-gradient-to-br ${classInfo.bgColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 ${classInfo.borderColor}`}>
                                {classInfo.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                            🔥 Phổ biến nhất
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${classInfo.color} rounded-full text-white text-2xl font-bold mb-4`}>
                                        {classInfo.level[0]}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {classInfo.levelVi}
                                    </h3>
                                    <p className="text-gray-600">{classInfo.description}</p>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">⏱️ Thời lượng:</span>
                                        <span className="font-semibold text-gray-900">{classInfo.duration}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">📅 Lịch học:</span>
                                        <span className="font-semibold text-gray-900 text-sm">{classInfo.schedule}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">👥 Sĩ số:</span>
                                        <span className="font-semibold text-gray-900">{classInfo.students}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">👨‍🏫 Giáo viên:</span>
                                        <span className="font-semibold text-gray-900 text-sm">
                                            {classInfo.teacherFlag} {classInfo.teacher}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">🗓️ Khai giảng:</span>
                                        <span className="font-semibold text-green-600">{classInfo.nextClass}</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-bold text-gray-900 mb-3">Nội dung học:</h4>
                                    <ul className="space-y-2">
                                        {classInfo.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start">
                                                <span className="w-2 h-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                                <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="border-t pt-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-bold text-gray-900">{classInfo.price}</span>
                                        <span className="text-gray-600">/3 tháng</span>
                                    </div>
                                    <button className={`w-full bg-gradient-to-r ${classInfo.color} text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}>
                                        Đăng ký lớp học
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Class Schedule */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl">
                        <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
                            Lịch học trong tuần
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-gray-200">
                                        <th className="text-left py-4 px-4 font-bold text-gray-900">Thời gian</th>
                                        <th className="text-center py-4 px-4 font-bold text-gray-900">Thứ 2</th>
                                        <th className="text-center py-4 px-4 font-bold text-gray-900">Thứ 3</th>
                                        <th className="text-center py-4 px-4 font-bold text-gray-900">Thứ 4</th>
                                        <th className="text-center py-4 px-4 font-bold text-gray-900">Thứ 5</th>
                                        <th className="text-center py-4 px-4 font-bold text-gray-900">Thứ 6</th>
                                        <th className="text-center py-4 px-4 font-bold text-gray-900">Thứ 7</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-4 px-4 font-semibold text-gray-700">18:00-20:00</td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
                                                Advanced<br />
                                                <span className="text-xs opacity-90">Ms. Emma</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center">-</td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
                                                Advanced<br />
                                                <span className="text-xs opacity-90">Ms. Emma</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center">-</td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
                                                Advanced<br />
                                                <span className="text-xs opacity-90">Ms. Emma</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center">-</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-4 px-4 font-semibold text-gray-700">19:00-21:00</td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
                                                Beginner<br />
                                                <span className="text-xs opacity-90">Ms. Sarah</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center">-</td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
                                                Beginner<br />
                                                <span className="text-xs opacity-90">Ms. Sarah</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center">-</td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
                                                Beginner<br />
                                                <span className="text-xs opacity-90">Ms. Sarah</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center">-</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-4 px-4 font-semibold text-gray-700">19:30-21:30</td>
                                        <td className="py-4 px-4 text-center">-</td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
                                                Intermediate<br />
                                                <span className="text-xs opacity-90">Mr. David</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center">-</td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
                                                Intermediate<br />
                                                <span className="text-xs opacity-90">Mr. David</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-center">-</td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
                                                Intermediate<br />
                                                <span className="text-xs opacity-90">Mr. David</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 text-center">
                            <p className="text-gray-600 mb-4">
                                💡 <strong>Lưu ý:</strong> Có thể sắp xếp lịch học linh hoạt theo yêu cầu của nhóm
                            </p>
                            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                Tư vấn lịch học phù hợp
                            </button>
                        </div>
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
                        <ContactForm />

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
