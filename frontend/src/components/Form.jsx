import { useState, useEffect } from "react";
import { useMemos } from "../hooks/useMemo";
function Form({ clickedPoint, setClickedPoint, selectedMemo }) {
  const [location, setLocation] = useState({ city: "", country: "" });
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState([]);
  const { fetchMemos, loading, setLoading, createMemo } = useMemos();

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

  useEffect(() => {
    setImages([]);
  }, [clickedPoint, selectedMemo]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      console.log("✅ Base64 Data URL:", result);
      event.target.value = "";
      setImages([...images, result]);
    };
    reader.onerror = (error) => {
      console.error("❌ FileReader error:", error);
    };

    reader.readAsDataURL(file);
  };

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
        <input type="file" onChange={handleFileChange} />
        {images &&
          images.map((image) => (
            <div>
              <img src={image} alt="preview" style={{ maxWidth: "300px" }} />
            </div>
          ))}

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

export default Form;
