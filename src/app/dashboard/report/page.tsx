'use client';

import React, { useState } from 'react';

const ReportGenerate = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setendDate] = useState('');
  const [reportType, setReportType] = useState(''); // New state for report type

  return (
    <div className="bg-white mt-6 mx-4 rounded-lg shadow-md p-8">
      <div className="">
        <h2 className="text-black text-lg font-semibold mb-4">Generate Report</h2>

        {/* Select Report Type */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">Select Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-lg text-gray-500"
          >
            <option value="" disabled>
              -- Choose Report Type --
            </option>
            <option value="daily">Daily Report</option>
            <option value="weekly">Weekly Report</option>
            <option value="monthly">Monthly Report</option>
            <option value="custom">Custom Report</option>
          </select>
        </div>

        {/* Date Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Clinic Date</label>
            <div className="relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg text-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Next Clinic Date</label>
            <div className="relative">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setendDate(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-purple-600 text-white px-8 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Genarate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerate;
