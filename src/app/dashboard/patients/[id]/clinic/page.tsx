'use client'

import React, { useState } from 'react';

const PrescriptionUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [clinicDate, setClinicDate] = useState('');
  const [nextClinicDate, setNextClinicDate] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles([...selectedFiles, ...Array.from(files).filter(
        (file) => file.type === 'image/png' || file.type === 'image/jpeg'
      )]);
    }
  };

  const handleBrowseClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    console.log('Saving prescription data:', {
      selectedFiles,
      clinicDate,
      nextClinicDate,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-6">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold mb-2 text-black">
            ADD PRESCRIPTION IMAGES
          </h2>
        </div>

        {/* Uploaded Files Preview */}
        <div className="overflow-y-auto max-h-64 grid grid-cols-2 md:grid-cols-4 gap-4">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`Uploaded File ${index + 1}`}
                className="object-cover w-full h-full"
              />
              <button
                className="absolute top-2 right-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                onClick={() => handleRemoveFile(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept=".png,.jpg,.jpeg"
            multiple
            onChange={handleFileUpload}
          />
          <p className="text-black mb-2">Upload Prescription Images here</p>
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
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">CLINIC DATE</label>
            <div className="relative">
              <input
                type="date"
                value={clinicDate}
                onChange={(e) => setClinicDate(e.target.value)}
                className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              NEXT CLINIC DATE
            </label>
            <div className="relative">
              <input
                type="date"
                value={nextClinicDate}
                onChange={(e) => setNextClinicDate(e.target.value)}
                className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-purple-600 text-white px-8 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionUpload;
