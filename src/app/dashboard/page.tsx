
'use client'

import { StatsCard } from '@/components/dashboard/StatsCard'
import { OverviewCard } from '@/components/dashboard/HospitalOverview'
import doctor from '../../../public/doctor.png'
import avatar from '../../../public/avatar.png'
import Image from 'next/image'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { useEffect, useState } from 'react'

ChartJS.register(ArcElement, Tooltip, Legend);

type StatsType = {
  doctors: number;
  nurses: number;
  patients: number;
  staff: number;
  admit:number;
  clinic:number;
  injection:number;
  male:number;
  female:number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<StatsType>({
    doctors: 0,
    nurses: 0,
    patients: 0,
    staff: 0,
    admit:0,
    clinic:0,
    injection:0,
    male:0,
    female:0
  });
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard',{
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        console.log(data)
        setStats(data);
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchData();
  }, []);
  const data = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Gender Distribution',
        data: [stats.male, stats.female], // Adjust values as needed
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
      <div
        className="relative rounded-lg overflow-hidden mb-8 shadow-lg hidden sm:hidden md:block"
        style={{
          backgroundImage: `url(${avatar.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="h-48 flex items-center px-8 relative">
          <div className="flex items-center justify-between gap-8 z-10">
            <div className="w-20 h-20 sm:w-32 sm:h-32 md:w-22 md:h-22 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg z-10">
              <Image
                src={doctor}
                alt="Doctor"
                className="object-cover w-full h-full"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">YOUR HEALTH IS OUR PRIORITY</h1>
              <p className="text-white">
              We always give the best for your life and health. Let&apos;s take better care of our own health from an early age.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      
        {[
          { name: 'Doctor', title: 'Total Doctors', value: `${stats.doctors || 0}+`, icon: '👨‍⚕️' },
          { name: 'Nurse', title: 'Total Nurses', value: `${stats.nurses || 0}+`, icon: '👩‍⚕️' },
          { name: 'Patient', title: 'Total Patients', value: `${stats.patients || 0}+`, icon: '🏥' },
          { name: 'Staff', title: 'Total Staff', value: `${stats.staff || 0}+`, icon: '👥' },
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
              { title: "Total Patients",count:`${stats.patients || 0}+`, icon: "👤" },
              { title: "Admit Patients", count:`${stats.admit || 0}+`, icon: "📋" },
              { title: "Clinic Patients", count:`${stats.clinic || 0}+`, icon: "🏥" },
              { title: "Injection Count", count:`${stats.injection || 0}+`, icon: "💉" },
              { title: "Total doctors", count:`${stats.doctors || 0}+`, icon: "👨‍⚕️" },
              { title: "Total Staff", count:`${stats.staff || 0}+`, icon: "👥" },
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
