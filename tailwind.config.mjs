/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#EDF2FB',
          100: '#D7E2F5',
          200: '#B0C5EB',
          300: '#88A8E0',
          400: '#608BD6',
          500: '#386ECC',
          600: '#1A4FA8',
          700: '#143C7E',
          800: '#0E2953',
          900: '#0A1E40',
          950: '#06122B',
        },
        accent: {
          50:  '#FFF4E8',
          100: '#FFE5C7',
          200: '#FFCA8F',
          300: '#FFAF57',
          400: '#FF9520',
          500: '#FF7A00',
          600: '#E66A00',
          700: '#B35300',
          800: '#803C00',
          900: '#4D2500',
          950: '#261300',
        },
        dark: {
          50:  '#F0F4FB',
          100: '#DCE4F5',
          200: '#BCCBEB',
          300: '#8FA7DB',
          400: '#5A7EC3',
          500: '#1A4FA8',
          600: '#143C7E',
          700: '#0E2953',
          800: '#0A1E40',
          900: '#06122B',
          950: '#030A1A',
        },
        whatsapp: {
          500: '#25D366',
          600: '#1FB958',
          700: '#1A9A4A',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Montserrat', 'Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}