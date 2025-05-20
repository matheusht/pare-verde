export interface Neighborhood {
  id: string
  name: string
  region: string
  reportCount: number
  avgResponseTime: number // in hours
  isCritical: boolean
}
