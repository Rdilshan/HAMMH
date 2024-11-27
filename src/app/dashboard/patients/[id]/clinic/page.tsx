'use client';

import React, { useState } from 'react';

const PrescriptionUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [clinicDate, setClinicDate] = useState('');
  const [nextClinicDate, setNextClinicDate] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles([
        ...selectedFiles,
        ...Array.from(files).filter(
          (file) => file.type === 'image/png' || file.type === 'image/jpeg'
        ),
      ]);
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

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    setSelectedFiles([
      ...selectedFiles,
      ...Array.from(files).filter(
        (file) => file.type === 'image/png' || file.type === 'image/jpeg'
      ),
    ]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative h-screen flex flex-col">
      <div className="space-y-6 ">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold mb-2 text-black">
            ADD PRESCRIPTION IMAGES
          </h2>
        </div>

        {/* Drag and Drop Upload Area */}
        <div
          className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center flex flex-col justify-center items-center flex-grow"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* Display Uploaded Files */}
          {selectedFiles.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-60 overflow-y-auto w-full ">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded File ${index + 1}`}
                    className="max-w-full max-h-full object-cover"
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
          )}

          {/* File Input for Upload */}
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept=".png,.jpg,.jpeg"
            multiple
            onChange={handleFileUpload}
          />

          {/* Instructions and Button */}
          {selectedFiles.length === 0 && (
            <div className="text-center">
              <p className="text-black mb-2">Upload Prescription Images here</p>
              <p className="text-sm text-gray-400 mb-4">
                File Supported: png, jpg, jpeg
              </p>
              <p className="text-gray-500 mb-4">OR</p>
              <button
                onClick={handleBrowseClick}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Browse
              </button>
            </div>
          )}
            {selectedFiles.length > 0 && (
            <div className="flex justify-center mt-4 w-full my-7">
              <button
                onClick={handleBrowseClick}
                className="text-purple-600 hover:text-purple-700 font-medium flex items-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="mr-2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Upload More
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Date and Save Button Section */}
      <div className=" w-full py-6 px-4 rounded-lg shadow-lg absolute bottom-[180px] left-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-100 mb-2">CLINIC DATE</label>
            <input
              type="date"
              value={clinicDate}
              onChange={(e) => setClinicDate(e.target.value)}
              className="text-sm w-full px-4 py-2 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-100 mb-2">
              NEXT CLINIC DATE
            </label>
            <input
              type="date"
              value={nextClinicDate}
              onChange={(e) => setNextClinicDate(e.target.value)}
              className="text-sm w-full px-4 py-2 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-500"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
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
