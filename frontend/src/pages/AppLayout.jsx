import Map from "../components/Map";
import Leftbar from "../components/Leftbar";
export default function applayout() {
  return (
    <div className="flex justify-between">
      <Leftbar />
      <Map />
    </div>
  );
}
