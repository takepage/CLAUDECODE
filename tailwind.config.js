/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode Colors
        'light-bg': '#F9FAFB',
        'light-card': '#FFFFFF',
        'light-card-hover': '#F3F4F6',
        'light-border': '#E5E7EB',

        // Text Colors
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        'text-tertiary': '#9CA3AF',

        // Primary Brand Colors (포인트 컬러)
        'primary': '#10B981',      // 녹색 (메인)
        'primary-dark': '#059669',
        'primary-light': '#D1FAE5',

        'secondary': '#3B82F6',    // 파란색 (서브)
        'secondary-dark': '#2563EB',
        'secondary-light': '#DBEAFE',

        // Accent Colors (차트/데이터용)
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
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
