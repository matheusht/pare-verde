"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
import type { Neighborhood } from "@/types/neighborhood"

interface NeighborhoodTableProps {
  neighborhoods: Neighborhood[]
  isLoading: boolean
}

export function NeighborhoodTable({ neighborhoods, isLoading }: NeighborhoodTableProps) {
  // Sort neighborhoods by report count (descending)
  const sortedNeighborhoods = [...neighborhoods].sort((a, b) => b.reportCount - a.reportCount)

  return (
    <Card className="border-4 border-black shadow-neobrutalism">
      <CardHeader className="bg-yellow-100 border-b-4 border-black">
        <CardTitle className="text-xl">Bairros com Mais Relatórios</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="animate-pulse p-4 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-4 border-black bg-gray-100">
                  <th className="px-4 py-3 text-left font-bold">Bairro</th>
                  <th className="px-4 py-3 text-center font-bold">Relatórios</th>
                  <th className="px-4 py-3 text-center font-bold">Tempo Médio</th>
                  <th className="px-4 py-3 text-center font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y-4 divide-black">
                {sortedNeighborhoods.map((neighborhood) => (
                  <tr key={neighborhood.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium">{neighborhood.name}</div>
                      <div className="text-sm text-gray-500">{neighborhood.region}</div>
                    </td>
                    <td className="px-4 py-3 text-center font-bold">{neighborhood.reportCount}</td>
                    <td className="px-4 py-3 text-center">{neighborhood.avgResponseTime} horas</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        {neighborhood.isCritical ? (
                          <Badge className="bg-red-500 text-white border-2 border-black flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Crítico
                          </Badge>
                        ) : neighborhood.avgResponseTime > 48 ? (
                          <Badge className="bg-yellow-500 text-white border-2 border-black">Atenção</Badge>
                        ) : (
                          <Badge className="bg-green-500 text-white border-2 border-black">Normal</Badge>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
