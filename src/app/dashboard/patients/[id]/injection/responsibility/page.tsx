'use client'
import React, { useState } from "react";

const ResponsibilityForm = () => {
 
  const [formData, setFormData] = useState({
    doctorName: "",
    nurseName: "",
    socialWorker: "",
    drugType: "",
    date: "",
    nextDate: "",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
   
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
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
            value={formData.doctorName}
            onChange={handleChange}
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
            value={formData.nurseName}
            onChange={handleChange}
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
            id="socialWorker"
            name="socialWorker"
            value={formData.socialWorker}
            onChange={handleChange}
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
            value={formData.drugType}
            onChange={handleChange}
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
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
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
            type="date"
            id="nextDate"
            name="nextDate"
            value={formData.nextDate}
            onChange={handleChange}
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
