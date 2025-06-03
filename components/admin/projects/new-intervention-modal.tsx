"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface NewInterventionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (intervention: any) => void
}

export function NewInterventionModal({ isOpen, onClose, onSubmit }: NewInterventionModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    assignedDepartment: "",
    linkedReportIds: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    budget: "",
    address: "",
    neighborhood: "",
    expectedImpact: "",
    priority: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const intervention = {
      id: `INT-${Date.now()}`,
      title: formData.title,
      type: formData.type,
      description: formData.description,
      assignedDepartment: formData.assignedDepartment,
      linkedReportIds: formData.linkedReportIds
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean),
      status: "scheduled",
      startDate: formData.startDate?.toISOString().split("T")[0] || "",
      endDate: formData.endDate?.toISOString().split("T")[0] || "",
      budget: Number.parseInt(formData.budget) || 0,
      location: {
        lat: -23.5505,
        lng: -46.6333,
        address: formData.address,
        neighborhood: formData.neighborhood,
      },
      expectedImpact: formData.expectedImpact,
      progress: 0,
      priority: formData.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    onSubmit(intervention)
    onClose()

    // Reset form
    setFormData({
      title: "",
      type: "",
      description: "",
      assignedDepartment: "",
      linkedReportIds: "",
      startDate: undefined,
      endDate: undefined,
      budget: "",
      address: "",
      neighborhood: "",
      expectedImpact: "",
      priority: "",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase flex items-center gap-2">
            <Plus className="w-6 h-6" />
            Nova Intervenção
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="font-bold">
                Título do Projeto *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border-2 border-black font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="font-bold">
                Tipo de Intervenção *
              </Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="border-2 border-black font-medium">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ramps">Rampas</SelectItem>
                  <SelectItem value="green-corridors">Corredores Verdes</SelectItem>
                  <SelectItem value="heat-mitigation">Mitigação de Calor</SelectItem>
                  <SelectItem value="tree-planting">Plantio de Árvores</SelectItem>
                  <SelectItem value="accessibility">Acessibilidade</SelectItem>
                  <SelectItem value="infrastructure">Infraestrutura</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-bold">
              Descrição *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border-2 border-black font-medium"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department" className="font-bold">
                Departamento Responsável *
              </Label>
              <Select
                value={formData.assignedDepartment}
                onValueChange={(value) => setFormData({ ...formData, assignedDepartment: value })}
              >
                <SelectTrigger className="border-2 border-black font-medium">
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Infraestrutura">Infraestrutura</SelectItem>
                  <SelectItem value="Meio Ambiente">Meio Ambiente</SelectItem>
                  <SelectItem value="Obras Públicas">Obras Públicas</SelectItem>
                  <SelectItem value="Transporte">Transporte</SelectItem>
                  <SelectItem value="Planejamento Urbano">Planejamento Urbano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="font-bold">
                Prioridade *
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger className="border-2 border-black font-medium">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-bold">Data de Início *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-2 border-black"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? format(formData.startDate, "PPP", { locale: ptBR }) : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-2 border-black">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => setFormData({ ...formData, startDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="font-bold">Data de Término *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-2 border-black"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? format(formData.endDate, "PPP", { locale: ptBR }) : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-2 border-black">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => setFormData({ ...formData, endDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget" className="font-bold">
                Orçamento (R$) *
              </Label>
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="border-2 border-black font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="neighborhood" className="font-bold">
                Bairro *
              </Label>
              <Input
                id="neighborhood"
                value={formData.neighborhood}
                onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                className="border-2 border-black font-medium"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="font-bold">
              Endereço *
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="border-2 border-black font-medium"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedReports" className="font-bold">
              IDs de Relatórios Vinculados
            </Label>
            <Input
              id="linkedReports"
              value={formData.linkedReportIds}
              onChange={(e) => setFormData({ ...formData, linkedReportIds: e.target.value })}
              placeholder="REP-123, REP-124 (separados por vírgula)"
              className="border-2 border-black font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectedImpact" className="font-bold">
              Impacto Esperado *
            </Label>
            <Textarea
              id="expectedImpact"
              value={formData.expectedImpact}
              onChange={(e) => setFormData({ ...formData, expectedImpact: e.target.value })}
              className="border-2 border-black font-medium"
              rows={3}
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-2 border-black font-bold"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-500 hover:bg-green-600 border-2 border-black font-bold text-white"
            >
              Criar Intervenção
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
