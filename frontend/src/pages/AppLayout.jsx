import { useEffect, useState } from "react";
import Map from "../components/Map";
import Leftbar from "../components/Leftbar";
import { useMemos } from "../hooks/useMemo";
import UserMenu from "../components/UserMenu";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function AppLayout() {
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [clickedPoint, setClickedPoint] = useState(null);
  const navigate = useNavigate();

  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const { loading } = useMemos();
  console.log(loading);

  //  While loading, show a centered loading screen
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  //  When data is ready, render the actual layout
  return (
    <div className="flex h-screen">
      <UserMenu position="fixed top-4 right-6" />

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
