import { useMemo, useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import type { Question, QuizAttempt } from '../types'
import { useApp } from '../context/AppContext'

interface Props {
  bankId: string
  title: string
  questions: Question[]
  onFinished?: (attempt: QuizAttempt) => void
}

type AnswerMap = Record<string, number>

export function QuizRunner({ bankId, title, questions, onFinished }: Props) {
  const { recordAttempt } = useApp()
  const [answers, setAnswers] = useState<AnswerMap>({})
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = useMemo(
    () => questions.every((q) => answers[q.id] !== undefined),
    [answers, questions],
  )

  const result = useMemo(() => {
    if (!submitted) return null
    const correct = questions.filter((q) => answers[q.id] === q.answer).length
    return {
      correct,
      total: questions.length,
      score: questions.length === 0 ? 0 : correct / questions.length,
    }
  }, [submitted, answers, questions])

  function handleSubmit() {
    if (!allAnswered || submitted) return
    setSubmitted(true)
    const correct = questions.filter((q) => answers[q.id] === q.answer).length
    const attempt: QuizAttempt = {
      bankId,
      at: Date.now(),
      correct,
      total: questions.length,
      score: questions.length === 0 ? 0 : correct / questions.length,
    }
    void recordAttempt(attempt)
    onFinished?.(attempt)
  }

  function handleReset() {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-slate-500">
          共 {questions.length} 題，請選出最適合的答案後送出。
        </p>
      </div>

      {submitted && result && (
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">你的成績</div>
              <div className="text-3xl font-bold">
                {Math.round(result.score * 100)}
                <span className="ml-1 text-base font-medium text-slate-500">分</span>
              </div>
            </div>
            <div className="text-right text-sm text-slate-600">
              答對 {result.correct} / {result.total} 題
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="btn-ghost" onClick={handleReset}>
              再試一次
            </button>
          </div>
        </div>
      )}

      <ol className="space-y-4">
        {questions.map((q, idx) => {
          const chosen = answers[q.id]
          return (
            <li key={q.id} className="card p-4">
              <div className="text-sm font-medium text-brand-700">第 {idx + 1} 題</div>
              <div className="mt-1 text-base font-semibold">{q.prompt}</div>
              <ul className="mt-3 space-y-2">
                {q.choices.map((choice, i) => {
                  const isChosen = chosen === i
                  const isCorrect = q.answer === i
                  let klass = 'flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition'
                  if (submitted) {
                    if (isCorrect) klass += ' border-emerald-400 bg-emerald-50 text-emerald-900'
                    else if (isChosen) klass += ' border-rose-400 bg-rose-50 text-rose-900'
                    else klass += ' border-slate-200 text-slate-700'
                  } else {
                    klass += isChosen
                      ? ' border-brand-500 bg-brand-50 text-brand-900'
                      : ' border-slate-200 hover:border-brand-300'
                  }
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        className={`${klass} w-full text-left`}
                        disabled={submitted}
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                      >
                        {submitted && isCorrect && (
                          <CheckCircle2 size={18} className="text-emerald-600" />
                        )}
                        {submitted && isChosen && !isCorrect && (
                          <XCircle size={18} className="text-rose-600" />
                        )}
                        <span>{choice}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
              {submitted && q.explanation && (
                <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">解析：</span>
                  {q.explanation}
                </p>
              )}
            </li>
          )
        })}
      </ol>

      {!submitted && (
        <button
          type="button"
          className="btn-primary w-full"
          disabled={!allAnswered}
          onClick={handleSubmit}
        >
          {allAnswered ? '送出作答' : `還有 ${questions.length - Object.keys(answers).length} 題未作答`}
        </button>
      )}
    </div>
  )
}
