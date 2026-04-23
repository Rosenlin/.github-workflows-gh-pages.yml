import { Link, Navigate, useParams } from 'react-router-dom'
import { CheckCircle2, Circle, Clock, GraduationCap } from 'lucide-react'
import { findCourse } from '../data/courses'
import { useApp } from '../context/AppContext'

export function CourseDetail() {
  const { courseId = '' } = useParams()
  const course = findCourse(courseId)
  const { progress } = useApp()

  if (!course) return <Navigate to="/404" replace />

  const doneSet = new Set(progress.completedLessons[course.id] ?? [])
  const doneCount = doneSet.size
  const total = course.lessons.length
  const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100)

  return (
    <div className="page">
      <div className="card p-5">
        <div className="flex items-start gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-xl bg-brand-50 text-3xl">
            {course.cover}
          </div>
          <div>
            <div className="text-xs text-slate-500">{course.level}</div>
            <h1 className="text-xl font-bold">{course.title}</h1>
            <p className="mt-1 text-sm text-slate-600">{course.subtitle}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-500">
            <span>
              進度 {doneCount}/{total}
            </span>
            <span>{pct}%</span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <Link
          to={`/courses/${course.id}/quiz`}
          className="btn-primary mt-4 w-full"
        >
          <GraduationCap size={18} /> 進入課程測驗
        </Link>
      </div>

      <h2 className="mt-6 mb-3 text-lg font-semibold">單元列表</h2>
      <ol className="space-y-2">
        {course.lessons.map((l, idx) => {
          const done = doneSet.has(l.id)
          return (
            <li key={l.id}>
              <Link
                to={`/courses/${course.id}/lessons/${l.id}`}
                className="card flex items-center gap-3 p-4 transition hover:ring-brand-300"
              >
                {done ? (
                  <CheckCircle2 className="text-emerald-500" size={22} />
                ) : (
                  <Circle className="text-slate-300" size={22} />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">第 {idx + 1} 單元</span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock size={12} /> {l.minutes} 分鐘
                    </span>
                  </div>
                  <div className="mt-0.5 font-semibold">{l.title}</div>
                  <div className="mt-0.5 line-clamp-1 text-sm text-slate-500">{l.summary}</div>
                </div>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
