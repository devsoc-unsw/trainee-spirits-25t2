import { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"

export default function Map() {
  return (
    <MapContainer center={[-33.8727, 151.2057]} zoom={13} className="h-[90vh] w-full">
      <TileLayer attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"/>
    </MapContainer>
  );
}
