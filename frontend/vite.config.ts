import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '#root': path.resolve(__dirname, './src'),
      '#styled-system': path.resolve(__dirname, './styled-system'),
    }
  }
})
