import { useState } from "react";
import { useMemos } from "../hooks/useMemo";
import { FaTimes } from "react-icons/fa";

export default function MemoDetail({ selectedMemo, setSelectedMemo }) {
  const { handleDelete } = useMemos();
  const [previewPhoto, setPreviewPhoto] = useState(null); // for enlarged photo modal

  if (!selectedMemo) return null;

  return (
    <div className="relative w-[400px] h-screen bg-blue-50 p-6 overflow-y-auto shadow-lg border-r border-blue-100">
      {/* 🔙 Back Button */}
      <button
        onClick={() => setSelectedMemo(null)}
        className="text-blue-600 hover:text-blue-800 text-base font-medium mb-5 transition"
      >
        ← Back to All Memos
      </button>

      {/* 🏷️ Title */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800 leading-snug">
        {selectedMemo.title || "Untitled Memo"}
      </h2>

      {/* 📍 Info */}
      <div className="space-y-2 text-gray-700 mb-6">
        <p className="text-lg">
          <span className="font-semibold text-blue-700">📍 Location:</span>{" "}
          {selectedMemo.city}, {selectedMemo.country}
        </p>
        <p className="text-lg">
          <span className="font-semibold text-blue-700">🕒 Date:</span>{" "}
          {new Date(selectedMemo.createdAt).toLocaleString()}
        </p>
      </div>

      {/* 📝 Notes */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">📝 Notes</h3>
        <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          {selectedMemo.notes || "No additional notes."}
        </p>
      </div>

      {/* 📸 Photos */}
      {selectedMemo.photos?.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            📸 Photos
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {selectedMemo.photos.map((photo, i) => (
              <img
                key={i}
                src={photo}
                alt={`Memo Photo ${i + 1}`}
                className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300 object-cover w-full h-40 cursor-pointer"
                onClick={() => setPreviewPhoto(photo)} // 🖱️ click to enlarge
              />
            ))}
          </div>
        </div>
      )}

      {/* 🗑️ Delete Button */}
      <button
        onClick={() => {
          handleDelete(selectedMemo._id);
          setSelectedMemo(null);
        }}
        className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 active:bg-red-700 transition"
      >
        Delete Memo
      </button>

      {/* 🖼️ Modal for enlarged photo */}
      {previewPhoto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <button
            onClick={() => setPreviewPhoto(null)}
            className="absolute top-6 right-8 text-white text-3xl hover:text-amber-300 transition"
          >
            <FaTimes />
          </button>
          <img
            src={previewPhoto}
            alt="Preview"
            className="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl object-contain animate-fadeIn"
          />
        </div>
      )}
    </div>
  );
}
