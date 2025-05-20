export interface ResourceRequest {
  id: string
  type: string
  department: string
  linkedReports: string[]
  status: "requested" | "approved" | "fulfilled"
  requestedOn: string
  requestedBy: string
  approvedOn?: string
  approvedBy?: string
  fulfilledOn?: string
  fulfilledBy?: string
}
