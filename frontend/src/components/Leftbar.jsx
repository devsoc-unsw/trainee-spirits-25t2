const LeftBar = ({ memos, selectedMemo, setSelectedMemo }) => {
  // List view
  if (!selectedMemo) {
    return (
      <div className="w-[320px] h-screen bg-blue-50 p-5 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">All Memos</h2>

        {memos.length === 0 ? (
          <p className="text-gray-500">No memos found.</p>
        ) : (
          <ul className="space-y-3">
            {memos.map((memo) => (
              <li
                key={memo._id}
                onClick={() => setSelectedMemo(memo)}
                className="cursor-pointer p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 transition"
              >
                <p className="font-medium text-gray-800">{memo.city}</p>
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

  // Detail view
  return (
    <div className="w-[320px] h-screen bg-blue-50 p-5 overflow-y-auto">
      <button
        onClick={() => setSelectedMemo(null)} // Back to list
        className="text-sm text-blue-600 hover:underline mb-3"
      >
        ← Back to all memos
      </button>

      <h2 className="text-lg font-semibold mb-2 text-gray-800">
        {selectedMemo.title}
      </h2>

      <p className="text-gray-700 mb-1">
        <strong>📍 Location:</strong> {selectedMemo.city},{" "}
        {selectedMemo.country}
      </p>

      <p className="text-gray-700 mb-1">
        <strong>🕒 Date:</strong>{" "}
        {new Date(selectedMemo.createdAt).toLocaleString()}
      </p>

      <p className="text-gray-700 mb-4">
        <strong>📝 Notes:</strong> {selectedMemo.notes}
      </p>

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
