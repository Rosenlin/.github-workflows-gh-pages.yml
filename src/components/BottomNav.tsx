import { NavLink } from 'react-router-dom'
import { BookOpen, GraduationCap, Home, TrendingUp, UserRound } from 'lucide-react'

const items = [
  { to: '/', label: '首頁', icon: Home, end: true },
  { to: '/courses', label: '課程', icon: BookOpen },
  { to: '/exam', label: '模擬考', icon: GraduationCap },
  { to: '/progress', label: '進度', icon: TrendingUp },
  { to: '/login', label: '帳號', icon: UserRound },
]

export function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur"
      style={{ paddingBottom: 'var(--safe-bottom)' }}
    >
      <ul className="mx-auto grid w-full max-w-3xl grid-cols-5">
        {items.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'flex flex-col items-center gap-0.5 py-2 text-xs transition',
                  isActive ? 'text-brand-600' : 'text-slate-500 hover:text-slate-800',
                ].join(' ')
              }
            >
              <Icon size={22} />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
