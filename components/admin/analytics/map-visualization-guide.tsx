import { Card, CardContent } from "@/components/ui/card"

export function MapVisualizationGuide() {
  return (
    <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-4">Guia de Visualização de Mapas</h3>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Mapa Padrão</h4>
            <p className="text-sm text-gray-600 mb-2">
              Visualize a localização geográfica dos dados com camadas interativas que podem ser ativadas ou
              desativadas.
            </p>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Ilhas de Calor</span>
              <div className="w-3 h-3 rounded-full bg-green-500 ml-4"></div>
              <span>Corredores Verdes</span>
              <div className="w-3 h-3 rounded-full bg-blue-500 ml-4"></div>
              <span>Gaps de Acessibilidade</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Mapa de Calor</h4>
            <p className="text-sm text-gray-600 mb-2">
              Identifique concentrações e padrões de dados usando gradientes de cores para representar a intensidade.
            </p>
            <div className="h-4 w-full bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500 rounded"></div>
            <div className="flex justify-between text-xs mt-1">
              <span>Baixa Intensidade</span>
              <span>Alta Intensidade</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Mapa Coroplético</h4>
            <p className="text-sm text-gray-600 mb-2">
              Compare métricas entre regiões usando cores para representar valores estatísticos por área.
            </p>
            <div className="grid grid-cols-5 gap-1 h-4 w-full">
              <div className="bg-green-100 rounded-l"></div>
              <div className="bg-green-300"></div>
              <div className="bg-green-500"></div>
              <div className="bg-green-700"></div>
              <div className="bg-green-900 rounded-r"></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>Valor Baixo</span>
              <span>Valor Alto</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
