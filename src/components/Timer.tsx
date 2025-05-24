import React, { useState, useEffect, useRef } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

type Phase = 'prepare' | 'work' | 'rest' | 'between'

interface TimerProps {
  prep: number
  workDuration: number
  restDuration: number
  repeat: number
  sets: number
  betweenPrep: number
}

const flash = () => {
  const el = document.getElementById('timer-container')
  if (!el) return
  el.classList.add('flash')
  setTimeout(() => el.classList.remove('flash'), 500)
}

export const Timer: React.FC<TimerProps> = (props) => {
  const { prep, workDuration, restDuration, repeat, sets, betweenPrep } = props
  const [currentSet, setCurrentSet] = useState(1)
  const [currentRepeat, setCurrentRepeat] = useState(1)
  const [phase, setPhase] = useState<Phase>('prepare')
  const [timeLeft, setTimeLeft] = useState(prep)
  const [isRunning, setIsRunning] = useState(false)

  const notifyAudio = useRef(new Audio('/sounds/notify.mp3'))
  const endAudio = useRef(new Audio('/sounds/katya.mp3'))
  const finishAudio = useRef(new Audio('sounds/katya.mp3'))

  useEffect(() => {
    notifyAudio.current.volume = 0.2
  }, [])

  useEffect(() => {
    if (!isRunning) return

    const timerId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 4 && (phase === 'work' || phase === 'rest')) {
          notifyAudio.current.play().catch(() => {})
        }

        if (prev <= 1) {
          clearInterval(timerId)

          endAudio.current.play().catch(() => {})
          if ('vibrate' in navigator) navigator.vibrate(500)
          flash()

          // フェーズの進行ロジック
          if (phase === 'prepare') {
            setPhase('work')
            setTimeLeft(workDuration)
            return 0
          }

          if (phase === 'work') {
            setPhase('rest')
            setTimeLeft(restDuration)
            return 0
          }

          if (phase === 'rest') {
            if (currentRepeat < repeat) {
              setCurrentRepeat(r => r + 1)
              setPhase('work')
              setTimeLeft(workDuration)
            } else if (currentSet < sets) {
              setCurrentSet(s => s + 1)
              setCurrentRepeat(1)
              setPhase('between')
              setTimeLeft(betweenPrep)
            } else {
              finishAudio.current.play().catch(() => {})
              setIsRunning(false)
            }
            return 0
          }

          if (phase === 'between') {
            setPhase('work')
            setTimeLeft(workDuration)
            return 0
          }

        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timerId)
  }, [isRunning, phase, currentRepeat, currentSet, prep, workDuration, restDuration, repeat, sets, betweenPrep])

  const handleStart = () => {
    // 再生許可確保（スマホ対応）
    notifyAudio.current.volume = 0
    notifyAudio.current.play().catch(() => {})
    endAudio.current.play().catch(() => {})
    finishAudio.current.play().catch(() => {})

    notifyAudio.current.pause()
    notifyAudio.current.currentTime = 0
    endAudio.current.pause()
    endAudio.current.currentTime = 0
    finishAudio.current.pause()
    finishAudio.current.currentTime = 0

    setIsRunning(true)
  }

  const handlePause = () => setIsRunning(false)

  const handleReset = () => {
    setIsRunning(false)
    setCurrentSet(1)
    setCurrentRepeat(1)
    setPhase('prepare')
    setTimeLeft(prep)
  }

  const total = (() => {
    switch (phase) {
      case 'prepare': return prep
      case 'work': return workDuration
      case 'rest': return restDuration
      case 'between': return betweenPrep
    }
  })()

  const percentage = ((total - timeLeft) / total) * 100

  return (
    <div id="timer-container" className="p-4 bg-white rounded-xl shadow-md flex flex-col items-center">
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

      <div id="timer-phase" className="text-xl font-semibold mt-4 mb-2">
        {{
          prepare: '開始前準備',
          work: 'ワーク',
          rest: '休憩',
          between: 'セット間準備'
        }[phase]}
      </div>

      <div className="text-sm text-gray-600 mb-1">
        リピート {currentRepeat} / {repeat}
      </div>

      <div className="text-xl font-bold mb-4">
        セット {currentSet} / {sets}
      </div>

      <div className="flex flex-col items-center space-y-4 mt-6 w-full">
        <button onClick={handleStart} className="w-64 py-4 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">スタート</button>
        <button onClick={handlePause} className="w-64 py-4 text-lg bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition">停止</button>
        <button onClick={handleReset} className="w-64 py-4 text-lg bg-red-500 text-white rounded-lg hover:bg-red-600 transition">リセット</button>
      </div>
    </div>
  )
}
