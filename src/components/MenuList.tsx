import React, { useState } from 'react'
import { useMenuContext } from '../hooks/useMenuContext'

type Menu = {
  id: string
  name: string
  prep: number
  work: number
  rest: number
  repeat?: number
  sets: number
  betweenPrep: number
}

const ITEMS_PER_PAGE = 3

export const MenuList: React.FC = () => {
  const { menus, selectedMenu, selectMenu, deleteMenu } = useMenuContext()
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(menus.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentItems = menus.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div className="space-y-4">
      {currentItems.map((menu: Menu) => (
        <div
          key={menu.id}
          className={`p-4 w-full bg-blue-50 rounded-md shadow-md cursor-pointer transition ${
            selectedMenu?.id === menu.id ? 'border-2 border-blue-500' : ''
          }`}
          onClick={() => selectMenu(menu)}
        >
          <div className="font-bold text-lg mb-1">{menu.name}</div>
          <div className="text-sm">開始前準備: {menu.prep}秒</div>
          <div className="text-sm">ワーク: {menu.work}秒</div>
          <div className="text-sm">休憩: {menu.rest}秒</div>
          <div className="text-sm">繰り返し回数: {menu.repeat}回</div>
          <div className="text-sm">セット数: {menu.sets}</div>
          <div className="text-sm">セット間準備: {menu.betweenPrep}秒</div>
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

      {/* ページネーションボタン */}
      {totalPages > 1 && (
        <div className="flex justify-between pt-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 text-sm rounded disabled:opacity-50"
          >
            前へ
          </button>
          <span className="text-sm text-gray-600">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 text-sm rounded disabled:opacity-50"
          >
            次へ
          </button>
        </div>
      )}
    </div>
  )
}
