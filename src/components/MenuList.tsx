// src/components/MenuList.tsx
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
          className={`p-4 bg-gray-50 rounded-md shadow cursor-pointer ${
            selectedMenu?.id === menu.id ? 'border-2 border-blue-400' : ''
          }`}
          onClick={() => selectMenu(menu)}
        >
          <div className="font-bold text-lg mb-1">{menu.name}</div>
          <div className="text-sm">開始前準備: {menu.prep}s</div>
          <div className="text-sm">ワーク: {menu.work}s</div>
          <div className="text-sm">休憩: {menu.rest}s</div>
          <div className="text-sm">セット数: {menu.sets}</div>
          <div className="text-sm">セット間準備: {menu.betweenPrep}s</div>
          <div className="mt-2 space-x-2">
            <button
              onClick={(e) => { e.stopPropagation(); selectMenu(menu); }}
              className="text-blue-600 hover:underline"
            >編集</button>
            <button
              onClick={(e) => { e.stopPropagation(); deleteMenu(menu.id); }}
              className="text-red-600 hover:underline"
            >削除</button>
          </div>
        </div>
      ))}
    </div>
  )
}