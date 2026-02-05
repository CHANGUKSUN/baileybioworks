'use client';

/**
 * =========================================================
 * BaileyBioWorks Landing Page (Single-file)
 * =========================================================
 * ✅ 목표
 * 1) 에러 없이 배포: TS 타입 안정화, next/image 사용, 이벤트 cleanup 안전 처리
 * 2) 전환율(문의) 개선: mailto + 복사 + 공유(Web Share) + 전화 버튼 + UX(ESC/바깥 클릭/포커스/스크롤 잠금)
 * 3) “View All(전체 사례 보기)” 버튼 → 도입 문의로 연결 (모달 오픈)
 *
 * ✅ 이미지 파일 (public 폴더에 정확히 존재해야 함 / 리눅스 대소문자 엄격)
 * - public/portfolio_1.jpg
 * - public/img_1522.jpg
 * - public/img_9195.jpg
 * - public/img_1538.jpg
 */

// ---------------------------------------------------------
// 1) 기본 라이브러리/컴포넌트 import
// ---------------------------------------------------------
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Beaker,
  ClipboardCheck,
  Droplets,
  Factory,
  Globe,
  Instagram,
  Lock,
  Mail,
  Phone,
  Scale,
  Shield,
  ShieldCheck,
  Sliders,
  Snowflake,
  Wifi,
  X,
  Youtube,
  Zap,
} from 'lucide-react';

