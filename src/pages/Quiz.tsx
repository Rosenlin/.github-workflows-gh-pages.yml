import { Navigate, useParams } from 'react-router-dom'
import { findCourse } from '../data/courses'
import { findBank } from '../data/questions'
import { QuizRunner } from '../components/QuizRunner'

export function Quiz() {
  const { courseId = '' } = useParams()
  const course = findCourse(courseId)
  const bank = course ? findBank(course.quizBank) : undefined
  if (!course || !bank) return <Navigate to="/404" replace />

  return (
    <div className="page">
      <QuizRunner bankId={bank.id} title={bank.title} questions={bank.questions} />
    </div>
  )
}
