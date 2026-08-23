/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#14231B',
          50: '#F4F7F5',
          100: '#E4EBE6',
          200: '#C5D7CB',
          300: '#9FBFA9',
          400: '#6B9A7A',
          500: '#3D734E',
          600: '#2A5537',
          700: '#1E3D27',
          800: '#14231B',
          900: '#0A120E',
        },
        basil: {
          DEFAULT: '#0E7C4A',
          hover: '#0B653C',
          light: '#E7F5EE',
          dark: '#084F2F',
        },
        leaf: {
          DEFAULT: '#17A44C',
          light: '#EBF8F0',
        },
        mango: {
          DEFAULT: '#FF9E2C',
          hover: '#E58816',
          light: '#FFF5E6',
        },
        beet: {
          DEFAULT: '#8A2D5B',
          light: '#F8E8F0',
        },
        paper: '#FCFCFA',
        mist: '#EEF1EC',
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F6F8F5',
        },
      },
      borderRadius: {
        card: '16px',
        input: '12px',
        pill: '9999px',
        badge: '8px',
      },
      fontFamily: {
        heading: ['var(--font-clash)', 'Clash Display', 'sans-serif'],
        body: ['var(--font-satoshi)', 'Satoshi', 'Noto Sans', 'sans-serif'],
        mono: ['var(--font-space)', 'Space Grotesk', 'monospace'],
        indic: ['var(--font-noto)', 'Noto Sans', 'sans-serif'],
      },
      boxShadow: {
        pill: '0 4px 14px 0 rgba(14, 124, 74, 0.25)',
        card: '0 2px 10px 0 rgba(20, 35, 27, 0.04)',
        float: '0 12px 32px 0 rgba(20, 35, 27, 0.12)',
      },
      animation: {
        pulseFast: 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        slideUp: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
