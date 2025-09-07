import Sidebar from "../components/Sidebar";
import Map from "../components/Map";

export default function applayout() {
  return (
    <div className="flex">
      <Sidebar/>
      <Map/>
    </div>
  );
}
