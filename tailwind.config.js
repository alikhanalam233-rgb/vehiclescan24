/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EEF3FA',
          100: '#D6E2F2',
          200: '#AFC4E3',
          300: '#7F9FCD',
          400: '#4F77AE',
          500: '#305889',
          600: '#22466F',
          700: '#183456',
          800: '#10233F',
          900: '#0B1A33',
          950: '#060F1F',
        },
        electric: {
          50: '#EBF6FF',
          100: '#CDEBFF',
          200: '#9ED8FF',
          300: '#62C0FF',
          400: '#2EA6FF',
          500: '#0A8DFF',
          600: '#0072E6',
          700: '#005BBA',
          800: '#024A93',
          900: '#073D78',
          950: '#04264C',
        },
        steel: {
          50: '#F5F7FA',
          100: '#E9EDF3',
          200: '#D3DAE4',
          300: '#B2BDCC',
          400: '#8795A9',
          500: '#66768E',
          600: '#4F5D73',
          700: '#3B475A',
          800: '#27303E',
          900: '#161C27',
          950: '#0A0D14',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(10,141,255,0.35), 0 12px 40px -12px rgba(10,141,255,0.55)',
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 48px -24px rgba(0,0,0,0.6)',
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
