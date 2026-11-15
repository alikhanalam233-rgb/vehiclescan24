/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFFBEB',
          100: '#FFF5C2',
          200: '#FFEB85',
          300: '#FFE033',
          400: '#FFD400',
          500: '#FFC800',
          600: '#E6B400',
          700: '#B88F00',
          800: '#7A5E00',
          900: '#4D3B00',
        },
        ink: {
          50: '#F7F7F5',
          100: '#EFEFEC',
          200: '#DCDCD8',
          300: '#B9B9B4',
          400: '#8E8E89',
          500: '#6B6B66',
          600: '#55554F',
          700: '#3D3D39',
          800: '#262624',
          900: '#111111',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,200,0,0.45), 0 12px 32px -12px rgba(255,200,0,0.6)',
        card: '0 1px 2px 0 rgba(17,17,17,0.04), 0 16px 40px -20px rgba(17,17,17,0.18)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both',
        'scan-line': 'scan-line 2.4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};
