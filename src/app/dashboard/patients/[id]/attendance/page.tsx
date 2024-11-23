import React from 'react';
import { Check, X } from 'lucide-react';

const AttendanceSheet = () => {
  const attendanceData = [
    { date: "2024/05/78", present: false },
    { date: "2024/05/78", present: true },
    { date: "2024/05/78", present: false },
    { date: "2024/05/78", present: true }
  ];

  return (
    <div className="w-full ">
      {/* Next Clinic Date Notice */}
      <div className="mb-6 p-4 bg-red-500 rounded-lg">
        <p className="text-white">
          Next Clinic date: <span className="font-semibold">11:27 AM Thursday, October 31, 2024</span>
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
            
            {attendanceData.map((record, index) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSheet;