import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Relative asset paths so the build works under a GitHub Pages sub-path.
  base: './',
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        wellness: resolve(rootDir, 'wellness.html'),
        volunteer: resolve(rootDir, 'volunteer.html'),
        community: resolve(rootDir, 'community.html'),
        contact: resolve(rootDir, 'contact.html'),
        coaches: resolve(rootDir, 'coaches.html'),
        blog: resolve(rootDir, 'blog.html'),
        ebook: resolve(rootDir, 'ebook.html'),
      },
    },
  },
});
