/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background Colors (모바일 앱 스타일)
        'bg-base': '#F0F9F5',      // 연한 민트 배경 (전체)
        'bg-card': '#FFFFFF',      // 카드 배경
        'light-bg': '#F0F9F5',     // bg-base와 동일 (하위 호환)
        'light-card': '#FFFFFF',
        'light-card-hover': '#F3F4F6',
        'light-border': '#E5E7EB',

        // Text Colors
        'text-primary': '#1F2937',  // 약간 더 진한 텍스트
        'text-secondary': '#6B7280',
        'text-tertiary': '#9CA3AF',

        // Primary Brand Colors
        'primary': '#10B981',       // 메인 초록
        'primary-dark': '#059669',  // 진한 초록
        'primary-light': '#D1FAE5', // 연한 초록

        'secondary': '#3B82F6',     // 파란색
        'secondary-dark': '#2563EB',
        'secondary-light': '#DBEAFE',

        // Semantic Colors (의미있는 컬러)
        'danger': '#EF4444',        // 위험, 타이머 운동 구간
        'info': '#3B82F6',          // 정보, 타이머 휴식 구간
        'warning': '#F59E0B',       // 경고, PR 알림
        'success': '#10B981',       // 성공, 완료

        // Legacy Accent Colors (차트용)
        'accent-green': '#10B981',
        'accent-blue': '#3B82F6',
        'accent-purple': '#8B5CF6',
        'accent-orange': '#F59E0B',
        'accent-red': '#EF4444',
        'accent-pink': '#EC4899',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'float': '0 10px 25px -5px rgba(0, 0, 0, 0.15)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
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
