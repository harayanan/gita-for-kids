/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        saffron: '#C75B12',
        indigo: '#2D3A87',
        cream: '#FDF6E3',
        forest: '#1A6847',
        terracotta: '#B85C3A',
        gold: '#C4A24E',
        'cream-dark': '#F5ECD3',
      },
      fontFamily: {
        devanagari: ['"Noto Serif Devanagari"', 'serif'],
        body: ['"Source Serif 4"', 'Georgia', 'serif'],
        ui: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        reading: '720px',
      },
    },
  },
  plugins: [],
};
