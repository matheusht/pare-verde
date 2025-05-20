"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Clock, AlertTriangle, ChevronRight } from "lucide-react"
import Link from "next/link"
import type { Department } from "@/types/department"

interface TeamOverviewProps {
  departments: Department[]
}

export function TeamOverview({ departments }: TeamOverviewProps) {
  // Sort departments by open issues (descending)
  const sortedDepartments = [...departments].sort((a, b) => b.openIssues - a.openIssues)

  return (
    <Card className="border-4 border-black shadow-neobrutalism">
      <CardHeader className="bg-blue-100 border-b-4 border-black">
        <CardTitle className="text-xl">Team Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-4 border-black bg-gray-100">
                <th className="px-4 py-3 text-left font-bold">Department</th>
                <th className="px-4 py-3 text-center font-bold">Members</th>
                <th className="px-4 py-3 text-center font-bold">Open Issues</th>
                <th className="px-4 py-3 text-center font-bold">Avg. Resolution</th>
                <th className="px-4 py-3 text-center font-bold">Status</th>
                <th className="px-4 py-3 text-center font-bold"></th>
              </tr>
            </thead>
            <tbody className="divide-y-4 divide-black">
              {sortedDepartments.map((department) => (
                <tr key={department.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100 border-2 border-black mr-3">
                        <Users className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium">{department.name}</div>
                        <div className="text-sm text-gray-500">{department.lead}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center font-bold">{department.memberCount}</td>
                  <td className="px-4 py-3 text-center font-bold">{department.openIssues}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{department.avgResolutionTime} hours</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {department.status === "overloaded" ? (
                      <Badge className="bg-red-500 text-white border-2 border-black flex items-center gap-1 mx-auto">
                        <AlertTriangle className="h-3 w-3" />
                        Overloaded
                      </Badge>
                    ) : department.status === "busy" ? (
                      <Badge className="bg-yellow-500 text-white border-2 border-black mx-auto">Busy</Badge>
                    ) : (
                      <Badge className="bg-green-500 text-white border-2 border-black mx-auto">Available</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link href="/admin/dashboard#teams" className="text-blue-500 hover:text-blue-700">
                      <div className="flex items-center justify-center">
                        <span className="mr-1">Manage</span>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </Link>
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
