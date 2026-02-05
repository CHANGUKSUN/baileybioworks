import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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

  // 5. 네이버 소유권 확인 (완료됨)
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
        {/* 현재 깃허브에는 components/Header.tsx 파일이 없으므로,
            에러 방지를 위해 관련 코드를 모두 삭제했습니다.
        */}

        {/* 메뉴바가 없는 상태이므로, 본문 상단 여백(pt-16)을 제거하여 
            화면이 상단부터 꽉 차게 나오도록 수정했습니다. 
        */}
        <main>
          {children}
        </main>

        {/* 통계 수집기 (정상 작동 중) */}
        <Analytics />
      </body>
    </html>
  );
}