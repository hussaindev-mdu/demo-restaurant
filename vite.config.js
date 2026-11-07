import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative base so the build works at a domain root and under a subpath (e.g. GitHub Pages /repo-name/)
  base: './',
  plugins: [react()],
})
