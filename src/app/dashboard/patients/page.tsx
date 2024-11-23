'use client'
import { FaEdit } from 'react-icons/fa';
import { BiSolidRightArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";
import { useState } from 'react';

const PatientsDetails = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const rowsPerPage = 5;

    const patientData = [
        { patientName: 'Lasith Subasingha', NIC: '20007876887', contactNumber: '0787575875', address: 'Embilipitiya' },
        { patientName: 'Tharindu Silva', NIC: '20005678321', contactNumber: '0712345678', address: 'Colombo' },
        { patientName: 'Nimal Perera', NIC: '20007876555', contactNumber: '0765432109', address: 'Galle' },
        { patientName: 'Samantha Rajapakse', NIC: '20005432109', contactNumber: '0771234567', address: 'Kandy' },
        { patientName: 'Rashmi Fernando', NIC: '20006547832', contactNumber: '0718765432', address: 'Kurunegala' },
        { patientName: 'Kamal Wickramasinghe', NIC: '20007898765', contactNumber: '0781234560', address: 'Matara' },
        { patientName: 'Priya Silva', NIC: '20003456789', contactNumber: '0776654321', address: 'Jaffna' },
        { patientName: 'Rajitha Perera', NIC: '20001234567', contactNumber: '0712348901', address: 'Negombo' },
        { patientName: 'Sajith Wijesinghe', NIC: '20009876543', contactNumber: '0780987654', address: 'Colombo' },
        { patientName: 'Ishara Kumara', NIC: '20003218765', contactNumber: '0768765432', address: 'Gampaha' },
    ];

    const handleSearch = () => {
        setCurrentPage(1);
    };

    const handleCategoryChange = (e: any) => {
        setSelectedCategory(e.target.value);
    };

    const filteredData = patientData.filter((patient) => {
        if (selectedCategory === 'All') {
            return patient.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                   patient.NIC.includes(searchQuery);
        }
        if (selectedCategory === 'Patient Name') {
            return patient.patientName.toLowerCase().includes(searchQuery.toLowerCase());
        }
        if (selectedCategory === 'NIC') {
            return patient.NIC.includes(searchQuery);
        }
        return true;
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
                <h2 className="text-2xl font-bold text-black uppercase">Patients Details</h2>
                <button className="mt-2 md:mt-0 bg-purple-600 text-white rounded-md py-2 px-4">
                    Add New
                </button>
            </div>

            <div className="flex flex-col md:flex-row justify-between bg-white items-center mb-4 p-4 rounded-lg shadow-sm">
                <input
                    type="text"
                    placeholder={`Search by ${selectedCategory === 'All' ? 'Name or NIC' : selectedCategory}`}
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
                    <option value="Patient Name">Patient Name</option>
                    <option value="NIC">NIC</option>
                </select>
            </div>

            <div className="bg-white shadow-sm rounded-md overflow-x-auto p-4">
                <h2 className="text-[15px] font-bold text-black uppercase mb-3">Details <span>(All)</span></h2> 
                <table className="min-w-full text-left text-sm text-black">
                    <thead>
                        <tr className="border-b bg-[#F8F3FF]">
                            <th className="px-4 py-3 text-left">Patient Name</th>
                            <th className="px-4 py-3 text-center hidden md:table-cell">NIC</th>
                            <th className="px-4 py-3 text-center hidden md:table-cell">Contact Number</th>
                            <th className="px-4 py-3 text-center hidden md:table-cell">Address</th>
                            <th className="px-4 py-3 text-center ">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.length > 0 ? (
                            currentRows.map((patient, index) => (
                                <>
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-6 flex items-center gap-2 ">
                                            <button
                                                className="text-black md:hidden text-[15px]"
                                                onClick={() => toggleRow(index)}
                                            >
                                                {expandedRow === index ? <BiSolidDownArrow /> :<BiSolidRightArrow />}
                                            </button>
                                            {patient.patientName}
                                        </td>
                                        <td className="px-4 py-6 text-center hidden md:table-cell">{patient.NIC}</td>
                                        <td className="px-4 py-6 text-center hidden md:table-cell">{patient.contactNumber}</td>
                                        <td className="px-4 py-6 text-center hidden md:table-cell">{patient.address}</td>
                                        <td className="px-4 py-6 text-center">
                                            <button className="text-yellow-600">
                                                <FaEdit />
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedRow === index && (
                                        <tr key={`expanded-${index}`}>
                                            <td  className="px-4 py-4 bg-gray-50 text-sm text-gray-600 md:hidden">
                                                <div className='flex items-center justify-between py-2'>
                                                    <p className='font-bold'>NIC</p>
                                                    <p>{patient.NIC}</p>

                                                </div>
                                                <div className='flex items-center justify-between py-2'>
                                                    <p className='font-bold'>Contact</p>
                                                    <p>{patient.contactNumber}</p>

                                                </div>
                                                <div className='flex items-center justify-between py-2'>
                                                    <p className='font-bold'>Address</p>
                                                    <p>{patient.address}</p>

                                                </div>
                                               
                                                
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-4 py-2 text-center text-gray-500">No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center items-center py-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                        key={page}
                        className={`mx-1 px-3 py-1 rounded-md ${currentPage === page ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
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
