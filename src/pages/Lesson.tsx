import { Link, Navigate, useParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { findCourse, findLesson } from '../data/courses'
import { useApp } from '../context/AppContext'
import { LessonViewer } from '../components/LessonViewer'

export function Lesson() {
  const { courseId = '', lessonId = '' } = useParams()
  const course = findCourse(courseId)
  const lesson = findLesson(courseId, lessonId)
  const { progress, markLessonDone } = useApp()

  if (!course || !lesson) return <Navigate to="/404" replace />

  const isDone = (progress.completedLessons[course.id] ?? []).includes(lesson.id)
  const idx = course.lessons.findIndex((l) => l.id === lesson.id)
  const next = course.lessons[idx + 1]

  return (
    <div className="page">
      <div className="text-xs text-slate-500">
        <Link to={`/courses/${course.id}`} className="hover:text-brand-600">
          {course.title}
        </Link>{' '}
        · 第 {idx + 1}/{course.lessons.length} 單元 · {lesson.minutes} 分鐘
      </div>
      <h1 className="mt-1 text-2xl font-bold">{lesson.title}</h1>
      <p className="mt-1 text-slate-600">{lesson.summary}</p>

      <article className="prose-sm mt-5 max-w-none">
        <LessonViewer lesson={lesson} />
      </article>

      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          className={isDone ? 'btn-ghost' : 'btn-primary'}
          onClick={() => void markLessonDone(course.id, lesson.id)}
          disabled={isDone}
        >
          <CheckCircle2 size={18} />
          {isDone ? '已完成' : '標記完成'}
        </button>
        {next ? (
          <Link to={`/courses/${course.id}/lessons/${next.id}`} className="btn-ghost">
            下一單元：{next.title} →
          </Link>
        ) : (
          <Link to={`/courses/${course.id}/quiz`} className="btn-ghost">
            進入本課測驗 →
          </Link>
        )}
      </div>
    </div>
  )
}
