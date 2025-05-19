"use client"

import { Button } from "@/components/ui/button"
import { Menu, MapPin } from "lucide-react"
import { LocationSearch } from "@/components/home/location-search"
import { useMobile } from "@/hooks/use-mobile"

interface NavigationBarProps {
  onMenuClick: () => void
  onLocationSelect: (location: { name: string; coordinates: [number, number] }) => void
  onMyLocationClick: () => void
}

export function NavigationBar({ onMenuClick, onLocationSelect, onMyLocationClick }: NavigationBarProps) {
  const isMobile = useMobile()

  return (
    <div className="absolute top-4 left-4 right-4 flex flex-col md:flex-row items-start md:items-center justify-between z-10 gap-2">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Button
          variant="neobrutalism"
          size="icon"
          className="bg-green-500 hover:bg-green-600 border-4 border-black shadow-neobrutalism"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="text-xl font-bold bg-white px-3 py-1 border-4 border-black shadow-neobrutalism">Pare Verde</div>
      </div>

      {/* Location Search */}
      <div className="flex-1 w-full md:max-w-xl md:mx-4">
        <LocationSearch onLocationSelect={onLocationSelect} />
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
        <Button
          variant="neobrutalism"
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 border-4 border-black shadow-neobrutalism text-white"
          onClick={onMyLocationClick}
        >
          <MapPin className="h-5 w-5 mr-2" />
          {isMobile ? "Localização" : "Minha Localização"}
        </Button>
      </div>
    </div>
  )
}
