"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BiSolidRightArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import React from "react";

function NursePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [nurse, setNurse] = useState<any[]>([]);
  const router = useRouter();
  const rowsPerPage = 5;
 

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`/api/Nurse`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch doctor data.");
      }

      const data = await response.json();
      setNurse(data);
    } catch (err: unknown) {
      console.log(err)
    }
  };

  const handleDeleteDoctor = async (id: number) => {
    try {
      const response = await fetch(`/api/Nurse/${id}`, {
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
  // const handleSearch = () => {
  //   setCurrentPage(1);
  // };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const filteredData = nurse.filter((nurse) => {
    if (selectedCategory === "All") {
      return (
        nurse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nurse.contactNumber.includes(searchQuery)
      );
    }

    return (
      nurse.gender === selectedCategory &&
      (nurse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nurse.contactNumber.includes(searchQuery))
    );
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

  return (
    <div className="px-4 py-4 bg-[#F8F3FF]">
      <div className="flex flex-col md:flex-row justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-black uppercase">
          Nurses Details
        </h2>
        <button
          onClick={() => router.push('/dashboard/nurses/register')}
          className="mt-2 md:mt-0 bg-purple-600 text-white rounded-md py-2 px-4">
          Add New Nurse
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between bg-white items-center mb-4 p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder={`Search by ${selectedCategory === "All" ? "Name or Contact" : selectedCategory
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
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto p-4">
        <h2 className="text-[15px] font-bold text-black uppercase mb-3">
          Nurse Details
        </h2>
        <table className="w-full table-auto text-left text-sm text-black">
          <thead>
            <tr className="border-b bg-[#F8F3FF]">

              <th className="px-4 py-3 text-center">Name</th>
              <th className="px-4 py-3 text-center hidden md:table-cell">Contact Number</th>
              <th className="px-4 py-3 text-center hidden md:table-cell">Email</th>
              <th className="px-4 py-3 text-center hidden md:table-cell">Gender</th>
              <th className="px-4 py-3 text-center hidden md:table-cell">
                Status
              </th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (

              currentRows.map((nurse, index) => (
                <React.Fragment key={index}>
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-6 flex items-center gap-2 ">
                      <button
                        className="text-black md:hidden text-[15px]"
                        onClick={() => toggleRow(index)}
                      >
                        {expandedRow === index ? <BiSolidDownArrow /> : <BiSolidRightArrow />}
                      </button>
                      {nurse.name}
                    </td>


                    <td className="px-4 py-4 text-center hidden md:table-cell">
                      {nurse.telephone}
                    </td>
                    <td className="px-4 py-4 text-center hidden md:table-cell">{nurse.email}</td>
                    <td className="px-4 py-4 text-center hidden md:table-cell">{nurse.gender}</td>
                    <td className="px-4 py-4 text-center hidden md:table-cell">
                      <div
                        className={` py-1 rounded ${
                          nurse.active_status === "Active"
                            ? "bg-green-500 text-white rounded-full text-[10px] "
                            : "bg-red-500 text-white rounded-full text-[10px]"
                        }`}
                      >
                        {nurse.active_status}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">

                      <button
                          className="text-yellow-600"
                          onClick={() =>
                            router.push(`/dashboard/nurses/${nurse.id}`)
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
                              await handleDeleteDoctor(nurse.id);
                            }
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr key={`expanded-${index}`}>
                      <td colSpan={5} className="px-4 py-4 bg-gray-50 text-sm text-gray-600">
                        <div className='flex items-center justify-between py-2'>
                          <p className='font-bold'>Contact Number</p>
                          <p>{nurse.contactNumber}</p>

                        </div>
                        <div className='flex items-center justify-between py-2'>
                          <p className='font-bold'>Email</p>
                          <p>{nurse.email}</p>

                        </div>
                        <div className='flex items-center justify-between py-2'>
                          <p className='font-bold'>Gender</p>
                          <p>{nurse.gender}</p>

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
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === page
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

export default NursePage;
