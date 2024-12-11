import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { headers } from "next/headers";

export default async function DashboardLayout({ children }: { children: ReactNode }) {

  const headersList = headers();
  const role = (await headersList).get("X-Role") ;
  const userid = (await headersList).get("X-Id") ;


  return (
    <div className="min-h-screen bg-[#F8F3FF] flex flex-col sm:flex-row">
      <Sidebar role={role ?? ''} userid={userid ?? ''} />
      <div className="flex flex-col flex-grow">
        <Navbar  role={role ?? ''} userid={userid ?? ''} />
        <main className="ml-14 md:ml-64 pt-16 pl-1">
          {children}
        </main>
      </div>
    </div>
  );
}
