"use client"

import { X, MapPin, Calendar, AlertTriangle, CheckCircle, Users, MessageSquare, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import type { Report } from "@/types/report"

interface ReportDetailDrawerProps {
  report: Report | null
  isOpen: boolean
  onClose: () => void
}

export function ReportDetailDrawer({ report, isOpen, onClose }: ReportDetailDrawerProps) {
  if (!report) return null

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
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-2/3 lg:w-1/2 bg-white border-l-4 border-black shadow-neobrutalism transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b-4 border-black flex justify-between items-center bg-gray-100">
            <h2 className="text-xl font-bold">Report Details</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto p-4">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">{report.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={`${getStatusColor(report.status)} text-white border-2 border-black`}>
                  {getStatusLabel(report.status)}
                </Badge>
                <Badge className={`${getSeverityColor(report.severity)} text-white border-2 border-black`}>
                  Severity: {report.severity}
                </Badge>
                <Badge className="bg-gray-200 border-2 border-black">{getCategoryLabel(report.category)}</Badge>
              </div>

              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>
                    {report.location}, {report.region}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Reported on {formatDate(report.date)}</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span>Report ID: {report.id}</span>
                </div>
              </div>
            </div>

            <Separator className="my-4 border-t-2 border-black" />

            <Tabs defaultValue="details">
              <TabsList className="border-2 border-black">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Description</h3>
                    <p className="text-gray-700">{report.description || "No description provided."}</p>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Photos</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {report.photos && report.photos.length > 0 ? (
                        report.photos.map((photo, index) => (
                          <div
                            key={index}
                            className="aspect-square bg-gray-200 border-2 border-black rounded-md overflow-hidden"
                          >
                            <img
                              src={photo || "/placeholder.svg"}
                              alt={`Report photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 col-span-2">No photos attached.</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Reporter Information</h3>
                    <p className="text-gray-700">
                      {report.reporter ? (
                        <>
                          <span className="font-medium">{report.reporter.name}</span>
                          <br />
                          {report.reporter.email}
                          <br />
                          {report.reporter.phone}
                        </>
                      ) : (
                        "Anonymous report"
                      )}
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="actions" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button
                      variant="neobrutalism"
                      className="bg-green-500 text-white border-2 border-black shadow-neobrutalism"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Resolved
                    </Button>
                    <Button
                      variant="neobrutalism"
                      className="bg-blue-500 text-white border-2 border-black shadow-neobrutalism"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Assign to Department
                    </Button>
                    <Button variant="neobrutalism" className="border-2 border-black shadow-neobrutalism">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact Reporter
                    </Button>
                    <Button
                      variant="neobrutalism"
                      className="bg-orange-500 text-white border-2 border-black shadow-neobrutalism"
                    >
                      <Flag className="mr-2 h-4 w-4" />
                      Flag for Review
                    </Button>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Change Status</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="border-2 border-black">
                        In Review
                      </Button>
                      <Button variant="outline" className="border-2 border-black">
                        Resolved
                      </Button>
                      <Button variant="outline" className="border-2 border-black">
                        Rejected
                      </Button>
                      <Button variant="outline" className="border-2 border-black">
                        Pending
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="notes" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Internal Notes</h3>
                    <div className="space-y-2">
                      {report.notes && report.notes.length > 0 ? (
                        report.notes.map((note, index) => (
                          <div key={index} className="bg-gray-100 p-3 rounded-md border-2 border-black">
                            <p className="text-gray-700">{note.content}</p>
                            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                              <span>{note.author}</span>
                              <span>{new Date(note.date).toLocaleString()}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No notes yet.</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Add Note</h3>
                    <Textarea placeholder="Type your note here..." className="border-2 border-black mb-2" />
                    <Button variant="neobrutalism" className="border-2 border-black shadow-neobrutalism">
                      Save Note
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
