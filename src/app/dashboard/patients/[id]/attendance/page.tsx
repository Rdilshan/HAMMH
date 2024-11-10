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
    <div className="w-full max-w-3xl">
      {/* Next Clinic Date Notice */}
      <div className="mb-6 p-4 bg-purple-50 rounded-lg">
        <p className="text-purple-700">
          Next Clinic date: <span className="font-semibold">11:27 AM Thursday, October 31, 2024</span>
        </p>
      </div>

      {/* Attendance Sheet Card */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold">ATTENDANCE SHEET</h2>
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
                    <Check className="text-green-500 w-5 h-5" />
                  ) : (
                    <X className="text-red-500 w-5 h-5" />
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