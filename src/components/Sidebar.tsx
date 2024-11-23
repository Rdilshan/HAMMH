'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  UserCog,
  Stethoscope,
  ClipboardCheck,
  Syringe,
  FileText,
  LogOut,
} from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()

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
      className="
        fixed left-0 top-0 h-screen bg-white border-r border-gray-200
        w-14 sm:w-64 transition-all duration-300 ease-in-out
      "
    >
      {/* Logo */}
      <div className="h-16 flex items-center border-b border-gray-200 px-4">
        <span className="text-purple-600 font-bold text-xl">
          <span className="hidden lg:block">HOSPITAL</span>
          <span className="block lg:hidden">H</span>
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="py-4 flex flex-col h-[calc(100vh-4rem)]">
        <div className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path
            const Icon = item.icon

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  flex items-center h-12 px-4 relative group
                  ${isActive ? 'text-white bg-[#6800E9] font-medium ' : 'text-gray-600 hover:bg-gray-50'}
                `}
              >
                <Icon className="h-5 w-5 min-w-[20px]" />
                <span className="hidden sm:block ml-4 text-sm font-medium">
                  {item.title}
                </span>
                <div className="lg:hidden absolute left-16 px-3 py-2 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  {item.title}
                </div>
              </Link>
            )
          })}
        </div>

        {/* Logout Button */}
        <Link
          href="/logout"
          className={`
            flex items-center h-12 px-4 text-red-500 hover:bg-gray-50
          `}
        >
          <LogOut className="h-5 w-5 min-w-[20px]" />
          <span className="hidden lg:block ml-4 text-sm font-medium">Logout</span>
          <div className="lg:hidden absolute left-16 px-3 py-2 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
            Logout
          </div>
        </Link>
      </nav>
    </aside>
  )
}