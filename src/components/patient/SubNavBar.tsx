'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SubNavBarProps {
  patientId: string
}

const SubNavBar: React.FC<SubNavBarProps> = ({ patientId }) => {
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

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-full shadow-sm p-1.5">
      <nav className="flex gap-1">
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