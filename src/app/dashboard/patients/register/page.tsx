'use client'

import React, { useState } from 'react';
import dynamic from "next/dynamic";
import { locationstore } from '@/store/location';
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { useRouter } from 'next/navigation'




const MapWithSearch = dynamic(() => import("../../../../components/GoogleMapWithSearch"), {
  ssr: false,
});

const PatientRegister = () => {
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState(Number);
  const [gender, setGender] = useState('male');
  const [nic, setnic] = useState('nic');
  const [sourceOfReferral, setSourceOfReferral] = useState('OPD');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = locationstore((state) => state.location)
  const mapCenter = { lat: Number(location.Latitude), lng: Number(location.Longitude) };


  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const baseUrl = `/api/patient`;
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          telephone: contactNumber,
          address: address,
          age: age,
          nic: nic,
          gender: gender,
          source_reffern: sourceOfReferral,
          location: [Number(location.Latitude), Number(location.Longitude)]
        })
      });
      const datares = await response.json();
      if (response.status === 200) {
        toast.success('Patient registered successfully!');
        setTimeout(() => {
          router.push('/dashboard/patients')
        }, 500);
      } else {
        toast.error(datares.msg);

      }
    } catch (error) {
      console.log(error);
    }


    setIsLoading(false);

  };
  //ugug
  return (
    <div className="px-6 py-4 text-black ">
      <Toaster position="top-center" reverseOrder={false} />

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
                className="w-full px-6 py-3 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black-400"
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
                className="text-black-400 w-full px-6 py-3 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 "
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
                className="text-black-400 w-full px-6 py-3 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 "
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
                className="text-black-400 w-full px-6 py-3 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 "
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
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
                className="text-black-400 w-full px-6 py-3 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 "
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
                className="text-black-400 w-full px-6 py-3 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 "
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
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
                className="text-black-400 w-full px-6 py-3 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 "
              >
                <option value="OPD">OPD</option>
                <option value="Emergency">Emergency</option>
                <option value="Walk-in">Walk-in</option>
              </select>
            </div>


            <div>
              <label htmlFor="location" className="block mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                placeholder="Select Location"
                className="text-black-400 w-full px-6 py-3 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500  cursor-pointer"
                value={`${location.Latitude}, ${location.Longitude}`}
                readOnly
                onClick={() => setIsModalOpen(true)} // Open the modal
              />
            </div>

            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center mt-9">
                <div className="bg-white p-6 rounded-md  w-[400px] h-auto relative">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Select Location</h3>


                  <MapWithSearch initialCenter={mapCenter} />
                  <button
                    className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-md"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}



          </div>


          <button
            type="submit"
            className="flex justify-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg 
          hover:bg-purple-700 focus:outline-none focus:ring-2 
          focus:ring-purple-500 focus:ring-offset-2 transition duration-150 
          w-full lg:w-1/2 my-6 item-center"
          > {isLoading ? (
            <>
              <FaSpinner className="animate-spin " />
              
            </>
          ) : (
            "Register Patient"
          )}
          </button>

        </div>


      </form>
    </div>
  );
};

export default PatientRegister;