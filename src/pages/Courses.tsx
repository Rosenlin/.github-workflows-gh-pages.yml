import { useMemo, useState } from 'react'
import { courses } from '../data/courses'
import { CourseCard } from '../components/CourseCard'
import type { Course } from '../types'

const levels: Array<Course['level'] | '全部'> = ['全部', '入門', '進階', '證照']

export function Courses() {
  const [level, setLevel] = useState<(typeof levels)[number]>('全部')
  const filtered = useMemo(
    () => (level === '全部' ? courses : courses.filter((c) => c.level === level)),
    [level],
  )

  return (
    <div className="page">
      <h1 className="text-2xl font-bold">課程</h1>
      <p className="mt-1 text-sm text-slate-500">選擇要進入的課程，完成每個單元並挑戰測驗。</p>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {levels.map((lv) => (
          <button
            key={lv}
            onClick={() => setLevel(lv)}
            className={
              'rounded-full border px-4 py-1.5 text-sm transition ' +
              (lv === level
                ? 'border-brand-500 bg-brand-50 text-brand-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300')
            }
          >
            {lv}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {filtered.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-slate-500">此分類沒有課程</p>
        )}
      </div>
    </div>
  )
}
