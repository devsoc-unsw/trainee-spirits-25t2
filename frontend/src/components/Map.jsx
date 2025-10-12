import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// This helper component lets you control the map imperatively
const MapController = ({ selectedMemo }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedMemo) {
      const [lon, lat] = selectedMemo.location.coordinates;
      map.flyTo([lat, lon], 10, { duration: 1.5 }); // smooth animation
    }
  }, [selectedMemo, map]);

  return null;
};

export default function Map({ memos, selectedMemo, setSelectedMemo }) {
  const defaultCenter = memos.length
    ? [memos[0].location.coordinates[1], memos[0].location.coordinates[0]]
    : [-33.8688, 151.2093]; // Sydney fallback

  return (
    <MapContainer center={defaultCenter} zoom={3} className="w-full h-screen">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      />

      {/* map controller to follow selectedMemo */}
      <MapController selectedMemo={selectedMemo} />

      {memos.map((memo) => {
        const [lon, lat] = memo.location.coordinates;
        return (
          <Marker key={memo._id} position={[lat, lon]}>
            <Popup>
              <div className="text-sm text-gray-800">
                <p>
                  <strong>{memo.city}</strong>, {memo.country}
                </p>
                <p className="text-gray-500">
                  {new Date(memo.createdAt).toLocaleString()}
                </p>
                <button
                  className="mt-2 text-blue-600 underline hover:text-blue-800"
                  onClick={() => setSelectedMemo(memo)}
                >
                  View memory →
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
