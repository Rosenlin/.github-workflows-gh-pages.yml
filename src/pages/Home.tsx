import { Link } from 'react-router-dom'
import { BookOpen, GraduationCap, Sparkles } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { courses } from '../data/courses'
import { CourseCard } from '../components/CourseCard'

export function Home() {
  const { user, progress } = useApp()
  const totalLessons = courses.reduce((n, c) => n + c.lessons.length, 0)
  const doneLessons = Object.values(progress.completedLessons).reduce(
    (n, arr) => n + arr.length,
    0,
  )
  const recentAttempt = progress.attempts[0]

  return (
    <div className="page">
      <section className="card bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white">
        <div className="flex items-center gap-2 text-xs opacity-80">
          <Sparkles size={14} /> 今日學習
        </div>
        <h1 className="mt-2 text-2xl font-bold">
          {user ? `${user.name}，繼續學習吧` : '歡迎使用基礎電鍍教育訓練'}
        </h1>
        <p className="mt-1 text-sm opacity-90">
          已完成 {doneLessons}/{totalLessons} 單元
          {recentAttempt
            ? `・最近一次測驗 ${Math.round(recentAttempt.score * 100)} 分`
            : '・尚未參加測驗'}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to="/courses" className="btn bg-white text-brand-700 hover:bg-brand-50">
            <BookOpen size={16} /> 開始學習
          </Link>
          <Link
            to="/exam"
            className="btn bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20"
          >
            <GraduationCap size={16} /> 模擬考
          </Link>
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">課程總覽</h2>
          <Link to="/courses" className="text-sm text-brand-600">
            全部課程 →
          </Link>
        </div>
        <div className="space-y-3">
          {courses.slice(0, 3).map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>
    </div>
  )
}
