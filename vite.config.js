import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Use 0.0.0.0 instead of true for better Replit compatibility
    port: 3000, // Use port 3000 to match Replit's default
    hmr: {
      clientPort: 443, // Required for Replit
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 3000
  }
});