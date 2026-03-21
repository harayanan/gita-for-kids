import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://gita-for-kids.vercel.app',
  integrations: [
    react(),
    tailwind(),
  ],
});
