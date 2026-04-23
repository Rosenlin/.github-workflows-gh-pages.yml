# 基礎電鍍教育訓練 App

一份可同時發佈為 **網頁（GitHub Pages）**、**Android APK** 與 **iOS（App Store）** 的
電鍍教育訓練應用。架構為 React + TypeScript + Vite + Tailwind，行動端以 Capacitor
包成原生殼，並以 PWA 提供離線學習體驗。

## 功能

- 課程瀏覽（入門／進階／證照三個分類）
- 單元學習（支援 Markdown 內文、PDF 與影片教材）
- 課程測驗與綜合模擬考，送出後立即顯示分數與詳解
- 學習進度、測驗紀錄保存（本機帳號，資料存於裝置）
- 離線可用（PWA / 原生 WebView 皆快取資源）

## 開發

```bash
npm install
npm run dev            # 本機網頁開發伺服器 http://localhost:5173
```

## 網頁版部署（GitHub Pages）

推送到 `main` 時，`.github/workflows/web.yml` 會自動建置並發佈至 Pages。
如需手動觸發：GitHub → Actions → **Deploy Web (GitHub Pages)** → Run workflow。

> `VITE_BASE` 在 CI 會自動設為 `/<repo-name>/`，本地開發 / Capacitor 打包
> 則用相對路徑 `./`，兩種環境的資源連結都能正確載入。

## Android APK

Android 可於 Linux runner 建置，無需本機環境：

1. GitHub → Actions → **Build Android (APK)** → Run workflow
2. 成功後在該 run 的 Artifacts 下載 `android-debug-apk`
3. 發佈到 Google Play 時須再補上簽章 keystore（日後加入對應 secrets 即可）

本機如要打包：

```bash
npm install
npm run build
npx cap add android
npx cap sync android
cd android && ./gradlew assembleDebug
```

## iOS / App Store

iOS **必須使用 macOS + Xcode**。你沒有 Mac，可透過 GitHub Actions 的
macOS runner：

1. 取得 [Apple Developer Program](https://developer.apple.com/programs/) 帳號（US$99/年）
2. 在 App Store Connect 建立 App 並記下 Bundle ID（需與 `capacitor.config.ts` 一致：`com.rosenlin.platingtraining`）
3. 在 GitHub repo Settings → Secrets 填入下列密鑰（見 `ios.yml` 頂部註解）：
   - `APPLE_TEAM_ID`、`APPLE_CERTIFICATE_P12`、`APPLE_CERTIFICATE_PWD`
   - `APPLE_PROVISIONING`
   - `APPLE_API_KEY_ID`、`APPLE_API_ISSUER_ID`、`APPLE_API_PRIVATE_KEY`
4. 手動執行 **Build iOS** workflow；目前先產生未簽章 `.app` 供驗證，簽章與
   TestFlight 上傳步驟會在密鑰備齊後擴充

> App Store 審核對純網頁套殼（Guideline 4.2）有要求，教育訓練型 App 通常能通過，
> 但務必確保 App 提供實質離線內容與互動測驗（本專案已支援）。

## 專案結構

```
.
├── capacitor.config.ts      # iOS/Android bundle 設定
├── src/
│   ├── main.tsx
│   ├── router.tsx           # createHashRouter，相容 file:// 與 gh-pages
│   ├── context/AppContext.tsx
│   ├── lib/storage.ts       # Capacitor Preferences + localStorage 兩用
│   ├── data/courses.ts      # 課程與單元內容（可逕行擴充）
│   ├── data/questions.ts    # 題庫與模擬考組卷
│   ├── components/
│   └── pages/
├── public/
│   ├── assets/              # PDF、影片放這裡（被 PWA 快取）
│   └── icons/               # App icon
└── .github/workflows/
    ├── web.yml              # GitHub Pages
    ├── android.yml          # APK
    └── ios.yml              # iOS 建置
```

## 加教材

1. 將 PDF / MP4 放入 `public/assets/`
2. 於 `src/data/courses.ts` 對應 lesson 加上：
   ```ts
   resource: { kind: 'pdf', src: 'assets/your-file.pdf' }
   ```
3. 推送後網頁版即自動部署；Android / iOS 重新執行對應 workflow 即可

## 下一步（建議）

- 接雲端驗證（Firebase Auth / Supabase）改用真帳號
- 題庫從靜態 JSON 改為後端 API，方便非技術同仁維護
- 加入學習時數統計與證書下載
