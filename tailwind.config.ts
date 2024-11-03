import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: '#00579d',
        'blue-light': '#0068bd',
        orange: '#EF8300',
        green: '#7EB61C',
        yellow: '#FFD600',
        red: '#D60000',
        black: '#000000',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
