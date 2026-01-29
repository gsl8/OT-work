import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:5000',
      '/cars': 'http://localhost:5000',
      '/services': 'http://localhost:5000',
      '/servicerecords': 'http://localhost:5000',
      '/payments': 'http://localhost:5000',
      '/bills': 'http://localhost:5000',
      '/reports': 'http://localhost:5000'
    }
  }
})
