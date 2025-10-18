import { useEffect, useState } from "react";
async function handleClick(clickedPoint) {
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

  try {
    const res = await fetch(
      `${BASE_URL}?latitude=${clickedPoint.lat}&longitude=${clickedPoint.lng}&localityLanguage=en`
    );
    const data = await res.json();
    console.log("📍 Location:", data.city, data.countryName);
    return {
      city: data.city,
      country: data.countryName,
    };
  } catch (err) {
    console.error("❌ Failed to fetch location:", err);
    return null;
  }
}

const LeftBar = ({
  memos,
  selectedMemo,
  setSelectedMemo,
  clickedPoint,
  setClickedPoint,
  fetchMemos,
}) => {
  const [location, setLocation] = useState({ city: "", country: "" });
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchLocation = async () => {
      if (clickedPoint) {
        const loc = await handleClick(clickedPoint);
        if (loc) setLocation(loc);
      }
    };
    fetchLocation();
  }, [clickedPoint]);
  // List view
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/memos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          notes,
          city: location.city,
          country: location.country,
          location: {
            coordinates: [clickedPoint.lng, clickedPoint.lat],
          },
        }),
      });

      if (fetchMemos) fetchMemos();

      if (!res.ok) throw new Error("Failed to create memo");
      const data = await res.json();
      console.log("✅ Memo created:", data);

      alert("Memo created successfully!");
      setClickedPoint(null);
      setTitle("");
      setNotes("");
    } catch (err) {
      console.error("❌ Error creating memo:", err);
      alert("Failed to save memo.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting:", `http://localhost:3000/memos/${id}`);
      const res = await fetch(`http://localhost:3000/memos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Delete failed");
      const data = await res.json();
      console.log("✅ Deleted:", data);
      alert("Memo deleted successfully");
      fetchMemos();
    } catch (err) {
      console.error("❌ Error creating memo:", err);
      alert("Failed to delete memo.");
    }
  };
  if (!selectedMemo && !clickedPoint) {
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
                onClick={() => {
                  setSelectedMemo(memo);
                  setClickedPoint(null);
                }}
                className="cursor-pointer p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 transition"
              >
                <p className="font-medium text-gray-800">{memo.title}</p>
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
        <button
          onClick={() => {
            handleDelete(selectedMemo._id);
            setSelectedMemo(null);
          }}
        >
          delete
        </button>
      </div>
    );

  if (clickedPoint) {
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

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="City"
            value={location.city}
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Country"
            value={location.country}
            className="w-full p-2 border rounded-md"
          />
          <textarea
            placeholder="Notes..."
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded-md h-24"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Save Memo
          </button>
        </form>
      </div>
    );
  }
};

export default LeftBar;
