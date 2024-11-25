'use client'

import React, { useState } from 'react';
import Image from 'next/image';

const DoctorRegister = () => {
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [gender, setGender] = useState('Male');
  const [profileImage, setProfileImage] = useState<any>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    console.log({
      fullName,
      contactNumber,
      email,
      specialization,
      gender,
      profileImage,
    });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); 
    }
  };

  return (
    <div className="px-6 py-4 text-black">
     
      <form onSubmit={handleSubmit}>
      
        <div className=" bg-white p-5 rounded-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">DOCTOR REGISTER</h2>
           <div className='grid md:grid-cols-2 gap-4'>

        
          <div>
            <label htmlFor="fullName" className="block mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter full name of doctor"
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="contactNumber" className="block mb-2">
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              placeholder="Enter Contact Number"
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter the email"
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="specialization" className="block mb-2">
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              placeholder="Enter specialization"
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="gender" className="block mb-2">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="profileImage" className="block mb-2">
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {profileImage && (
              <div className="mt-2">
                <Image
                  src={profileImage}
                  alt="Profile Preview"
                  className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white rounded-md py-2 px-4 mt-4"
          >
            Register Doctor
          </button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default DoctorRegister;
