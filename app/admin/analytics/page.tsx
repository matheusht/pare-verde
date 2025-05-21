"use client"

import { useState } from "react"
import { DateRangeSelector } from "../../../components/admin/analytics/data-range-selector"
import { DistrictSelector } from "../../../components/admin/analytics/district-selector"
import { CityScorecard } from "../../../components/admin/analytics/city-scorecard"
import { TimeSeriesTrends } from "../../../components/admin/analytics/time-series-trends"
import { NeighborhoodComparison } from "../../../components/admin/analytics/neighborhood-comparison"
import { SpatialAnalyticsMap } from "../../../components/admin/analytics/spatial-analytics-map"
import { PredictiveModeling } from "../../../components/admin/analytics/predictive-modeling"
import { MapVisualizationGuide } from "../../../components/admin/analytics/map-visualization-guide"
import { AdminHeader } from "../../../components/admin/admin-header"
import { AdminSidebar } from "../../../components/admin/admin-sidebar"
import {
  mockCityScorecard,
  mockTimeSeriesData,
  mockNeighborhoods,
  mockSpatialData,
  mockPredictiveScenarios,
  mockDistricts
} from "../../../data/mock-analytics-data"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date(),
  })
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "greenCover",
    "heatIndex",
    "accessibilityIssues",
    "reportVolume",
  ])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Hub de Análises Urbanas" />
        <main className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold">Hub de Análises Urbanas</h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
              <DistrictSelector
                districts={mockDistricts}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
              />
            </div>
          </div>

          <div className="space-y-6">
            <CityScorecard data={mockCityScorecard} district={selectedDistrict} />
            <TimeSeriesTrends
              data={mockTimeSeriesData}
              dateRange={dateRange}
              district={selectedDistrict}
              selectedMetrics={selectedMetrics}
              setSelectedMetrics={setSelectedMetrics}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MapVisualizationGuide />
              <NeighborhoodComparison neighborhoods={mockNeighborhoods} />
            </div>
            <SpatialAnalyticsMap data={mockSpatialData} district={selectedDistrict} />
            <PredictiveModeling scenarios={mockPredictiveScenarios} />
          </div>
        </main>
      </div>
    </div>
  )
}
