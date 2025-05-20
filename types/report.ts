export interface Report {
  id: string
  title: string
  category: string
  location: string
  region: string
  date: string
  status: "pending" | "in-progress" | "resolved" | "rejected"
  severity: 1 | 2 | 3 | 4 | 5
  coordinates: {
    lat: number
    lng: number
  }
  responseTime?: number // in hours
  description?: string
  photos?: string[]
  userId?: string
}
