"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { ChargingStation } from "@/lib/charging-stations"

// Fix for Leaflet marker icons in Next.js
const fixLeafletIcons = () => {
  // Only run on client side
  if (typeof window !== "undefined") {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })
  }
}

// Custom marker icon
const createCustomIcon = (isActive: boolean) => {
  return new L.Icon({
    iconUrl: isActive
      ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"
      : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })
}

interface StationMapProps {
  station: ChargingStation
}

export default function StationMap({ station }: StationMapProps) {
  // Fix Leaflet icons
  useEffect(() => {
    fixLeafletIcons()
  }, [])

  return (
    <MapContainer
      center={[station.location.lat, station.location.lng]}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[station.location.lat, station.location.lng]} icon={createCustomIcon(station.isFunctional)}>
        <Popup>
          <div className="text-sm">
            <h3 className="font-bold">{station.name}</h3>
            <p>{station.address}</p>
            <p className="mt-1">
              {station.isFunctional ? (
                <span className="text-green-600 font-medium">Operational</span>
              ) : (
                <span className="text-red-600 font-medium">Not Operational</span>
              )}
            </p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}
