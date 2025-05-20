"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, AlertTriangle, MapPin, Clock } from "lucide-react"
import type { Report } from "@/types/report"

interface RecentReportsFeedProps {
  reports: Report[]
  isLoading: boolean
}

export function RecentReportsFeed({ reports, isLoading }: RecentReportsFeedProps) {
  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-white"
      case "in-progress":
        return "bg-blue-500 text-white"
      case "resolved":
        return "bg-green-500 text-white"
      case "rejected":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  // Function to get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente"
      case "in-progress":
        return "Em Andamento"
      case "resolved":
        return "Resolvido"
      case "rejected":
        return "Rejeitado"
      default:
        return "Desconhecido"
    }
  }

  // Function to get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "missing-ramp":
      case "obstruction":
      case "uneven-surface":
      case "broken-sidewalk":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "missing-tree":
      case "heat-island":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "flooding":
        return <AlertTriangle className="h-5 w-5 text-blue-500" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />
    }
  }

  // Function to get category label
  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      "missing-ramp": "Rampa ausente",
      obstruction: "Obstrução",
      "uneven-surface": "Superfície irregular",
      "broken-sidewalk": "Calçada quebrada",
      "missing-tree": "Árvores ausentes",
      "heat-island": "Ilha de calor",
      flooding: "Alagamento",
      other: "Outro",
    }
    return categories[category] || "Desconhecido"
  }

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Card className="border-4 border-black shadow-neobrutalism">
      <CardHeader className="bg-blue-100 border-b-4 border-black">
        <CardTitle className="text-xl">Relatórios Recentes</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="animate-pulse p-4 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : reports.length > 0 ? (
          <ul className="divide-y-4 divide-black">
            {reports.map((report) => (
              <li key={report.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-gray-100 border-4 border-black">
                    {getCategoryIcon(report.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold">{report.title}</h3>
                      <Badge className={`${getStatusColor(report.status)} border-2 border-black`}>
                        {getStatusLabel(report.status)}
                      </Badge>
                      <Badge className="bg-gray-200 text-gray-800 border-2 border-black">
                        {getCategoryLabel(report.category)}
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 gap-1 sm:gap-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="truncate">{report.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formatDate(report.date)}</span>
                      </div>
                    </div>
                  </div>
                  <Link href={`/admin/reports/${report.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">Nenhum relatório encontrado.</p>
          </div>
        )}

        {reports.length > 0 && (
          <div className="p-4 border-t-4 border-black bg-gray-50">
            <Link href="/admin/reports">
              <Button
                variant="default"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                Ver Todos os Relatórios
                <ChevronRight className="h-5 w-5 ml-1" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
