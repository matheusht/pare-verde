"use client"

import { useState, useEffect, useRef } from "react"
import { Plus, MapPin, ChevronRight, X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Toggle } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"
import { ReportingModal } from "@/components/reporting-modal"
import { NeobrutalismBarChart } from "@/components/bar-chart"
import { NeobrutalismLineChart } from "@/components/line-chart"
import { LocationSearch } from "@/components/location-search"
import { initializeMapbox } from "@/lib/mapbox"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

// Set Mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoibWF0aGV1c2h0IiwiYSI6ImNtMXdzZXk2azBxeDcybW9lcjNsNXJ3OHUifQ.-hEjgr1XHuAwVKUHwGTfcA"


// Initialize Mapbox with the access token
initializeMapbox()

export default function Dashboard() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const searchMarker = useRef<mapboxgl.Marker | null>(null)
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

  // Sample data for charts
  const greenCoverageData = [
    { label: "2018", value: 18, color: "#4ade80" },
    { label: "2019", value: 20, color: "#4ade80" },
    { label: "2020", value: 22, color: "#4ade80" },
    { label: "2021", value: 21, color: "#4ade80" },
    { label: "2022", value: 23, color: "#4ade80" },
    { label: "2023", value: 25, color: "#4ade80" },
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

  // Initialize map when component mounts
  useEffect(() => {
    if (map.current) return // initialize map only once

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [lng, lat],
        zoom: zoom,
      })

      map.current.on("load", () => {
        setMapLoaded(true)

        // Add heat island layer (example)
        map.current?.addSource("heat-islands", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        })

        map.current?.addLayer({
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
        map.current?.addSource("green-cover", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        })

        map.current?.addLayer({
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

        // Add click event to show detail panel
        map.current?.on("click", (e) => {
          setDetailPanelOpen(true)
          setSelectedLocation("Setor Comercial Sul, Brasília")
          setClickedLocation({ lat: e.lngLat.lat, lng: e.lngLat.lng })
        })

        // Initialize search marker but don't add it to the map yet
        searchMarker.current = new mapboxgl.Marker({
          color: "#FF0000",
          draggable: false,
        })
      })
    }
  }, [lng, lat, zoom])

  // Update layer visibility when active layer changes
  useEffect(() => {
    if (map.current && mapLoaded) {
      map.current.setLayoutProperty("heat-islands-layer", "visibility", activeLayer === "heat" ? "visible" : "none")
      map.current.setLayoutProperty("green-cover-layer", "visibility", activeLayer === "green" ? "visible" : "none")
    }
  }, [activeLayer, mapLoaded])

  // Get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLng(position.coords.longitude)
          setLat(position.coords.latitude)
          setZoom(13)

          if (map.current) {
            map.current.flyTo({
              center: [position.coords.longitude, position.coords.latitude],
              zoom: 13,
              essential: true,
            })

            // Update search marker
            if (searchMarker.current) {
              searchMarker.current.setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map.current)
            }
          }
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  const handleReportButtonClick = () => {
    setReportingModalOpen(true)
  }

  // Handle location selection from search
  const handleLocationSelect = (location: { name: string; coordinates: [number, number] }) => {
    if (map.current) {
      // Update the map position
      map.current.flyTo({
        center: location.coordinates,
        zoom: 14,
        essential: true,
      })

      // Update the search marker
      if (searchMarker.current) {
        searchMarker.current.setLngLat(location.coordinates).addTo(map.current)
      } else {
        // Create a new marker if it doesn't exist
        searchMarker.current = new mapboxgl.Marker({
          color: "#FF0000",
          draggable: false,
        })
          .setLngLat(location.coordinates)
          .addTo(map.current)
      }

      // Update state
      setLng(location.coordinates[0])
      setLat(location.coordinates[1])
      setSelectedLocation(location.name)
    }
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      {/* Map Container */}
      <div ref={mapContainer} className="absolute inset-0 h-full w-full" />

      {/* Top Navigation Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Button
            variant="neobrutalism"
            size="icon"
            className="bg-green-500 hover:bg-green-600 border-4 border-black shadow-neobrutalism"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="text-xl font-bold bg-white px-3 py-1 border-4 border-black shadow-neobrutalism">
            Pare Verde
          </div>
        </div>

        {/* Location Search */}
        <div className="flex-1 max-w-xl mx-4">
          <LocationSearch onLocationSelect={handleLocationSelect} />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="neobrutalism"
            className="bg-blue-500 hover:bg-blue-600 border-4 border-black shadow-neobrutalism text-white"
            onClick={getUserLocation}
          >
            <MapPin className="h-5 w-5 mr-2" />
            Minha Localização
          </Button>
        </div>
      </div>

      {/* Layer Controls */}
      <div className="absolute top-20 right-4 z-10">
        <Card className="p-4 border-4 border-black shadow-neobrutalism bg-white">
          <h3 className="font-bold mb-2">Camadas</h3>
          <div className="flex flex-col gap-2">
            <Toggle
              pressed={activeLayer === "heat"}
              onPressedChange={() => setActiveLayer("heat")}
              className="justify-start border-2 border-black data-[state=on]:bg-red-200"
            >
              <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
              Ilhas de Calor
            </Toggle>
            <Toggle
              pressed={activeLayer === "green"}
              onPressedChange={() => setActiveLayer("green")}
              className="justify-start border-2 border-black data-[state=on]:bg-green-200"
            >
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              Cobertura Verde
            </Toggle>
            <Toggle className="justify-start border-2 border-black data-[state=on]:bg-blue-200">
              <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
              Ciclovias
            </Toggle>
            <Toggle className="justify-start border-2 border-black data-[state=on]:bg-purple-200">
              <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
              Acessibilidade
            </Toggle>
          </div>
        </Card>
      </div>

      {/* KPI Cards */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex gap-4 overflow-x-auto pb-2">
        <Card className="min-w-[200px] border-4 border-black shadow-neobrutalism bg-white p-4">
          <h3 className="font-bold text-lg">Cobertura Verde</h3>
          <p className="text-3xl font-bold text-green-600">23%</p>
          <p className="text-sm text-gray-600">Média da cidade</p>
        </Card>

        <Card className="min-w-[200px] border-4 border-black shadow-neobrutalism bg-white p-4">
          <h3 className="font-bold text-lg">Ilhas de Calor</h3>
          <p className="text-3xl font-bold text-red-600">12</p>
          <p className="text-sm text-gray-600">Zonas críticas</p>
        </Card>

        <Card className="min-w-[200px] border-4 border-black shadow-neobrutalism bg-white p-4">
          <h3 className="font-bold text-lg">Acessibilidade</h3>
          <p className="text-3xl font-bold text-blue-600">68%</p>
          <p className="text-sm text-gray-600">Calçadas adequadas</p>
        </Card>

        <Card className="min-w-[200px] border-4 border-black shadow-neobrutalism bg-white p-4">
          <h3 className="font-bold text-lg">Temperatura</h3>
          <p className="text-3xl font-bold text-orange-600">+3.2°C</p>
          <p className="text-sm text-gray-600">Acima da média</p>
        </Card>
      </div>

      {/* Reporting CTA */}
      <Button
        variant="neobrutalism"
        size="icon"
        className="absolute bottom-20 right-4 z-10 h-14 w-14 rounded-full bg-yellow-400 hover:bg-yellow-500 border-4 border-black shadow-neobrutalism"
        onClick={handleReportButtonClick}
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Detail Panel */}
      <div
        className={cn(
          "absolute top-0 right-0 bottom-0 w-96 bg-white z-20 transition-transform duration-300 border-l-4 border-black shadow-neobrutalism",
          detailPanelOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{selectedLocation}</h2>
            <Button variant="ghost" size="icon" onClick={() => setDetailPanelOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 border-4 border-black shadow-neobrutalism">
              <TabsTrigger value="overview" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="trends" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                Tendências
              </TabsTrigger>
              <TabsTrigger value="photos" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
                Fotos
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Recomendações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <div className="space-y-4">
                <Card className="p-4 border-4 border-black shadow-neobrutalism">
                  <h3 className="font-bold">Cobertura de Sombra</h3>
                  <p className="text-2xl font-bold">18%</p>
                  <p className="text-sm text-gray-600">5% abaixo da média da cidade</p>
                </Card>

                <Card className="p-4 border-4 border-black shadow-neobrutalism">
                  <h3 className="font-bold">Caminhabilidade</h3>
                  <p className="text-2xl font-bold">72/100</p>
                  <p className="text-sm text-gray-600">Boa, mas com pontos de melhoria</p>
                </Card>

                <Card className="p-4 border-4 border-black shadow-neobrutalism">
                  <h3 className="font-bold">Árvores</h3>
                  <p className="text-2xl font-bold">243</p>
                  <p className="text-sm text-gray-600">Num raio de 500m</p>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="mt-4">
              <div className="space-y-4">
                {/* Neobrutalism Bar Chart */}
                <NeobrutalismBarChart title="Cobertura Verde (2018-2023)" data={greenCoverageData} />

                {/* Neobrutalism Line Chart */}
                <NeobrutalismLineChart
                  title="Temperatura (Jan-Jun 2023)"
                  labels={temperatureData.labels}
                  data={temperatureData.data}
                />
              </div>
            </TabsContent>

            <TabsContent value="photos" className="mt-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-square bg-gray-200 flex items-center justify-center border-4 border-black shadow-neobrutalism">
                  <p className="text-gray-500">Foto 1</p>
                </div>
                <div className="aspect-square bg-gray-200 flex items-center justify-center border-4 border-black shadow-neobrutalism">
                  <p className="text-gray-500">Foto 2</p>
                </div>
                <div className="aspect-square bg-gray-200 flex items-center justify-center border-4 border-black shadow-neobrutalism">
                  <p className="text-gray-500">Foto 3</p>
                </div>
                <div className="aspect-square bg-gray-200 flex items-center justify-center border-4 border-black shadow-neobrutalism">
                  <p className="text-gray-500">Foto 4</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="mt-4">
              <div className="space-y-4">
                <Card className="p-4 border-4 border-black shadow-neobrutalism bg-green-100">
                  <h3 className="font-bold">Adicionar Árvores</h3>
                  <p className="text-sm">
                    Recomendamos o plantio de 20-30 árvores nativas ao longo da Avenida Principal.
                  </p>
                  <Button
                    variant="neobrutalism"
                    className="mt-2 bg-green-500 hover:bg-green-600 border-4 border-black shadow-neobrutalism text-white"
                  >
                    Ver Detalhes
                  </Button>
                </Card>

                <Card className="p-4 border-4 border-black shadow-neobrutalism bg-blue-100">
                  <h3 className="font-bold">Melhorar Calçadas</h3>
                  <p className="text-sm">Identificamos 5 pontos críticos de acessibilidade que precisam de rampas.</p>
                  <Button
                    variant="neobrutalism"
                    className="mt-2 bg-blue-500 hover:bg-blue-600 border-4 border-black shadow-neobrutalism text-white"
                  >
                    Ver Detalhes
                  </Button>
                </Card>

                <Card className="p-4 border-4 border-black shadow-neobrutalism bg-purple-100">
                  <h3 className="font-bold">Reduzir Ilha de Calor</h3>
                  <p className="text-sm">
                    Substituir pavimento escuro por materiais reflexivos pode reduzir a temperatura em até 2°C.
                  </p>
                  <Button
                    variant="neobrutalism"
                    className="mt-2 bg-purple-500 hover:bg-purple-600 border-4 border-black shadow-neobrutalism text-white"
                  >
                    Ver Detalhes
                  </Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Filters Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-80 border-r-4 border-black shadow-neobrutalism p-0">
          <div className="p-4 border-b-4 border-black bg-green-100">
            <h2 className="text-xl font-bold">Filtros & Análise</h2>
          </div>

          <div className="p-4 space-y-6">
            <div>
              <h3 className="font-bold mb-2">Período</h3>
              <div className="px-2">
                <Slider defaultValue={[2023]} min={2010} max={2023} step={1} className="border-2 border-black" />
                <div className="flex justify-between mt-1 text-sm">
                  <span>2010</span>
                  <span>2023</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-2">Temas</h3>
              <div className="space-y-2">
                <Button
                  variant="neobrutalism"
                  className="w-full justify-start bg-red-100 hover:bg-red-200 border-4 border-black shadow-neobrutalism"
                >
                  <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                  Ilhas de Calor
                </Button>
                <Button
                  variant="neobrutalism"
                  className="w-full justify-start bg-green-100 hover:bg-green-200 border-4 border-black shadow-neobrutalism"
                >
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  Áreas Verdes
                </Button>
                <Button
                  variant="neobrutalism"
                  className="w-full justify-start bg-blue-100 hover:bg-blue-200 border-4 border-black shadow-neobrutalism"
                >
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                  Caminhabilidade
                </Button>
                <Button
                  variant="neobrutalism"
                  className="w-full justify-start bg-purple-100 hover:bg-purple-200 border-4 border-black shadow-neobrutalism"
                >
                  <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                  Acessibilidade
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-2">Regiões</h3>
              <div className="space-y-2">
                <Button
                  variant="neobrutalism"
                  className="w-full justify-start bg-yellow-100 hover:bg-yellow-200 border-4 border-black shadow-neobrutalism"
                >
                  Centro
                </Button>
                <Button
                  variant="neobrutalism"
                  className="w-full justify-start bg-yellow-100 hover:bg-yellow-200 border-4 border-black shadow-neobrutalism"
                >
                  Zona Norte
                </Button>
                <Button
                  variant="neobrutalism"
                  className="w-full justify-start bg-yellow-100 hover:bg-yellow-200 border-4 border-black shadow-neobrutalism"
                >
                  Zona Sul
                </Button>
                <Button
                  variant="neobrutalism"
                  className="w-full justify-start bg-yellow-100 hover:bg-yellow-200 border-4 border-black shadow-neobrutalism"
                >
                  Zona Leste
                </Button>
                <Button
                  variant="neobrutalism"
                  className="w-full justify-start bg-yellow-100 hover:bg-yellow-200 border-4 border-black shadow-neobrutalism"
                >
                  Zona Oeste
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-2">Relatórios</h3>
              <div className="space-y-2">
                <Button
                  variant="neobrutalism"
                  className="w-full justify-between bg-white hover:bg-gray-100 border-4 border-black shadow-neobrutalism"
                >
                  Relatório de Sustentabilidade
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <Button
                  variant="neobrutalism"
                  className="w-full justify-between bg-white hover:bg-gray-100 border-4 border-black shadow-neobrutalism"
                >
                  Análise de Acessibilidade
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <Button
                  variant="neobrutalism"
                  className="w-full justify-between bg-white hover:bg-gray-100 border-4 border-black shadow-neobrutalism"
                >
                  Mapa de Calor Urbano
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Reporting Modal */}
      <ReportingModal
        open={reportingModalOpen}
        onOpenChange={setReportingModalOpen}
        initialLocation={clickedLocation}
      />
    </div>
  )
}
