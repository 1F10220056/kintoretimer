import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMenuContext } from '../hooks/useMenuContext'
import { useWindowSize } from '../hooks/useWindowSize'
import { Timer } from '../components/Timer'

const TimerPage: React.FC = () => {
  const { selectedMenu, clearSelection } = useMenuContext()
  const { width } = useWindowSize()
  const navigate = useNavigate()

  if (!selectedMenu) {
    navigate('/')
    return null
  }

  return (
    <div className={
      `min-h-screen flex flex-col items-center justify-center bg-gray-100 ` +
      (width > 768 ? 'px-32 py-4' : 'px-4 py-4')
    }>
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow space-y-6 text-center">
      <h2 style="text-align:center">{selectedMenu.name}</h2>
        <Timer
          prep={selectedMenu.prep}
          workDuration={selectedMenu.work}
          restDuration={selectedMenu.rest}
          sets={selectedMenu.sets}
          betweenPrep={selectedMenu.betweenPrep}
        />
        <button
          onClick={() => { clearSelection(); navigate('/') }}
          className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
        >
          メニュー選択に戻る
        </button>
      </div>
    </div>
  )
}

export default TimerPage