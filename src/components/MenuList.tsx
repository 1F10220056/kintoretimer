import React from 'react'
import { useMenuContext } from '../hooks/useMenuContext'

type Menu = {
  id: string
  name: string
  prep: number
  work: number
  rest: number
  sets: number
  betweenPrep: number
}

export const MenuList: React.FC = () => {
  const { menus, selectedMenu, selectMenu, deleteMenu } = useMenuContext()
  return (
    <div className="grid gap-4">
      {menus.map((menu: Menu) => (
        <div
          key={menu.id}
          className={`p-4 rounded-lg shadow-md cursor-pointer transition duration-150 ease-in-out 
            ${selectedMenu?.id === menu.id
              ? 'bg-blue-100 border-2 border-blue-500'
              : 'bg-blue-50 hover:bg-blue-100'}`}
          onClick={() => selectMenu(menu)}
        >
          <div className="font-semibold text-lg text-gray-800 mb-1">{menu.name}</div>
          <div className="text-sm text-gray-700">開始前準備: {menu.prep}秒</div>
          <div className="text-sm text-gray-700">ワーク: {menu.work}秒</div>
          <div className="text-sm text-gray-700">休憩: {menu.rest}秒</div>
          <div className="text-sm text-gray-700">セット数: {menu.sets}</div>
          <div className="text-sm text-gray-700">セット間準備: {menu.betweenPrep}秒</div>
          <div className="mt-3 flex justify-end space-x-4">
            <button
              onClick={(e) => { e.stopPropagation(); selectMenu(menu); }}
              className="text-blue-700 hover:underline text-sm"
            >
              編集
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); deleteMenu(menu.id); }}
              className="text-red-600 hover:underline text-sm"
            >
              削除
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
