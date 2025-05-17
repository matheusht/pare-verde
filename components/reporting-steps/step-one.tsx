"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

// Set Mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoibWF0aGV1c2h0IiwiYSI6ImNtMXdzZXk2azBxeDcybW9lcjNsNXJ3OHUifQ.-hEjgr1XHuAwVKUHwGTfcA"

interface StepOneProps {
  formData: {
    category: string
    location: { lat: number; lng: number }
  }
  updateFormData: (data: Partial<{ category: string; location: { lat: number; lng: number } }>) => void
}

export function StepOne({ formData, updateFormData }: StepOneProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const marker = useRef<mapboxgl.Marker | null>(null)
  const [mapInitialized, setMapInitialized] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)

  // Initialize map when component mounts
  useEffect(() => {
    // Only initialize once and when the container is available
    if (map.current || !mapContainer.current) return

    try {
      // Create the map instance
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [formData.location.lng, formData.location.lat],
        zoom: 14,
        attributionControl: false, // Hide attribution for cleaner look
      })

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          showCompass: false,
        }),
        "top-right",
      )

      // Create marker but don't add it to the map yet
      marker.current = new mapboxgl.Marker({
        color: "#FF0000",
        draggable: true,
      })

      // Handle map load event
      map.current.on("load", () => {
        console.log("Map loaded successfully")
        setMapInitialized(true)

        // Add marker to the map after it's loaded
        if (marker.current && map.current) {
          marker.current.setLngLat([formData.location.lng, formData.location.lat]).addTo(map.current)

          // Update location when marker is dragged
          marker.current.on("dragend", () => {
            if (marker.current) {
              const lngLat = marker.current.getLngLat()
              updateFormData({
                location: {
                  lat: lngLat.lat,
                  lng: lngLat.lng,
                },
              })
            }
          })
        }

        // Update marker position when map is clicked
        map.current.on("click", (e) => {
          if (marker.current) {
            // Update marker position
            marker.current.setLngLat([e.lngLat.lng, e.lngLat.lat])

            // Update form data with new coordinates
            updateFormData({
              location: {
                lat: e.lngLat.lat,
                lng: e.lngLat.lng,
              },
            })

            // Don't call map.flyTo() here - we want the map to stay where the user clicked
          }
        })
      })

      // Handle map error
      map.current.on("error", (e) => {
        console.error("Map error:", e.error)
        setMapError("Erro ao carregar o mapa. Por favor, tente novamente.")
      })
    } catch (error) {
      console.error("Error initializing map:", error)
      setMapError("Erro ao inicializar o mapa. Por favor, tente novamente.")
    }

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  // Add a new useEffect to update the marker position when formData.location changes
  // Add this after the first useEffect:
  useEffect(() => {
    // Only update if the map and marker are initialized and the change wasn't triggered by a map click
    if (marker.current && map.current && mapInitialized) {
      // Update marker position without moving the map
      marker.current.setLngLat([formData.location.lng, formData.location.lat])

      // We don't want to automatically move the map when the coordinates change
      // from manual input, as this can be disorienting. Instead, we'll add a
      // separate button for that purpose.
    }
  }, [formData.location.lat, formData.location.lng, mapInitialized])

  // Fallback content if map fails to load
  const renderMapFallback = () => {
    if (mapError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-4 text-center">
          <MapPin className="h-12 w-12 mb-2 text-red-500" />
          <p className="text-red-500 font-bold">{mapError}</p>
          <p className="text-sm mt-2">
            Você pode inserir as coordenadas manualmente abaixo ou tentar recarregar a página.
          </p>
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <MapPin className="h-12 w-12 mb-2 animate-pulse text-blue-500" />
        <p className="font-medium">Carregando mapa...</p>
      </div>
    )
  }

  // Manual coordinate input handlers
  const handleLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lat = Number.parseFloat(e.target.value)
    if (!isNaN(lat)) {
      updateFormData({
        location: {
          ...formData.location,
          lat,
        },
      })
    }
  }

  const handleLngChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lng = Number.parseFloat(e.target.value)
    if (!isNaN(lng)) {
      updateFormData({
        location: {
          ...formData.location,
          lng,
        },
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="category" className="text-lg font-bold">
          Categoria do Problema
        </Label>
        <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value })}>
          <SelectTrigger id="category" className="border-4 border-black shadow-neobrutalism">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent className="border-4 border-black shadow-neobrutalism">
            <SelectItem value="missing-ramp">Rampa de acessibilidade ausente</SelectItem>
            <SelectItem value="obstruction">Obstrução na calçada</SelectItem>
            <SelectItem value="uneven-surface">Superfície irregular</SelectItem>
            <SelectItem value="broken-sidewalk">Calçada quebrada</SelectItem>
            <SelectItem value="missing-tree">Área sem árvores</SelectItem>
            <SelectItem value="heat-island">Ilha de calor</SelectItem>
            <SelectItem value="flooding">Área de alagamento</SelectItem>
            <SelectItem value="other">Outro problema</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-lg font-bold">Localização</Label>
        <p className="text-sm text-gray-500 mb-2">
          Clique no mapa ou arraste o marcador para ajustar a localização exata
        </p>

        <Card className="border-4 border-black shadow-neobrutalism p-0 overflow-hidden h-[300px] relative">
          <div ref={mapContainer} className="w-full h-full" />
          {!mapInitialized && renderMapFallback()}
        </Card>

        <div className="flex items-center justify-between mt-2 gap-4">
          <div className="flex-1 space-y-1">
            <Label htmlFor="latitude" className="text-xs">
              Latitude
            </Label>
            <input
              id="latitude"
              type="number"
              step="0.000001"
              value={formData.location.lat}
              onChange={handleLatChange}
              className="w-full p-2 border-4 border-black shadow-neobrutalism text-sm"
            />
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor="longitude" className="text-xs">
              Longitude
            </Label>
            <input
              id="longitude"
              type="number"
              step="0.000001"
              value={formData.location.lng}
              onChange={handleLngChange}
              className="w-full p-2 border-4 border-black shadow-neobrutalism text-sm"
            />
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={() => {
              if (map.current) {
                map.current.flyTo({
                  center: [formData.location.lng, formData.location.lat],
                  zoom: map.current.getZoom(), // Maintain current zoom level
                  essential: true,
                })
              }
            }}
            className="px-3 py-1 text-sm bg-blue-500 text-white border-2 border-black shadow-neobrutalism hover:bg-blue-600"
          >
            Centralizar Mapa
          </button>
        </div>
      </div>
    </div>
  )
}
