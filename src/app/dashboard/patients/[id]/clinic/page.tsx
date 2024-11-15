'use client'

import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const PrescriptionUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [clinicDate, setClinicDate] = useState('');
  const [nextClinicDate, setNextClinicDate] = useState('');

  const handleFileUpload = (event :any) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setSelectedFile(file);
    }
  };

  const handleBrowseClick = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-6">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold mb-2">ADD PRESCRIPTION IMAGE</h2>
        </div>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept=".png,.jpg,.jpeg"
            onChange={handleFileUpload}
          />
          <p className="text-gray-600 mb-2">Upload Prescription Image in here</p>
          <p className="text-sm text-gray-400 mb-4">File Supported: png,jpg,jpeg</p>
          <p className="text-gray-500 mb-4">OR</p>
          <button
            onClick={handleBrowseClick}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Browse
          </button>
        </div>

        {/* Date Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">CLINIC DATE</label>
            <div className="relative">
              <input
                type="date"
                value={clinicDate}
                onChange={(e) => setClinicDate(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg pr-10"
              />
              <Calendar className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">NEXT CLINIC DATE</label>
            <div className="relative">
              <input
                type="date"
                value={nextClinicDate}
                onChange={(e) => setNextClinicDate(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg pr-10"
              />
              <Calendar className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-purple-600 text-white px-8 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionUpload;