"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Record {
  id: number;
  clinc_data: string;
  next_data: string;
  status: string;
  Images: string[];
}

const ResponsiveGallery = ({ images = [] }: { images: string[], onClose: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
      setTouchStart(null);
    }
  };

  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleZoom = () => {
    setScale(scale === 1 ? 2 : 1);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="w-full h-full flex items-center justify-center overflow-hidden touch-pan-x"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div 
            className="relative flex items-center justify-center w-full h-full"
            onClick={toggleZoom}
          >
            <div className="relative w-auto h-full max-h-[calc(100vh-12rem)] flex items-center">
              <Image
                src={images[currentIndex]}
                alt={`Record Image ${currentIndex + 1}`}
                className="rounded-lg transition-transform duration-300 ease-in-out object-contain"
                width={800}
                height={800}
                quality={100}
                style={{ 
                  transform: `scale(${scale})`,
                  transformOrigin: 'center',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto'
                }}
              />
            </div>
          </div>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white disabled:opacity-50 hover:bg-black/70"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white disabled:opacity-50 hover:bg-black/70"
              disabled={currentIndex === images.length - 1}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

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
            <div className="record-item">
              <div
                className="image-container relative cursor-pointer rounded-md w-full h-40"
                onClick={() => handleImageClick(record)}
              >
                <Image
                  src={record.Images[0]}
                  alt={`Record Image ${record.id}`}
                  className="w-full h-full object-cover rounded-lg filter blur-sm"
                  width={160}
                  height={160}
                />
                {/* Overlay Date */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white font-semibold p-2">
                  {new Date(record.clinc_data).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Full Record Details */}
      {modalOpen && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-11/12 h-[90vh] relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-red-500 font-bold text-xl z-60"
            >
              X
            </button>
            <div className="flex justify-between items-center mb-4">
              <p>
                Clinic Data: {new Date(selectedRecord.clinc_data).toLocaleString()}
              </p>
            </div>

            {/* Image Gallery */}
            <div className="h-[calc(100%-4rem)]">
              <ResponsiveGallery 
                images={selectedRecord.Images} 
                onClose={closeModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordsGrid;