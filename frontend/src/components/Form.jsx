import { useState, useEffect } from "react";
import { useMemos } from "../hooks/useMemo";
import { FaTimes, FaUpload } from "react-icons/fa";

export default function Form({ clickedPoint, setClickedPoint, selectedMemo }) {
  const [location, setLocation] = useState({ city: "", country: "" });
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState([]);
  const { fetchMemos, loading, setLoading, createMemo } = useMemos();

  // 🧭 Reverse geocoding
  async function handleClick(clickedPoint) {
    const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
    try {
      const res = await fetch(
        `${BASE_URL}?latitude=${clickedPoint.lat}&longitude=${clickedPoint.lng}&localityLanguage=en`
      );
      const data = await res.json();
      console.log("📍 Location:", data.city, data.countryName);
      return { city: data.city, country: data.countryName };
    } catch (err) {
      console.error("❌ Failed to fetch location:", err);
      return null;
    }
  }

  useEffect(() => {
    setImages([]);
  }, [clickedPoint, selectedMemo]);

  // 📸 Handle image upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      event.target.value = "";
      setImages((prev) => [...prev, result]);
    };
    reader.readAsDataURL(file);
  };

  // Fetch location info
  useEffect(() => {
    const fetchLocation = async () => {
      if (clickedPoint) {
        const loc = await handleClick(clickedPoint);
        if (loc) setLocation(loc);
      }
    };
    fetchLocation();
  }, [clickedPoint]);

  // Submit new memo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createMemo({
        title,
        notes,
        city: location.city,
        country: location.country,
        lng: clickedPoint.lng,
        lat: clickedPoint.lat,
        photos: images,
      });

      if (fetchMemos) await fetchMemos();
      alert("✅ Memo created successfully!");
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

  return (
    <div className="w-[400px] h-screen bg-blue-50 p-6 overflow-y-auto shadow-lg border-r border-blue-100 text-left">
      {/* Back */}
      <button
        onClick={() => setClickedPoint(null)}
        className="text-blue-600 hover:text-blue-800 text-base font-medium mb-5 transition block text-left"
      >
        ← Back to All Memos
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 tracking-wide text-left">
        Create New Memo
      </h2>

      {/* Clicked Coordinates */}
      <div className="text-gray-600 text-sm mb-5 bg-white/70 border border-gray-200 rounded-xl p-4 shadow-sm text-left">
        <p>
          <strong>Latitude:</strong> {clickedPoint.lat}
        </p>
        <p>
          <strong>Longitude:</strong> {clickedPoint.lng}
        </p>
        {location.city && (
          <p className="mt-2">
            <strong>Detected:</strong> {location.city}, {location.country}
          </p>
        )}
      </div>

      {/* Form */}
      <form className="space-y-5 text-left" onSubmit={handleSubmit}>
        {/* Title Field */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1 text-left">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter memo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none text-left"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1 text-left">
            City
          </label>
          <input
            type="text"
            value={location.city}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 text-left"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1 text-left">
            Country
          </label>
          <input
            type="text"
            value={location.country}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 text-left"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1 text-left">
            Notes
          </label>
          <textarea
            placeholder="Write something about this location..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none h-28 text-left"
          />
        </div>

        {/* Upload */}
        <div className="text-left">
          <label className="block font-semibold text-gray-700 mb-2 text-left">
            Photos
          </label>
          <label className="flex items-center justify-start gap-2 border-2 border-dashed border-blue-300 bg-white hover:bg-blue-50 transition rounded-lg p-4 cursor-pointer text-left">
            <FaUpload className="text-blue-500" />
            <span className="text-blue-600 font-medium">Upload a photo</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Preview Grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mt-4">
              {images.map((image, index) => (
                <div key={index} className="relative group text-left">
                  <img
                    src={image}
                    alt={`preview ${index + 1}`}
                    className="rounded-lg shadow-md object-cover w-full h-36"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setImages((prev) => prev.filter((_, i) => i !== index))
                    }
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 active:bg-blue-700 transition disabled:opacity-60 text-left px-4"
        >
          {loading ? "Saving..." : "Save Memo"}
        </button>
      </form>
    </div>
  );
}
