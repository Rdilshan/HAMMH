'use client'

import { StatsCard } from '@/components/dashboard/StatsCard'
import { OverviewCard } from '@/components/dashboard/HospitalOverview'
import doctor from '../../../public/doctor.png'
import Image from 'next/image'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const data = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Gender Distribution',
        data: [60, 40], // Adjust values as needed
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const, // Cast position as const to avoid type errors
      },
    },
  };

  return (
    <div className="p-6 min-h-screen text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden mb-8 shadow-lg">
        <div className="bg-gradient-to-r from-[#6800E9] to-[#3a0a73] h-48 flex items-center px-8 relative">
          <div className="absolute inset-0 bg-[url('/molecules-bg.png')] opacity-20" />
          <div className="flex items-center justify-between gap-8 z-10">
            <div className="w-40 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={doctor}
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
            <h1 className="text-3xl font-bold text-white">YOUR HEALTH IS OUR PRIORITY</h1>
            <p>We always give the best for you life and health. Let's take better care of our own health from and early age.</p>
            </div>
            
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
          <h2 className="text-xl font-bold mb-4 text-black">HOSPITAL OVERVIEW</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {[
              { title: "New Patients", count: 4, icon: "👤" },
              { title: "Admin Patients", count: 80, icon: "📋" },
              { title: "Clinic Patients", count: 500, icon: "🏥" },
              { title: "Injection Count", count: 500, icon: "💉" },
              { title: "Risk Patient", count: 500, icon: "⚠️" },
              { title: "Risk Patient", count: 500, icon: "⚠️" },
            ].map((overview, index) => (
              <OverviewCard key={index} {...overview} />
            ))}
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="flex-none">
          <h2 className="text-xl font-bold mb-4 text-black">Gender Distribution</h2>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <Doughnut data={data} options={options} height={300} />
          </div>
        </div>
      </div>
    </div>
  )
}
