'use client'

import { useState } from 'react';

const PatientsDetails = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const patientData = [
        {
            patientName: 'Lasith Subasingha',
            NIC: '20007876887',
            contactNumber: '0787575875',
            address: 'Embilipitiya',
        },
        {
            patientName: 'Tharindu Silva',
            NIC: '20005678321',
            contactNumber: '0712345678',
            address: 'Colombo',
        },
        // Add more patient data as needed
    ];

    const handleSearch = () => {
        // Perform search logic here based on searchQuery and selectedCategory
    };

    const handleCategoryChange = (e: any) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <div className="px-6 py-4">
            <div className='flex justify-between'>
                <h2 className='text-black'>Patients Details</h2>
                <button className="bg-purple-600 text-white rounded-md py-2 px-4">
                    Add New
                </button>
            </div>

            <div className="flex justify-between bg-white items-center mb-4 mt-5 p-2">
                <div className="flex items-center w-full">



                    <input
                        type="text"
                        placeholder={`Search by ${selectedCategory === 'All' ? 'Name or NIC' : selectedCategory}`}
                        className="bg-gray-100 rounded-md py-2 px-4 w-full mr-4"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="bg-gray-100 text-black rounded-md py-2 px-3 mr-4 w-1/4"
                    >
                        <option value="All">All</option>
                        <option value="Patient Name">Patient Name</option>
                        <option value="NIC">NIC</option>
                    </select>

                    <button
                        className="bg-purple-600 text-white rounded-md py-2 px-4"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="bg-white text-black">
                <h2>Details ({selectedCategory})</h2>
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">Patient Name</th>
                            <th className="px-4 py-2 text-left">NIC</th>
                            <th className="px-4 py-2 text-left">Contact Number</th>
                            <th className="px-4 py-2 text-left">Address</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientData.map((patient, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-4 py-2">{patient.patientName}</td>
                                <td className="px-4 py-2">{patient.NIC}</td>
                                <td className="px-4 py-2">{patient.contactNumber}</td>
                                <td className="px-4 py-2">{patient.address}</td>
                                <td className="px-4 py-2">
                                    <div className="flex space-x-2">
                                        <button className="text-purple-600">View</button>
                                        <button className="text-purple-600">Edit</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientsDetails;
