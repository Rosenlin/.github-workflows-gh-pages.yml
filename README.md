# 基礎電鍍｜Tauri 打包版（最小可用專案）

## 使用方式
1. 下載本專案資料夾，將你的 PDF/Excel 放進 `public/assets/`。
2. 安裝工具：
   ```bash
   npm i
   npm i -D @tauri-apps/cli
   ```
   並先安裝 Rust 與 Windows Build Tools（若尚未安裝）。
3. 開發預覽（桌面視窗）：
   ```bash
   npm run tauri:dev
   ```
4. 產生 `.exe` 安裝檔：
   ```bash
   npm run tauri:build
   ```
   產物在 `src-tauri/target/release/`。

## 注意
- 本專案已設定 `base: './'`，資源連結請使用下述 `withBase()` 寫法以適應不同環境。