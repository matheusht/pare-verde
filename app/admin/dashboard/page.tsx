"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { KpiCards } from "@/components/admin/kpi-cards"
import { RecentReportsFeed } from "@/components/admin/recent-reports-feed"
import { MapOverview } from "@/components/admin/map-overview"
import { TopCategoriesChart } from "@/components/admin/top-categories-chart"
import { NeighborhoodTable } from "@/components/admin/neighborhood-table"
import { DateRangePicker } from "@/components/admin/date-range-picker"
import { RegionFilter } from "@/components/admin/region-filter"
import { mockReports } from "@/data/mock-reports"
import { mockNeighborhoods } from "@/data/mock-neighborhoods"

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
    to: new Date(),
  })
  const [selectedRegion, setSelectedRegion] = useState<string>("all")
  const [timeFilter, setTimeFilter] = useState<"7days" | "month" | "all">("month")

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Filter reports based on date range and region
  const filteredReports = mockReports.filter((report) => {
    const reportDate = new Date(report.date)
    const isInDateRange = reportDate >= dateRange.from && reportDate <= dateRange.to
    const isInRegion = selectedRegion === "all" || report.region === selectedRegion
    return isInDateRange && isInRegion
  })

  // Calculate KPI data
  const kpiData = {
    totalReports: {
      current: filteredReports.length,
      allTime: mockReports.length,
    },
    resolvedPercentage: {
      value:
        Math.round((filteredReports.filter((r) => r.status === "resolved").length / filteredReports.length) * 100) || 0,
    },
    responseTime: {
      value: Math.round(
        filteredReports.reduce((acc, report) => {
          if (report.responseTime) return acc + report.responseTime
          return acc
        }, 0) / filteredReports.filter((r) => r.responseTime).length || 0,
      ),
    },
    activeInterventions: {
      value: filteredReports.filter((r) => r.status === "in-progress").length,
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Title and Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h1 className="text-3xl font-bold">Painel de Controle</h1>
              <div className="flex flex-col sm:flex-row gap-3">
                <DateRangePicker value={dateRange} onChange={setDateRange} />
                <RegionFilter value={selectedRegion} onChange={setSelectedRegion} />
              </div>
            </div>

            {/* KPI Cards */}
            <KpiCards data={kpiData} isLoading={isLoading} />

            {/* Two Column Layout for Map and Recent Reports */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <MapOverview reports={filteredReports} isLoading={isLoading} />
              <RecentReportsFeed reports={filteredReports.slice(0, 5)} isLoading={isLoading} />
            </div>

            {/* Two Column Layout for Categories and Neighborhoods */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopCategoriesChart
                reports={filteredReports}
                isLoading={isLoading}
                timeFilter={timeFilter}
                onTimeFilterChange={setTimeFilter}
              />
              <NeighborhoodTable neighborhoods={mockNeighborhoods} isLoading={isLoading} />
            </div>
            
          </div>
        </main>
      </div>
    </div>
  )
}
