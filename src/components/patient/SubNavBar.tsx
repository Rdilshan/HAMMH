'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SubNavBarProps {
  patientId: string
}

const SubNavBar: React.FC<SubNavBarProps> = ({ patientId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { 
      label: 'Profile', 
      href: `/dashboard/patients/${patientId}`,
    },
    { 
      label: 'Clinic', 
      href: `/dashboard/patients/${patientId}/clinic`,
    },
    { 
      label: 'Medical Records', 
      href: `/dashboard/patients/${patientId}/medical-records`,
    },
    { 
      label: 'Attendance', 
      href: `/dashboard/patients/${patientId}/attendance`,
    },
    { 
      label: 'Injection', 
      href: `/dashboard/patients/${patientId}/injection`,
    },
    { 
      label: 'Admit', 
      href: `/dashboard/patients/${patientId}/admit`,
    },
  ]

  const activeItem = navItems.find(item => pathname === item.href)

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-full shadow-sm p-1.5">
      {/* Mobile View - Dropdown */}
      <div className="relative md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-700 flex items-center justify-between"
        >
          <span>{activeItem?.label || 'Menu'}</span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 py-1 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    block px-4 py-2 text-sm transition-colors
                    ${
                      isActive
                        ? 'bg-violet-50 text-violet-600'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                    }
                  `}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Desktop View - Horizontal Navigation */}
      <nav className="hidden md:flex gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                px-6 py-2 text-sm font-medium rounded-full transition-colors
                ${
                  isActive
                    ? 'bg-violet-600 text-white'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }
              `}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default SubNavBar