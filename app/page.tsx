"use client"

import { useState, useEffect, useCallback } from "react"
import { MapContainer } from "@/components/home/map-container"
import { NavigationBar } from "@/components/home/navigation-bar"
import { LayerControls } from "@/components/home/layer-controls"
import { KpiCards } from "@/components/home/kpi-cards"
import { DetailPanel } from "@/components/home/detail-panel"
import { FiltersSidebar } from "@/components/home/filters-sidebar"
import { ReportButton } from "@/components/home/report-button"
import { ReportingModal } from "@/components/reporting-modal"
import { UserNavigation } from "@/components/home/user-navigation"
import { initializeMapbox } from "@/lib/mapbox"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

// Initialize Mapbox with the access token
initializeMapbox()

// Ensure token is set
if (typeof window !== "undefined") {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""
}

export default function Dashboard() {
  const [lng, setLng] = useState(-47.9292)
  const [lat, setLat] = useState(-15.7801)
  const [zoom, setZoom] = useState(5)
  const [detailPanelOpen, setDetailPanelOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [activeLayer, setActiveLayer] = useState<string>("heat")
  const [reportingModalOpen, setReportingModalOpen] = useState(false)
  const [clickedLocation, setClickedLocation] = useState<{ lat: number; lng: number } | undefined>(undefined)
  const [showNavigation, setShowNavigation] = useState(false)

  // Sample data for charts
  const greenCoverageData = [
    { label: "2018", value: 18, color: "#4ade80" },
    { label: "2019", value: 20, color: "#4ade80" },
    { label: "2020", value: 22, color: "#4ade80" },
    { label: "2021", value: 21, color: "#4ade80" },
    { label: "2022", value: 23, color: "#4ade80" },
    { label: "2025", value: 25, color: "#4ade80" },
  ]

  const temperatureData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    data: [
      {
        label: "Temperatura (°C)",
        values: [32, 31, 30, 29, 28, 27],
        color: "#ef4444",
      },
      {
        label: "Média (°C)",
        values: [28, 27, 26, 25, 24, 23],
        color: "#60a5fa",
      },
    ],
  }

  // Initialize Mapbox on component mount
  useEffect(() => {
    // Initialize Mapbox
    initializeMapbox()
    console.log("Current Mapbox token:", mapboxgl.accessToken ? "Token exists" : "No token")
  }, [])

  // Get user location - using useCallback to prevent unnecessary re-renders
  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLng(position.coords.longitude)
          setLat(position.coords.latitude)
          setZoom(13)

          // Update the location name
          setSelectedLocation("Sua Localização")
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }, [])

  // Handle map click - using useCallback to prevent unnecessary re-renders
  const handleMapClick = useCallback((lat: number, lng: number) => {
    setDetailPanelOpen(true)
    setSelectedLocation("Setor Comercial Sul, Brasília")
    setClickedLocation({ lat, lng })
  }, [])

  // Handle location select - using useCallback to prevent unnecessary re-renders
  const handleLocationSelect = useCallback(
    (location: { name: string; coordinates: [number, number] }) => {
      // Update the map position
      setLng(location.coordinates[0])
      setLat(location.coordinates[1])
      setZoom(14)

      // Update the location name
      setSelectedLocation(location.name)

      // Save the clicked location for the reporting modal
      setClickedLocation({ lat: location.coordinates[1], lng: location.coordinates[0] })

      // Update the marker position - with safety checks
      if (typeof window !== "undefined") {
        try {
          const mapInstance = (window as any).mapInstance
          const searchMarker = (window as any).searchMarker

          if (mapInstance && searchMarker) {
            // Only try to add the marker if the map is fully loaded
            if (mapInstance.loaded && typeof mapInstance.loaded === "function" && mapInstance.loaded()) {
              searchMarker.setLngLat(location.coordinates).addTo(mapInstance)
            } else {
              console.log("Map not fully loaded yet, skipping marker addition")
            }
          } else {
            console.log("Map or marker not initialized yet")
          }
        } catch (error) {
          console.error("Error adding marker to map:", error)
        }
      }
    },
    [mapLoaded],
  )

  // Handle map loaded - using useCallback to prevent unnecessary re-renders
  const handleMapLoaded = useCallback(() => {
    setMapLoaded(true)
  }, [])

  // Handle report button click
  const handleReportButtonClick = useCallback(() => {
    // If we have a clicked location, use it, otherwise use the current map center
    if (!clickedLocation && mapLoaded) {
      try {
        const mapInstance = (window as any).mapInstance
        if (mapInstance) {
          const center = mapInstance.getCenter()
          setClickedLocation({ lat: center.lat, lng: center.lng })
        }
      } catch (error) {
        console.error("Error getting map center:", error)
      }
    }

    setReportingModalOpen(true)
  }, [clickedLocation, mapLoaded])

  // Toggle navigation menu
  const toggleNavigation = useCallback(() => {
    setShowNavigation((prev) => !prev)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      {/* Map Container */}
      <MapContainer
        lng={lng}
        lat={lat}
        zoom={zoom}
        onMapLoaded={handleMapLoaded}
        onMapClick={handleMapClick}
        activeLayer={activeLayer}
        mapLoaded={mapLoaded}
      />

      {/* Top Navigation Bar */}
      <NavigationBar
        onMenuClick={() => {
          setSidebarOpen(true)
          toggleNavigation()
        }}
        onLocationSelect={handleLocationSelect}
        onMyLocationClick={getUserLocation}
      />

      {/* User Navigation */}
      {showNavigation && <UserNavigation />}

      {/* Layer Controls */}
      <LayerControls activeLayer={activeLayer} onLayerChange={setActiveLayer} />

      {/* KPI Cards */}
      <KpiCards />

      {/* Reporting CTA */}
      <ReportButton onClick={handleReportButtonClick} />

      {/* Detail Panel */}
      <DetailPanel
        isOpen={detailPanelOpen}
        onClose={() => setDetailPanelOpen(false)}
        selectedLocation={selectedLocation}
        greenCoverageData={greenCoverageData}
        temperatureData={temperatureData}
      />

      {/* Filters Sidebar */}
      <FiltersSidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />

      {/* Reporting Modal */}
      <ReportingModal
        open={reportingModalOpen}
        onOpenChange={setReportingModalOpen}
        initialLocation={clickedLocation}
      />
    </div>
  )
}
