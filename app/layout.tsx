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

// ✅ 여기서부터 검색엔진 최적화(SEO) 설정입니다
export const metadata: Metadata = {
  // 1. 인터넷 브라우저 탭에 뜨는 제목
  title: "베일리바이오웍스 | 더치커피 추출기 및 공장 구축 솔루션",
  
  // 2. 검색 결과 제목 아래에 나오는 설명글 (핵심 요약)
  description: "HACCP 인증 대응 더치커피 대량 생산 설비, 산업용 콜드브루 추출기 제조, 커피 공장 구축 및 자동화 솔루션 전문 기업.",
  
  // 3. 검색 키워드 (사람들이 검색할만한 단어들)
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

  // 4. 카카오톡이나 SNS 공유할 때 뜨는 미리보기 카드 설정 (Open Graph)
  openGraph: {
    title: "베일리바이오웍스 - 산업용 커피 솔루션",
    description: "데이터로 증명하는 안전, 기술로 완성된 일관성. 베일리바이오웍스입니다.",
    url: "https://www.baileybioworks.co.kr",
    siteName: "베일리바이오웍스",
    locale: "ko_KR",
    type: "website",
    // images: [{ url: '/og-image.jpg' }], // 나중에 썸네일 이미지 파일이 생기면 주석 풀고 사용하세요
  },

  // 5. 네이버/구글 소유권 확인 (나중에 코드 받으면 주석 풀고 입력하세요!)
  // verification: {
  //   google: "구글에서_받은_코드_입력",
  //   other: {
  //     "naver-site-verification": "네이버에서_받은_코드_입력",
  //   },
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ✅ 한국어 사이트이므로 lang을 "ko"로 변경했습니다
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}