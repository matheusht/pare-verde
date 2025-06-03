"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { InterventionOverviewCards } from "../../../components/admin/projects/intervention-overview"
import { InterventionTimeline } from "@/components/admin/projects/intervention-timeline"
import { InterventionsTable } from "@/components/admin/projects/interventions-table"
import { NewInterventionModal } from "@/components/admin/projects/new-intervention-modal"
import { mockInterventions, mockInterventionStats } from "@/data/mock-interventions"
import type { Intervention } from "@/types/intervention"

export default function ProjectsPage() {
  const [interventions, setInterventions] = useState<Intervention[]>(mockInterventions)
  const [isNewInterventionModalOpen, setIsNewInterventionModalOpen] = useState(false)
  const [selectedIntervention, setSelectedIntervention] = useState<Intervention | null>(null)

  const handleNewIntervention = (intervention: Intervention) => {
    setInterventions([intervention, ...interventions])
  }

  const handleEditIntervention = (intervention: Intervention) => {
    setSelectedIntervention(intervention)
    // In a real app, this would open an edit modal
    console.log("Edit intervention:", intervention)
  }

  const handleViewIntervention = (intervention: Intervention) => {
    setSelectedIntervention(intervention)
    // In a real app, this would open a detailed view
    console.log("View intervention:", intervention)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-black uppercase mb-2">Planejamento de Intervenções</h1>
                <p className="text-gray-600 text-lg">
                  Gerencie e monitore intervenções urbanas baseadas em relatórios cidadãos
                </p>
              </div>
              <Button
                onClick={() => setIsNewInterventionModalOpen(true)}
                className="flex items-center gap-2 bg-green-500 text-lg hover:bg-green-600 text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all w-full sm:w-auto"
              >
                <Plus className="w-6 h-6 mr-2" />
                Nova Intervenção
              </Button>
            </div>

            {/* Overview Cards */}
            <InterventionOverviewCards stats={mockInterventionStats} />

            {/* Timeline View */}
            <InterventionTimeline interventions={interventions} />

            {/* Interventions Table */}
            <InterventionsTable
              interventions={interventions}
              onEdit={handleEditIntervention}
              onView={handleViewIntervention}
            />

            {/* New Intervention Modal */}
            <NewInterventionModal
              isOpen={isNewInterventionModalOpen}
              onClose={() => setIsNewInterventionModalOpen(false)}
              onSubmit={handleNewIntervention}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
