'use client'
import React, { useState } from 'react';
import { BiSolidRightArrow, BiSolidDownArrow } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

const InjectionRecordsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const rowsPerPage = 5;

  const InjectionData = [
    { date: '2023/04/05', injection: 'A', doctor: 'John', nurse: 'Jane', social: 'Worker 1', status: 'True' },
    { date: '2023/04/06', injection: 'B', doctor: 'Smith', nurse: 'Doe', social: 'Worker 2', status: 'False' },
    { date: '2023/04/07', injection: 'C', doctor: 'Williams', nurse: 'Emily', social: 'Worker 3', status: 'True' },
    { date: '2023/04/08', injection: 'D', doctor: 'Brown', nurse: 'Anna', social: 'Worker 4', status: 'False' },
    { date: '2023/04/09', injection: 'E', doctor: 'Taylor', nurse: 'Liam', social: 'Worker 5', status: 'True' },
    { date: '2023/04/10', injection: 'F', doctor: 'Miller', nurse: 'Noah', social: 'Worker 6', status: 'True' },
    { date: '2023/04/11', injection: 'G', doctor: 'Wilson', nurse: 'Sophia', social: 'Worker 7', status: 'False' },
  ];

  // Calculate pagination values
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = InjectionData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(InjectionData.length / rowsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const nextInjectionDate = '11:27 AM, Thursday, October 31, 2024';
  const router = useRouter();

  return (
    <div className="p-6 space-y-6">
      {/* Next Injection Date Card */}
      <div className="bg-red-500 p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="text-white">
          <span className="font-medium">Next Injection date: </span>
          <span className="text-white">{nextInjectionDate}</span>
        </div>
      </div>

      {/* Injection Records Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">INJECTION RECORDS</h2>
          <button
           onClick={() => router.push('/dashboard/patients/20007876887/injection/responsibility')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
            Add new
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm ">
            <thead>
              <tr className="border-b bg-[#F8F3FF] ">
                <th className="text-left py-3 px-4 font-bold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700">Injection</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700 hidden md:table-cell">Doctor</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700 hidden md:table-cell">Nurse</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700 hidden md:table-cell">Social Worker</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700 hidden md:table-cell">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((row, index) => {
                  const overallIndex = indexOfFirstRow + index;
                  return (
                    <React.Fragment key={overallIndex}>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="px-4 py-6 flex items-center gap-2 text-black">
                          <button
                            className="text-black md:hidden text-[15px]"
                            onClick={() => toggleRow(overallIndex)}
                          >
                            {expandedRow === overallIndex ? <BiSolidDownArrow /> : <BiSolidRightArrow />}
                          </button>
                          {row.date}
                        </td>
                        <td className="px-4 py-6 text-center text-black">{row.injection}</td>
                        <td className="px-4 py-6 text-center hidden md:table-cell text-black">{row.doctor}</td>
                        <td className="px-4 py-6 text-center hidden md:table-cell text-black">{row.nurse}</td>
                        <td className="px-4 py-6 text-center hidden md:table-cell text-black">{row.social}</td>
                        <td className="px-4 py-6 text-center hidden md:table-cell text-black">{row.status}</td>
                      </tr>
                      {expandedRow === overallIndex && (
                        <tr key={`expanded-${overallIndex}`}>
                          <td colSpan={6} className="px-4 py-4 bg-gray-50 text-sm text-black md:hidden">
                            
                            <div className="flex items-center justify-between py-2">
                              <p className="font-bold">Contact</p>
                              <p className='text-black'>{row.doctor}</p>
                            </div>
                            <div className="flex items-center justify-between py-2">
                              <p className="font-bold">Address</p>
                              <p className='text-black'>{row.nurse}</p>
                            </div>
                            <div className="flex items-center justify-between py-2">
                              <p className="font-bold">Social Worker</p>
                              <p className='text-black'>{row.social}</p>
                            </div>
                            <div className="flex items-center justify-between py-2">
                              <p className="font-bold">Status</p>
                              <p className='text-black'>{row.status}</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-2 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center py-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === page ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InjectionRecordsSection;
