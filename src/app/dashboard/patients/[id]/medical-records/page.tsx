"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from 'next/image';

interface Record {
  id: number;
  clinc_data: string;
  next_data: string;
  status: string;
  Images: string[];
}

const MedicalRecordsGrid = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(`/api/patient/${id}/clinic`);
        if (!response.ok) {
          throw new Error("Failed to fetch records");
        }
        const data = await response.json();
        setRecords(data.records); 
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [id]);

  const handleImageClick = (record: Record) => {
    setSelectedRecord(record);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRecord(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="text-black w-full h-auto">
      {/* Medical Records Grid */}
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
        {records.map((record) => (
          <div key={record.id}>
            <div className="record-item ">
              <div
                className="image-container relative cursor-pointer rounded-md w-full h-40 "
                onClick={() => handleImageClick(record)}
              >
                <Image
                  src={record.Images[0]}
                  alt={`Record Image ${record.id}`}
                  className="w-full h-1/2 object-cover rounded-lg filter blur-sm" 
                  width={0} height={0} // Apply blur effect
                />
                {/* Overlay Date */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white font-semibold p-2">
                  {new Date(record.clinc_data).toLocaleDateString()}{" "}
                  {/* Displaying date */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Full Record Details */}
      {modalOpen && selectedRecord && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
       <div className="bg-white p-8 rounded-lg w-3/4 h-3/4 relative">
         {/* Close button with high z-index */}
         <button
           onClick={closeModal}
           className="absolute top-4 right-4 text-red-500 font-bold text-xl z-60"
         >
           X
         </button>
         <div className="flex justify-between item-center">
           <p className="mb-2">
             Clinic Data:{" "}
             {new Date(selectedRecord.clinc_data).toLocaleString()}
           </p>
         </div>
     
         {/* Image Gallery */}
         <div className="overflow-x-auto overflow-y-auto h-full">
  <div className="flex gap-4 w-full h-full">
    {selectedRecord.Images.map((image, index) => (
      <div
        key={index}
        className="flex-none w-96 h-96" // Fixed container size
      >
        <Image
          src={image}
          alt={`Full Record Image ${index + 1}`}
          className="object-cover rounded-lg"
          width={384} 
          height={384} 
          quality={100} 
        />
      </div>
    ))}
  </div>
</div>

     
       </div>
     </div>
     
      )}
    </div>
  );
};

export default MedicalRecordsGrid;
