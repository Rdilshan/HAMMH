"use client";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { BiSolidRightArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import React from "react";

function DoctorProfilePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const rowsPerPage = 5;

  const router = useRouter();




  const doctorData = [
    {
      id: "1",
      name: "Dr. John Smith",
      contactNumber: "123-456-7890",
      specialist: "Cardiologist",
      gender: "Male",
      profileImage:
        "data:image/jpeg;base64,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",
    },
    {
      id: "2",
      name: "Dr. Emily Johnson",
      contactNumber: "234-567-8901",
      specialist: "Dermatologist",
      gender: "Female",
      profileImage:
        "data:image/jpeg;base64,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",
    },
    {
      id: "3",
      name: "Dr. Michael Lee",
      contactNumber: "345-678-9012",
      specialist: "Pediatrician",
      gender: "Male",
      profileImage:
        "data:image/jpeg;base64,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",
    },
    {
      id: "4",
      name: "Dr. Sarah Brown",
      contactNumber: "456-789-0123",
      specialist: "Neurologist",
      gender: "Female",
      profileImage:
        "data:image/jpeg;base64,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",
    },
  ];

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value);
  };

  const filteredData = doctorData.filter((doctor) => {
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
          Doctor Details
        </h2>
        <button
          onClick={() => router.push('/dashboard/doctors/register')}

          className="mt-2 md:mt-0 bg-purple-600 text-white rounded-md py-2 px-4">
          Add New Doctor
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
          Doctor Details
        </h2>
        <table className="w-full table-auto text-left text-sm text-black">
          <thead>
            <tr className="border-b bg-[#F8F3FF]">
              <th className="px-4 py-3 text-center">Profile</th>
              <th className="px-4 py-3 text-center">Name</th>
              <th className="px-4 py-3 text-center hidden md:table-cell">Contact Number</th>
              <th className="px-4 py-3 text-center hidden md:table-cell">Specialist</th>
              <th className="px-4 py-3 text-center hidden md:table-cell">Gender</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((doctor, index) => (
                <React.Fragment key={index}>
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-6 flex items-center gap-2 ">
                      <button
                        className="text-black md:hidden text-[15px]"
                        onClick={() => toggleRow(index)}
                      >
                        {expandedRow === index ? <BiSolidDownArrow /> : <BiSolidRightArrow />}
                      </button>
                      <img
                        src={doctor.profileImage}
                        alt={doctor.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>

                    <td className="px-4 py-4 text-center">{doctor.name}</td>
                    <td className="px-4 py-4 text-center hidden md:table-cell">
                      {doctor.contactNumber}
                    </td>
                    <td className="px-4 py-4 text-center hidden md:table-cell">{doctor.specialist}</td>
                    <td className="px-4 py-4 text-center hidden md:table-cell">{doctor.gender}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">

                        <button className="text-yellow-600">
                          <FaEdit />
                        </button>
                        <button className="text-red-600">
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
                          <p>{doctor.contactNumber}</p>

                        </div>
                        <div className='flex items-center justify-between py-2'>
                          <p className='font-bold'>Specialist</p>
                          <p>{doctor.specialist}</p>

                        </div>
                        <div className='flex items-center justify-between py-2'>
                          <p className='font-bold'>Gender</p>
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

export default DoctorProfilePage;
