import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 桌面打包（Tauri）使用相對 base，確保本地資源可讀；
// 若未來要改為 GitHub Pages，請把 base 改為 '/REPO-NAME/'。
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { outDir: 'dist' }
})