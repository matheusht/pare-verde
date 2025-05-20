import type { Resource } from "@/types/resource"

export const mockResources: Resource[] = [
  {
    id: "res-1",
    type: "Equipment",
    description: "Heavy machinery for sidewalk repair",
    linkedReports: ["REP-2023-089", "REP-2023-102"],
    status: "Requested",
    requestDate: new Date(2023, 4, 15),
  },
  {
    id: "res-2",
    type: "Personnel",
    description: "Additional staff for tree planting project",
    linkedReports: ["REP-2023-076"],
    status: "Approved",
    requestDate: new Date(2023, 4, 10),
    approvalDate: new Date(2023, 4, 12),
  },
  {
    id: "res-3",
    type: "Materials",
    description: "Accessibility ramps for public buildings",
    linkedReports: ["REP-2023-054", "REP-2023-067", "REP-2023-068"],
    status: "Fulfilled",
    requestDate: new Date(2023, 4, 5),
    approvalDate: new Date(2023, 4, 6),
    fulfillmentDate: new Date(2023, 4, 8),
  },
  {
    id: "res-4",
    type: "Equipment",
    description: "Water quality testing equipment",
    linkedReports: ["REP-2023-091"],
    status: "Requested",
    requestDate: new Date(2023, 4, 17),
  },
  {
    id: "res-5",
    type: "Materials",
    description: "Park benches and trash bins",
    linkedReports: ["REP-2023-082", "REP-2023-083"],
    status: "Approved",
    requestDate: new Date(2023, 4, 14),
    approvalDate: new Date(2023, 4, 16),
  },
]
