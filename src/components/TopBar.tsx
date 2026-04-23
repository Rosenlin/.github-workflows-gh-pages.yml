import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronLeft, Zap } from 'lucide-react'

export function TopBar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const showBack = pathname !== '/'

  return (
    <header
      className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur"
      style={{ paddingTop: 'var(--safe-top)' }}
    >
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center gap-2 px-3">
        {showBack ? (
          <button
            className="btn-ghost !p-2"
            onClick={() => navigate(-1)}
            aria-label="返回"
          >
            <ChevronLeft size={20} />
          </button>
        ) : (
          <Link to="/" className="flex items-center gap-2 font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-600 text-white">
              <Zap size={18} />
            </span>
            <span>電鍍訓練</span>
          </Link>
        )}
        <div className="flex-1" />
      </div>
    </header>
  )
}
