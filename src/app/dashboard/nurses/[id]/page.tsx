'use client'

import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';


interface ApiResponse {
  nurse: Nurse;
  message?: string;
  data?: string;
  error?: string;
}
interface Nurse {
  name:string;
  telephone:string;
  email:string;
  gender:string;
}

const Nurseedit = () => {
  const { id } = useParams(); 
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male');
  const router = useRouter();

  // Fetch doctor data if editing an existing doctor
  useEffect(() => {
    if (id) {
      const fetchDoctorData = async () => {
        const response = await fetch(`/api/Nurse/${id}`);
        const data: ApiResponse = await response.json();
        
        
        if (data) {
          
          setFullName(data.nurse.name);
          setContactNumber(data.nurse.telephone);
          setEmail(data.nurse.email);
          setGender(data.nurse.gender);
        } else {
            toast.error('Failed to fetch doctor data.');
        }
      };

      fetchDoctorData();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const method = id ? 'PUT' : 'POST'; // Use PUT if editing, POST if creating
    const baseUrl = id ? `/api/Nurse/${id}` : '/api/Nurse';

    const response = await fetch(baseUrl, {
      method: method,
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

    const data: ApiResponse = await response.json();

    if (response.status === 200) {
      toast.success(id ? 'Nurse updated successfully!' : 'Nurse registered successfully!');
      router.push('/dashboard/nurses');
    } else {
      toast.error(data.error || 'Error in submission, please check your fields.');
    }
  };

  return (
    <div className="px-6 py-4 text-black">
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-5 rounded-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{id ? 'Edit Nurse' : 'Register Nurse'}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block mb-2">Full Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter full name of Nurse"
                className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="contactNumber" className="block mb-2">Contact Number</label>
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
              <label htmlFor="email" className="block mb-2">Email</label>
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
              <label htmlFor="gender" className="block mb-2">Gender</label>
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
              className="bg-purple-600 text-white rounded-md py-2 px-4 mt-4"
            >
              {id ? 'Update Nurse' : 'Register Nurse'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default Nurseedit;
