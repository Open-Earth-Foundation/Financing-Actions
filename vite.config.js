import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173, // Change Vite port to 5173 (default Vite port)
    strictPort: true,
    proxy: {
      // Proxy API requests to the Express server
      '/api': {
        target: 'http://localhost:3000', // Express server
        changeOrigin: true,
        secure: false
      }
    }
  },
  preview: {
    host: true,
    port: 5173 // Match the development port
  }
});