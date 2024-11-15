'use client';
import { FaEdit } from 'react-icons/fa';
import { SetStateAction, useState } from 'react';

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

    const handleCategoryChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedCategory(e.target.value);
    };

    const handlePageChange = (pageNumber: SetStateAction<number>) => {
        setCurrentPage(pageNumber);
    };

    const getPageNumbers = () => {
        const totalPages = 10;
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                pages.push(i);
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                pages.push('...');
            }
        }
        return pages.filter((item, index, array) => 
            item === '...' ? array[index - 1] !== '...' : true
        );
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
                <div className="flex justify-between items-center mb-4">
                    <h2>Details (All)</h2>

                    <div className="flex items-center space-x-2">
                        <button 
                            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {getPageNumbers().map((page, index) => (
                            <button
                                key={index}
                                className={`
                                    w-8 h-8 flex items-center justify-center rounded-lg
                                    ${page === currentPage 
                                        ? 'bg-purple-600 text-white' 
                                        : 'text-gray-600 hover:bg-gray-100'}
                                    ${page === '...' ? 'cursor-default hover:bg-transparent' : ''}`}
                                onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                                disabled={page === '...'}
                            >
                                {page}
                            </button>
                        ))}

                        <button 
                            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === 10}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">No</th>
                            <th className="px-4 py-2 text-left">Nurse Name</th>
                            <th className="px-4 py-2 text-left">Contact Number</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Option</th>
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
            </div>
        </div>
    );
};

export default DoctorDetails;
