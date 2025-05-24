// src/pages/MenuSelectPage.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMenuContext } from '../hooks/useMenuContext'
import { MenuEditor } from '../components/MenuEditor'
import { MenuList } from '../components/MenuList'

const MenuSelectPage: React.FC = () => {
  const { selectedMenu } = useMenuContext()
  const navigate = useNavigate()

  // メニュー選択時に selectedMenu がセットされれば TimerPage へ遷移
  useEffect(() => {
    if (selectedMenu) {
      navigate('/timer')
    }
  }, [selectedMenu, navigate])

  return (
    <div className="min-h-screen p-4 bg-gray-100 grid gap-4">
      <h1 className="text-2xl font-bold">メニュー選択</h1>
      {/* メニュー作成・編集フォーム */}
      <MenuEditor />
      {/* 作成済みメニュー一覧 */}
      <MenuList />
    </div>
  )
}

export default MenuSelectPage