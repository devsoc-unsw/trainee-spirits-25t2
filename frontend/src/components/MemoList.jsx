import { useMemos } from "../hooks/useMemo";

function MemoList({ setClickedPoint, setSelectedMemo }) {
  const { memos } = useMemos();

  return (
    <div className="w-[400px] h-screen bg-blue-50 p-6 overflow-y-auto shadow-lg border-r border-blue-100">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 text-blue-800 tracking-wide">
        🗺️ All Memos
      </h2>

      {/* Empty state */}
      {memos.length === 0 ? (
        <p className="text-gray-500 text-lg italic">No memos found.</p>
      ) : (
        <ul className="space-y-4">
          {memos.map((memo) => (
            <li
              key={memo._id}
              onClick={() => {
                setSelectedMemo(memo);
                setClickedPoint(null);
              }}
              className="
                cursor-pointer p-5 rounded-2xl bg-white 
                border border-gray-200 shadow-sm
                hover:shadow-md hover:border-blue-300 hover:bg-blue-50
                transition-all duration-200 ease-in-out
              "
            >
              {/* Title */}
              <p className="text-lg font-semibold text-gray-800 mb-1">
                {memo.title || "Untitled Memo"}
              </p>

              {/* City / Country */}
              <p className="text-base text-blue-700 font-medium mb-2">
                📍 {memo.city}, {memo.country}
              </p>

              {/* Timestamp */}
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

export default MemoList;
