# public/assets

把 PDF、影片等教材放這裡。

在課程資料（`src/data/courses.ts`）中以相對路徑引用，例如：

```ts
resource: { kind: 'pdf', src: 'assets/electroplating-intro.pdf' }
resource: { kind: 'video', src: 'assets/demo.mp4' }
```

`LessonViewer` 會透過 `withBase()` 自動加上 Vite 的 base 前綴，
在 GitHub Pages 與 Capacitor 原生殼都能正確載入。

PWA 會自動將此目錄快取以支援離線學習（大於 20 MB 的單檔請切分）。
