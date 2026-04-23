import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Progress, QuizAttempt, User } from '../types'
import { getJSON, removeItem, setJSON } from '../lib/storage'

const USER_KEY = 'pt.user.v1'
const PROGRESS_KEY = 'pt.progress.v1'

const emptyProgress: Progress = { completedLessons: {}, attempts: [] }

interface AppContextValue {
  ready: boolean
  user: User | null
  progress: Progress
  login: (name: string, email: string) => Promise<void>
  logout: () => Promise<void>
  markLessonDone: (courseId: string, lessonId: string) => Promise<void>
  recordAttempt: (attempt: QuizAttempt) => Promise<void>
  resetProgress: () => Promise<void>
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [progress, setProgress] = useState<Progress>(emptyProgress)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const [u, p] = await Promise.all([
        getJSON<User | null>(USER_KEY, null),
        getJSON<Progress>(PROGRESS_KEY, emptyProgress),
      ])
      if (cancelled) return
      setUser(u)
      setProgress(p)
      setReady(true)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (name: string, email: string) => {
    const next: User = { name: name.trim(), email: email.trim(), createdAt: Date.now() }
    setUser(next)
    await setJSON(USER_KEY, next)
  }, [])

  const logout = useCallback(async () => {
    setUser(null)
    await removeItem(USER_KEY)
  }, [])

  const markLessonDone = useCallback(async (courseId: string, lessonId: string) => {
    setProgress((prev) => {
      const done = new Set(prev.completedLessons[courseId] ?? [])
      done.add(lessonId)
      const next: Progress = {
        ...prev,
        completedLessons: { ...prev.completedLessons, [courseId]: [...done] },
      }
      void setJSON(PROGRESS_KEY, next)
      return next
    })
  }, [])

  const recordAttempt = useCallback(async (attempt: QuizAttempt) => {
    setProgress((prev) => {
      const next: Progress = { ...prev, attempts: [attempt, ...prev.attempts].slice(0, 50) }
      void setJSON(PROGRESS_KEY, next)
      return next
    })
  }, [])

  const resetProgress = useCallback(async () => {
    setProgress(emptyProgress)
    await setJSON(PROGRESS_KEY, emptyProgress)
  }, [])

  const value = useMemo<AppContextValue>(
    () => ({ ready, user, progress, login, logout, markLessonDone, recordAttempt, resetProgress }),
    [ready, user, progress, login, logout, markLessonDone, recordAttempt, resetProgress],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
