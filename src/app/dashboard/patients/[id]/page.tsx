'use client'

import React, { useState } from 'react'

interface PatientDetailsFormData {
  fullName: string
  contactNumber: string
  address: string
  gender: string
  age: string
}

const PatientDetails = () => {
  const [formData, setFormData] = useState<PatientDetailsFormData>({
    fullName: '',
    contactNumber: '',
    address: '',
    gender: '',
    age: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">PATIENT DETAILS</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter full name of patient"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#F8F3FF] border-0 
                        placeholder-gray-400 text-gray-900 focus:ring-2 
                        focus:ring-purple-500 transition duration-150"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              placeholder="Enter Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#F8F3FF] border-0 
                        placeholder-gray-400 text-gray-900 focus:ring-2 
                        focus:ring-purple-500 transition duration-150"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter the address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#F8F3FF] border-0 
                        placeholder-gray-400 text-gray-900 focus:ring-2 
                        focus:ring-purple-500 transition duration-150"
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              placeholder="Male"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#F8F3FF] border-0 
                        placeholder-gray-400 text-gray-900 focus:ring-2 
                        focus:ring-purple-500 transition duration-150"
            />
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              placeholder="Enter the age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#F8F3FF] border-0 
                        placeholder-gray-400 text-gray-900 focus:ring-2 
                        focus:ring-purple-500 transition duration-150"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg 
                     hover:bg-purple-700 focus:outline-none focus:ring-2 
                     focus:ring-purple-500 focus:ring-offset-2 transition duration-150 
                     min-w-[120px]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default PatientDetails