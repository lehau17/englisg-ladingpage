# Tài Liệu Chi Tiết Landing Page - EngliMaster

> **Phiên bản:** 1.0  
> **Ngày cập nhật:** 08/12/2025  
> **Tác giả:** Gemini AI Assistant

## 📑 Mục Lục

1. [Tổng Quan Dự Án](#1-tổng-quan-dự-án)
2. [Công Nghệ Sử Dụng](#2-công-nghệ-sử-dụng)
3. [Cấu Trúc Thư Mục](#3-cấu-trúc-thư-mục)
4. [Server Component vs Client Component](#4-server-component-vs-client-component)
5. [Pages](#5-pages)
   - [5.1 Trang Chủ (Home)](#51-trang-chủ-home)
   - [5.2 Trang Đăng Ký (Enroll)](#52-trang-đăng-ký-enroll)
   - [5.3 Trang AI Consultant](#53-trang-ai-consultant)
6. [Section Components](#6-section-components)
   - [6.1 Header](#61-header)
   - [6.2 HeroSection](#62-herosection)
   - [6.3 FeaturesSection](#63-featuressection)
   - [6.4 AboutSection](#64-aboutsection)
   - [6.5 StatsSection](#65-statssection)
   - [6.6 ClassesSection](#66-classessection)
   - [6.7 TestimonialsSection](#67-testimonialssection)
   - [6.8 ContactSection](#68-contactsection)
   - [6.9 CTASection](#69-ctasection)
   - [6.10 Footer](#610-footer)
7. [Shared Components](#7-shared-components)
8. [Lib/API](#8-libapi)
9. [Bảng Tailwind Classes Phổ Biến](#9-bảng-tailwind-classes-phổ-biến)

## 1. Tổng Quan Dự Án

**EngliMaster Landing Page** là trang web giới thiệu nền tảng học tiếng Anh trực tuyến, được xây dựng với Next.js 15 App Router.

### Mục Đích
- Giới thiệu dịch vụ học tiếng Anh
- Thu hút học viên đăng ký khóa học
- Cung cấp thông tin liên hệ và hỗ trợ
- Tích hợp AI Consultant chatbot

### Cách Chạy Dự Án

```bash
# Di chuyển vào thư mục
cd landing-page

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build
```

## 2. Công Nghệ Sử Dụng

| Công Nghệ | Phiên Bản | Mô Tả |
|-----------|-----------|-------|
| **Next.js** | 15.4.5 | Framework React với SSR/SSG, App Router |
| **React** | 19.1.0 | UI Library |
| **TypeScript** | ^5 | Type-safe JavaScript |
| **TailwindCSS** | ^4 | Utility-first CSS framework |
| **lucide-react** | ^0.554.0 | Icon library chính |
| **@heroicons/react** | ^2.2.0 | Icon library bổ sung |
| **@tanstack/react-query** | ^5.59.16 | Data fetching và caching |
| **sonner** | ^2.0.7 | Toast notifications |
| **react-markdown** | ^9.0.1 | Render Markdown content |

## 3. Cấu Trúc Thư Mục

```
landing-page/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Trang chủ (Home) - SERVER
│   │   ├── layout.tsx                # Root layout - SERVER
│   │   ├── globals.css               # Global styles
│   │   ├── enroll/                   # Trang đăng ký - CLIENT
│   │   │   └── page.tsx             
│   │   ├── ai-consultant/            # Trang AI Consultant - CLIENT
│   │   │   └── page.tsx
│   │   └── payment/                  # Trang thanh toán
│   │
│   ├── components/                   # React Components
│   │   ├── EnglishLearningLanding.tsx    # Compose sections - SERVER
│   │   ├── AIConsultantWidget.tsx        # Chat widget - CLIENT
│   │   ├── ContactForm.tsx               # Form liên hệ - CLIENT
│   │   ├── PaymentModal.tsx              # Modal thanh toán - CLIENT
│   │   ├── ErrorBoundary.tsx             # Error handling - CLIENT
│   │   ├── StructuredData.tsx            # SEO JSON-LD - SERVER
│   │   │
│   │   └── landing/                  # Section Components
│   │       ├── Header.tsx            # Navigation - CLIENT
│   │       ├── HeroSection.tsx       # Banner - SERVER
│   │       ├── FeaturesSection.tsx   # Tính năng - SERVER
│   │       ├── AboutSection.tsx      # Giới thiệu - SERVER
│   │       ├── StatsSection.tsx      # Thống kê - SERVER
│   │       ├── ClassesSection.tsx    # Lớp học - SERVER
│   │       ├── TestimonialsSection.tsx   # Đánh giá - SERVER
│   │       ├── ContactSection.tsx    # Liên hệ - SERVER
│   │       ├── CTASection.tsx        # Call-to-Action - SERVER
│   │       ├── Footer.tsx            # Chân trang - SERVER
│   │       └── index.ts              # Barrel export
│   │
│   └── lib/                          # Utilities
│       ├── api.ts                    # API functions + Types
│       └── payment.ts                # Payment utilities
│
├── docs/images/                      # Screenshots tài liệu
├── public/                           # Static assets
└── package.json
```

## 4. Server Component vs Client Component

### Phân Loại Tổng Quan

| Component | Loại | Dấu Hiệu | Lý Do |
|-----------|------|----------|-------|
| `page.tsx` (Home) | **Server** | Không có `'use client'` | Fetch data từ API, SEO metadata |
| `layout.tsx` | **Server** | Không có `'use client'` | Root layout, metadata |
| `Header.tsx` | **Client** | `'use client'` | Toggle mobile menu (useState) |
| `HeroSection.tsx` | **Server** | Không có `'use client'` | Static content, no interactivity |
| `FeaturesSection.tsx` | **Server** | Không có `'use client'` | Static rendering từ props |
| `AboutSection.tsx` | **Server** | Không có `'use client'` | Static content |
| `StatsSection.tsx` | **Server** | Không có `'use client'` | Static rendering |
| `ClassesSection.tsx` | **Server** | Không có `'use client'` | Static rendering |
| `TestimonialsSection.tsx` | **Server** | Không có `'use client'` | Static rendering |
| `ContactSection.tsx` | **Server** | Không có `'use client'` | Compose ContactForm |
| `CTASection.tsx` | **Server** | Không có `'use client'` | Static content |
| `Footer.tsx` | **Server** | Không có `'use client'` | Static rendering |
| `ContactForm.tsx` | **Client** | `'use client'` | Form handling, useState, API call |
| `AIConsultantWidget.tsx` | **Client** | `'use client'` | Chat state, localStorage, SSE |
| `PaymentModal.tsx` | **Client** | `'use client'` | Modal state, payment flow |
| `enroll/page.tsx` | **Client** | `'use client'` | Complex form, multi-step |
| `ai-consultant/page.tsx` | **Client** | `'use client'` | Chat interface, real-time |

### Khi Nào Dùng Server Component?

**Server Component** (mặc định trong Next.js 13+):
- SEO tốt hơn (HTML render sẵn trên server)
- Bundle size nhỏ hơn (không ship JavaScript xuống client)
- Fetch data trực tiếp từ server (không cần API endpoint)
- An toàn hơn (secrets, API keys không lộ client)
- **Dùng khi:** Hiển thị static content, fetch data, không cần interactivity

### Khi Nào Dùng Client Component?

**Client Component** (`'use client'`):
- Có thể dùng hooks (useState, useEffect, useRef...)
- Event handlers (onClick, onChange, onSubmit...)
- Browser APIs (localStorage, window, navigator...)
- Real-time updates (SSE, WebSocket, polling...)
- **Dùng khi:** Form, modal, chat, animation phức tạp, user interactions

## 5. Pages

### 5.1 Trang Chủ (Home)

#### Screenshot
![Trang chủ EngliMaster](./docs/images/home_top_1765161933704.png)

#### Thông Tin Cơ Bản

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Loại** | Server Component |
| **Đường dẫn** | `src/app/page.tsx` |
| **Kích thước** | 3,324 bytes |
| **Dòng code** | 71 dòng |

#### Tại Sao Chọn Server Component?

- **SEO Metadata:** Export `metadata` object chỉ hoạt động trong Server Component
- **Data Fetching:** `async` function gọi `getLandingPageData()` trực tiếp trên server
- **Performance:** HTML render sẵn, tải trang nhanh hơn

#### Mô Tả

Trang chủ là entry point của landing page, bao gồm:
- **Metadata SEO:** Title, description, Open Graph, Twitter Cards
- **Data fetching:** Lấy dữ liệu từ API `getLandingPageData()`
- **Compose components:** ErrorBoundary, StructuredData, EnglishLearningLanding, AIConsultantWidget

#### Chi Tiết Code

```tsx
// Metadata SEO - chỉ export được trong Server Component
export const metadata: Metadata = {
    // title: Hiển thị trên tab trình duyệt và kết quả Google
    title: 'EngliMaster - Học tiếng Anh hiệu quả',
    
    // description: Mô tả ngắn dưới tiêu đề khi tìm kiếm
    description: 'Nền tảng học tiếng Anh trực tuyến cá nhân hóa...',
    
    // openGraph: Hiển thị khi share lên Facebook, Zalo, LinkedIn
    openGraph: {
        title: 'EngliMaster - Học tiếng Anh hiệu quả',
        images: [{ url: '/logo.png', width: 1200, height: 630 }],
        locale: 'vi_VN',
        type: 'website',
    },
};

// Async Server Component - fetch data trên server
export default async function HomePage() {
    // Gọi API trên server, client không thấy quá trình này
    const data = await getLandingPageData();

    return (
        // ErrorBoundary: Bọc để catch errors, web không crash hoàn toàn
        <ErrorBoundary>
            {/* StructuredData: JSON-LD cho Google hiểu cấu trúc */}
            <StructuredData data={data} />
            
            {/* Component chính compose tất cả sections */}
            <EnglishLearningLanding data={data} />
            
            {/* Widget chat AI floating ở góc màn hình */}
            <AIConsultantWidget />
        </ErrorBoundary>
    );
}
```

### 5.2 Trang Đăng Ký (Enroll)

#### Screenshot
![Trang đăng ký](./docs/images/enroll_page_1765162063132.png)

#### Thông Tin Cơ Bản

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Loại** | Client Component |
| **Đường dẫn** | `src/app/enroll/page.tsx` |
| **Kích thước** | 28,040 bytes |
| **Dòng code** | 651 dòng |

#### Tại Sao Chọn Client Component?

- **Form State:** Sử dụng `useState` để quản lý form data
- **Multi-step Flow:** Cần track current step, validation state
- **API Calls:** `getCourses()`, `getClassroomsByCourse()` được gọi từ client
- **User Interactions:** onChange, onClick, form submit handlers

#### Mô Tả

Trang đăng ký khóa học với flow multi-step:
1. **Chọn role:** Student hoặc Parent
2. **Chọn khóa học:** Danh sách courses từ API
3. **Chọn lớp học:** Danh sách classrooms theo course
4. **Điền thông tin:** Form nhập họ tên, email, phone
5. **Thanh toán:** Redirect sang VNPay

#### Các Functions Chính

| Function | Mô Tả |
|----------|-------|
| `loadCourses()` | Fetch danh sách courses từ API |
| `loadClassrooms(courseId)` | Fetch classrooms theo course đã chọn |
| `handleEnroll(classroom)` | Xử lý khi user chọn lớp |
| `handleAddStudent()` | Thêm học viên (cho role parent) |
| `handleContactSubmit()` | Submit form đăng ký |
| `formatPrice(price)` | Format số tiền sang VND |

### 5.3 Trang AI Consultant

#### Screenshot
![Trang AI Consultant](./docs/images/ai_consultant_page_1765162093593.png)

#### Thông Tin Cơ Bản

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Loại** | Client Component |
| **Đường dẫn** | `src/app/ai-consultant/page.tsx` |
| **Kích thước** | 12,063 bytes |
| **Dòng code** | 327 dòng |

#### Tại Sao Chọn Client Component?

- **Real-time Chat:** SSE (Server-Sent Events) streaming responses
- **Browser APIs:** `EventSource` cho SSE connection
- **State Management:** Messages array, loading state, input value
- **Auto-scroll:** `useRef` và `scrollIntoView` cho chat behavior

#### Mô Tả

Trang chat full-page với AI Consultant:
- Giao diện chat toàn màn hình
- SSE streaming để hiển thị response real-time
- Render Markdown trong responses
- Session persistence với localStorage

## 6. Section Components

### 6.1 Header

#### Screenshot
![Header Navigation](./docs/images/home_top_1765161933704.png)
> *Header nằm cố định ở phía trên cùng trang*

#### Thông Tin Cơ Bản

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Loại** | Client Component |
| **Đường dẫn** | `src/components/landing/Header.tsx` |
| **Kích thước** | 9,006 bytes |
| **Dòng code** | 140 dòng |

#### Tại Sao Chọn Client Component?

- **Mobile Menu Toggle:** Cần `useState` để đóng/mở menu
- **Scroll Effect:** Có thể thêm `useEffect` để thay đổi style khi scroll

#### Mô Tả

Header navigation với thiết kế glassmorphism:
- Logo gradient text
- Navigation links với underline animation on hover
- CTA buttons: "Tư vấn AI" và "Đăng ký khóa học"
- Responsive: ẩn nav links trên mobile

#### Chi Tiết Code Quan Trọng

```tsx
// ==================== HEADER WRAPPER ====================
<header className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 transition-all duration-300">
```

| Class | CSS Value | Mô Tả Tiếng Việt |
|-------|-----------|------------------|
| `fixed` | `position: fixed` | Cố định, không cuộn theo trang |
| `top-0` | `top: 0` | Dính sát cạnh trên |
| `w-full` | `width: 100%` | Chiều rộng 100% viewport |
| `bg-white/95` | `background: rgba(255,255,255,0.95)` | Nền trắng 95% opacity |
| `backdrop-blur-md` | `backdrop-filter: blur(12px)` | Làm mờ nền phía sau (glassmorphism) |
| `shadow-lg` | `box-shadow: 0 10px 15px...` | Bóng đổ lớn |
| `z-50` | `z-index: 50` | Nằm trên mọi element khác |

```tsx
// ==================== NAV LINK với UNDERLINE ANIMATION ====================
<a href="#home" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group">
    Trang chủ
    {/* Underline animation */}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
</a>
```

| Class | CSS Value | Mô Tả |
|-------|-----------|-------|
| `relative` | `position: relative` | Làm parent cho absolute child |
| `group` | - | Đánh dấu parent cho `group-hover` |
| `absolute -bottom-1` | `position: absolute; bottom: -4px` | Đặt underline dưới text |
| `w-0` → `group-hover:w-full` | `width: 0` → `width: 100%` | Mở rộng từ 0 → 100% khi hover parent |




### 6.2 HeroSection

#### Screenshot
![Hero Section](./docs/images/home_top_1765161933704.png)

#### Thông Tin Cơ Bản

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Loại** | Server Component |
| **Đường dẫn** | `src/components/landing/HeroSection.tsx` |
| **Kích thước** | 12,905 bytes |
| **Dòng code** | 201 dòng |

#### Tại Sao Chọn Server Component?

- **Static Content:** Tiêu đề, mô tả, buttons không cần state
- **SEO:** Content render sẵn trên server giúp Google index tốt hơn
- **Performance:** Không ship JavaScript không cần thiết

#### Mô Tả

Banner chính của landing page:
- Tiêu đề lớn với gradient text
- Mô tả ngắn gọn
- 2 CTA buttons: "Đăng ký khóa học" và "Tư vấn AI miễn phí"
- Progress card glassmorphism với các skill bars
- Floating words animation

#### Cấu Trúc Layout

```
┌─────────────────────────────────────────┐
│                HERO SECTION             │
├───────────────────┬─────────────────────┤
│   LEFT COLUMN     │   RIGHT COLUMN      │
│   (Text Content)  │   (Progress Card)   │
│                   │                     │
│   - Heading       │   ┌──────────────┐  │
│   - Description   │   │ Lesson Today │  │
│   - CTA Buttons   │   │ Speaking 85% │  │
│                   │   │ Vocab 92%    │  │
│                   │   │ Grammar 78%  │  │
│                   │   └──────────────┘  │
└───────────────────┴─────────────────────┘
```

#### Chi Tiết Code Quan Trọng

```tsx
// ==================== GRID LAYOUT 2 CỘT ====================
<div className="grid lg:grid-cols-2 gap-12 items-center">
```

| Class | CSS Value | Mô Tả |
|-------|-----------|-------|
| `grid` | `display: grid` | Bật grid layout |
| `lg:grid-cols-2` | `grid-template-columns: repeat(2, 1fr)` | Từ 1024px: 2 cột bằng nhau |
| `gap-12` | `gap: 3rem` | Khoảng cách 48px giữa 2 cột |
| `items-center` | `align-items: center` | Căn giữa theo trục dọc |

```tsx
// ==================== GRADIENT TEXT ====================
<span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
    Hiệu Quả
</span>
```

| Class | CSS Value | Mô Tả |
|-------|-----------|-------|
| `bg-gradient-to-r` | `background: linear-gradient(to right, ...)` | Gradient từ trái sang phải |
| `from-yellow-400` | - | Màu bắt đầu: vàng (#facc15) |
| `to-orange-400` | - | Màu kết thúc: cam (#fb923c) |
| `bg-clip-text` | `background-clip: text` | Clip gradient theo hình dạng text |
| `text-transparent` | `color: transparent` | Làm text trong suốt để thấy gradient |

```tsx
// ==================== GLASSMORPHISM CARD ====================
<div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
```

| Class | CSS Value | Mô Tả |
|-------|-----------|-------|
| `bg-white/10` | `background: rgba(255,255,255,0.1)` | Nền trắng 10% opacity |
| `backdrop-blur-lg` | `backdrop-filter: blur(16px)` | Làm mờ background mạnh |
| `rounded-3xl` | `border-radius: 1.5rem` | Bo góc 24px |
| `border border-white/20` | `border: 1px solid rgba(255,255,255,0.2)` | Viền trắng mờ |
| `shadow-2xl` | - | Bóng đổ rất lớn |




### 6.3 FeaturesSection

#### Screenshot
![Features Section](./docs/images/features_section_1765161944160.png)

#### Thông Tin Cơ Bản

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Loại** | Server Component |
| **Đường dẫn** | `src/components/landing/FeaturesSection.tsx` |
| **Kích thước** | 5,800 bytes |
| **Dòng code** | 120 dòng |

#### Tại Sao Chọn Server Component?

- **Props-driven:** Chỉ render data từ props, không có local state
- **Static UI:** Hover effects chỉ dùng CSS, không cần JavaScript
- **SEO:** Features content được index bởi search engines

#### Mô Tả

Section hiển thị các tính năng nổi bật của EngliMaster:
- Tiêu đề section với decorative underline
- Grid 3 cột (responsive: 1 → 2 → 3 cột)
- Feature cards với icon, title, description
- Hover effects: shadow tăng, nâng lên, icon phóng to

#### Props Interface

```tsx
interface Feature {
    icon: string;        // Emoji hoặc icon string
    title: string;       // Tiêu đề tính năng
    description: string; // Mô tả chi tiết
}

interface FeaturesSectionProps {
    features: Feature[]; // Mảng features từ API
}
```

#### Chi Tiết Code Quan Trọng

```tsx
// ==================== RESPONSIVE GRID ====================
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
```

| Class | Breakpoint | Effect |
|-------|------------|--------|
| `grid` | All | Enable grid layout |
| (default) | < 768px | 1 cột |
| `md:grid-cols-2` | ≥ 768px | 2 cột |
| `lg:grid-cols-3` | ≥ 1024px | 3 cột |
| `gap-8` | All | Khoảng cách 32px |

```tsx
// ==================== FEATURE CARD với HOVER EFFECTS ====================
<div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 group">
```

| Class | Mô Tả |
|-------|-------|
| `shadow-xl` | Bóng lớn ban đầu |
| `hover:shadow-2xl` | Bóng rất lớn khi hover |
| `hover:-translate-y-2` | Nâng lên 8px khi hover |
| `transition-all duration-300` | Animation mượt 300ms |
| `group` | Parent cho group-hover trên icon |

```tsx
// ==================== ICON với GROUP-HOVER ====================
<div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
    {feature.icon}
</div>
```

| Class | Mô Tả |
|-------|-------|
| `text-5xl` | Font-size 48px (cho emoji/icon lớn) |
| `group-hover:scale-110` | Phóng to 110% khi hover card (parent có class `group`) |




### 6.4 AboutSection

#### Screenshot
![About Section](./docs/images/about_section_1765161953913.png)

#### Thông Tin Cơ Bản

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Loại** | Server Component |
| **Đường dẫn** | `src/components/landing/AboutSection.tsx` |
| **Kích thước** | 27,384 bytes |
| **Dòng code** | 463 dòng |

#### Mô Tả

Section giới thiệu về EngliMaster bao gồm:
- Thông tin tổng quan với số liệu nổi bật
- Sứ mệnh và Tầm nhìn
- Giá trị cốt lõi (4 items)
- Đội ngũ giáo viên (grid cards)




### 6.5 StatsSection

#### Screenshot
![Stats Section](./docs/images/stats_section_1765161976516.png)

#### Thông Tin Cơ Bản

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Loại** | Server Component |
| **Đường dẫn** | `src/components/landing/StatsSection.tsx` |
| **Kích thước** | 3,601 bytes |
| **Dòng code** | 82 dòng |

#### Mô Tả

Section hiển thị số liệu thống kê nổi bật:
- Nền gradient tím-xanh
- Grid 4 cột (2 cột mobile)
- Số liệu với gradient text vàng-cam

#### Chi Tiết Code

```tsx
// ==================== GRADIENT TEXT CHO SỐ ====================
<div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
    {stat.number}
</div>
```




### 6.6 ClassesSection

#### Screenshot
![Classes Section](./docs/images/classes_section_1765161984313.png)

#### Thông Tin Cơ Bản

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Loại** | Server Component |
| **Đường dẫn** | `src/components/landing/ClassesSection.tsx` |
| **Kích thước** | 25,209 bytes |
| **Dòng code** | 393 dòng |

#### Mô Tả

Section hiển thị các lớp học:
- Grid 3 cards: Beginner, Intermediate, Advanced
- Mỗi card có badge "Phổ biến nhất" (nếu có)
- Chi tiết: thời lượng, lịch học, giáo viên, giá
- Bảng lịch học trong tuần




### 6.7 TestimonialsSection

#### Screenshot
![Testimonials Section](./docs/images/testimonials_section_1765162006349.png)

#### Thông Tin Cơ Bản

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Loại** | Server Component |
| **Đường dẫn** | `src/components/landing/TestimonialsSection.tsx` |
| **Kích thước** | 6,241 bytes |
| **Dòng code** | 125 dòng |

#### Mô Tả

Section đánh giá từ học viên:
- Grid 3 cột testimonial cards
- Avatar với initials (ví dụ: "MT" cho "Minh Tuấn")
- Nội dung đánh giá in nghiêng
- Tên và nghề nghiệp người đánh giá




### 6.8 ContactSection

#### Screenshot
![Contact Section](./docs/images/contact_section_1765162015177.png)

#### Thông Tin Cơ Bản

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Loại** | Server Component |
| **Đường dẫn** | `src/components/landing/ContactSection.tsx` |
| **Kích thước** | 16,541 bytes |
| **Dòng code** | 288 dòng |

#### Mô Tả

Section liên hệ bao gồm:
- Form liên hệ (import ContactForm - Client Component)
- Thông tin liên hệ: hotline, email, địa chỉ
- Ưu đãi đặc biệt
- FAQ accordion




### 6.9 CTASection

#### Screenshot
![CTA Section](./docs/images/cta_section_1765162023649.png)

#### Thông Tin Cơ Bản

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Loại** | Server Component |
| **Đường dẫn** | `src/components/landing/CTASection.tsx` |
| **Kích thước** | 3,358 bytes |
| **Dòng code** | 64 dòng |

#### Mô Tả

Section kêu gọi hành động cuối trang:
- Nền gradient tím
- Tiêu đề lớn + mô tả ngắn
- Nút CTA nổi bật màu vàng-cam




### 6.10 Footer

#### Screenshot
![Footer](./docs/images/footer_1765162033534.png)

#### Thông Tin Cơ Bản

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Loại** | Server Component |
| **Đường dẫn** | `src/components/landing/Footer.tsx` |
| **Kích thước** | 5,711 bytes |
| **Dòng code** | 116 dòng |

#### Mô Tả

Chân trang với:
- Logo + mô tả brand
- Grid 4 cột footer sections từ API
- Copyright




## 7. Shared Components

### 7.1 AIConsultantWidget

#### Screenshot
![AI Widget](./docs/images/ai_widget_open_1765162128093.png)

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Loại** | Client Component |
| **Đường dẫn** | `src/components/AIConsultantWidget.tsx` |

Widget chat AI floating ở góc màn hình, sử dụng SSE streaming.

### 7.2 ContactForm

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Loại** | Client Component |
| **Đường dẫn** | `src/components/ContactForm.tsx` |

Form liên hệ với validation và API submission.

### 7.3 PaymentModal

| Thuộc Tính | Giá Trị |
|------------|---------|
| **Loại** | Client Component |
| **Đường dẫn** | `src/components/PaymentModal.tsx` |

Modal thanh toán multi-step với VNPay integration.

## 8. Lib/API

### api.ts

File chứa:
- **Interfaces:** LandingPageData, Feature, Stat, Class, Teacher, etc.
- **API Functions:** getLandingPageData(), submitContactForm(), getCourses(), etc.
- **Fallback Data:** Dữ liệu mặc định khi API fail

### payment.ts

Utilities cho payment processing.

## 9. Bảng Tailwind Classes Phổ Biến

### Layout

| Class | CSS | Mô Tả |
|-------|-----|-------|
| `flex` | `display: flex` | Flexbox container |
| `grid` | `display: grid` | Grid container |
| `hidden` | `display: none` | Ẩn element |
| `block` | `display: block` | Hiện element |

### Spacing

| Class | CSS | Mô Tả |
|-------|-----|-------|
| `p-4` | `padding: 1rem` | Padding 16px |
| `px-8` | `padding-left: 2rem; padding-right: 2rem` | Padding ngang 32px |
| `py-20` | `padding-top: 5rem; padding-bottom: 5rem` | Padding dọc 80px |
| `m-4` | `margin: 1rem` | Margin 16px |
| `space-x-4` | `margin-left: 1rem` (trừ child đầu) | Khoảng cách ngang 16px |
| `gap-8` | `gap: 2rem` | Khoảng cách grid/flex 32px |

### Typography

| Class | CSS | Mô Tả |
|-------|-----|-------|
| `text-xl` | `font-size: 1.25rem` | 20px |
| `text-4xl` | `font-size: 2.25rem` | 36px |
| `font-bold` | `font-weight: 700` | Chữ đậm |
| `font-semibold` | `font-weight: 600` | Chữ semi-bold |
| `leading-tight` | `line-height: 1.25` | Line-height sát nhau |
| `leading-relaxed` | `line-height: 1.625` | Line-height thoáng |

### Colors

| Class | Mô Tả |
|-------|-------|
| `text-gray-900` | Chữ đen (#111827) |
| `text-gray-600` | Chữ xám (#4b5563) |
| `text-white` | Chữ trắng |
| `text-white/90` | Chữ trắng 90% opacity |
| `bg-white` | Nền trắng |
| `bg-white/10` | Nền trắng 10% opacity |
| `bg-gradient-to-r` | Gradient từ trái sang phải |
| `from-indigo-600` | Gradient bắt đầu (#4f46e5) |
| `to-purple-600` | Gradient kết thúc (#9333ea) |

### Borders & Shadows

| Class | Mô Tả |
|-------|-------|
| `rounded-lg` | Border-radius 8px |
| `rounded-full` | Border-radius 9999px (tròn) |
| `rounded-3xl` | Border-radius 24px |
| `shadow-lg` | Box-shadow lớn |
| `shadow-2xl` | Box-shadow rất lớn |
| `border` | Border 1px |
| `border-t-4` | Border top 4px |

### Effects

| Class | Mô Tả |
|-------|-------|
| `backdrop-blur-md` | Blur background 12px |
| `bg-clip-text` | Clip background theo text |
| `transition-all` | Transition tất cả properties |
| `duration-300` | Transition 300ms |
| `hover:shadow-xl` | Shadow khi hover |
| `hover:-translate-y-1` | Nâng lên 4px khi hover |
| `animate-pulse` | Animation nhấp nháy |

### Responsive Prefixes

| Prefix | Breakpoint | Màn hình |
|--------|------------|----------|
| (none) | < 640px | Mobile |
| `sm:` | ≥ 640px | Small tablet |
| `md:` | ≥ 768px | Tablet |
| `lg:` | ≥ 1024px | Desktop |
| `xl:` | ≥ 1280px | Large desktop |
| `2xl:` | ≥ 1536px | Ultra-wide |

## Ghi Chú Cuối

Tài liệu này được tạo tự động bởi Gemini AI Assistant. Để cập nhật, hãy chạy lại quá trình generate documentation.

**Ngày tạo:** 08/12/2025
