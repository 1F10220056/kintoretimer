import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMenuContext } from '../hooks/useMenuContext'
import { MenuList } from '../components/MenuList'
import { animateScroll as scroll } from 'react-scroll'

const MenuListPage: React.FC = () => {
  const { selectedMenu } = useMenuContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (selectedMenu) {
      navigate('/timer')
    }
  }, [selectedMenu, navigate])

  // メニュー作成ページへ遷移し、ページトップへスクロール
  const handleCreate = () => {
    scroll.scrollToTop({ duration: 500, smooth: 'easeInOutQuart' })
    navigate('/edit')
  }

  return (
    <div className="relative min-h-screen w-full px-4 md:px-32 py-4 overflow-hidden">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow space-y-6 mx-auto">

        <h1 className="text-xl font-semibold text-black text-center">メニュー一覧</h1>

        <MenuList />
      </div>

      {/* 左下に固定されたメニュー作成ボタン */}
      <button
        onClick={handleCreate}
        className="fixed bottom-4 left-4 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
      >
        ＋ メニュー作成
      </button>
    </div>
  )
}

export default MenuListPage
