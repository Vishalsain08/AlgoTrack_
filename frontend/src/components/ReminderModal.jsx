import { useState } from "react";

export default function ReminderModal({
  isOpen,
  onClose,
  onSave,
  contest,
}) {
  const [timeBefore, setTimeBefore] = useState(60);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(timeBefore);
    onClose();
  };

  const reminderOptions = [
    { label: "15 Minutes", value: 15 },
    { label: "30 Minutes", value: 30 },
    { label: "1 Hour", value: 60 },
    { label: "2 Hours", value: 120 },
    { label: "6 Hours", value: 360 },
    { label: "1 Day", value: 1440 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[90%] max-w-md rounded-2xl bg-gray-900 border border-gray-700 shadow-2xl p-6">

        {/* Header */}
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Set Reminder
        </h2>

        {contest && (
          <p className="text-gray-400 text-center text-sm mb-5">
            {contest.event}
          </p>
        )}

        <p className="text-gray-300 mb-4">
          Notify me before the contest starts:
        </p>

        <div className="space-y-3">
          {reminderOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition
                ${
                  timeBefore === option.value
                    ? "border-blue-500 bg-blue-500/20"
                    : "border-gray-700 bg-gray-800 hover:bg-gray-700"
                }`}
            >
              <input
                type="radio"
                name="reminder"
                value={option.value}
                checked={timeBefore === option.value}
                onChange={() => setTimeBefore(option.value)}
                className="accent-blue-500"
              />

              <span className="text-white">{option.label}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Save Reminder
          </button>
        </div>
      </div>
    </div>
  );
}