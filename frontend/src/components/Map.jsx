import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ latitude = 35.6895, longitude = 139.6917 }) => {
  return (
    <div className="w-full h-screen">
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        className="w-full h-full rounded-lg shadow-lg"
      >
        {/* 地图底图 */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />

        {/* 标记点 */}
        <Marker position={[latitude, longitude]}>
          <Popup>
            You are here! <br /> Latitude: {latitude}, Longitude: {longitude}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