// ---------------------------------------------------------
// 2) 번역 데이터 (필요하면 이 객체만 수정하면 됨)
// ---------------------------------------------------------
const translations = {
  ko: {
    nav: {
      products: '제품 소개',
      safety: '위생 솔루션',
      portfolio: '납품 실적',
      technology: '핵심 기술',
      solutions: '사업별 솔루션',
      test: '추출 테스트',
      contact: '도입 문의',
    },
    hero: {
      badge: 'Professional Cold Brew Systems',
      title1: '데이터로 증명하는 안전,',
      title2: '기술로 완성된 일관성',
      desc: 'HACCP 기준을 충족하는 완벽한 위생, 누가 내려도 변함없는 균일한 품질.\n베일리바이오웍스는 콜드브루 추출의 엔지니어링 표준을 제시합니다.',
      ctaPrimary: '솔루션 도입 문의',
      ctaSecondary: '기술 사양 보기',
      ticker:
        'Professional Dutch Coffee Machine  •  Industrial Cold Brew System  •  HACCP Compliant  •  Liquid Coffee Manufacturing  •  High Yield Extraction  •  ',
    },
    safety: {
      title: 'Hygiene & Safety',
      subtitle: '식품 안전은 타협할 수 없는 원칙입니다.\n실험실 수준의 위생 제어 시스템을 경험하세요.',
      card1Title: 'HACCP 기준 충족 시스템',
      card1Desc: '식약처 HACCP 기준 충족.\n완전 밀폐형 구조로 교차 오염 차단.',
      card2Title: 'ATP < 20 RLU',
      card2Desc: '육안으로 보이지 않는 오염까지 제거.\n데이터로 증명되는 무결점 위생.',
      card3Title: 'Advanced CIP',
      card3Desc: '배관 내부 바이오 필름을 제거하는\n독자적 고도 산화 살균 프로세스.',
    },
    features: {
      title: 'Core Technology',
      subtitle: '흉내 낼 수 없는 4가지 핵심 기술로\n추출의 패러다임을 바꿉니다.',
      f1: 'Multi-Variable Control',
      f1Desc: '추출량, 시간, 유속, 사이클을 0.1단위로 정밀 통제하여 의도한 맛을 100% 구현합니다.',
      f1Badge: 'Precision',
      f2: 'Powerful CIP System',
      f2Desc: '버튼 하나로 배관 내부 깊숙한 곳의 오염물질까지 강력하게 살균하는 자동 세척 시스템.',
      f2Badge: 'Hygiene',
      f3: 'Cold Block System',
      f3Desc: '추출 전 과정 4℃ 이하 유지. 밀폐 환경에서 세균 증식을 물리적으로 억제합니다.',
      f3Badge: 'Temperature',
      f4: 'IoT Connectivity',
      f4Desc: '스마트폰으로 전 세계 어디서든 장비 상태를 실시간으로 모니터링하고 제어합니다.',
      f4Badge: 'Smart',
    },
    product: {
      title: 'Lineup',
      tabBasic: 'HWD-3000 (Standard)',
      tabPro: 'Bailey PRO (Advanced)',
      basicDesc:
        '안개 분사 방식과 완전 밀폐 냉장 시스템으로 완성된 콜드브루 추출기의 표준. CIP 자동 살균 시스템 탑재.',
      proDesc:
        'HWD-3000의 안정성에 첨단 IoT와 로드셀 제어를 더했습니다. 복잡한 프로파일을 완벽하게 수행하는 하이엔드 머신.',
      linkText: '공식 온라인 판매처 (재재상회)',
    },
    solutions: {
      title: 'Business Solutions',
      subtitle: '비즈니스 규모에 최적화된 맞춤형 패키지.',
      s1Title: 'Cafe Starter',
      s1Desc: '하루 30L 이하 생산 전문 카페용.\nHWD-3000 + 필터 시스템.',
      s1Btn: '견적 문의',
      s2Title: 'Factory Lab',
      s2Desc: '하루 300L 이상 대량 생산 모델.\n중앙제어 모니터링 + 자동 이송 시스템.',
      s2Btn: '전문 상담',
    },
    portfolio: {
      title: 'Portfolio',
      subtitle: '다양한 산업 현장에서 검증된 베일리의 퍼포먼스.\n우리는 가장 가혹한 환경에서도 완벽하게 작동합니다.',
      case1: 'HACCP 인증 대량 생산 설비',
      case2: '산업용 중앙 제어 시스템',
      case3: '산업용 정제수 제조 시스템',
      case4: '디팅 산업용 그라인더',
      viewAll: '전체 사례 보기',
    },
    footer: {
      address: '경기도 용인시 처인구 통삼로 288-13',
      techContact: '기술상담 : 010.5650.7255',
      rights: '© 2026 베일리바이오웍스. All rights reserved.',
    },
    modal: {
      title: 'Inquiry',
      desc: '담당자가 확인 후 빠르게 연락드립니다.',
      typeLabel: '문의 유형',
      type1: '일반 도입 문의',
      type2: '추출 테스트 신청',
      testNote: '💡 원두 1kg을 보내주시면 1:4 수율로 4L를 추출하여 보내드립니다.',
      nameLabel: '회사명 / 성함',
      namePlace: '입력해주세요',
      contactLabel: '연락처',
      contactPlace: '이메일 또는 전화번호',
      submitMail: '이메일로 문의 접수하기',
      copy: '내용 복사하기',
      copied: '복사 완료!',
      callNow: '전화하기',
      shareKakao: '공유하기',
      close: '닫기',
      tip: '✅ 팁: 복사 후 카카오톡/문자에 붙여넣으면 가장 빠릅니다.',
    },
  },

  // 영어는 최소 구성 (필요하면 ko처럼 상세화)
  en: {
    nav: {
      products: 'Products',
      safety: 'Safety',
      portfolio: 'Portfolio',
      technology: 'Tech',
      solutions: 'Solutions',
      test: 'Test',
      contact: 'Contact',
    },
    hero: {
      badge: 'Professional Systems',
      title1: 'Safety by Data,',
      title2: 'Consistency by Tech',
      desc: 'Perfect hygiene meeting HACCP standards.\nStable quality with engineered repeatability.',
      ctaPrimary: 'Inquire',
      ctaSecondary: 'See Specs',
      ticker: 'Professional Cold Brew System • HACCP Ready • IoT Monitoring • ',
    },
    safety: {
      title: 'Hygiene',
      subtitle: 'Lab-grade safety.',
      card1Title: 'HACCP Ready',
      card1Desc: 'Fully sealed.',
      card2Title: 'ATP < 20',
      card2Desc: 'Verified cleanliness.',
      card3Title: 'Auto CIP',
      card3Desc: 'Deep clean.',
    },
    features: {
      title: 'Tech',
      subtitle: '4 Core Technologies.',
      f1: 'Control',
      f1Desc: 'Precision.',
      f1Badge: 'Precise',
      f2: 'CIP',
      f2Desc: 'Clean.',
      f2Badge: 'Clean',
      f3: 'Cold',
      f3Desc: 'Sealed.',
      f3Badge: 'Cold',
      f4: 'IoT',
      f4Desc: 'Connect.',
      f4Badge: 'Smart',
    },
    product: {
      title: 'Lineup',
      tabBasic: 'HWD-3000',
      tabPro: 'PRO',
      basicDesc: 'Standard.',
      proDesc: 'Advanced.',
      linkText: 'Store',
    },
    solutions: {
      title: 'Solutions',
      subtitle: 'Packages.',
      s1Title: 'Cafe',
      s1Desc: 'Small.',
      s1Btn: 'Quote',
      s2Title: 'Factory',
      s2Desc: 'Large.',
      s2Btn: 'Consult',
    },
    portfolio: {
      title: 'Portfolio',
      subtitle: 'Cases.',
      case1: 'Factory',
      case2: 'Center',
      case3: 'Water system',
      case4: 'Grinder',
      viewAll: 'View all',
    },
    footer: {
      address: 'Yongin, KR',
      techContact: 'Tech: +82 10-5650-7255',
      rights: '© 2026 Bailey.',
    },
    modal: {
      title: 'Contact',
      desc: 'We will get back to you.',
      typeLabel: 'Type',
      type1: 'General',
      type2: 'Extraction Test',
      testNote: 'Send 1kg beans → receive 4L extract.',
      nameLabel: 'Name',
      namePlace: 'Your name',
      contactLabel: 'Contact',
      contactPlace: 'Email or phone',
      submitMail: 'Send via Email',
      copy: 'Copy message',
      copied: 'Copied!',
      callNow: 'Call',
      shareKakao: 'Share',
      close: 'Close',
      tip: 'Tip: Copy & paste into messenger for fastest response.',
    },
  },

  // 재미용 (폰트만 mono로 바뀌고 텍스트는 ... )
  alien: {
    nav: { products: '...', safety: '...', portfolio: '...', technology: '...', solutions: '...', test: '...', contact: '...' },
    hero: { badge: '...', title1: '...', title2: '...', desc: '...', ctaPrimary: '...', ctaSecondary: '...', ticker: '...' },
    safety: { title: '...', subtitle: '...', card1Title: '...', card1Desc: '...', card2Title: '...', card2Desc: '...', card3Title: '...', card3Desc: '...' },
    features: { title: '...', subtitle: '...', f1: '...', f1Desc: '...', f1Badge: '...', f2: '...', f2Desc: '...', f2Badge: '...', f3: '...', f3Desc: '...', f3Badge: '...', f4: '...', f4Desc: '...', f4Badge: '...' },
    product: { title: '...', tabBasic: '...', tabPro: '...', basicDesc: '...', proDesc: '...', linkText: '...' },
    solutions: { title: '...', subtitle: '...', s1Title: '...', s1Desc: '...', s1Btn: '...', s2Title: '...', s2Desc: '...', s2Btn: '...' },
    portfolio: { title: '...', subtitle: '...', case1: '...', case2: '...', case3: '...', case4: '...', viewAll: '...' },
    footer: { address: '...', techContact: '...', rights: '...' },
    modal: {
      title: '...',
      desc: '...',
      typeLabel: '...',
      type1: '...',
      type2: '...',
      testNote: '...',
      nameLabel: '...',
      namePlace: '...',
      contactLabel: '...',
      contactPlace: '...',
      submitMail: '...',
      copy: '...',
      copied: '...',
      callNow: '...',
      shareKakao: '...',
      close: '...',
      tip: '...',
    },
  },
} as const;

