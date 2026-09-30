/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0f1a14',
          50: '#f5f7f6',
          100: '#e6ebe8',
          200: '#c5d1ca',
          300: '#96b0a2',
          400: '#5e8671',
          500: '#3a6b4e',
          600: '#275438',
          700: '#1b3d27',
          800: '#0f1a14',
          900: '#080d0a',
        },
        basil: {
          DEFAULT: '#1a6b42',
          hover: '#145a37',
          light: '#edf7f1',
          dark: '#0d4a2d',
        },
        header: {
          DEFAULT: '#0f1a14',
          dark: '#0a120e',
        },
        leaf: {
          DEFAULT: '#22a855',
          light: '#edf8f1',
        },
        mango: {
          DEFAULT: '#f0a020',
          hover: '#d88e14',
          light: '#fef6e6',
        },
        brand: {
          DEFAULT: '#c89a18',
          light: '#eedC7c',
        },
        beet: {
          DEFAULT: '#7a2650',
          light: '#f7e7ef',
        },
        sage: {
          DEFAULT: '#e8f5e9',
          dark: '#c8e6c9',
        },
        paper: '#faf9f6',
        cream: '#f5f3ee',
        mist: '#eae8e3',
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f7f6f2',
        },
      },
      borderRadius: {
        card: '20px',
        input: '14px',
        pill: '9999px',
        badge: '8px',
      },
      fontFamily: {
        sans: ['var(--font-satoshi)', 'Satoshi', 'Noto Sans', 'system-ui', 'sans-serif'],
        display: ['var(--font-clash)', 'Clash Display', 'sans-serif'],
        mono: ['var(--font-space)', 'Space Grotesk', 'monospace'],
        indic: ['var(--font-noto)', 'Noto Sans', 'sans-serif'],
        heading: ['var(--font-clash)', 'Clash Display', 'sans-serif'],
        body: ['var(--font-satoshi)', 'Satoshi', 'Noto Sans', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 6vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['clamp(1.125rem, 2vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
      },
      boxShadow: {
        pill: '0 4px 14px 0 rgba(26, 107, 66, 0.18)',
        card: '0 1px 2px 0 rgba(15, 26, 20, 0.03)',
        float: '0 16px 48px -12px rgba(15, 26, 20, 0.12)',
        glow: '0 0 0 1px rgba(26, 107, 66, 0.06), 0 8px 30px -6px rgba(26, 107, 66, 0.15)',
        editorial: '0 24px 80px -16px rgba(15, 26, 20, 0.08)',
        glass: '0 8px 32px 0 rgba(15, 26, 20, 0.06)',
        inner: 'inset 0 1px 2px rgba(15, 26, 20, 0.06)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        expo: 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      animation: {
        pulseFast: 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        slideUp: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        slideInRight: 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        fadeIn: 'fadeIn 0.4s ease-out both',
        fadeInUp: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        scaleIn: 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        shimmer: 'shimmer 1.5s ease-in-out infinite',
        livePulse: 'livePulse 1.8s ease-in-out infinite',
        float: 'floatY 6s ease-in-out infinite',
        countUp: 'countUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
        reveal: 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '150% 0' },
          '100%': { backgroundPosition: '-150% 0' },
        },
        livePulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.35', transform: 'scale(0.7)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        countUp: {
          '0%': { transform: 'translateY(6px) scale(0.9)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
