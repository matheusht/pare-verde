export interface Department {
  id: string
  name: string
  memberCount: number
  openIssuesCount: number
  avgResolutionTime: number // in hours
  performance: "good" | "average" | "poor"
}
