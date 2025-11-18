/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background Colors (옅은 초록 톤)
        'bg-base': '#D7E9D0',         // 전체 배경 (옅은 초록)
        'bg-card': '#EFF7EE',         // 카드 배경 (거의 흰색에 가까운 옅은 초록)
        'light-bg': '#D7E9D0',        // bg-base와 동일 (하위 호환)
        'light-card': '#EFF7EE',
        'light-card-hover': '#E5F3E3',
        'light-border': '#C5DFC0',

        // Text Colors (진한 검정)
        'text-primary': '#010400',    // 메인 텍스트 (거의 검정)
        'text-secondary': '#2C3E2A',  // 보조 텍스트
        'text-tertiary': '#5A6C57',   // 삼차 텍스트

        // Primary Brand Colors (초록 톤)
        'primary': '#409B60',         // 메인 초록
        'primary-dark': '#1F332A',    // 강조 짙은 초록
        'primary-light': '#A8D5BA',   // 연한 초록

        'secondary': '#3B7A56',       // 보조 초록
        'secondary-dark': '#2A5840',
        'secondary-light': '#B8D9C8',

        // Semantic Colors
        'danger': '#D64545',          // 위험, 타이머 운동 구간
        'info': '#4A90A4',            // 정보
        'warning': '#E6A23C',         // 경고, PR 알림
        'success': '#409B60',         // 성공, 완료 (primary와 동일)

        // Legacy Accent Colors (차트용 - 초록 톤 조정)
        'accent-green': '#409B60',
        'accent-blue': '#4A90A4',
        'accent-purple': '#7B8BA3',
        'accent-orange': '#E6A23C',
        'accent-red': '#D64545',
        'accent-pink': '#C98B9E',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(31, 51, 42, 0.05)',
        'card': '0 1px 3px 0 rgba(31, 51, 42, 0.1), 0 1px 2px 0 rgba(31, 51, 42, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(31, 51, 42, 0.1), 0 2px 4px -1px rgba(31, 51, 42, 0.06)',
        'card-lg': '0 10px 15px -3px rgba(31, 51, 42, 0.1), 0 4px 6px -2px rgba(31, 51, 42, 0.05)',
        'float': '0 10px 25px -5px rgba(31, 51, 42, 0.15)',
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        // 모바일 친화적 폰트 크기
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px (본문)
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px (제목)
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
        '5xl': ['3rem', { lineHeight: '1' }],           // 48px (타이머 숫자)
        '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }],         // 72px (메인 타이머)
      },
      spacing: {
        // 터치 영역 최소 크기
        'touch': '44px',  // iOS 권장 최소 터치 영역
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [],
}
