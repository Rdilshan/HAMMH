"use client";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { BiSolidRightArrow, BiSolidDownArrow } from "react-icons/bi";
import React from "react";

// const patientData = [
//   {
//     id: '1',
//     name: 'John Doe',
//     contactNumber: '123-456-7890',
//     location: 'Embilipitiya',
//     date: '2024-11-15',
//   },
//   {
//     id: '2',
//     name: 'Jane Smith',
//     contactNumber: '234-567-8901',
//     location: 'Hambantota',
//     date: '2024-11-15',
//   },
//   {
//     id: '3',
//     name: 'Mark Johnson',
//     contactNumber: '345-678-9012',
//     location: 'Kandy',
//     date: '2024-11-14',
//   },
//   {
//     id: '4',
//     name: 'Lucy Brown',
//     contactNumber: '456-789-0123',
//     location: 'Florida',
//     date: '2024-11-15',
//   },
// ];

interface Patient {
  id: number;
  name: string;
  contactNumber: string;
  location: string;
  date: string;
}

interface Patientapi {
  id: number;
  name: string;
  telephone: string;
  address: string;
}

interface PatientData {
  clinc_data: string; 
  patient: Patientapi;
}

interface ApiResponse {
  patientData: PatientData[];
}

function Page() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const rowsPerPage = 5;
  const [patientData, setPatientData] = useState<Patient[]>([]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setCurrentPage(1);
  };


  const filteredPatients = patientData.filter(
    (patient) => patient.date === selectedDate
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredPatients.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredPatients.length / rowsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(`/api/patient/attendance`);
        if (!response.ok) {
          throw new Error("Failed to fetch records");
        }
        const data: ApiResponse = await response.json();

        if (data.patientData && Array.isArray(data.patientData)) {

          const formattedData = data.patientData.map((record) => ({
            // id: (index + 1).toString(),
            id:record.patient.id,
            name: record.patient.name,
            contactNumber: record.patient.telephone,
            location: record.patient.address,
            date: new Date(record.clinc_data).toISOString().split('T')[0],
          }));

          setPatientData(formattedData);
        } else {
          console.error("No patient data found in the response.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecords();
  }, []);


  return (
    <div className="px-4 py-4 bg-[#F8F3FF]">
      <div className="flex flex-col md:flex-row justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-black text-center uppercase">Patients Attendance sheet</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between bg-white items-center mb-4 p-4 rounded-lg shadow-sm">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="bg-[#F8F3FF] rounded-md py-2 px-4 w-full md:w-1/3 mb-2 md:mb-0 text-black"
        />
        <div className="text-xl font-bold text-white bg-red-500 py-2 px-4 rounded">
          {filteredPatients.length} Patient{filteredPatients.length === 1 ? '' : 's'} for {selectedDate}
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-x-auto p-4">
        <h2 className="text-[15px] font-bold text-black uppercase mb-3">
          Patient Details
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left text-sm text-black">
            <thead>
              <tr className="border-b bg-[#F8F3FF]">
                <th className="px-4 py-3 text-center">Patient Name</th>
                <th className="px-4 py-3 text-center hidden md:table-cell">Contact Number</th>
                <th className="px-4 py-3 text-center hidden md:table-cell">Location</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((patient, index) => (
                  <React.Fragment key={index}>
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-6 flex items-center gap-2">
                        <button
                          className="text-black md:hidden text-[15px]"
                          onClick={() => toggleRow(index)}
                        >
                          {expandedRow === index ? (
                            <BiSolidDownArrow />
                          ) : (
                            <BiSolidRightArrow />
                          )}
                        </button>
                        {patient.name}
                      </td>
                      <td className="px-4 py-4 text-center hidden md:table-cell">{patient.contactNumber}</td>
                      <td className="px-4 py-4 text-center hidden md:table-cell">{patient.location}</td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button className="text-green-900" onClick={() => {
                            window.open(`/dashboard/patients/${patient.id}`, "_blank");
                          }}>
                            <FaEdit />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedRow === index && (
                      <tr key={`expanded-${patient.id}`}>
                        <td
                          className="px-4 py-4 bg-gray-50 text-sm text-gray-600"

                        >
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                              <p className="font-bold">Contact Number</p>
                              <p>{patient.contactNumber}</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="font-bold">Location</p>
                              <p>{patient.location}</p>
                            </div>


                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                    No patients for this date.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center py-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`mx-1 px-3 py-1 rounded-md ${currentPage === page ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
