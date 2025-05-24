import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MenuProvider } from './hooks/useMenuContext'
import MenuListPage from './pages/MenuListPage'
import MenuEditPage from './pages/MenuEditPage'
import TimerPage from './pages/TimerPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MenuProvider>
        <Routes>
          <Route path="/" element={<MenuListPage />} />
          <Route path="/edit" element={<MenuEditPage />} />
          <Route path="/timer" element={<TimerPage />} />
        </Routes>
      </MenuProvider>
    </BrowserRouter>
  )
}

export default App
