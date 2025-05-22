"use client"

import { useEffect, useRef, useState, memo } from "react"
import mapboxgl from "mapbox-gl"
import { MAPBOX_ACCESS_TOKEN } from "@/lib/mapbox"

// Ensure token is set
if (typeof window !== "undefined") {
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN
}

interface MapContainerProps {
  lng: number
  lat: number
  zoom: number
  onMapLoaded: () => void
  onMapClick: (lat: number, lng: number) => void
  activeLayer: string
  mapLoaded: boolean
}

// Using memo to prevent unnecessary re-renders
const MapContainer = memo(function MapContainer({
  lng,
  lat,
  zoom,
  onMapLoaded,
  onMapClick,
  activeLayer,
  mapLoaded,
}: MapContainerProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const searchMarker = useRef<mapboxgl.Marker | null>(null)
  const [styleLoaded, setStyleLoaded] = useState(false)
  const mapInitializedRef = useRef(false)

  // Initialize map when component mounts - only once
  useEffect(() => {
    // Skip if map is already initialized or container is not available
    if (mapInitializedRef.current || !mapContainer.current) return

    // Mark as initialized to prevent multiple initializations
    mapInitializedRef.current = true

    // Double-check that the token is set
    if (!mapboxgl.accessToken) {
      console.error("Mapbox token not set!")
      mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN
    }

    try {
      console.log("Creating map with token:", mapboxgl.accessToken.substring(0, 10) + "...")

      // Fix: Set the container width and height explicitly to ensure proper rendering
      if (mapContainer.current) {
        mapContainer.current.style.width = "100%"
        mapContainer.current.style.height = "100%"
      }

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
        // Fix: Ensure the map takes up the full container
        width: "100%",
        height: "100%",
      })

      // Listen for style.load event which happens after the map style is fully loaded
      map.current.on("style.load", () => {
        console.log("Map style loaded successfully")
        setStyleLoaded(true)

        // Add heat island layer (example)
        if (map.current) {
          try {
            map.current.addSource("heat-islands", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [],
              },
            })

            map.current.addLayer({
              id: "heat-islands-layer",
              type: "heatmap",
              source: "heat-islands",
              paint: {
                "heatmap-weight": ["interpolate", ["linear"], ["get", "temperature"], 0, 0, 40, 1],
                "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
                "heatmap-color": [
                  "interpolate",
                  ["linear"],
                  ["heatmap-density"],
                  0,
                  "rgba(236,222,239,0)",
                  0.2,
                  "rgb(208,209,230)",
                  0.4,
                  "rgb(166,189,219)",
                  0.6,
                  "rgb(103,169,207)",
                  0.8,
                  "rgb(28,144,153)",
                  1,
                  "rgb(1,108,89)",
                ],
                "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
                "heatmap-opacity": 0.7,
              },
              layout: {
                visibility: activeLayer === "heat" ? "visible" : "none",
              },
            })

            // Add green cover layer (example)
            map.current.addSource("green-cover", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [],
              },
            })

            map.current.addLayer({
              id: "green-cover-layer",
              type: "fill",
              source: "green-cover",
              paint: {
                "fill-color": [
                  "interpolate",
                  ["linear"],
                  ["get", "green_percentage"],
                  0,
                  "#f7fcb9",
                  25,
                  "#addd8e",
                  50,
                  "#41ab5d",
                  75,
                  "#006837",
                  100,
                  "#004529",
                ],
                "fill-opacity": 0.7,
              },
              layout: {
                visibility: activeLayer === "green" ? "visible" : "none",
              },
            })
          } catch (error) {
            console.error("Error adding layers:", error)
          }
        }
      })

      map.current.on("load", () => {
        console.log("Map loaded successfully")
        onMapLoaded()

        // Initialize search marker but don't add it to the map yet
        searchMarker.current = new mapboxgl.Marker({
          color: "#FF0000",
          draggable: false,
        })

        // Add click event to show detail panel
        map.current?.on("click", (e) => {
          onMapClick(e.lngLat.lat, e.lngLat.lng)
        })

        // Fix: Force resize to ensure the map renders correctly
        setTimeout(() => {
          if (map.current) {
            map.current.resize()
          }
        }, 100)
      })

      map.current.on("error", (e) => {
        console.error("Map error:", e)
      })

      // Fix: Add resize handler to ensure map fills container when window size changes
      const handleResize = () => {
        if (map.current) {
          map.current.resize()
        }
      }

      window.addEventListener("resize", handleResize)

      // Fix: Initial resize after a short delay
      setTimeout(handleResize, 200)
    } catch (error) {
      console.error("Error initializing map:", error)
    }

    // Expose the map instance to parent components
    if (typeof window !== "undefined") {
      // Fixed the syntax error here - these should be separate statements
      ;(window as any).mapInstance = map.current
      ;(window as any).searchMarker = searchMarker.current
    }

    // Cleanup function
    return () => {
      const handleResize = () => {
        if (map.current) {
          map.current.resize()
        }
      }
      window.removeEventListener("resize", handleResize)
      if (map.current) {
        map.current.remove()
        map.current = null
        mapInitializedRef.current = false
      }
    }
  }, []) // Empty dependency array to ensure this only runs once

  // Update map center and zoom when props change
  useEffect(() => {
    if (map.current && mapInitializedRef.current) {
      map.current.flyTo({
        center: [lng, lat],
        zoom: zoom,
        essential: true,
      })
    }
  }, [lng, lat, zoom])

  // Update layer visibility when active layer changes
  useEffect(() => {
    if (!map.current || !styleLoaded) return

    // Check if the layers exist before trying to update them
    try {
      if (map.current.getLayer("heat-islands-layer")) {
        map.current.setLayoutProperty("heat-islands-layer", "visibility", activeLayer === "heat" ? "visible" : "none")
      }

      if (map.current.getLayer("green-cover-layer")) {
        map.current.setLayoutProperty("green-cover-layer", "visibility", activeLayer === "green" ? "visible" : "none")
      }
    } catch (error) {
      console.error("Error updating layer visibility:", error)
    }
  }, [activeLayer, styleLoaded])

  return <div ref={mapContainer} className="absolute inset-0 h-full w-full" style={{ width: "100%", height: "100%" }} />
})

export { MapContainer }
