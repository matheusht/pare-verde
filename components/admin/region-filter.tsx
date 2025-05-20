"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface RegionFilterProps {
  value: string
  onChange: (value: string) => void
}

const regions = [
  { value: "all", label: "Todas as Regiões" },
  { value: "centro", label: "Centro" },
  { value: "norte", label: "Zona Norte" },
  { value: "sul", label: "Zona Sul" },
  { value: "leste", label: "Zona Leste" },
  { value: "oeste", label: "Zona Oeste" },
]

export function RegionFilter({ value, onChange }: RegionFilterProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="neobrutalism"
          role="combobox"
          aria-expanded={open}
          className="bg-white hover:bg-gray-100 border-4 border-black shadow-neobrutalism justify-between"
        >
          {value === "all" ? "Todas as Regiões" : regions.find((region) => region.value === value)?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 border-4 border-black shadow-neobrutalism">
        <Command>
          <CommandInput placeholder="Buscar região..." className="border-b-4 border-black" />
          <CommandList>
            <CommandEmpty>Nenhuma região encontrada.</CommandEmpty>
            <CommandGroup>
              {regions.map((region) => (
                <CommandItem
                  key={region.value}
                  value={region.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === region.value ? "opacity-100" : "opacity-0")} />
                  {region.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
