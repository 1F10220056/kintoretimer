// src/hooks/useMenuContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

type Menu = {
  id: string
  name: string
  prep: number
  work: number
  rest: number
  repeat: number
  sets: number
  betweenPrep: number
}

type MenuContextType = {
  menus: Menu[]
  selectedMenu: Menu | null
  addMenu: (menu: Omit<Menu, 'id'>) => void
  updateMenu: (menu: Menu) => void
  deleteMenu: (id: string) => void
  selectMenu: (menu: Menu) => void
  clearSelection: () => void
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

export const MenuProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [menus, setMenus] = useState<Menu[]>([])
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)

  // localStorageから読み込み
  useEffect(() => {
    const data = localStorage.getItem('kintoretimer-menus')
    if (data) setMenus(JSON.parse(data))
  }, [])

  // メニュー変更時にlocalStorageへ保存
  useEffect(() => {
    localStorage.setItem('kintoretimer-menus', JSON.stringify(menus))
  }, [menus])

  const addMenu = (menuData: Omit<Menu, 'id'>) => {
    const newMenu: Menu = { id: uuidv4(), ...menuData }
    setMenus(prev => [...prev, newMenu])
  }
  const updateMenu = (menu: Menu) => {
    setMenus(prev => prev.map(m => (m.id === menu.id ? menu : m)))
  }
  const deleteMenu = (id: string) => {
    setMenus(prev => prev.filter(m => m.id !== id))
    if (selectedMenu?.id === id) setSelectedMenu(null)
  }
  const selectMenu = (menu: Menu) => setSelectedMenu(menu)
  const clearSelection = () => setSelectedMenu(null)

  return (
    <MenuContext.Provider value={{ menus, selectedMenu, addMenu, updateMenu, deleteMenu, selectMenu, clearSelection }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenuContext = () => {
  const context = useContext(MenuContext)
  if (!context) throw new Error('useMenuContext must be used within MenuProvider')
  return context
}
