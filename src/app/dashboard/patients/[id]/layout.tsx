'use client'

import { ReactNode } from 'react'
import SubNavBar from '@/components/patient/SubNavBar'
import { useParams } from 'next/navigation'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const params = useParams()
  const patientId = params.id as string

  return (
    <div className="min-h-screen bg-[#F8F3FF] px-4">
      <div className="sticky top-4 z-10 py-4">
        <SubNavBar patientId={patientId} />
      </div>
    
      <main className="max-w-5xl mx-auto py-6">
        {children}
      </main>
    </div>
  )
}