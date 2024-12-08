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
  patientName?: string;
  address?: string;
  contactnumber?: string;
  injectionType?: string;
}

function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [injectionData, setInjectionData] = useState<Patient[]>([]);
  const [filteredData, setFilteredData] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const rowsPerPage = 5;

  useEffect(() => {
    fetchInjectionData();
  }, []);

  // Fetch injection data and patient names
  const fetchInjectionData = async () => {
    try {
      const response = await fetch(`/api/patient/injection`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch injection data.");
      }

      const data: Patient[] = await response.json();

      const updatedData = await Promise.all(
        data.map(async (patient) => {
          try {
            const patientResponse = await fetch(`/api/patient/${patient.patient_id}`);
            if (!patientResponse.ok) {
              throw new Error(`Failed to fetch patient details for ID ${patient.patient_id}`);
            }
            const patientDetails = await patientResponse.json();
            return {
              ...patient,
              patientName: patientDetails.patients.name,
              contactnumber: patientDetails.patients.telephone,
              address: patientDetails.patients.address,
              injectionType: patientDetails.patients.injection_type,
            };
          } catch (error) {
            console.error(`Error fetching details for ID ${patient.patient_id}:`, error);
            return { ...patient, patientName: "Unknown" };
          }
        })
      );

      setInjectionData(updatedData);
      setFilteredData(updatedData); // Initialize filtered data
    } catch (error) {
      console.error("Error fetching injection data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterByDate = () => {
    if (selectedDate) {
      const filtered = injectionData.filter((patient) => {
        const patientDate = new Date(patient.Date).toLocaleDateString();
        return patientDate === new Date(selectedDate).toLocaleDateString();
      });
      setFilteredData(filtered);
      setCurrentPage(1); // Reset to first page after filtering
    } else {
      setFilteredData(injectionData); // Reset to original data if no date selected
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

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

      {/* Date Filter Section */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Filter by Date
        </label>
        <div className="flex gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
          <button
            onClick={filterByDate}
            className="px-4 py-2 bg-purple-600 text-white rounded-md"
          >
            Filter Patinets
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-x-auto p-4">
          <h2 className="text-[15px] font-bold text-black uppercase mb-3">
            Patient Details
          </h2>
          <table className="w-full table-auto text-left text-sm text-black">
            <thead>
              <tr className="border-b bg-[#F8F3FF]">
                <th className="px-4 py-3 text-center">Patient Name</th>
                <th className="px-4 py-3 text-center hidden md:table-cell">
                  Address
                </th>
                <th className="px-4 py-3 text-center">Injection Type</th>
                <th className="px-4 py-3 text-center hidden md:table-cell">
                  Contact Number
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
                        {patient.patientName || "Unknown"}
                      </td>
                      <td className="px-4 py-4 text-center hidden md:table-cell">
                        {patient.address}
                      </td>
                      <td className="px-4 py-4 text-center">
                        {patient.injectionType}
                      </td>
                      <td className="px-4 py-4 text-center hidden md:table-cell">
                        {patient.contactnumber}
                      </td>
                      <td className="px-4 py-4 text-center hidden md:table-cell">
                        {new Date(patient.Date).toLocaleString()}
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
                              <p>{patient.address}</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="font-bold">Drug Type:</p>
                              <p>{patient.injectionType}</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="font-bold">Nurse Name:</p>
                              <p>{patient.contactnumber}</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="font-bold">Date:</p>
                              <p>{new Date(patient.Date).toLocaleString()}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

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
