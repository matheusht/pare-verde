import type { Communication } from "@/types/communication"

export const mockCommunications: Communication[] = [
  {
    id: "comm-1",
    departmentId: "dept-1",
    author: "Eduardo Macacudo",
    timestamp: "2025-05-15T10:30:00Z",
    content:
      "We need to address the accessibility issues in the downtown area. I've assigned three team members to investigate.",
  },
  {
    id: "comm-2",
    departmentId: "dept-1",
    author: "Azeitor",
    timestamp: "2025-05-15T11:45:00Z",
    content: "I've reviewed the reports. We'll need additional equipment for the sidewalk repairs.",
  },
  {
    id: "comm-3",
    departmentId: "dept-2",
    author: "Gordo",
    timestamp: "2025-05-14T09:15:00Z",
    content: "The tree planting initiative in Zona Sul is progressing well. We've completed 70% of the planned work.",
  },
  {
    id: "comm-4",
    departmentId: "dept-3",
    author: "Craque do Volley",
    timestamp: "2025-05-16T14:20:00Z",
    content:
      "We've received multiple reports about the broken traffic lights on Avenida Paulista. Maintenance team is on site.",
  },
  {
    id: "comm-5",
    departmentId: "dept-2",
    author: "Leozinho",
    timestamp: "2025-05-16T16:05:00Z",
    content: "@Gordo can you provide an update on the irrigation system installation?",
  },
  {
    id: "comm-6",
    departmentId: "dept-1",
    author: "Matheus Teadoro (Coordinator)",
    timestamp: "2025-05-17T08:30:00Z",
    content:
      "Team meeting today at 2 PM to discuss the new accessibility standards. Please review the documentation I shared yesterday.",
  },
]
