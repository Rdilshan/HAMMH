'use client';

import React, { useState } from 'react';
import { handleFile } from 'docfillx';
import toast, { Toaster } from "react-hot-toast";


const ReportGenerate = () => {

  const [startDate, setStartDate] = useState('');
  const [endDate, setendDate] = useState('');

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select a valid date range.");
      return;
    }
  
    const baseUrl = `/api/report`;
    const fetchReportPromise = fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start_date: startDate,
        end_date: endDate,
      }),
    }).then(async (response) => {
      const datares = await response.json();
      if (response.status !== 200) {
        throw new Error(datares?.message || "Failed to generate the report.");
      }
      return datares.data; // Return report data on success
    });
  
    // Use toast.promise for feedback
    toast.promise(fetchReportPromise, {
      loading: "Generating report...",
      success: "Report generated successfully!",
      error: "An error occurred while generating the report.",
    }).then((data) => {
      // Handle the file after successful fetch
      handleFile("../Report.docx", data);
    }).catch((error) => {
      console.error("Report generation failed:", error);
      // Optional: Add any custom error handling logic here
    });
  };
  

  return (
    <div className="bg-white mt-6 mx-4 rounded-lg shadow-md p-8">
      <Toaster />
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
