import { Intervention, InterventionStats } from '@/types/intervention'

export const mockInterventions: Intervention[] = [
  {
    id: 'INT-001',
    title: 'Instalação de Rampas - Rua das Flores',
    type: 'ramps',
    description: 'Instalação de 3 rampas de acessibilidade na Rua das Flores para melhorar mobilidade urbana',
    assignedDepartment: 'Infraestrutura',
    linkedReportIds: ['REP-123', 'REP-124'],
    status: 'scheduled',
    startDate: '2024-01-15',
    endDate: '2024-01-30',
    budget: 15000,
    location: {
      lat: -23.5505,
      lng: -46.6333,
      address: 'Rua das Flores, 123',
      neighborhood: 'Centro'
    },
    expectedImpact: 'Melhoria da acessibilidade para 500+ pedestres diários',
    progress: 0,
    priority: 'high',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'INT-002',
    title: 'Corredor Verde - Avenida Paulista',
    type: 'green-corridors',
    description: 'Criação de corredor verde com plantio de 50 árvores nativas',
    assignedDepartment: 'Meio Ambiente',
    linkedReportIds: ['REP-125'],
    status: 'in-progress',
    startDate: '2024-01-10',
    endDate: '2024-02-15',
    budget: 45000,
    location: {
      lat: -23.5618,
      lng: -46.6565,
      address: 'Avenida Paulista, 1000-1500',
      neighborhood: 'Bela Vista'
    },
    expectedImpact: 'Redução de 2°C na temperatura local e melhoria da qualidade do ar',
    progress: 35,
    priority: 'medium',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-12'
  },
  {
    id: 'INT-003',
    title: 'Mitigação de Calor - Praça da República',
    type: 'heat-mitigation',
    description: 'Instalação de cobertura e sistema de nebulização na praça',
    assignedDepartment: 'Obras Públicas',
    linkedReportIds: ['REP-126', 'REP-127', 'REP-128'],
    status: 'scheduled',
    startDate: '2024-02-01',
    endDate: '2024-03-15',
    budget: 80000,
    location: {
      lat: -23.5431,
      lng: -46.6291,
      address: 'Praça da República',
      neighborhood: 'República'
    },
    expectedImpact: 'Redução de 3°C na temperatura e criação de área de descanso para 200+ pessoas',
    progress: 0,
    priority: 'urgent',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    id: 'INT-004',
    title: 'Plantio de Árvores - Vila Madalena',
    type: 'tree-planting',
    description: 'Plantio de 30 árvores frutíferas em área residencial',
    assignedDepartment: 'Meio Ambiente',
    linkedReportIds: [],
    status: 'completed',
    startDate: '2023-12-01',
    endDate: '2023-12-20',
    budget: 12000,
    location: {
      lat: -23.5364,
      lng: -46.6890,
      address: 'Rua Harmonia, 200-400',
      neighborhood: 'Vila Madalena'
    },
    expectedImpact: 'Melhoria da qualidade do ar e fornecimento de frutas para comunidade local',
    progress: 100,
    priority: 'low',
    createdAt: '2023-11-15',
    updatedAt: '2023-12-20'
  },
  {
    id: 'INT-005',
    title: 'Melhoria de Acessibilidade - Terminal Rodoviário',
    type: 'accessibility',
    description: 'Reforma completa de acessibilidade no terminal rodoviário',
    assignedDepartment: 'Transporte',
    linkedReportIds: ['REP-129', 'REP-130'],
    status: 'in-progress',
    startDate: '2024-01-05',
    endDate: '2024-04-30',
    budget: 150000,
    location: {
      lat: -23.5329,
      lng: -46.6395,
      address: 'Terminal Rodoviário do Tietê',
      neighborhood: 'Santana'
    },
    expectedImpact: 'Melhoria da acessibilidade para 10.000+ usuários diários',
    progress: 60,
    priority: 'high',
    createdAt: '2023-12-20',
    updatedAt: '2024-01-12'
  }
]

export const mockInterventionStats: InterventionStats = {
  totalInterventions: 5,
  byType: {
    'ramps': 1,
    'green-corridors': 1,
    'heat-mitigation': 1,
    'tree-planting': 1,
    'accessibility': 1,
    'infrastructure': 0
  },
  totalBudget: 302000,
  linkedToReportsPercentage: 80,
  completedThisMonth: 1,
  inProgress: 2
}
