import React from 'react';

const ResponsibilityForm = () => {
  return (
    <div className="p-6 bg-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">RESPONSIBILITY</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Doctor Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Doctor name</label>
          <input
            type="text"
            placeholder="Enter full name of doctor"
            className="w-full px-3 py-2 rounded-lg bg-purple-50/50 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        {/* Nurse Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nurse name</label>
          <input
            type="text"
            placeholder="Enter full name of Nurse"
            className="w-full px-3 py-2 rounded-lg bg-purple-50/50 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        {/* Social Worker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Social Worker</label>
          <input
            type="text"
            placeholder="Enter full name of worker"
            className="w-full px-3 py-2 rounded-lg bg-purple-50/50 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        {/* Drug Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Drug Type</label>
          <div className="relative">
            <select
              className="w-full px-3 py-2 rounded-lg bg-purple-50/50 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/20 appearance-none"
            >
              <option value="">Select drug type</option>
              {/* Add drug type options here */}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Date"
              className="w-full px-3 py-2 rounded-lg bg-purple-50/50 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Next Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Next Date</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Date"
              className="w-full px-3 py-2 rounded-lg bg-purple-50/50 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
          Save
        </button>
      </div>
    </div>
  );
};

export default ResponsibilityForm;