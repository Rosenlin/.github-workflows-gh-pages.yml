import { useState } from 'react'
import { GraduationCap, RefreshCw } from 'lucide-react'
import { buildMockExam } from '../data/questions'
import { QuizRunner } from '../components/QuizRunner'

export function MockExam() {
  const [seed, setSeed] = useState(0)
  const [started, setStarted] = useState(false)
  const [questions] = useState(() => buildMockExam(10))
  const [currentQuestions, setCurrentQuestions] = useState(questions)

  function restart() {
    setCurrentQuestions(buildMockExam(10))
    setSeed((s) => s + 1)
    setStarted(true)
  }

  if (!started) {
    return (
      <div className="page">
        <div className="card p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50">
              <GraduationCap className="text-brand-700" />
            </div>
            <div>
              <h1 className="text-xl font-bold">綜合模擬考</h1>
              <p className="text-sm text-slate-500">由所有課程題庫隨機抽出 10 題</p>
            </div>
          </div>
          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            <li>・答題不限時間，全部作答後送出</li>
            <li>・送出後立即顯示分數與詳解</li>
            <li>・成績會記錄在你的學習進度中</li>
          </ul>
          <button className="btn-primary mt-5 w-full" onClick={() => setStarted(true)}>
            開始作答
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <QuizRunner
        key={seed}
        bankId="mock-exam"
        title="綜合模擬考"
        questions={currentQuestions}
      />
      <button className="btn-ghost mt-4 w-full" onClick={restart}>
        <RefreshCw size={16} /> 換一套新題
      </button>
    </div>
  )
}
