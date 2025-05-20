"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, MoreHorizontal, Eye, CheckCircle, UserPlus, Flag } from "lucide-react"
import type { Report } from "@/types/report"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

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
      setSortDirection("desc")
    }
  }

  // Sort reports
  const sortedReports = [...reports].sort((a, b) => {
    if (sortField === "date") {
      return sortDirection === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    }

    if (sortField === "severity") {
      return sortDirection === "asc" ? a.severity - b.severity : b.severity - a.severity
    }

    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  // Check if all reports are selected
  const allSelected = reports.length > 0 && selectedReports.length === reports.length

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800 border-gray-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-800"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-800"
    }
  }

  // Get severity badge color
  const getSeverityBadgeColor = (severity: number) => {
    switch (severity) {
      case 1:
        return "bg-blue-100 text-blue-800 border-blue-800"
      case 2:
        return "bg-cyan-100 text-cyan-800 border-cyan-800"
      case 3:
        return "bg-yellow-100 text-yellow-800 border-yellow-800"
      case 4:
        return "bg-orange-100 text-orange-800 border-orange-800"
      case 5:
        return "bg-red-100 text-red-800 border-red-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-800"
    }
  }

  // Format category name
  const formatCategoryName = (category: string) => {
    return category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return (
    <div className="overflow-x-auto">
      {reports.length === 0 ? (
        <div className="bg-white border-2 border-black p-8 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-md">
          <h3 className="text-xl font-bold mb-2">No reports found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more results.</p>
        </div>
      ) : (
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-md">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="p-4">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={(checked) => onSelectAll(!!checked)}
                    aria-label="Select all reports"
                  />
                </th>
                <th className="p-4 text-left cursor-pointer" onClick={() => handleSort("title")}>
                  <div className="flex items-center">
                    Report Title
                    {sortField === "title" &&
                      (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </div>
                </th>
                <th className="p-4 text-left cursor-pointer" onClick={() => handleSort("category")}>
                  <div className="flex items-center">
                    Category
                    {sortField === "category" &&
                      (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </div>
                </th>
                <th className="p-4 text-left cursor-pointer" onClick={() => handleSort("severity")}>
                  <div className="flex items-center">
                    Severity
                    {sortField === "severity" &&
                      (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </div>
                </th>
                <th className="p-4 text-left cursor-pointer" onClick={() => handleSort("status")}>
                  <div className="flex items-center">
                    Status
                    {sortField === "status" &&
                      (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </div>
                </th>
                <th className="p-4 text-left cursor-pointer" onClick={() => handleSort("location")}>
                  <div className="flex items-center">
                    Location
                    {sortField === "location" &&
                      (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </div>
                </th>
                <th className="p-4 text-left cursor-pointer" onClick={() => handleSort("date")}>
                  <div className="flex items-center">
                    Date
                    {sortField === "date" &&
                      (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </div>
                </th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4">
                    <Checkbox
                      checked={selectedReports.includes(report.id)}
                      onCheckedChange={(checked) => onSelectReport(report.id, !!checked)}
                      aria-label={`Select report ${report.id}`}
                    />
                  </td>
                  <td className="p-4 font-medium">
                    <div className="flex items-center">
                      <span className="text-sm font-mono text-gray-500 mr-2">#{report.id}</span>
                      {report.title}
                    </div>
                  </td>
                  <td className="p-4">{formatCategoryName(report.category)}</td>
                  <td className="p-4">
                    <Badge className={`${getSeverityBadgeColor(report.severity)} border-2`}>{report.severity}</Badge>
                  </td>
                  <td className="p-4">
                    <Badge className={`${getStatusBadgeColor(report.status)} border-2`}>
                      {report.status === "pending" && "Submitted"}
                      {report.status === "in-progress" && "In Review"}
                      {report.status === "resolved" && "Resolved"}
                      {report.status === "rejected" && "Rejected"}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div>
                      <div>{report.location}</div>
                      <div className="text-xs text-gray-500 capitalize">{report.region}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div>{new Date(report.date).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(report.date), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal size={16} />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                          <DropdownMenuItem onClick={() => onViewReport(report)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Mark as Resolved</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserPlus className="mr-2 h-4 w-4" />
                            <span>Assign</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Flag className="mr-2 h-4 w-4" />
                            <span>Flag for Review</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
