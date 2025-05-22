// City Scorecard Data
export interface CityScorecard {
    greenCoverChange: {
      value: number
      delta: number
      target: number
    }
    heatIslandIndex: {
      value: number
      delta: number
      target: number
    }
    accessibilityIssues: {
      value: number
      delta: number
      target: number
    }
    reportVolume: {
      value: number
      delta: number
      target: number
    }
  }
  
  export const mockCityScorecard: CityScorecard = {
    greenCoverChange: {
      value: 23.5,
      delta: 2.1,
      target: 30,
    },
    heatIslandIndex: {
      value: 3.2,
      delta: -0.5,
      target: 2.0,
    },
    accessibilityIssues: {
      value: 187,
      delta: -23,
      target: 0,
    },
    reportVolume: {
      value: 342,
      delta: 15,
      target: 300,
    },
  }
  
  // Time Series Data
  export interface TimeSeriesDataPoint {
    date: string
    greenCover: number
    heatIndex: number
    accessibilityIssues: number
    reportVolume: number
  }
  
  export const mockTimeSeriesData: TimeSeriesDataPoint[] = [
    {
      date: "2025-01",
      greenCover: 21.2,
      heatIndex: 3.8,
      accessibilityIssues: 210,
      reportVolume: 320,
    },
    {
      date: "2025-02",
      greenCover: 21.3,
      heatIndex: 3.7,
      accessibilityIssues: 205,
      reportVolume: 315,
    },
    {
      date: "2025-03",
      greenCover: 21.5,
      heatIndex: 3.7,
      accessibilityIssues: 200,
      reportVolume: 325,
    },
    {
      date: "2025-04",
      greenCover: 21.8,
      heatIndex: 3.6,
      accessibilityIssues: 195,
      reportVolume: 330,
    },
    {
      date: "2025-05",
      greenCover: 22.0,
      heatIndex: 3.5,
      accessibilityIssues: 190,
      reportVolume: 335,
    },
    {
      date: "2025-06",
      greenCover: 22.3,
      heatIndex: 3.5,
      accessibilityIssues: 195,
      reportVolume: 340,
    },
    {
      date: "2025-07",
      greenCover: 22.5,
      heatIndex: 3.4,
      accessibilityIssues: 190,
      reportVolume: 345,
    },
    {
      date: "2025-08",
      greenCover: 22.8,
      heatIndex: 3.4,
      accessibilityIssues: 185,
      reportVolume: 340,
    },
    {
      date: "2025-09",
      greenCover: 23.0,
      heatIndex: 3.3,
      accessibilityIssues: 180,
      reportVolume: 335,
    },
    {
      date: "2025-10",
      greenCover: 23.2,
      heatIndex: 3.3,
      accessibilityIssues: 185,
      reportVolume: 330,
    },
    {
      date: "2025-11",
      greenCover: 23.4,
      heatIndex: 3.2,
      accessibilityIssues: 190,
      reportVolume: 335,
    },
    {
      date: "2025-12",
      greenCover: 23.5,
      heatIndex: 3.2,
      accessibilityIssues: 187,
      reportVolume: 342,
    },
  ]
  
  // Neighborhood Data
  export interface Neighborhood {
    id: string
    name: string
    greenCover: number
    heatIndex: number
    accessibilityScore: number
    reportDensity: number
    walkabilityScore: number
  }
  
  export const mockNeighborhoods: Neighborhood[] = [
    {
      id: "centro",
      name: "Centro",
      greenCover: 15.3,
      heatIndex: 4.2,
      accessibilityScore: 68,
      reportDensity: 42,
      walkabilityScore: 85,
    },
    {
      id: "ipanema",
      name: "Ipanema",
      greenCover: 28.7,
      heatIndex: 2.8,
      accessibilityScore: 82,
      reportDensity: 23,
      walkabilityScore: 92,
    },
    {
      id: "tijuca",
      name: "Tijuca",
      greenCover: 32.1,
      heatIndex: 2.5,
      accessibilityScore: 75,
      reportDensity: 18,
      walkabilityScore: 78,
    },
    {
      id: "copacabana",
      name: "Copacabana",
      greenCover: 18.5,
      heatIndex: 3.6,
      accessibilityScore: 79,
      reportDensity: 35,
      walkabilityScore: 90,
    },
    {
      id: "botafogo",
      name: "Botafogo",
      greenCover: 22.4,
      heatIndex: 3.2,
      accessibilityScore: 76,
      reportDensity: 28,
      walkabilityScore: 87,
    },
  ]
  
  // Spatial Data
  export interface SpatialData {
    id: string
    name: string
    coordinates: [number, number]
    heatIndex: number
    greenCover: number
    accessibilityGaps: number
    recentReports: number
  }
  
  export const mockSpatialData: SpatialData[] = [
    {
      id: "centro",
      name: "Centro",
      coordinates: [-43.1729, -22.9068],
      heatIndex: 32.5,
      greenCover: 15.3,
      accessibilityGaps: 42,
      recentReports: 87,
    },
    {
      id: "ipanema",
      name: "Ipanema",
      coordinates: [-43.2096, -22.9835],
      heatIndex: 28.2,
      greenCover: 28.7,
      accessibilityGaps: 18,
      recentReports: 45,
    },
    {
      id: "tijuca",
      name: "Tijuca",
      coordinates: [-43.2587, -22.9296],
      heatIndex: 27.8,
      greenCover: 32.1,
      accessibilityGaps: 25,
      recentReports: 38,
    },
    {
      id: "copacabana",
      name: "Copacabana",
      coordinates: [-43.1893, -22.9697],
      heatIndex: 30.1,
      greenCover: 18.5,
      accessibilityGaps: 21,
      recentReports: 72,
    },
    {
      id: "botafogo",
      name: "Botafogo",
      coordinates: [-43.1869, -22.9511],
      heatIndex: 29.5,
      greenCover: 22.4,
      accessibilityGaps: 28,
      recentReports: 56,
    },
  ]
  
  // Predictive Modeling Data
  export interface PredictiveScenario {
    id: string
    name: string
    description: string
    impacts: {
      heatReduction: number
      greenCoverIncrease: number
      accessibilityImprovement: number
      estimatedCost: number
    }
  }
  
  export const mockPredictiveScenarios: PredictiveScenario[] = [
    {
      id: "scenario1",
      name: "Expansão de Áreas Verdes",
      description: "Aumento de 10% na cobertura verde em áreas urbanas densas",
      impacts: {
        heatReduction: 1.2,
        greenCoverIncrease: 10.0,
        accessibilityImprovement: 5,
        estimatedCost: 2500000,
      },
    },
    {
      id: "scenario2",
      name: "Corredores de Acessibilidade",
      description: "Implementação de rotas acessíveis conectando pontos-chave da cidade",
      impacts: {
        heatReduction: 0.3,
        greenCoverIncrease: 2.5,
        accessibilityImprovement: 35,
        estimatedCost: 1800000,
      },
    },
    {
      id: "scenario3",
      name: "Telhados Verdes",
      description: "Incentivo à instalação de telhados verdes em edifícios comerciais",
      impacts: {
        heatReduction: 0.8,
        greenCoverIncrease: 7.5,
        accessibilityImprovement: 0,
        estimatedCost: 1200000,
      },
    },
  ]
  
  // Districts Data
  export interface District {
    id: string
    name: string
  }
  
  export const mockDistricts: District[] = [
    { id: "all", name: "Todos os Distritos" },
    { id: "north", name: "Zona Norte" },
    { id: "south", name: "Zona Sul" },
    { id: "west", name: "Zona Oeste" },
    { id: "central", name: "Zona Central" },
  ]
  