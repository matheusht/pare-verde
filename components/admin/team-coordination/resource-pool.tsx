"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockResourceRequests } from "@/data/mock-resource-requests"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

export function ResourcePool() {
  const [resources, setResources] = useState(mockResourceRequests)

  // Handle approve request
  const handleApprove = (id: string) => {
    setResources(resources.map((resource) => (resource.id === id ? { ...resource, status: "approved" } : resource)))
  }

  // Handle fulfill request
  const handleFulfill = (id: string) => {
    setResources(resources.map((resource) => (resource.id === id ? { ...resource, status: "fulfilled" } : resource)))
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "requested":
        return (
          <Badge variant="outline" className="border-2 border-black bg-yellow-100">
            Requested
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="border-2 border-black bg-blue-100">
            Approved
          </Badge>
        )
      case "fulfilled":
        return (
          <Badge variant="outline" className="border-2 border-black bg-green-100">
            Fulfilled
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="border-b-2 border-black">
        <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <CardTitle>Resource Pool</CardTitle>
          <Button>Add Resource Request</Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black bg-gray-50">
                <th className="px-4 py-3 text-left font-medium">Request Type</th>
                <th className="px-4 py-3 text-left font-medium">Department</th>
                <th className="px-4 py-3 text-left font-medium">Linked Reports</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Requested On</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => (
                <tr key={resource.id} className="border-b border-gray-200">
                  <td className="px-4 py-3">{resource.type}</td>
                  <td className="px-4 py-3">{resource.department}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {resource.linkedReports.map((report) => (
                        <Badge key={report} variant="outline" className="border-black">
                          #{report}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">{getStatusBadge(resource.status)}</td>
                  <td className="px-4 py-3">{new Date(resource.requestedOn).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      {resource.status === "requested" && (
                        <Button
                          size="sm"
                          onClick={() => handleApprove(resource.id)}
                          className="h-8 border-green-600 bg-green-100 text-green-800 hover:bg-green-200"
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                      )}
                      {resource.status === "approved" && (
                        <Button
                          size="sm"
                          onClick={() => handleFulfill(resource.id)}
                          className="h-8 border-blue-600 bg-blue-100 text-blue-800 hover:bg-blue-200"
                        >
                          Fulfill
                        </Button>
                      )}
                      {resource.status === "fulfilled" && <span className="text-sm text-gray-500">Completed</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
