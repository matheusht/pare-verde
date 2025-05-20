export interface Team {
  id: string
  name: string
  memberCount: number
  openIssues: number
  avgResolutionTime: number // in hours
  description: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  teamId: string
  email: string
  avatar?: string
}
