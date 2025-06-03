"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Intervention } from "@/types/intervention"
import { Search, Eye, Edit, MapPin, Calendar, DollarSign } from "lucide-react"

interface InterventionsTableProps {
  interventions: Intervention[]
  onEdit: (intervention: Intervention) => void
  onView: (intervention: Intervention) => void
}

export function InterventionsTable({ interventions, onEdit, onView }: InterventionsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "completed":
        return "bg-green-100 text-green-800 border-green-300"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredInterventions = interventions.filter((intervention) => {
    const matchesSearch =
      intervention.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intervention.location.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || intervention.status === statusFilter
    const matchesType = typeFilter === "all" || intervention.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
      <CardHeader>
        <CardTitle className="text-xl font-black uppercase">Intervenções Programadas</CardTitle>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por título ou bairro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-2 border-black font-medium"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 border-2 border-black font-medium">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="scheduled">Agendado</SelectItem>
              <SelectItem value="in-progress">Em Andamento</SelectItem>
              <SelectItem value="completed">Concluído</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-48 border-2 border-black font-medium">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectItem value="ramps">Rampas</SelectItem>
              <SelectItem value="green-corridors">Corredores Verdes</SelectItem>
              <SelectItem value="heat-mitigation">Mitigação de Calor</SelectItem>
              <SelectItem value="tree-planting">Plantio de Árvores</SelectItem>
              <SelectItem value="accessibility">Acessibilidade</SelectItem>
              <SelectItem value="infrastructure">Infraestrutura</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {filteredInterventions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏗️</div>
            <h3 className="text-xl font-bold mb-2">Nenhuma intervenção encontrada</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                ? "Tente ajustar os filtros de busca"
                : "Nenhuma intervenção agendada no momento"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInterventions.map((intervention) => (
              <div
                key={intervention.id}
                className="border-4 border-black p-4 bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(intervention.priority)}`} />
                      <h3 className="font-bold text-lg">{intervention.title}</h3>
                      <Badge className={`${getStatusColor(intervention.status)} border-2 font-bold`}>
                        {getStatusLabel(intervention.status)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">Tipo:</span>
                        <span>{getTypeLabel(intervention.type)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">Departamento:</span>
                        <span>{intervention.assignedDepartment}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{intervention.location.neighborhood}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(intervention.startDate).toLocaleDateString("pt-BR")} -{" "}
                          {new Date(intervention.endDate).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-mono">R$ {intervention.budget.toLocaleString("pt-BR")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">Relatórios:</span>
                        <span>
                          {intervention.linkedReportIds.length > 0 ? intervention.linkedReportIds.join(", ") : "Nenhum"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(intervention)}
                      className="border-2 border-black font-bold hover:bg-blue-100"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(intervention)}
                      className="border-2 border-black font-bold hover:bg-yellow-100"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                  </div>
                </div>

                {intervention.status === "in-progress" && (
                  <div className="mt-3 pt-3 border-t-2 border-gray-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold">Progresso:</span>
                      <span className="text-sm font-mono">{intervention.progress}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2 border-2 border-black">
                      <div
                        className="bg-blue-500 h-full rounded-full transition-all"
                        style={{ width: `${intervention.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
