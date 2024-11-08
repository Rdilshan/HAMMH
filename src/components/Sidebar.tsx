'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { MenuItem } from '@/types/types'

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems: MenuItem[] = [
    { title: 'Dashboard', path: '/dashboard', icon: '📊' },
    { title: 'Patients', path: '/dashboard/patients', icon: '🏥' },
    { title: 'Doctors', path: '/dashboard/doctors', icon: '👨‍⚕️' },
    { title: 'Nurses', path: '/dashboard/nurses', icon: '👩‍⚕️' },
    { title: 'Attendance', path: '/dashboard/attendance', icon: '📋' },
    { title: 'Injections', path: '/dashboard/injections', icon: '💉' },
    { title: 'Reports', path: '/dashboard/reports', icon: '📈' },
    { title: 'Logout', path: '/logout', icon: '🚪' },
  ]

  return (
    <aside
      className={`bg-white text-black fixed left-0 top-16 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
      style={{ height: 'calc(100vh - 4rem)' }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute -right-3 top-8 bg-indigo-600 text-white p-1 rounded-full shadow-lg hover:bg-indigo-700 transition-transform duration-300 ${
          isCollapsed ? 'rotate-180' : ''
        }`}
        aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative group
                ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <span className="text-xl">{item.icon}</span>
              {!isCollapsed && (
                <span className="font-medium">{item.title}</span>
              )}
              {isCollapsed && (
                <div className="
                  absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm
                  rounded invisible opacity-0 group-hover:visible group-hover:opacity-100
                  transition-opacity whitespace-nowrap z-50
                ">
                  {item.title}
                </div>
              )}
              {isActive && !isCollapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}