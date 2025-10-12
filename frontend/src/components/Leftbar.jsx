import { useState } from "react";

const LeftBar = ({ memos }) => {
  // State to store the currently selected memo (null = no memo selected)
  const [selectedMemo, setSelectedMemo] = useState(null);

  // 🧭 When no memo is selected → show the list view
  if (!selectedMemo) {
    return (
      <div className="w-[320px] h-screen bg-blue-50 p-5 overflow-y-auto">
        {/* Section title */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">All Memos</h2>

        {/* If the memo list is empty */}
        {memos.length === 0 ? (
          <p className="text-gray-500">No memos found.</p>
        ) : (
          // Render the list of memos
          <ul className="space-y-3">
            {memos.map((memo) => (
              <li
                key={memo._id}
                // 👇 When clicked, switch to detail view for this memo
                onClick={() => setSelectedMemo(memo)}
                className="cursor-pointer p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 transition"
              >
                {/* City name */}
                <p className="font-medium text-gray-800">{memo.city}</p>
                {/* Created time, formatted to local time */}
                <p className="text-sm text-gray-500">
                  {new Date(memo.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // 🗂 When a memo is selected → show detail view
  return (
    <div className="w-[320px] h-screen bg-blue-50 p-5 overflow-y-auto">
      {/* Back button to return to the list view */}
      <button
        onClick={() => setSelectedMemo(null)}
        className="text-sm text-blue-600 hover:underline mb-3"
      >
        ← Back to all memos
      </button>

      {/* Memo title */}
      <h2 className="text-lg font-semibold mb-2 text-gray-800">
        {selectedMemo.title}
      </h2>

      {/* Location info */}
      <p className="text-gray-700 mb-1">
        <strong>📍 Location:</strong> {selectedMemo.city},{" "}
        {selectedMemo.country}
      </p>

      {/* Created date */}
      <p className="text-gray-700 mb-1">
        <strong>🕒 Date:</strong>{" "}
        {new Date(selectedMemo.createdAt).toLocaleString()}
      </p>

      {/* Notes */}
      <p className="text-gray-700 mb-4">
        <strong>📝 Notes:</strong> {selectedMemo.notes}
      </p>

      {/* If the memo has photos, show the first one */}
      {selectedMemo.photos?.length > 0 && (
        <img
          src={selectedMemo.photos[0]}
          alt={selectedMemo.title}
          className="rounded-lg shadow-md"
        />
      )}
    </div>
  );
};

export default LeftBar;
