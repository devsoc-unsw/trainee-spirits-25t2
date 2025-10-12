import Map from "../components/Map";
import LeftBar from "../components/LeftBar";
import { useState, useEffect } from "react";

export default function AppLayout() {
  const [memos, setMemos] = useState([]);
  const [selectedMemo, setSelectedMemo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/memos")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMemos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex justify-between">
      <LeftBar
        memos={memos}
        selectedMemo={selectedMemo}
        setSelectedMemo={setSelectedMemo}
      />
      <Map
        memos={memos}
        selectedMemo={selectedMemo}
        setSelectedMemo={setSelectedMemo}
      />
    </div>
  );
}
