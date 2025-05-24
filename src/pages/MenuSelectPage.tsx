import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMenuContext } from '../hooks/useMenuContext'
import { MenuEditor } from '../components/MenuEditor'
import { MenuList } from '../components/MenuList'

const MenuSelectPage: React.FC = () => {
  const { selectedMenu } = useMenuContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (selectedMenu) navigate('/timer')
  }, [selectedMenu, navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow space-y-6">
        <h1 className="text-xl font-semibold text-center text-gray-800">メニュー選択</h1>
        <MenuEditor />
        <MenuList />
        <button
          onClick={() => navigate('/timer')}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          選択したメニューで開始
        </button>
      </div>
    </div>
  )
}

export default MenuSelectPage