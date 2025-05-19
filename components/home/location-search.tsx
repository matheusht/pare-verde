"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search, X, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { MAPBOX_ACCESS_TOKEN } from "@/lib/mapbox"

interface LocationSearchProps {
  onLocationSelect: (location: {
    name: string
    coordinates: [number, number] // [longitude, latitude]
  }) => void
  className?: string
}

export function LocationSearch({ onLocationSelect, className }: LocationSearchProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Search for locations using Mapbox Geocoding API
  const searchLocations = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    try {
      // Using Mapbox Geocoding API with the token directly
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery,
        )}.json?access_token=${MAPBOX_ACCESS_TOKEN}&types=address,place,locality,neighborhood&language=pt-BR&limit=5`,
      )

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      setSuggestions(data.features || [])
      setShowSuggestions(true)
    } catch (error) {
      console.error("Error searching for locations:", error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Debounce search to avoid too many API calls
  useEffect(() => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    // Set new timeout
    searchTimeoutRef.current = setTimeout(() => {
      searchLocations(query)
    }, 300)

    // Cleanup function
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [query, searchLocations])

  const handleSelectLocation = useCallback(
    (suggestion: any) => {
      const locationName = suggestion.place_name
      const coordinates = suggestion.center // [longitude, latitude]

      // Clear the input and suggestions after selection
      setQuery("")
      setSuggestions([])
      setShowSuggestions(false)

      // Call the parent component's handler
      onLocationSelect({
        name: locationName,
        coordinates: coordinates,
      })
    },
    [onLocationSelect],
  )

  const clearSearch = useCallback(() => {
    setQuery("")
    setSuggestions([])
    setShowSuggestions(false)
  }, [])

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar por endereço, bairro ou cidade..."
          className="w-full pl-10 pr-10 py-2 border-4 border-black shadow-neobrutalism"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            // Only show suggestions if we have some
            if (suggestions.length > 0) {
              setShowSuggestions(true)
            }
          }}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute z-50 w-full mt-1 border-4 border-black shadow-neobrutalism max-h-[300px] overflow-y-auto">
          <ul className="py-1">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-start gap-2"
                onClick={() => handleSelectLocation(suggestion)}
              >
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-red-500" />
                <span>{suggestion.place_name}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {isLoading && (
        <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin h-4 w-4 border-2 border-black rounded-full border-t-transparent"></div>
        </div>
      )}
    </div>
  )
}
