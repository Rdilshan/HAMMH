import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { headers } from "next/headers";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const headersList = headers();
  const role = (await headersList).get("X-Role");
  const userid = (await headersList).get("X-Id");

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8F3FF]">
      {/* Sidebar with proper mobile handling */}
      <div className="w-full md:w-64 md:min-h-screen md:flex-shrink-0">
        <Sidebar role={role ?? ''} userid={userid ?? ''} />
      </div>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Navbar */}
        <div className="w-full">
          <Navbar role={role ?? ''} userid={userid ?? ''} />
        </div>
        
        {/* Main content area with adjusted padding */}
        <main className="flex-1 px-2 md:px-6 pt-16 overflow-auto">
          <div className="max-w-full pl-12 min:">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}