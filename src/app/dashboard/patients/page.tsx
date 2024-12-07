"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BiSolidRightArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";


interface Patient {
  id: number;
  name: string;
  telephone: string;
  address: string;
  location: [number, number]; // Tuple to represent latitude and longitude
  age: number;
  nic: string;
  gender: string;
  source_reffern: string;
  created_by: number;
  clinic_session: string | null;
  condition: string | null;
  diagonsis: string | null;
  use_injection: string | null;
  injection_type: string | null;
  special_note: string | null;
  is_admit: string;
  created_at: string; // or Date if parsed
  Updated_at: string; // or Date if parsed
}


const PatientsDetails = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch(`/api/patient`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch patients data.");
      }

      const data = await response.json();
      setPatients(data);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };


  const filteredData = patients.filter((patient) => {
    const queryMatch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.nic.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === "All") {
      return queryMatch;
    }

    if (
      selectedCategory === "male" &&
      patient.gender.toLowerCase() === "male"
    ) {
      return queryMatch;
    }

    if (
      selectedCategory === "female" &&
      patient.gender.toLowerCase() === "female"
    ) {
      return queryMatch;
    }

    return false; // No match
  });

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

  const handleDeletepatient = async (id: number) => {
    try {
      const response = await fetch(`/api/patient/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the doctor.");
      }

      const data = await response.json();
      alert(data.message);
      fetchPatients(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("An error occurred while trying to delete the doctor.");
    }
  };

  const router = useRouter();

  return (
    <div className="px-4 py-4 bg-[#F8F3FF]">
      <div className="flex flex-col md:flex-row justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-black uppercase">
          Patients Details
        </h2>
        <button
          onClick={() => router.push("/dashboard/patients/register")}
          className="mt-2 md:mt-0 bg-purple-600 text-white rounded-md py-2 px-4"
        >
          Add New
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between bg-white items-center mb-4 p-4 rounded-lg shadow-sm">
        <input
          type="text"
          placeholder={`Search by ${
            selectedCategory === "All" ? "Name or NIC" : selectedCategory
          }`}
          className="bg-[#F8F3FF] rounded-md py-2 px-4 w-full md:w-2/3 mb-2 md:mb-0 md:mr-4 outline-none text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="bg-[#F8F3FF] text-black rounded-md py-2 px-3 w-full md:w-1/4 mb-2 md:mb-0 md:mr-4"
        >
          <option value="All">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="bg-white shadow-sm rounded-md overflow-x-auto p-4">
        <h2 className="text-[15px] font-bold text-black uppercase mb-3">
          Details <span>(All)</span>
        </h2>
        <table className="min-w-full text-left text-sm text-black">
          <thead>
            <tr className="border-b bg-[#F8F3FF]">
              <th className="px-4 py-3 text-center">Patient Name</th>
              <th className="px-4 py-3 text-center hidden md:table-cell">
                Gender
              </th>
              <th className="px-4 py-3 text-center hidden md:table-cell">
                Contact Number
              </th>
              <th className="px-4 py-3 text-center hidden md:table-cell">
                Address
              </th>
              <th className="px-4 py-3 text-center ">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((patient, index) => (
                <React.Fragment key={index}>
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-6 flex items-center gap-2 text-center ">
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
                    <td className="px-4 py-6 text-center hidden md:table-cell">
                      {patient.gender}
                    </td>
                    <td className="px-4 py-6 text-center hidden md:table-cell">
                      {patient.telephone}
                    </td>
                    <td className="px-4 py-6 text-center hidden md:table-cell">
                      {patient.address}
                    </td>
                    <td className="px-4 py-6 text-center">
                      <button
                        className="text-yellow-600 mr-3"
                        onClick={() =>
                          router.push(`/dashboard/patients/${patient.id}`)
                        }
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600"
                        onClick={async () => {
                          const confirmDelete = window.confirm(
                            "Are you sure you want to delete this doctor? This action is irreversible."
                          );
                          if (confirmDelete) {
                            await handleDeletepatient(patient.id);
                          }
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr key={`expanded-${index}`}>
                      <td className="px-4 py-4 bg-gray-50 text-sm text-gray-600 md:hidden">
                        <div className="flex items-center justify-between py-2">
                          <p className="font-bold">NIC</p>
                          <p>{patient.nic}</p>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <p className="font-bold">Contact</p>
                          <p>{patient.telephone}</p>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <p className="font-bold">Address</p>
                          <p>{patient.address}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
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
};

export default PatientsDetails;
