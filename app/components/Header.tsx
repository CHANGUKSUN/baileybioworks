"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 메뉴 항목들 (원하시는 대로 수정 가능)
  const menuItems = [
    { name: "제품 소개", href: "#" },
    { name: "위생 솔루션", href: "#" },
    { name: "납품 실적", href: "#" },
    { name: "핵심 기술", href: "#" },
    { name: "사업별 솔루션", href: "#" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 1. 로고 */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-bold text-xl text-gray-900 flex items-center">
              <span className="bg-black text-white px-2 py-1 rounded mr-2 text-sm">B</span>
              베일리바이오웍스
            </Link>
          </div>

          {/* 2. PC 버전 메뉴 (모바일엔 안 보임) */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* 3. 모바일 햄버거 버튼 (PC엔 안 보임) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-black focus:outline-none p-2"
            >
              {isMenuOpen ? (
                // 닫기 아이콘 (X)
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // 햄버거 아이콘 (3줄)
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4. 모바일 메뉴 드롭다운 (버튼 눌렀을 때만 보임) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t absolute w-full left-0 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-3 py-4 rounded-md text-base font-medium border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)} // 메뉴 누르면 닫히게
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}