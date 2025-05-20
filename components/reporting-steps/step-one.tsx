"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { MapPin, Loader } from "lucide-react"
import { MAPBOX_ACCESS_TOKEN } from "@/lib/mapbox"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

// Ensure token is set
if (typeof window !== "undefined") {
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN
}

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
  const [styleLoaded, setStyleLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  // Initialize map when component mounts
  useEffect(() => {
    // Only initialize once and when the container is available
    if (map.current || !mapContainer.current) return

    // Double-check that the token is set
    if (!mapboxgl.accessToken) {
      console.error("Mapbox token not set in StepOne!")
      mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN
    }

    try {
      console.log("Creating map in StepOne with token:", mapboxgl.accessToken.substring(0, 10) + "...")
      console.log("Initial location:", formData.location)

      // Create the map instance
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [formData.location.lng, formData.location.lat],
        zoom: 14,
        attributionControl: false, // Hide attribution for cleaner look
      })

      // Listen for style.load event
      map.current.on("style.load", () => {
        console.log("Map style loaded in StepOne")
        setStyleLoaded(true)
      })

      // Handle map load event
      map.current.on("load", () => {
        console.log("Map loaded successfully in StepOne")
        setMapInitialized(true)

        // Add navigation controls
        map.current?.addControl(
          new mapboxgl.NavigationControl({
            showCompass: false,
          }),
          "top-right",
        )

        // Create marker and add it to the map
        marker.current = new mapboxgl.Marker({
          color: "#FF0000",
          draggable: true,
        })
          .setLngLat([formData.location.lng, formData.location.lat])
          .addTo(map.current)

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
          }
        })
      })

      // Handle map error
      map.current.on("error", (e) => {
        console.error("Map error in StepOne:", e)
        setMapError("Erro ao carregar o mapa. Por favor, tente novamente.")
      })
    } catch (error) {
      console.error("Error initializing map in StepOne:", error)
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

  // Update map when formData.location changes
  useEffect(() => {
    if (map.current && marker.current && mapInitialized) {
      console.log("Updating map with new location:", formData.location)

      // Update marker position
      marker.current.setLngLat([formData.location.lng, formData.location.lat])

      // Update map center
      map.current.flyTo({
        center: [formData.location.lng, formData.location.lat],
        zoom: 14,
        essential: true,
      })
    }
  }, [formData.location, mapInitialized])

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      setIsGettingLocation(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }

          // Update form data with new location
          updateFormData({ location: newLocation })

          setIsGettingLocation(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsGettingLocation(false)
          alert("Não foi possível obter sua localização. Por favor, verifique as permissões do navegador.")
        },
        { enableHighAccuracy: true },
      )
    } else {
      alert("Geolocalização não é suportada pelo seu navegador.")
    }
  }

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

        <div className="flex flex-col sm:flex-row items-center justify-between mt-2 gap-4">
          <div className="w-full sm:w-auto flex-1 grid grid-cols-2 gap-2">
            <div className="space-y-1">
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
            <div className="space-y-1">
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
          <button
            type="button"
            onClick={getUserLocation}
            disabled={isGettingLocation}
            className="w-full sm:w-auto px-3 py-2 text-sm bg-blue-500 text-white border-4 border-black shadow-neobrutalism hover:bg-blue-600 flex items-center justify-center"
          >
            {isGettingLocation ? (
              <>
                <Loader className="animate-spin mr-2 h-4 w-4" />
                Obtendo...
              </>
            ) : (
              "Minha Localização"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
