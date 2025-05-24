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
    repeat: 1,
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
        repeat: selectedMenu.repeat,
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
    const newMenu = { ...form }

    if (selectedMenu) {
      updateMenu({ id: selectedMenu.id, ...newMenu })
    } else {
      addMenu(newMenu)
    }

    setForm({
      name: '',
      prep: 5,
      work: 30,
      rest: 15,
      repeat: 1,
      sets: 3,
      betweenPrep: 5
    })
    clearSelection()
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-md shadow">
      <h2 className="text-lg font-bold mb-2">メニュー編集</h2>

      {[
        { key: 'name', label: 'メニュー名', type: 'text' },
        { key: 'prep', label: '開始前準備（秒）', type: 'number' },
        { key: 'work', label: 'ワーク（秒）', type: 'number' },
        { key: 'rest', label: '休憩（秒）', type: 'number' },
        { key: 'repeat', label: '繰り返し回', type: 'number' },
        { key: 'sets', label: 'セット数', type: 'number' },
        { key: 'betweenPrep', label: 'セット間（秒）', type: 'number' }
      ].map(({ key, label, type }) => (
        <div key={key} className="mb-2">
          <label className="block text-sm mb-1">{label}</label>
          <input
            name={key}
            value={form[key as keyof typeof form]}
            onChange={handleChange}
            className="w-full border rounded p-1"
            type={type}
          />
        </div>
      ))}

      <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
        {selectedMenu ? '更新' : '追加'}
      </button>
    </form>
  )
}
