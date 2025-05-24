import React, { useEffect } from 'react'
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
    <div className="min-h-screen w-full px-4 md:px-32 py-4 overflow-y-auto">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow space-y-6 flex flex-col">
        <h1 className="text-xl font-semibold text-black">メニュー選択</h1>

        {/* フォームは固定 */}
        <MenuEditor />

        {/* メニュー一覧だけをスクロール */}
        <div className="flex-1 min-h-0 overflow-y-auto border-t border-gray-200 pt-4">
          <MenuList />
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            onClick={() => navigate('/timer')}
            className="px-4 py-2 bg-blue-200 text-black rounded-lg font-medium hover:bg-blue-300 transition"
          >
            選択したメニューで開始
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuSelectPage
