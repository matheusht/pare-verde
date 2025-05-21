"use client"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import type { District } from "@/data/mock-analytics-data"

interface DistrictSelectorProps {
  districts: District[]
  selectedDistrict?: string
  setSelectedDistrict?: (district: string) => void
}

export function DistrictSelector({
  districts,
  selectedDistrict = "all",
  setSelectedDistrict = () => {},
}: DistrictSelectorProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="border-2 border-black bg-white text-black hover:bg-gray-100 flex items-center justify-between h-10 w-[200px]"
        >
          {selectedDistrict
            ? districts.find((district) => district.id === selectedDistrict)?.name
            : "Selecione um distrito"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 border-2 border-black">
        <Command>
          <CommandInput placeholder="Buscar distrito..." />
          <CommandList>
            <CommandEmpty>Nenhum distrito encontrado.</CommandEmpty>
            <CommandGroup>
              {districts.map((district) => (
                <CommandItem
                  key={district.id}
                  value={district.id}
                  onSelect={(currentValue) => {
                    setSelectedDistrict(currentValue)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn("mr-2 h-4 w-4", selectedDistrict === district.id ? "opacity-100" : "opacity-0")}
                  />
                  {district.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
