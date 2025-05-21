"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Layers, Thermometer, BarChart3 } from "lucide-react"

// Mock neighborhood data for the map
const neighborhoods = [
  {
    id: "centro",
    name: "Centro",
    path: "M50,50 L100,50 L100,100 L50,100 Z",
    data: { temperature: 32, greenCover: 15, accessibility: 65 },
  },
  {
    id: "ipanema",
    name: "Ipanema",
    path: "M110,50 L160,50 L160,100 L110,100 Z",
    data: { temperature: 29, greenCover: 35, accessibility: 85 },
  },
  {
    id: "tijuca",
    name: "Tijuca",
    path: "M50,110 L100,110 L100,160 L50,160 Z",
    data: { temperature: 27, greenCover: 45, accessibility: 70 },
  },
  {
    id: "botafogo",
    name: "Botafogo",
    path: "M110,110 L160,110 L160,160 L110,160 Z",
    data: { temperature: 30, greenCover: 25, accessibility: 75 },
  },
  {
    id: "copacabana",
    name: "Copacabana",
    path: "M170,50 L220,50 L220,100 L170,100 Z",
    data: { temperature: 31, greenCover: 20, accessibility: 80 },
  },
  {
    id: "leblon",
    name: "Leblon",
    path: "M170,110 L220,110 L220,160 L170,160 Z",
    data: { temperature: 28, greenCover: 40, accessibility: 90 },
  },
  {
    id: "gavea",
    name: "Gávea",
    path: "M50,170 L100,170 L100,220 L50,220 Z",
    data: { temperature: 26, greenCover: 60, accessibility: 65 },
  },
  {
    id: "lagoa",
    name: "Lagoa",
    path: "M110,170 L160,170 L160,220 L110,220 Z",
    data: { temperature: 27, greenCover: 55, accessibility: 75 },
  },
]

// Mock hotspots for the heatmap
const hotspots = [
  { x: 75, y: 75, intensity: 0.8, type: "temperature" },
  { x: 135, y: 75, intensity: 0.5, type: "temperature" },
  { x: 75, y: 135, intensity: 0.3, type: "temperature" },
  { x: 135, y: 135, intensity: 0.6, type: "temperature" },
  { x: 195, y: 75, intensity: 0.7, type: "temperature" },
  { x: 195, y: 135, intensity: 0.4, type: "temperature" },
  { x: 75, y: 195, intensity: 0.2, type: "temperature" },
  { x: 135, y: 195, intensity: 0.5, type: "temperature" },

  { x: 85, y: 65, intensity: 0.3, type: "greenCover" },
  { x: 145, y: 65, intensity: 0.7, type: "greenCover" },
  { x: 85, y: 125, intensity: 0.8, type: "greenCover" },
  { x: 145, y: 125, intensity: 0.5, type: "greenCover" },
  { x: 205, y: 65, intensity: 0.4, type: "greenCover" },
  { x: 205, y: 125, intensity: 0.9, type: "greenCover" },
  { x: 85, y: 185, intensity: 0.9, type: "greenCover" },
  { x: 145, y: 185, intensity: 0.8, type: "greenCover" },

  { x: 65, y: 85, intensity: 0.6, type: "accessibility" },
  { x: 125, y: 85, intensity: 0.8, type: "accessibility" },
  { x: 65, y: 145, intensity: 0.7, type: "accessibility" },
  { x: 125, y: 145, intensity: 0.5, type: "accessibility" },
  { x: 185, y: 85, intensity: 0.9, type: "accessibility" },
  { x: 185, y: 145, intensity: 0.7, type: "accessibility" },
  { x: 65, y: 205, intensity: 0.4, type: "accessibility" },
  { x: 125, y: 205, intensity: 0.6, type: "accessibility" },
]

interface SpatialAnalyticsMapProps {
  data?: any
}

