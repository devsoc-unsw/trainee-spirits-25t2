import { useState, useEffect } from "react";
import Map from "../components/Map";
import LeftBar from "../components/LeftBar";

export default function AppLayout() {
  const [memos, setMemos] = useState([]);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ add loading state
  const [clickedPoint, setClickedPoint] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/memos")
      .then((res) => res.json())
      .then((data) => {
        setMemos(data);
        setLoading(false); // ✅ stop loading when data ready
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
        setLoading(false);
      });
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
        setSelectedMemo={setSelectedMemo}
        clickedPoint={clickedPoint}
        setClickedPoint={setClickedPoint}
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