// ---------------------------------------------------------
// 3) 타입 정의 (TS 안전성 확보)
// ---------------------------------------------------------
type Lang = keyof typeof translations;
type InquiryType = 'general' | 'test';

// ---------------------------------------------------------
// 4) 상수 (연락처/브랜드 등)
// ---------------------------------------------------------
const EMAIL_TO = 'vista94@gmail.com';
const TECH_PHONE = '01056507255'; // tel 링크용(하이픈 제거)
const SITE_TITLE = '베일리바이오웍스';

// ---------------------------------------------------------
// 5) 아이콘: 네이버 블로그 (lucide에 없어서 SVG로 직접)
// ---------------------------------------------------------
const NaverIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect width="24" height="24" rx="4" fill="currentColor" />
    <path d="M7 7V17H9.5L14.5 9.5V17H17V7H14.5L9.5 14.5V7H7Z" fill="white" />
  </svg>
);

// ---------------------------------------------------------
// 6) 문의 텍스트/메일to 생성 유틸
//    - 실제 메일 내용은 "한국어 템플릿"으로 통일(운영 편의)
// ---------------------------------------------------------
function buildInquiryText(t: (typeof translations)['ko'], inquiryType: InquiryType, name: string, contact: string) {
  const typeText = inquiryType === 'test' ? t.modal.type2 : t.modal.type1;
  return `문의 유형: ${typeText}\n회사명/성함: ${name}\n연락처: ${contact}\n\n(보내는 사람: 웹사이트 문의 폼)`;
}

