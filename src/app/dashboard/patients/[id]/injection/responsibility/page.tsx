'use client'
import React, { useState } from "react";
import { useRouter, useParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const ResponsibilityForm = () => {
  const { id } = useParams();
  const [doctorName , setdoctorName ] = useState('');
  const [nurseName, setnurseName] = useState('');
  const [socialWorkers, setsocialWorkers] = useState('');
  const [drugType, setdrugType] = useState('');
  const [Date ,setDate ] = useState('');
  const [NextDate ,setNextDate ] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
 
 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
        setIsLoading(true);
        try {
          const baseUrl = `/api/patient/${id}/Injection`;
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctorName:doctorName,
                    nurseName:nurseName,
                    socialWorkers:socialWorkers,
                    drugType:drugType,
                    Date:Date,
                    NextDate:NextDate,
                    patient_id: Number(`${id}`),
                }),
            });

           
            let data = null;
            if (response.headers.get('Content-Type')?.includes('application/json')) {
                data = await response.json();
            }

            if (response.ok) {
                toast.success('Admit registered successfully!');
                setTimeout(() => {
                    router.push('/dashboard/patients');
                }, 500);
            } else {
                const errorMsg = data?.error;
                toast.error(errorMsg);
                console.error(errorMsg);
            }
        } catch (error) {
            toast.error('An error occurred while saving!');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };




  return (
    
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
        <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Responsibility</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
        <div>
          <label
            htmlFor="doctorName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Doctor Name
          </label>
          <input
            type="text"
            id="doctorName"
            name="doctorName"
            value={doctorName}
            onChange={(e) => setdoctorName(e.target.value)}
            placeholder="Enter full name of doctor"
            className="w-full px-3 py-2 rounded-lg bg-[#F8F3FF] text-black outline-none "
          />
        </div>

        {/* Nurse Name */}
        <div>
          <label
            htmlFor="nurseName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nurse Name
          </label>
          <input
            type="text"
            id="nurseName"
            name="nurseName"
            value={nurseName}
            onChange={(e) => setnurseName(e.target.value)}
            placeholder="Enter full name of nurse"
            className="w-full px-3 py-2 rounded-lg bg-[#F8F3FF] text-black outline-none"
          />
        </div>

        {/* Social Worker */}
        <div>
          <label
            htmlFor="socialWorker"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Social Worker
          </label>
          <input
            type="text"
            id="socialWorkers"
            name="socialWorkers"
            value={socialWorkers}
            onChange={(e) => setsocialWorkers(e.target.value)}
            placeholder="Enter full name of worker"
            className="w-full px-3 py-2 rounded-lg bg-[#F8F3FF] text-black outline-none"
          />
        </div>

        {/* Drug Type */}
        <div>
          <label
            htmlFor="drugType"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Drug Type
          </label>
          <select
            id="drugType"
            name="drugType"
            value={drugType}
            onChange={(e) => setdrugType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#F8F3FF] text-black outline-none"
          >
            <option value="">Select drug type</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Date
          </label>
          <input
            type="text"
            id="Date"
            name="Date"
            value={Date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-purple-50/50 border bg-[#F8F3FF] text-black outline-none"
          />
        </div>

        {/* Next Date */}
        <div>
          <label
            htmlFor="nextDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Next Date
          </label>
          <input
            type="text"
            id="NextDate"
            name="NextDate"
            value={NextDate}
            onChange={(e) => setNextDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#F8F3FF] text-black outline-none"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ResponsibilityForm;
