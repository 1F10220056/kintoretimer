// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MenuProvider } from './hooks/useMenuContext'
import MenuSelectPage from './pages/MenuSelectPage'
import TimerPage from './pages/TimerPage'

function App() {
  return (
    <BrowserRouter>
      <MenuProvider>
        <Routes>
          <Route path="/" element={<MenuSelectPage />} />
          <Route path="/timer" element={<TimerPage />} />
        </Routes>
      </MenuProvider>
    </BrowserRouter>
  )
}

export default App
