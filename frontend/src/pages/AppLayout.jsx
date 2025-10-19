import { useState } from "react";
import Map from "../components/Map";
import Leftbar from "../components/Leftbar";
import { useMemos } from "../hooks/useMemo";

export default function AppLayout() {
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [clickedPoint, setClickedPoint] = useState(null);

  const { loading } = useMemos();

  //  While loading, show a centered loading screen
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500"></div>
    );
  }

  //  When data is ready, render the actual layout
  return (
    <div className="flex h-screen">
      <Leftbar
        selectedMemo={selectedMemo}
        clickedPoint={clickedPoint}
        setClickedPoint={setClickedPoint}
        setSelectedMemo={setSelectedMemo}
      />
      <Map
        selectedMemo={selectedMemo}
        setSelectedMemo={setSelectedMemo}
        setClickedPoint={setClickedPoint}
      />
    </div>
  );
}
