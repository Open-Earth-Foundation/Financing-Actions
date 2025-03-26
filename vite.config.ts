
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['130606fa-cfac-4cca-8a32-f1be400c9fa2-00-3768eg0cfofcq.picard.replit.dev']
  }
})