export function SpatialAnalyticsMap({ data }: SpatialAnalyticsMapProps) {
  const [mapType, setMapType] = useState("standard")
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null)
  const [showHeatIslands, setShowHeatIslands] = useState(true)
  const [showGreenCorridors, setShowGreenCorridors] = useState(true)
  const [showAccessibilityGaps, setShowAccessibilityGaps] = useState(true)
  const [heatmapMetric, setHeatmapMetric] = useState("temperature")
  const [choroplethMetric, setChoroplethMetric] = useState("greenCover")

  // Get color for choropleth map based on metric and value
  const getChoroplethColor = (neighborhoodId: string, metric: string) => {
    const neighborhood = neighborhoods.find((n) => n.id === neighborhoodId)
    if (!neighborhood) return "#e5e5e5"

    const value = neighborhood.data[metric as keyof typeof neighborhood.data]

    if (metric === "temperature") {
      // Temperature: higher is worse (red)
      if (value >= 32) return "#ef4444" // red-500
      if (value >= 30) return "#f97316" // orange-500
      if (value >= 28) return "#facc15" // yellow-500
      if (value >= 26) return "#84cc16" // lime-500
      return "#22c55e" // green-500
    } else if (metric === "greenCover") {
      // Green cover: higher is better (green)
      if (value >= 50) return "#14532d" // green-900
      if (value >= 40) return "#15803d" // green-700
      if (value >= 30) return "#22c55e" // green-500
      if (value >= 20) return "#86efac" // green-300
      return "#dcfce7" // green-100
    } else if (metric === "accessibility") {
      // Accessibility: higher is better (blue)
      if (value >= 80) return "#1e3a8a" // blue-900
      if (value >= 70) return "#1d4ed8" // blue-700
      if (value >= 60) return "#3b82f6" // blue-500
      if (value >= 50) return "#93c5fd" // blue-300
      return "#dbeafe" // blue-100
    }

    return "#e5e5e5" // Default gray
  }

  return (
    <Card className="border-2 border-black shadow-[4px_4px_0_0_black]">
      <CardHeader className="border-b-2 border-black bg-orange-100">
        <CardTitle className="flex justify-between items-center">
          <span>Análise Espacial</span>
          <Select value={selectedNeighborhood || ""} onValueChange={setSelectedNeighborhood}>
            <SelectTrigger className="w-[180px] border-2 border-black">
              <SelectValue placeholder="Selecione um bairro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os bairros</SelectItem>
              {neighborhoods.map((n) => (
                <SelectItem key={n.id} value={n.id}>
                  {n.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs value={mapType} onValueChange={setMapType} className="space-y-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="standard" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span>Padrão</span>
            </TabsTrigger>
            <TabsTrigger value="heatmap" className="flex items-center gap-2">
              <Thermometer className="h-4 w-4" />
              <span>Mapa de Calor</span>
            </TabsTrigger>
            <TabsTrigger value="choropleth" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Coroplético</span>
            </TabsTrigger>
          </TabsList>

          {/* Standard Map */}
          <TabsContent value="standard" className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <Button
                variant={showHeatIslands ? "default" : "outline"}
                onClick={() => setShowHeatIslands(!showHeatIslands)}
                className="border-2 border-black"
              >
                Ilhas de Calor
              </Button>
              <Button
                variant={showGreenCorridors ? "default" : "outline"}
                onClick={() => setShowGreenCorridors(!showGreenCorridors)}
                className="border-2 border-black"
              >
                Corredores Verdes
              </Button>
              <Button
                variant={showAccessibilityGaps ? "default" : "outline"}
                onClick={() => setShowAccessibilityGaps(!showAccessibilityGaps)}
                className="border-2 border-black"
              >
                Lacunas de Acessibilidade
              </Button>
            </div>

            <div className="relative border-2 border-black h-[400px] bg-gray-100">
              <svg width="100%" height="100%" viewBox="0 0 300 300">
                {/* Base map */}
                {neighborhoods.map((neighborhood) => (
                  <path
                    key={neighborhood.id}
                    d={neighborhood.path}
                    fill={selectedNeighborhood === neighborhood.id ? "#fde68a" : "#f5f5f5"}
                    stroke="black"
                    strokeWidth="2"
                    onClick={() => setSelectedNeighborhood(neighborhood.id)}
                    className="cursor-pointer hover:fill-yellow-100 transition-colors"
                  />
                ))}

                {/* Heat islands */}
                {showHeatIslands && (
                  <g>
                    <circle cx="75" cy="75" r="15" fill="red" opacity="0.3" />
                    <circle cx="195" cy="75" r="20" fill="red" opacity="0.3" />
                    <circle cx="135" cy="135" r="25" fill="red" opacity="0.3" />
                  </g>
                )}

                {/* Green corridors */}
                {showGreenCorridors && (
                  <g>
                    <rect x="85" y="120" width="130" height="20" fill="green" opacity="0.3" />
                    <rect x="75" y="60" width="20" height="160" fill="green" opacity="0.3" />
                  </g>
                )}

                {/* Accessibility gaps */}
                {showAccessibilityGaps && (
                  <g>
                    <circle cx="135" cy="75" r="18" fill="blue" opacity="0.3" />
                    <circle cx="75" cy="195" r="22" fill="blue" opacity="0.3" />
                    <circle cx="195" cy="135" r="15" fill="blue" opacity="0.3" />
                  </g>
                )}

                {/* Labels */}
                {neighborhoods.map((neighborhood) => (
                  <text
                    key={`label-${neighborhood.id}`}
                    x={Number.parseInt(neighborhood.path.split(" ")[1]) + 25}
                    y={Number.parseInt(neighborhood.path.split(" ")[2]) + 25}
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {neighborhood.name}
                  </text>
                ))}
              </svg>
            </div>
          </TabsContent>

          {/* Heat Map */}
          <TabsContent value="heatmap" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium">Selecione a métrica:</div>
              <Select value={heatmapMetric} onValueChange={setHeatmapMetric}>
                <SelectTrigger className="w-[180px] border-2 border-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temperature">Temperatura</SelectItem>
                  <SelectItem value="greenCover">Cobertura Verde</SelectItem>
                  <SelectItem value="accessibility">Acessibilidade</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative border-2 border-black h-[400px] bg-gray-100">
              <svg width="100%" height="100%" viewBox="0 0 300 300">
                {/* Base map */}
                {neighborhoods.map((neighborhood) => (
                  <path
                    key={neighborhood.id}
                    d={neighborhood.path}
                    fill="#f5f5f5"
                    stroke="black"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                ))}

                {/* Heat map gradient */}
                <defs>
                  <radialGradient id="heatGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop
                      offset="0%"
                      stopColor={
                        heatmapMetric === "temperature"
                          ? "rgba(239, 68, 68, 0.9)"
                          : heatmapMetric === "greenCover"
                            ? "rgba(34, 197, 94, 0.9)"
                            : "rgba(59, 130, 246, 0.9)"
                      }
                    />
                    <stop
                      offset="30%"
                      stopColor={
                        heatmapMetric === "temperature"
                          ? "rgba(239, 68, 68, 0.7)"
                          : heatmapMetric === "greenCover"
                            ? "rgba(34, 197, 94, 0.7)"
                            : "rgba(59, 130, 246, 0.7)"
                      }
                    />
                    <stop
                      offset="70%"
                      stopColor={
                        heatmapMetric === "temperature"
                          ? "rgba(239, 68, 68, 0.3)"
                          : heatmapMetric === "greenCover"
                            ? "rgba(34, 197, 94, 0.3)"
                            : "rgba(59, 130, 246, 0.3)"
                      }
                    />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                  </radialGradient>
                </defs>

                {/* Heat spots */}
                {hotspots
                  .filter((spot) => spot.type === heatmapMetric)
                  .map((spot, index) => (
                    <circle
                      key={`heatspot-${index}`}
                      cx={spot.x}
                      cy={spot.y}
                      r={30 * spot.intensity}
                      fill="url(#heatGradient)"
                    />
                  ))}

                {/* Labels */}
                {neighborhoods.map((neighborhood) => (
                  <text
                    key={`label-${neighborhood.id}`}
                    x={Number.parseInt(neighborhood.path.split(" ")[1]) + 25}
                    y={Number.parseInt(neighborhood.path.split(" ")[2]) + 25}
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {neighborhood.name}
                  </text>
                ))}
              </svg>
            </div>
          </TabsContent>

          {/* Choropleth Map */}
          <TabsContent value="choropleth" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium">Selecione a métrica:</div>
              <Select value={choroplethMetric} onValueChange={setChoroplethMetric}>
                <SelectTrigger className="w-[180px] border-2 border-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temperature">Temperatura</SelectItem>
                  <SelectItem value="greenCover">Cobertura Verde</SelectItem>
                  <SelectItem value="accessibility">Acessibilidade</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative border-2 border-black h-[400px] bg-gray-100">
              <svg width="100%" height="100%" viewBox="0 0 300 300">
                {/* Choropleth map */}
                {neighborhoods.map((neighborhood) => (
                  <path
                    key={neighborhood.id}
                    d={neighborhood.path}
                    fill={getChoroplethColor(neighborhood.id, choroplethMetric)}
                    stroke="black"
                    strokeWidth="2"
                    onClick={() => setSelectedNeighborhood(neighborhood.id)}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}

                {/* Labels */}
                {neighborhoods.map((neighborhood) => (
                  <text
                    key={`label-${neighborhood.id}`}
                    x={Number.parseInt(neighborhood.path.split(" ")[1]) + 25}
                    y={Number.parseInt(neighborhood.path.split(" ")[2]) + 25}
                    fontSize="10"
                    fontWeight="bold"
                    fill={choroplethMetric === "temperature" ? "black" : "white"}
                    textAnchor="middle"
                  >
                    {neighborhood.name}
                  </text>
                ))}
              </svg>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center mt-2">
              <div className="flex items-center space-x-1">
                {choroplethMetric === "temperature" ? (
                  <>
                    <div className="w-4 h-4 bg-green-500"></div>
                    <div className="w-4 h-4 bg-lime-500"></div>
                    <div className="w-4 h-4 bg-yellow-500"></div>
                    <div className="w-4 h-4 bg-orange-500"></div>
                    <div className="w-4 h-4 bg-red-500"></div>
                    <div className="flex justify-between w-full text-xs px-1">
                      <span>Baixa</span>
                      <span>Alta</span>
                    </div>
                  </>
                ) : choroplethMetric === "greenCover" ? (
                  <>
                    <div className="w-4 h-4 bg-green-100"></div>
                    <div className="w-4 h-4 bg-green-300"></div>
                    <div className="w-4 h-4 bg-green-500"></div>
                    <div className="w-4 h-4 bg-green-700"></div>
                    <div className="w-4 h-4 bg-green-900"></div>
                    <div className="flex justify-between w-full text-xs px-1">
                      <span>Baixa</span>
                      <span>Alta</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 bg-blue-100"></div>
                    <div className="w-4 h-4 bg-blue-300"></div>
                    <div className="w-4 h-4 bg-blue-500"></div>
                    <div className="w-4 h-4 bg-blue-700"></div>
                    <div className="w-4 h-4 bg-blue-900"></div>
                    <div className="flex justify-between w-full text-xs px-1">
                      <span>Baixa</span>
                      <span>Alta</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Selected neighborhood details */}
        {selectedNeighborhood && (
          <div className="mt-4 p-4 border-2 border-black bg-yellow-50">
            <h3 className="font-bold text-lg mb-2">{neighborhoods.find((n) => n.id === selectedNeighborhood)?.name}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-sm font-medium">Temperatura</div>
                <div className="text-2xl font-bold">
                  {neighborhoods.find((n) => n.id === selectedNeighborhood)?.data.temperature}°C
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">Cobertura Verde</div>
                <div className="text-2xl font-bold">
                  {neighborhoods.find((n) => n.id === selectedNeighborhood)?.data.greenCover}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">Acessibilidade</div>
                <div className="text-2xl font-bold">
                  {neighborhoods.find((n) => n.id === selectedNeighborhood)?.data.accessibility}/100
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
