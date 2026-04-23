import { useState, type FormEvent } from 'react'
import { LogOut, UserRound } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function Login() {
  const { user, login, logout } = useApp()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [err, setErr] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setErr('請填寫姓名與 Email')
      return
    }
    setErr(null)
    await login(name, email)
    setName('')
    setEmail('')
  }

  if (user) {
    return (
      <div className="page">
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-100 text-brand-700">
              <UserRound />
            </div>
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm text-slate-500">{user.email}</div>
            </div>
          </div>
          <button className="btn-ghost mt-5 w-full" onClick={() => void logout()}>
            <LogOut size={16} /> 登出
          </button>
        </div>
        <p className="mt-4 text-center text-xs text-slate-400">
          目前為本機帳號模式，資料只儲存在這台裝置。
        </p>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="card p-5">
        <h1 className="text-xl font-bold">建立學習帳號</h1>
        <p className="mt-1 text-sm text-slate-500">
          建立後可在此裝置記錄進度與測驗成績（未連線至雲端）。
        </p>
        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">姓名</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              placeholder="請輸入姓名"
              autoComplete="name"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              placeholder="name@example.com"
              autoComplete="email"
            />
          </label>
          {err && <p className="text-sm text-rose-600">{err}</p>}
          <button type="submit" className="btn-primary w-full">
            建立帳號
          </button>
        </form>
      </div>
    </div>
  )
}
