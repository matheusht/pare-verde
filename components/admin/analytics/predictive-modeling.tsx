"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { PredictiveScenario } from "@/data/mock-analytics-data"

interface PredictiveModelingProps {
  scenarios: PredictiveScenario[]
}

export function PredictiveModeling({ scenarios }: PredictiveModelingProps) {
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0].id)
  const [intensity, setIntensity] = useState(50)
  const [budget, setBudget] = useState(2000000)

  const scenario = scenarios.find((s) => s.id === selectedScenario)

  // Calculate adjusted impacts based on intensity
  const intensityFactor = intensity / 50
  const adjustedImpacts = scenario
    ? {
        heatReduction: scenario.impacts.heatReduction * intensityFactor,
        greenCoverIncrease: scenario.impacts.greenCoverIncrease * intensityFactor,
        accessibilityImprovement: scenario.impacts.accessibilityImprovement * intensityFactor,
        estimatedCost: scenario.impacts.estimatedCost * intensityFactor,
      }
    : null

  // Prepare data for chart
  const chartData = [
    {
      name: "Redução de Calor (°C)",
      value: adjustedImpacts?.heatReduction || 0,
    },
    {
      name: "Aumento de Cobertura Verde (%)",
      value: adjustedImpacts?.greenCoverIncrease || 0,
    },
    {
      name: "Melhoria de Acessibilidade (pontos)",
      value: adjustedImpacts?.accessibilityImprovement || 0,
    },
  ]

  return (
    <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h3 className="text-lg font-bold mb-1">Modelagem Preditiva</h3>
            <p className="text-sm text-gray-500">Simule cenários de intervenção e seus impactos potenciais</p>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button variant="outline" className="border-2 border-black hover:bg-gray-100">
              Exportar Simulação
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <Card className="border-2 border-black h-full">
              <CardContent className="p-4">
                <h4 className="font-bold text-lg mb-4">Parâmetros de Simulação</h4>

                <div className="space-y-6">
                  <div>
                    <h5 className="font-medium mb-2">Cenário</h5>
                    <Tabs defaultValue={selectedScenario} onValueChange={setSelectedScenario} className="w-full">
                      <TabsList className="grid grid-cols-3 mb-2">
                        {scenarios.map((scenario) => (
                          <TabsTrigger
                            key={scenario.id}
                            value={scenario.id}
                            className="data-[state=active]:bg-black data-[state=active]:text-white"
                          >
                            {scenario.name.split(" ")[0]}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {scenarios.map((scenario) => (
                        <TabsContent key={scenario.id} value={scenario.id} className="mt-0">
                          <p className="text-sm">{scenario.description}</p>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="intensity">Intensidade da Intervenção</Label>
                      <span className="text-sm font-medium">{intensity}%</span>
                    </div>
                    <Slider
                      id="intensity"
                      min={10}
                      max={100}
                      step={10}
                      value={[intensity]}
                      onValueChange={(value) => setIntensity(value[0])}
                      className="mb-4"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="budget">Orçamento Disponível</Label>
                      <span className="text-sm font-medium">R$ {(budget / 1000000).toFixed(1)}M</span>
                    </div>
                    <Slider
                      id="budget"
                      min={500000}
                      max={5000000}
                      step={500000}
                      value={[budget]}
                      onValueChange={(value) => setBudget(value[0])}
                      className="mb-4"
                    />
                  </div>

                  <div className="pt-4">
                    <Button className="w-full bg-black text-white hover:bg-gray-800">Executar Simulação</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <div className="border-2 border-black p-4 h-[400px]">
              <h4 className="font-bold mb-4">Impactos Projetados</h4>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" name="Impacto Projetado" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Card className="border-2 border-black">
                <CardContent className="p-4">
                  <h5 className="font-medium text-sm">Custo Estimado</h5>
                  <div className="text-2xl font-bold mt-1">
                    R$ {((adjustedImpacts?.estimatedCost || 0) / 1000000).toFixed(2)}M
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      (adjustedImpacts?.estimatedCost || 0) <= budget ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {(adjustedImpacts?.estimatedCost || 0) <= budget ? "Dentro do orçamento" : "Acima do orçamento"}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-black">
                <CardContent className="p-4">
                  <h5 className="font-medium text-sm">Tempo de Implementação</h5>
                  <div className="text-2xl font-bold mt-1">{Math.ceil((intensity / 50) * 18)} meses</div>
                  <div className="text-xs mt-1 text-gray-500">Baseado na intensidade da intervenção</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
