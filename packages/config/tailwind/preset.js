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
        header: {
          DEFAULT: '#0E6B3A',
          dark: '#0A5A30',
        },
        leaf: {
          DEFAULT: '#17A44C',
          light: '#EBF8F0',
        },
        mango: {
          DEFAULT: '#F5A623',
          hover: '#E09010',
          light: '#FFF5E6',
        },
        brand: {
          DEFAULT: '#D4A017',
          light: '#F0D97C',
        },
        beet: {
          DEFAULT: '#8A2D5B',
          light: '#F8E8F0',
        },
        sage: {
          DEFAULT: '#E8F5E9',
          dark: '#C8E6C9',
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
        // Design-system families: `sans` for body copy, `display` for headings.
        sans: ['var(--font-satoshi)', 'Satoshi', 'Noto Sans', 'sans-serif'],
        display: ['var(--font-clash)', 'Clash Display', 'sans-serif'],
        mono: ['var(--font-space)', 'Space Grotesk', 'monospace'],
        indic: ['var(--font-noto)', 'Noto Sans', 'sans-serif'],
        // Back-compat aliases for the pre-design-system class names.
        heading: ['var(--font-clash)', 'Clash Display', 'sans-serif'],
        body: ['var(--font-satoshi)', 'Satoshi', 'Noto Sans', 'sans-serif'],
      },
      boxShadow: {
        pill: '0 4px 14px 0 rgba(14, 124, 74, 0.25)',
        card: '0 1px 2px 0 rgba(20, 35, 27, 0.04), 0 4px 16px -6px rgba(20, 35, 27, 0.08)',
        float: '0 12px 40px -8px rgba(20, 35, 27, 0.18)',
        glow: '0 0 0 1px rgba(14, 124, 74, 0.08), 0 8px 30px -6px rgba(14, 124, 74, 0.22)',
      },
      transitionTimingFunction: {
        // Expo-out: fast start, gentle settle. The house easing for arrivals.
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        pulseFast: 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        slideUp: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        slideInRight: 'slideInRight 0.34s cubic-bezier(0.16, 1, 0.3, 1)',
        fadeIn: 'fadeIn 0.3s ease-out both',
        fadeInUp: 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        scaleIn: 'scaleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        shimmer: 'shimmer 1.5s ease-in-out infinite',
        livePulse: 'livePulse 1.8s ease-in-out infinite',
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
          '0%': { opacity: '0', transform: 'translateY(14px)' },
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
      },
    },
  },
  plugins: [],
};
