import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://walletwebapplication.nguvutech.com/api',
        changeOrigin: true,
        secure: true, // Si vous utilisez HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
