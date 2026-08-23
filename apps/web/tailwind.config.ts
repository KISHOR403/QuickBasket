import type { Config } from 'tailwindcss';
import sharedPreset from '@quickbasket/config/tailwind';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [sharedPreset],
};

export default config;
