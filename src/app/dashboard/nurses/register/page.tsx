'use client';

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const NurseRegister = () => {
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const baseUrl = '/api/Nurse'; 

    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          telephone: contactNumber,
          gender: gender,
        }),
      });

      if (response.ok) {
        toast.success('Nurse registered successfully!');
        setTimeout(() => {
          router.push('/dashboard/nurses'); 
        }, 1000);
        
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to register nurse!');
      }
    } catch (error) {
      console.log(error)
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-6 py-4 text-black">
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-8 shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">NURSE REGISTER</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter full name of nurse"
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
              <label htmlFor="gender" className="block mb-2">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-purple-600 text-white rounded-md py-2 px-4 mt-4 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Registering...' : 'Register Nurse'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NurseRegister;
