'use client'

import React, { useState } from 'react';

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
      <h2 className="text-2xl font-bold mb-4">DOCTOR REGISTER</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 bg-white p-4">
          <div>
            <label htmlFor="fullName" className="block mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter full name of doctor"
              className="w-full bg-gray-100 rounded-md py-2 px-4"
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
              className="w-full bg-gray-100 rounded-md py-2 px-4"
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
              className="w-full bg-gray-100 rounded-md py-2 px-4"
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
              className="w-full bg-gray-100 rounded-md py-2 px-4"
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
              className="w-full bg-gray-100 rounded-md py-2 px-4"
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
              className="w-full bg-gray-100 rounded-md py-2 px-4"
            />
            {profileImage && (
              <div className="mt-2">
                <img
                  src={profileImage}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-full"
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
      </form>
    </div>
  );
};

export default DoctorRegister;
