"use client"

import { forwardRef, useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
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

// Custom marker icons
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

// Component to handle map view updates
const MapUpdater = ({
  center,
  zoom,
}: {
  center?: [number, number]
  zoom?: number
}) => {
  const map = useMap()

  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom())
    }
  }, [center, zoom, map])

  return null
}

interface ChargingStationMapProps {
  stations: ChargingStation[]
  selectedStation: ChargingStation | null
  onStationSelect: (station: ChargingStation) => void
  userLocation: { lat: number; lng: number } | null
}

const ChargingStationMap = forwardRef<any, ChargingStationMapProps>(
  ({ stations, selectedStation, onStationSelect, userLocation }, ref) => {
    const [mapCenter, setMapCenter] = useState<[number, number]>([27.7172, 85.324]) // Default to Kathmandu
    const [mapZoom, setMapZoom] = useState(12)

    // Fix Leaflet icons
    useEffect(() => {
      fixLeafletIcons()
    }, [])

    // Update map center when selected station changes
    useEffect(() => {
      if (selectedStation) {
        setMapCenter([selectedStation.location.lat, selectedStation.location.lng])
        setMapZoom(15)
      }
    }, [selectedStation])

    // Update map center when user location changes
    useEffect(() => {
      if (userLocation) {
        setMapCenter([userLocation.lat, userLocation.lng])
        setMapZoom(14)
      }
    }, [userLocation])

    // Update map center when stations change (to fit all stations)
    useEffect(() => {
      if (stations.length > 0 && !selectedStation && !userLocation) {
        // Calculate the center of all stations
        const totalLat = stations.reduce((sum, station) => sum + station.location.lat, 0)
        const totalLng = stations.reduce((sum, station) => sum + station.location.lng, 0)
        const centerLat = totalLat / stations.length
        const centerLng = totalLng / stations.length

        setMapCenter([centerLat, centerLng])

        // Adjust zoom level based on number of stations
        if (stations.length === 1) {
          setMapZoom(15)
        } else if (stations.length < 5) {
          setMapZoom(13)
        } else {
          setMapZoom(11)
        }
      }
    }, [stations, selectedStation, userLocation])

    return (
      <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: "100%", width: "100%" }} ref={ref}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Update map view when center changes */}
        <MapUpdater center={mapCenter} zoom={mapZoom} />

        {/* Render charging station markers */}
        {stations.map((station) => (
          <Marker
            key={station.id}
            position={[station.location.lat, station.location.lng]}
            icon={createCustomIcon(station.isFunctional)}
            eventHandlers={{
              click: () => onStationSelect(station),
            }}
          >
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
                <button className="text-primary hover:underline mt-1" onClick={() => onStationSelect(station)}>
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Render user location marker if available */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={
              new L.Icon({
                iconUrl:
                  "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
                shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
              })
            }
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-bold">Your Location</h3>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    )
  },
)

ChargingStationMap.displayName = "ChargingStationMap"

export default ChargingStationMap
