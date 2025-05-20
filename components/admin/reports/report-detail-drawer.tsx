"use client"

import { X, MapPin, Calendar, AlertTriangle, CheckCircle, UserPlus, Flag, Download, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Report } from "@/types/report"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

interface ReportDetailDrawerProps {
  report: Report | null
  isOpen: boolean
  onClose: () => void
}

export function ReportDetailDrawer({ report, isOpen, onClose }: ReportDetailDrawerProps) {
  if (!report) return null

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
    <div
      className={`fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white border-l-2 border-black shadow-[-4px_0px_0px_0px_rgba(0,0,0,1)] z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b-2 border-black p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Report Details</h2>
            <div className="text-sm text-gray-500">ID: #{report.id}</div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {/* Title and Status */}
            <div>
              <h3 className="text-2xl font-bold mb-2">{report.title}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className={`${getStatusBadgeColor(report.status)} border-2`}>
                  {report.status === "pending" && "Submitted"}
                  {report.status === "in-progress" && "In Review"}
                  {report.status === "resolved" && "Resolved"}
                  {report.status === "rejected" && "Rejected"}
                </Badge>
                <Badge className={`${getSeverityBadgeColor(report.severity)} border-2`}>
                  Severity: {report.severity}
                </Badge>
                <Badge className="bg-gray-100 text-gray-800 border-2 border-gray-800">
                  {formatCategoryName(report.category)}
                </Badge>
              </div>
            </div>

            {/* Location and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="font-medium">Location</div>
                  <div>{report.location}</div>
                  <div className="text-sm text-gray-500 capitalize">{report.region}</div>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="font-medium">Submitted</div>
                  <div>{format(new Date(report.date), "PPP")}</div>
                  <div className="text-sm text-gray-500">{format(new Date(report.date), "p")}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                {report.description || "No description provided."}
              </div>
            </div>

            {/* Photos */}
            {report.photos && report.photos.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Photos</h4>
                <div className="grid grid-cols-2 gap-2">
                  {report.photos.map((photo, index) => (
                    <div key={index} className="aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                      Photo {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Response Time */}
            {report.responseTime && (
              <div>
                <h4 className="font-medium mb-2">Response Time</h4>
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                  <span>{report.responseTime} hours</span>
                </div>
              </div>
            )}

            <Separator />

            {/* Tabs for Actions */}
            <Tabs defaultValue="actions">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="actions">Actions</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="actions" className="space-y-4 pt-4">
                <Button
                  variant="neobrutalism"
                  className="w-full bg-green-100 border-2 border-green-900 shadow-[4px_4px_0px_0px_rgba(22,101,52)]"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Mark as Resolved
                </Button>
                <Button
                  variant="neobrutalism"
                  className="w-full bg-blue-100 border-2 border-blue-900 shadow-[4px_4px_0px_0px_rgba(30,58,138)]"
                >
                  <UserPlus className="mr-2 h-5 w-5" />
                  Assign to Department
                </Button>
                <Button
                  variant="neobrutalism"
                  className="w-full bg-orange-100 border-2 border-orange-900 shadow-[4px_4px_0px_0px_rgba(124,45,18)]"
                >
                  <Flag className="mr-2 h-5 w-5" />
                  Flag for Review
                </Button>
                <Button
                  variant="neobrutalism"
                  className="w-full bg-purple-100 border-2 border-purple-900 shadow-[4px_4px_0px_0px_rgba(76,29,149)]"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Export Report
                </Button>
              </TabsContent>
              <TabsContent value="notes" className="space-y-4 pt-4">
                <Textarea
                  placeholder="Add notes about this report..."
                  className="min-h-[150px] border-2 border-black"
                />
                <Button
                  variant="neobrutalism"
                  className="w-full bg-blue-100 border-2 border-blue-900 shadow-[4px_4px_0px_0px_rgba(30,58,138)]"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Save Notes
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
