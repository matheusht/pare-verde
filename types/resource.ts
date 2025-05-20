export type ResourceStatus = "Requested" | "Approved" | "Fulfilled"

export interface Resource {
  id: string
  type: string
  description: string
  linkedReports: string[]
  status: ResourceStatus
  requestDate: Date
  approvalDate?: Date
  fulfillmentDate?: Date
}
