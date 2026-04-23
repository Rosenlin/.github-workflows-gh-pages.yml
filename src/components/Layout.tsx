import { Outlet, useNavigation } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { TopBar } from './TopBar'

export function Layout() {
  const nav = useNavigation()
  const loading = nav.state === 'loading'
  return (
    <div className="min-h-full bg-slate-50">
      <TopBar />
      <main className={loading ? 'opacity-60 transition' : 'transition'}>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
