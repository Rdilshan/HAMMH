"use client";

import React, { useState } from "react";
import Select from 'react-select'

interface PatientDetailsFormData {
  fullName: string;
  contactNumber: string;
  address: string;
  gender: string;
  age: number;
  nic:string;
  source:string;
  clinic:string;
  condition:string;
  diagnosis:string;
  special:string;
  choice:string;
  injectionType: string;
 
  
}

const options = [
  {value : "1",label : "A"},
  {value : "2",label : "B"},
  {value : "3",label : "C"},
  {value : "4",label : "D"},
  {value : "5",label : "E"},
  {value : "6",label : "F"},
  {value : "1",label : "A"},
  {value : "2",label : "B"},
  {value : "3",label : "C"},
  {value : "4",label : "D"},
  {value : "5",label : "E"},
  {value : "6",label : "F"},
]

const PatientDetails = () => {
  const [formData, setFormData] = useState<PatientDetailsFormData>({
    fullName: "",
    contactNumber: "",
    address: "",
    gender: "",
    age: 0,
    nic: "",
    source:"",
    clinic:"",
    condition:"",
    diagnosis:"",
    special:"",
    choice:"",
    injectionType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      choice: isChecked ? "yes" : "no",
      injectionType: isChecked ? "" : "", // Reset injection type if "No"
    }));
  };

  const handleSelectChange = (selectedOption: { value: string; label: string } | null) => {
    setFormData((prev) => ({
      ...prev,
      diagnosis: selectedOption ? selectedOption.label : "",
    }));
  };
  
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="bg-white rounded-md p-8 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        PATIENT DETAILS
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter full name of patient"
              value={formData.fullName}
              onChange={handleChange}
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-400"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label
              htmlFor="contactNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              placeholder="Enter Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-400"
            />
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter the address"
              value={formData.address}
              onChange={handleChange}
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-400"
            />
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Enter Patient Age"
              value={formData.age}
              onChange={handleChange}
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="gnic"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              NIC
            </label>
            <input
              type="number"
              id="nic"
              name="nic"
              placeholder="Enter Patient NIC number"
              value={formData.nic}
              onChange={handleChange}
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-400"
            />
          </div>

       
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-400"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="source"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Source Of Referral
            </label>
            <select
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-400"
            >
              <option value="" disabled>
              Source Of Referral
              </option>
              <option value="Consaltant">Consaltant</option>
              <option value="OPD">OPD</option>
              <option value="Other wards">Other wards</option>
              <option value="Other health institution">Other health institution</option>
              <option value="Public">Public health staff</option>
              <option value="GPs">GPs</option>
              <option value="Courts">Courts</option>
              <option value="Self">Self-referrals</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="clinic"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Clinic Session
            </label>
            <select
              id="clinic"
              name="clinic"
              value={formData.clinic}
              onChange={handleChange}
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-400"
            >
              <option value="" disabled>
              Clinic Session
              </option>
              <option value="Consaltant">Genaral Clinic</option>
              <option value="OPD">Child & Adolescent guidance clinic</option>
              <option value="Other wards">Substance abuse clinic</option>
              <option value="Other health institution">Gender based violence clinic</option>
              <option value="Public">Elderly clinic</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="Patient Condition"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
             Patient Condition
            </label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-400"
            >
              <option value="" disabled>
              Patient Condition
              </option>
              <option value="Consaltant">Delebrte self-harm</option>
              <option value="OPD">suicides</option>
              <option value="Other wards">Substance abuse clinic</option>
              <option value="Other health institution">Gender based violence clinic</option>
              <option value="Public">Elderly clinic</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="Diagonsis"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
            Diagonsis
            </label>
            <Select
              options={options}
              value={options.find((option) => option.label === formData.diagnosis) || null}
              onChange={handleSelectChange}
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="yesNo"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Does the patient use injections?
            </label>
            <input
              type="checkbox"
              id="yesNo"
              name="choice"
              checked={formData.choice === "yes"}
              onChange={handleChoiceChange}
              className="w-5 h-5 accent-purple-500"
            />
            <label htmlFor="yesNo" className="ml-2 text-gray-700">
              {formData.choice === "yes" ? "Yes" : "No"}
            </label>
          </div>
          {formData.choice === "yes" && (
            <div>
              <label
                htmlFor="injectionType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Injection Type
              </label>
              <select
                id="injectionType"
                name="injectionType"
                value={formData.injectionType}
                onChange={handleChange}
                className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-400"
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="A">Type A</option>
                <option value="B">Type B</option>
              </select>
            </div>
          )}
          







        </div>

        <div>
            <label
              htmlFor="special"
              className="block text-sm font-medium text-gray-700 mb-2 w-full"
            >
           Special Note bout the patient
            </label>
           
            <textarea
              
              placeholder="Enter the address"
              value={formData.special}
              onChange={handleChange}
              className="h-[250px] text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-400"
            />
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
  );
};

export default PatientDetails;
