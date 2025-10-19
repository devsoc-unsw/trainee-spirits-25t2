import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMemos } from "../hooks/useMemo.js";

// This helper component lets you control the map imperatively
const MapController = ({ selectedMemo }) => {
  const [, setSearchParams] = useSearchParams();

  const map = useMap();

  useEffect(() => {
    if (selectedMemo) {
      const [lon, lat] = selectedMemo.location.coordinates;
      map.flyTo([lat, lon], 10, { duration: 1.5 }); // smooth animation
      setSearchParams({ lat: lat.toFixed(6), lng: lon.toFixed(6) });
    }
  }, [selectedMemo, setSearchParams, map]);

  return null;
};

// 🖱️ Component to handle map clicks
const ClickHandler = ({ setClickedPoint, setSelectedMemo }) => {
  const [, setSearchParams] = useSearchParams();
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      console.log("📍 Clicked coordinates:", lat, lng);

      // Move map center to the clicked point
      map.setView([lat, lng], map.getZoom(), { animate: true });

      setSearchParams({ lat: lat.toFixed(6), lng: lng.toFixed(6) });
      setClickedPoint({ lat: lat.toFixed(6), lng: lng.toFixed(6) });
      setSelectedMemo(null);
    },
  });

  return null;
};

export default function Map({
  selectedMemo,
  setSelectedMemo,
  setClickedPoint,
}) {
  const { memos } = useMemos();
  useEffect(() => {
    console.log(selectedMemo);
  }, [selectedMemo]);
  const [searchParams] = useSearchParams();

  const lat = parseFloat(searchParams.get("lat"));
  const lng = parseFloat(searchParams.get("lng"));

  const defaultCenter =
    !isNaN(lat) && !isNaN(lng)
      ? [lat, lng]
      : memos.length > 0
      ? [memos[0].location.coordinates[1], memos[0].location.coordinates[0]]
      : [-33.8688, 151.2093];

  return (
    <MapContainer center={defaultCenter} zoom={10} className="w-full h-screen">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      />

      {/* map controller to follow selectedMemo */}
      <MapController selectedMemo={selectedMemo} />

      {/* 🖱️ handle map clicks */}
      <ClickHandler
        setClickedPoint={setClickedPoint}
        setSelectedMemo={setSelectedMemo}
      />

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
