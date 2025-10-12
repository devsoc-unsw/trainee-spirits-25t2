import Map from "../components/Map";
import LeftBar from "../components/LeftBar";

export default function applayout() {
  return (
    <div className="flex justify-between">
      <LeftBar />
      <Map />
    </div>
  );
}
