"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Calendar, Users } from "lucide-react"
import type { Report } from "@/types/report"
import type { Department } from "@/types/department"

interface AssignmentQueueProps {
  reports: Report[]
  departments: Department[]
}

export function AssignmentQueue({ reports, departments }: AssignmentQueueProps) {
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState<string>("")

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedReports(reports.map((report) => report.id))
    } else {
      setSelectedReports([])
    }
  }

  // Handle select report
  const handleSelectReport = (reportId: string, checked: boolean) => {
    if (checked) {
      setSelectedReports([...selectedReports, reportId])
    } else {
      setSelectedReports(selectedReports.filter((id) => id !== reportId))
    }
  }

  // Handle department change
  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value)
  }

  // Handle assign button click
  const handleAssign = () => {
    // In a real app, this would call an API to assign reports
    console.log(`Assigning reports ${selectedReports.join(", ")} to department ${selectedDepartment}`)
    // Reset selection after assignment
    setSelectedReports([])
    setSelectedDepartment("")
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
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
    <Card className="border-4 border-black shadow-neobrutalism overflow-hidden">
      <CardHeader className="bg-yellow-100 border-b-4 border-black">
        <CardTitle className="text-xl">Assignment Queue</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-4 border-black bg-gray-100">
                <th className="px-4 py-3 text-left">
                  <Checkbox
                    checked={reports.length > 0 && selectedReports.length === reports.length}
                    onCheckedChange={(checked) => handleSelectAll(!!checked)}
                    aria-label="Select all reports"
                  />
                </th>
                <th className="px-4 py-3 text-left font-bold">Report</th>
                <th className="px-4 py-3 text-center font-bold">Category</th>
                <th className="px-4 py-3 text-center font-bold">Severity</th>
                <th className="px-4 py-3 text-left font-bold">Location</th>
                <th className="px-4 py-3 text-center font-bold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y-4 divide-black">
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selectedReports.includes(report.id)}
                        onCheckedChange={(checked) => handleSelectReport(report.id, !!checked)}
                        aria-label={`Select report ${report.id}`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{report.title}</div>
                      <div className="text-xs text-gray-500">ID: {report.id}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge className="bg-gray-200 text-gray-800 border-2 border-black">
                        {getCategoryLabel(report.category)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge className={`${getSeverityColor(report.severity)} text-white border-2 border-black`}>
                        {report.severity}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                        <span>{report.region}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                        <span>{formatDate(report.date)}</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No unassigned reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
      {reports.length > 0 && (
        <CardFooter className="border-t-4 border-black bg-gray-50 p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Users className="h-5 w-5 text-gray-500" />
              <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
                <SelectTrigger className="min-w-[200px] border-2 border-black">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem key={department.id} value={department.id}>
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="default"
              className="bg-yellow-500 hover:bg-yellow-600 text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all w-full sm:w-auto"
              disabled={selectedReports.length === 0 || !selectedDepartment}
              onClick={handleAssign}
            >
              Assign {selectedReports.length} {selectedReports.length === 1 ? "Report" : "Reports"}
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
