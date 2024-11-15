'use client';
import { FaEdit } from 'react-icons/fa'; 
import { useState } from 'react';

const DoctorDetails = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);

    // Sample data for doctorData
    const doctorData = [
        { doctorName: 'Dr. John Doe', contactNumber: '123-456-7890', specialist: 'Cardiology' },
        { doctorName: 'Dr. Jane Smith', contactNumber: '987-654-3210', specialist: 'Neurology' },
        // Add more entries as needed
    ];

    const handleSearch = () => {
        // Perform search logic here based on searchQuery and selectedCategory
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="px-6 py-4">
            <div className="flex justify-between">
                <h2 className="text-black">NURSE Details</h2>
                <button className="bg-purple-600 text-white rounded-md py-2 px-4">
                    Add New
                </button>
            </div>

            <div className="flex justify-between bg-white items-center mb-4 mt-5 p-2">
                <div className="flex items-center w-full">
                    <input
                        type="text"
                        placeholder="Search the nurse name"
                        className="bg-gray-100 rounded-md py-2 px-4 w-full mr-4"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <button
                        className="bg-purple-600 text-white rounded-md py-2 px-4"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="bg-white text-black">
                <h2>Details (All)</h2>
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">No</th>
                            <th className="px-4 py-2 text-left">Nurse Name</th>
                            <th className="px-4 py-2 text-left">Contact Number</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctorData.map((doctor, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{doctor.doctorName}</td>
                                <td className="px-4 py-2">{doctor.contactNumber}</td>
                                <td className="px-4 py-2">{doctor.specialist}</td>
                                <td className="px-4 py-2">
                                    <button className="text-purple-600 flex items-center">
                                        <FaEdit className="mr-2" /> Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-center mt-4">
                    <button
                        className="px-4 py-2 bg-purple-600 text-white rounded-md"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {[...Array(10)].map((_, i) => (
                        <button
                            key={i}
                            className={`px-4 py-2 mx-1 ${
                                currentPage === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-100'
                            } rounded-md`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        className="px-4 py-2 bg-purple-600 text-white rounded-md"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === 10}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetails;
