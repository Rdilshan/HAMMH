import { Calendar } from 'lucide-react';

const DischargeForm = () => {
  return (
    <div className="p-6 bg-white rounded-lg">
      {/* Warning Message */}
      <div className="mb-6 p-4 bg-black/90 text-yellow-400 rounded-md">
        <p>This patient is already admit this week. When this patient is discharge please fill this. It will help for both patient and hospital</p>
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">ADMIT DETAILS</h2>
        
        {/* Form Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Discharge Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Discharge Date
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Date"
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Mode of Discharge */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Mode of Discharge
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Routine"
            />
          </div>
        </div>

        {/* Patient Condition */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Patient Condition at the Time of Discharge
          </label>
          <textarea
            className="w-full px-4 py-2 bg-purple-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
            placeholder="Note"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button 
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DischargeForm;