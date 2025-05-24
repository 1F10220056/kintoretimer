import React, { useEffect, useState } from 'react'

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then(() => setDeferredPrompt(null))
    }
  }

  if (!deferredPrompt) return null
  return (
    <button onClick={handleInstall} className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full">
      インストール
    </button>
  )
}