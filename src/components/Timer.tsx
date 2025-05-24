import React, { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

type Phase = 'prepare' | 'work' | 'rest' | 'between'

interface TimerProps {
  prep: number
  workDuration: number
  restDuration: number
  sets: number
  betweenPrep: number
}

const playNotifySound = () => {
  const audio = new Audio('/sounds/notify.mp3')
  audio.volume = 0.2
  audio.play().catch(console.error)
}

const playEndSound = () => {
  const audio = new Audio('/sounds/katya.mp3')
  audio.play().catch(console.error)
}

const playFinishSound = () => {
  const audio = new Audio('/sounds/otukare.mp3')
  audio.play().catch(console.error)
}

const flash = () => {
  const el = document.getElementById('timer-container')
  if (!el) return
  el.classList.add('flash')
  setTimeout(() => el.classList.remove('flash'), 500)
}

const getNextPhase = (current: Phase, currentSet: number, totalSets: number): Phase | null => {
  switch (current) {
    case 'prepare': return 'work'
    case 'work': return 'rest'
    case 'rest': return currentSet < totalSets ? 'between' : null
    case 'between': return 'work'
    default: return null
  }
}

const getDuration = (phase: Phase, props: TimerProps): number => {
  switch (phase) {
    case 'prepare': return props.prep
    case 'work': return props.workDuration
    case 'rest': return props.restDuration
    case 'between': return props.betweenPrep
  }
}

export const Timer: React.FC<TimerProps> = (props) => {
  const { prep, workDuration, restDuration, sets, betweenPrep } = props
  const [currentSet, setCurrentSet] = useState(1)
  const [phase, setPhase] = useState<Phase>('prepare')
  const [timeLeft, setTimeLeft] = useState(getDuration('prepare', props))
  const [isRunning, setIsRunning] = useState(false)
  const [hasAudioPermission, setHasAudioPermission] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const timerId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 4 && (phase === 'work' || phase === 'rest')) {
          if (hasAudioPermission) playNotifySound()
        }

        if (prev <= 1) {
          clearInterval(timerId)

          if (hasAudioPermission) playEndSound()
          if ('vibrate' in navigator) navigator.vibrate(500)
          flash()

          const next = getNextPhase(phase, currentSet, sets)
          if (next) {
            if (phase === 'rest') setCurrentSet(s => s + 1)
            setPhase(next)
            setTimeLeft(getDuration(next, props))
          } else {
            if (hasAudioPermission) playFinishSound()
          }

          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timerId)
  }, [isRunning, phase, currentSet, hasAudioPermission, prep, workDuration, restDuration, sets, betweenPrep])

  const handleStart = () => {
    // スマホ対応：初回の再生権限を取得
    const audio = new Audio('/sounds/notify.mp3')
    audio.volume = 0
    audio.play()
      .then(() => setHasAudioPermission(true))
      .catch(() => setHasAudioPermission(false))

    setIsRunning(true)
  }

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
      <div id="timer-phase" className="text-lg font-medium mt-4 mb-2">
        {{
          prepare: '開始前準備',
          work: 'ワーク',
          rest: '休憩',
          between: '次セット準備'
        }[phase]}
      </div>
      <div className="text-xl font-bold mb-4">セット {currentSet} / {sets}</div>
      <div className="flex flex-col items-center space-y-4 mt-6 w-full">
        <button onClick={handleStart} className="w-64 py-4 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">スタート</button>
        <button onClick={handlePause} className="w-64 py-4 text-lg bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition">停止</button>
        <button onClick={handleReset} className="w-64 py-4 text-lg bg-red-500 text-white rounded-lg hover:bg-red-600 transition">リセット</button>
      </div>
    </div>
  )
}
