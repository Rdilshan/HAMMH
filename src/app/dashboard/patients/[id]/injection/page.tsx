import React from 'react';

const InjectionRecordsSection = () => {
  // This could be fetched from an API in a real application
  const nextInjectionDate = "11:27 AM ,Thursday, October 31, 2024";
  
  return (
    <div className="p-6 space-y-6">
      {/* Next Injection Date Card */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="text-gray-700">
          <span className="font-medium">Next Injection date: </span>
          <span className="text-red-500">{nextInjectionDate}</span>
        </div>
      </div>

      {/* Injection Records Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">INJECTION RECORDS</h2>
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Add new records
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Injection</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Doctor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Nurse</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Social worker</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Table rows would be dynamically populated here */}
              <tr className="border-b hover:bg-gray-50 transition-colors duration-150">
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4"></td>
                <td className="py-3 px-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InjectionRecordsSection;