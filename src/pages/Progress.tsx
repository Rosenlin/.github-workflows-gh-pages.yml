import { useApp } from '../context/AppContext'
import { courses } from '../data/courses'

function formatDate(ms: number) {
  return new Date(ms).toLocaleString('zh-Hant-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function Progress() {
  const { progress, resetProgress } = useApp()
  const totalLessons = courses.reduce((n, c) => n + c.lessons.length, 0)
  const doneLessons = Object.values(progress.completedLessons).reduce(
    (n, arr) => n + arr.length,
    0,
  )

  return (
    <div className="page">
      <h1 className="text-2xl font-bold">學習進度</h1>
      <p className="mt-1 text-sm text-slate-500">你的單元完成度與最近測驗紀錄</p>

      <section className="mt-4 space-y-3">
        {courses.map((c) => {
          const done = progress.completedLessons[c.id]?.length ?? 0
          const pct = c.lessons.length === 0 ? 0 : Math.round((done / c.lessons.length) * 100)
          return (
            <div key={c.id} className="card p-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">
                  {c.cover} {c.title}
                </div>
                <div className="text-sm text-slate-500">
                  {done}/{c.lessons.length}
                </div>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-brand-500" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-semibold">測驗紀錄</h2>
        {progress.attempts.length === 0 ? (
          <p className="text-sm text-slate-500">尚無測驗紀錄</p>
        ) : (
          <ul className="space-y-2">
            {progress.attempts.map((a) => (
              <li key={`${a.bankId}-${a.at}`} className="card flex items-center justify-between p-3">
                <div>
                  <div className="font-medium">{a.bankId}</div>
                  <div className="text-xs text-slate-500">{formatDate(a.at)}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{Math.round(a.score * 100)}</div>
                  <div className="text-xs text-slate-500">
                    {a.correct}/{a.total}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-8 text-right">
        <div className="text-sm text-slate-500">
          總完成 {doneLessons}/{totalLessons} 單元
        </div>
        <button
          className="mt-2 text-sm text-rose-600 hover:underline"
          onClick={() => {
            if (confirm('確定清除所有學習進度？此動作無法復原。')) void resetProgress()
          }}
        >
          清除所有進度
        </button>
      </div>
    </div>
  )
}
