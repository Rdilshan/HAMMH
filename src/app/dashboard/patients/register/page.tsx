'use client'

import React, { useState } from 'react';

const PatientRegister = () => {
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [nic, setnic] = useState('nic');
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
      nic,
      sourceOfReferral,
    });
  };
//ugug
  return (
    <div className="px-6 py-4 text-black ">
      
      <form onSubmit={handleSubmit}>
        <div className="p-8 bg-white  shadow-md rounded-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">PATIENT REGISTER</h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 '>
          <div>
            <label htmlFor="fullName" className="block mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter full name of patient"
              className="w-full px-4 py-3 rounded-lg bg-[#F8F3FF] border-0 
              placeholder-gray-400 text-gray-900 focus:ring-2 
              focus:ring-gray-400 transition duration-150 outline-none"
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
              className="w-full px-4 py-3 rounded-lg bg-[#F8F3FF] border-0 
              placeholder-gray-400 text-gray-900 focus:ring-2 
              focus:ring-gray-400 transition duration-150 outline-none"
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
              className="w-full px-4 py-3 rounded-lg bg-[#F8F3FF] border-0 
              placeholder-gray-400 text-gray-900 focus:ring-2 
              focus:ring-gray-400 transition duration-150 outline-none"
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
              className="w-full px-4 py-3 rounded-lg bg-[#F8F3FF] border-0 
              placeholder-gray-400 text-gray-900 focus:ring-2 
              focus:ring-gray-400 transition duration-150 outline-none"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="nic" className="block mb-2">
              NIC
            </label>
            <input
              type="number"
              id="nic"
              placeholder="Enter the NIC number"
              className="w-full px-4 py-3 rounded-lg bg-[#F8F3FF] border-0 
              placeholder-gray-400 text-gray-900 focus:ring-2 
              focus:ring-gray-400 transition duration-150 outline-none"
              value={nic}
              onChange={(e) => setnic(e.target.value)}
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
              className="w-full px-4 py-3 rounded-lg bg-[#F8F3FF] border-0 
              placeholder-gray-400 text-gray-900 focus:ring-2 
              focus:ring-gray-400 transition duration-150 outline-none"
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
              className="w-full px-4 py-3 rounded-lg bg-[#F8F3FF] border-0 
              placeholder-gray-400 text-gray-900 focus:ring-2 
              focus:ring-gray-400 transition duration-150 outline-none"
            >
              <option value="OPD">OPD</option>
              <option value="Emergency">Emergency</option>
              <option value="Walk-in">Walk-in</option>
            </select>
          </div>

         
          </div>
          <button
          type="submit"
          className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg 
          hover:bg-purple-700 focus:outline-none focus:ring-2 
          focus:ring-purple-500 focus:ring-offset-2 transition duration-150 
          w-1/2 my-6"
        >
          Register Patient
        </button>
          
         
        </div>
        
        
      </form>
    </div>
  );
};

export default PatientRegister;