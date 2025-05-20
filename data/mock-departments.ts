import type { Department } from "@/types/department"

export const mockDepartments: Department[] = [
  {
    id: "dept-1",
    name: "Urban Planning",
    memberCount: 12,
    openIssuesCount: 24,
    avgResolutionTime: 48, // in hours
    performance: "good", // good, average, poor
  },
  {
    id: "dept-2",
    name: "Environmental Services",
    memberCount: 8,
    openIssuesCount: 17,
    avgResolutionTime: 36,
    performance: "good",
  },
  {
    id: "dept-3",
    name: "Public Works",
    memberCount: 15,
    openIssuesCount: 42,
    avgResolutionTime: 72,
    performance: "poor",
  },
  {
    id: "dept-4",
    name: "Parks & Recreation",
    memberCount: 10,
    openIssuesCount: 19,
    avgResolutionTime: 60,
    performance: "average",
  },
  {
    id: "dept-5",
    name: "Accessibility Office",
    memberCount: 6,
    openIssuesCount: 13,
    avgResolutionTime: 40,
    performance: "good",
  },
]
