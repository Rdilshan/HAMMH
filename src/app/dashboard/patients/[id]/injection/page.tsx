'use client'
import React, { useState ,useEffect } from 'react';
import { BiSolidRightArrow, BiSolidDownArrow } from 'react-icons/bi';
import { useRouter, useParams } from 'next/navigation';

const InjectionRecordsSection = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const[nextInjectionDate,setnextInjectionDate]=useState("");
  const [injection, setinjections] = useState<any[]>([]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const rowsPerPage = 5;

 
  // Calculate pagination values

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = injection.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(injection.length / rowsPerPage);
  const [error, setError] = useState("");

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };
  useEffect(() => {
    fetchInjections();
  }, []);

  const fetchInjections = async () => {
    try {
      console.log('Fetching injections for patient ID:', id);
      const response = await fetch(`/api/patient/${id}/Injection`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch injections: ${response.statusText}`);
      }
  
      const responseData = await response.json();
      console.log("Fetched data:", responseData);
  
      if (Array.isArray(responseData.data)) {
        setinjections(responseData.data);
  
        // Extract the NextDate from the first record in the array
        if (responseData.data.length > 0) {
          setnextInjectionDate(responseData.data[0].NextDate);
        } else {
          setnextInjectionDate("No upcoming injections");
        }
      } else {
        throw new Error("Expected 'data' to be an array in the response");
      }
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    }
  };
  

  
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
           onClick={() => router.push('/dashboard/patients/1/injection/responsibility')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
            Add new
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm ">
            <thead>
              <tr className="border-b bg-[#F8F3FF] ">
                <th className="text-left py-3 px-4 font-bold text-gray-700 text-center">Date</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700 text-center">Injection</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700 hidden md:table-cell text-center">Doctor</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700 hidden md:table-cell text-center">Nurse</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700 hidden md:table-cell text-center">Social Worker</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700 hidden md:table-cell text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((injection, index) => {
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
                          {new Date(injection.Date).toLocaleString()}
                        </td>
                        <td className="px-4 py-6 text-center text-black">{injection.drugType}</td>
                        <td className="px-4 py-6 text-center hidden md:table-cell text-black">{injection.doctorName}</td>
                        <td className="px-4 py-6 text-center hidden md:table-cell text-black">{injection.nurseName}</td>
                        <td className="px-4 py-6 text-center hidden md:table-cell text-black">{injection.socialWorkers}</td>
                        <td className="px-4 py-6 text-center hidden md:table-cell ">
                        <div
                        className={` py-1 rounded ${
                          injection.Status === "done"
                            ? "bg-green-500 text-white rounded-full text-[10px] "
                            : "bg-red-500 text-white rounded-full text-[10px]"
                        }`}
                      >
                        {injection.Status}
                      </div>
                      </td>
                          
                      </tr>
                      {expandedRow === overallIndex && (
                        <tr key={`expanded-${overallIndex}`}>
                          <td colSpan={6} className="px-4 py-4 bg-gray-50 text-sm text-black md:hidden">
                            
                            <div className="flex items-center justify-between py-2">
                              <p className="font-bold">Contact</p>
                              <p className='text-black'>{injection.doctorName}</p>
                            </div>
                            <div className="flex items-center justify-between py-2">
                              <p className="font-bold">Address</p>
                              <p className='text-black'>{injection.nurseName}</p>
                            </div>
                            <div className="flex items-center justify-between py-2">
                              <p className="font-bold">Social Worker</p>
                              <p className='text-black'>{injection.socialWorkers}</p>
                            </div>
                            <div className="flex items-center justify-between py-2">
                              <p className="font-bold">Status</p>
                              <p className='text-black'>{injection.Status}</p>
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
