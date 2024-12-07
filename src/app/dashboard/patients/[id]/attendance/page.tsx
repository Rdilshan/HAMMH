"use client";
import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { useParams } from "next/navigation";
import { format } from 'date-fns';

interface AttendanceRecord {
  date: string;
  present: boolean;
}

interface ApiResponse {
  clinc_data: string;
  status: string;
}

const AttendanceSheet = () => {
  const { id } = useParams();

  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [nextdate, setnextdate] = useState("Loading..");

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(`/api/patient/${id}/attendance`);
        if (!response.ok) {
          throw new Error("Failed to fetch records");
        }
        const data: any = await response.json();

        const date = new Date(data.nextdate.clinc_data); 
        const formattedDate = format(date, 'hh:mm a EEEE, MMMM dd, yyyy');
        setnextdate(formattedDate)
        if (Array.isArray(data.records)) {

          const formattedData = data.records.map((record: { clinc_data: string; status: string }) => {
            const date = new Date(record.clinc_data);
            const formattedDate = format(date, 'yyyy-MM-dd :: hh:mm a');

            return {
              date: formattedDate,
              present: record.status === "Attend",
            };
          });

          setAttendanceData(formattedData);
        } else {
          throw new Error("API response is not an array");
        }

      } catch (error) {
        console.error(error);
      }
    };

    fetchRecords();
  }, [id]);


  return (
    <div className="w-full ">
      {/* Next Clinic Date Notice */}
      <div className="mb-6 p-4 bg-red-500 rounded-lg">
        <p className="text-white">
          Next Clinic date: <span className="font-semibold">{nextdate}</span>
        </p>
      </div>

      {/* Attendance Sheet Card */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-black">ATTENDANCE SHEET</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="font-semibold text-gray-600">Date</div>
            <div className="font-semibold text-gray-600">Mark</div>

            {attendanceData && attendanceData.length > 0 ? (
              attendanceData.map((record, index) => (
                <React.Fragment key={index}>
                  <div className="text-gray-700">{record.date}</div>
                  <div>
                    {record.present ? (
                      <Check className="text-white font-bold w-6 h-6 bg-red-500 rounded-full" />
                    ) : (
                      <X className=" w-6 h-6 bg-green-500 text-white rounded-full" />
                    )}
                  </div>
                </React.Fragment>
              ))
            ) : (
              <div>No attendance records available.</div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSheet;