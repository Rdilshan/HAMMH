'use client'

import React, { useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
interface MedicalRecord {
  id: number;
  date: string;
  imageUrl: string;
  type: string;
}

const MedicalRecordsGrid: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  // Generate 15 records with the same image URL
  const generateRecords = (): MedicalRecord[] => {
    return Array.from({ length: 15 }, (_, index): MedicalRecord => ({
      id: index + 1,
      date: new Date(2024, 0, index + 1).toISOString().split('T')[0],
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN5_k_vpQPhWUN3825vLDSqCUx4Dk227i8iQ&s',
      type: 'Medical Record'
    }));
  };

  const records: MedicalRecord[] = generateRecords();

  const handleImageClick = (record: MedicalRecord): void => {
    setSelectedRecord(record);
  };

  const handleCloseModal = (): void => {
    setSelectedRecord(null);
  };

  return (
    <div className="w-full p-4">
      {/* Grid Layout */}
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
        {records.map((record: MedicalRecord) => (
          <div
            key={record.id}
            onClick={() => handleImageClick(record)}
            className="relative group"
          >
            <div className="aspect-square bg-gray-800 rounded-lg shadow-md cursor-pointer overflow-hidden transition-transform duration-200 hover:scale-105">
              {/* Hidden Image */}
              <Image
                src={record.imageUrl}
                alt={`Medical Record ${record.date}`}
                className="w-full h-full object-cover opacity-30"
              />
              {/* Date Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {new Date(record.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                <span className="text-gray-500 text-xs mt-1">
                  {record.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedRecord && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div 
            className="relative bg-white rounded-lg max-w-xl w-full mx-4 h-full"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="absolute top-2 right-2 z-10">
              <button
                onClick={handleCloseModal}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Medical Record - {new Date(selectedRecord.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
              </div>
              <Image
                src={selectedRecord.imageUrl}
                alt={`Medical Record ${selectedRecord.date}`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordsGrid;