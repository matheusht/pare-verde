"use client"

import { Card } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"

interface LayerControlsProps {
  activeLayer: string
  onLayerChange: (layer: string) => void
}

export function LayerControls({ activeLayer, onLayerChange }: LayerControlsProps) {
  return (
    <div className="absolute top-20 right-4 z-10">
      <Card className="p-4 border-4 border-black shadow-neobrutalism bg-white">
        <h3 className="font-bold mb-2">Camadas</h3>
        <div className="flex flex-col gap-2">
          <Toggle
            pressed={activeLayer === "heat"}
            onPressedChange={() => onLayerChange("heat")}
            className="justify-start border-2 border-black data-[state=on]:bg-red-200"
          >
            <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
            Ilhas de Calor
          </Toggle>
          <Toggle
            pressed={activeLayer === "green"}
            onPressedChange={() => onLayerChange("green")}
            className="justify-start border-2 border-black data-[state=on]:bg-green-200"
          >
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            Cobertura Verde
          </Toggle>
          <Toggle className="justify-start border-2 border-black data-[state=on]:bg-blue-200">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
            Ciclovias
          </Toggle>
          <Toggle className="justify-start border-2 border-black data-[state=on]:bg-purple-200">
            <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
            Acessibilidade
          </Toggle>
        </div>
      </Card>
    </div>
  )
}
