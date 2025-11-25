import { ClientToaster } from '@/components/ClientToaster';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
  },
  title: "EngliMaster – Học Tiếng Anh Hiệu Quả",
  description:
    "EngliMaster là nền tảng học tiếng Anh hiện đại, cá nhân hóa theo mục tiêu và trình độ. Trải nghiệm học tập thú vị, tương tác cao và đạt kết quả nhanh chóng.",
  keywords: [
    "học tiếng Anh",
    "EngliMaster",
    "tiếng Anh giao tiếp",
    "học IELTS",
    "tiếng Anh online",
    "ứng dụng học tiếng Anh",
    "tiếng Anh cho người mới bắt đầu",
    "khóa học tiếng Anh"
  ],
  metadataBase: new URL("https://english-master.haudev.io.vn"),
  openGraph: {
    title: "EngliMaster – Học Tiếng Anh Hiệu Quả",
    description:
      "Phương pháp học tiếng Anh thông minh, thú vị và cá nhân hóa cùng EngliMaster. Tham gia cộng đồng học viên 50.000+ ngay hôm nay.",
    url: "https://english-master.haudev.io.vn",
    siteName: "EngliMaster",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "EngliMaster – Học Tiếng Anh Hiệu Quả",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ClientToaster />
      </body>
    </html>
  );
}
