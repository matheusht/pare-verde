"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { mockTeams } from "@/data/mock-teams"

// Generate workload data for the chart
const generateWorkloadData = (days: number, teams: any[]) => {
  const data = []
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    const entry: any = {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    }

    teams.forEach((team) => {
      // Generate a somewhat realistic pattern with some randomness
      const baseValue = team.openIssues / 2
      const randomFactor = Math.random() * 0.5 + 0.75 // 0.75 to 1.25
      entry[team.name] = Math.round(baseValue * randomFactor)
    })

    data.push(entry)
  }

  return data
}

export function WorkloadDashboard() {
  const [timeRange, setTimeRange] = useState("7days")
  const [showHighSeverity, setShowHighSeverity] = useState(false)

  // Generate data based on selected time range
  const days = timeRange === "7days" ? 7 : timeRange === "30days" ? 30 : 90
  const workloadData = generateWorkloadData(days, mockTeams)

  // Define colors for each team (using neobrutalism style)
  const teamColors = [
    "#FF6B6B", // Red
    "#4ECDC4", // Teal
    "#FFD166", // Yellow
    "#6B5CA5", // Purple
    "#72B01D", // Green
  ]

  return (
    <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="border-b-2 border-black">
        <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <CardTitle>Team Workload Over Time</CardTitle>
          <div className="flex items-center space-x-2">
            <Tabs defaultValue="7days" className="w-[300px]" onValueChange={setTimeRange}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="7days">7 Days</TabsTrigger>
                <TabsTrigger value="30days">30 Days</TabsTrigger>
                <TabsTrigger value="90days">90 Days</TabsTrigger>
              </TabsList>
            </Tabs>
            <label className="flex cursor-pointer items-center space-x-2">
              <input
                type="checkbox"
                checked={showHighSeverity}
                onChange={(e) => setShowHighSeverity(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-sm font-medium">High Severity Only</span>
            </label>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workloadData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "2px solid black",
                  borderRadius: "4px",
                  boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
                }}
              />
              <Legend />
              {mockTeams.map((team, index) => (
                <Bar
                  key={team.name}
                  dataKey={team.name}
                  stackId="a"
                  fill={teamColors[index % teamColors.length]}
                  stroke="black"
                  strokeWidth={2}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {mockTeams.map(
              (team, index) =>
                team.openIssues > team.memberCount * 3 && (
                  <div
                    key={team.id}
                    className="rounded-md border-2 border-black bg-red-100 px-3 py-1 text-sm font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    ⚠️ {team.name} exceeding capacity
                  </div>
                ),
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
