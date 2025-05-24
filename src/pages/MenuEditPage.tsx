import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuEditor } from '../components/MenuEditor'

const MenuEditPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full px-4 md:px-32 py-4 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow space-y-6 mx-auto">
        <h1 className="text-xl font-semibold text-black text-center">メニュー作成</h1>

        <MenuEditor />

        <div className="flex justify-end">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-400 transition"
          >
            戻る
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuEditPage
