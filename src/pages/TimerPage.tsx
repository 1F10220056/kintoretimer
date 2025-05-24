import { useNavigate } from 'react-router-dom'
import { useMenuContext } from '../hooks/useMenuContext'
import { Timer } from '../components/Timer'

const TimerPage: React.FC = () => {
  const { selectedMenu, clearSelection } = useMenuContext()
  const navigate = useNavigate()
  if (!selectedMenu) {
    navigate('/');
    return null
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow space-y-6 text-center">
        <h1 className="text-xl font-semibold text-gray-800">{selectedMenu.name}</h1>
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