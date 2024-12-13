import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/functions": {
        target: "https://us-central1-ecommerce-2d416.cloudfunctions.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/functions/, ""),
      },
    },
  },
});
