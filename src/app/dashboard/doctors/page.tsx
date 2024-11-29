"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import { BiSolidRightArrow, BiSolidDownArrow } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import profile from "../../../../public/profile.png";

function DoctorProfilePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [doctors, setDoctors] = useState<any[]>([]); // Ensure flexibility for dynamic data.
  const [error, setError] = useState("");

  const rowsPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`/api/doctor`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch doctor data.");
      }

      const data = await response.json();
      setDoctors(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteDoctor = async (id: number) => {
    try {
      const response = await fetch(`/api/doctor/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the doctor.");
      }

      const data = await response.json();
      alert(data.message);
      fetchDoctors(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("An error occurred while trying to delete the doctor.");
    }
  };

  const filteredData = doctors.filter((doctor) => {
    if (selectedCategory === "All") {
      return (
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.contactNumber.includes(searchQuery)
      );
    }

    return (
      doctor.gender === selectedCategory &&
      (doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.contactNumber.includes(searchQuery))
    );
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="px-4 py-4 bg-[#F8F3FF]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-black uppercase">
          Doctor Details
        </h2>
        <button
          onClick={() => router.push("/dashboard/doctors/register")}
          className="mt-2 md:mt-0 bg-purple-600 text-white rounded-md py-2 px-4"
        >
          Add New Doctor
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between bg-white items-center mb-4 p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder={`Search by ${
            selectedCategory === "All" ? "Name or Contact" : selectedCategory
          }`}
          className="bg-[#F8F3FF] rounded-md py-2 px-4 w-full md:w-2/3 mb-2 md:mb-0 md:mr-4 outline-none text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#F8F3FF] text-black rounded-md py-2 px-3 w-full md:w-1/4 mb-2 md:mb-0"
        >
          <option value="All">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Doctor Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto p-4">
        <h2 className="text-[15px] font-bold text-black uppercase mb-3">
          Doctor Details
        </h2>
        <table className="w-full table-auto text-left text-sm text-black">
          <thead>
            <tr className="border-b bg-[#F8F3FF]">
              <th className="px-4 py-3 text-center">Profile</th>
              <th className="px-4 py-3 text-center">Name</th>
              <th className="px-4 py-3 text-center hidden md:table-cell">
                Contact
              </th>
              <th className="px-4 py-3 text-center hidden md:table-cell">
                Specialist
              </th>
              <th className="px-4 py-3 text-center hidden md:table-cell">
                Gender
              </th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((doctor, index) => (
                <React.Fragment key={doctor.id}>
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
                      <Image
                        src={doctor.profileImage || profile}
                        alt={doctor.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="px-4 py-4 text-center">{doctor.name}</td>
                    <td className="px-4 py-4 text-center hidden md:table-cell">
                      {doctor.telephone}
                    </td>
                    <td className="px-4 py-4 text-center hidden md:table-cell">
                      {doctor.Specialization}
                    </td>
                    <td className="px-4 py-4 text-center hidden md:table-cell">
                      {doctor.gender}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="text-yellow-600">
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-600"
                          onClick={async () => {
                            const confirmDelete = window.confirm(
                              "Are you sure you want to delete this doctor? This action is irreversible."
                            );
                            if (confirmDelete) {
                              await handleDeleteDoctor(doctor.id);
                            }
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {expandedRow === index && (
                    <tr className="md:hidden">
                      <td
                        colSpan={5}
                        className="px-4 py-4 bg-gray-50 text-sm text-gray-600"
                      >
                        <div className="flex items-center justify-between py-2">
                          <p className="font-bold">Contact Number</p>
                          <p> {doctor.telephone}</p>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <p className="font-bold">Specialist</p>
                          <p>{doctor.Specialization}</p>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <p className="font-bold">Gender</p>
                          <p>{doctor.gender}</p>
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

      {/* Pagination */}
      <div className="flex justify-center items-center py-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === page
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DoctorProfilePage;
