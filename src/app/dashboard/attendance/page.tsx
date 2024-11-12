'use client'
import { useState } from 'react'

const PatientAttendanceSheet = () => {
  const [dateRange, setDateRange] = useState('')
  const [count, setCount] = useState(10)
  
  const patients = [
    {
      name: 'Lasith subasingha',
      contactNumber: '0878757875',
      email: '@gmail.com'
    },
    {
      name: 'Lasith subasingha',
      contactNumber: '0878757875',
      email: '@gmail.com'
    },
    {
      name: 'Lasith subasingha',
      contactNumber: '0878757875',
      email: '@gmail.com'
    },
    {
      name: 'Lasith subasingha',
      contactNumber: '0878757875',
      email: '@gmail.com'
    },
    {
      name: 'Lasith subasingha',
      contactNumber: '0878757875',
      email: '@gmail.com'
    },
    {
      name: 'Lasith subasingha',
      contactNumber: '0878757875',
      email: '@gmail.com'
    }
  ]

  return (
    <div className="p-6 min-h-scree">
      <h1 className="text-xl font-medium mb-8 text-gray-800">PATIENTS ATTENDANCE SHEET</h1>
      
      {/* Search Panel */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-2">
              Select time period
            </label>
            <div className="relative">
              <input
                type="text"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                placeholder="Drop-down"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-md"
              />
            </div>
          </div>
          <div className="w-32">
            <label className="block text-sm text-gray-600 mb-2">
              Count
            </label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-md"
            />
          </div>
          <button className="px-8 py-2.5 bg-violet-600 text-white rounded-md hover:bg-violet-700">
            Search
          </button>
        </div>
      </div>

      {/* Details Panel */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-medium text-gray-800">DETAILS (ALL)</h2>
          <div className="flex items-center gap-1 text-sm">
            <button className="p-1 text-gray-500">
              &#8249;
            </button>
            <button className="px-2 py-1 text-gray-600">1</button>
            <button className="px-2 py-1 text-gray-600">2</button>
            <span className="px-2 py-1">...</span>
            <button className="px-2 py-1 text-gray-600">10</button>
            <button className="p-1 text-gray-500">
              &#8250;
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Contact Number</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Option</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index} className="border-b border-gray-50">
                  <td className="py-4 px-4 text-gray-600"></td>
                  <td className="py-4 px-4 text-gray-600">{patient.name}</td>
                  <td className="py-4 px-4 text-gray-600">{patient.contactNumber}</td>
                  <td className="py-4 px-4 text-gray-600">{patient.email}</td>
                  <td className="py-4 px-4">
                    <button className="text-gray-500 hover:text-gray-700">
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

export default PatientAttendanceSheet