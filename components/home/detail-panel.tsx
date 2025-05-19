"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { NeobrutalismBarChart } from "@/components/neobrutalism-bar-chart"
import { NeobrutalismLineChart } from "@/components/neobrutalism-line-chart"

interface DetailPanelProps {
  isOpen: boolean
  onClose: () => void
  selectedLocation: string | null
  greenCoverageData: { label: string; value: number; color: string }[]
  temperatureData: {
    labels: string[]
    data: {
      label: string
      values: number[]
      color: string
    }[]
  }
}

export function DetailPanel({
  isOpen,
  onClose,
  selectedLocation,
  greenCoverageData,
  temperatureData,
}: DetailPanelProps) {
  return (
    <div
      className={cn(
        "absolute top-0 right-0 bottom-0 w-full md:w-96 bg-white z-20 transition-transform duration-300 border-l-4 border-black shadow-neobrutalism",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="p-4 h-full overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold truncate">{selectedLocation}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 border-4 border-black shadow-neobrutalism">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-xs md:text-sm"
            >
              Visão Geral
            </TabsTrigger>
            <TabsTrigger
              value="trends"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-xs md:text-sm"
            >
              Tendências
            </TabsTrigger>
            <TabsTrigger
              value="photos"
              className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white text-xs md:text-sm"
            >
              Fotos
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-xs md:text-sm"
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
              <NeobrutalismBarChart title="Cobertura Verde (2018-2025)" data={greenCoverageData} />

              {/* Neobrutalism Line Chart */}
              <NeobrutalismLineChart
                title="Temperatura (Jan-Jun 2025)"
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
  )
}
