import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175, // Cổng mặc định của Vite
    host: '0.0.0.0' // Cho phép truy cập từ bên ngoài container
  },
})
