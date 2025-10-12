const LeftBar = ({
  memos,
  selectedMemo,
  setSelectedMemo,
  clickedPoint,
  setClickedPoint,
}) => {
  // List view
  if (!selectedMemo & !clickedPoint) {
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

  if (selectedMemo)
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

  if (clickedPoint)
    return (
      <div className="w-[320px] h-screen bg-blue-50 p-5 overflow-y-auto">
        <button onClick={() => setClickedPoint(null)}>back</button>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Create New Memo
        </h2>
        <p className="text-gray-600 text-sm mb-3">
          You clicked at:
          <br />
          <strong>Lat:</strong> {clickedPoint.lat} <br />
          <strong>Lng:</strong> {clickedPoint.lng}
        </p>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="City"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Country"
            className="w-full p-2 border rounded-md"
          />
          <textarea
            placeholder="Notes..."
            className="w-full p-2 border rounded-md h-24"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Save Memo
          </button>
        </form>
      </div>
    );
};

export default LeftBar;
