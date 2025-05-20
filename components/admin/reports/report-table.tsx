"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, MoreHorizontal, Eye, CheckCircle, Users, Flag } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import type { Report } from "@/types/report"

interface ReportTableProps {
  reports: Report[]
  selectedReports: string[]
  onSelectReport: (reportId: string, isSelected: boolean) => void
  onSelectAll: (isSelected: boolean) => void
  onViewReport: (report: Report) => void
}

export function ReportTable({ reports, selectedReports, onSelectReport, onSelectAll, onViewReport }: ReportTableProps) {
  const [sortField, setSortField] = useState<keyof Report>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Handle sort
  const handleSort = (field: keyof Report) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Sort reports
  const sortedReports = [...reports].sort((a, b) => {
    if (sortField === "date") {
      const dateA = new Date(a[sortField]).getTime()
      const dateB = new Date(b[sortField]).getTime()
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    }

    if (sortField === "severity") {
      return sortDirection === "asc" ? a[sortField] - b[sortField] : b[sortField] - a[sortField]
    }

    const valueA = String(a[sortField]).toLowerCase()
    const valueB = String(b[sortField]).toLowerCase()
    return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
  })

  // Check if all reports are selected
  const allSelected = reports.length > 0 && selectedReports.length === reports.length

  // Format date
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

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-500"
      case "in-progress":
        return "bg-yellow-500"
      case "resolved":
        return "bg-green-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Submitted"
      case "in-progress":
        return "In Review"
      case "resolved":
        return "Resolved"
      case "rejected":
        return "Rejected"
      default:
        return "Unknown"
    }
  }

  // Get severity badge color
  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 1:
        return "bg-blue-500"
      case 2:
        return "bg-blue-600"
      case 3:
        return "bg-yellow-500"
      case 4:
        return "bg-orange-500"
      case 5:
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get category label
  const getCategoryLabel = (category: string) => {
    return category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return (
    <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-black">
              <th className="px-4 py-3 text-left">
                <div className="flex items-center">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={(checked) => onSelectAll(!!checked)}
                    aria-label="Select all reports"
                  />
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  className="flex items-center font-bold"
                  onClick={() => handleSort("title")}
                  aria-label="Sort by title"
                >
                  Report Title
                  {sortField === "title" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  className="flex items-center font-bold"
                  onClick={() => handleSort("category")}
                  aria-label="Sort by category"
                >
                  Category
                  {sortField === "category" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  className="flex items-center font-bold"
                  onClick={() => handleSort("severity")}
                  aria-label="Sort by severity"
                >
                  Severity
                  {sortField === "severity" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  className="flex items-center font-bold"
                  onClick={() => handleSort("status")}
                  aria-label="Sort by status"
                >
                  Status
                  {sortField === "status" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  className="flex items-center font-bold"
                  onClick={() => handleSort("region")}
                  aria-label="Sort by location"
                >
                  Location
                  {sortField === "region" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  className="flex items-center font-bold"
                  onClick={() => handleSort("date")}
                  aria-label="Sort by date"
                >
                  Date
                  {sortField === "date" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-black">
            {sortedReports.length > 0 ? (
              sortedReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selectedReports.includes(report.id)}
                      onCheckedChange={(checked) => onSelectReport(report.id, !!checked)}
                      aria-label={`Select report ${report.id}`}
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{report.title}</td>
                  <td className="px-4 py-3">{getCategoryLabel(report.category)}</td>
                  <td className="px-4 py-3">
                    <Badge className={`${getSeverityColor(report.severity)} text-white border-2 border-black`}>
                      {report.severity}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={`${getStatusColor(report.status)} text-white border-2 border-black`}>
                      {getStatusLabel(report.status)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span>{report.location}</span>
                      <span className="text-xs text-gray-500">{report.region}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(report.date)}</td>
                  <td className="px-4 py-3 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-2 border-black">
                        <DropdownMenuItem onClick={() => onViewReport(report)}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          <span>Mark as Resolved</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          <span>Assign</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Flag className="mr-2 h-4 w-4" />
                          <span>Flag for Review</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  No reports found. Try adjusting your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
