"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Layers, MapPin, Thermometer, TreesIcon as Tree, ShipWheelIcon as Wheelchair } from "lucide-react"
import type { Report } from "@/types/report"
import { MAPBOX_ACCESS_TOKEN } from "@/lib/mapbox"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

// Ensure token is set
if (typeof window !== "undefined") {
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN
}

interface MapOverviewProps {
  reports: Report[]
  isLoading: boolean
}

export function MapOverview({ reports, isLoading }: MapOverviewProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [activeLayer, setActiveLayer] = useState<string>("all")
  const [showHeatmap, setShowHeatmap] = useState<boolean>(false)
  const [mapInitialized, setMapInitialized] = useState<boolean>(false)

  // Initialize map when component mounts
  useEffect(() => {
    if (isLoading || !mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-47.9292, -15.7801], // Brasília as default
      zoom: 11,
    })

    map.current.on("load", () => {
      setMapInitialized(true)
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [isLoading])

  // Update markers when reports or filters change
  useEffect(() => {
    if (!mapInitialized || !map.current) return

    // Remove existing markers
    const markers = document.querySelectorAll(".mapboxgl-marker")
    markers.forEach((marker) => marker.remove())

    // Filter reports based on active layer
    const filteredReports = reports.filter((report) => {
      if (activeLayer === "all") return true
      if (activeLayer === "accessibility") {
        return ["missing-ramp", "obstruction", "uneven-surface", "broken-sidewalk"].includes(report.category)
      }
      if (activeLayer === "green") {
        return ["missing-tree", "heat-island"].includes(report.category)
      }
      if (activeLayer === "infrastructure") {
        return ["flooding"].includes(report.category)
      }
      return false
    })

    // Add markers for filtered reports
    filteredReports.forEach((report) => {
      // Create marker element
      const el = document.createElement("div")
      el.className = "marker"
      el.style.width = "30px"
      el.style.height = "30px"
      el.style.borderRadius = "50%"
      el.style.backgroundColor = getMarkerColor(report.category)
      el.style.border = "4px solid black"
      el.style.boxShadow = "2px 2px 0px 0px rgba(0,0,0,1)"
      el.style.cursor = "pointer"

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat([report.coordinates.lng, report.coordinates.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(
            `<div style="padding: 8px;">
              <h3 style="font-weight: bold; margin-bottom: 4px;">${report.title}</h3>
              <p style="font-size: 12px; margin-bottom: 4px;">${report.location}</p>
              <p style="font-size: 12px; color: ${getStatusColor(report.status)};">
                ${getStatusLabel(report.status)}
              </p>
            </div>`,
          ),
        )
        .addTo(map.current!)
    })

    // If we have reports, fit the map to show all markers
    if (filteredReports.length > 0) {
      const bounds = new mapboxgl.LngLatBounds()
      filteredReports.forEach((report) => {
        bounds.extend([report.coordinates.lng, report.coordinates.lat])
      })
      map.current.fitBounds(bounds, { padding: 50 })
    }
  }, [reports, activeLayer, mapInitialized])

  // Helper functions
  const getMarkerColor = (category: string) => {
    if (["missing-ramp", "obstruction", "uneven-surface", "broken-sidewalk"].includes(category)) {
      return "#ef4444" // Red for accessibility issues
    }
    if (["missing-tree", "heat-island"].includes(category)) {
      return "#22c55e" // Green for environmental issues
    }
    if (["flooding"].includes(category)) {
      return "#3b82f6" // Blue for infrastructure issues
    }
    return "#a855f7" // Purple for other issues
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#eab308" // Yellow
      case "in-progress":
        return "#3b82f6" // Blue
      case "resolved":
        return "#22c55e" // Green
      case "rejected":
        return "#ef4444" // Red
      default:
        return "#6b7280" // Gray
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente"
      case "in-progress":
        return "Em Andamento"
      case "resolved":
        return "Resolvido"
      case "rejected":
        return "Rejeitado"
      default:
        return "Desconhecido"
    }
  }

  return (
    <Card className="border-4 border-black shadow-neobrutalism">
      <CardHeader className="bg-green-100 border-b-4 border-black">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-xl">Mapa de Relatórios</CardTitle>
          <div className="flex items-center gap-2">
            <Toggle
              pressed={showHeatmap}
              onPressedChange={setShowHeatmap}
              className="border-2 border-black data-[state=on]:bg-orange-200"
            >
              <Thermometer className="h-4 w-4 mr-1" />
              Mapa de Calor
            </Toggle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-2 border-b-4 border-black bg-gray-50">
          <Tabs defaultValue="all" value={activeLayer} onValueChange={setActiveLayer}>
            <TabsList className="grid grid-cols-4 w-full border-4 border-black shadow-neobrutalism">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                <Layers className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">Todos</span>
              </TabsTrigger>
              <TabsTrigger
                value="accessibility"
                className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
              >
                <Wheelchair className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">Acessibilidade</span>
              </TabsTrigger>
              <TabsTrigger value="green" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                <Tree className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">Áreas Verdes</span>
              </TabsTrigger>
              <TabsTrigger
                value="infrastructure"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                <MapPin className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">Infraestrutura</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="h-[400px] relative">
          {isLoading ? (
            <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
              <p className="text-gray-500">Carregando mapa...</p>
            </div>
          ) : (
            <div ref={mapContainer} className="h-full w-full" />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
