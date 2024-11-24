'use client'
import React, { useState } from 'react';


const DischargeForm = () => {
  // State Variables
  const [dischargeDate, setDischargeDate] = useState('');
  const [modeOfDischarge, setModeOfDischarge] = useState('');
  const [patientCondition, setPatientCondition] = useState('');
  const [wardunit, setwardunit] = useState('');
  const [bhtNo, setbhtNo] = useState('');
  const [diagonisis, setdiagonisis] = useState('');
  const [procedures, setprocedures] = useState('');
  const [mode, setmode] = useState('');

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
      

   
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">ADMIT DETAILS</h2>
        
      
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Discharge Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
            Ward/Unit
            </label>
            <div className="relative">
              <input
                type="text"
                className=" text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter ward unit"
                value={wardunit}
                onChange={(e) => setwardunit(e.target.value)}
              />
             
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
            BHT No
            </label>
            <div className="relative">
              <input
                type="text"
                className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter bed number"
                value={bhtNo}
                onChange={(e) => setbhtNo(e.target.value)}
              />
             
            </div>
          </div>




          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Admit Date
            </label>
            <div className="relative">
              <input
                type="date"
                className="text-[13px] text-gray-400 text-sm w-full px-5 py-3 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Date"
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
              />
             
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
            Principal Diagnosis
            </label>
            <div className="relative">
              <input
                type="text"
                className="text-[13px] text-sm w-full px-5 py-3 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter the Principal Diagnosis"
                value={diagonisis}
                onChange={(e) => setdiagonisis(e.target.value)}
              />
             
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
            Co-morbidities Surgeries Procedures
            </label>
            <div className="relative">
              <input
                type="text"
                className="text-[13px] text-sm w-full px-5 py-3 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter the Co-morbidities Surgeries Procedures"
                value={procedures}
                onChange={(e) => setprocedures(e.target.value)}
              />
             
            </div>
          </div>

          {/* Mode of Discharge */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Mode of Admit
            </label>
            <input
              type="text"
              className="text-[13px] text-sm w-full px-5 py-3 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Routine"
              value={modeOfDischarge}
              onChange={(e) => setModeOfDischarge(e.target.value)}
            />
          </div>
        </div>

        {/* Patient Condition */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Patient Condition at the Time of Admit
          </label>
          <textarea
          
            className="h-[150px] text-gray-200 text-[13px] text-sm w-full px-6 py-3 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
