'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const DischargeForm = () => {
  // State Variables
  const { id } = useParams();
  const [dischargeDate, setDischargeDate] = useState('');
  const [modeOfDischarge, setModeOfDischarge] = useState('');
  const [patientCondition, setPatientCondition] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dischargeid, setDischargeid] = useState('');

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`/api/patient/${id}/admit`);
        if (!response.ok) {
          console.error(`Failed to fetch patient data for ID: ${id}`);
          return;
        }
        const data = await response.json();
        setDischargeid(data.records.id); // Update state
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, [id]);

  // Log when `dischargeid` changes
  useEffect(() => {
    if (dischargeid) {
      console.log('Discharge ID updated:', dischargeid);
    }
  }, [dischargeid]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("runing..")
    if (dischargeDate == '' || modeOfDischarge == '' || patientCondition == '') {
      toast.error('All fields are required!');
      return;
    }


    try {

      const baseUrl = `/api/patient/${id}/admit`;
      const response = await fetch(baseUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          admit_id: dischargeid,
          made_of_discharge: modeOfDischarge,
          dischagre_note: patientCondition,
          discharge_date: new Date(dischargeDate).toISOString()
        }),
      });
      const data = await response.json();


      if (response.ok) {
        toast.success('Discharge  successfully!');
        setTimeout(() => {
          window.location.href = `/dashboard/patients/${id}`;
        }, 500);
      } else {

        toast.error(data.message);

      }
    } catch (error) {
      console.log(error)
    }

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

        <form onSubmit={handleSubmit}>
          <Toaster position="top-center" reverseOrder={false} />
          {/* Form Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Discharge Date */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Discharge Date
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
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
                className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
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
              className="text-[13px] text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              placeholder="Note"
              value={patientCondition}
              onChange={(e) => setPatientCondition(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button type='submit'
              className={`px-6 py-2 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
                }`}

              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default DischargeForm;
