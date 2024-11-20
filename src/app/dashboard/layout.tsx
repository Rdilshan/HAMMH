import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F3FF] flex">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Navbar />
        <main className="ml-14 sm:ml-64 pt-16 pl-1">
          {children}
        </main>
      </div>
    </div>
  );
}
