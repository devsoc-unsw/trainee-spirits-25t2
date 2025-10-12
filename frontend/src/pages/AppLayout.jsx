import Map from "../components/Map";
import LeftBar from "../components/LeftBar";
import { useState, useEffect } from "react";

export default function AppLayout() {
  const [memos, setMemos] = useState([]);

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
      <LeftBar memos={memos} />
      <Map memos={memos} />
    </div>
  );
}