function buildMailto(t: (typeof translations)['ko'], inquiryType: InquiryType, name: string, contact: string) {
  const subject = `[${SITE_TITLE}] ${inquiryType === 'test' ? '추출 테스트 신청' : '도입 문의'} - ${name}`;
  const body = buildInquiryText(t, inquiryType, name, contact);
  return `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// ---------------------------------------------------------
// 7) 바깥 클릭 감지 훅
//    - 메뉴/모달 등에서 바깥 클릭 시 닫기 구현용
//    - removeEventListener가 정확히 되도록 listener 함수를 동일 참조로 유지
// ---------------------------------------------------------
function useOnClickOutside(refs: React.RefObject<HTMLElement>[], handler: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      // refs 중 하나라도 target 포함하면 "바깥 클릭"이 아님
      for (const ref of refs) {
        const el = ref.current;
        if (el && el.contains(target)) return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener, { passive: true });

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [enabled, handler, refs]);
}

// =========================================================
// 8) 메인 페이지 컴포넌트
// =========================================================
export default function Page() {
  // ---------------------------------------------
  // (A) UI 상태들
  // ---------------------------------------------
  const [isScrolled, setIsScrolled] = useState(false);
  // 히어로 슬라이드 인덱스 (0,1)
  const [heroSlide, setHeroSlide] = useState(0);



  // 제품 탭: basic / pro
  const [activeTab, setActiveTab] = useState<'basic' | 'pro'>('basic');

  // 언어 메뉴
  const [lang, setLang] = useState<Lang>('ko');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  // 문의 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<InquiryType>('general');

  // 폼 데이터
  const [formData, setFormData] = useState({ name: '', contact: '' });

  // 복사 완료 표시
  const [copied, setCopied] = useState(false);

  // ---------------------------------------------
  // (B) 번역 선택 (lang 바뀌면 t 바뀜)
  // ---------------------------------------------
  const t = useMemo(() => translations[lang] ?? translations.ko, [lang]);

  // ---------------------------------------------
  // (C) ref들: 바깥 클릭, 포커스 등
  // ---------------------------------------------
  const langButtonRef = useRef<HTMLButtonElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const modalFirstFocusRef = useRef<HTMLInputElement>(null);

  // ---------------------------------------------
  // (D) 스크롤 감지: 네비 배경 변경
  // ---------------------------------------------
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 첫 렌더 시 상태 갱신
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 히어로 배경 5초마다 자동 슬라이드
useEffect(() => {
  const id = window.setInterval(() => {
    setHeroSlide((prev) => (prev + 1) % 2); // 0 <-> 1
  }, 7000);

  return () => window.clearInterval(id);
}, []);


  // ---------------------------------------------
  // (E) ESC로 모달/언어메뉴 닫기
  // ---------------------------------------------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (isModalOpen) closeModal();
      if (isLangMenuOpen) setIsLangMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isModalOpen, isLangMenuOpen]);

  // ---------------------------------------------
  // (F) 언어 메뉴 바깥 클릭 시 닫기
  // ---------------------------------------------
  useOnClickOutside([langButtonRef, langMenuRef], () => setIsLangMenuOpen(false), isLangMenuOpen);

  // ---------------------------------------------
  // (G) 모달 열릴 때: 포커스 + copied 초기화
  // ---------------------------------------------
  useEffect(() => {
    if (!isModalOpen) return;

    setCopied(false);

    // 모달이 DOM에 붙고 난 뒤 focus (안전하게 timeout)
    const id = window.setTimeout(() => {
      modalFirstFocusRef.current?.focus();
    }, 50);

    return () => window.clearTimeout(id);
  }, [isModalOpen]);

  // ---------------------------------------------
  // (H) 모달 열리면 body 스크롤 잠금
  // ---------------------------------------------
  useEffect(() => {
    if (!isModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isModalOpen]);

  // ---------------------------------------------
  // (I) 스크롤 이동 유틸
  // ---------------------------------------------
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  // ---------------------------------------------
  // (J) 모달 오픈: 문의 유형 지정
  // ---------------------------------------------
  const openModal = (type: InquiryType) => {
    setInquiryType(type);
    setIsModalOpen(true);
  };

  // ---------------------------------------------
  // (K) 모달 닫기: 폼 초기화 (원하시면 값 유지로 바꿀 수 있음)
  // ---------------------------------------------
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', contact: '' });
    setCopied(false);
  };

  // ---------------------------------------------
  // (L) 언어 변경
  // ---------------------------------------------
  const changeLanguage = (l: Lang) => {
    setLang(l);
    setIsLangMenuOpen(false);
  };

  // ---------------------------------------------
  // (M) 애니메이션 프리셋
  // ---------------------------------------------
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  // ---------------------------------------------
  // (N) 문의 텍스트: 복사/공유에 동일 사용
  //     운영 편의상 ko 템플릿으로 고정
  // ---------------------------------------------
  const inquiryText = useMemo(() => buildInquiryText(translations.ko, inquiryType, formData.name, formData.contact), [
    inquiryType,
    formData.name,
    formData.contact,
  ]);

  // ---------------------------------------------
  // (O) 메일 문의 제출: mailto 실행
  // ---------------------------------------------
  const handleMailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mailto는 사용자 환경에 따라 실패할 수 있으므로,
    // 아래의 "복사" 버튼도 함께 제공하여 전환율 보강
    window.location.href = buildMailto(translations.ko, inquiryType, formData.name, formData.contact);
  };

  // ---------------------------------------------
  // (P) 복사 버튼: clipboard API + 실패 시 prompt fallback
  // ---------------------------------------------
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inquiryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      window.prompt('복사해서 사용하세요:', inquiryText);
    }
  };

  // ---------------------------------------------
  // (Q) 공유 버튼: Web Share API 지원 시 공유 / 미지원이면 복사
  // ---------------------------------------------
  const handleShare = async () => {
    const shareData = { title: SITE_TITLE, text: inquiryText };

    try {
      // navigator.share는 일부 브라우저에서만 존재 (타입상 optional)
      if (typeof navigator !== 'undefined' && 'share' in navigator) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (navigator as any).share(shareData);
      } else {
        await handleCopy();
      }
    } catch {
      // 사용자가 공유 취소해도 에러로 들어올 수 있는데,
      // 전환 흐름에는 문제 없으므로 조용히 무시
    }
  };

  // ---------------------------------------------
  // (R) 포트폴리오 카드 데이터
  // ---------------------------------------------
  const portfolioItems = useMemo(
    () => [
      { src: '/portfolio_1.jpg', title: t.portfolio.case1 },
      { src: '/img_1522.jpg', title: t.portfolio.case2 },
      { src: '/img_9195.jpg', title: t.portfolio.case3 },
      { src: '/img_1538.jpg', title: t.portfolio.case4 },
    ],
    [t.portfolio.case1, t.portfolio.case2, t.portfolio.case3, t.portfolio.case4]
  );

  // ---------------------------------------------
  // (S) ✅ “View All” 버튼 기능:
  //     - 지금 목표: '도입 문의'로 연결(전환율)
  //     - 클릭 시 → 일반 문의 모달 오픈
  // ---------------------------------------------
  const handleViewAll = () => {
    openModal('general');
  };

  // =========================================================
  // 9) 렌더
  // =========================================================
  return (
    <div className={`min-h-screen bg-white text-slate-900 selection:bg-slate-200 ${lang === 'alien' ? 'font-mono' : 'font-sans'}`}>
      {/* -------------------------------------------------------
          0-1) 최상단 전광판 (Ticker)
          - framer-motion 대신 CSS 애니로 끊김 최소화
         ------------------------------------------------------- */}
      <div className="fixed top-0 left-0 right-0 h-10 bg-slate-100 z-50 flex items-center overflow-hidden border-b border-slate-200">
        <div className="ticker w-full">
          <div className="ticker__track text-slate-500 text-xs font-medium tracking-widest uppercase">
            <div className="ticker__item">{t.hero.ticker}</div>
            <div className="ticker__item">{t.hero.ticker}</div>
            <div className="ticker__item">{t.hero.ticker}</div>
            <div className="ticker__item">{t.hero.ticker}</div>
          </div>
        </div>
      </div>

      {/* ticker styles (페이지 내부 CSS) */}
      <style jsx>{`
        .ticker {
          position: relative;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
        }
        .ticker__track {
          display: inline-flex;
          gap: 3rem;
          will-change: transform;
          animation: tickerMove 28s linear infinite;
        }
        .ticker__item {
          display: inline-flex;
          align-items: center;
          gap: 3rem;
          padding-left: 3rem;
        }
        @keyframes tickerMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker__track {
            animation: none;
          }
        }
      `}</style>

      {/* -------------------------------------------------------
          0-2) 내비게이션 바
         ------------------------------------------------------- */}
      <nav
        className={`fixed top-10 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-3' : 'bg-transparent py-6'
        }`}
        aria-label="Primary"
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* 로고(맨 위로 이동) */}
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer text-left"
            onClick={() => scrollToSection('hero')}
            aria-label="Go to top"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors ${isScrolled ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
              B
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              베일리
              <span className={`font-normal ${isScrolled ? 'text-slate-500' : 'text-slate-300'}`}>바이오웍스</span>
            </span>
          </button>

          {/* 데스크탑 메뉴 */}
          <div className={`hidden lg:flex items-center space-x-8 text-sm font-semibold transition-colors ${isScrolled ? 'text-slate-600' : 'text-slate-300'}`}>
            <button onClick={() => scrollToSection('product')} className={`hover:text-opacity-80 transition-colors ${isScrolled ? 'hover:text-slate-900' : 'hover:text-white'}`}>
              {t.nav.products}
            </button>
            <button onClick={() => scrollToSection('safety')} className={`font-bold transition-colors ${isScrolled ? 'hover:text-blue-600' : 'hover:text-blue-300'}`}>
              {t.nav.safety}
            </button>
            <button onClick={() => scrollToSection('portfolio')} className={`hover:text-opacity-80 transition-colors ${isScrolled ? 'hover:text-slate-900' : 'hover:text-white'}`}>
              {t.nav.portfolio}
            </button>
            <button onClick={() => scrollToSection('features')} className={`hover:text-opacity-80 transition-colors ${isScrolled ? 'hover:text-slate-900' : 'hover:text-white'}`}>
              {t.nav.technology}
            </button>
            <button onClick={() => scrollToSection('solutions')} className={`hover:text-opacity-80 transition-colors ${isScrolled ? 'hover:text-slate-900' : 'hover:text-white'}`}>
              {t.nav.solutions}
            </button>

            {/* 추출 테스트(전환 버튼) */}
            <button
              onClick={() => openModal('test')}
              className={`font-bold flex items-center gap-1 transition-colors ${isScrolled ? 'text-purple-600 hover:text-purple-800' : 'text-purple-300 hover:text-purple-100'}`}
            >
              <Beaker size={16} /> {t.nav.test}
            </button>
          </div>

          {/* 우측 버튼들 */}
          <div className="flex items-center gap-4">
            {/* Language dropdown */}
            <div className="relative">
              <button
                ref={langButtonRef}
                type="button"
                onClick={() => setIsLangMenuOpen((v) => !v)}
                className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-slate-500 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/10'}`}
                aria-label="Change language"
                aria-haspopup="menu"
                aria-expanded={isLangMenuOpen}
              >
                <Globe size={20} />
              </button>

              {isLangMenuOpen && (
                <div
                  ref={langMenuRef}
                  className="absolute top-full right-0 mt-2 w-32 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden text-sm z-50"
                  role="menu"
                  aria-label="Language menu"
                >
                  <button onClick={() => changeLanguage('ko')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-900" role="menuitem">
                    한국어
                  </button>
                  <button onClick={() => changeLanguage('en')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-600" role="menuitem">
                    English
                  </button>
                  <button onClick={() => changeLanguage('alien')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-purple-600 font-mono" role="menuitem">
                    👽 Alien
                  </button>
                </div>
              )}
            </div>

            {/* 도입 문의(모달 오픈) */}
            <button
              onClick={() => openModal('general')}
              className={`hidden md:flex items-center gap-1 px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shadow-lg ${
                isScrolled ? 'bg-slate-900 hover:bg-slate-800 text-white' : 'bg-white hover:bg-slate-100 text-slate-900'
              }`}
            >
              <span>{t.nav.contact}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* -------------------------------------------------------
          1) 히어로 섹션
          - next/image + priority로 LCP 최적화
         ------------------------------------------------------- */}
      <section
  id="hero"
  className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 pb-20"
>
  {/* 배경 슬라이드 레이어 */}
  <div className="absolute inset-0 z-0">
    {/* 1번 이미지 */}
    <img
      src="/img_0319.jpg"
      alt="Hero background 1"
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
        heroSlide === 0 ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ filter: 'brightness(1.15) contrast(1.05)' }}
    />

    {/* 2번 이미지 (아이소매트릭) */}
    <img
      src="/b2bbbw.png"
      alt="Hero background 2"
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
        heroSlide === 1 ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ filter: 'brightness(1.15) contrast(1.05)' }}
    />

    {/* 글씨 가독성용 오버레이 (너무 어둡지 않게 25%) */}
    <div className="absolute inset-0 bg-black/70" />
  </div>

  {/* 텍스트/버튼 레이어 */}
  <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
      {t.hero.title1}
      <br />
      <span className="text-slate-200">{t.hero.title2}</span>
    </h1>

    <p className="text-white/90 text-lg max-w-2xl mb-10 whitespace-pre-line">
      {t.hero.desc}
    </p>

    <div className="flex gap-4">
      <button
        className="px-8 py-4 bg-blue-600 text-white rounded-full"
        onClick={() => openModal('general')}
      >
        {t.hero.ctaPrimary}
      </button>
      <button
        className="px-8 py-4 bg-white/10 border border-white/30 text-white rounded-full"
        onClick={() => scrollToSection('features')}
      >
        {t.hero.ctaSecondary}
      </button>
    </div>
  </div>
