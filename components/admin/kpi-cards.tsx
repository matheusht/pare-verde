"use client"

import { Card } from "@/components/ui/card"
import { FileText, CheckCircle, Clock, PenToolIcon as Tool } from "lucide-react"

interface KpiCardsProps {
  data: {
    totalReports: {
      current: number
      allTime: number
    }
    resolvedPercentage: {
      value: number
    }
    responseTime: {
      value: number
    }
    activeInterventions: {
      value: number
    }
  }
  isLoading: boolean
}

export function KpiCards({ data, isLoading }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Total Reports */}
      <Card className="border-4 border-black shadow-neobrutalism p-4">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-10 w-10 bg-gray-200 rounded-full mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>
        ) : (
          <>
            <div className="p-2 rounded-full bg-blue-100 border-4 border-black w-fit mb-3">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-3xl font-bold">{data.totalReports.current}</h3>
            <p className="text-gray-600">
              Relatórios este mês <span className="text-xs">({data.totalReports.allTime} total)</span>
            </p>
          </>
        )}
      </Card>

      {/* Resolved Percentage */}
      <Card className="border-4 border-black shadow-neobrutalism p-4">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-10 w-10 bg-gray-200 rounded-full mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>
        ) : (
          <>
            <div className="p-2 rounded-full bg-green-100 border-4 border-black w-fit mb-3">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold">{data.resolvedPercentage.value}%</h3>
            <p className="text-gray-600">Relatórios resolvidos</p>
          </>
        )}
      </Card>

      {/* Response Time */}
      <Card className="border-4 border-black shadow-neobrutalism p-4">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-10 w-10 bg-gray-200 rounded-full mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>
        ) : (
          <>
            <div className="p-2 rounded-full bg-yellow-100 border-4 border-black w-fit mb-3">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-3xl font-bold">{data.responseTime.value}</h3>
            <p className="text-gray-600">Tempo médio de resposta (horas)</p>
          </>
        )}
      </Card>

      {/* Active Interventions */}
      <Card className="border-4 border-black shadow-neobrutalism p-4">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-10 w-10 bg-gray-200 rounded-full mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>
        ) : (
          <>
            <div className="p-2 rounded-full bg-purple-100 border-4 border-black w-fit mb-3">
              <Tool className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="text-3xl font-bold">{data.activeInterventions.value}</h3>
            <p className="text-gray-600">Intervenções ativas</p>
          </>
        )}
      </Card>
    </div>
  )
}
