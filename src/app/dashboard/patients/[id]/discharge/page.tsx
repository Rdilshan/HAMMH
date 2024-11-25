'use client'
import React, { useState } from 'react';
// import { Calendar } from 'lucide-react';

const DischargeForm = () => {
  // State Variables
  const [dischargeDate, setDischargeDate] = useState('');
  const [modeOfDischarge, setModeOfDischarge] = useState('');
  const [patientCondition, setPatientCondition] = useState('');

  const handleSave = () => {
    // Logic for saving data (e.g., API call)
    console.log({
      dischargeDate,
      modeOfDischarge,
      patientCondition,
    });
    alert("Form saved successfully!");
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      {/* Warning Message */}
      <div className="mb-6 p-4 bg-black/90 text-yellow-400 rounded-md">
        <p>
          This patient is already admitted this week. When this patient is discharged, 
          please fill this. It will help both the patient and the hospital.
        </p>
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">ADMIT DETAILS</h2>
        
        {/* Form Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Discharge Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Discharge Date
            </label>
            <div className="relative">
              <input
                type="date"
                className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Date"
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
              />
             
            </div>
          </div>

          {/* Mode of Discharge */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Mode of Discharge
            </label>
            <input
              type="text"
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Routine"
              value={modeOfDischarge}
              onChange={(e) => setModeOfDischarge(e.target.value)}
            />
          </div>
        </div>

        {/* Patient Condition */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Patient Condition at the Time of Discharge
          </label>
          <textarea
            className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Note"
            value={patientCondition}
            onChange={(e) => setPatientCondition(e.target.value)}
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button 
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DischargeForm;
