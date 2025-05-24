import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import type { ManifestOptions } from 'vite-plugin-pwa'
import manifest from './public/manifest.json'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: manifest as ManifestOptions,
      workbox: { globPatterns: ['**/*.{js,css,html,png,svg}'] },
      registerType: 'autoUpdate',
    }),
  ],
})