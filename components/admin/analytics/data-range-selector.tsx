"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface DateRangeSelectorProps {
  dateRange?: { from: Date | undefined; to: Date | undefined }
  setDateRange?: (range: { from: Date | undefined; to: Date | undefined }) => void
}

export function DateRangeSelector({
  dateRange = { from: undefined, to: undefined },
  setDateRange = () => {},
}: DateRangeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (date: Date | undefined) => {
    if (!date) return

    const range = {
      from: dateRange.from,
      to: dateRange.to,
    }

    if (!range.from) {
      range.from = date
    } else if (!range.to && date > range.from) {
      range.to = date
    } else {
      range.from = date
      range.to = undefined
    }

    setDateRange(range)

    if (range.from && range.to) {
      setIsOpen(false)
    }
  }

  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "dd/MM/yyyy")} - ${format(dateRange.to, "dd/MM/yyyy")}`
    }
    if (dateRange.from) {
      return `${format(dateRange.from, "dd/MM/yyyy")} - Selecione`
    }
    return "Selecione um período"
  }

  const handleQuickSelect = (days: number) => {
    const to = new Date()
    const from = new Date()
    from.setDate(from.getDate() - days)
    setDateRange({ from, to })
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="border-2 border-black bg-white text-black hover:bg-gray-100 flex items-center gap-2 h-10"
        >
          <CalendarIcon className="h-4 w-4" />
          <span>{formatDateRange()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-2 border-black" align="start">
        <div className="p-3 border-b border-black">
          <div className="space-y-2">
            <h4 className="font-bold">Período Rápido</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-black hover:bg-gray-100"
                onClick={() => handleQuickSelect(7)}
              >
                7 dias
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-black hover:bg-gray-100"
                onClick={() => handleQuickSelect(30)}
              >
                30 dias
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-black hover:bg-gray-100"
                onClick={() => handleQuickSelect(90)}
              >
                90 dias
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-black hover:bg-gray-100"
                onClick={() => handleQuickSelect(365)}
              >
                1 ano
              </Button>
            </div>
          </div>
        </div>
        <Calendar
          mode="range"
          selected={{
            from: dateRange.from || undefined,
            to: dateRange.to || undefined,
          }}
          onSelect={(range) => {
            setDateRange({
              from: range?.from,
              to: range?.to,
            })
          }}
          locale={ptBR}
          className="border-none"
        />
      </PopoverContent>
    </Popover>
  )
}
