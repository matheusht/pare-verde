"use client"

import { Card } from "@/components/ui/card"

interface LineChartProps {
  data: {
    label: string
    values: number[]
    color: string
  }[]
  labels: string[]
  title: string
  className?: string
}

export function NeobrutalismLineChart({ data, labels, title, className }: LineChartProps) {
  // Find the maximum value for scaling
  const allValues = data.flatMap((series) => series.values)
  const maxValue = Math.max(...allValues) * 1.2

  // Chart dimensions
  const chartHeight = 200
  const chartWidth = 100 // percentage

  return (
    <Card className={`border-4 border-black shadow-neobrutalism p-4 ${className}`}>
      <h3 className="font-bold mb-4">{title}</h3>
      <div className="relative h-[250px] mt-6">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs">
          <span>{Math.round(maxValue)}</span>
          <span>{Math.round(maxValue / 2)}</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="absolute left-10 right-0 top-0 bottom-20 border-l-4 border-b-4 border-black">
          {/* Grid lines */}
          <div className="absolute left-0 right-0 top-0 h-[1px] bg-gray-300"></div>
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gray-300"></div>
          <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-gray-300"></div>

          {/* Data lines */}
          {data.map((series, seriesIndex) => (
            <div key={seriesIndex} className="absolute inset-0">
              {/* Line segments */}
              {series.values.map((value, index) => {
                if (index === 0) return null

                const prevValue = series.values[index - 1]
                const x1 = ((index - 1) / (series.values.length - 1)) * 100
                const y1 = ((maxValue - prevValue) / maxValue) * 100
                const x2 = (index / (series.values.length - 1)) * 100
                const y2 = ((maxValue - value) / maxValue) * 100

                return (
                  <svg
                    key={index}
                    className="absolute inset-0 h-full w-full overflow-visible"
                    preserveAspectRatio="none"
                  >
                    <line
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke={series.color}
                      strokeWidth="4"
                    />
                  </svg>
                )
              })}

              {/* Data points */}
              {series.values.map((value, index) => {
                const x = (index / (series.values.length - 1)) * 100
                const y = ((maxValue - value) / maxValue) * 100

                return (
                  <div
                    key={index}
                    className="absolute h-4 w-4 rounded-full border-2 border-black transform -translate-x-2 -translate-y-2"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      backgroundColor: series.color,
                    }}
                  ></div>
                )
              })}
            </div>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="absolute left-10 right-0 bottom-0 h-20 flex justify-between items-start pt-2">
          {labels.map((label, index) => (
            <div key={index} className="text-xs text-center" style={{ width: `${100 / labels.length}%` }}>
              {label}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-0 left-10 right-0 flex justify-center space-x-4 h-10 items-center">
          {data.map((series, index) => (
            <div key={index} className="flex items-center">
              <div className="h-4 w-4 border-2 border-black mr-1" style={{ backgroundColor: series.color }}></div>
              <span className="text-xs">{series.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
