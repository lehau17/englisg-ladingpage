/**
 * @file ClassesSection.tsx
 * @description Section hiển thị các lớp học theo trình độ và lịch học trong tuần.
 * Bao gồm:
 * - Grid 3 cột các class cards (Beginner, Intermediate, Advanced)
 * - Bảng lịch học trong tuần
 */

import { Calendar, CalendarDays, Clock, UserCheck, Users } from 'lucide-react';

/**
 * @interface ClassInfo
 * @description Định nghĩa cấu trúc dữ liệu cho một lớp học
 */
interface ClassInfo {
  level: string;        // Tên level (VD: "Beginner")
  levelVi: string;      // Tên tiếng Việt (VD: "Cơ bản")
  description: string;  // Mô tả ngắn
  duration: string;     // Thời lượng khóa học
  schedule: string;     // Lịch học
  students: string;     // Số học viên
  teacher: string;      // Tên giáo viên
  teacherFlag: string;  // Emoji cờ quốc gia
  nextClass: string;    // Ngày khai giảng
  features: string[];   // Nội dung học
  price: string;        // Học phí
  popular?: boolean;    // Đánh dấu lớp phổ biến
  color: string;        // Gradient color cho button
  bgColor: string;      // Gradient color cho background
  borderColor: string;  // Border color
}

/**
 * @interface ScheduleRow
 * @description Định nghĩa cấu trúc cho một hàng trong bảng lịch học
 */
interface ScheduleRow {
  time: string;                    // Khung giờ (VD: "18:00-20:00")
  days: Record<string, string>;    // Object map ngày -> tên lớp
}

/**
 * @interface ClassesSectionProps
 * @description Props cho component ClassesSection
 */
interface ClassesSectionProps {
  classes: ClassInfo[];
  classSchedule: ScheduleRow[];
}

/**
 * @component ClassesSection
 * @description Component hiển thị các lớp học và lịch học
 */
