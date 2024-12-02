"use client";

import Select from "react-select";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";

interface PatientDetailsFormData {
  name: string;
  telephone: string;
  address: string;
  gender: string;
  age: number;
  nic: string;
  source_reffern: string;
  clinic_session: string;
  condition: string;
  diagonsis: string;
  special_note: string;
  injection_type: string;
  use_injection: string;
}

const options = [
  { value: "1", label: "A" },
  { value: "2", label: "B" },
  { value: "3", label: "C" },
  { value: "4", label: "D" },
  { value: "5", label: "E" },
  { value: "6", label: "F" },
];

const PatientDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false); // Fix for hydration issues
  const [formData, setFormData] = useState<PatientDetailsFormData>({
    name: "",
    telephone: "",
    address: "",
    gender: "",
    age: 0,
    nic: "",
    source_reffern: "",
    clinic_session: "",
    condition: "",
    diagonsis: "",
    special_note: "",
    use_injection: "",
    injection_type: "",
  });
  const router = useRouter();

  // Ensure the component runs only on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (id) {
      const fetchPatientData = async () => {
        try {
          const response = await fetch(`/api/patient/${id}`);
          const data = await response.json();

          if (response.ok) {
            setFormData((prev) => ({
              ...prev,
              name: data.patients.name || prev.name,
              telephone: data.patients.telephone || prev.telephone,
              address: data.patients.address || prev.address,
              gender: data.patients.gender || prev.gender,
              age: data.patients.age ?? prev.age, 
              nic: data.patients.nic || prev.nic,
              source_reffern: data.patients.source_reffern || prev.source_reffern,
              clinic_session: data.patients.clinic_session || prev.clinic_session,
              condition: data.patients.condition || prev.condition,
              diagonsis: data.patients.diagonsis || prev.diagonsis,
              special_note: data.patients.special_note || prev.special_note,
              use_injection: data.patients.use_injection || prev.use_injection,
              injection_type: data.patients.injection_type || prev.injection_type,
            }));
            
          } else {
            toast.error("Failed to fetch patient data.");
          }
        } catch (error) {
          toast.error("An error occurred while fetching patient data.");
        }
      };

      fetchPatientData();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue = e.target.type == "number" ? Number(value) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      use_injection: isChecked ? "Yes" : "No",
      injection_type: isChecked ? "" : "",
    }));
  };

  const handleSelectChange = (selectedOption: { value: string; label: string } | null) => {
    setFormData((prev) => ({
      ...prev,
      diagonsis: selectedOption ? selectedOption.label : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);


    const method = "PUT";
    const baseUrl = `/api/patient/${id}`;

    try {
      const response = await fetch(baseUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(id ? "Patient updated successfully!" : "Patient registered successfully!");
        router.push("/dashboard/patients");
      } else {
        toast.error(data.error || "Error in submission, please check your fields.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    // Prevent rendering mismatched HTML
    return null;
  }

  return (
    <div className="bg-white rounded-md p-8 shadow-lg">
      <Toaster />
      <h2 className="text-xl font-semibold text-gray-900 mb-6">PATIENT DETAILS</h2>
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
              name="name"
              placeholder="Enter full name of patient"
              value={formData.name}
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
              value={formData.telephone}
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
              type="text"
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
              name="source_reffern"
              value={formData.source_reffern}
              onChange={handleChange}
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-400"
            >
              <option value="" >
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
              name="clinic_session"
              value={formData.clinic_session || ""}
              onChange={handleChange}
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-400"
            >
              <option value="" disabled>
                Clinic Session
              </option>
              <option value="">Select Clinic Session</option>
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
              value={options.find((option) => option.label === formData.diagonsis) || null}
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
              name="use_injection"
              checked={formData.use_injection == "Yes"}
              onChange={handleChoiceChange}
              className="w-5 h-5 accent-purple-500"
            />
            <label htmlFor="yesNo" className="ml-2 text-gray-700">
              {formData.use_injection == "Yes" ? "Yes" : "No"}
            </label>
          </div>
          {formData.use_injection === "Yes" && (
            <div>
              <label
                htmlFor="injectionType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Injection Type
              </label>
              <select
                id="injectionType"
                name="injection_type"
                value={formData.injection_type}
                onChange={handleChange}
                className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-400"
              >
                <option value="" >
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
            name="special_note"
            placeholder="Enter the address"
            value={formData.special_note}
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
            {isLoading && <div className="spinner">Loading...</div>}

          </button>

        </div>
      </form>
    </div>
  );
};

export default PatientDetails;
