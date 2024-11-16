'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  UserCog,
  Stethoscope,
  ClipboardCheck,
  Syringe,
  FileText,
  LogOut,
  ChevronRight
} from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(true)

  const menuItems = [
    { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { title: 'Patients', path: '/dashboard/patients', icon: Users },
    { title: 'Doctors', path: '/dashboard/doctors', icon: UserCog },
    { title: 'Nurses', path: '/dashboard/nurses', icon: Stethoscope },
    { title: 'Attendance', path: '/dashboard/attendance', icon: ClipboardCheck },
    { title: 'Injection', path: '/dashboard/injection', icon: Syringe },
    { title: 'Report', path: '/dashboard/report', icon: FileText },
  ]

  return (
    <aside 
      className={`
        fixed left-0 top-0 h-screen bg-white border-r border-gray-200
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-64' : 'w-16'}
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center border-b border-gray-200 px-4">
        <span className="text-purple-600 font-bold text-xl">
          {isExpanded ? 'HOSPITAL' : 'H'}
        </span>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1.5 
          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <ChevronRight 
          className={`h-4 w-4 text-gray-600 transition-transform duration-300 
            ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {/* Navigation Menu */}
      <nav className="py-4 flex flex-col h-[calc(100vh-4rem)]">
        <div className="flex-1 space-y-1 py-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.path
            const Icon = item.icon
            
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  flex items-center h-12 px-4 relative group mx-2 rounded-lg
                  ${isActive ? 'text-white bg-[#6800E9] font-medium' : 'text-gray-900 hover:bg-gray-50 font-medium'}
                `}
              >
                <Icon className="h-5 w-5 min-w-[20px]" />
                {isExpanded && (
                  <span className="ml-4 text-sm font-medium whitespace-nowrap">
                    {item.title}
                  </span>
                )}
                {!isExpanded && (
                  <div className="
                    absolute left-16 px-3 py-2 bg-gray-800 text-white text-sm
                    rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible
                    transition-all duration-200 whitespace-nowrap z-50
                  ">
                    {item.title}
                  </div>
                )}
              </Link>
            )
          })}
        </div>

        {/* Logout Button */}
        <Link
          href="/logout"
          className={`
            flex items-center h-12 px-4 text-red-500 hover:bg-gray-50
            ${!isExpanded && 'justify-center'}
          `}
        >
          <LogOut className="h-5 w-5 min-w-[20px]" />
          {isExpanded && (
            <span className="ml-4 text-sm font-medium">Logout</span>
          )}
          {!isExpanded && (
            <div className="
              absolute left-16 px-3 py-2 bg-gray-800 text-white text-sm
              rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-200 whitespace-nowrap z-50
            ">
              Logout
            </div>
          )}
        </Link>
      </nav>
    </aside>
  )
}