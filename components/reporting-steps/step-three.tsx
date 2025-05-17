"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MapPin, Camera, AlertTriangle } from "lucide-react"

interface StepThreeProps {
  formData: {
    category: string
    location: { lat: number; lng: number }
    photos: File[]
    obstacleTags: string[]
    otherObstacle: string
    severity: number
    description: string
    notifyMe: boolean
    email: string
  }
  updateFormData: (data: Partial<StepThreeProps["formData"]>) => void
}

export function StepThree({ formData, updateFormData }: StepThreeProps) {
  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      "missing-ramp": "Rampa de acessibilidade ausente",
      obstruction: "Obstrução na calçada",
      "uneven-surface": "Superfície irregular",
      "broken-sidewalk": "Calçada quebrada",
      "missing-tree": "Área sem árvores",
      "heat-island": "Ilha de calor",
      flooding: "Área de alagamento",
      other: "Outro problema",
    }
    return categories[category] || "Não especificado"
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="description" className="text-lg font-bold">
          Descrição
        </Label>
        <Textarea
          id="description"
          placeholder="Descreva o problema em detalhes (máximo 150 caracteres)"
          className="border-4 border-black shadow-neobrutalism resize-none"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          maxLength={150}
        />
        <div className="text-right text-sm text-gray-500">{formData.description.length}/150 caracteres</div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="notify" className="text-lg font-bold">
            Notificar sobre atualizações
          </Label>
          <Switch
            id="notify"
            checked={formData.notifyMe}
            onCheckedChange={(checked) => updateFormData({ notifyMe: checked })}
            className="border-2 border-black data-[state=checked]:bg-green-500"
          />
        </div>

        {formData.notifyMe && (
          <Input
            type="email"
            placeholder="Seu email"
            className="border-4 border-black shadow-neobrutalism"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
          />
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-lg font-bold">Resumo do Relatório</Label>
        <Card className="border-4 border-black shadow-neobrutalism p-4 space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold">Categoria</h4>
              <p>{getCategoryName(formData.category)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold">Localização</h4>
              <p>
                Lat: {formData.location.lat.toFixed(6)}, Lng: {formData.location.lng.toFixed(6)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Camera className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold">Mídia</h4>
              <p>{formData.photos.length} foto(s) anexada(s)</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold">Gravidade</h4>
            <div className="flex items-center mt-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`h-3 w-8 ${level <= formData.severity ? "bg-red-500" : "bg-gray-200"} ${level === 1 ? "rounded-l" : ""} ${level === 5 ? "rounded-r" : ""}`}
                />
              ))}
            </div>
          </div>

          {formData.obstacleTags.length > 0 && (
            <div>
              <h4 className="font-bold">Obstáculos</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.obstacleTags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-200 border-2 border-black text-sm rounded">
                    {tag === "tree" && "Árvore"}
                    {tag === "construction" && "Construção"}
                    {tag === "parked-car" && "Carro Estacionado"}
                    {tag === "other" && "Outro: " + formData.otherObstacle}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
