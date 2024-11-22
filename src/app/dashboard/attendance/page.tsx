"use client"

import { FaEye } from 'react-icons/fa';
import { useState } from 'react';

const patientData = [
  {
    id: '1',
    name: 'John Doe',
    contactNumber: '123-456-7890',
    location: 'Embilipitiya',
    date: '2024-11-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    contactNumber: '234-567-8901',
    location: 'Hambantota',
    date: '2024-11-15',
  },
  {
    id: '3',
    name: 'Mark Johnson',
    contactNumber: '345-678-9012',
    location: 'Kandy',
    date: '2024-11-14',
  },
  {
    id: '4',
    name: 'Lucy Brown',
    contactNumber: '456-789-0123',
    location: 'Florida',
    date: '2024-11-15',
  },
];

function Page() {
  const [selectedDate, setSelectedDate] = useState('2024-11-15'); 
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleDateChange = (e:any) => {
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

  const handlePageChange = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-4 py-4 bg-[#F8F3FF]">
      <div className="flex flex-col md:flex-row justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-black uppercase">Patients Attendance sheet</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between bg-white items-center mb-4 p-4 rounded-lg shadow-sm">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="bg-[#F8F3FF] rounded-md py-2 px-4 w-full md:w-1/3 mb-2 md:mb-0 text-black"
        />
        <div className="text-xl font-bold text-red-950">
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
              <th className="px-4 py-3 text-center">Contact Number</th>
              <th className="px-4 py-3 text-center">Location</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((patient) => (
                <tr key={patient.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-4 text-center">{patient.name}</td>
                  <td className="px-4 py-4 text-center">{patient.contactNumber}</td>
                  <td className="px-4 py-4 text-center">{patient.location}</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="text-green-900">
                        <FaEye className="inline-block" />
                      </button>
                    </div>
                  </td>
                </tr>
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
