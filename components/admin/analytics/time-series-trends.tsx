"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import type { TimeSeriesDataPoint } from "@/data/mock-analytics-data"

interface TimeSeriesTrendsProps {
  data: TimeSeriesDataPoint[]
  dateRange?: { from: Date | undefined; to: Date | undefined }
  district?: string
  selectedMetrics: string[]
  setSelectedMetrics: (metrics: string[]) => void
}

export function TimeSeriesTrends({
  data,
  dateRange = { from: undefined, to: undefined },
  district = "all",
  selectedMetrics,
  setSelectedMetrics,
}: TimeSeriesTrendsProps) {
  const [chartType, setChartType] = useState<"line" | "bar">("line")

  const toggleMetric = (metric: string) => {
    if (selectedMetrics.includes(metric)) {
      setSelectedMetrics(selectedMetrics.filter((m) => m !== metric))
    } else {
      setSelectedMetrics([...selectedMetrics, metric])
    }
  }

  // Filter data based on date range
  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.date)
    return (!dateRange.from || itemDate >= dateRange.from) && (!dateRange.to || itemDate <= dateRange.to)
  })

  return (
    <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h3 className="text-lg font-bold mb-1">Tendências ao Longo do Tempo</h3>
            <p className="text-sm text-gray-500">
              {district === "all" ? "Todos os distritos" : `Distrito: ${district}`}
            </p>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button
              variant={chartType === "line" ? "default" : "outline"}
              className={`border-2 border-black ${
                chartType === "line" ? "bg-black text-white" : "bg-white text-black"
              }`}
              onClick={() => setChartType("line")}
            >
              Linha
            </Button>
            <Button
              variant={chartType === "bar" ? "default" : "outline"}
              className={`border-2 border-black ${chartType === "bar" ? "bg-black text-white" : "bg-white text-black"}`}
              onClick={() => setChartType("bar")}
            >
              Barra
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="border-2 border-black p-4 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "line" ? (
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {selectedMetrics.includes("greenCover") && (
                      <Line
                        type="monotone"
                        dataKey="greenCover"
                        name="Cobertura Verde (%)"
                        stroke="#22c55e"
                        activeDot={{ r: 8 }}
                      />
                    )}
                    {selectedMetrics.includes("heatIndex") && (
                      <Line
                        type="monotone"
                        dataKey="heatIndex"
                        name="Índice de Calor (°C)"
                        stroke="#ef4444"
                        activeDot={{ r: 8 }}
                      />
                    )}
                    {selectedMetrics.includes("accessibilityIssues") && (
                      <Line
                        type="monotone"
                        dataKey="accessibilityIssues"
                        name="Problemas de Acessibilidade"
                        stroke="#3b82f6"
                        activeDot={{ r: 8 }}
                      />
                    )}
                    {selectedMetrics.includes("reportVolume") && (
                      <Line
                        type="monotone"
                        dataKey="reportVolume"
                        name="Volume de Relatórios"
                        stroke="#a855f7"
                        activeDot={{ r: 8 }}
                      />
                    )}
                  </LineChart>
                ) : (
                  <BarChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {selectedMetrics.includes("greenCover") && (
                      <Bar dataKey="greenCover" name="Cobertura Verde (%)" fill="#22c55e" />
                    )}
                    {selectedMetrics.includes("heatIndex") && (
                      <Bar dataKey="heatIndex" name="Índice de Calor (°C)" fill="#ef4444" />
                    )}
                    {selectedMetrics.includes("accessibilityIssues") && (
                      <Bar dataKey="accessibilityIssues" name="Problemas de Acessibilidade" fill="#3b82f6" />
                    )}
                    {selectedMetrics.includes("reportVolume") && (
                      <Bar dataKey="reportVolume" name="Volume de Relatórios" fill="#a855f7" />
                    )}
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <Card className="border-2 border-black h-full">
              <CardContent className="p-4">
                <h4 className="font-bold text-lg mb-4">Métricas</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="greenCover"
                      checked={selectedMetrics.includes("greenCover")}
                      onCheckedChange={() => toggleMetric("greenCover")}
                    />
                    <Label htmlFor="greenCover" className="flex items-center cursor-pointer">
                      <div className="w-3 h-3 bg-green-500 mr-2"></div>
                      Cobertura Verde (%)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="heatIndex"
                      checked={selectedMetrics.includes("heatIndex")}
                      onCheckedChange={() => toggleMetric("heatIndex")}
                    />
                    <Label htmlFor="heatIndex" className="flex items-center cursor-pointer">
                      <div className="w-3 h-3 bg-red-500 mr-2"></div>
                      Índice de Calor (°C)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="accessibilityIssues"
                      checked={selectedMetrics.includes("accessibilityIssues")}
                      onCheckedChange={() => toggleMetric("accessibilityIssues")}
                    />
                    <Label htmlFor="accessibilityIssues" className="flex items-center cursor-pointer">
                      <div className="w-3 h-3 bg-blue-500 mr-2"></div>
                      Problemas de Acessibilidade
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="reportVolume"
                      checked={selectedMetrics.includes("reportVolume")}
                      onCheckedChange={() => toggleMetric("reportVolume")}
                    />
                    <Label htmlFor="reportVolume" className="flex items-center cursor-pointer">
                      <div className="w-3 h-3 bg-purple-500 mr-2"></div>
                      Volume de Relatórios
                    </Label>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-bold text-sm mb-2">Fonte dos Dados</h4>
                  <div className="text-xs text-gray-500 space-y-2">
                    <p>• Cobertura Verde: Análise de imagens de satélite</p>
                    <p>• Índice de Calor: Sensores urbanos e modelos climáticos</p>
                    <p>• Acessibilidade: Auditorias e relatórios cidadãos</p>
                    <p>• Volume: Agregação de relatórios da plataforma</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
