import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    watch: {
      usePolling: true
    },
  },
  resolve: {
    alias: {
      "react-dnd": "react-dnd",
      "react-dnd-html5-backend": "react-dnd-html5-backend",
    },
  }
})