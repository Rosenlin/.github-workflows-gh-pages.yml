export type LessonKind = 'text' | 'pdf' | 'video'

export interface LessonResource {
  kind: LessonKind
  /** 相對於 public/ 的路徑或外部 URL。text 類型此欄可省略。 */
  src?: string
}

export interface Lesson {
  id: string
  title: string
  summary: string
  minutes: number
  resource: LessonResource
  /** text 類型時使用的 Markdown 內文。 */
  body?: string
}

export interface Course {
  id: string
  title: string
  subtitle: string
  cover: string
  level: '入門' | '進階' | '證照'
  lessons: Lesson[]
  /** 該課程對應的題組 id（引用 questions.ts） */
  quizBank: string
}

export interface Question {
  id: string
  prompt: string
  choices: string[]
  /** 0-based 正解索引 */
  answer: number
  explanation?: string
  tags?: string[]
}

export interface QuestionBank {
  id: string
  title: string
  questions: Question[]
}

export interface User {
  name: string
  email: string
  /** 登入時間戳記（毫秒） */
  createdAt: number
}

export interface QuizAttempt {
  bankId: string
  /** unix ms */
  at: number
  /** 0-1 */
  score: number
  /** 作答對錯 */
  correct: number
  total: number
}

export interface Progress {
  /** courseId -> lessonId[] 已完成清單 */
  completedLessons: Record<string, string[]>
  /** 測驗紀錄（依時間新→舊） */
  attempts: QuizAttempt[]
}
