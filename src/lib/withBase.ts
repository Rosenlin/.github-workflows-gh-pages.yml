// 將 public/ 下的資源路徑正規化，套用 Vite 的 base 設定。
// 例：withBase('assets/intro.pdf') 在 GitHub Pages 會變成 '/repo-name/assets/intro.pdf'
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL || './'
  const trimmed = path.replace(/^\//, '')
  return base.endsWith('/') ? `${base}${trimmed}` : `${base}/${trimmed}`
}
