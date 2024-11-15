import { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F3FF]">
      <Sidebar />
      <Navbar />
      <main className="ml-64 pt-16 p-8">
        {children}
      </main>
    </div>
  )
}