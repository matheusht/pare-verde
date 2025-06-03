"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Intervention } from "@/types/intervention"
import { Calendar, MapPin, Users } from "lucide-react"

interface InterventionTimelineProps {
  interventions: Intervention[]
}

export function InterventionTimeline({ interventions }: InterventionTimelineProps) {
  const [selectedIntervention, setSelectedIntervention] = useState<Intervention | null>(null)
  const [viewMode, setViewMode] = useState<"week" | "month">("month")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-yellow-400"
      case "in-progress":
        return "bg-blue-400"
      case "completed":
        return "bg-green-400"
      case "cancelled":
        return "bg-red-400"
      default:
        return "bg-gray-400"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ramps":
        return "bg-purple-500"
      case "green-corridors":
        return "bg-green-500"
      case "heat-mitigation":
        return "bg-orange-500"
      case "tree-planting":
        return "bg-emerald-500"
      case "accessibility":
        return "bg-blue-500"
      case "infrastructure":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Agendado"
      case "in-progress":
        return "Em Andamento"
      case "completed":
        return "Concluído"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "ramps":
        return "Rampas"
      case "green-corridors":
        return "Corredores Verdes"
      case "heat-mitigation":
        return "Mitigação de Calor"
      case "tree-planting":
        return "Plantio de Árvores"
      case "accessibility":
        return "Acessibilidade"
      case "infrastructure":
        return "Infraestrutura"
      default:
        return type
    }
  }

  return (
    <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-black uppercase">Timeline de Intervenções</CardTitle>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("week")}
              className="border-2 border-black font-bold"
            >
              Semana
            </Button>
            <Button
              variant={viewMode === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("month")}
              className="border-2 border-black font-bold"
            >
              Mês
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {interventions.map((intervention) => (
            <div key={intervention.id} className="relative">
              <div
                className={`p-4 border-4 border-black cursor-pointer transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${getTypeColor(intervention.type)}`}
                onClick={() => setSelectedIntervention(intervention)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white text-lg">{intervention.title}</h3>
                  <Badge
                    className={`${getStatusColor(intervention.status)} text-black font-bold border-2 border-black`}
                  >
                    {getStatusLabel(intervention.status)}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-white text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(intervention.startDate).toLocaleDateString("pt-BR")} -{" "}
                    {new Date(intervention.endDate).toLocaleDateString("pt-BR")}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {intervention.location.neighborhood}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {intervention.assignedDepartment}
                  </div>
                </div>
                {intervention.status === "in-progress" && (
                  <div className="mt-2">
                    <div className="bg-white bg-opacity-20 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full transition-all"
                        style={{ width: `${intervention.progress}%` }}
                      />
                    </div>
                    <div className="text-white text-xs mt-1">{intervention.progress}% concluído</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedIntervention && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full mx-4">
              <CardHeader>
                <CardTitle className="font-black">{selectedIntervention.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-bold mb-1">Tipo:</h4>
                  <Badge className={`${getTypeColor(selectedIntervention.type)} text-white border-2 border-black`}>
                    {getTypeLabel(selectedIntervention.type)}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Descrição:</h4>
                  <p className="text-sm">{selectedIntervention.description}</p>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Período:</h4>
                  <p className="text-sm">
                    {new Date(selectedIntervention.startDate).toLocaleDateString("pt-BR")} -{" "}
                    {new Date(selectedIntervention.endDate).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Orçamento:</h4>
                  <p className="text-sm font-mono">R$ {selectedIntervention.budget.toLocaleString("pt-BR")}</p>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Impacto Esperado:</h4>
                  <p className="text-sm">{selectedIntervention.expectedImpact}</p>
                </div>
                <Button
                  onClick={() => setSelectedIntervention(null)}
                  className="w-full border-2 border-black font-bold"
                >
                  Fechar
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