export default function ClassesSection({ classes, classSchedule }: ClassesSectionProps) {
  return (
    // ==================== CLASSES SECTION WRAPPER ====================
    // id="classes": anchor link cho navigation
    // py-20: padding trên/dưới 80px
    // bg-gradient-to-br: gradient từ góc trên trái xuống dưới phải
    // from-gray-50 to-blue-50: gradient xám -> xanh nhạt
    <section id="classes" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">

      {/* ==================== CONTAINER ==================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ==================== SECTION HEADER ==================== */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Lớp học theo trình độ
          </h2>

          {/* text-xl: font-size 20px */}
          {/* text-gray-600: màu xám */}
          {/* max-w-3xl mx-auto: giới hạn chiều rộng và căn giữa */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Chọn lớp học phù hợp với trình độ của bạn. Mỗi lớp có tối đa 12 học viên để đảm bảo chất lượng học tập tốt nhất
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mt-6"></div>
        </div>

        {/* ==================== CLASS CARDS GRID ==================== */}
        {/* grid lg:grid-cols-3: 3 cột từ 1024px */}
        {/* gap-8: khoảng cách 32px */}
        {/* mb-16: margin-bottom 64px */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">

          {/* Map qua mảng classes */}
          {classes.map((classInfo, index) => (

            // ==================== CLASS CARD ====================
            // relative: cho absolute badge
            // bg-gradient-to-br: gradient chéo
            // ${classInfo.bgColor}: màu nền động từ data
            // rounded-3xl: border-radius 24px
            // p-8: padding 32px
            // shadow-xl hover:shadow-2xl: bóng đổ với hover
            // transition-all duration-300: animation
            // hover:-translate-y-2: nâng lên khi hover
            // border-t-4: viền trên 4px
            // ${classInfo.borderColor}: màu viền động
            <div key={index} className={`relative bg-gradient-to-br ${classInfo.bgColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 ${classInfo.borderColor}`}>

              {/* ==================== POPULAR BADGE ==================== */}
              {/* Hiển thị badge "Phổ biến nhất" nếu popular = true */}
              {classInfo.popular && (
                // absolute -top-4: đặt ở trên card, nhô ra 16px
                // left-1/2 transform -translate-x-1/2: căn giữa theo chiều ngang
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  {/* bg-gradient-to-r: gradient vàng-cam */}
                  {/* text-gray-900: chữ đen */}
                  {/* px-6 py-2: padding */}
                  {/* rounded-full: bo tròn */}
                  {/* text-sm font-bold: chữ nhỏ đậm */}
                  {/* shadow-lg: bóng đổ */}
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Phổ biến nhất
                  </span>
                </div>
              )}

              {/* ==================== CLASS HEADER ==================== */}
              <div className="text-center mb-6">

                {/* ==================== LEVEL ICON ==================== */}
                {/* inline-flex: inline + flexbox */}
                {/* w-16 h-16: kích thước 64px */}
                {/* bg-gradient-to-r: gradient màu */}
                {/* ${classInfo.color}: màu gradient động */}
                {/* rounded-full: hình tròn */}
                {/* text-white text-2xl font-bold: chữ trắng lớn đậm */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${classInfo.color} rounded-full text-white text-2xl font-bold mb-4`}>
                  {/* Lấy chữ cái đầu của level */}
                  {classInfo.level[0]}
                </div>

                {/* ==================== LEVEL NAME ==================== */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {classInfo.levelVi}
                </h3>
                <p className="text-gray-600">{classInfo.description}</p>
              </div>

              {/* ==================== CLASS DETAILS ==================== */}
              {/* space-y-4: khoảng cách dọc 16px */}
              {/* mb-6: margin-bottom 24px */}
              <div className="space-y-4 mb-6">

                {/* ==================== DURATION ==================== */}
                {/* flex items-center justify-between: sắp xếp 2 đầu */}
                <div className="flex items-center justify-between">
                  {/* flex items-center gap-1: icon + text với khoảng cách 4px */}
                  <span className="text-gray-600 flex items-center gap-1">
                    {/* w-4 h-4: icon kích thước 16px */}
                    <Clock className="w-4 h-4" /> Thời lượng:
                  </span>
                  <span className="font-semibold text-gray-900">{classInfo.duration}</span>
                </div>

                {/* ==================== SCHEDULE ==================== */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Lịch học:
                  </span>
                  {/* text-sm: font-size nhỏ hơn để vừa */}
                  <span className="font-semibold text-gray-900 text-sm">{classInfo.schedule}</span>
                </div>

                {/* ==================== STUDENTS ==================== */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Users className="w-4 h-4" /> Sĩ số:
                  </span>
                  <span className="font-semibold text-gray-900">{classInfo.students}</span>
                </div>

                {/* ==================== TEACHER ==================== */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <UserCheck className="w-4 h-4" /> Giáo viên:
                  </span>
                  <span className="font-semibold text-gray-900 text-sm">
                    {classInfo.teacherFlag} {classInfo.teacher}
                  </span>
                </div>

                {/* ==================== NEXT CLASS DATE ==================== */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" /> Khai giảng:
                  </span>
                  {/* text-green-600: màu xanh lá cho ngày gần */}
                  <span className="font-semibold text-green-600">{classInfo.nextClass}</span>
                </div>
              </div>

              {/* ==================== FEATURES LIST ==================== */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Nội dung học:</h4>
                {/* space-y-2: khoảng cách 8px */}
                <ul className="space-y-2">
                  {classInfo.features.map((feature, featureIndex) => (
                    // flex items-start: sắp xếp ngang, căn trên
                    <li key={featureIndex} className="flex items-start">
                      {/* Bullet point gradient */}
                      {/* w-2 h-2: kích thước 8px */}
                      {/* bg-gradient-to-r: gradient màu */}
                      {/* rounded-full: hình tròn */}
                      {/* mr-3: margin-right 12px */}
                      {/* mt-2: margin-top 8px (căn với text) */}
                      {/* flex-shrink-0: không co lại */}
                      <span className="w-2 h-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      {/* text-gray-700 text-sm: chữ xám nhỏ */}
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ==================== PRICE & CTA ==================== */}
              {/* border-t: viền trên */}
              {/* pt-6: padding-top 24px */}
              <div className="border-t pt-6">

                {/* ==================== PRICE DISPLAY ==================== */}
                <div className="flex items-center justify-between mb-4">
                  {/* text-2xl font-bold: giá lớn đậm */}
                  <span className="text-2xl font-bold text-gray-900">{classInfo.price}</span>
                  <span className="text-gray-600">/3 tháng</span>
                </div>

                {/* ==================== REGISTER BUTTON ==================== */}
                {/* w-full: chiều rộng 100% */}
                {/* bg-gradient-to-r ${classInfo.color}: gradient màu động */}
                {/* text-white: chữ trắng */}
                {/* py-3 px-6: padding */}
                {/* rounded-xl: border-radius 12px */}
                {/* font-bold: chữ đậm */}
                {/* hover:shadow-lg hover:-translate-y-1: hover effects */}
                <button
                  className={`w-full bg-gradient-to-r ${classInfo.color} text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                  aria-label={`Đăng ký lớp học ${classInfo.levelVi}`}
                >
                  Đăng ký lớp học
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ==================== CLASS SCHEDULE TABLE ==================== */}
        {/* bg-white: nền trắng */}
        {/* rounded-3xl: border-radius 24px */}
        {/* p-8: padding 32px */}
        {/* shadow-xl: bóng đổ lớn */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Lịch học trong tuần
          </h3>

          {/* ==================== TABLE CONTAINER ==================== */}
          {/* overflow-x-auto: scroll ngang trên mobile */}
          <div className="overflow-x-auto">
            <table className="w-full">

              {/* ==================== TABLE HEADER ==================== */}
              <thead>
                {/* border-b-2 border-gray-200: viền dưới 2px màu xám */}
                <tr className="border-b-2 border-gray-200">
                  {/* text-left: căn trái cho cột đầu */}
                  {/* py-4 px-4: padding */}
                  {/* font-bold text-gray-900: chữ đậm đen */}
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Thời gian</th>
                  {/* text-center: căn giữa cho các cột ngày */}
                  <th className="text-center py-4 px-4 font-bold text-gray-900">Thứ 2</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-900">Thứ 3</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-900">Thứ 4</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-900">Thứ 5</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-900">Thứ 6</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-900">Thứ 7</th>
                </tr>
              </thead>

              {/* ==================== TABLE BODY ==================== */}
              <tbody>
                {/* Render rows từ API hoặc fallback */}
                {classSchedule.length > 0 ? classSchedule.map((row, index) => (
                  // border-b border-gray-100: viền dưới nhạt
                  <tr key={index} className="border-b border-gray-100">
                    {/* Cột thời gian */}
                    {/* font-semibold text-gray-700: chữ semi-bold xám */}
                    <td className="py-4 px-4 font-semibold text-gray-700">{row.time}</td>

                    {/* Map qua các ngày trong tuần */}
                    {['mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day) => (
                      <td key={day} className="py-4 px-4 text-center">
                        {row.days[day] ? (
                          // Nếu có lớp, hiển thị badge
                          // bg-gradient-to-r: gradient màu
                          // text-white: chữ trắng
                          // px-3 py-2: padding
                          // rounded-lg: border-radius 8px
                          // text-sm font-medium: chữ nhỏ medium
                          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
                            {row.days[day]}
                          </div>
                        ) : (
                          // Nếu không có lớp, hiển thị dấu gạch
                          <span className="text-gray-600">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                )) : (
                  // ==================== FALLBACK SCHEDULE ====================
                  // Hiển thị dữ liệu mặc định nếu API không có
                  <>
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
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* ==================== SCHEDULE NOTE ==================== */}
          {/* mt-6: margin-top 24px */}
          {/* text-center: căn giữa */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">
              <strong>Lưu ý:</strong> Có thể sắp xếp lịch học linh hoạt theo yêu cầu của nhóm
            </p>

            {/* ==================== CONSULT BUTTON ==================== */}
            <button
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              aria-label="Tư vấn lịch học phù hợp"
            >
              Tư vấn lịch học phù hợp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
