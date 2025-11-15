/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Mode Colors
        'dark-bg': '#0a0a0a',
        'dark-card': '#141414',
        'dark-card-hover': '#1a1a1a',

        // Neon & Vivid Colors
        'neon-pink': '#ff006e',
        'neon-magenta': '#f72585',
        'neon-blue': '#4cc9f0',
        'neon-cyan': '#4361ee',
        'neon-green': '#06ffa5',
        'neon-lime': '#7df9ff',
        'neon-orange': '#ff6b35',
        'neon-red': '#ef476f',
        'neon-purple': '#b5179e',
        'neon-yellow': '#ffd60a',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'glow-pink': '0 0 20px rgba(255, 0, 110, 0.5)',
        'glow-blue': '0 0 20px rgba(76, 201, 240, 0.5)',
        'glow-green': '0 0 20px rgba(6, 255, 165, 0.5)',
        'glow-orange': '0 0 20px rgba(255, 107, 53, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
