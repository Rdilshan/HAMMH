"use client";

import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { BiSolidRightArrow, BiSolidDownArrow } from "react-icons/bi";
import React from "react";

interface Patient {
  id: number;
  Date: string;
  NextDate: string;
  Status: string;
  doctorName: string;
  drugType: string;
  nurseName: string;
  patient_id: number;
  socialWorkers: string;
}

function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [injectionData, setInjectionData] = useState<Patient[]>([]);

  const rowsPerPage = 5;

  useEffect(() => {
    fetchInjectionData();
  }, []);

  const fetchInjectionData = async () => {
    try {
      const response = await fetch(`/api/patient/injection`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch injection data.");
      }

      const data = await response.json();
      setInjectionData(data);
    } catch (error) {
      console.error("Error fetching injection data:", error);
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = injectionData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(injectionData.length / rowsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="px-4 py-4 bg-[#F8F3FF]">
      <div className="flex flex-col justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-black uppercase">
          Injection Details
        </h2>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto p-4">
        <h2 className="text-[15px] font-bold text-black uppercase mb-3">
          Patient Details
        </h2>
        <table className="w-full table-auto text-left text-sm text-black">
          <thead>
            <tr className="border-b bg-[#F8F3FF]">
              <th className="px-4 py-3 text-center">Patient ID</th>
              <th className="px-4 py-3 text-center hidden md:table-cell">
                Doctor Name
              </th>
              <th className="px-4 py-3 text-center hidden md:table-cell">
                Drug Type
              </th>
              <th className="px-4 py-3 text-center hidden md:table-cell">
                Nurse Name
              </th>
              <th className="px-4 py-3 text-center hidden md:table-cell">
                Date
              </th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((patient, index) => (
                <React.Fragment key={patient.id}>
                  <tr className="border-b hover:bg-gray-50">
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
                      {patient.patient_id}
                    </td>
                    <td className="px-4 py-4 text-center hidden md:table-cell">
                      {patient.doctorName}
                    </td>
                    <td className="px-4 py-4 text-center hidden md:table-cell">
                      {patient.drugType}
                    </td>
                    <td className="px-4 py-4 text-center hidden md:table-cell">
                      {patient.nurseName}
                    </td>
                    <td className="px-4 py-4 text-center hidden md:table-cell">
                      {patient.Date}
                    </td>
                    <td className="px-4 py-6 text-center">
                      <button className="text-yellow-600">
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-4 bg-gray-50 text-sm text-gray-600"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between">
                            <p className="font-bold">Doctor Name:</p>
                            <p>{patient.doctorName}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="font-bold">Drug Type:</p>
                            <p>{patient.drugType}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="font-bold">Nurse Name:</p>
                            <p>{patient.nurseName}</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="font-bold">Date:</p>
                            <p>{patient.Date}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
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

      <div className="flex justify-center items-center py-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === page
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Page;
