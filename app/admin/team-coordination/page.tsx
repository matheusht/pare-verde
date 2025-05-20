"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { TeamOverview } from "@/components/admin/team-coordination/team-overview"
import { AssignmentQueue } from "@/components/admin/team-coordination/assignment-queue"
import { WorkloadDashboard } from "@/components/admin/team-coordination/workload-dashboard"
import { CommunicationPanel } from "@/components/admin/team-coordination/communication-panel"
import { ResourcePool } from "@/components/admin/team-coordination/resource-pool"
import { IntegrationLinks } from "@/components/admin/team-coordination/integration-links"
import { mockDepartments } from "@/data/mock-departments"
import { mockReports } from "@/data/mock-reports"
import { mockResources } from "@/data/mock-resources"
import { mockWorkloadData } from "@/data/mock-workload"
import { mockCommunications } from "@/data/mock-communications"

export default function TeamCoordinationPage() {
  // Filter unassigned reports
  const unassignedReports = mockReports.filter((report) => !report.assignedTo)

  // State for date range filter
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  // State for severity filter
  const [severityFilter, setSeverityFilter] = useState<number[]>([1, 2, 3, 4, 5])

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Team Coordination</h1>
            <p className="text-gray-600">Manage teams, assignments, and resources</p>
          </div>

          <IntegrationLinks />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <TeamOverview departments={mockDepartments} />
            <WorkloadDashboard
              workloadData={mockWorkloadData}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              severityFilter={severityFilter}
              onSeverityFilterChange={setSeverityFilter}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
  <AssignmentQueue reports={unassignedReports} departments={mockDepartments} />
  <CommunicationPanel communications={mockCommunications} departments={mockDepartments} />
</div>

          <ResourcePool resources={mockResources} />
        </div>
      </div>
    </div>
  )
}
