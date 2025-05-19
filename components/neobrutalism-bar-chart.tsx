"use client"

import { Card } from "@/components/ui/card"

interface BarChartProps {
  data: {
    label: string
    value: number
    color: string
  }[]
  title: string
  maxValue?: number
  className?: string
}

export function NeobrutalismBarChart({ data, title, maxValue, className }: BarChartProps) {
  // Calculate the maximum value if not provided
  const calculatedMax = maxValue || Math.max(...data.map((item) => item.value)) * 1.2

  return (
    <Card className={`border-4 border-black shadow-neobrutalism p-4 ${className}`}>
      <h3 className="font-bold mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{item.label}</span>
              <span className="font-bold">{item.value}</span>
            </div>
            <div className="h-8 w-full bg-gray-100 border-4 border-black relative">
              <div
                className="h-full absolute top-0 left-0"
                style={{
                  width: `${Math.min(100, (item.value / calculatedMax) * 100)}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
