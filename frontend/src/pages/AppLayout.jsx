import { useState, useEffect } from "react";
import Map from "../components/Map";
import LeftBar from "../components/LeftBar";

export default function AppLayout() {
  const [memos, setMemos] = useState([]);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ add loading state
  const [clickedPoint, setClickedPoint] = useState(null);

  const fetchMemos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.warn("No token, skip fetching");

      const res = await fetch("http://localhost:3000/memos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Fetch failed " + res.status);
      const data = await res.json();
      setMemos(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  // ✅ While loading, show a centered loading screen
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500"></div>
    );
  }

  // ✅ When data is ready, render the actual layout
  return (
    <div className="flex h-screen">
      <LeftBar
        memos={memos}
        selectedMemo={selectedMemo}
        clickedPoint={clickedPoint}
        setClickedPoint={setClickedPoint}
        fetchMemos={fetchMemos}
        setSelectedMemo={setSelectedMemo}
      />
      <Map
        memos={memos}
        selectedMemo={selectedMemo}
        setSelectedMemo={setSelectedMemo}
        setClickedPoint={setClickedPoint}
      />
    </div>
  );
}
