import { Link } from 'react-router-dom'
import type { Course } from '../types'
import { useApp } from '../context/AppContext'

export function CourseCard({ course }: { course: Course }) {
  const { progress } = useApp()
  const done = progress.completedLessons[course.id]?.length ?? 0
  const total = course.lessons.length
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <Link to={`/courses/${course.id}`} className="card block p-4 transition hover:ring-brand-300">
      <div className="flex items-start gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-2xl">
          {course.cover}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold">{course.title}</h3>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
              {course.level}
            </span>
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-slate-600">{course.subtitle}</p>
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>
                {done}/{total} 單元
              </span>
              <span>{pct}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-brand-500 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
