'use client'

import { useState } from 'react';
import { Menu } from 'lucide-react';

const PatientsDetails = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    ];

    const handleSearch = () => {
        // Perform search logic here based on searchQuery and selectedCategory
    };

    const handleCategoryChange = (e: any) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <div className="px-8 sm:px-14 md:px-8 py-4">
            {/* Header Section */}
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
                <h2 className='text-black text-xl font-semibold'>Patients Details</h2>
                <button className="bg-purple-600 text-white rounded-md py-2 px-4 w-full sm:w-auto">
                    Add New
                </button>
            </div>

            {/* Search Section */}
            <div className="flex flex-col md:flex-row gap-4 bg-white items-center mb-4 mt-5 p-2">
                <input
                    type="text"
                    placeholder={`Search by ${selectedCategory === 'All' ? 'Name or NIC' : selectedCategory}`}
                    className="bg-gray-100 rounded-md py-2 px-4 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="bg-gray-100 text-black rounded-md py-2 px-3 w-full sm:w-48"
                    >
                        <option value="All">All</option>
                        <option value="Patient Name">Patient Name</option>
                        <option value="NIC">NIC</option>
                    </select>

                    <button
                        className="bg-purple-600 text-white rounded-md py-2 px-4 w-full sm:w-auto"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white text-black overflow-x-auto">
                <h2 className="p-4 text-lg font-medium">Details ({selectedCategory})</h2>
                
                {/* Desktop Table View */}
                <div className="hidden md:block">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-4 py-2 text-left">Patient Name</th>
                                <th className="px-4 py-2 text-left">NIC</th>
                                <th className="px-4 py-2 text-left">Contact Number</th>
                                <th className="px-4 py-2 text-left">Address</th>
                                <th className="px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientData.map((patient, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">{patient.patientName}</td>
                                    <td className="px-4 py-2">{patient.NIC}</td>
                                    <td className="px-4 py-2">{patient.contactNumber}</td>
                                    <td className="px-4 py-2">{patient.address}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex space-x-2">
                                            <button className="text-purple-600 hover:text-purple-800">View</button>
                                            <button className="text-purple-600 hover:text-purple-800">Edit</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden">
                    {patientData.map((patient, index) => (
                        <div key={index} className="border-b p-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium">{patient.patientName}</h3>
                                    <div className="flex space-x-2">
                                        <button className="text-purple-600 hover:text-purple-800">View</button>
                                        <button className="text-purple-600 hover:text-purple-800">Edit</button>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p><span className="font-medium">NIC:</span> {patient.NIC}</p>
                                    <p><span className="font-medium">Contact:</span> {patient.contactNumber}</p>
                                    <p><span className="font-medium">Address:</span> {patient.address}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PatientsDetails;