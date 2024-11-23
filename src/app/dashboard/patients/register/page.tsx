'use client'

import React, { useState } from 'react';

const PatientRegister = () => {
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [sourceOfReferral, setSourceOfReferral] = useState('OPD');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      fullName,
      contactNumber,
      address,
      age,
      gender,
      sourceOfReferral,
    });
  };
//ugug
  return (
    <div className="px-6 py-4 text-black">
      <h2 className="text-2xl font-bold mb-4">PATIENT REGISTER</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 bg-white p-4">
          <div>
            <label htmlFor="fullName" className="block mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter full name of patient"
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
            <label htmlFor="address" className="block mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter the address"
              className="w-full bg-gray-100 rounded-md py-2 px-4"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="age" className="block mb-2">
              Age
            </label>
            <input
              type="number"
              id="age"
              placeholder="Enter the age"
              className="w-full bg-gray-100 rounded-md py-2 px-4"
              value={age}
              onChange={(e) => setAge(e.target.value)}
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
            <label htmlFor="sourceOfReferral" className="block mb-2">
              Source Of Referral
            </label>
            <select
              id="sourceOfReferral"
              value={sourceOfReferral}
              onChange={(e) => setSourceOfReferral(e.target.value)}
              className="w-full bg-gray-100 rounded-md py-2 px-4"
            >
              <option value="OPD">OPD</option>
              <option value="Emergency">Emergency</option>
              <option value="Walk-in">Walk-in</option>
            </select>
          </div>
          <button
          type="submit"
          className="bg-purple-600 text-white rounded-md py-2 px-4 mt-4"
        >
          Register Patient
        </button>
        </div>
        
      </form>
    </div>
  );
};

export default PatientRegister;