// src/components/Timer.tsx
import React, { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

type Phase = 'prepare' | 'work' | 'rest' | 'between'

interface TimerProps {
  prep: number         // 開始前準備時間（秒）
  workDuration: number // 運動時間（秒）
  restDuration: number // 休憩時間（秒）
  sets: number         // セット数
  betweenPrep: number  // セット間準備時間（秒）
}

// 通知用サウンド再生
const playSound = () => {
  const audio = new Audio('/sounds/notify.mp3')
  audio.play().catch(console.error)
}

// フラッシュエフェクト
const flash = () => {
  const el = document.getElementById('timer-container')
  if (!el) return
  el.classList.add('flash')
  setTimeout(() => el.classList.remove('flash'), 500)
}

// フェーズ遷移ヘルパー
const getNextPhase = (current: Phase, currentSet: number, totalSets: number): Phase | null => {
  switch (current) {
    case 'prepare': return 'work'
    case 'work':    return 'rest'
    case 'rest':    return currentSet < totalSets ? 'between' : null
    case 'between': return 'work'
    default:        return null
  }
}

// フェーズごとの秒数取得ヘルパー
const getDuration = (phase: Phase, props: TimerProps): number => {
  switch (phase) {
    case 'prepare': return props.prep
    case 'work':    return props.workDuration
    case 'rest':    return props.restDuration
    case 'between': return props.betweenPrep
  }
}

export const Timer: React.FC<TimerProps> = (props) => {
  const { prep, workDuration, restDuration, sets, betweenPrep } = props

  const [currentSet, setCurrentSet] = useState(1)
  const [phase, setPhase]           = useState<Phase>('prepare')
  const [timeLeft, setTimeLeft]     = useState(getDuration('prepare', props))
  const [isRunning, setIsRunning]   = useState(false)

  useEffect(() => {
    if (!isRunning) return
    const timerId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerId)
          playSound()
          if ('vibrate' in navigator) navigator.vibrate(500)
          flash()

          const next = getNextPhase(phase, currentSet, sets)
          if (next) {
            if (phase === 'rest') {
              setCurrentSet(s => s + 1)
            }
            setPhase(next)
            setTimeLeft(getDuration(next, props))
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerId)
  }, [isRunning, phase, currentSet, prep, workDuration, restDuration, sets, betweenPrep])

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setCurrentSet(1)
    setPhase('prepare')
    setTimeLeft(getDuration('prepare', props))
  }

  const total = getDuration(phase, props)
  const percentage = ((total - timeLeft) / total) * 100

  return (
    <div
      id="timer-container"
      className="p-4 bg-white rounded-xl shadow-md flex flex-col items-center"
    >
      {/* 円形プログレスバー */}
      <div className="w-48 h-48">
        <CircularProgressbar
          value={percentage}
          text={`${timeLeft}s`}
          styles={buildStyles({
            textColor: '#1f2937',
            pathColor: phase === 'work' ? '#2563eb' : '#10b981',
            trailColor: '#e5e7eb',
          })}
        />
      </div>

      {/* フェーズ表示 */}
      <div id="timer-phase" className="text-lg font-medium mt-4 mb-2">
        {{
          prepare: '開始前準備',
          work:    'ワーク',
          rest:    '休憩',
          between: '次セット準備'
        }[phase]}
      </div>

      {/* セット表示 */}
      <div className="text-xl font-bold mb-4">
        セット {currentSet} / {sets}
      </div>

      {/* 操作ボタン */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleStart}
          className="w-24 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          className="w-24 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className="w-24 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
