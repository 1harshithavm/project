// frontend/vite.config.js
// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
// Example: Fetching products from backend
fetch("http://localhost:5000/api/products")
  .then(res => res.json())
  .then(data => console.log(data));
  