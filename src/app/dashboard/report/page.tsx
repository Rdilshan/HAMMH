'use client';

import React, { useState } from 'react';
import {handleFile} from 'docfillx';


const ReportGenerate = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setendDate] = useState('');

  const handleGenerateReport = () => {
    handleFile("../Report.docx",{data:"Report"})
  };

  return (
    <div className="bg-white mt-6 mx-4 rounded-lg shadow-md p-8">
      <div className="">
        <h2 className="text-black text-lg font-semibold mb-4">Generate Report</h2>

        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Start Date</label>
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
            <label className="block text-sm text-gray-600 mb-2">End Date</label>
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
          <button className="bg-purple-600 text-white px-8 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            onClick={handleGenerateReport} >
            Genarate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerate;
