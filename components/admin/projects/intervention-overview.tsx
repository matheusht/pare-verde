"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { InterventionStats } from "@/types/intervention"

interface InterventionOverviewCardsProps {
  stats: InterventionStats
}

export function InterventionOverviewCards({ stats }: InterventionOverviewCardsProps) {
  const typeLabels: Record<string, string> = {
    ramps: "Rampas",
    "green-corridors": "Corredores Verdes",
    "heat-mitigation": "Mitigação de Calor",
    "tree-planting": "Plantio de Árvores",
    accessibility: "Acessibilidade",
    infrastructure: "Infraestrutura",
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Interventions */}
      <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold uppercase tracking-wide">Total de Intervenções</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-black font-mono mb-2">{stats.totalInterventions}</div>
          <div className="border-l-4 border-green-500 pl-3">
            <div className="text-sm text-gray-600">{stats.inProgress} em andamento</div>
            <div className="text-sm text-gray-600">{stats.completedThisMonth} concluídas este mês</div>
          </div>
        </CardContent>
      </Card>

      {/* By Type Breakdown */}
      <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold uppercase tracking-wide">Por Tipo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(stats.byType)
              .filter(([_, count]) => count > 0)
              .map(([type, count]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{typeLabels[type]}</span>
                  <Badge variant="outline" className="font-mono font-bold border-2 border-black">
                    {count}
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Total Budget */}
      <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold uppercase tracking-wide">Orçamento Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-black font-mono mb-2">R$ {stats.totalBudget.toLocaleString("pt-BR")}</div>
          <div className="border-l-4 border-blue-500 pl-3">
            <div className="text-sm text-gray-600">Alocado para {stats.totalInterventions} projetos</div>
          </div>
        </CardContent>
      </Card>

      {/* Linked to Reports */}
      <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold uppercase tracking-wide">Vinculadas a Relatórios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-black font-mono mb-2">{stats.linkedToReportsPercentage}%</div>
          <div className="border-l-4 border-yellow-500 pl-3">
            <div className="text-sm text-gray-600">Baseadas em relatórios cidadãos</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
