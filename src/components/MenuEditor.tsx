// src/components/MenuEditor.tsx
import React, { useState, useEffect } from 'react'
import { useMenuContext } from '../hooks/useMenuContext'

export const MenuEditor: React.FC = () => {
  const { addMenu, updateMenu, selectedMenu, clearSelection } = useMenuContext()
  const [form, setForm] = useState({
    name: '',
    prep: 5,
    work: 30,
    rest: 15,
    sets: 3,
    betweenPrep: 5
  })

  useEffect(() => {
    if (selectedMenu) {
      setForm({
        name: selectedMenu.name,
        prep: selectedMenu.prep,
        work: selectedMenu.work,
        rest: selectedMenu.rest,
        sets: selectedMenu.sets,
        betweenPrep: selectedMenu.betweenPrep
      })
    }
  }, [selectedMenu])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'name' ? value : Number(value)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedMenu) {
      updateMenu({ id: selectedMenu.id, ...form })
    } else {
      addMenu(form)
    }
    setForm({ name: '', prep:5, work:30, rest:15, sets:3, betweenPrep:5 })
    clearSelection()
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-md shadow">
      <h2 className="text-lg font-bold mb-2">メニュー編集</h2>
      {['name','prep','work','rest','sets','betweenPrep'].map(key => (
        <div key={key} className="mb-2">
          <label className="block text-sm">{key === 'name' ? 'メニュー名' : `${key} (秒)`}</label>
          <input
            name={key}
            value={form[key as keyof typeof form]}
            onChange={handleChange}
            className="w-full border rounded p-1"
            type={key === 'name' ? 'text' : 'number'}
          />
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
        {selectedMenu ? '更新' : '追加'}
      </button>
    </form>
  )
}