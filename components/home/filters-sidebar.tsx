"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { ChevronRight } from "lucide-react"

interface FiltersSidebarProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function FiltersSidebar({ isOpen, onOpenChange }: FiltersSidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 border-r-4 border-black shadow-neobrutalism p-0">
        <div className="p-4 border-b-4 border-black bg-green-100">
          <h2 className="text-xl font-bold">Filtros & Análise</h2>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <h3 className="font-bold mb-2">Período</h3>
            <div className="px-2">
              <Slider defaultValue={[2025]} min={2010} max={2025} step={1} className="border-2 border-black" />
              <div className="flex justify-between mt-1 text-sm">
                <span>2010</span>
                <span>2025</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">Temas</h3>
            <div className="space-y-2">
              <Button
                variant="neobrutalism"
                className="w-full justify-start bg-red-100 hover:bg-red-200 border-4 border-black shadow-neobrutalism"
              >
                <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                Ilhas de Calor
              </Button>
              <Button
                variant="neobrutalism"
                className="w-full justify-start bg-green-100 hover:bg-green-200 border-4 border-black shadow-neobrutalism"
              >
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                Áreas Verdes
              </Button>
              <Button
                variant="neobrutalism"
                className="w-full justify-start bg-blue-100 hover:bg-blue-200 border-4 border-black shadow-neobrutalism"
              >
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                Caminhabilidade
              </Button>
              <Button
                variant="neobrutalism"
                className="w-full justify-start bg-purple-100 hover:bg-purple-200 border-4 border-black shadow-neobrutalism"
              >
                <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                Acessibilidade
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">Regiões</h3>
            <div className="space-y-2">
              <Button
                variant="neobrutalism"
                className="w-full justify-start bg-yellow-100 hover:bg-yellow-200 border-4 border-black shadow-neobrutalism"
              >
                Centro
              </Button>
              <Button
                variant="neobrutalism"
                className="w-full justify-start bg-yellow-100 hover:bg-yellow-200 border-4 border-black shadow-neobrutalism"
              >
                Zona Norte
              </Button>
              <Button
                variant="neobrutalism"
                className="w-full justify-start bg-yellow-100 hover:bg-yellow-200 border-4 border-black shadow-neobrutalism"
              >
                Zona Sul
              </Button>
              <Button
                variant="neobrutalism"
                className="w-full justify-start bg-yellow-100 hover:bg-yellow-200 border-4 border-black shadow-neobrutalism"
              >
                Zona Leste
              </Button>
              <Button
                variant="neobrutalism"
                className="w-full justify-start bg-yellow-100 hover:bg-yellow-200 border-4 border-black shadow-neobrutalism"
              >
                Zona Oeste
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">Relatórios</h3>
            <div className="space-y-2">
              <Button
                variant="neobrutalism"
                className="w-full justify-between bg-white hover:bg-gray-100 border-4 border-black shadow-neobrutalism"
              >
                Relatório de Sustentabilidade
                <ChevronRight className="h-5 w-5" />
              </Button>
              <Button
                variant="neobrutalism"
                className="w-full justify-between bg-white hover:bg-gray-100 border-4 border-black shadow-neobrutalism"
              >
                Análise de Acessibilidade
                <ChevronRight className="h-5 w-5" />
              </Button>
              <Button
                variant="neobrutalism"
                className="w-full justify-between bg-white hover:bg-gray-100 border-4 border-black shadow-neobrutalism"
              >
                Mapa de Calor Urbano
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
