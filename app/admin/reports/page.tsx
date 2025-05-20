"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { FilterBar } from "@/components/admin/reports/filter-bar"
import { ReportTable } from "@/components/admin/reports/report-table"
import { BatchActionsToolbar } from "@/components/admin/reports/batch-actions-toolbar"
import { ReportDetailDrawer } from "@/components/admin/reports/report-detail-drawer"
import { Pagination } from "@/components/admin/reports/pagination"
import { mockReports } from "@/data/mock-reports"
import type { Report } from "@/types/report"

export default function ReportsPage() {
  const searchParams = useSearchParams()

  // State for filters
  const [filters, setFilters] = useState({
    search: "",
    status: searchParams?.get("status") || "all",
    category: "all",
    severity: "all",
    neighborhood: "all",
    dateRange: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    },
    showUnread: false,
  })

  // State for selected reports
  const [selectedReports, setSelectedReports] = useState<string[]>([])

  // State for report detail drawer
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const reportsPerPage = 10

  // Apply filters to reports
  const filteredReports = mockReports.filter((report) => {
    // Filter by search
    if (
      filters.search &&
      !report.id.toLowerCase().includes(filters.search.toLowerCase()) &&
      !report.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !report.region.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false
    }

    // Filter by status
    if (filters.status !== "all") {
      if (filters.status === "assigned" && !report.assignedTo) {
        return false
      } else if (filters.status !== "assigned" && report.status !== filters.status) {
        return false
      }
    }

    // Filter by category
    if (filters.category !== "all" && report.category !== filters.category) {
      return false
    }

    // Filter by severity
    if (filters.severity !== "all" && report.severity.toString() !== filters.severity) {
      return false
    }

    // Filter by neighborhood
    if (filters.neighborhood !== "all" && report.region !== filters.neighborhood) {
      return false
    }

    // Filter by date range
    if (filters.dateRange.from && new Date(report.date) < filters.dateRange.from) {
      return false
    }
    if (filters.dateRange.to) {
      const toDate = new Date(filters.dateRange.to)
      toDate.setHours(23, 59, 59, 999)
      if (new Date(report.date) > toDate) {
        return false
      }
    }

    // Filter by unread
    if (filters.showUnread && report.read) {
      return false
    }

    return true
  })

  // Get current reports for pagination
  const indexOfLastReport = currentPage * reportsPerPage
  const indexOfFirstReport = indexOfLastReport - reportsPerPage
  const currentReports = Array.isArray(filteredReports)
    ? filteredReports.slice(indexOfFirstReport, indexOfLastReport)
    : []

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Handle filter change
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  // Handle report selection
  const handleReportSelect = (reportId: string, selected: boolean) => {
    if (selected) {
      setSelectedReports([...selectedReports, reportId])
    } else {
      setSelectedReports(selectedReports.filter((id) => id !== reportId))
    }
  }

  // Handle select all reports
  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedReports(currentReports.map((report) => report.id))
    } else {
      setSelectedReports([])
    }
  }

  // Handle view report details
  const handleViewReport = (report: Report) => {
    setSelectedReport(report)
    setDetailDrawerOpen(true)
  }

  // Handle batch actions
  const handleBatchAction = (action: string) => {
    console.log(`Performing ${action} on reports:`, selectedReports)
    // Reset selection after action
    setSelectedReports([])
  }

  // Update filters when URL parameters change
  useEffect(() => {
    const status = searchParams?.get("status") || "all"
    setFilters((prev) => ({
      ...prev,
      status,
    }))
  }, [searchParams])

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Report Management</h1>
            <p className="text-gray-600">Manage and track all citizen-submitted reports</p>
          </div>

          <FilterBar filters={filters} onFilterChange={handleFilterChange} />

          {selectedReports.length > 0 && (
            <BatchActionsToolbar
              selectedCount={selectedReports.length}
              onAction={handleBatchAction}
              onClearSelection={() => setSelectedReports([])}
            />
          )}

          <ReportTable
            reports={currentReports}
            selectedReports={selectedReports}
            onSelectReport={handleReportSelect}
            onSelectAll={handleSelectAll}
            onViewReport={handleViewReport}
          />

          <Pagination
            reportsPerPage={reportsPerPage}
            totalReports={filteredReports.length}
            currentPage={currentPage}
            paginate={paginate}
          />

          <ReportDetailDrawer
            report={selectedReport}
            open={detailDrawerOpen}
            onClose={() => setDetailDrawerOpen(false)}
          />
        </div>
      </div>
    </div>
  )
}
