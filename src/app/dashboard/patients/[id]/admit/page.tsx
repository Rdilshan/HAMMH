'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

const DischargeForm = () => {
  const { id } = useParams();
  const [admit_date, setadmit_date] = useState('');
  const [mode_of_admission, setmode_of_admission] = useState('');
  const [special_note, setspecial_note] = useState('');
  const [ward, setward] = useState('');
  const [BHT_no, setBHT_no] = useState('');
  const [principal_diagnosis, setprincipal_diagnosis] = useState('');
  const [procedures, setprocedures] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  


  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ward == "" || BHT_no == "" || principal_diagnosis == "" || procedures == "" || mode_of_admission == "" || special_note == "" || admit_date == "") {
      toast.error('All fields are required!');
      return;
    }
    setIsLoading(true);
    try {
      const baseUrl = `/api/patient/${id}/admit`;
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ward: ward,
          BHT_no: BHT_no,
          principal_diagnosis: principal_diagnosis,
          procedures: procedures,
          mode_of_admission: mode_of_admission,
          special_note: special_note,
          admit_date: new Date(admit_date).toISOString()
        }),
      });




      const data = await response.json();


      if (response.ok) {
        toast.success('Admit registered successfully!');
        setTimeout(() => {
          window.location.href = `/dashboard/patients/${id}`;
      }, 500);
      } else {

        toast.error(data.message);

      }
    } catch (error) {
      console.log(error)

    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="p-6 bg-white rounded-lg">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">Admit Patient</h2>
        <form onSubmit={handleSave}>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Ward/Unit
              </label>
              <input
                type="text"
                className="text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                placeholder="Enter ward/unit"
                name='ward'
                value={ward}
                onChange={(e) => setward(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                BHT No
              </label>
              <input
                type="text"
                className="text-sm w-full px-6 py-4 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                placeholder="Enter BHT number"
                name='BHT_no'
                value={BHT_no}
                onChange={(e) => setBHT_no(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Admit Date
              </label>
              <input
                type="datetime-local"
                className="text-sm w-full px-5 py-3 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                name='admit_date'
                value={admit_date}
                onChange={(e) => setadmit_date(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Principal Diagnosis
              </label>
              <input
                type="text"
                className="text-sm w-full px-5 py-3 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                placeholder="Enter principal diagnosis"
                name='principal_diagnosis'
                value={principal_diagnosis}
                onChange={(e) => setprincipal_diagnosis(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Procedures
              </label>
              <input
                type="text"
                className="text-sm w-full px-5 py-3 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                placeholder="Enter procedures"
                name='procedures'
                value={procedures}
                onChange={(e) => setprocedures(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Mode of Admission
              </label>
              <input
                type="text"
                className="text-sm w-full px-5 py-3 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                placeholder="Enter mode of admission"
                name='mode_of_admission'
                value={mode_of_admission}
                onChange={(e) => setmode_of_admission(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Special Note
            </label>
            <textarea
              className="h-[150px] text-sm w-full px-6 py-3 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              placeholder="Enter special note"
              name='special_note'
              value={special_note}
              onChange={(e) => setspecial_note(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex justify-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg 
            hover:bg-purple-700 focus:outline-none focus:ring-2 
            focus:ring-purple-500 focus:ring-offset-2 transition duration-150 
            w-full lg:w-1/4 my-6 item-center"
            > {isLoading ? (
              <>
                <FaSpinner className="animate-spin " />
                
              </>
            ) : (
              "Admit"
            )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DischargeForm;
