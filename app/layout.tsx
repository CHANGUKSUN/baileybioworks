import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Header from "./components/Header"; // 👈 [중요] 아까 만든 메뉴판 부품 가져오기
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
  // 1. 제목
  title: "베일리바이오웍스 | 더치커피 추출기 및 공장 구축 솔루션",
  
  // 2. 설명
  description: "HACCP 인증 대응 더치커피 대량 생산 설비, 산업용 콜드브루 추출기 제조, 커피 공장 구축 및 자동화 솔루션 전문 기업.",
  
  // 3. 키워드
  keywords: [
    "더치커피 추출기", 
    "더치커피 공장", 
    "콜드브루 머신", 
    "커피 공장 창업", 
    "식품 제조 설비", 
    "베일리바이오웍스",
    "산업용 커피 머신",
    "HACCP 설비"
  ],

  // 4. SNS 공유 설정 (Open Graph)
  openGraph: {
    title: "베일리바이오웍스 - 산업용 커피 솔루션",
    description: "데이터로 증명하는 안전, 기술로 완성된 일관성. 베일리바이오웍스입니다.",
    url: "https://www.baileybioworks.co.kr",
    siteName: "베일리바이오웍스",
    locale: "ko_KR",
    type: "website",
  },

  // 5. 네이버 소유권 확인
  verification: {
    other: {
      "naver-site-verification": "633ac7b3871aa163d4876b80c2ec438aa298f422",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 1. 상단 메뉴바 (모바일/PC 반응형) */}
        <Header />

        {/* 2. 본문 내용 (메뉴바에 가려지지 않게 위쪽에 여백 pt-16 추가) */}
        <div className="pt-16">
          {children}
        </div>

        {/* 3. 통계 수집기 */}
        <Analytics />
      </body>
    </html>
  );
}