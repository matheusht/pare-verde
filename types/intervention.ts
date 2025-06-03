export interface Intervention {
    id: string
    title: string
    type: 'ramps' | 'green-corridors' | 'heat-mitigation' | 'accessibility' | 'tree-planting' | 'infrastructure'
    description: string
    assignedDepartment: string
    linkedReportIds: string[]
    status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
    startDate: string
    endDate: string
    budget: number
    location: {
      lat: number
      lng: number
      address: string
      neighborhood: string
    }
    expectedImpact: string
    progress: number
    priority: 'low' | 'medium' | 'high' | 'urgent'
    createdAt: string
    updatedAt: string
  }
  
  export interface InterventionStats {
    totalInterventions: number
    byType: Record<string, number>
    totalBudget: number
    linkedToReportsPercentage: number
    completedThisMonth: number
    inProgress: number
  }
  