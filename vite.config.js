import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permet les connexions externes
    port: 5173, // Assurez-vous que le port est le même que celui que vous utilisez
  },
})