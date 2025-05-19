"use client"

import { Card } from "@/components/ui/card"
import { useMobile } from "@/hooks/use-mobile"

export function KpiCards() {
  const isMobile = useMobile()

  return (
    <div className="absolute bottom-4 left-4 right-4 z-10 flex gap-2 md:gap-4 overflow-x-auto pb-2 md:justify-start">
      <Card
        className={`${isMobile ? "flex-1" : "w-[200px]"} min-w-[150px] border-4 border-black shadow-neobrutalism bg-white p-3 md:p-4`}
      >
        <h3 className="font-bold text-base md:text-lg">Cobertura Verde</h3>
        <p className="text-2xl md:text-3xl font-bold text-green-600">23%</p>
        <p className="text-xs md:text-sm text-gray-600">Média da cidade</p>
      </Card>

      <Card
        className={`${isMobile ? "flex-1" : "w-[200px]"} min-w-[150px] border-4 border-black shadow-neobrutalism bg-white p-3 md:p-4`}
      >
        <h3 className="font-bold text-base md:text-lg">Ilhas de Calor</h3>
        <p className="text-2xl md:text-3xl font-bold text-red-600">12</p>
        <p className="text-xs md:text-sm text-gray-600">Zonas críticas</p>
      </Card>

      <Card
        className={`${isMobile ? "flex-1" : "w-[200px]"} min-w-[150px] border-4 border-black shadow-neobrutalism bg-white p-3 md:p-4`}
      >
        <h3 className="font-bold text-base md:text-lg">Acessibilidade</h3>
        <p className="text-2xl md:text-3xl font-bold text-blue-600">68%</p>
        <p className="text-xs md:text-sm text-gray-600">Calçadas adequadas</p>
      </Card>

      <Card
        className={`${isMobile ? "hidden" : "w-[200px]"} min-w-[150px] border-4 border-black shadow-neobrutalism bg-white p-3 md:p-4`}
      >
        <h3 className="font-bold text-base md:text-lg">Temperatura</h3>
        <p className="text-2xl md:text-3xl font-bold text-orange-600">+3.2°C</p>
        <p className="text-xs md:text-sm text-gray-600">Acima da média</p>
      </Card>
    </div>
  )
}
