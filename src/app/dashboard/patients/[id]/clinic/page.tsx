'use client';

import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../../firebase_config'; 

const PrescriptionUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [clinicDate, setClinicDate] = useState('');
  const [nextClinicDate, setNextClinicDate] = useState('');
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  
  // New state for tracking upload progress
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});

  useEffect(() => {
    if (selectedFiles.length > 0) {
      uploadImagesToFirebase();
    }
  }, [selectedFiles]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const validFiles = Array.from(files).filter(
      (file) => file.type === 'image/png' || file.type === 'image/jpeg'
    );
    setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const uploadImagesToFirebase = async () => {
    try {
      // Filter out files that haven't been uploaded yet
      const filesToUpload = selectedFiles.filter(
        (file) => !uploadedImageUrls.some((url) => url.includes(file.name))
      );

      const uploadPromises = filesToUpload.map(async (file) => {
        const storageRef = ref(storage, `prescriptions/${Date.now()}_${file.name}`);
        
        // Use uploadBytesResumable for progress tracking
        return new Promise<string>((resolve, reject) => {
          const uploadTask = uploadBytesResumable(storageRef, file);

          // Track upload progress
          uploadTask.on('state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(prev => ({
                ...prev,
                [file.name]: Math.round(progress)
              }));
            },
            (error) => {
              console.error('Upload error:', error);
              reject(error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                // Remove progress for completed upload
                setUploadProgress(prev => {
                  const newProgress = {...prev};
                  delete newProgress[file.name];
                  return newProgress;
                });
                resolve(downloadURL);
              } catch (error) {
                reject(error);
              }
            }
          );
        });
      });

      const newUrls = await Promise.all(uploadPromises);
      
      // Combine new URLs with existing URLs
      const updatedUrls = [...uploadedImageUrls, ...newUrls];
      setUploadedImageUrls(updatedUrls);
      console.log('Uploaded Image URLs:', updatedUrls);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).filter(
        (file) => file.type === 'image/png' || file.type === 'image/jpeg'
      );
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleBrowseClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleRemoveFile = (index: number) => {
    const removedFile = selectedFiles[index];
    
    // Remove the file from selected files
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    
    // Remove the corresponding URL from uploaded URLs
    setUploadedImageUrls(prevUrls => 
      prevUrls.filter(url => !url.includes(removedFile.name))
    );

    // Remove progress for removed file
    setUploadProgress(prev => {
      const newProgress = {...prev};
      delete newProgress[removedFile.name];
      return newProgress;
    });
  };

  const handleSave = async () => {
    console.log('Saving prescription data:', {
      selectedFiles,
      clinicDate,
      nextClinicDate,
      uploadedImageUrls,
    });
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
          {/* Display Uploaded Files with Progress */}
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
                  {/* Progress Bar */}
                  {uploadProgress[file.name] !== undefined && (
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-300">
                      <div 
                        className="h-full bg-black" 
                        style={{width: `${uploadProgress[file.name]}%`}}
                      ></div>
                    </div>
                  )}
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

          {/* Rest of the component remains the same */}
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