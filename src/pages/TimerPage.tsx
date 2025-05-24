// src/pages/TimerPage.tsx
import { useNavigate } from 'react-router-dom'
import { useMenuContext } from '../hooks/useMenuContext'
import { Timer } from '../components/Timer'

const TimerPage: React.FC = () => {
  const { selectedMenu, clearSelection } = useMenuContext()
  const navigate = useNavigate()

  // 未選択でこのページに来た場合は戻す
  if (!selectedMenu) {
    navigate('/')
    return null
  }

  const handleBack = () => {
    clearSelection()
    navigate('/')
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100 text-center">
      <h1 className="text-2xl font-bold mb-4">{selectedMenu.name} タイマー</h1>
      <Timer
        prep={selectedMenu.prep}
        workDuration={selectedMenu.work}
        restDuration={selectedMenu.rest}
        sets={selectedMenu.sets}
        betweenPrep={selectedMenu.betweenPrep}
      />
      <button
        onClick={handleBack}
        className="mt-6 px-4 py-2 bg-gray-300 rounded"
      >
        メニュー選択に戻る
      </button>
    </div>
  )
}

export default TimerPage