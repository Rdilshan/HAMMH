'use client'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import logo from '../../public/logo.png'

export default function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 px-4">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="Logo" width={80} height={60} />

        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
          <div className="flex items-center gap-2">
            <span>Admin</span>
            <Image
              src="/avatar.png"
              alt="Admin"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}