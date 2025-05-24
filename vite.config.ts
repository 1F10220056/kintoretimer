// src/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import manifest from './public/manifest.json'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest,
      workbox: { globPatterns: ['**/*.{js,css,html,png,svg}'] },
    }),
  ],
})