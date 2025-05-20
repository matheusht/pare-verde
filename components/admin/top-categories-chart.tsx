"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Report } from "@/types/report"

interface TopCategoriesChartProps {
  reports: Report[]
  isLoading: boolean
  timeFilter: "7days" | "month" | "all"
  onTimeFilterChange: (value: "7days" | "month" | "all") => void
}

export function TopCategoriesChart({ reports, isLoading, timeFilter, onTimeFilterChange }: TopCategoriesChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  // Process data for chart
  useEffect(() => {
    if (isLoading) return

    // Filter reports based on time filter
    const now = new Date()
    const filteredReports = reports.filter((report) => {
      const reportDate = new Date(report.date)
      if (timeFilter === "7days") {
        const sevenDaysAgo = new Date(now)
        sevenDaysAgo.setDate(now.getDate() - 7)
        return reportDate >= sevenDaysAgo
      }
      if (timeFilter === "month") {
        const thirtyDaysAgo = new Date(now)
        thirtyDaysAgo.setDate(now.getDate() - 30)
        return reportDate >= thirtyDaysAgo
      }
      return true // "all" filter
    })

    // Count reports by category
    const categoryCounts: Record<string, number> = {}
    filteredReports.forEach((report) => {
      if (categoryCounts[report.category]) {
        categoryCounts[report.category]++
      } else {
        categoryCounts[report.category] = 1
      }
    })

    // Convert to chart data format
    const data = Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count,
      name: getCategoryLabel(category),
      fill: getCategoryColor(category),
    }))

    // Sort by count (descending)
    data.sort((a, b) => b.count - a.count)

    setChartData(data)
  }, [reports, isLoading, timeFilter])

  // Helper functions
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

  const getCategoryColor = (category: string) => {
    if (["missing-ramp", "obstruction", "uneven-surface", "broken-sidewalk"].includes(category)) {
      return "#ef4444" // Red for accessibility issues
    }
    if (["missing-tree", "heat-island"].includes(category)) {
      return "#22c55e" // Green for environmental issues
    }
    if (["flooding"].includes(category)) {
      return "#3b82f6" // Blue for infrastructure issues
    }
    return "#a855f7" // Purple for other issues
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border-4 border-black shadow-neobrutalism">
          <p className="font-bold">{payload[0].payload.name}</p>
          <p>
            <span className="font-bold">{payload[0].value}</span> relatórios
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-4 border-black shadow-neobrutalism">
      <CardHeader className="bg-purple-100 border-b-4 border-black">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-xl">Categorias Mais Reportadas</CardTitle>
          <Tabs defaultValue="month" value={timeFilter} onValueChange={(value: any) => onTimeFilterChange(value)}>
            <TabsList className="border-4 border-black shadow-neobrutalism">
              <TabsTrigger value="7days" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                7 dias
              </TabsTrigger>
              <TabsTrigger value="month" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                Este mês
              </TabsTrigger>
              <TabsTrigger value="all" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                Todos
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-4 h-[400px]">
        {isLoading ? (
          <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center">
            <p className="text-gray-500">Carregando gráfico...</p>
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#000" strokeWidth={1} />
              <XAxis type="number" stroke="#000" strokeWidth={2} />
              <YAxis type="category" dataKey="name" stroke="#000" strokeWidth={2} tick={{ fill: "#000" }} width={100} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                background={{ fill: "#f3f4f6" }}
                radius={[0, 4, 4, 0]}
                strokeWidth={2}
                stroke="#000"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-gray-500">Nenhum dado disponível para o período selecionado.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
