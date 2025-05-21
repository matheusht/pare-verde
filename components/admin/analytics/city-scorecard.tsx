import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Leaf, Thermometer, ShipWheelIcon as Wheelchair, BarChart3 } from "lucide-react"
import type { CityScorecard as CityScoreCardType } from "@/data/mock-analytics-data"

interface CityScoreCardProps {
  data: CityScoreCardType
  district: string
}

export function CityScorecard({ data, district }: CityScoreCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium mb-1">Cobertura Verde</p>
              <h3 className="text-3xl font-bold">{data.greenCoverChange.value}%</h3>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
          </div>

          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-green-500 rounded-full"
              style={{ width: `${(data.greenCoverChange.value / data.greenCoverChange.target) * 100}%` }}
            ></div>
          </div>

          <div className="mt-2 flex justify-between items-center">
            <p className="text-xs text-gray-500">Meta: {data.greenCoverChange.target}%</p>
            <div className={`flex items-center ${data.greenCoverChange.delta > 0 ? "text-green-600" : "text-red-600"}`}>
              {data.greenCoverChange.delta > 0 ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              <span className="text-xs font-medium">{Math.abs(data.greenCoverChange.delta)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium mb-1">Índice de Ilha de Calor</p>
              <h3 className="text-3xl font-bold">{data.heatIslandIndex.value}°C</h3>
            </div>
            <div className="bg-red-100 p-2 rounded-full">
              <Thermometer className="h-5 w-5 text-red-600" />
            </div>
          </div>

          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-red-500 rounded-full"
              style={{ width: `${(data.heatIslandIndex.value / 5) * 100}%` }}
            ></div>
          </div>

          <div className="mt-2 flex justify-between items-center">
            <p className="text-xs text-gray-500">Meta: {data.heatIslandIndex.target}°C</p>
            <div className={`flex items-center ${data.heatIslandIndex.delta < 0 ? "text-green-600" : "text-red-600"}`}>
              {data.heatIslandIndex.delta < 0 ? (
                <ArrowDown className="h-3 w-3 mr-1" />
              ) : (
                <ArrowUp className="h-3 w-3 mr-1" />
              )}
              <span className="text-xs font-medium">{Math.abs(data.heatIslandIndex.delta)}°C</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium mb-1">Problemas de Acessibilidade</p>
              <h3 className="text-3xl font-bold">{data.accessibilityIssues.value}</h3>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <Wheelchair className="h-5 w-5 text-blue-600" />
            </div>
          </div>

          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{ width: `${(data.accessibilityIssues.value / 300) * 100}%` }}
            ></div>
          </div>

          <div className="mt-2 flex justify-between items-center">
            <p className="text-xs text-gray-500">Meta: {data.accessibilityIssues.target}</p>
            <div
              className={`flex items-center ${data.accessibilityIssues.delta < 0 ? "text-green-600" : "text-red-600"}`}
            >
              {data.accessibilityIssues.delta < 0 ? (
                <ArrowDown className="h-3 w-3 mr-1" />
              ) : (
                <ArrowUp className="h-3 w-3 mr-1" />
              )}
              <span className="text-xs font-medium">{Math.abs(data.accessibilityIssues.delta)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium mb-1">Volume de Relatórios</p>
              <h3 className="text-3xl font-bold">{data.reportVolume.value}</h3>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
          </div>

          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-purple-500 rounded-full"
              style={{ width: `${(data.reportVolume.value / 500) * 100}%` }}
            ></div>
          </div>

          <div className="mt-2 flex justify-between items-center">
            <p className="text-xs text-gray-500">Meta: {data.reportVolume.target}</p>
            <div className={`flex items-center ${data.reportVolume.delta < 0 ? "text-green-600" : "text-red-600"}`}>
              {data.reportVolume.delta < 0 ? (
                <ArrowDown className="h-3 w-3 mr-1" />
              ) : (
                <ArrowUp className="h-3 w-3 mr-1" />
              )}
              <span className="text-xs font-medium">{Math.abs(data.reportVolume.delta)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
