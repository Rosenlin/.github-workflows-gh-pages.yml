import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// 雙用途 base：
//  - GitHub Pages 部署時用 /<REPO_NAME>/（由 VITE_BASE 環境變數帶入）
//  - 本地 / Capacitor 打包走相對路徑 './'，確保資源在 file:// 協議下可讀
const base = process.env.VITE_BASE ?? './'

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'assets/**/*'],
      manifest: {
        name: '基礎電鍍教育訓練',
        short_name: '電鍍訓練',
        description: '電鍍技術教材、測驗題庫與模擬考試',
        lang: 'zh-Hant-TW',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2,pdf,mp4}'],
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
      },
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    host: true,
    port: 5173,
  },
})