</section>




      {/* -------------------------------------------------------
          2) 제품 라인업 (탭)
         ------------------------------------------------------- */}
      <section id="product" className="py-32 bg-[#F5F5F7]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-8 text-slate-900">{t.product.title}</h2>

            {/* 탭 버튼 */}
            <div className="inline-flex p-1 bg-slate-200/80 rounded-full">
              <button
                onClick={() => setActiveTab('basic')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'basic' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {t.product.tabBasic}
              </button>
              <button
                onClick={() => setActiveTab('pro')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'pro' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {t.product.tabPro}
              </button>
            </div>
          </div>

          {/* 탭 내용 카드 */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row max-w-6xl mx-auto"
          >
            {/* 텍스트 영역 */}
            <div className="flex-1 p-12 md:p-20 flex flex-col justify-center">
              <span className="text-blue-600 font-bold tracking-wide text-xs mb-4 uppercase">{activeTab === 'basic' ? 'Standard Series' : 'Professional Series'}</span>
              <h3 className="text-4xl font-bold mb-6 text-slate-900">{activeTab === 'basic' ? t.product.tabBasic : t.product.tabPro}</h3>
              <p className="text-slate-500 text-lg leading-relaxed mb-10">{activeTab === 'basic' ? t.product.basicDesc : t.product.proDesc}</p>

              <ul className="space-y-4">
                {activeTab === 'basic' ? (
                  <>
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <Droplets size={20} className="text-blue-500" /> 안개분사 시스템
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <Shield size={20} className="text-blue-500" /> CIP 자동 살균
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <Snowflake size={20} className="text-blue-500" /> 완전 밀폐 냉장
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <Scale size={20} className="text-slate-900" /> 스마트 프로파일 관리
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <Wifi size={20} className="text-slate-900" /> IoT 실시간 모니터링
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <Sliders size={20} className="text-slate-900" /> 다변수 정밀 제어
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* 이미지 영역 */}
            <div className="flex-1 bg-slate-50 relative min-h-[420px] flex items-center justify-center p-10">
              <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative w-full h-[380px]">
                <Image src="/img_0402.jpg" alt="Product machine" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'contain' }} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* -------------------------------------------------------
          3) 위생 및 안전
         ------------------------------------------------------- */}
      <section id="safety" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6">
              <ClipboardCheck size={14} /> HACCP COMPLIANCE READY
            </div>
            <h2 className="text-4xl font-bold mb-6 text-slate-900">{t.safety.title}</h2>
            <p className="text-slate-500 whitespace-pre-line text-lg">{t.safety.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: t.safety.card1Title, desc: t.safety.card1Desc, color: 'text-blue-600', bg: 'bg-blue-50' },
              // ✅ 주의: 원래 Microscope였는데 import가 없으니 ClipboardCheck로 대체(배포 에러 방지)
              { icon: ClipboardCheck, title: t.safety.card2Title, desc: t.safety.card2Desc, color: 'text-green-600', bg: 'bg-green-50' },
              { icon: Droplets, title: t.safety.card3Title, desc: t.safety.card3Desc, color: 'text-cyan-600', bg: 'bg-cyan-50' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-10 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-16 h-16 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-8`}>
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed whitespace-pre-line">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------
          3.5) 포트폴리오
          ✅ “View All” 버튼 → 도입 문의 모달 오픈(핵심 변경)
         ------------------------------------------------------- */}
      <section id="portfolio" className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold mb-6 text-slate-900">{t.portfolio.title}</h2>
              <p className="text-slate-500 whitespace-pre-line text-lg">{t.portfolio.subtitle}</p>
            </div>

            {/* ✅ 변경: “전체 사례 보기” = 문의(도입)로 연결 */}
            <button
              type="button"
              className="hidden md:flex items-center gap-2 text-slate-900 font-semibold hover:text-blue-600 transition-colors mt-6 md:mt-0"
              onClick={handleViewAll}
              aria-label="Open inquiry (view all cases)"
              title="전체 사례는 상담 시 안내드립니다"
            >
              {t.portfolio.viewAll} <ArrowRight size={18} />
            </button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {portfolioItems.map((item, idx) => (
              <motion.button
                key={idx}
                type="button"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group relative aspect-[4/5] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-left"
                // 카드 클릭도 문의 모달 오픈 (전환율)
                onClick={() => openModal('general')}
                aria-label={`Open inquiry - ${item.title}`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-white/80 text-xs font-bold tracking-wider mb-2 block uppercase">Case 0{idx + 1}</span>
                  <h4 className="text-white font-bold text-lg leading-tight">{item.title}</h4>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------
          4) 핵심 기술
         ------------------------------------------------------- */}
      <section id="features" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6 text-slate-900">{t.features.title}</h2>
            <p className="text-slate-500 whitespace-pre-line text-lg">{t.features.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: t.features.f1, desc: t.features.f1Desc, badge: t.features.f1Badge, icon: Sliders },
              { title: t.features.f2, desc: t.features.f2Desc, badge: t.features.f2Badge, icon: Zap },
              { title: t.features.f3, desc: t.features.f3Desc, badge: t.features.f3Badge, icon: Lock },
              { title: t.features.f4, desc: t.features.f4Desc, badge: t.features.f4Badge, icon: Wifi },
            ].map((feat, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
                    <feat.icon size={28} />
                  </div>
                  <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">{feat.badge}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feat.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------
          5) 솔루션 (비즈니스 패키지)
         ------------------------------------------------------- */}
      <section id="solutions" className="py-32 bg-[#F5F5F7]">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6 text-slate-900">{t.solutions.title}</h2>
            <p className="text-slate-500 text-lg">{t.solutions.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Cafe Starter */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-white shadow-xl flex flex-col items-center text-center border border-slate-100 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-8">
                <CoffeeIcon />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.solutions.s1Title}</h3>
              <p className="text-slate-500 mb-8 whitespace-pre-line">{t.solutions.s1Desc}</p>
              <button
                onClick={() => openModal('general')}
                className="w-full py-4 rounded-xl border-2 border-slate-100 text-slate-900 font-bold hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                {t.solutions.s1Btn}
              </button>
            </motion.div>

            {/* Factory Lab */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 border border-slate-600"
            >
              <div className="w-20 h-20 bg-slate-800 text-slate-300 border border-slate-600 rounded-full flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <Factory size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-md">{t.solutions.s2Title}</h3>
              <p className="text-slate-300 mb-8 whitespace-pre-line">{t.solutions.s2Desc}</p>
              <button
                onClick={() => openModal('general')}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-slate-700 to-slate-600 text-white font-bold hover:from-slate-600 hover:to-slate-500 transition-all border border-slate-500 shadow-lg"
              >
                {t.solutions.s2Btn}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------
          6) 푸터(contact)
         ------------------------------------------------------- */}
      <footer id="contact" className="bg-white border-t border-slate-100 py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-end">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter text-slate-900">
              베일리<span className="text-slate-400">바이오웍스</span>
            </h2>

            <div className="text-slate-500 text-sm font-medium">
              <p>{t.footer.address}</p>
              <p className="flex items-center gap-2">
                <Phone size={14} /> {t.footer.techContact}
              </p>
              <p className="flex items-center gap-2">
                Email:{' '}
                <a href={`mailto:${EMAIL_TO}`} className="hover:text-blue-600 transition-colors">
                  {EMAIL_TO}
                </a>
              </p>

              {/* 문의/전화 CTA (전환율) */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${TECH_PHONE}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
                >
                  <Phone size={18} /> {t.modal.callNow}
                </a>
                <button
                  type="button"
                  onClick={() => openModal('general')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-900 font-bold hover:border-blue-600 hover:text-blue-600 transition-colors"
                >
                  <Mail size={18} /> {t.nav.contact}
                </button>
              </div>

              <p className="mt-6 text-slate-400 text-xs">{t.footer.rights}</p>
            </div>
          </div>

          {/* SNS 아이콘 (실제 링크 생기면 href 바꾸면 됨) */}
          <div className="flex md:justify-end gap-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-pink-100 hover:text-pink-600 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-600 transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-green-100 hover:text-green-600 transition-colors"
              aria-label="Naver Blog"
            >
              <NaverIcon size={18} />
            </a>
          </div>
        </div>
      </footer>

      {/* -------------------------------------------------------
          7) 문의 모달
          - overlay 클릭/ESC 닫기
          - 포커스/스크롤 잠금
          - CTA 3종 (메일/복사/공유) + 전화
         ------------------------------------------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={t.modal.title}>
          {/* Overlay: 버튼으로 만들어 접근성 & 클릭 닫기 */}
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            aria-label="Close dialog"
          />

          {/* Panel */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-white rounded-3xl p-10 w-full max-w-lg shadow-2xl z-10"
          >
            {/* 닫기 버튼 */}
            <button onClick={closeModal} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900" aria-label={t.modal.close}>
              <X size={24} />
            </button>

            {/* 문의 폼 */}
            <form onSubmit={handleMailSubmit} className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.modal.title}</h3>
                <p className="text-slate-500 text-sm">{t.modal.desc}</p>
              </div>

              {/* 문의 유형 토글 */}
              <div className="p-1 bg-slate-100 rounded-lg flex text-sm font-medium" aria-label={t.modal.typeLabel}>
                <button
                  type="button"
                  onClick={() => setInquiryType('general')}
                  className={`flex-1 py-2 rounded-md transition-all ${inquiryType === 'general' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                >
                  {t.modal.type1}
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryType('test')}
                  className={`flex-1 py-2 rounded-md transition-all ${inquiryType === 'test' ? 'bg-white text-purple-700 shadow-sm font-bold' : 'text-slate-500'}`}
                >
                  {t.modal.type2}
                </button>
              </div>

              {/* 추출 테스트 안내 */}
              {inquiryType === 'test' && (
                <div className="p-4 bg-purple-50 text-purple-700 text-sm rounded-xl border border-purple-100 flex items-start gap-3">
                  <Beaker className="shrink-0 mt-0.5" size={18} />
                  <span>{t.modal.testNote}</span>
                </div>
              )}

              {/* 이름 */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">{t.modal.nameLabel}</label>
                <input
                  ref={modalFirstFocusRef}
                  required
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder={t.modal.namePlace}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* 연락처 */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">{t.modal.contactLabel}</label>
                <input
                  required
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder={t.modal.contactPlace}
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                />
              </div>

              {/* CTA 1: 메일 + 복사 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Mail size={18} /> {t.modal.submitMail}
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full border-2 border-slate-200 hover:border-blue-600 text-slate-900 hover:text-blue-600 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <ClipboardCheck size={18} /> {copied ? t.modal.copied : t.modal.copy}
                </button>
              </div>

              {/* CTA 2: 전화 + 공유 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${TECH_PHONE}`}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Phone size={18} /> {t.modal.callNow}
                </a>
                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full bg-white text-slate-900 border-2 border-slate-200 hover:border-slate-300 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <ArrowRight size={18} /> {t.modal.shareKakao}
                </button>
              </div>

              <p className="text-xs text-slate-500">{t.modal.tip}</p>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

/**
 * ---------------------------------------------------------
 * 10) 커피 아이콘 (lucide Coffee를 안 쓰고 커스텀으로 유지)
 *     - import 추가 없이 사용 가능
 * ---------------------------------------------------------
 */
function CoffeeIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-current" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 8h10v6a5 5 0 0 1-5 5H9a3 3 0 0 1-3-3V8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 10h2a2 2 0 0 1 0 4h-2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M6 22h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
