import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

const Map = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    // ✅ Ask for user's geolocation permission
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // ✅ If permission granted, use user's coordinates
          const { latitude, longitude } = pos.coords;
          console.log("✅ User location:", latitude, longitude);
          setPosition([latitude, longitude]);
        },
        (error) => {
          // ❌ If denied or failed, fallback to Sydney
          console.warn("❌ Geolocation error:", error.message);
          setPosition([-33.8688, 151.2093]); // Sydney, Australia
        }
      );
    } else {
      // ❌ If the browser does not support geolocation
      console.warn("Geolocation not supported");
      setPosition([-33.8688, 151.2093]); // Default: Sydney
    }
  }, []);

  // 💡 Show loading state before position is set
  if (!position) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Getting your location...
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <MapContainer
        center={position}
        zoom={13}
        className="w-full h-full rounded-lg shadow-lg"
      >
        {/* 🌍 Map tiles from OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default Map;
