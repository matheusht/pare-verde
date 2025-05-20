"use client"

import { useState } from "react"
import { FilterBar } from "@/components/admin/reports/filter-bar"
import { ReportTable } from "@/components/admin/reports/report-table"
import { BatchActionsToolbar } from "@/components/admin/reports/batch-actions-toolbar"
import { ReportDetailDrawer } from "@/components/admin/reports/report-detail-drawer"
import { Pagination } from "@/components/admin/reports/pagination"
import { mockReports } from "@/data/mock-reports"
import type { Report } from "@/types/report"
import { FileIcon, MapPinIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ReportManagementPage() {
  const [filteredReports, setFilteredReports] = useState<Report[]>(mockReports)
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [reportsPerPage] = useState(10)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Filter handlers
  const handleFilterChange = (filteredData: Report[]) => {
    setFilteredReports(filteredData)
    setCurrentPage(1) // Reset to first page when filtering
  }

  // Selection handlers
  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedReports(currentReports.map((report) => report.id))
    } else {
      setSelectedReports([])
    }
  }

  const handleSelectReport = (reportId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedReports([...selectedReports, reportId])
    } else {
      setSelectedReports(selectedReports.filter((id) => id !== reportId))
    }
  }

  // Pagination
  const indexOfLastReport = currentPage * reportsPerPage
  const indexOfFirstReport = indexOfLastReport - reportsPerPage
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport)
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage)

  // Report detail handlers
  const handleViewReport = (report: Report) => {
    setSelectedReport(report)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Report Management</h1>
          <p className="text-gray-600 mb-4">Manage and respond to citizen reports</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
          <Button
            variant="neobrutalism"
            className="bg-green-100 border-2 border-green-900 shadow-[4px_4px_0px_0px_rgba(22,101,52)]"
          >
            <FileIcon className="mr-2 h-4 w-4" />
            Export All Reports
          </Button>
          <Button
            variant="neobrutalism"
            className="bg-blue-100 border-2 border-blue-900 shadow-[4px_4px_0px_0px_rgba(30,58,138)]"
          >
            <MapPinIcon className="mr-2 h-4 w-4" />
            View on Map
          </Button>
        </div>
      </div>

      <FilterBar onFilterChange={handleFilterChange} allReports={mockReports} />

      {selectedReports.length > 0 && (
        <BatchActionsToolbar selectedCount={selectedReports.length} onClearSelection={() => setSelectedReports([])} />
      )}

      <ReportTable
        reports={currentReports}
        selectedReports={selectedReports}
        onSelectReport={handleSelectReport}
        onSelectAll={handleSelectAll}
        onViewReport={handleViewReport}
      />

      {filteredReports.length > reportsPerPage && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}

      <ReportDetailDrawer report={selectedReport} isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
    </div>
  )
}
