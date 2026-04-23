import { createHashRouter, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Courses } from './pages/Courses'
import { CourseDetail } from './pages/CourseDetail'
import { Lesson } from './pages/Lesson'
import { Quiz } from './pages/Quiz'
import { MockExam } from './pages/MockExam'
import { Progress } from './pages/Progress'
import { Login } from './pages/Login'
import { NotFound } from './pages/NotFound'

// Hash router works identically on file://, Capacitor WebView, and GitHub Pages
// without needing host-level rewrites.
export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'courses', element: <Courses /> },
      { path: 'courses/:courseId', element: <CourseDetail /> },
      { path: 'courses/:courseId/lessons/:lessonId', element: <Lesson /> },
      { path: 'courses/:courseId/quiz', element: <Quiz /> },
      { path: 'exam', element: <MockExam /> },
      { path: 'progress', element: <Progress /> },
      { path: 'login', element: <Login /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
])
