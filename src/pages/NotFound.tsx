import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="page text-center">
      <div className="mt-10 text-6xl">🔎</div>
      <h1 className="mt-3 text-2xl font-bold">找不到頁面</h1>
      <p className="mt-1 text-slate-500">你要找的內容可能已移除或網址有誤。</p>
      <Link to="/" className="btn-primary mt-6 inline-flex">
        回首頁
      </Link>
    </div>
  )
}
