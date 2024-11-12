'use client'
import { useState } from 'react'

const PatientInjectionSheet = () => {
  const [dateRange, setDateRange] = useState('')
  const [count, setCount] = useState(10)

  // Sample data - replace with actual data fetching
  const patients = [
    {
      name: 'Leeth schakenjiha',
      contactNumber: '0987654321',
      email: '@gmail.com',
      location: 'General'
    },
    {
      name: 'Leeth schakenjiha',
      contactNumber: '0987654321',
      email: '@gmail.com',
      location: 'General'
    },
    {
      name: 'Leeth schakenjiha',
      contactNumber: '0987654321',
      email: '@gmail.com',
      location: 'General'
    },
    {
      name: 'Leeth schakenjiha',
      contactNumber: '0987654321',
      email: '@gmail.com',
      location: 'General'
    },
    {
      name: 'Leeth schakenjiha',
      contactNumber: '0987654321',
      email: '@gmail.com',
      location: 'General'
    }
  ]

  return (
    <div className="p-6 min-h-screen text-black">
      <h1 className="text-lg font-semibold mb-6">PATIENT'S INJECTION SHEET</h1>
      
      {/* Search Section */}
      <div className="flex gap-4 mb-8 bg-white p-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-2">
            Select time period
          </label>
          <input
            type="text"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Select date range"
          />
        </div>
        <div className="w-24">
          <label className="block text-sm text-gray-600 mb-2">Count</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button className="px-6 py-2 bg-purple-600 text-white rounded-md self-end">
          Search
        </button>
      </div>

      {/* Details Section */}
      <div className="mb-6 bg-white p-4 mt-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">DETAILS (ALL)</h2>
          <div className="flex items-center gap-2">
            <button className="p-1 border border-gray-300 rounded">
              &#x2190;
            </button>
            <span className="text-sm">1 2 ... 10</span>
            <button className="p-1 border border-gray-300 rounded">
              &#x2192;
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Date</th>
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">Contact Number</th>
                <th className="text-left py-3 px-4 font-medium">Location</th>
                <th className="text-left py-3 px-4 font-medium">Injection</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4">12/11/2024</td>
                  <td className="py-3 px-4">{patient.name}</td>
                  <td className="py-3 px-4">{patient.contactNumber}</td>
                  <td className="py-3 px-4">{patient.email}</td>
                  <td className="py-3 px-4">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      ✎
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PatientInjectionSheet