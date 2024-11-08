'use client'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { OverviewCard } from '@/components/dashboard/HospitalOverview'
import doctor from '../../../public/doctor.png'
import Image from 'next/image'

export default function Dashboard() {
  return (
    <div className="p-6 min-h-screen text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden mb-8 shadow-lg">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 flex items-center px-8 relative">
          <div className="absolute inset-0 bg-[url('/molecules-bg.png')] opacity-20" />
          <div className="flex items-center gap-6 z-10">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={doctor}
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold text-white">YOUR HEALTH IS OUR PRIORITY</h1>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Doctors", value: "10+", icon: "👨‍⚕️" },
          { title: "Total Nurses", value: "20+", icon: "👩‍⚕️" },
          { title: "Total Patients", value: "300+", icon: "🏥" },
          { title: "Total Staff", value: "60+", icon: "👥" },
        ].map((stat, index) => (
          <StatsCard key={index} {...stat} trend={80} />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Hospital Overview */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">HOSPITAL OVERVIEW</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { title: "New Patients", count: 4, icon: "👤" },
              { title: "Admin Patients", count: 80, icon: "📋" },
              { title: "Clinic Patients", count: 500, icon: "🏥" },
              { title: "Injection Count", count: 500, icon: "💉" },
              { title: "Risk Patient", count: 500, icon: "⚠️" },
            ].map((overview, index) => (
              <OverviewCard key={index} {...overview} />
            ))}
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">GENDER DISTRIBUTION</h2>
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-8 border-purple-500" />
              <div className="absolute inset-0 rounded-full border-8 border-blue-500 border-l-transparent border-b-transparent rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">100%</span>
              </div>
            </div>
            <div className="flex justify-center gap-8 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span>Female (60%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Male (40%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
