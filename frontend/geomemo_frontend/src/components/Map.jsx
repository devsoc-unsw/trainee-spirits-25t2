import { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"

export default function Map() {
  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"/>
    </MapContainer>
  );
}
