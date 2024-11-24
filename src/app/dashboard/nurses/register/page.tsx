'use client'

import React, { useState } from 'react';

const NurseRegister = () => {
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      fullName,
      contactNumber,
      email,
      gender,
    });
  };

  return (
    <div className="px-6 py-4 text-black">
      <h2 className="text-2xl font-bold mb-4">NURSE REGISTER</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 bg-white p-4">
          <div>
            <label htmlFor="fullName" className="block mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter full name of nurse"
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
          <button
            type="submit"
            className="bg-purple-600 text-white rounded-md py-2 px-4 mt-4"
          >
            Register Nurse
          </button>
        </div>
      </form>
    </div>
  );
};

export default NurseRegister;
