import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Required for ngrok to tunnel to your local port
    allowedHosts: [
      'localhost',
      'hiram-daughterless-veridically.ngrok-free.dev' // Just the hostname, no https://
    ]
  }
})