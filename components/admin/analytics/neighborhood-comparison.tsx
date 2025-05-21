"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight } from "lucide-react"
import type { Neighborhood } from "@/data/mock-analytics-data"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts"

interface NeighborhoodComparisonProps {
  data?: Neighborhood[]
  neighborhoods?: Neighborhood[]
}

export function NeighborhoodComparison({ data, neighborhoods }: NeighborhoodComparisonProps) {
  // Use either data or neighborhoods prop, or default to empty array
  const neighborhoodData = data || neighborhoods || []

  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([
    neighborhoodData.length > 0 ? neighborhoodData[0].id : "",
    neighborhoodData.length > 1 ? neighborhoodData[1].id : "",
  ])

  const handleNeighborhoodChange = (index: number, value: string) => {
    const newSelected = [...selectedNeighborhoods]
    newSelected[index] = value
    setSelectedNeighborhoods(newSelected)
  }

  const swapNeighborhoods = () => {
    setSelectedNeighborhoods([selectedNeighborhoods[1], selectedNeighborhoods[0]])
  }

  const neighborhood1 = neighborhoodData.find((n) => n.id === selectedNeighborhoods[0])
  const neighborhood2 = neighborhoodData.find((n) => n.id === selectedNeighborhoods[1])

  // Prepare data for radar chart
  const radarData = [
    { subject: "Cobertura Verde", A: neighborhood1?.greenCover || 0, B: neighborhood2?.greenCover || 0, fullMark: 50 },
    { subject: "Índice de Calor", A: neighborhood1?.heatIndex || 0, B: neighborhood2?.heatIndex || 0, fullMark: 5 },
    {
      subject: "Acessibilidade",
      A: neighborhood1?.accessibilityScore || 0,
      B: neighborhood2?.accessibilityScore || 0,
      fullMark: 100,
    },
    {
      subject: "Densidade de Relatórios",
      A: neighborhood1?.reportDensity || 0,
      B: neighborhood2?.reportDensity || 0,
      fullMark: 50,
    },
    {
      subject: "Caminhabilidade",
      A: neighborhood1?.walkabilityScore || 0,
      B: neighborhood2?.walkabilityScore || 0,
      fullMark: 100,
    },
  ]

  return (
    <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h3 className="text-lg font-bold mb-1">Comparação de Bairros</h3>
            <p className="text-sm text-gray-500">Compare indicadores entre diferentes bairros</p>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <Select
              value={selectedNeighborhoods[0]}
              onValueChange={(value) => handleNeighborhoodChange(0, value)}
              disabled={neighborhoodData.length === 0}
            >
              <SelectTrigger className="w-[180px] border-2 border-black">
                <SelectValue placeholder="Selecione um bairro" />
              </SelectTrigger>
              <SelectContent>
                {neighborhoodData.map((neighborhood) => (
                  <SelectItem key={neighborhood.id} value={neighborhood.id}>
                    {neighborhood.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              className="border-2 border-black"
              onClick={swapNeighborhoods}
              disabled={neighborhoodData.length < 2}
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>

            <Select
              value={selectedNeighborhoods[1]}
              onValueChange={(value) => handleNeighborhoodChange(1, value)}
              disabled={neighborhoodData.length < 2}
            >
              <SelectTrigger className="w-[180px] border-2 border-black">
                <SelectValue placeholder="Selecione um bairro" />
              </SelectTrigger>
              <SelectContent>
                {neighborhoodData.map((neighborhood) => (
                  <SelectItem key={neighborhood.id} value={neighborhood.id}>
                    {neighborhood.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {neighborhoodData.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="border-2 border-black p-4 h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar
                        name={neighborhood1?.name || "Bairro 1"}
                        dataKey="A"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                      <Radar
                        name={neighborhood2?.name || "Bairro 2"}
                        dataKey="B"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.6}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <Card className="border-2 border-black h-full">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-lg mb-4">Comparação Detalhada</h4>

                    {neighborhood1 && neighborhood2 ? (
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-sm">Cobertura Verde</h5>
                          <div className="flex justify-between mt-1">
                            <div className="text-center">
                              <div className="text-lg font-bold">{neighborhood1.greenCover}%</div>
                              <div className="text-xs">{neighborhood1.name}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">{neighborhood2.greenCover}%</div>
                              <div className="text-xs">{neighborhood2.name}</div>
                            </div>
                          </div>
                          <div className="text-xs text-center mt-1">
                            Diferença: {Math.abs(neighborhood1.greenCover - neighborhood2.greenCover).toFixed(1)}%
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-sm">Índice de Calor</h5>
                          <div className="flex justify-between mt-1">
                            <div className="text-center">
                              <div className="text-lg font-bold">{neighborhood1.heatIndex}</div>
                              <div className="text-xs">{neighborhood1.name}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">{neighborhood2.heatIndex}</div>
                              <div className="text-xs">{neighborhood2.name}</div>
                            </div>
                          </div>
                          <div className="text-xs text-center mt-1">
                            Diferença: {Math.abs(neighborhood1.heatIndex - neighborhood2.heatIndex).toFixed(1)}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-sm">Acessibilidade</h5>
                          <div className="flex justify-between mt-1">
                            <div className="text-center">
                              <div className="text-lg font-bold">{neighborhood1.accessibilityScore}/100</div>
                              <div className="text-xs">{neighborhood1.name}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">{neighborhood2.accessibilityScore}/100</div>
                              <div className="text-xs">{neighborhood2.name}</div>
                            </div>
                          </div>
                          <div className="text-xs text-center mt-1">
                            Diferença: {Math.abs(neighborhood1.accessibilityScore - neighborhood2.accessibilityScore)}
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button className="w-full bg-black text-white hover:bg-gray-800">
                            Ver Relatório Completo
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">Selecione dois bairros para comparar</div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <p>Nenhum dado de bairro disponível para comparação.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
