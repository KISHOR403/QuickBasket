import type { Config } from 'tailwindcss';
import sharedPreset from '@quickbasket/config/tailwind';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [sharedPreset],
  theme: {
    extend: {
      colors: {
        admin: {
          bg: '#fbfaf7',
          surface: '#ffffff',
          sidebar: '#0d1812',
          sidebarHover: '#16251d',
          sidebarActive: '#1f3328',
          border: '#e7e5df',
          subtle: '#8c948e',
        },
      },
    },
  },
};

export default config;
